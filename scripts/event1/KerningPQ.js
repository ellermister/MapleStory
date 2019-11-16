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
	exitMap = em.getChannelServer().getMapFactory().getMap(103000890); // <exit>
	var instanceName = "KerningPQ" + instanceId;

	var eim = em.newInstance(instanceName);
	
	var mf = eim.getMapFactory();
	em.setProperty("entryPossible1", "true");
	em.setProperty("entryPossible2", "true");
	em.setProperty("entryPossible3", "true");
	
	instanceId++;
	
	mf.getMap(103000800).getPortal("next00").setScriptName("kpq1");

	var eventTime = 30 * (1000 * 60);
	em.schedule("timeOut", eventTime);
	eim.startEventTimer(eventTime);
	
	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(103000800);
	player.changeMap(map, map.getPortal(0));
	//TODO: hold time across map changes
	player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock(1800));
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
		if(em.getChannelServer().getChannel()==1){
		em.setProperty("entryPossible1", "true");
	}else if(em.getChannelServer().getChannel()==2){
		em.setProperty("entryPossible2", "true");
	}else{
		em.setProperty("entryPossible3", "true");
	}
		eim.dispose();
	}
	else { //boot dead player
		// If only 2 players are left, uncompletable:
		var party = eim.getPlayers();
		if (party.size() <= minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			if(em.getChannelServer().getChannel()==1){
		em.setProperty("entryPossible1", "true");
	}else if(em.getChannelServer().getChannel()==2){
		em.setProperty("entryPossible2", "true");
	}else{
		em.setProperty("entryPossible3", "true");
	}
			eim.dispose();
		}
		else
			playerExit(eim, player);
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
			if(em.getChannelServer().getChannel()==1){
		em.setProperty("entryPossible1", "true");
	}else if(em.getChannelServer().getChannel()==2){
		em.setProperty("entryPossible2", "true");
	}else{
		em.setProperty("entryPossible3", "true");
	}
		}
		eim.dispose();
	}
	else { //boot d/ced player
		// If only 2 players are left, uncompletable:
		var party = eim.getPlayers();
		if (party.size() < minPlayers) {
			for (var i = 0; i < party.size(); i++) {
				playerExit(eim,party.get(i));
			}
			if(em.getChannelServer().getChannel()==1){
		em.setProperty("entryPossible1", "true");
	}else if(em.getChannelServer().getChannel()==2){
		em.setProperty("entryPossible2", "true");
	}else{
		em.setProperty("entryPossible3", "true");
	}
			eim.dispose();
		}
		else
			playerExit(eim, player);
	}
}

function leftParty(eim, player) {			
	// If only 2 players are left, uncompletable:
	var party = eim.getPlayers();
	if (party.size() <= minPlayers) {
		for (var i = 0; i < party.size(); i++) {
			playerExit(eim,party.get(i));
		}
		if(em.getChannelServer().getChannel()==1){
		em.setProperty("entryPossible1", "true");
	}else if(em.getChannelServer().getChannel()==2){
		em.setProperty("entryPossible2", "true");
	}else{
		em.setProperty("entryPossible3", "true");
	}
		eim.dispose();
	}
	else
		playerExit(eim, player);
}

function disbandParty(eim) {
	//boot whole party and end
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	if(em.getChannelServer().getChannel()==1){
		em.setProperty("entryPossible1", "true");
	}else if(em.getChannelServer().getChannel()==2){
		em.setProperty("entryPossible2", "true");
	}else{
		em.setProperty("entryPossible3", "true");
	}
	eim.dispose();
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
}

//for offline players
function removePlayer(eim, player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) {
	//KPQ does nothing special with winners
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
	eim.dispose();
}

function allMonstersDead(eim) {
        //do nothing; KPQ has nothing to do with monster killing
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
		if(em.getChannelServer().getChannel()==1){
		em.setProperty("entryPossible1", "true");
	}else if(em.getChannelServer().getChannel()==2){
		em.setProperty("entryPossible2", "true");
	}else{
		em.setProperty("entryPossible3", "true");
	}
		eim.dispose();
	}
}
