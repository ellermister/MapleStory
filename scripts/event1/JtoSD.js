importPackage(net.sf.odinms.tools);

var returnTo = new Array(101000400,130000210);
var rideTo = new Array(130000210,101000400);
var birdRide = new Array(200090058,200090310);
var myRide;
var returnMap;
var map;
var docked;

var timeOnRide = 130 * 1000; //Seconds

function init() {
	em.setProperty("isRiding","false");
}

function playerEntry(eim, player) {
	myRide = em.getProperty("myRide");
	docked = em.getChannelServer().getMapFactory().getMap(rideTo[myRide]);
	returnMap = em.getChannelServer().getMapFactory().getMap(returnTo[myRide]);
	onRide = em.getChannelServer().getMapFactory().getMap(birdRide[myRide]);

	em.setProperty("isRiding","true");
	em.schedule("timeOut", timeOnRide);
	player.changeMap(onRide, onRide.getPortal(0));
	player.getClient().getSession().write(MaplePacketCreator.getClock(timeOnRide/1000));
}

function timeOut() {
	var iter = em.getInstance("JtoSD").getPlayers().iterator();
	while (iter.hasNext()) {
		var player = iter.next();
		player.changeMap(docked, docked.getPortal(0));
		em.getInstance("JtoSD").unregisterPlayer(player);
	}
	em.setProperty("isRiding","false");
	em.disposeInstance("JtoSD");
}

function playerDisconnected(eim, player) {
	eim.unregisterPlayer(player);
	em.disposeInstance("JtoSD");
}

function cancelSchedule() {
}
