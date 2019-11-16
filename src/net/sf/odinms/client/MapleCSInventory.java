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

package net.sf.odinms.client;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;
import net.sf.odinms.database.DatabaseConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author NightCoffee
 */
public class MapleCSInventory {

    private static Logger log = LoggerFactory.getLogger(MapleCSInventory.class);
    private int accountid;
    private int characterid;
    private MapleCharacter chr;
    private Map<Integer, MapleCSInventoryItem> csitems = new LinkedHashMap<Integer, MapleCSInventoryItem>();
    private Map<Integer, MapleCSInventoryItem> csgifts = new LinkedHashMap<Integer, MapleCSInventoryItem>();

    public MapleCSInventory(MapleCharacter chr) {
        this.accountid = chr.getAccountID();
        this.characterid = chr.getId();
        this.chr = chr;
        loadFromDB(accountid);
    }

    public void loadFromDB(int id) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM csinventory WHERE accountid = ?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                MapleCSInventoryItem citem = new MapleCSInventoryItem(rs.getInt("uniqueid"), rs.getInt("itemid"), rs.getInt("sn"), (short) rs.getInt("quantity"), rs.getBoolean("gift"));
                citem.setExpire(rs.getTimestamp("expiredate"));
                citem.setSender(rs.getString("sender"));
                csitems.put(citem.getUniqueId(), citem);
            }
            rs.close();
            ps.close();

            ps = con.prepareStatement("SELECT * FROM csgifts WHERE accountid = ?");
            ps.setInt(1, accountid);
            rs = ps.executeQuery();
            while (rs.next()) {
                MapleCSInventoryItem gift;
                if (rs.getInt("itemid") >= 5000000 && rs.getInt("itemid") <= 5000100) {
                    int petId = MaplePet.createPet(rs.getInt("itemid"), chr);
                    gift = new MapleCSInventoryItem(petId, rs.getInt("itemid"), rs.getInt("sn"), (short) 1, true);
                } else {
                    if (rs.getInt("isRing") > 0) {
                        gift = new MapleCSInventoryItem(rs.getInt("isRing"), rs.getInt("itemid"), rs.getInt("sn"), (short) rs.getInt("quantity"), true);
                        gift.setRing(true);
                    } else {
                        gift = new MapleCSInventoryItem(MapleCharacter.getNextUniqueId(), rs.getInt("itemid"), rs.getInt("sn"), (short) rs.getInt("quantity"), true);
                    }
                }
                gift.setExpire(rs.getTimestamp("expiredate"));
                gift.setSender(rs.getString("sender"));
                gift.setMessage(rs.getString("message"));
                csgifts.put(gift.getUniqueId(), gift);
                csitems.put(gift.getUniqueId(), gift);
                saveToDB();
            }
            rs.close();
            ps.close();
            ps = con.prepareStatement("DELETE FROM csgifts WHERE accountid = ?");
            ps.setInt(1, accountid);
            ps.executeUpdate();
            ps.close();

        } catch (SQLException e) {
            log.info("Error loading cs inventory from the database", e);
        }

    }

    public void saveToDB() {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM csinventory WHERE accountid = ?");
            ps.setInt(1, accountid);
            ps.executeUpdate();
            ps.close();

            ps = con.prepareStatement("INSERT INTO csinventory (accountid, uniqueid, itemid, sn, quantity, sender, message, expiredate, gift, isRing) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            for (MapleCSInventoryItem citem : csitems.values()) {
                ps.setInt(1, accountid);
                ps.setInt(2, citem.getUniqueId());
                ps.setInt(3, citem.getItemId());
                ps.setInt(4, citem.getSn());
                ps.setInt(5, citem.getQuantity());
                ps.setString(6, citem.getSender());
                ps.setString(7, citem.getMessage());
                ps.setTimestamp(8, citem.getExpire());
                ps.setBoolean(9, citem.isGift());
                ps.setBoolean(10, citem.isRing());
                ps.executeUpdate();
            }
            ps.close();

        } catch (SQLException e) {
            log.info("Error saving cs inventory to the database", e);
        }

    }

    public Map<Integer, MapleCSInventoryItem> getCSGifts() {
        return csgifts;
    }

    public Map<Integer, MapleCSInventoryItem> getCSItems() {
        return csitems;
    }

    public void addItem(MapleCSInventoryItem citem) {
        csitems.put(citem.getUniqueId(), citem);
    }

    public void removeItem(int uniqueid) {
        csitems.remove(uniqueid);
    }

    public MapleCSInventoryItem getItem(int uniqueid) {
        return csitems.get(uniqueid);
    }
}