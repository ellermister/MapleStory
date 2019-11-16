/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
					   Matthias Butz <matze@odinms.de>
					   Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Hikari - Showa Town(801000000)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var price = 300;

function start() {
	status = -1;
	action(1,0,0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	}
	if (mode == 1)
		status++;
	else {
		cm.sendOk("Please come back some other time.");
		cm.dispose();
		return;
	}
	if (status == 0) {
		cm.sendYesNo("Would you like to enter the bathhouse? That'll be "+price+" mesos for you");
	}
	if (status == 1) {
		if (cm.getMeso < price) {
			cm.sendOk("Please check and see if you have "+price+" mesos to enter this place.");
			cm.dispose();
		}
		cm.gainMeso(-price);
		if (cm.getChar().getGender() == 0) {
			cm.warp(801000100);
		} else {
			cm.warp(801000200);
		}
		cm.dispose();
	}
}
