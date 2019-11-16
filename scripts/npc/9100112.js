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
@author xQuasar
npc: EXP gachapon
 */
 
var status;

var randList = new Array(1,1,13,2,2,2,3,3,3,4,4,4,5,5,6,6,7,7,8,8,9,10,11,12,1);
var writsList = new Array(2370012,2370011,2370010,2370009,2370008,2370007,2370006,2370005,2370004,2370003,2370002,2370001,2370000);
var randNum = Math.floor(Math.random() * randList.length);
var randWritNo = randList[randNum];
var randWrit = writsList[randWritNo];

function start() {
	status = -1;
	action(1,0,0);
}

function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1) {
		status = 0;
		if (cm.haveItem(5220000)) {
			cm.sendNext("你好..如果你可以给我个#v5220000#我可以给你#r孙子兵法#k哦！");
		} else {
			cm.sendOk("干嘛....");
			cm.dispose();
		}
	} else if (status == 0) {
		status = 1;
		cm.sendYesNo("You seem to have a #bGachapon Ticket#k there. Would you like to try your luck?!");
	} else if (status == 1) {
		if (mode == 1) {
			if ((!(randWrit >= 2370000 && randWrit <= 2370012)) || randWrit == undefined || randWrit == null) {
				randWrit = 2370012;
			}
			if (cm.canHold(randWrit)) {
				cm.gainItem(5220000,-1);
				cm.gainItem(randWrit,1);
				cm.sendOk("Here's a #rScroll of Solomon#k... use it wisely.");
			} else {
				cm.sendNext("Your USE inventory is full. Please check it and try again.");
			}
		}
		cm.dispose();
	} else {
		cm.dispose();
	}
}