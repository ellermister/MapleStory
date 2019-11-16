/**
 *6702001.js - Door of APQ
 *@author Jvlaple
 */

importPackage(java.lang);

function act() {
	var eim = rm.getPlayer().getEventInstance();
	var party = eim.getPlayers();
	var numOpen = Integer.parseInt(eim.getProperty("openedDoors"));
	var mf = eim.getMapFactory();
	var map = mf.getMap(670010600);
	eim.setProperty("openedDoors", numOpen + 1);
	for (var i = 0; i < party.size(); i++) {
		//rm.warp(670010600, (numOpen + 1) * 2);
		party.get(i).changeMap(map, map.getPortal((numOpen + 1) * 2));
	}
}
	