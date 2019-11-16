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

package net.sf.odinms.server;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.database.DatabaseConnection;

public class MaplePlayerNPC {

    MapleCharacter player;
    public static boolean autoPlayerNPCCreation = true;
    private int skip = 0;

    public MaplePlayerNPC(MapleCharacter player) {
        this.player = player;
    }

    public int getCharId() {
        return player.getId();
    }

    @Override
    public String toString() {
        return "Hello, I am #b" + getPlayerNPCName() + "#k, and I am #rLEVEL 200!#k";
    }

    private String getPlayerNPCName() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT name FROM playernpcs WHERE charid = ?");
            ps.setInt(1, getCharId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getString("name");
            }
            rs.close();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "#kbugged. Please report this on the DestinyMS forums. Oh, #b";
    }

    public int getNextNpcID() {
        int npcid = 9900000 + getJobNpcId();
        int count = 0;
        if (getNPCIdByCharId() == -1) {
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT COUNT(*) AS c FROM playernpcs WHERE town = ?");
                ps.setString(1, getTownName());
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    count = rs.getInt("c");
                }
                rs.close();
                ps.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
            return (npcid + count);
        } else {
            return getNPCIdByCharId(); //WTF is this?
        }
    }

    public String getTownName() {
        int jobId = player.getJob().getId();
        if (jobId >= 100 && jobId <= 132) {
            return "Perion";
        } else if (jobId >= 200 && jobId <= 232) {
            return "Ellinia";
        } else if (jobId >= 300 && jobId <= 322) {
            return "Henesys";
        } else if (jobId >= 400 && jobId <= 422) {
            return "Kerning City";
        } else if (jobId >= 500 && jobId <= 522) {
            return "Nautilus Harbor";
        } else if (jobId == 900) {
            return "Free Market"; //GameMasters
        } else {
            return "Lith Harbor";
        }
    }

    public int getJobNpcId() { // I have no fucking idea wtf this is.
        int mapid = player.getPlayerNPCMapId();
        int id = 0;
        if (mapid / 1000000 == 100) { // henesys
            id = 1200;
        } else if (mapid / 1000000 == 101) { // eliniia
            id = 1100;
        } else if (mapid / 1000000 == 102) { // perion
            id = 1000;
        } else if (mapid / 1000000 == 103) { // kerning
            id = 1300;
        } else if (mapid / 100000 == 260) {
            id = 1400; //idk?
        } else {
            id = 1800; //lol
        }
        return id;
    }

    public void createPlayerNPC(MapleCharacter player, int map) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO playernpcs (id, name, hair, face, skin, dir, map, town, charid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            ps.setInt(1, getNextNpcID());
            ps.setString(2, player.getName());
            ps.setInt(3, player.getHair());
            ps.setInt(4, player.getFace());
            ps.setInt(5, player.getSkinColor().getId());
            ps.setInt(6, 1);
            ps.setInt(7, map);
            ps.setString(8, getTownName());
            ps.setInt(9, getCharId());
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void insertEquips(int equipid, byte equippos, int type) {
        if (equipid == -1) {
            return;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO playernpcs_equip (npcid, equipid, equippos, type, charid) VALUES (?, ?, ?, ?, ?)");
            ps.setInt(1, getNextNpcID());
            ps.setInt(2, equipid);
            ps.setInt(3, equippos);
            ps.setInt(4, type);
            ps.setInt(5, getCharId());
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void updateEquips(int equipid, byte equippos) {
        if (equipid == -1) {
            return;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("update playernpcs_equip set equipid = ? where equippos = ?");
            ps.setInt(1, equipid);
            ps.setByte(2, equippos);
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void removeAllEquips() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("delete from playernpcs_equip where npcid = ?");
            ps.setInt(1, this.getNPCIdByName(getPlayerNPCName()));
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public int getItem(int type) {
        if (skip < player.getInventory(MapleInventoryType.EQUIPPED).countItemType(getCharId(), MapleInventoryType.EQUIPPED)) {
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT * FROM inventoryitems WHERE characterid = ? AND inventorytype = -1 ORDER BY itemid LIMIT ?, 1");
                ps.setInt(1, getCharId());
                ps.setInt(2, this.skip);
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    int item = rs.getInt("itemid");
                    if (item / 10000 == type) {
                        skip = 0;
                        return item;
                    } else {
                        skip++;
                        return getItem(type);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        skip = 0;
        return -1;
    }

    public int getItem(int type, int skip) {
        int item = -1;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM inventoryitems WHERE characterid = ? AND inventorytype = -1 ORDER BY itemid LIMIT ?, 1");
            ps.setInt(1, getCharId());
            ps.setInt(2, skip);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                int curitem = rs.getInt("itemid");
                if (curitem / 10000 == type) {
                    item = curitem;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return item;
    }

    public int getNPCIdByName(String name) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM playernpcs WHERE name = ?");
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt("id");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    public int countPlayerNPCEquips() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT COUNT(*) AS c FROM playernpcs_equip WHERE charid = ?");
            ps.setInt(1, getCharId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                return Integer.parseInt(rs.getString("c"));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    public int getNPCIdByCharId() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM playernpcs WHERE charid = ?");
            ps.setInt(1, getCharId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt("id");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    public void createPNE() {
        this.insertEquips(getItem(100), (byte) 1, 0);
        this.insertEquips(getItem(102), (byte) 3, 0);
        this.insertEquips(getItem(103), (byte) 4, 0);
        this.insertEquips(getItem(104), (byte) 5, 0);
        this.insertEquips(getItem(106), (byte) 6, 0);
        this.insertEquips(getItem(107), (byte) 7, 0);
        this.insertEquips(getItem(108), (byte) 8, 0);
        int cape = getItem(110);
        if (cape == 0) {
            cape = getItem(109);
        }
        this.insertEquips(cape, (byte) 9, 0);
        int weapon = 0;
        for (int i = 1; i < 10; i++) {
            if (weapon == 0) {
                weapon = getItem(110 + i * 10);
            } else {
                break;
            }
        }
        this.insertEquips(weapon, (byte) -1, 1);
    }

    public void updatePNE(List<MapleCharacter> players) {
        for (MapleCharacter thisplayer : players) {
            int charid = thisplayer.getId();
            if (thisplayer.getInventory(MapleInventoryType.EQUIPPED).countItemType(charid, MapleInventoryType.EQUIPPED) != countPlayerNPCEquips()) {
                removeAllEquips();
                createPNE();
                return;
            } else {
                for (int i = 0; i < 2; i++) {
                    this.updateEquips(getItem(100, i), (byte) 1);
                    this.updateEquips(getItem(102, i), (byte) 3);
                    this.updateEquips(getItem(103, i), (byte) 4);
                    this.updateEquips(getItem(104, i), (byte) 5);
                    this.updateEquips(getItem(106, i), (byte) 6);
                    this.updateEquips(getItem(107, i), (byte) 7);
                    this.updateEquips(getItem(108, i), (byte) 8);
                    int cape = getItem(110, i);
                    if (cape == 0) {
                        cape = getItem(109, i);
                    }
                    this.updateEquips(cape, (byte) 9);
                    int weapon = 0;
                    for (int x = 1; x < 10; x++) {
                        if (weapon == 0) {
                            weapon = getItem(110 + x * 10, i);
                        } else {
                            break;
                        }
                    }
                    this.updateEquips(weapon, (byte) -1);
                }
            }
        }
    }
}