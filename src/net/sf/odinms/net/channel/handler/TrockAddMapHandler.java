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

package net.sf.odinms.net.channel.handler;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Matze
 */
public class TrockAddMapHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(TrockAddMapHandler.class);

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        Connection con = DatabaseConnection.getConnection();
        byte addrem = slea.readByte();
        byte rocktype = slea.readByte();

        if (addrem == 0x00) {
            int mapId = slea.readInt();
            try {
                PreparedStatement ps = con.prepareStatement("DELETE FROM trocklocations WHERE characterid = ? AND mapid = ? AND type = ?");
                ps.setInt(1, c.getPlayer().getId());
                ps.setInt(2, mapId);
                ps.setInt(3, rocktype);
                ps.executeUpdate();
                ps.close();
            } catch (SQLException se) {
                log.error("SQL 错误: " + se.getLocalizedMessage(), se);
            }
        } else if (addrem == 0x01) {
            int mapid = c.getPlayer().getMapId();
            try {
                PreparedStatement ps = con.prepareStatement("DELETE FROM trocklocations WHERE characterid = ? AND mapid = ? AND type = ?");
                ps.setInt(1, c.getPlayer().getId());
                ps.setInt(2, mapid);
                ps.setInt(3, rocktype);
                ps.executeUpdate();
                ps.close();
            } catch (SQLException se) {
                log.error("SQL 错误: " + se.getLocalizedMessage(), se);
            }
            if (!((mapid >= 240050000 && mapid <= 240060200) || mapid < 100000000 ||
                    (mapid >= 280010010 && mapid <= 280030000) || (mapid >= 670000100 && mapid <= 670011000) ||
                    mapid >= 809020000 || (mapid >= 101000100 && mapid <= 101000104) || mapid == 101000301 ||
                    (mapid >= 105040310 && mapid <= 105040316) || (mapid >= 108000100 && mapid <= 109080003) ||
                    (mapid >= 190000000 && mapid <= 197010000) || (mapid >= 200090000 && mapid <= 209080000) ||
                    mapid == 240000110 || mapid == 240000111 || mapid == 260000110)) { //disallowed maps
                try {
                    PreparedStatement ps = con.prepareStatement("INSERT INTO trocklocations (characterid, mapid, type) VALUES (?, ?, ?)");
                    ps.setInt(1, c.getPlayer().getId());
                    ps.setInt(2, c.getPlayer().getMapId());
                    ps.setInt(3, rocktype);
                    ps.executeUpdate();
                    ps.close();
                } catch (SQLException se) {
                    log.error("SQL 错误: " + se.getLocalizedMessage(), se);
                }
            } else {
                c.getPlayer().dropMessage("无法保存或者已经保存的地图.");
            }
        }
        c.getSession().write(MaplePacketCreator.TrockRefreshMapList(c.getPlayer(), rocktype));
    }
}