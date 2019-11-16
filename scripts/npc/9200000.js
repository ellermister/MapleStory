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
	Cody
-- By --------------------------------------------------------------------------------------------------
	xQuasar
Note by Tykian: Minor fixes/additions
**/

var status;
var oldWepName;
var oldWepId;
var oldWepQty;
var newWepId;
var newWepName;
var leaves;
var stimulator;
var cost;
var getNewWep;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1) {
			status = 0;
			cm.sendSimple("Yo. I'm here to create you a level 64 Maple Item! So, wotcha want?\r\n\r\n#b#L0#Maple Glory Sword (One-Handed Sword)#l\r\n#L1#Maple Soul Rohen (Two-Handed Sword)#l\r\n#L2#Maple Steel Axe (One-Handed Axe)#l\r\n#L3#Maple Demon Axe (Two-Handed Axe)#l\r\n#L4#Maple Havoc Hammer (One-Handed Mace)#l\r\n#L5#Maple Belzet (Two-Handed Mace)#l\r\n#L6#Maple Kandiva Bow (Bow)#l\r\n#L7#Maple Nishada (Crossbow)#l\r\n#L8#Maple Skanda (Claw)#l\r\n#L9#Maple Asura Dagger (Dagger)#l\r\n#L10#Maple Dark Mate (Dagger)#l\r\n#L11#Maple Soul Spear (Spear)#l\r\n#L12#Maple Karstan (Polearm)#l\r\n#L13#Maple Shine Wand (Wand)#l\r\n#L14#Maple Wisdom Staff (Staff)#l\r\n#L15#Maple Golden Claw (Knuckler)#l\r\n#L16#Maple Gun 64 (Gun)#l\r\n#L17#Maple Warrior Shield (Warrior Shield)#l\r\n#L18#Maple Magician Shield (Magician Shield)#l\r\n#L19#Maple Thief Shield (Thief Shield)#l");
	} else if (status == 0) {
			if (selection >= 0 && selection <= 19) {
				if (selection == 0) {
					oldWepName = "Maple Soul Singer";
					oldWepId = 1302030;
					oldWepQty = 1;
					newWepName = "Maple Glory Sword";
					newWepId = 1302064;
					leaves = 100;
					cost = 300000;
					stimulator = 4130002;
				} else if (selection == 1) {
					oldWepName = "Maple Soul Singer";
					oldWepId = 1302030;
					oldWepQty = 2;
					newWepName = "Maple Soul Rohen";
					newWepId = 1402039;
					leaves = 200;
					cost = 500000;
					stimulator = 4130005;
				} else if (selection == 2) {
					oldWepName = "Maple Dragon Axe";
					oldWepId = 1412011;
					oldWepQty = 1;
					newWepName = "Maple Steel Axe";
					newWepId = 1312032;
					leaves = 100;
					cost = 300000;
					stimulator = 4130003;
				} else if (selection == 3) {
					oldWepName = "Maple Dragon Axe";
					oldWepId = 1412011;
					oldWepQty = 2;
					newWepName = "Maple Demon Axe";
					newWepId = 1412027;
					leaves = 200;
					cost = 500000;
					stimulator = 4130006;
				} else if (selection == 4) {
					oldWepName = "Maple Doom Singer";
					oldWepId = 1422014;
					oldWepQty = 1;
					newWepName = "Maple Havoc Hammer";
					newWepId = 1322054;
					leaves = 100;
					cost = 300000;
					stimulator = 4130004;
				} else if (selection == 5) {
					oldWepName = "Maple Doom Singer";
					oldWepId = 1422014;
					oldWepQty = 2;
					newWepName = "Maple Belzet";
					newWepId = 1422029;
					leaves = 200;
					cost = 500000;
					stimulator = 4130007;
				} else if (selection == 6) {
					oldWepName = "Maple Soul Searcher";
					oldWepId = 1452022;
					oldWepQty = 2;
					newWepName = "Maple Kandiva Bow";
					newWepId = 1452045;
					leaves = 200;
					cost = 500000;
					stimulator = 4130012;
				} else if (selection == 7) {
					oldWepName = "Maple Crossbow";
					oldWepId = 1462019;
					oldWepQty = 2;
					newWepName = "Maple Nishada";
					newWepId = 1462040;
					leaves = 200;
					cost = 500000;
					stimulator = 4130013;
				} else if (selection == 8) {
					oldWepName = "Maple Kandayo";
					oldWepId = 1472032;
					oldWepQty = 2;
					newWepName = "Maple Skanda";
					newWepId = 1472055;
					leaves = 200;
					cost = 500000;
					stimulator = 4130015;
				} else if (selection == 9 || selection == 10) {
					oldWepName = "Maple Wagner";
					oldWepId = 1332025;
					oldWepQty = 2;
					if (selection == 9) {
						newWepName = "Maple Asura Dagger";
						newWepId = 1332056;
					} else {
						newWepName = "Maple Dark Mate";
						newWepId = 1332055;
					}
					leaves = 200;
					cost = 500000;
					stimulator = 4130014;
				} else if (selection == 11) {
					oldWepName = "Maple Impaler";
					oldWepId = 1432012;
					oldWepQty = 2;
					newWepName = "Maple Soul Spear";
					newWepId = 1432040;
					leaves = 200;
					cost = 500000;
					stimulator = 4130008;
				} else if (selection == 12) {
					oldWepName = "Maple Scorpio";
					oldWepId = 1442024;
					oldWepQty = 2;
					newWepName = "Maple Karstan";
					newWepId = 1442051;
					leaves = 200;
					cost = 500000;
					stimulator = 4130009;
				} else if (selection == 13) {
					oldWepName = "Maple Lama Staff";
					oldWepId = 1382012;
					oldWepQty = 2;
					newWepName = "Maple Shine Wand";
					newWepId = 1372034;
					leaves = 200;
					cost = 500000;
					stimulator = 4130010;
				} else if (selection == 14) {
					oldWepName = "Maple Lama Staff";
					oldWepId = 1382012;
					oldWepQty = 2;
					newWepName = "Maple Wisdom Staff";
					newWepId = 1382039;
					leaves = 200;
					cost = 500000;
					stimulator = 4130011;
				} else if (selection == 15){
					oldWepName = "Maple Storm Finger";
					oldWepId = 1482021;
					oldWepQty = 2;
					newWepName = "Maple Golden Claw";
					newWepId = 1482022;
					leaves = 200;
					cost = 500000;
					stimulator = 4130016;
				} else if (selection == 16) {
					oldWepName = "Level 43 Gun";	
					oldWepId = 1492021;
					oldWepQty = 2;
					newWepName = "Level 64 Gun";
					newWepId = 1492022;
					leaves = 200;
					cost = 500000;
					stimulator = 4130017;
				} else if (selection == 17) {
					oldWepName = "Maple Shield";	
					oldWepId = 1092030;
					oldWepQty = 2;
					newWepName = "Maple Warrior Shield";
					newWepId = 1092046;
					leaves = 200;
					cost = 500000;
				} else if (selection == 18) {
					oldWepName = "Maple Shield";	
					oldWepId = 1092030;
					oldWepQty = 2;
					newWepName = "Maple Magician Shield";
					newWepId = 1092045;
					leaves = 200;
					cost = 500000;
				} else {
					oldWepName = "Maple Shield";	
					oldWepId = 1092030;
					oldWepQty = 2;
					newWepName = "Maple Thief Shield";
					newWepId = 1092047;
					leaves = 200;
					cost = 500000;
				}
				status = 1;
				cm.sendYesNo("Are you sure you want to make a #b" + newWepName + "#k? The following items and materials will be required...\r\n\r\n#i" + oldWepId + "# x" + oldWepQty + "\r\n#i4001126# x" + leaves + "\r\n A Stimulator can also be used if you have the required one! #r(Optional)#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/7/0# " + cost);
			} else {
				cm.dispose();
			}
	} else if (status == 1) {
		if (mode != 1) {
			cm.sendOk("No? Maybe you should get the required items first, or make up your mind. I'll be here, waiting.");
			cm.dispose();
		} else {
			if ((cm.getMeso() < cost) || (!cm.haveItem(oldWepId,oldWepQty)) || (!cm.haveItem(4001126,leaves))) {
				cm.sendOk("Sorry, but you don't seem to have all the items. Please get them all, and try again.");
				cm.dispose();
			} else if (stimulator == null || !cm.haveItem(stimulator)) {
				cm.gainItem(oldWepId,-oldWepQty);
				cm.gainItem(4001126,-leaves);
				cm.gainMeso(-cost);
				cm.gainItem(newWepId,1);
				cm.sendOk("There, all done! That was quick, wasn't it? If you need any more items, I'll be waiting here.");
				cm.dispose();
			} else {
				status = 2;
				cm.sendSimple("It appears that you have a #rStimulator#k for this weapon. Would you like to create the weapon with or without the #rStimulator#k? If you create without the #rStimulator#k, the item will always be #baverage#k. If you do create it with the #rStimulator#k, the item has a random chance of being #blower#k or #bhigher#k than average.\r\n#b#L20#Create weapon WITH Stimulator#l\r\n#L21#Create weapon WITHOUT Stimulator#l#k");
			}
		}
	} else if (status == 2) {
		if (selection == 21) {
			cm.gainItem(oldWepId,-oldWepQty);
			cm.gainItem(4001126,-leaves);
			cm.gainMeso(-cost);
			cm.gainItem(newWepId,1);
			cm.sendOk("There, all done! That was quick, wasn't it? If you need any more items, I'll be waiting here.");
			cm.dispose();
		} else {
			cm.gainItem(oldWepId,-oldWepQty);
			cm.gainItem(4001126,-leaves);
			cm.gainItem(stimulator,-1);
			cm.gainMeso(-cost);
			cm.gainItem(newWepId,1,true);
			cm.sendOk("There, all done! That was quick, wasn't it? If you need any more items, I'll be waiting here.");
			cm.dispose();
		}
	}
}
