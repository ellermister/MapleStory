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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Aqua Balloon - LudiPQ 6th stage NPC
-- By ---------------------------------------------------------------------------------------------
	xQuasar
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by xQuasar
---------------------------------------------------------------------------------------------------
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == 0) {
		cm.sendNext("Hello, and welcome to the 6th stage of the Ludibrium Party Quest. Look here, and you'll see a number of boxes. All you have to do, is find the right combination, and press up on it to teleport up. But, if you get it wrong, you will be teleported back down to the bottom. Good luck!");
		cm.dispose();
	}
}