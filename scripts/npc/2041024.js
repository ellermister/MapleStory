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
Tombstone (2041024)
Location: Deep Inside the Clocktower (220080000)
By: xQuasar
Function: Trades Etc. drops for Pieces of Cracked Dimension
*/

var status;

function start() {
	status = -1;
	action(1,0,0);
}

function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1) {
		status = 0;
		cm.sendSimple("Hey, I'm the Tombstone. By trading in some etc. pieces, I can give you a part of the Piece of Cracked Dimension, or if you have all three parts, forge them into a complete #bPiece of Cracked Dimension#k. So, what do you want?\r\n\r\n#b#L0#Trade for a Piece of Cracked Dimension A#l\r\n#L1#Trade for a Piece of Cracked Dimension B#l\r\n#L2#Trade for a Piece of Cracked Dimension C#l\r\n#L3#Forge a complete Piece of Cracked Dimension#l\r\n#L4#View Speed Rankings for Papulatus#l");
	} else if (status == 0) {
		if (selection == 0) {
			if (cm.haveItem(4000147,50) && cm.haveItem(4000132,50)) { //50 sealed teddy bears and 50 ghost pirate keys
				status = 1;
				cm.sendYesNo("Ho! Looks like you have the items. So, are you sure you would like to trade in #r50 Sealed Teddy Bears#k and #r50 Ghost Pirate Keys#k for a #rPiece of Cracked Dimension A#k?");
			} else {
				cm.sendOk("If you give me some items, I will be able to give you a #rPiece of Cracked Dimension A#k. They can be found from the monsters around here. The items are:\r\n\r\n#i4000147# x50\r\n#i4000132# x50");
				cm.dispose();
			}
		} else if (selection == 1) {
			if (cm.haveItem(4000134,25) && cm.haveItem(4000149,25)) { //25 viking sails and 25 sealed bottles
				status = 2;
				cm.sendYesNo("Ho! Looks like you have the items. So, are you sure you would like to trade in #r25 Viking Sails#k and #r25 Sealed Bottles#k for a #rPiece of Cracked Dimension B#k?");
			} else {
				cm.sendOk("If you give me some items, I will be able to give you a #rPiece of Cracked Dimension B#k. They can be found from the monsters around here. The items are:\r\n\r\n#i4000134# x25\r\n#i4000149# x25");
				cm.dispose();
			}
		} else if (selection == 2) {
			if (cm.haveItem(4000152,5) && cm.haveItem(4000151,5)) { //5 thanatos straps and 5 gatekeeper armbands
				status = 3;
				cm.sendYesNo("Ho! Looks like you have the items. So, are you sure you would like to trade in #r5 Thanatos Straps#k and #r5 Gatekeeper Armbands#k for a #rPiece of Cracked Dimension C#k?");
			} else {
				cm.sendOk("If you give me some items, I will be able to give you a #rPiece of Cracked Dimension C#k. They can be found from the monsters around here. The items are:\r\n\r\n#i4000152# x5\r\n#i4000151# x5");
				cm.dispose();
			}
		} else if (selection == 3) {
			if (cm.haveItem(4031176) && cm.haveItem(4031177) && cm.haveItem(4031178) && (cm.getMeso() >= 250000)) { //pieces of cracked dimension a,b & c
				status = 4;
				cm.sendYesNo("Ho! Looks like you have all 3 #rPieces of Cracked Dimension#k and #r100,000 mesos#k. So, would you like to forge a #rPiece of Cracked Dimension A#k, a #rPiece of Cracked Dimension C#k and a #rPiece of Cracked Dimension C#k into a complete #rPiece of Cracked Dimension#k?");
			} else {
				cm.sendOk("If you give me some items, I will be able to give you a complete #rPiece of Cracked Dimension#k. They can be obtained by handing over some monster drops to me. The items are:\r\n\r\n#i4031176# x1\r\n#i4031177# x1\r\n#i4031178# x1\r\n\r\n#r250,000#k #fUI/UIWindow.img/QuestIcon/7/0#");
				cm.dispose();
			}
		} else if (selection == 4) {
			cm.sendOk(cm.showSpeedRankings(1));
			cm.dispose();
		} else {
			cm.dispose();
		}
	} else if (status == 1) {
		if (mode == 1) {
			cm.gainItem(4000147,-50);
			cm.gainItem(4000132,-50);
			cm.gainItem(4031176,1);
			cm.sendOk("There you go! If you need anymore, there's no limit to how many of these I can make. Just get me those items.");
			cm.dispose();
		} else {
			cm.sendNext("I can make those items for you anytime.");
			cm.dispose();
		}
	} else if (status == 2) {
		if (mode == 1) {
			cm.gainItem(4000134,-25);
			cm.gainItem(4000149,-25);
			cm.gainItem(4031177,1);
			cm.sendOk("There you go! If you need anymore, there's no limit to how many of these I can make. Just get me those items.");
			cm.dispose();
		} else {
			cm.sendNext("I can make those items for you anytime.");
			cm.dispose();
		}
	} else if (status == 3) {
		if (mode == 1) {
			cm.gainItem(4000152,-5);
			cm.gainItem(4000151,-5);
			cm.gainItem(4031178,1);
			cm.sendOk("There you go! If you need anymore, there's no limit to how many of these I can make. Just get me those items.");
			cm.dispose();
		} else {
			cm.sendNext("I can make those items for you anytime.");
			cm.dispose();
		}
	} else if (status == 4) {
		if (mode == 1) {
			cm.gainItem(4031176,-1);
			cm.gainItem(4031177,-1);
			cm.gainItem(4031178,-1);
			cm.gainMeso(-250000);
			cm.gainItem(4031179,1);
			cm.sendOk("There you go! If you need anymore, there's no limit to how many of these I can make. Just get me those items.");
			cm.dispose();
		} else {
			cm.sendNext("I can make those items for you anytime.");
			cm.dispose();
		}
	} else {
		cm.dispose();
	}
}