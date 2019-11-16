package net.sf.odinms.client.messages.commands;

import java.rmi.RemoteException;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.messages.Command;
import net.sf.odinms.client.messages.CommandDefinition;
import net.sf.odinms.client.messages.CommandProcessor;
import net.sf.odinms.client.messages.IllegalCommandSyntaxException;
import net.sf.odinms.client.messages.MessageCallback;
import net.sf.odinms.net.ExternalCodeTableGetter;
import net.sf.odinms.net.PacketProcessor;
import net.sf.odinms.net.RecvPacketOpcode;
import net.sf.odinms.net.SendPacketOpcode;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.scripting.portal.PortalScriptManager;
import net.sf.odinms.scripting.reactor.ReactorScriptManager;
import net.sf.odinms.server.life.MapleMonsterInformationProvider;

public class ReloadingCommands implements Command {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(ReloadingCommands.class);

    @Override
    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception, IllegalCommandSyntaxException {
        ChannelServer cserv = c.getChannelServer();
        if (splitted[0].equals("!重载家族")) {
            try {
                mc.dropMessage("Attempting to reload all guilds... this may take a while...");
                cserv.getWorldInterface().clearGuilds();
                mc.dropMessage("Guilds reloaded.");
            } catch (RemoteException re) {
                mc.dropMessage("RemoteException occurred while attempting to reload guilds.");
                
               // log.error("RemoteException occurred while attempting to reload guilds.", re);
            }
        } else if (splitted[0].equals("!reloadops")) {
            try {
                ExternalCodeTableGetter.populateValues(SendPacketOpcode.getDefaultProperties(), SendPacketOpcode.values());
                ExternalCodeTableGetter.populateValues(RecvPacketOpcode.getDefaultProperties(), RecvPacketOpcode.values());
            } catch (Exception e) {
               // log.error("Failed to reload props", e);
            }
            PacketProcessor.getProcessor(PacketProcessor.Mode.CHANNELSERVER).reset(PacketProcessor.Mode.CHANNELSERVER);
            PacketProcessor.getProcessor(PacketProcessor.Mode.CHANNELSERVER).reset(PacketProcessor.Mode.CHANNELSERVER);
            mc.dropMessage("Recvops and sendops reloaded.");
        } else if (splitted[0].equals("!重载门")) {
            PortalScriptManager.getInstance().clearScripts();
            mc.dropMessage("Portals reloaded.");
        } else if (splitted[0].equals("!reloaddrops")) {
            MapleMonsterInformationProvider.getInstance().clearDrops();
            mc.dropMessage("Drops and quest drops reloaded.");
        } else if (splitted[0].equals("!重载反应")) {
            ReactorScriptManager.getInstance().clearDrops();
            mc.dropMessage("Reactors reloaded.");
        } else if (splitted[0].equals("!重载副本")) {
            for (ChannelServer instance : ChannelServer.getAllInstances()) {
                if (instance != null) {
                    instance.reloadEvents();
                }
            }
            mc.dropMessage("Events reloaded.");
        } else if (splitted[0].equals("!reloadcommands")) {
            CommandProcessor.getInstance().reloadCommands();
            mc.dropMessage("Commands reloaded.");
        }
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
                    new CommandDefinition("重载家族", "", "", 5),
                    new CommandDefinition("reloadops", "", "", 5),
                    new CommandDefinition("重载门", "", "", 5),
                    new CommandDefinition("reloaddrops", "", "", 5),
                    new CommandDefinition("重载反应", "", "", 5),
                    new CommandDefinition("reloadshops", "", "", 5),
                    new CommandDefinition("重载副本", "", "", 5),
                    new CommandDefinition("reloadcommands", "", "", 5)
                };
    }
}