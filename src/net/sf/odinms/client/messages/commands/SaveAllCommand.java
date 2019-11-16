package net.sf.odinms.client.messages.commands;

import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashSet;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.messages.CommandDefinition;
import net.sf.odinms.client.messages.Command;
import net.sf.odinms.client.messages.IllegalCommandSyntaxException;
import net.sf.odinms.client.messages.MessageCallback;

public class SaveAllCommand implements Command {

    @Override
    public void execute(MapleClient c, MessageCallback mc, String[] splitted) throws Exception, IllegalCommandSyntaxException {
        if (splitted[0].equals("!saveall")) {
            Collection<ChannelServer> ccs = ChannelServer.getAllInstances();
            for (ChannelServer chan : ccs) {
                mc.dropMessage("Saving characters on channel " + chan.getChannel());
                if (chan != null) {
                    Collection<MapleCharacter> chars = new LinkedHashSet<MapleCharacter>(Collections.synchronizedCollection(chan.getPlayerStorage().getAllCharacters()));
                    synchronized (chars) {
                        for (MapleCharacter chr : chars) {
                            try {
                                if (chr != null) {
                                    chr.saveToDB(true);
                                }
                            } catch (Exception e) {
                                continue;
                            }
                        }
                    }
                }
            }
            mc.dropMessage("所有人物数据已经存档.");
        }
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
                    new CommandDefinition("saveall", "", "Saves all characters", 3)
                };
    }
}