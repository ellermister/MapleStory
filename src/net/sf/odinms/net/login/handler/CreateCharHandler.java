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

package net.sf.odinms.net.login.handler;

import net.sf.odinms.client.Equip;
import net.sf.odinms.client.Item;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleCharacterUtil;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleInventory;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.MapleSkinColor;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class CreateCharHandler extends AbstractMaplePacketHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(CreateCharHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        String name = slea.readMapleAsciiString();
        int job = slea.readInt();
        int face = slea.readInt();
        int hair = slea.readInt();
        int hairColor = 0;
        int skinColor = 0;
        int top = slea.readInt();
        int bottom = slea.readInt();
        int shoes = slea.readInt();
        int weapon = slea.readInt();
        int gender = c.getGender();

        MapleCharacter newchar = MapleCharacter.getDefault(c);
        if (c.isGM()) {
            newchar.setGM(5);
        }
        newchar.setWorld(c.getWorld());
        newchar.setFace(face);
        newchar.setHair(hair + hairColor);
        newchar.setGender(gender);
        if (job == 2) {
            newchar.setStr(11);
            newchar.setDex(6);
            newchar.setInt(4);
            newchar.setLuk(4);
            newchar.setRemainingAp(0);
        } else {
            newchar.setStr(4);
            newchar.setDex(4);
            newchar.setInt(4);
            newchar.setLuk(4);
            newchar.setRemainingAp(9);
        }
        newchar.setName(name);
        newchar.setSkinColor(MapleSkinColor.getById(skinColor));
        if (job == 1) {
            newchar.setJob(0);
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161001, (byte) 0, (short) 1));
        } else if (job == 0) {
            newchar.setJob(1000);
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161047, (byte) 0, (short) 1));
        } else if (job == 2) {
            newchar.setJob(2000);
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161048, (byte) 0, (short) 1));
        }
        MapleInventory equip = newchar.getInventory(MapleInventoryType.EQUIPPED);
        Equip eq_top = new Equip(top, (byte) -5);
        eq_top.setWdef((short) 3);
        eq_top.setUpgradeSlots((byte) 7);
        equip.addFromDB(eq_top.copy());
        Equip eq_bottom = new Equip(bottom, (byte) -6);
        eq_bottom.setWdef((short) 2);
        eq_bottom.setUpgradeSlots((byte) 7);
        equip.addFromDB(eq_bottom.copy());
        Equip eq_shoes = new Equip(shoes, (byte) -7);
        eq_shoes.setWdef((short) 2); //rite? o_O
        eq_shoes.setUpgradeSlots((byte) 7);
        equip.addFromDB(eq_shoes.copy());
        Equip eq_weapon = new Equip(weapon, (byte) -11);
        eq_weapon.setWatk((short) 15);
        eq_weapon.setUpgradeSlots((byte) 7);
        equip.addFromDB(eq_weapon.copy());
        if (MapleCharacterUtil.canCreateChar(name, c.getWorld())) {
            newchar.saveToDB(false);
            c.getSession().write(MaplePacketCreator.addNewCharEntry(newchar, true));
        } else {
            log.warn(MapleClient.getLogMessage(c, "Trying to create a character with a name: {}", name));
        }
    }
}

