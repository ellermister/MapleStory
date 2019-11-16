
importPackage(java.lang);
importPackage(org.packet);

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
	instanceId = em.getChannelServer().getInstanceId();
	exitMap = em.getChannelServer().getMapFactory().getMap(240050500); //<<Exit Map Uh
	var instanceName = "HontaleSquad" + instanceId;

	var eim = em.newInstance(instanceName);
	
	var mf = eim.getMapFactory();
	
	em.getChannelServer().addInstanceId();
	
	var map = mf.getMap(240060000);//wutt
	//map.shuffleReactors();
	// eim.addMapInstance(240050100,map);
	//var firstPortal = eim.getMapInstance(240050100).getPortal("in00");
	//firstPortal.setScriptName("hontale_BtoB1");
	//Fuck this timer
	//eim.setProperty("bulbWay", 0);
	em.schedule("timeOut", 60000 * 600);
	em.schedule("broadcastClock", 1500);
	em.schedule("headOne", 3000);
	eim.setProperty("entryTimestamp",System.currentTimeMillis() + (600 * 60000));
	eim.setProperty("head1", "no");
	eim.setProperty("head2", "no");
	eim.setProperty("head2spawned", "no");
	// var tehwat = Math.random() * 3;
	// if (tehwat > 1) {
		// eim.setProperty("theWay", "darkness");
	// } else {
		// eim.setProperty("theWay", "light");
	// }
	
	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(240060000);
	player.changeMap(map, map.getPortal(0));
	player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock((Long.parseLong(eim.getProperty("entryTimestamp")) - System.currentTimeMillis()) / 1000));
	//THE CLOCK IS SHIT
	//player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock(1800));
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) {
	if (eim.isLeader(player)) { //check for party leader
		//boot whole party and end
		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
			playerExit(eim, party.get(i));
		}
		eim.dispose();
	}
	else { //boot dead player
		// If only 5 players are left, uncompletable:
		var party = eim.getPlayers();
		if (party.size() <= minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			eim.dispose();
		}
		else
			playerExit(eim, player);
	}
}

function playerDisconnected(eim, player) {
	if (eim.isLeader(player)) { //check for party leader
		//PWN THE PARTY (KICK OUT)
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
	else { //KICK THE D/CED CUNT
		// If only 5 players are left, uncompletable:
		var party = eim.getPlayers();
		if (party.size() < minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			eim.dispose();
		}
		else
			playerExit(eim, player);
	}
}

function leftParty(eim, player) {			
	// If only 5 players are left, uncompletable:
	// var party = eim.getPlayers();
	// if (party.size() <= minPlayers) {
		// for (var i = 0; i < party.size(); i++) {
			// playerExit(eim,party.get(i));
		// }
		// eim.dispose();
	// }
	// else
		// playerExit(eim, player);
}

function disbandParty(eim) {
	//boot whole party and end
	// var party = eim.getPlayers();
	// for (var i = 0; i < party.size(); i++) {
		// playerExit(eim, party.get(i));
	// }
	// eim.dispose();
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
}

//Those offline cuntts
function removePlayer(eim, player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) {
	//HTPQ does nothing special with winners
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose();
}

function allMonstersDead(eim) {
        //Open Portal? o.O
}

function cancelSchedule() {
}

function timeOut() {
	var iter = em.getInstances().iterator();
	while (iter.hasNext()) {
		var eim = iter.next();
		if (eim.getPlayerCount() > 0) {
			var pIter = eim.getPlayers().iterator();
			while (pIter.hasNext()) {
				playerExit(eim, pIter.next());
			}
		}
		eim.dispose();
	}
}

function playerClocks(eim, player) {
  if (player.getMap().hasTimer() == false){
	player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock((Long.parseLong(eim.getProperty("entryTimestamp")) - System.currentTimeMillis()) / 1000));
	//player.getMap().setTimer(true);
	}
}

function playerTimer(eim, player) {
	if (player.getMap().hasTimer() == false) {
		player.getMap().setTimer(true);
	}
}

function broadcastClock(eim, player) {
	//var party = eim.getPlayers();
	var iter = em.getInstances().iterator();
	while (iter.hasNext()) {
		var eim = iter.next();
		if (eim.getPlayerCount() > 0) {
			var pIter = eim.getPlayers().iterator();
			while (pIter.hasNext()) {
				playerClocks(eim, pIter.next());
			}
		}
		//em.schedule("broadcastClock", 1600);
	}
	// for (var kkl = 0; kkl < party.size(); kkl++) {
		// party.get(kkl).getMap().setTimer(true);
	// }
	var iterr = em.getInstances().iterator();
	while (iterr.hasNext()) {
		var eim = iterr.next();
		if (eim.getPlayerCount() > 0) {
			var pIterr = eim.getPlayers().iterator();
			while (pIterr.hasNext()) {
				//playerClocks(eim, pIter.next());
				playerTimer(eim, pIterr.next());
			}
		}
		//em.schedule("broadcastClock", 1600);
	}
	em.schedule("broadcastClock", 1600);
}

function headOne(eim, player) {
	var iter = em.getInstances().iterator();
	while (iter.hasNext()) {
		var eim = iter.next();
		if (eim.getPlayerCount() > 0) {
			var pIter = eim.getPlayers().iterator();
			while (pIter.hasNext()) {
				pIter.next().getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,"The Enormous Creature is Approaching from the Deep Cave..."));
			}
		}
		var theMap = eim.getMapFactory().getMap(240060000);
		var mob = net.sf.odinms.server.life.MapleLifeFactory.getMonster(8810024);
		var headd = theMap.spawnMonsterWithCoords(mob, 960, 230); //Spawn the head
		theMap.killMonster(theMap.getMonsterByOid(headd), eim.getPlayers().get(0), false);
	}
}

function headTwo(eim, player) {
	var iter = em.getInstances().iterator();
	while (iter.hasNext()) {
		var eim = iter.next();
		if (eim.getPlayerCount() > 0) {
			var pIter = eim.getPlayers().iterator();
			while (pIter.hasNext()) {
				pIter.next().getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,"Watch out for Horntail... Be prepared for a long fight."));
			}
		}
		var theMap = eim.getMapFactory().getMap(240060100);
		var mob = net.sf.odinms.server.life.MapleLifeFactory.getMonster(8810025);
		var headdd = theMap.spawnMonsterWithCoords(mob, -345, 230); //Spawn the head
		theMap.killMonster(theMap.getMonsterByOid(headdd), eim.getPlayers().get(0), false);
	}
}
	
