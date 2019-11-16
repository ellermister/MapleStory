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
	Mr. Moneybags - Stat Resetter
-- By --------------------------------------------------------------------------------------------------
	xQuasar
**/

importPackage(net.sf.odinms.client);

var status = 0;
var str;
var dex;
var inte;
var luk;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1) {
		status = 0;
		cm.sendNext("Hey there - how's it going? I'm an AP resetter.");
	} else if (status == 0) {
		status = 1;
		cm.sendYesNo("Would you like to have your AP reset? It'll cost #b5,000,000 mesos#k.");
	} else if (status == 1) {
		if (mode == 1 && (cm.getMeso() >= 5000000)) {
			cm.gainMeso(-5000000);
			cm.getPlayer().apReset();
			cm.sendOk("There, all done! Enjoy~");
			cm.dispose();
		} else if (mode == 1 && (cm.getMeso() < 5000000)) {
			cm.sendNext("Sorry, you don't have enough mesos. You'll need #b5,000,000#k to get your stats reset...");
			cm.dispose();
		} else {
			cm.sendNext("That's fine with me, too. Come and see me again if you want a stat reset.");
			cm.dispose();
		}
	}
}