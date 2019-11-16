function enter(pi) {
	var returnMap = pi.getPlayer().getSavedLocation(net.sf.odinms.server.maps.SavedLocationType.DOJO);
	if (returnMap < 0) {
		returnMap = 102000000;
	}
	var target = pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(returnMap);
	var portal = target.getPortal("st00");
	if (portal == null) {
		portal = target.getPortal(0);
	}
	pi.getPlayer().clearSavedLocation(net.sf.odinms.server.maps.SavedLocationType.DOJO);
	pi.getPlayer().changeMap(target, portal);
	return true;
}