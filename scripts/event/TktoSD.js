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
	TktoSD that travel between Orbis, Mu Lung and Herb Town
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.4 - Dam! Fix timer again! [Information]
	1.3 - Fix for timer [Information]
	1.2 - Correct depart point to orbis [Information]
	1.1 - Remove some function that doesn't needed [Information]
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

importPackage(net.sf.odinms.tools);

var returnTo = new Array(130000210,200000161);
var rideTo = new Array(200000161,130000210);
var birdRide = new Array(200090049,200090050);
var myRide;
var returnMap;
var map;
var docked;

var timeOnRide = 8 * 60 * 1000; //Seconds

function init() {
	em.setProperty("isRiding","false");
}

function playerEntry(eim, player) {
	myRide = em.getProperty("myRide");
	docked = em.getChannelServer().getMapFactory().getMap(rideTo[myRide]);
	returnMap = em.getChannelServer().getMapFactory().getMap(returnTo[myRide]);
	onRide = em.getChannelServer().getMapFactory().getMap(birdRide[myRide]);

	em.setProperty("isRiding","true");
	em.schedule("timeOut", timeOnRide);
	player.changeMap(onRide, onRide.getPortal(0));
	player.getClient().getSession().write(MaplePacketCreator.getClock(timeOnRide/1000));
}

function timeOut() {
	var iter = em.getInstance("TktoSD").getPlayers().iterator();
	while (iter.hasNext()) {
		var player = iter.next();
		player.changeMap(docked, docked.getPortal(0));
		em.getInstance("TktoSD").unregisterPlayer(player);
	}
	em.setProperty("isRiding","false");
	em.disposeInstance("TktoSD");
}

function playerDisconnected(eim, player) {
	eim.unregisterPlayer(player);
	em.disposeInstance("TktoSD");
}

function cancelSchedule() {
}
