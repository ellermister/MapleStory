importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.server.life);

//Time Setting is in millisecond
var closeTime = 240000; //The time to close the gate
var beginTime = 300000; //The time to begin the ride
var rideTime = 600000; //The time that require move to destination
var invasionTime = 60000; //The time that spawn balrog
var Orbis_btf;
var Boat_to_Orbis;
var Orbis_Boat_Cabin;
var Orbis_docked;
var Ellinia_btf;
var Ellinia_Boat_Cabin;
var Ellinia_docked;

function init() {
	Orbis_btf = em.getChannelServer().getMapFactory().getMap(200000112);
	Ellinia_btf = em.getChannelServer().getMapFactory().getMap(101000301);
	Boat_to_Orbis = em.getChannelServer().getMapFactory().getMap(200090010);
	Boat_to_Ellinia = em.getChannelServer().getMapFactory().getMap(200090000);
	Orbis_Boat_Cabin = em.getChannelServer().getMapFactory().getMap(200090011);
	Ellinia_Boat_Cabin = em.getChannelServer().getMapFactory().getMap(200090001);
	Orbis_docked = em.getChannelServer().getMapFactory().getMap(200000100);
	Ellinia_docked = em.getChannelServer().getMapFactory().getMap(101000300);
	Orbis_Station = em.getChannelServer().getMapFactory().getMap(200000111);
	OBoatsetup();
	EBoatsetup();
	var cTime = new Date();
	var m = cTime.getMinutes();
	var s = cTime.getSeconds();
	if(m < 15) {
		m %= 15;
	}
	if(m >= 0 && m < 5) {
		if(m != 4) {
			s = closeTime - ((m * 60000) + (s * 1000));
			em.setProperty("entry", "true");
			em.schedule("stopentry", s);
		} else {
			m = beginTime - ((m * 60000) + (s * 1000));
			em.setProperty("entry", "false");
		}
		Ellinia_docked.setDocked(true);
		Orbis_Station.setDocked(true);
		em.setProperty("docked", "true");
		em.setProperty("haveBalrog","false");
		em.schedule("takeoff", m);
	} else {
		m = rideTime - ((m * 60000) + (s * 1000));
		Ellinia_docked.setDocked(false);
		Orbis_Station.setDocked(false);
		em.setProperty("docked", "false");
		em.setProperty("entry", "false");
		em.setProperty("haveBalrog","false");
		em.schedule("scheduleNew", m);
	}
	Boat_to_Orbis.setDocked(false);
	Boat_to_Ellinia.setDocked(false);
}

function scheduleNew() {
	Ellinia_docked.setDocked(true);
	Orbis_Station.setDocked(true);
	Ellinia_docked.broadcastMessage(MaplePacketCreator.boatPacket(true));
	Orbis_Station.broadcastMessage(MaplePacketCreator.boatPacket(true));
	Boat_to_Orbis.setDocked(false);
	Boat_to_Ellinia.setDocked(false);
	em.setProperty("docked", "true");
	em.setProperty("entry", "true");
	em.setProperty("haveBalrog","false");
	em.schedule("stopentry", closeTime);
	em.schedule("takeoff", beginTime);
}

function stopentry() {
	em.setProperty("entry","false");
	Orbis_Boat_Cabin.resetReactors();
	Ellinia_Boat_Cabin.resetReactors();
}

function takeoff() {
	em.setProperty("docked","false");
	var temp1 = Orbis_btf.getCharacters().iterator();
	while(temp1.hasNext()) {
		temp1.next().changeMap(Boat_to_Ellinia, Boat_to_Ellinia.getPortal(0));
	}
	var temp2 = Ellinia_btf.getCharacters().iterator();
	while(temp2.hasNext()) {
		temp2.next().changeMap(Boat_to_Orbis, Boat_to_Orbis.getPortal(0));
	}
	Ellinia_docked.setDocked(false);
	Orbis_Station.setDocked(false);
	Ellinia_docked.broadcastMessage(MaplePacketCreator.boatPacket(false));
	Orbis_Station.broadcastMessage(MaplePacketCreator.boatPacket(false));
	em.schedule("invasion", invasionTime);
	em.schedule("arrived", rideTime);
}

function arrived() {
	var temp1 = Boat_to_Orbis.getCharacters().iterator();
	while(temp1.hasNext()) {
		temp1.next().changeMap(Orbis_docked, Orbis_docked.getPortal(0));
	}
	var temp2 = Orbis_Boat_Cabin.getCharacters().iterator();
	while(temp2.hasNext()) {
		temp2.next().changeMap(Orbis_docked, Orbis_docked.getPortal(0));
	}
	var temp3 = Boat_to_Ellinia.getCharacters().iterator();
	while(temp3.hasNext()) {
		temp3.next().changeMap(Ellinia_docked, Ellinia_docked.getPortal(0));
	}
	var temp4 = Ellinia_Boat_Cabin.getCharacters().iterator();
	while(temp4.hasNext()) {
		temp4.next().changeMap(Ellinia_docked, Ellinia_docked.getPortal(0));
	}
	Boat_to_Orbis.killAllMonsters();
	Boat_to_Ellinia.killAllMonsters();
	scheduleNew();
}

function invasion() {
	var numspawn;
	var chance = Math.floor(Math.random() * 10);
	if(chance <= 5)
		numspawn = 0;
	else
		numspawn = 2;
	if(numspawn > 0) {
		for(var i=0; i < numspawn; i++) {
			Boat_to_Orbis.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8150000), new java.awt.Point(485, -221));
			Boat_to_Ellinia.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8150000), new java.awt.Point(-590, -221));
		}
		Boat_to_Orbis.setDocked(true);
		Boat_to_Ellinia.setDocked(true);
		Boat_to_Orbis.broadcastMessage(MaplePacketCreator.boatPacket(true));
		Boat_to_Ellinia.broadcastMessage(MaplePacketCreator.boatPacket(true));
		Boat_to_Orbis.broadcastMessage(MaplePacketCreator.musicChange("Bgm04/ArabPirate"));
		Boat_to_Ellinia.broadcastMessage(MaplePacketCreator.musicChange("Bgm04/ArabPirate"));
		em.setProperty("haveBalrog","true");
	}
}

function OBoatsetup() {
	em.getChannelServer().getMapFactory().getMap(200090011).getPortal("out00").setScriptName("OBoat1");
	em.getChannelServer().getMapFactory().getMap(200090011).getPortal("out01").setScriptName("OBoat2");
}

function EBoatsetup() {
	em.getChannelServer().getMapFactory().getMap(200090001).getPortal("out00").setScriptName("EBoat1");
	em.getChannelServer().getMapFactory().getMap(200090001).getPortal("out01").setScriptName("EBoat2");
}
