/*
	This file is part of the odinms Maple Story Server
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
	VIP Cab - Victoria Road : Ellinia (101000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var fromMap = new Array(251000000);
var toMap = new Array(200000000);
var cost;
var location;
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
	}
	if (mode == 0) {
		cm.sendNext("#r#m"+toMap[location]+"##k#b很危险。");
		cm.dispose();
		return;
	}
	if(mode == 1) {
		status++;
	}
	if(status == 0) {
		switch(cm.getChar().getMapId()) {
			case fromMap[0]:
				location = 0;
				break;
			case fromMap[1]:
				location = 1;
				break;
			case fromMap[2]:
				location = 2;
				break;
		}
		cm.sendNext("#b你确定要去吗#r#m"+toMap[location]+"##k?");
	} else if(status == 1) {
		if (cm.getJob() == 0) {
		cm.sendYesNo("#b你确定要去吗#b#m"+toMap[location]+"##k?");
			cost = 45000;
		} else {
			cm.sendYesNo("#b你好!想要坐黑车吗?费用#r45000#b金币");
			cost = 45000;
		}
	} else if(status == 2) {
		if(cm.getMeso() < cost) {
			cm.sendNext("#r对不起，你的金币不够支付车费。");
			cm.dispose();
		} else{
			cm.warp(toMap[location]);
			cm.gainMeso(-cost);
			cm.dispose();
		}
	}
}
