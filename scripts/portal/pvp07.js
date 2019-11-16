function enter(pi) {
	pi.getPlayer().saveLocation(net.sf.odinms.server.maps.SavedLocationType.PVP);
	pi.warp(701000210, "out00");
	return true;
}