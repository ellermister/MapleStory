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

function enter(pi) {
	if (pi.getPlayer().getMap().getId() == 240060000) {
		if (pi.getPlayer().getMap().countMobOnMap(8810000) == 0 && pi.getPortal().hasSpawned()) {
			pi.warp(240060100, "st00");
			return true;
		}
		else {
			pi.playerMessage("A deathening roar is heard, you must slay Horntail's left head before you can proceed!");
		}
	}
	else if (pi.getPlayer().getMap().getId() == 240060100) {
		if (pi.getPlayer().getMap().countMobOnMap(8810001) == 0 && pi.getPortal().hasSpawned()) {
			pi.warp(240060200, "sp");
			return true;
		}
		else {
			pi.playerMessage("A deathening roar is heard, you must slay Horntail's right head before you can proceed!");
		}
	}
	return false;
}