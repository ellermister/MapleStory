function enter(pi) {
	pi.getPlayer().saveLocation(net.sf.odinms.server.maps.SavedLocationType.FREE_MARKET);
	pi.warp(749030000, "st00");
	return true;
}