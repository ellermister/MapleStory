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

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.life.MapleMonster;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

/** 
 * 
 * @author Bassoe 
 */
public class PassiveEnergyHandler extends AbstractMaplePacketHandler {
    //private Logger log = LoggerFactory.getLogger(EnergyPassiveHandler.class); 
    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readByte(); // 02 
        slea.readInt(); // 11 F1 F8 4D 
        slea.readShort(); // 00 00 
        slea.readByte(); // 00 
        slea.readShort(); // 08 00 
        slea.readInt(); // D7 8A 11 00 
        int oid = slea.readInt(); // 6B 00 00 00 
        slea.readInt(); // 06 80 05 05 
        slea.readShort(); // D4 00 
        slea.readShort(); // D7 00 
        slea.readShort(); // D6 00 
        slea.readInt(); // D7 00 00 00 
        int damage = slea.readInt(); // 9F 86 01 00 
        slea.readInt(); // CA 98 39 DA 
        slea.readShort(); // C5 00 
        slea.readShort(); // D7 00 

        MapleMonster attacker = (MapleMonster) c.getPlayer().getMap().getMapObject(oid);
        if (attacker == null) {
            return;
        }
        c.getPlayer().getMap().damageMonster(c.getPlayer(), attacker, damage);
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.damageMonster(oid, damage), false, true);

    }
}  