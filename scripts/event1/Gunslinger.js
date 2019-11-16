/* Author: Xterminator
	Map(s): 		Hidden Street : Pirate Test Room (108000500)
	Description: 		
*/
function init() {
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(108000500);
	player.changeMap(map, map.getPortal(0));
	player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock(600));
	eim.schedule("warpOut", 600000);	
}

function warpOut(eim) {
	var map = em.getChannelServer().getMapFactory().getMap(120000101)
	var iter = eim.getPlayers().iterator();
	while (iter.hasNext()) {
		player = iter.next();
		player.changeMap(map, map.getPortal(0));
		eim.unregisterPlayer(player);
	}
	eim.dispose();
}

function playerDisconnected(eim, player) {
	player.getMap().removePlayer(player);
	eim.unregisterPlayer(player);
	eim.dispose();
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) {
	eim.unregisterPlayer(player);
	eim.dispose();
}

function leftParty(eim, player) {			
}

function disbandParty(eim) {
}

function cancelSchedule() {
}
