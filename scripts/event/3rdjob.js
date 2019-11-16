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

importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server.life);

function init() {
}

function monsterValue(eim, mobId) {
	return 1;
}

function setClassVars(player) {
	var returnMapId;
	var monsterId;
	var mapId;	
	if (player.getJob().equals(MapleJob.FP_WIZARD) ||
		player.getJob().equals(MapleJob.IL_WIZARD) ||
		player.getJob().equals(MapleJob.CLERIC)) {
		mapId = 108010201;
		returnMapId = 100040106;
		monsterId = 9001001;
	} else if (player.getJob().equals(MapleJob.FIGHTER) ||
		player.getJob().equals(MapleJob.PAGE) ||
		player.getJob().equals(MapleJob.SPEARMAN)) {
		mapId = 108010301;
		returnMapId = 105070001;
		monsterId = 9001000;
	} else if (player.getJob().equals(MapleJob.ASSASSIN) ||
		player.getJob().equals(MapleJob.BANDIT)) {
		mapId = 108010401;
		returnMapId = 107000402;
		monsterId = 9001003;
	} else if (player.getJob().equals(MapleJob.HUNTER) ||
		player.getJob().equals(MapleJob.CROSSBOWMAN)) {
		mapId = 108010101;
		returnMapId = 105040305;
		monsterId = 9001002;
	}
	return new Array(mapId, returnMapId, monsterId);
}

function playerEntry(eim, player) {

	var info = setClassVars(player);
	var mapId = info[0];
	var returnMapId = info[1];
	var monsterId = info[2];
	var map = eim.getMapFactory().getMap(mapId, false, false);
	map.toggleDrops();
	
	player.changeMap(map, map.getPortal(0));
	var mob = MapleLifeFactory.getMonster(monsterId);
	eim.registerMonster(mob);
	map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(200, 20));
}

function playerDead(eim, player) {
	var info = setClassVars(player);
	var mapId = info[0];
	var returnMapId = info[1];
	var monsterId = info[2];
	player.setHp(1);
	var returnMap = em.getChannelServer().getMapFactory().getMap(returnMapId);
	player.changeMap(returnMap, returnMap.getPortal(0));
	eim.unregisterPlayer(player);
	eim.dispose();
}

function playerDisconnected(eim, player) {
	var info = setClassVars(player);
	var mapId = info[0];
	var returnMapId = info[1];
	var monsterId = info[2];
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	var returnMap = em.getChannelServer().getMapFactory().getMap(returnMapId);
	player.setMap(returnMap);
	eim.dispose();
}

function allMonstersDead(eim) {
	var price = new Item(4031059, 0, 1);
	var winner = eim.getPlayers().get(0);
	var info = setClassVars(winner);
	var mapId = info[0];
	var returnMapId = info[1];
	var monsterId = info[2];
	var map = eim.getMapFactory().getMap(mapId, false, false);
	map.spawnItemDrop(winner, winner, price, winner.getPosition(), true, false);
	eim.schedule("warpOut", 120000);
	var mob = MapleLifeFactory.getMonster(monsterId);
	em.getChannelServer().broadcastPacket(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6, "[系统任务] " + winner.getName() + " 打败了 " + mob.getName() + "!"));
}

function cancelSchedule() {
}

function warpOut(eim) {
	var iter = eim.getPlayers().iterator();
	while (iter.hasNext()) {
		var player = iter.next();
		var info = setClassVars(player);
		var mapId = info[0];
		var returnMapId = info[1];
		var monsterId = info[2];
		var returnMap = em.getChannelServer().getMapFactory().getMap(returnMapId);
		player.changeMap(returnMap, returnMap.getPortal(0));
		eim.unregisterPlayer(player);
	}
	eim.dispose();
}

function leftParty(eim, player) {
	
}

function disbandParty(eim, player) {

}
