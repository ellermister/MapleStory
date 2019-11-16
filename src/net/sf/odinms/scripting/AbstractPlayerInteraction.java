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

package net.sf.odinms.scripting;

import java.rmi.RemoteException;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.odinms.client.Equip;
import net.sf.odinms.client.IItem;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleInventory;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.MaplePet;
import net.sf.odinms.client.MapleQuestStatus;
import net.sf.odinms.client.SkillFactory;
import net.sf.odinms.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.net.world.MapleParty;
import net.sf.odinms.net.world.MaplePartyCharacter;
import net.sf.odinms.net.world.guild.MapleGuild;
import net.sf.odinms.net.world.guild.MapleGuildCharacter;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.server.quest.MapleQuest;
import net.sf.odinms.server.TimerManager;
import net.sf.odinms.server.maps.MapleMapObject;
import net.sf.odinms.server.maps.MapleMapObjectType;
import net.sf.odinms.tools.MaplePacketCreator;

public class AbstractPlayerInteraction {

    private MapleClient c;

    public AbstractPlayerInteraction(MapleClient c) {
        this.c = c;
    }

    protected MapleClient getClient() {
        return c;
    }

    public MapleCharacter getPlayer() {
        return c.getPlayer();
    }

    public void clearAranPolearm() {
        c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).removeItem((byte) -11);
    }

    public void warp(int map) {
        getPlayer().changeMap(getWarpMap(map), getWarpMap(map).getPortal(0));
    }

    public void warp(int map, int portal) {
        getPlayer().changeMap(getWarpMap(map), getWarpMap(map).getPortal(portal));
    }

    public void warp(int map, String portal) {
        getPlayer().changeMap(getWarpMap(map), getWarpMap(map).getPortal(portal));
    }

    protected MapleMap getWarpMap(int map) {
        MapleMap target;
        if (getPlayer().getEventInstance() == null) {
            target = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(map);
        } else {
            target = getPlayer().getEventInstance().getMapInstance(map);
        }
        return target;
    }

    public MapleMap getMap(int map) {
        return getWarpMap(map);
    }

    public boolean haveItem(int itemid) {
        return haveItem(itemid, 1);
    }

    public boolean haveItem(int itemid, int quantity) {
        return haveItem(itemid, quantity, false, false);
    }

    public boolean haveItem(int itemid, int quantity, boolean checkEquipped, boolean exact) {
        return c.getPlayer().haveItem(itemid, quantity, checkEquipped, exact);
    }

    public boolean canHold(int itemid) {
        return c.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(itemid)).getNextFreeSlot() > -1;
    }

    public MapleQuestStatus.Status getQuestStatus(int id) {
        return c.getPlayer().getQuest(MapleQuest.getInstance(id)).getStatus();
    }

    public boolean isQuestActive(int id) {
        return c.getPlayer().getQuest(MapleQuest.getInstance(id)).getStatus() == MapleQuestStatus.Status.STARTED;
    }

    public boolean isQuestFinished(int id) {
        return c.getPlayer().getQuest(MapleQuest.getInstance(id)).getStatus() == MapleQuestStatus.Status.COMPLETED;
    }

    public void gainItem(int id, short quantity) {
        gainItem(id, quantity, false);
    }

    public void setTimeOut(long time, final int mapId) {
        TimerManager.getInstance().schedule(new Runnable() {

            public void run() {
                MapleMap map = c.getPlayer().getMap();
                MapleMap outMap = c.getChannelServer().getMapFactory().getMap(mapId);
                for (MapleCharacter player : map.getCharacters()) {
                    player.getClient().getPlayer().changeMap(outMap, outMap.getPortal(0));
                }
            }
        }, time);
    }

    /**
     * Gives item with the specified id or takes it if the quantity is negative. Note that this does NOT take items from the equipped inventory. randomStats for generating random stats on the generated equip.
     * @param id
     * @param quantity
     * @param randomStats
     */
    public void gainItem(int id, short quantity, boolean randomStats) {
        if (quantity >= 0) {
            boolean space = false;
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            IItem item = ii.getEquipById(id);
            MapleInventoryType type = ii.getInventoryType(id);
            StringBuilder logInfo = new StringBuilder(c.getPlayer().getName());
            logInfo.append(" received ");
            logInfo.append(quantity);
            logInfo.append(" from a scripted PlayerInteraction (");
            logInfo.append(this.toString());
            logInfo.append(")");
            if (!MapleInventoryManipulator.checkSpace(c, id, quantity, "")) {
                MapleInventoryType invtype = ii.getInventoryType(id);
                c.getSession().write(MaplePacketCreator.serverNotice(1, "你的背包已满"));
                return;
            }
            if (type.equals(MapleInventoryType.EQUIP) && !ii.isThrowingStar(item.getItemId()) && !ii.isBullet(item.getItemId())) {
                if (randomStats) {
                    MapleInventoryManipulator.addFromDrop(c, ii.randomizeStats((Equip) item), logInfo.toString(), false);
                } else {
                    MapleInventoryManipulator.addFromDrop(c, (Equip) item, logInfo.toString(), false);
                }
            } else {
                MapleInventoryManipulator.addById(c, id, quantity, logInfo.toString(), null, -1);
            }
        } else {
            MapleInventoryManipulator.removeById(c, MapleItemInformationProvider.getInstance().getInventoryType(id), id, -quantity, true, false);
        }
        c.getSession().write(MaplePacketCreator.getShowItemGain(id, quantity, true));
    }

    public boolean addItem(int id, short quantity, boolean randomStats) {
        if (quantity >= 0) {
            boolean space = false;
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            IItem item = ii.getEquipById(id);
            MapleInventoryType type = ii.getInventoryType(id);
            StringBuilder logInfo = new StringBuilder(c.getPlayer().getName());
            logInfo.append(" received ");
            logInfo.append(quantity);
            logInfo.append(" from a scripted PlayerInteraction (");
            logInfo.append(this.toString());
            logInfo.append(")");
            if (!MapleInventoryManipulator.checkSpace(c, id, quantity, "")) {
                MapleInventoryType invtype = ii.getInventoryType(id);
                c.getSession().write(MaplePacketCreator.serverNotice(1, "你的背包已满"));
                return false;
            }
            if (type.equals(MapleInventoryType.EQUIP) && !ii.isThrowingStar(item.getItemId()) && !ii.isBullet(item.getItemId())) {
                if (randomStats) {
                    MapleInventoryManipulator.addFromDrop(c, ii.randomizeStats((Equip) item), logInfo.toString(), false);
                } else {
                    MapleInventoryManipulator.addFromDrop(c, (Equip) item, logInfo.toString(), false);
                }
            } else {
                MapleInventoryManipulator.addById(c, id, quantity, logInfo.toString(), null, -1);
            }
        } else {
            MapleInventoryManipulator.removeById(c, MapleItemInformationProvider.getInstance().getInventoryType(id), id, -quantity, true, false);
        }
        c.getSession().write(MaplePacketCreator.getShowItemGain(id, quantity, true));
        return true;
    }

    public void changeMusic(String songName) {
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.musicChange(songName));
    }

    // default playerMessage and mapMessage to use type 5
    public void playerMessage(String message) {
        playerMessage(5, message);
    }

    public void mapMessage(String message) {
        mapMessage(5, message);
    }

    public void guildMessage(String message) {
        guildMessage(5, message);
    }

    public void playerMessage(int type, String message) {
        c.getSession().write(MaplePacketCreator.serverNotice(type, message));
    }

    public void mapMessage(int type, String message) {
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(type, message));
    }

    public void guildMessage(int type, String message) {
        MapleGuild guild = getGuild();
        if (guild != null) {
            guild.guildMessage(MaplePacketCreator.serverNotice(type, message));
        }
    }

    public MapleGuild getGuild() {
        try {
            return c.getChannelServer().getWorldInterface().getGuild(getPlayer().getGuildId(), new MapleGuildCharacter(getPlayer()));
        } catch (RemoteException ex) {
            Logger.getLogger(AbstractPlayerInteraction.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public void gainGP(int amount) {
        try {
            c.getChannelServer().getWorldInterface().gainGP(getPlayer().getGuildId(), amount);
        } catch (RemoteException e) {
            c.getChannelServer().reconnectWorld();
        }
    }

    public MapleParty getParty() {
        return (c.getPlayer().getParty());
    }

    public boolean isLeader() {
        return (getParty().getLeader().equals(new MaplePartyCharacter(c.getPlayer())));
    }

    /** PQ methods: give items/exp to all party members */
    public void givePartyItems(int id, short quantity, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            MapleClient cl = chr.getClient();
            if (quantity >= 0) {
                StringBuilder logInfo = new StringBuilder(cl.getPlayer().getName());
                logInfo.append(" received ");
                logInfo.append(quantity);
                logInfo.append(" from event ");
                logInfo.append(chr.getEventInstance().getName());
                MapleInventoryManipulator.addById(cl, id, quantity, logInfo.toString(), null, -1);
            } else {
                MapleInventoryManipulator.removeById(cl, MapleItemInformationProvider.getInstance().getInventoryType(id), id, -quantity, true, false);
            }
            cl.getSession().write(MaplePacketCreator.getShowItemGain(id, quantity, true));
        }
    }

    /**PQ gain EXP: Multiplied by channel rate here to allow global values to be input direct into NPCs */
    public void givePartyExp(int amount, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            chr.gainExp(amount * c.getChannelServer().getExpRate(), true, true);
        }
    }

    /** remove all items of type from party; combination of haveItem and gainItem */
    public void removeFromParty(int id, List<MapleCharacter> party) {
        for (MapleCharacter chr : party) {
            MapleClient cl = chr.getClient();
            MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(id);
            MapleInventory iv = cl.getPlayer().getInventory(type);
            int possesed = iv.countById(id);

            if (possesed > 0) {
                MapleInventoryManipulator.removeById(c, MapleItemInformationProvider.getInstance().getInventoryType(id), id, possesed, true, false);
                cl.getSession().write(MaplePacketCreator.getShowItemGain(id, (short) -possesed, true));
            }
        }
    }

    public void removeAll(int id) {
        removeAll(id, c);
    }

    public void removeAll(int id, MapleClient cl) {
        int possessed = cl.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(id)).countById(id);
        if (possessed > 0) {
            MapleInventoryManipulator.removeById(cl, MapleItemInformationProvider.getInstance().getInventoryType(id), id, possessed, true, false);
            cl.getSession().write(MaplePacketCreator.getShowItemGain(id, (short) -possessed, true));
        }
    }

    public void gainCloseness(int closeness, int index) {
        MaplePet pet = getPlayer().getPet(index);
        if (pet != null) {
            pet.setCloseness(pet.getCloseness() + closeness);
            getClient().getSession().write(MaplePacketCreator.updatePet(pet, true));
        }
    }

    public void gainClosenessAll(int closeness) {
        for (MaplePet pet : getPlayer().getPets()) {
            if (pet != null) {
                pet.setCloseness(pet.getCloseness() + closeness);
                getClient().getSession().write(MaplePacketCreator.updatePet(pet, true));
            }
        }
    }

    public int getMapId() {
        return c.getPlayer().getMap().getId();
    }

    public int getPlayerCount(int mapid) {
        return c.getChannelServer().getMapFactory().getMap(mapid).getCharacters().size();
    }

    public int getCurrentPartyId(int mapid) {
        return getMap(mapid).getCurrentPartyId();
    }

    public void showInstruction(String msg, int width, int height) {
        c.getSession().write(MaplePacketCreator.sendHint(msg, width, height));
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public void worldMessage(int type, String message) {
        net.sf.odinms.net.MaplePacket packet = MaplePacketCreator.serverNotice(type, message);
        MapleCharacter chr = c.getPlayer();
        try {
            ChannelServer.getInstance(chr.getClient().getChannel()).getWorldInterface().broadcastMessage(chr.getName(), packet.getBytes());
        } catch (RemoteException e) {
            chr.getClient().getChannelServer().reconnectWorld();
        }
    }

    public int getBossLog(String bossid) {
        return getPlayer().getBossLog(bossid);
    }

    public void setBossLog(String bossid) {
        getPlayer().setBossLog(bossid);
    }

    public void sendMessage(String message) {
        new ServernoticeMapleClientMessageCallback(0, c).dropMessage(message);
    }

    public void resetMap(int mapid) {
        getMap(mapid).resetReactors();
        getMap(mapid).killAllMonsters();
        for (MapleMapObject i : getMap(mapid).getMapObjectsInRange(c.getPlayer().getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM))) {
            getMap(mapid).removeMapObject(i);
            getMap(mapid).broadcastMessage(MaplePacketCreator.removeItemFromMap(i.getObjectId(), 0, c.getPlayer().getId()));
        }
    }

    public void sendClock(MapleClient d, int time) {
        d.getSession().write(MaplePacketCreator.getClock((int) (time - System.currentTimeMillis()) / 1000));
    }

    public void useItem(int id) {
        MapleItemInformationProvider.getInstance().getItemEffect(id).applyTo(c.getPlayer());
        c.getSession().write(MaplePacketCreator.getStatusMsg(id));
    }

    public void aranTemporarySkills() {
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000017), 0, -1);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000018), 0, -1);
        c.getPlayer().setRemainingSp(0);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000017), 1, 0);
        c.getPlayer().setRemainingSp(0);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000018), 1, 0);
        c.getPlayer().setRemainingSp(0);
    }

    public void aranTemporarySkills2() {
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000014), 0, -1);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000015), 0, -1);
        c.getPlayer().setRemainingSp(0);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000014), 1, 0);
        c.getPlayer().setRemainingSp(0);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000015), 1, 0);
    }

    public void aranTemporarySkills3() {
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000016), 0, -1);
        c.getPlayer().setRemainingSp(0);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(20000016), 1, 0);
    }

    public void showWZEffect(String path, int info) {
        c.getSession().write(MaplePacketCreator.showWZEffect(path, info));
    }

    public void updateAranIntroState(String mode) {
        c.getPlayer().addAreaData(21002, mode);
        c.getSession().write(MaplePacketCreator.updateIntroState(mode, 21002));
    }

    public void updateAranIntroState2(String mode) {
        c.getPlayer().addAreaData(21019, mode);
        c.getSession().write(MaplePacketCreator.updateIntroState(mode, 21019));
    }

    public boolean getAranIntroState(String mode) {
        if (c.getPlayer().ares_data.contains(mode)) {
            return true;
        }
        return false;
    }

    public void updateCygnusIntroState(String mode) {
        c.getPlayer().addAreaData(20021, mode);
        c.getSession().write(MaplePacketCreator.updateIntroState(mode, 20021));
    }

    public boolean getCygnusIntroState(String mode) {
        if (c.getPlayer().ares_data.contains(mode)) {
            return true;
        }
        return false;
    }

    public void playWZSound(String path) {
        c.getSession().write(MaplePacketCreator.playWZSound(path));
    }

    public void updateQuest(int questid, String status) {
        c.getSession().write(MaplePacketCreator.updateQuest(questid, status));
    }

    public void displayGuide(int guide) {
        c.getSession().write(MaplePacketCreator.displayGuide(guide));
    }

    public void removeTutorialSummon() {
        c.getSession().write(MaplePacketCreator.spawnTutorialSummon(0));
    }

    public void spawnTutorialSummon() {
        c.getSession().write(MaplePacketCreator.spawnTutorialSummon(1));
    }

    public void tutorialSpeechBubble(String message) {
        c.getSession().write(MaplePacketCreator.tutorialSpeechBubble(message));
    }

    public void showInfo(String message) {
        c.getSession().write(MaplePacketCreator.showInfo(message));
    }

    public void showMapEffect(String path) {
        c.getSession().write(MaplePacketCreator.showMapEffect(path));
    }

    @SuppressWarnings("static-access")
    public void lockUI() {
        c.getPlayer().tutorial = true;
        c.getSession().write(MaplePacketCreator.lockUI(true));
        c.getSession().write(MaplePacketCreator.disableUI(true));
    }

    @SuppressWarnings("static-access")
    public void unlockUI() {
        c.getPlayer().tutorial = false;
        c.getSession().write(MaplePacketCreator.lockUI(false));
        c.getSession().write(MaplePacketCreator.disableUI(false));
    }

    @SuppressWarnings("static-access")
    public boolean inIntro() {
        return c.getPlayer().tutorial;
    }
}