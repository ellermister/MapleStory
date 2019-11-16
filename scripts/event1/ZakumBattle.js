var exitMap;
var minPlayers = 1;
 
importPackage(net.sf.odinms.world);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server.maps);
importPackage(java.lang);

var exitMap;
var minPlayers = 1;

function init() {
        em.setProperty("shuffleReactors","false");
}

function setup(eim) {
	exitMap = em.getChannelServer().getMapFactory().getMap(211042300);
	if (exitMap == null) 
		debug(eim,"The exit map was not properly linked.");
	eim.setProperty("canEnter","true");
	// not currently used; could display total duration taken to kill?
        eim.setProperty("entryTimestamp",System.currentTimeMillis());
}

function playerEntry(eim,player) {
	var map = eim.getMapInstance(280030000); // Last Mission: Zakum's Altar
	player.changeMap(map,map.getPortal(0));
	if (exitMap == null)
		debug(eim,"The exit map was not properly linked.");
}

function playerRevive(eim,player) {
	player.setHp(500);
	player.setStance(0);
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
	var party = eim.getPlayers();
	if (party.size() < minPlayers) {
		end(eim,"没有足够的成员。任务将稍后被中断。");
	}
	return false;
}

function playerDead(eim,player) {
}

function playerDisconnected(eim,player) {
	var party = eim.getPlayers();
	if (player.getName().equals(eim.getProperty("leader"))) {
		// tell members
		var iter = party.iterator();
		while (iter.hasNext()) {
			var pl = iter.next();
			pl.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,"此队伍队长已经离开，任务将会被中断。"));
		}
	}
	// and, if the party is too small
	if (party.size() < minPlayers) {
		end(eim,"没有足够的成员。任务将稍后被中断。");
	}
}

function monsterValue(eim,mobId) { // potentially display time of death? does not seem to work
	if (mobId == 8800002) { // 3rd body
		var party = eim.getPlayers();
		var iter = party.iterator();
		while (iter.hasNext()) {
			var pl = iter.next();
			pl.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,"恭喜成功打败大怪物：扎昆"));
		}
	}
	return -1;
}

function leftParty(eim,player) { // do nothing in Zakum
}
function disbandParty(eim) { // do nothing in Zakum
}

function playerExit(eim,player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap,exitMap.getPortal(0));
        var party = eim.getPlayers();
        if (party.size() < minPlayers) { //not enough after someone left
                end(eim,"没有足够的成员。任务将稍后被中断。");
        }
}

function end(eim,msg) {
        var iter = eim.getPlayers().iterator();
        while (iter.hasNext()) {
                var player = iter.next();
                player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,msg));
		eim.unregisterPlayer(player);
		if (player != null)
                	player.changeMap(exitMap, exitMap.getPortal(0));
	}
	eim.dispose();
}

// for offline folk
function removePlayer(eim,player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) { // kinda a hack, this is used as the exit routine
	end(eim,"As the sound of battle fades away, you feel strangely unsatisfied.");
}

function finish(eim) {
        var iter = eim.getPlayers().iterator();
        while (iter.hasNext()) {
		var player = iter.next();
		eim.unregisterPlayer(player);
                player.changeMap(exitMap, exitMap.getPortal(0));
	}
	eim.dispose();
}

function allMonstersDead(eim) { // nothing normally done with altar here
}

function cancelSchedule() { // no
}

function timeOut() { // possibly useful
}

function debug(eim,msg) {
        var iter = eim.getPlayers().iterator();
        while (iter.hasNext()) {
 		var player = iter.next();
 		player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,msg));
	}
}
