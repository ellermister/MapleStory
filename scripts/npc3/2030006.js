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

/* Holy Stone
	Hidden Street: Holy Ground at the Snowfield (211040401)
	
	Custom quest: 100102
*/

importPackage(net.sf.odinms.client);

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("lulu, see you next time.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.haveItem(4031058) || !cm.getQuestStatus(100102).equals(MapleQuestStatus.Status.STARTED)) {
				cm.sendOk("Lulz, I am a stone.");
				cm.dispose();
			} else {
				cm.sendNext("Lulz, I am a stone.");
			}
		} else if (status == 1) {
			cm.sendNextPrev("Give me a #bDark Crystal#k and I will allow you to answer a question which will allow you to obtain the #bNecklace of Wisdom#k.");
		} else if (status == 2) {
			if (!cm.haveItem(4005004)) {
				cm.sendOk("Olol, you don't have any #bDark Crystal#ks.");
				cm.dispose();
			} else {
				cm.gainItem(4005004, -1);
				cm.sendSimple("Lululu, here is your question: \r\nWho is not part of the OdinMS development team?\r\n#L0#Vimes#l\r\n#L1#Serpendiem#l\r\n#L2#Paul#l\r\n#L3#Matze#l");
			}
		} else if (status == 3) {
			if (selection == 2) {
				cm.gainItem(4031058, 1);
				cm.sendOk("Indeed, lul.");
			} else {
				cm.sendOk("OLOLOLOLOLOLOLOL, wrong.");
			}
			cm.dispose();
		}
	}
}	