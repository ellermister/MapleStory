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

import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.net.world.remote.WorldChannelInterface;
import net.sf.odinms.tools.MaplePacketCreator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ReportPlayerHandler extends AbstractMaplePacketHandler {

    public static final String[] reasons = {"Hacking", "Botting", "Scamming", "Fake GM", "Harassment", "Advertising"};
    private static Logger log = LoggerFactory.getLogger(ReportPlayerHandler.class);

    public static String getNameById(int id) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM characters where id = ?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getString("name");
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            log.error("Report SQL Error", ex);
        }
        return "<Couldn't retreive name, player id is " + id + ">";
    }

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int reportedCharId = slea.readInt();
        byte reason = slea.readByte();
        String chatlog = "No chatlog.";
        short clogLen = slea.readShort();
        if (clogLen > 0) {
            chatlog = slea.readAsciiString(clogLen);
        }

        boolean reported = addReportEntry(c.getPlayer().getId(), reportedCharId, reason, chatlog);
        StringBuilder sb = new StringBuilder();
        sb.append(c.getPlayer().getName());
        sb.append(" reported character ");
        sb.append(getNameById(reportedCharId));
        sb.append(" for ");
        sb.append(reasons[reason]);
        sb.append(".");
        if (reported) {
            c.getSession().write(MaplePacketCreator.reportReply((byte) 0));
        } else {
            c.getSession().write(MaplePacketCreator.reportReply((byte) 4));
        }
        WorldChannelInterface wci = c.getChannelServer().getWorldInterface();
        try {
            wci.broadcastGMMessage(null, MaplePacketCreator.serverNotice(5, sb.toString()).getBytes());
        } catch (RemoteException e) {
            c.getChannelServer().reconnectWorld();
        }
    }

    public boolean addReportEntry(int reporterId, int victimId, byte reason, String chatlog) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO reports VALUES (NULL, CURRENT_TIMESTAMP, ?, ?, ?, ?, 'UNHANDLED')");
            ps.setInt(1, reporterId);
            ps.setInt(2, victimId);
            ps.setInt(3, reason);
            ps.setString(4, chatlog);
            ps.executeUpdate();
            ps.close();
        } catch (Exception ex) {
            return false;
        }

        return true;
    }
}