/* 
 * This file is part of the OdinMS Maple Story Server
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

/* 
 * @Author Lerk
 * 
 * Nuris, Sharenian: Returning Path (990001100)
 * 
 * Exit of Guild Quest
 */

var status;
var GQItems = new Array(1032033, 4001024, 4001025, 4001026, 4001027, 4001028, 4001031, 4001032, 4001033, 4001034, 4001035, 4001037);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
        var invent = cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.EQUIPPED);
	  if (invent.countById(1032033) == 1) {
		net.sf.odinms.server.MapleInventoryManipulator.drop(cm.getPlayer().getClient(), null, invent.findById(1032033).getPosition(), 1);
	  }
        for (var i = 0; i < GQItems.length; i++) {
                cm.removeAll(GQItems[i]);
        }
        cm.warp(101030104);
        cm.dispose();
}