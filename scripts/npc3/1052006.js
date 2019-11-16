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

/* Author: Xterminator
	NPC Name: 		Jake
	Map(s): 		Victoria Road : Subway Ticketing Booth (103000100)
	Description: 		Subway Worker
*/
var meso = Array(500, 1200, 2000);
var item = Array(4031036, 4031037, 4031038);
var sel;
var show;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		} else if (status == 1 && mode == 0) {
			cm.sendNext("You can enter the premise once you have bought the ticket. I heard there are strange devices in there everywhere but in the end, rare precious items await you. So let me know if you ever decide to change your mind.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var level = cm.getPlayer().getLevel();
			if (level <= 19) {
				cm.sendNext("You can enter the premise once you have bought the ticket; however it doesn't seem like you can enter here. There are foreign devices underground that may be too much for you to handle, so please train yourself, be prepared, and then come back.");
				cm.dispose();
			} else {
				var selStr = "You must purchase the ticket to enter. Once you have made the purchase, you can enter through The Ticket Gate on the right. What would you like to buy?#b";
				for (var i = 0; i < 3; i++) {
					if (level >= 20 && level <= 29) {
						selStr += "\r\n#L" + i + "##bConstruction Site B" + (i + 1) + "#l";
						break;
					} else if (level >= 30 && level <= 39 && i < 2) {
						selStr += "\r\n#L" + i + "##bConstruction Site B" + (i + 1) + "#l";
					} else if (level >= 40) {
						selStr += "\r\n#L" + i + "##bConstruction Site B" + (i + 1) + "#l";
					}
				}
				cm.sendSimple(selStr);
			}
		} else if (status == 1) {
			sel = selection;
			show = sel + 1;
			cm.sendYesNo("Will you purchase the ticket to #bConstruction Site B" + show + "#k? It'll cost you " + meso[sel] + " mesos. Before making the purchase, please make sure you have an empty slot on your etc. inventory.");
		} else if (status == 2) {
			if (cm.getPlayer().getMeso() < meso || !cm.canHold(item[sel])) {
				cm.sendNext("Are you lacking mesos? Check and see if you have an empty slot on your etc. inventory or not.");
				cm.dispose();
			} else {
				var text = Array("I heard Area 1 has some precious items available but with so many traps all over the place most come back out early. Wishing you the best of luck.", "I heard Area 2 has rare, precious items available but with so many traps all over the place most come back out early. Please be safe.", "I heard Area 3 has very rare, very precious items available but with so many traps all over the place most come back out early. Wishing you the best of luck.");
				cm.gainMeso(-meso[sel]);
				cm.gainItem(item[sel], 1);
				cm.sendNext("You can insert the ticket in The Ticket Gate. " + text[sel]);
				cm.dispose();
			}
		}
	}
}