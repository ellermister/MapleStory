function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	var nextMap = 200090010;
	var target = eim.getMapInstance(nextMap);
	var targetPortal = target.getPortal("in00");
	pi.getPlayer().changeMap(target, targetPortal);
	if(pi.getPlayer().getClient().getChannelServer().getEventSM().getEventManager("Boats").getProperty("haveBalrog2").equals("true")) {
		pi.changeMusic("Bgm04/ArabPirate");
	}
	return true;
}
