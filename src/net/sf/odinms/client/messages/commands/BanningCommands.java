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

import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.util.Calendar;
import java.util.Collection;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleCharacterUtil;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.messages.Command;
import net.sf.odinms.client.messages.CommandDefinition;
import net.sf.odinms.client.messages.IllegalCommandSyntaxException;
import net.sf.odinms.client.messages.MessageCallback;
import static net.sf.odinms.client.messages.CommandProcessor.getNamedIntArg;
import static net.sf.odinms.client.messages.CommandProcessor.joinAfterString;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.StringUtil;

public class BanningCommands implements Command {

    @Override
    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception {
        ChannelServer cserv = c.getChannelServer();
        if (splitted[0].equals("!封号")) {
            String playerName = splitted[1];
            if (splitted.length < 3) {
                throw new IllegalCommandSyntaxException(3);
            }
            MapleCharacter target = null;
            Collection<ChannelServer> cservs = ChannelServer.getAllInstances();
            for (ChannelServer cserver : cservs) {
                target = cserver.getPlayerStorage().getCharacterByName(playerName);
                if (target != null) {
                    playerName = target.getName();
                    break;
                }
            }
            String originalReason = StringUtil.joinStringFrom(splitted, 2);
            String reason = c.getPlayer().getName() + " 使用权限封停 " + playerName + "理由: " + originalReason;
            if (target != null) {
                if (target.getGMLevel() <= c.getPlayer().getGMLevel()) {
                    String readableTargetName = MapleCharacterUtil.makeMapleReadable(target.getName());
                    String ip = target.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                    reason += " (IP: " + ip + ")";
                    target.ban(reason);
                    try {
                        cserv.getWorldInterface().broadcastMessage(null, MaplePacketCreator.serverNotice(6, "[公告事项]" + readableTargetName + " 由于使用非法程序被永久封停处理。").getBytes());
                    } catch (RemoteException e) {
                        cserv.reconnectWorld();
                    }
                    mc.dropMessage(readableTargetName + "'连接IP： " + ip + ".");
                } else {
                    mc.dropMessage("不可封停的管理员");
                }
            } else {
                int accountid;
                int status = 0;
                try {
                    Connection con = DatabaseConnection.getConnection();
                    PreparedStatement ps = con.prepareStatement("SELECT accountid, name FROM characters WHERE name = ?");
                    ps.setString(1, playerName);
                    ResultSet rs = ps.executeQuery();
                    if (rs.next()) {
                        accountid = rs.getInt("accountid");
                        playerName = rs.getString("name");
                        PreparedStatement psb = con.prepareStatement("SELECT banned FROM accounts WHERE id = ?");
                        psb.setInt(1, accountid);
                        ResultSet rsb = psb.executeQuery();
                        rsb.next();
                        if (rsb.getInt("banned") == 1) {
                            status = 1;
                        }
                        rsb.close();
                        psb.close();
                    } else {
                        status = -1;
                    }
                    rs.close();
                    ps.close();
                } catch (SQLException e) {
                }
                if (status != 0) {
                    if (status == 1) {
                        mc.dropMessage(playerName + "'帐号已成功封停。");
                    } else if (status == -1) {
                        mc.dropMessage("玩家： '" + playerName + "' 不存在。");
                    }
                    return;
                }
                if (MapleCharacter.ban(playerName, reason, false)) {
                    mc.dropMessage(playerName + "'帐号已成功离线封停。");
                    try {
                        cserv.getWorldInterface().broadcastMessage(c.getPlayer().getName(), MaplePacketCreator.serverNotice(6, playerName + " 已被禁止登陆游戏.").getBytes());
                    } catch (RemoteException e) {
                        cserv.reconnectWorld();
                    }
                }
            }
        } else if (splitted[0].equals("!tempban")) {
            Calendar tempB = Calendar.getInstance();
            String originalReason = joinAfterString(splitted, ":");

            if (splitted.length < 4 || originalReason == null) {
                throw new IllegalCommandSyntaxException(4);
            }

            int yChange = getNamedIntArg(splitted, 1, "y", 0);
            int mChange = getNamedIntArg(splitted, 1, "m", 0);
            int wChange = getNamedIntArg(splitted, 1, "w", 0);
            int dChange = getNamedIntArg(splitted, 1, "d", 0);
            int hChange = getNamedIntArg(splitted, 1, "h", 0);
            int iChange = getNamedIntArg(splitted, 1, "i", 0);
            int gReason = getNamedIntArg(splitted, 1, "r", 7);

            String reason = c.getPlayer().getName() + " tempbanned " + splitted[1] + ": " + originalReason;

            if (gReason > 14) {
                mc.dropMessage("You have entered an incorrect ban reason ID, please try again.");
                return;
            }

            DateFormat df = DateFormat.getInstance();
            tempB.set(tempB.get(Calendar.YEAR) + yChange, tempB.get(Calendar.MONTH) + mChange, tempB.get(Calendar.DATE) +
                    (wChange * 7) + dChange, tempB.get(Calendar.HOUR_OF_DAY) + hChange, tempB.get(Calendar.MINUTE) +
                    iChange);

            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);

            if (victim == null) {
                int accId = MapleClient.getAccIdFromCharName(splitted[1]);
                if (accId >= 0 && MapleCharacter.tempban(reason, tempB, gReason, accId)) {
                    cserv.getWorldInterface().broadcastMessage(c.getPlayer().getName(), MaplePacketCreator.serverNotice(6, "The character " + splitted[1] + " has been temporarily banned until " + df.format(tempB.getTime()) + " for: " + originalReason).getBytes());
                } else {
                    mc.dropMessage("There was a problem offline banning character " + splitted[1] + ".");
                }
            } else {
                victim.tempban(reason, tempB, gReason);
                cserv.getWorldInterface().broadcastMessage(c.getPlayer().getName(), MaplePacketCreator.serverNotice(6, "The character " + splitted[1] + " has been temporarily banned until " + df.format(tempB.getTime()) + " for: " + originalReason).getBytes());
            }
        } else if (splitted[0].equals("!掉线")) {
            int level = 0;
            MapleCharacter victim;
            if (splitted[1].charAt(0) == '-') {
                level = StringUtil.countCharacters(splitted[1], 'f');
                victim = cserv.getPlayerStorage().getCharacterByName(splitted[2]);
            } else {
                victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            }
            if (level < 2) {
                victim.getClient().getSession().close();
                victim.Dci();
                if (level >= 1) {
                    victim.getClient().disconnect();
                    victim.Dci();
                }
            } else {
                mc.dropMessage("Please use dc -f instead.");
            }
        } else if (splitted[0].equals("！解封")) {
            String playerName = splitted[1];
            int accountid;
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
                ps.setString(1, playerName);
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    accountid = rs.getInt("accountid");
                    PreparedStatement psb = con.prepareStatement("SELECT banned, tempban FROM accounts WHERE id = ?");
                    psb.setInt(1, accountid);
                    ResultSet rsb = psb.executeQuery();
                    rsb.next();
                    if (rsb.getInt("banned") != 1 && rsb.getLong("tempban") == 0) {
                        rsb.close();
                        psb.close();
                        mc.dropMessage(playerName + " account is not banned.");
                        return;
                    }
                    rsb.close();
                    psb.close();
                    psb = con.prepareStatement("UPDATE accounts SET banned = 0, banreason = null, tempban = '0000-00-00 00:00:00', greason = null WHERE id = ?");
                    psb.setInt(1, accountid);
                    psb.executeUpdate();
                    psb.close();
                    mc.dropMessage(playerName + "'：帐号已经成功取消封停.");
                } else {
                    mc.dropMessage(playerName + " 不存在!");
                }
                rs.close();
                ps.close();
            } catch (SQLException e) {
                System.out.println("SQL Exception: " + e);
            }
        }
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
                    new CommandDefinition("封号", "charname reason", "Permanently ip, mac and account ban the given character", 1),
                    new CommandDefinition("tempban", "<name> [i / m / w / d / h] <amount> [r  [reason id] : Text Reason", "Tempbans the given account", 1),
                    new CommandDefinition("掉线", "[-f] name", "Disconnects player matching name provided. Use -f only if player is persistent!", 3),
                    new CommandDefinition("解封", "<character name>", "Unbans the character's account", 5)
                };
    }
}