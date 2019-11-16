function enter(pi) {
	var nextMap = 200090000;
	var eim = pi.getPlayer().getEventInstance();
	var target = eim.getMapInstance(nextMap);
	var targetPortal = target.getPortal("under00");
	pi.getPlayer().changeMap(target, targetPortal);
	if(pi.getPlayer().getClient().getChannelServer().getEventSM().getEventManager("Boats").getProperty("haveBalrog1").equals("true")) {
		pi.changeMusic("Bgm04/ArabPirate");
	}
	return true;
}
