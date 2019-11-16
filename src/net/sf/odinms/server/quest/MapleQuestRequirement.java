/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

package net.sf.odinms.server.quest;

import java.util.Calendar;

import net.sf.odinms.client.IItem;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.MapleJob;
import net.sf.odinms.client.MapleQuestStatus;
import net.sf.odinms.provider.MapleData;
import net.sf.odinms.provider.MapleDataTool;
import net.sf.odinms.server.MapleItemInformationProvider;

/**
 *
 * @author Matze
 */
public class MapleQuestRequirement {

    private MapleQuestRequirementType type;
    private MapleData data;
    private MapleQuest quest;

    /** Creates a new instance of MapleQuestRequirement */
    public MapleQuestRequirement(MapleQuest quest, MapleQuestRequirementType type, MapleData data) {
        this.type = type;
        this.data = data;
        this.quest = quest;
    }

    boolean check(MapleCharacter c, Integer npcid) {
        if (getData() == null) {
            return true;
        }
        switch (getType()) {
            case JOB:
                for (MapleData jobEntry : getData().getChildren()) {
                    int jobid = MapleDataTool.getInt(jobEntry, -1);
                    if (jobid == -1) {
                        return true;
                    }
                    if (c.getJob().equals(MapleJob.getById(jobid)) || c.isGM()) {
                        return true;
                    }
                }
                return false;
            case QUEST:
                for (MapleData questEntry : getData().getChildren()) {
                    int qid = MapleDataTool.getInt(questEntry.getChildByPath("id"), -1);
                    if (qid == -1) {
                        return true;
                    }
                    MapleQuestStatus q = c.getQuest(MapleQuest.getInstance(qid));
                    if (q == null && MapleQuestStatus.Status.getById(MapleDataTool.getInt(questEntry.getChildByPath("state"), 0)).equals(MapleQuestStatus.Status.NOT_STARTED)) {
                        continue;
                    }
                    if (q == null || !q.getStatus().equals(MapleQuestStatus.Status.getById(MapleDataTool.getInt(questEntry.getChildByPath("state"), 0)))) {
                        return false;
                    }
                }
                return true;
            case ITEM:
                MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                for (MapleData itemEntry : getData().getChildren()) {
                    int itemId = MapleDataTool.getInt(itemEntry.getChildByPath("id"), -1);
                    if (itemId == -1) {
                        return true;
                    }
                    short quantity = 0;
                    MapleInventoryType iType = ii.getInventoryType(itemId);
                    for (IItem item : c.getInventory(iType).listById(itemId)) {
                        quantity += item.getQuantity();
                    }
                    if (quantity < MapleDataTool.getInt(itemEntry.getChildByPath("count"), 0) || MapleDataTool.getInt(itemEntry.getChildByPath("count"), 0) <= 0 && quantity > 0) {
                        return false;
                    }
                }
                return true;
            case MIN_LEVEL:
                return c.getLevel() >= MapleDataTool.getInt(getData(), 1);
            case MAX_LEVEL:
                return c.getLevel() <= MapleDataTool.getInt(getData(), 200);
            case END_DATE:
                String timeStr = MapleDataTool.getString(getData(), null);
                if (timeStr == null) {
                    return true;
                }
                Calendar cal = Calendar.getInstance();
                cal.set(Integer.parseInt(timeStr.substring(0, 4)), Integer.parseInt(timeStr.substring(4, 6)), Integer.parseInt(timeStr.substring(6, 8)), Integer.parseInt(timeStr.substring(8, 10)), 0);
                return cal.getTimeInMillis() > System.currentTimeMillis();
            case MOB:
                for (MapleData mobEntry : getData().getChildren()) {
                    int mobId = MapleDataTool.getInt(mobEntry.getChildByPath("id"), -1);
                    int killReq = MapleDataTool.getInt(mobEntry.getChildByPath("count"), 1);
                    if (mobId == -1) {
                        return true; // let the thing slide I guess
                    }
                    if (c.getQuest(quest).getMobKills(mobId) < killReq) {
                        return false;
                    }
                }
                return true;
            case MONSTER_BOOK:
                return c.getMonsterBook().getTotalCards() >= MapleDataTool.getInt(getData());
            case NPC:
                return npcid == null || npcid == MapleDataTool.getInt(getData());
            case FIELD_ENTER:
                if (getData() == null) {
                    return true;
                }
                MapleData zeroField = getData().getChildByPath("0");
                if (zeroField != null) {
                    return MapleDataTool.getInt(zeroField) == c.getMapId();
                }
                return false;
            case INTERVAL:
                return !c.getQuest(quest).getStatus().equals(MapleQuestStatus.Status.COMPLETED) || c.getQuest(quest).getCompletionTime() <= System.currentTimeMillis() - MapleDataTool.getInt(getData()) * 60 * 1000;
            //case PET:
            //case MIN_PET_TAMENESS:
            case COMPLETE_QUEST:
                if (c.getNumQuest() >= MapleDataTool.getInt(getData())) {
                    return true;
                }
                return false;
            default:
                return true;
        }
    }

    public MapleQuestRequirementType getType() {
        return type;
    }

    public MapleData getData() {
        return data;
    }

    @Override
    public String toString() {
        return type.toString() + " " + data.toString() + " " + quest.toString();
    }

    public String getDebug(MapleCharacter c) {
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("TYPE: ");
            sb.append(getType().toString());
            sb.append(" ");
            if (getData() == null) {
                sb.append("DATA EMPTY! (2)");
                return sb.toString();
            }
            outSwitch:
            switch (getType()) {
                case JOB:
                    for (MapleData jobEntry : getData().getChildren()) {
                        int jobid = MapleDataTool.getInt(jobEntry);

                        if (c.getJob().equals(MapleJob.getById(jobid)) || c.isGM()) {
                            sb.append("CHECK: TRUE");
                            break outSwitch;
                        }
                    }
                    sb.append("CHECK: FALSE (JOB: ");
                    sb.append(c.getJob().getId());
                    sb.append(") ");
                    break;

                case QUEST:
                    for (MapleData questEntry : getData().getChildren()) {
                        int qid = MapleDataTool.getInt(questEntry.getChildByPath("id"), -1);
                        if (qid == -1) {
                            sb.append("QID_IS_NEGATIVE_1_PASS ");
                            continue;
                        }
                        int rqs = MapleDataTool.getInt(questEntry.getChildByPath("state"), 0);
                        MapleQuestStatus q = c.getQuest(MapleQuest.getInstance(qid));
                        if (q == null && MapleQuestStatus.Status.getById(rqs).equals(MapleQuestStatus.Status.NOT_STARTED)) {
                            sb.append("QID_");
                            sb.append(qid);
                            sb.append("_NOTSTARTED_PASS ");
                            continue;
                        }
                        if (q == null || !q.getStatus().equals(MapleQuestStatus.Status.getById(rqs))) {
                            sb.append("QID_");
                            sb.append(qid);
                            sb.append("_");
                            sb.append(q.getStatus().getId());
                            sb.append("_NOTEQUAL_");

                            sb.append(rqs);
                            sb.append("_FAIL");
                            break outSwitch;

                        }
                    }
                    sb.append("CHECK: TRUE");
                    break;
                case ITEM:
                    MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                    for (MapleData itemEntry : getData().getChildren()) {
                        int itemId = MapleDataTool.getInt(itemEntry.getChildByPath("id"), -1);
                        if (itemId == -1) {
                            sb.append("ITEMID_NEGATIVE_1_PASS ");
                            continue;
                        }
                        short quantity = 0;
                        MapleInventoryType iType = ii.getInventoryType(itemId);
                        for (IItem item : c.getInventory(iType).listById(itemId)) {
                            quantity += item.getQuantity();
                        }
                        if (quantity < MapleDataTool.getInt(itemEntry.getChildByPath("count"), 0) || MapleDataTool.getInt(itemEntry.getChildByPath("count"), 0) <= 0 && quantity > 0) {
                            sb.append("NOT_ENOUGH_OF_");
                            sb.append(itemId);
                            sb.append("_NEED");
                            sb.append(MapleDataTool.getInt(itemEntry.getChildByPath("count"), -1));
                            sb.append("_HAVE");
                            sb.append(quantity);
                            break outSwitch;
                        }
                    }
                    sb.append("CHECK: TRUE");
                    break;
                case MIN_LEVEL:
                    sb.append("MIN_LEVEL");
                    sb.append(MapleDataTool.getInt(getData(), -1));
                    sb.append("_HAVELEVEL");
                    sb.append(c.getLevel());
                    break;
                case MAX_LEVEL:
                    sb.append("MAX_LEVEL");
                    sb.append(MapleDataTool.getInt(getData(), -1));
                    sb.append("_HAVELEVEL");
                    sb.append(c.getLevel());
                    break;
                case END_DATE:
                    String timeStr = MapleDataTool.getString(getData(), null);
                    if (timeStr == null) {
                        sb.append("TIMESTR_NULL_PASS");
                        break;
                    }
                    Calendar cal = Calendar.getInstance();
                    cal.set(Integer.parseInt(timeStr.substring(0, 4)), Integer.parseInt(timeStr.substring(4, 6)), Integer.parseInt(timeStr.substring(6, 8)), Integer.parseInt(timeStr.substring(8, 10)), 0);
                    sb.append("REQ_PASS_");
                    sb.append(cal.getTimeInMillis() > System.currentTimeMillis());
                    break;
                case MOB:
                    for (MapleData mobEntry : getData().getChildren()) {
                        int mobId = MapleDataTool.getInt(mobEntry.getChildByPath("id"), -1);
                        int killReq = MapleDataTool.getInt(mobEntry.getChildByPath("count"), 1);
                        if (mobId == -1) {
                            sb.append("MOBID_NEGATIVE_1 ");
                            continue;
                        }
                        if (c.getQuest(quest).getMobKills(mobId) < killReq) {
                            sb.append("NEED");
                            sb.append(killReq);
                            sb.append("HAVE");
                            sb.append(c.getQuest(quest).getMobKills(mobId));
                            sb.append("OF");
                            sb.append(mobId);
                            break outSwitch;
                        }
                    }
                    sb.append("CHECK: TRUE");
                    break;
                case NPC:
                    sb.append(MapleDataTool.getInt(getData(), -1));
                    break;
                case FIELD_ENTER:
                    if (getData() == null) {
                        sb.append("DATANULL");
                        break;
                    }
                    MapleData zeroField = getData().getChildByPath("0");
                    if (zeroField != null) {
                        sb.append(MapleDataTool.getInt(zeroField) == c.getMapId());
                        sb.append("AT");
                        sb.append(c.getMapId());
                        sb.append("NEED");
                        sb.append(MapleDataTool.getInt(zeroField));
                        break;
                    }
                    sb.append("ZEROFIELD_NULL");
                    break;
                //case INTERVAL:
                //return !c.getQuest(quest).getStatus().equals(MapleQuestStatus.Status.COMPLETED) || c.getQuest(quest).getCompletionTime() <= System.currentTimeMillis() - MapleDataTool.getInt(getData()) * 60 * 1000;
                //case PET:
                //case MIN_PET_TAMENESS:
                default:
                    sb.append("DEFAULT");
                    break;
            }
            return sb.toString();
        } catch (Throwable t) {
            return getType().toString() + "EXCEPTION";
        }

    }
}