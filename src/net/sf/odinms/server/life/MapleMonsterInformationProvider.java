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

package net.sf.odinms.server.life;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import net.sf.odinms.database.DatabaseConnection;

/**
 *
 * @author Matze
 */
public class MapleMonsterInformationProvider {

    public static class DropEntry {

        public int itemid;
        public int chance;
        public int questid;
        public int assignedRangeStart;
        public int assignedRangeLength;

        public DropEntry(int itemid, int chance, int questid) {
            this.itemid = itemid;
            this.chance = chance;
            this.questid = questid;
        }

        public DropEntry(int itemid, int chance) {
            this.itemid = itemid;
            this.chance = chance;
            this.questid = 0;
        }

        @Override
        public String toString() {
            return itemid + " chance: " + chance;
        }
    }
    public static final int APPROX_FADE_DELAY = 90;
    private static MapleMonsterInformationProvider instance = null;
    private Map<Integer, List<DropEntry>> drops = new HashMap<Integer, List<DropEntry>>();
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MapleMonsterInformationProvider.class);

    private MapleMonsterInformationProvider() {
    }

    public static MapleMonsterInformationProvider getInstance() {
        if (instance == null) {
            instance = new MapleMonsterInformationProvider();
        }
        return instance;
    }

    public List<DropEntry> retrieveDropChances(int monsterid) {
        if (drops.containsKey(monsterid)) {
            return drops.get(monsterid);
        }
        List<DropEntry> ret = new LinkedList<DropEntry>();
        if (monsterid > 9300183 && monsterid < 9300216) {
            for (int i = 2022359; i < 2022367; i++) {
                ret.add(new DropEntry(i, 10));
            }
            drops.put(monsterid, ret);
            return ret;
        } else if (monsterid > 9300215 && monsterid < 9300269) {
            for (int i = 2022430; i < 2022434; i++) {
                ret.add(new DropEntry(i, 3));
            }
            drops.put(monsterid, ret);
            return ret;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT itemid, chance, monsterid, questid FROM monsterdrops WHERE monsterid = ?");
            ps.setInt(1, monsterid);
            ResultSet rs = ps.executeQuery();
            MapleMonster theMonster = null;
            while (rs.next()) {
                int rowmonsterid = rs.getInt("monsterid");
                int chance = rs.getInt("chance");
                int questid = rs.getInt("questid");
                if (rowmonsterid != monsterid && rowmonsterid != 0) {
                    if (theMonster == null) {
                        theMonster = MapleLifeFactory.getMonster(monsterid);
                    }
                    chance += theMonster.getLevel() * rowmonsterid;
                }
                ret.add(new DropEntry(rs.getInt("itemid"), chance, questid));
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
            log.error("Error retrieving drop", e);
        }
        drops.put(monsterid, ret);
        return ret;
    }

    public void clearDrops() {
        drops.clear();
    }
}