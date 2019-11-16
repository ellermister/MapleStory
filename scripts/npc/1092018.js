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
-- Odin JavaScript ---------------------------------------------------------------------------
	Trash Can - Aboard the Nautilus
-- By ---------------------------------------------------------------------------------------------
	xQuasar
**/

var status;

function start() {
	status = -1;
	action(1,0,0);
}

function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == -1) {
			status = 0;
			cm.sendNext("A half-written letter... maybe it's important! Should I take a look?");
		} else if (status == 0) {
			if (cm.haveItem(4031839)) {
				cm.sendOk("I've already picked one up. I don't think I'll need to pick up another one.");
				cm.dispose();
			} else {
				cm.gainItem(4031839,1);
				cm.sendOk("I can barely make this out... but it reads Kyrin.");
				cm.dispose();
			}
		}
	}
}