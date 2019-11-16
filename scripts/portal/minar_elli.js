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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	The portal between Leafre and Ellinia
-- By ---------------------------------------------------------------------------------------------
	LaiLaiNoob
-- Version Info -----------------------------------------------------------------------------------
	1.1 - Optimize script [Information]
	1.0 - First Version by LaiLaiNoob
---------------------------------------------------------------------------------------------------
**/

importPackage(net.sf.odinms.server.maps);

function enter(pi) {
	if (pi.haveItem(4031346)) {
		if (pi.getPlayer().getMapId() == 240010100) {
			pi.warp(101010000, "minar00");
		} else {
			pi.warp(240010100, "elli00");
		}
		pi.gainItem(4031346, -1);
		pi.playerMessage("使用了神气的种子.");
		return true;
	} else {
		pi.playerMessage("没有足够的物品.无法进入.");
		return false;
	}
}
