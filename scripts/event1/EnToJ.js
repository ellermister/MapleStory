importPackage(net.sf.odinms.tools);

var returnTo = new Array(140020300,104000000);
var rideTo = new Array(104000000,140020300);
var birdRide = new Array(200090070,200090060);
var myRide;
var returnMap;
var map;
var docked;

var timeOnRide = 80 * 1000; //Seconds

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
	var iter = em.getInstance("EnToJ").getPlayers().iterator();
	while (iter.hasNext()) {
		var player = iter.next();
		player.changeMap(docked, docked.getPortal(0));
		em.getInstance("EnToJ").unregisterPlayer(player);
	}
	em.setProperty("isRiding","false");
	em.disposeInstance("EnToJ");
}

function playerDisconnected(eim, player) {
	eim.unregisterPlayer(player);
	em.disposeInstance("EnToJ");
}

function cancelSchedule() {
}
