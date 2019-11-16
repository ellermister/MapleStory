/*
	Map(s): 		The Nautilus : Mid Floor - Hallway (120000200)
	Description: 		Takes you to Free Market
*/

function enter(pi) {
	pi.getPlayer().saveLocation(net.sf.odinms.server.maps.SavedLocationType.FREE_MARKET);
	pi.warp(910000000, "st00");
	return true;
}