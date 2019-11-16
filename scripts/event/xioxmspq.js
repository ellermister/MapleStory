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
	Kerning PQ
-- By ---------------------------------------------------------------------------------------------
	Stereo
-- Version Info -----------------------------------------------------------------------------------
	1.1 - fixed minor problems
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

/*
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300001,4001007,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300000,4001008,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300002,4001008,1);
INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300003,4001008,1);
*/

importPackage(net.sf.odinms.world);

var exitMap;
var instanceId;
var minPlayers = 3;

function init() {
	instanceId = 1;
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup() {
	exitMap = em.getChannelServer().getMapFactory().getMap(970030002); //ÐÝÏ¢´¦
	var instanceName = "xioxmspq" + instanceId;
	var eim = em.newInstance(instanceName);
	var mf = eim.getMapFactory();
	instanceId++;
	var map = mf.getMap(677000013);
	map.shuffleReactors();
	//var firstPortal = eim.getMapInstance(105100401).getPortal("next00");
	//firstPortal.setScriptName("kpq1");
	var eventTime = 30 * (1000 * 60);
	eim.schedule("timeOut", eventTime);
	eim.startEventTimer(eventTime);

	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(677000013);
	player.changeMap(map, map.getPortal(0));
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) {
	if (eim.isLeader(player)) { // Check for party leader
		// Boot whole party and end
		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
			playerExit(eim, party.get(i));
		}
		em.setProperty("entryPossible", "true");
		eim.dispose();
	} else { // Boot dead player
		// If only 2 players are left, uncompletable
		var party = eim.getPlayers();
		if (party.size() <= minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			em.setProperty("entryPossible", "true");
			eim.dispose();
		} else {
			playerExit(eim, player);
		}
	}
}

function playerDisconnected(eim, player) {
	if (eim.isLeader(player)) { // Check for party leader
		// Boot whole party and end
		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
			if (party.get(i).equals(player)) {
				removePlayer(eim, player);
			} else {
				playerExit(eim, party.get(i));
				em.setProperty("entryPossible", "true");
			}
		}
		eim.dispose();
	} else { // Boot disconnected player
		// If only 2 players are left, uncompletable:
		var party = eim.getPlayers();
		if (party.size() < minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
				em.setProperty("entryPossible", "true");
			}
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
			em.setProperty("entryPossible", "true");
		}
		eim.dispose();
	}
	else
		playerExit(eim, player);
}

function disbandParty(eim) {
	// Boot whole party and end
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	em.setProperty("entryPossible", "true");
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
	// KPQ does nothing special with winners
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	em.setProperty("entryPossible", "true");
	eim.dispose();
}

function allMonstersDead(eim) {
}

function cancelSchedule() {
}

function timeOut(eim) {

	if (eim.getPlayerCount() > 0) {
		var pIter = eim.getPlayers().iterator();
		while (pIter.hasNext()) {
			playerExit(eim, pIter.next());
		}
	}
	em.setProperty("entryPossible", "true");
	eim.dispose();

}