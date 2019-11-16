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
	Author: xQuasar / DestinyMS
	Name: GMS-like Gachapon
	Place: New Leaf City
 */

var status = 0;

var itemList = new Array(1472010,1402010,1382001,1452000,1302026,1472023,1472019,1472022,1102011,1472033,2049002,
						 1402017,1442009,1472013,1472021,1472075,1092049,1372042,2000004,1382005,1332030,1432001,
						 1422025,1442015,1432017,1442025,1312004,1322015,1462005,1312012,1302003,1442004,1302028,
						 1402006,1322000,2022195,1412001,1372002,1472009,1422001,1462000,1412004,1452008,1432016,
						 1302021,4000176,1442000,2000005,2022113,1432013,1322024,1322012,1302012,1102028,1452006,
						 1302013,1462007,1332016,2043102,2043112,2044101,2044002,2044001,2041011,2041010,2044602,
						 2044601,2043305,2044401,2044314,2043702,2043701,1432004,1472054,1462006,1472012,1442010,
						 1472008,1472005,1382006,1422007,1332000,1402000,1452007,2340000,1402009,1102029,1402001,
						 1372005,1442021,2040915,2040919,2040920,2040914);
var listLength = itemList.length + 1;
var randNum = Math.floor(Math.random()*listLength);
var randItem = itemList[randNum];

function start() {
	status = -1;
	action(1,0,0);
}

function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1) {
		status++;
		if (cm.haveItem(5220000)) {
			cm.sendYesNo("You have some #bGachapon Tickets#k there.\r\nWould you like to try your luck?");
		} else {
			cm.sendOk("Here is #bGachapon#k.");
			cm.dispose();
		}
	} else if (status == 0) {
		if (mode == 1) {
			if (cm.canHold(randItem)) {
				cm.gainItem(5220000, -1);
				if (randItem >= 1000000 && randItem <= 1999999) {
					cm.gainItem(randItem, 1, true);
				} else {
					cm.gainItem(randItem, 1);
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