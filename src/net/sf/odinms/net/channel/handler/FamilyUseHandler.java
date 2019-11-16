/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author
 */
public final class FamilyUseHandler extends AbstractMaplePacketHandler {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(FamilyUseHandler.class);

    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int type = slea.readInt();
        int cost = 0;
        boolean success = true;
        MapleCharacter victim = null;
        switch (type) {
            case 0:
                victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
                cost = -300;
                if (victim != null) {
                    c.getPlayer().changeMap(victim.getMap(), victim.getMap().getPortal(0));
                } else {
                    success = false;
                }
                break;
            case 1: // TODO give a check to the player being forced somewhere else..

                cost = -500;
                victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
                if (victim != null) {
                    victim.changeMap(c.getPlayer().getMap(), c.getPlayer().getMap().getPortal(0));
                } else {
                    success = false;
                }
                break;
//            case 2: // drop rate + 50% 15 min
//                // TODO : code
//                break;
//            case 3: // exp rate + 50% 15 min
//                // TODO : code
//                break;
//            case 4: // 6 family members in pedigree online Drop Rate & Exp Rate + 100% 30 minutes
//                // TODO : code
//                break;
//            case 5: // drop rate + 100% 15 min
//                // TODO : code
//                break;
//            case 6: // exp rate + 100% 15 min
//                // TODO : code
//                break;
//            case 7: // drop rate + 100% 30 min
//                // TODO : code
//                break;
//            case 8: // exp rate + 100% 30 min
//                // TODO : code
//                break;
//            case 9: // drop rate + 100% party 30 min
//                // TODO : code
//                break;
//            case 10: // exp rate + 100% party 30 min
//                // TODO : code
//                break;
        }
        if (success) {
            c.getPlayer().getFamily().gainReputation(cost);
        } else {
            c.getPlayer().dropMessage("Either you are not on the correct channel, or an error occured.");
        }
    }
}