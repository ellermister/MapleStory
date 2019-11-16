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

package net.sf.odinms.client;

import net.sf.odinms.net.LongValueHolder;

public enum MapleDisease implements LongValueHolder {

    NULL(0x0),
    SLOW(0x1),//缓慢
    SEDUCE(0x80),//诱惑
    FISHABLE(0x100),//钓鱼
    CURSE(0x200),// 诅咒
    CONFUSE(0x80000),//诱惑
    STUN(0x2000000000000L),//眩晕
    POISON(0x4000000000000L),//中毒
    SEAL(0x8000000000000L),//封印
    DARKNESS(0x10000000000000L),//黑暗
    WEAKEN(0x4000000000000000L);//减弱
    //CURSE(0x8000000000000000L);
    private long i;

    private MapleDisease(long i) {
        this.i = i;
    }

    @Override
    public long getValue() {
        return i;
    }
}