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
package net.sf.odinms.server.constants;

/**
 *
 * @author Jay Estrella
 */
public final class InventoryConstants {

    public static final class EquipSlots {

        public final static byte WEAPON = -11,  MOUNT = -18,  BOTTOM = -6,  SHIELD = -10,  MEDAL = -46;
    }

    public static final class Items {

        public static final class Flags {

            public final static int LOCK = 0x01,  SPIKES = 0x02,  COLD = 0x04,  UNTRADEABLE = 0x08,  KARMA = 0x10,  PET_COME = 0x80,  UNKNOWN_SKILL = 0x100;

            public static final int getFlagByInt(int type) {
                if (type == 128) {
                    return PET_COME;
                } else if (type == 256) {
                    return UNKNOWN_SKILL;
                } else {
                    return 0;
                }
            }
        }

        public static final class Ratios {

            public final static float ITEM_ARMOR_EXP = 1 / 350000,  ITEM_WEAPON_EXP = 1 / 700000;
        }
    }

    public static final boolean isTimelessWeapon(int itemId) {
        return true;
    }

    public static final boolean isTimelessArmor(int itemId) {
        return itemId >= 1002776 && itemId <= 1002780;
    }

    public static final boolean isThrowingStar(int itemId) {
        return itemId / 10000 == 207;
    }

    public static final boolean isBullet(int itemId) {
        return itemId / 10000 == 233;
    }

    public static final boolean isRechargable(int itemId) {
        return itemId / 10000 == 233 || itemId / 10000 == 207;
    }

    public static final boolean isArrowForCrossBow(int itemId) {
        return itemId / 1000 == 2061;
    }

    public static final boolean isArrowForBow(int itemId) {
        return itemId / 1000 == 2060;
    }
}