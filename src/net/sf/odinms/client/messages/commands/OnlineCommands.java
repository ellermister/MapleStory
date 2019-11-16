package net.sf.odinms.client.messages.commands;

import java.rmi.RemoteException;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Map;

import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleCharacterUtil;
import net.sf.odinms.client.messages.Command;
import net.sf.odinms.client.messages.CommandDefinition;
import net.sf.odinms.client.messages.MessageCallback;

public class OnlineCommands implements Command {

    @Override
    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception, RemoteException {
        if (splitted[0].toLowerCase().equals("!在线玩家")) {
            mc.dropMessage("在线人物: ");
            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                mc.dropMessage("[频道 " + cs.getChannel() + "]");
                StringBuilder sb = new StringBuilder();
                Collection<MapleCharacter> cmc = cs.getPlayerStorage().getAllCharacters();
                for (MapleCharacter chr : cmc) {
                    if (sb.length() > 150) {
                        sb.setLength(sb.length() - 2);
                        mc.dropMessage(sb.toString());
                        sb = new StringBuilder();
                    }
                    if (!chr.isGM()) {
                        sb.append(MapleCharacterUtil.makeMapleReadable("ID:" + chr.getId() + "名字:" + chr.getName()));
                        sb.append(" 丨 ");
                    }
                }
                if (sb.length() >= 2) {
                    sb.setLength(sb.length() - 2);
                    mc.dropMessage(sb.toString());
                }
            }

        } else if (splitted[0].equalsIgnoreCase("!在线管理")) {
            try {
                mc.dropMessage("在线管理员: " + c.getChannelServer().getWorldInterface().listGMs());
            } catch (RemoteException re) {
            }
        } else if (splitted[0].equalsIgnoreCase("!连接状态")) {
            try {
                Map<Integer, Integer> connected = c.getChannelServer().getWorldInterface().getConnected();
                StringBuilder conStr = new StringBuilder("连接数量: ");
                boolean first = true;
                for (int i : connected.keySet()) {
                    if (!first) {
                        conStr.append(", ");
                    } else {
                        first = false;
                    }
                    if (i == 0) {
                        conStr.append("总计: ");
                        conStr.append(connected.get(i));
                    } else {
                        conStr.append("频道 ");
                        conStr.append(i);
                        conStr.append(": ");
                        conStr.append(connected.get(i));
                    }
                }
                mc.dropMessage(conStr.toString());
            } catch (RemoteException e) {
                c.getChannelServer().reconnectWorld();
            }
        }
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
                    new CommandDefinition("在线玩家", "", "List all of the users on the server, organized by channel.", 1),//巡查
                    new CommandDefinition("在线管理", "", "Shows the name of every GM that is online", 5),
                    new CommandDefinition("连接状态", "", "Shows how many players are connected on each channel", 5)
                };
    }

    private void Fake(SQLException e) {
        throw new UnsupportedOperationException("Not yet implemented");
    }
}