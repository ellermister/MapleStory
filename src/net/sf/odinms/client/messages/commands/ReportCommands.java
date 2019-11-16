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

package net.sf.odinms.client.messages.commands;

import static net.sf.odinms.client.messages.CommandProcessor.getOptionalIntArg;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.messages.Command;
import net.sf.odinms.client.messages.CommandDefinition;
import net.sf.odinms.client.messages.MessageCallback;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.net.channel.handler.ReportPlayerHandler;

import java.sql.*;
import net.sf.odinms.client.messages.IllegalCommandSyntaxException;

public class ReportCommands implements Command {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(ReportCommands.class);

    @Override
    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception {
        if (splitted[0].equals("!listreports")) {
            int page = getOptionalIntArg(splitted, 1, 0);
            mc.dropMessage("== Reports page: " + page + " ==");
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT * FROM reports ORDER BY id DESC LIMIT ?, 15");
                ps.setInt(1, page * 15);
                ResultSet rs = ps.executeQuery();
                mc.dropMessage("Report ID | Reason | Reporter | Victim | Status");
                while (rs.next()) {
                    mc.dropMessage(rs.getInt("id") + " | " +
                            ReportPlayerHandler.reasons[rs.getInt("reason")] + " | " +
                            ReportPlayerHandler.getNameById(rs.getInt("reporterid")) + " | " +
                            ReportPlayerHandler.getNameById(rs.getInt("victimid")) + " | " +
                            rs.getString("status"));
                }
            } catch (SQLException ex) {
                log.error("Report SQL Error", ex);
            }
        } else if (splitted[0].equals("!getreport")) {
            if (splitted.length < 2) {
                throw new IllegalCommandSyntaxException(2);
            }
            int reportid = Integer.parseInt(splitted[1]);

            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT * FROM reports WHERE id = ?");
                ps.setInt(1, reportid);
                ResultSet rs = ps.executeQuery();

                if (rs.next()) {
                    mc.dropMessage(ReportPlayerHandler.reasons[rs.getInt("reason")] + " | " +
                            ReportPlayerHandler.getNameById(rs.getInt("reporterid")) + " | " +
                            ReportPlayerHandler.getNameById(rs.getInt("victimid")) + " | " +
                            rs.getString("status"));
                    String[] chatlog = rs.getString("chatlog").split("\r\n");

                    mc.dropMessage("== Chatlog start:");
                    for (String x : chatlog) {
                        mc.dropMessage(x.trim());
                    }
                    mc.dropMessage("== Chatlog end");
                }
            } catch (SQLException ex) {
                log.error("Report SQL Error", ex);
            }
        } else if (splitted[0].equals("!editreportstatus")) {
            if (splitted.length < 3) {
                throw new IllegalCommandSyntaxException(3);
            }
            int reportid = Integer.parseInt(splitted[1]);
            String status = splitted[2];
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("UPDATE reports SET status = ? WHERE id = ?");
                ps.setString(1, status);
                ps.setInt(2, reportid);
                ps.executeUpdate();
                mc.dropMessage("Updated report.");
            } catch (SQLException ex) {
                log.error("Report SQL Error", ex);
            }
        }
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
                    new CommandDefinition("listreports", "<page>", "Lists reports", 5),
                    new CommandDefinition("getreport", "id", "Gets the report from the specified id", 5),
                    new CommandDefinition("editreportstatus", "id status", "Edits the status of a report", 5)
                };
    }
}