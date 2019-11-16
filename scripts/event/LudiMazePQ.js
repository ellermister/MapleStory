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
	Ludibirum Maze PQ
-- By ---------------------------------------------------------------------------------------------
	Raz
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Raz
---------------------------------------------------------------------------------------------------
**/

/*
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400209','2022177','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400210','2022177','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400211','2022177','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400212','2022177','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400213','2022177','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400214','2022177','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400215','2022177','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400216','2022177','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400217','2022177','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400218','2022177','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400209','4001106','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400210','4001106','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400211','4001106','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400212','4001106','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400213','4001106','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400214','4001106','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400215','4001106','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400216','4001106','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400217','4001106','2');
INSERT INTO monsterdrops (`monsterid`,`itemid`,`chance`) VALUES ('9400218','4001106','2');
*/
importPackage(net.sf.odinms.world);
importPackage(net.sf.odinms.server.maps);

var exitMap;
var instanceId;
var finishMap;

function init() {
	instanceId = 1;
	em.setProperty("shuffleReactors", "true");
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup() {
	exitMap = em.getChannelServer().getMapFactory().getMap(809050017);
	finishMap = em.getChannelServer().getMapFactory().getMap(809050016);
	
	var instanceName = "LudiMazePQ" + instanceId;
	var eim = em.newInstance(instanceName);
	
	var mf = eim.getMapFactory();
	
	instanceId++;
	
	var eventTime = 900000;
	eim.schedule("timeOut", eventTime);
	eim.startEventTimer(eventTime);

	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(809050000);
	player.changeMap(map, map.getPortal(0));
	
}

function playerDead(eim, player) {
	if (player.isAlive()) { //don't trigger on death, trigger on manual revive
		if (eim.isLeader(player)) { //check for party leader
			//boot whole party and end
			var party = eim.getPlayers();
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim, party.get(i));
			}
			eim.dispose();
		}
		else { //boot dead player
			playerExit(eim, player);
		}
	}
}

function playerDisconnected(eim, player) {
	if (eim.isLeader(player)) { //check for party leader
		//boot whole party and end
		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
			if (party.get(i).equals(player)) {
				removePlayer(eim, player);
			}			
			else {
				playerExit(eim, party.get(i));
			}
		}
		eim.dispose();
	}
	else { //boot d/ced player
		removePlayer(eim, player);
	}
}

function leftParty(eim, player) {
	playerExit(eim, player);
}

function disbandParty(eim) {
	//boot whole party and end
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose();
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
}


function playerFinish(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(finishMap, finishMap.getPortal(0));
}

//for offline players
function removePlayer(eim, player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) {
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		   playerFinish(eim, party.get(i));
	}
	eim.dispose();
}

function allMonstersDead(eim) {
        //do nothing; LMPQ has nothing to do with monster killing
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
	eim.dispose();

}

 function playerRevive(eim, player) {
     
}