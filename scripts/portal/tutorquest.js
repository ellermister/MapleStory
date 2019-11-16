function enter(pi) {
	if (pi.getPlayer().getMapId()==130030001) {
		pi.warp(130030002);
		return true;
	} else if (pi.getPlayer().getMapId()==130030002) {
		pi.warp(130030003);
		return true;
        } else if (pi.getPlayer().getMapId()==130030003) {
		pi.warp(130030004);
		return true;
	} else if (pi.getPlayer().getMapId()==130030004) {
		pi.warp(130030005);
		return true;
	}
}