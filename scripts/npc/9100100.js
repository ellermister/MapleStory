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
@	Henesys
 */

var status = 0;

var prizes = new Array(3010013, 2000005, 2022113, 2043201, 2044001, 2041038, 2041039, 2041036, 2041037, 2041040, 2041041, 2041026, 2041027, 2044600, 2043301, 2040308, 2040309, 2040304, 2040305, 2040810, 2040811, 2040812, 2040813, 2040814, 2040815, 2040008, 2040009, 2040010, 2040011, 2040012, 2040013, 2040510, 2040511, 2040508, 2040509, 2040518, 2040519, 2040520, 2040521, 2044401, 2044403, 2040900, 2040902, 2040908, 2040909, 2044301, 2040406, 2040407,1302026, 1061054, 1061054, 1452003, 145003, 1382037, 1302063, 1041067, 1372008, 1432006, 1332053, 1432016, 1302021, 1002393, 1102042, 1051009, 1082148, 1102082, 143015, 1061043, 1452005, 1051016, 1442012, 1372017, 1332000, 1050026, 1041062);
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