function enter(pi) {
	pi.warp(230040300, 5);
	pi.getPlayer().getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.musicChange("Bgm12/AquaCave"));
	return true;
}
