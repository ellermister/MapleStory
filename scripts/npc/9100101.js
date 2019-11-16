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

/*
@	Author: Santa / DestinyMS
@	Name: GMS-like Gachapon
	Ellinia
 */

var status = 0;

var prizes = new Array(2000005, 2022113, 2002018, 1382001, 1050008, 1442017, 1002084, 1050003, 1002064, 1061006, 1051027, 1442009, 1050056, 1051047, 1050049, 1040080, 1051055, 1372010, 1422005, 1002143, 1302027, 1061087, 1372003, 1302019, 1051023, 1050054, 1061083, 1051017, 1002028, 1322010, 1332013, 1050055, 1002245, 1092022);
var prizes1 = Math.floor(Math.random()*prizes.length);

importPackage(net.sf.odinms.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 1 && mode == 0) {
			cm.sendOk("See you next time.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.haveItem(5220000)) {
				cm.sendYesNo("You have some #bGachapon Tickets#k there.\r\nWould you like to try your luck?");
			} else {
				cm.sendOk("Here is #bGachapon#k.");
				cm.dispose();
			}
		} else if (status == 1 && mode == 1) {
			var win = prizes[prizes1];
			if (cm.canHold(win)) {
				cm.gainItem(5220000, -1);
				if (win >= 1000000 && win <= 1999999) {
					cm.gainItem(win, 1, true);
				} else {
					cm.gainItem(win, 1);
				}
				cm.sendOk("Ka-thump! An item dropped out of #rGachapon#k.");
			} else {
				cm.sendNext("Your Equip, Use, Setup or Etc. inventories seem to be full... please check them and try again.");
			}
			cm.dispose();
		} else {
			cm.sendOk("See you next time.");
			cm.dispose();
		}
	}
}