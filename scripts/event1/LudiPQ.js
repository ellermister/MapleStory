/* 
 * This file is part of the OdinMS Maple Story Server
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
	Ludibrium PQ (101st Eos Tower)
-- By --------------------------------------------------------------------------------------------
	Stereo/xQuasar
-- Version Info -------------------------------------------------------------------------------
	1.2 - Adapted from KPQ to LPQ by xQuasar
	1.1 - fixed minor problems
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

/*
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300005,4001022,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300006,4001022,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300007,4001022,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300008,4001022,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300014,4001022,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300010,4001022,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300012,4001023,1);
*/

importPackage(net.sf.odinms.world);

var setupTask;
var exitMap;
var instanceId;
var minPlayers = 5;

function init() {
	instanceId = 1;
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup() {
	forceRefreshMaps();
	exitMap = em.getChannelServer().getMapFactory().getMap(922010000); // <exit>
	var instanceName = "LudiPQ" + instanceId;
	var eim = em.newInstance(instanceName);
	var mf = eim.getMapFactory();
	instanceId++;
	var map = mf.getMap(922010100);
	map.shuffleReactors();
	var firstPortal = eim.getMapInstance(922010100).getPortal("next00");
	firstPortal.setScriptName("lpq1");
	var eventTime = 20 * (1000 * 60);
	setupTask = eim.schedule("timeOut", eventTime);
	eim.startEventTimer(eventTime);
	return eim;
}
function forceRefreshMaps() { // Make sure all monsters & reactors have spawned.
	var cs = em.getChannelServer();
	var mf = cs.getMapFactory();
	var mapids = new Array(922010100, //stage 1
				922010200, //stage 2
				922010201, //tower's trap in stage 2
				922010300, //stage 3
				922010400, //stage 4
				922010401, //darkness in stage 4
				922010402, //darkness in stage 4
				922010403, //darkness in stage 4
				922010404, //darkness in stage 4
				922010405, //darkness in stage 4
				922010500, //stage 5
				922010501, //tower's maze in stage 5
				922010502, //tower's maze in stage 5
				922010503, //tower's maze in stage 5
				922010504, //tower's maze in stage 5
				922010505, //tower's maze in stage 5
				922010506, //tower's maze in stage 5
				922010700, //stage 7
				922010900, //crack on the wall
				922011000 //bonus
			);
	var maps = new Array();
	for (var y = 0; y < mapids.length; y++) {
		maps[y] = mf.getMap(mapids[y]);
	}

	for (var x = 0; x < maps.length; x++) {
		if (maps[x] != null) {
				
			cs.unloadMap(mapids[x]);
			cs.loadMap(mapids[x]);
				
		}
	}
}
function refreshMaps() { // Make sure all monsters & reactors have spawned.
	var cs = em.getChannelServer();
	var mf = cs.getMapFactory();
	var mapids = new Array(922010100, //stage 1
				922010200, //stage 2
				922010201, //tower's trap in stage 2
				922010300, //stage 3
				922010400, //stage 4
				922010401, //darkness in stage 4
				922010402, //darkness in stage 4
				922010403, //darkness in stage 4
				922010404, //darkness in stage 4
				922010405, //darkness in stage 4
				922010500, //stage 5
				922010501, //tower's maze in stage 5
				922010502, //tower's maze in stage 5
				922010503, //tower's maze in stage 5
				922010504, //tower's maze in stage 5
				922010505, //tower's maze in stage 5
				922010506, //tower's maze in stage 5
				922010700, //stage 7
				922010900, //crack on the wall
				922011000 //bonus
			);
	var maps = new Array();
	for (var y = 0; y < mapids.length; y++) {
		maps[y] = mf.getMap(mapids[y]);
	}
	var monsters = new Array(25, 0, 0, 8, 0, 1, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 3, 1, 0);
	var reactors = new Array(0, 12, 4, 8, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 3, 1, 36); //BONUS ISN'T DONE! (at least 20?)

	for (var x = 0; x < maps.length; x++) {
		if (monsters[x] > 0 || reactors[x] > 0) {
			if (maps[x] != null) {
				if ((maps[x].countMobOnMap() < monsters[x] || maps[x].countReactorsOnMap() < reactors[x]) || mapids[x] == 922011000 || mapids[x] == 922010201) {
					cs.unloadMap(mapids[x]);
					cs.loadMap(mapids[x]);
				}
			}
		}
	}
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(922010100);
	player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
	var party = eim.getPlayers();
	if (eim.isLeader(player)) { // Check for party leader, boot whole party and end
		for (var i = 0; i < party.size(); i++) {
			playerExit(eim, party.get(i));
		}
		openEntry();
		eim.dispose();
	} else { // Boot dead player; if only 2 players are left, uncompletable
		if (party.size() <= minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			cancelSchedule();
			openEntry();
			eim.dispose();
		} else {
			playerExit(eim, player);
		}
	}
}

function playerDisconnected(eim, player) {
	var party = eim.getPlayers();
	if (eim.isLeader(player)) { // Check for party leader, boot whole party and end
		for (var i = 0; i < party.size(); i++) {
			if (party.get(i).equals(player)) {
				removePlayer(eim, player);
			} else {
				playerExit(eim, party.get(i));
			}
		}
		cancelSchedule();
		openEntry();
		eim.dispose();
	} else { // Boot disconnected player; if only 2 players are left, uncompletable:
		if (party.size() < minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			cancelSchedule();
			openEntry();
			eim.dispose();
		} else
			playerExit(eim, player);
	}
}

function leftParty(eim, player) {			
	// If only 2 players are left, uncompletable
	var party = eim.getPlayers();
	if (party.size() <= minPlayers) {
		for (var i = 0; i < party.size(); i++) {
			playerExit(eim,party.get(i));
		}
		cancelSchedule();
		openEntry();
		eim.dispose();
	} else {
		playerExit(eim, player);
	}
}

function disbandParty(eim) {
	// Boot whole party and end
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	cancelSchedule();
	openEntry();
	eim.dispose();
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
}

// For offline players
function removePlayer(eim, player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) {
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	cancelSchedule();
	openEntry();
	eim.dispose();
}

function finish(eim) {
	var iter = eim.getPlayers().iterator();
	while (iter.hasNext()) {
		var player = iter.next();
		eim.unregisterPlayer(player);
	}
	cancelSchedule();
	openEntry();
	eim.dispose();
}

function timeOut(eim) {
	if (eim.getPlayerCount() > 0) {
		var pIter = eim.getPlayers().iterator();
		while (pIter.hasNext()) {
			playerExit(eim, pIter.next());
		}
	}
	openEntry();
	eim.dispose();
}

function openEntry() {
	em.setProperty("entryPossible", "true");
	refreshMaps();
}

function cancelSchedule() {
	setupTask.cancel(true);
}

function playerDead() {}
function allMonstersDead(eim) {}