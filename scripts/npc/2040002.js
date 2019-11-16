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
	Olson the Toy Soldier - Eos Tower 100th Floor(221024400)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var dh;
var entry = true;

function start() {
	dh = cm.getEventManager("DollHouse");
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
	} else {
		if(mode == 0 && status == 0) {
			cm.sendNext("I see. It's very understandable, considering the fact that you'll be facing a very dangerous monster inside. If you ever feel a change of heart, then please come talk to me. I sure can use help from someone like you.");
			cm.dispose();
			return;
		} else if(mode == 0 && status == 2) {
			cm.sendNext("I see. Please talk to me when you're ready to take on this task. I advise you not to take too much time, through, for the monster may turn into something totally different. We have to act like we don't know anything.");
			cm.dispose();
			return;
		}
		if(mode == 1) {
			status++;
		} else {
			status--;
		}
		if(cm.getQuestStatus(3230).getId() == net.sf.odinms.client.MapleQuestStatus.Status.STARTED.getId()) {
			if(status == 0) {
				cm.sendYesNo("Hmmm...I've heard a lot about you through #b#p2040001##k. You got him a bunch of #b#t4031093##k so he can fight off boredom at work. Well ... alright, then. There's a dangerous, dangerous monster inside. I want to ask you for help in regards to locating it. Would you like to help me out?");
			} else if(status == 1) {
				cm.sendNext("Thank you so much. Actually, #b#t4031093##k asked you to get #b#p2040001##k as a way of testing your abilities to see if you can handle this, so don't think of it as a random request. I think someone like you can handle adversity well.");
			} else if(status == 2) {
				cm.sendYesNo("A while ago, a monster came here from another dimension thanks to a crack in dimensions, and it stole the pendulum of the clock. It hid itself inside the room over there camouflaged as a dollhouse. It all looks the same to me, so there's no way to find it. Would you help us locate it?");
				if(dh.getProperty("noEntry").equals("true"))
					entry = false;
			} else if(status == 3) {
				cm.sendNext("Alright! I'll take you to a room, where you'll find a number of dollhouses all over the place. One of them will look slightly different from the others. Your job is to locate it and break its door. If you break a wrong dollhouse, however, you'll be sent out here without warning, so please be careful on that.");
			} else if(status == 4) {
				cm.sendNextPrev("You'll also find monsters in there, and they have gotten so powerful thanks to the monster from the other dimension that you won't able to take them down. Please find #b#t4031094##k within the time limit and then notify #b#p2040028##k, who should be inside. Let's get this started!");
			} else if(status == 5) {
				if(entry == false) {
					cm.sendPrev("Someone else must be inside looking for the dollhouse. Unfortunately I can only let in one person at a time, so please wait for your turn.");
				} else {
					cm.removeAll(4031093);
					dh.newInstance("DollHouse");
					dh.getInstance("DollHouse").registerPlayer(cm.getChar());
				}
				cm.dispose();
			}
		} else if(cm.getQuestStatus(3230).getId() == net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
			cm.sendNext("Thanks to #h #, we got the #b#t4031094##k back and destroyed the monster from the other dimension. Thankfully we haven't found one like that since. I can't thank you enough for helping us out. Hope you enjoy your stay here at #m220000000#!");
			cm.dispose();
		} else {
			cm.sendOk("We are the toy soldiers here guarding this room, preventing anyone else from entering. I cannot inform you of the reasoning behind this policy. Now, if you'll excuse me, I am working here.");
			cm.dispose();
		}
	}
}
