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
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.messages.CommandProcessor;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class SpouseChatHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        String recipient = slea.readMapleAsciiString();
        String text = slea.readMapleAsciiString();
        if (!CommandProcessor.getInstance().processCommand(c, text)) {
            MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterByName(recipient);
            if (player != null) {
                player.getClient().getSession().write(MaplePacketCreator.spouseChat(c.getPlayer().getName(), text, 5));
                c.getSession().write(MaplePacketCreator.spouseChat(c.getPlayer().getName(), text, 4));
            } 
            else {
                try {
                    if (ChannelServer.getInstance(c.getChannel()).getWorldInterface().isConnected(recipient)) {
                        ChannelServer.getInstance(c.getChannel()).getWorldInterface().spouseChat(c.getPlayer().getName(), recipient, text);
                        c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 1));
                    } 
                    else {
                        c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 0));
                    }
                } 
                catch (RemoteException e) {
                    c.getSession().write(MaplePacketCreator.getWhisperReply(recipient, (byte) 0));
                    c.getChannelServer().reconnectWorld();
                }
             }
        }
    }
}