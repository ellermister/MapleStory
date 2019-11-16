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
	SleepyWood
 */

var status = 0;

var itemList = new Array(2044102,2044502,2041020,2041017,2041011,2041014,2044702,2044602,2043302,2040302,2040805,
						 2040502,2044402,2040902,2040708,2040402,2043002,2044101,2041022,2044701,2040804,2040702,
						 2040707,2043801,2044001,2043701,2048003,2048000,4020001,4020002,2060001,2020002,2012003,
						 4004002,4020007,2000004,2012001,2050003,2020005,4010006,2020004,2002002,2020012,2020009,
						 4010005,2020003,4004000,2000005,2020013,2030000,2030001,2030002,2030003,2030004,2030005,
						 2030006,2030007,2030019,2020000,2012002,4020005,4010004,2020014,4006001,4006000,2050002,
						 2002003,1032003,1302022,1432009,1102014,1102018,1082149,1322023,1322025,1032008,1432008,
						 1322022,1442018,1442039,1322027,1032004,1032026,1442015,1032016,1032018,1422004,1422006,
						 1302021,1322024,1322012,1051017,1432015,1032001,1432018,1432000,1402014,1032000,1422000,
						 1032009,1082145,1452004,1452000,1002162,1452003,1040068,1060057,1002163,1452001,1002161,
						 1002038,1002036,1002013,1372002,1372003,1040044,1041048,1041049,1002150,1472004,1002175,
						 1472003,1472002,1041050,1041047,1332013,1060019,1442009,1442006,1422002,1402003,1040021,
						 1442010,1002009,1442007,1442031,1332002,1060017,2100000);
var listLength = itemList.length + 1;
var randNum = Math.floor(Math.random()*listLength);
var randItem = itemList[randNum];
//var amount; don't remove

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