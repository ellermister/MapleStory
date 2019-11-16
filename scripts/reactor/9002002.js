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

function act() {
	if (rm.getPlayer().getMapId() > 910000000 && rm.getPlayer().getMapId() < 910000023 && rm.getPlayer().getEventInstance() != null) {
		var rand = Math.floor(Math.random() * 4 + 1);
		if (rand < 4) {
			var random = Math.floor(Math.random() * 8 + 1);
			rm.playerMessage("An unknown force warps you elsewhere.");
		switch (random) {
			case 1: rm.warp(910000014); break;
			case 3: rm.warp(910000015); break;
			case 4: rm.warp(910000016); break;
			case 5: rm.warp(910000017); break;
			case 6: rm.warp(910000020); break;
			case 7: rm.warp(910000021); break;
			case 8: rm.warp(910000022); break;
		}
		} else {
			rm.dropItems();
		}
	} else {
		rm.playerMessage("An unknown force warps you elsewhere.");
		rm.warp(109010000);
	}
}