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
	Bell - Kerning City Subway Station - to NLC
-- By ---------------------------------------------------------------------------------------------
	xQuasar
---------------------------------------------------------------------------------------------------
**/

var cost = 12000;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (cm.getChar().getMapId() == 103000100) {
			if (status == -1) {
				status = 0;
				cm.sendYesNo("Hey, due to popular demand, I can take you to #bNew Leaf City#k instantly now. It'll still cost you #b"+cost+" mesos#k, though. Are you sure you want to go to #bNew Leaf City#k?");
			} else {
				if (mode == 1) {
					if(cm.getMeso() >= cost) {
						cm.warp(600010001,0);
						cm.gainMeso(-cost);
					} else {
						cm.sendOk("Are you sure you have #b"+cost+" mesos#k?");
					}
					cm.dispose();
				} else {
					cm.sendOk("You must have some business to take care of here, right?");
					cm.dispose();
				}
			}
		} else if (cm.getChar().getMapId() == 600010001) {
			if (status == -1) {
				status = 1;
				cm.sendYesNo("Hey, due to popular demand, I can take you to #bKerning City#k instantly now. It'll still cost you #b"+cost+" mesos#k, though. Are you sure you want to go to #bKerning City#k?");
			} else {
				if (mode == 1) {
					if(cm.getMeso() >= cost) {
						cm.warp(103000100,0);
						cm.gainMeso(-cost);
					} else {
						cm.sendOk("Are you sure you have #b"+cost+" mesos#k?");
					}
					cm.dispose();
				} else {
					cm.sendOk("You must have some business to take care of here, right?");
					cm.dispose();
				}
			}
		} else {
			cm.dispose();
		}
	}
}