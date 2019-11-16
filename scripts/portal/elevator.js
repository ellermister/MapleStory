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
	Ludibrium Elevator
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.1 - Merge two elevator script into one [Information]
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

function enter(pi) {
	if(pi.getPlayer().getMapId() == 222020100) {
		if(pi.getPlayer().getClient().getChannelServer().getEventSM().getEventManager("elevator").getProperty("isDown").equals("true")) {
			pi.warp(222020110, "sp");
			return true;
		} else {
			pi.playerMessage("现在还不能进入,请稍后再试！");
			return false;
		}
	} else if(pi.getPlayer().getMapId() == 222020200) {
		if(pi.getPlayer().getClient().getChannelServer().getEventSM().getEventManager("elevator").getProperty("isUp").equals("true")) {
			pi.warp(222020210, "sp");
			return true;
		} else {
			pi.playerMessage("现在还不能进入,请稍后再试！");
			return false;
		}
	} else {
		pi.playerMessage("系统发生错误，请联系管理员解决！");
		return false;
	}
}
