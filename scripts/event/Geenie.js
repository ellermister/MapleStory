importPackage(net.sf.odinms.tools);

//Time Setting is in millisecond
var closeTime = 240000; //The time to close the gate
var beginTime = 300000; //The time to begin the ride
var rideTime = 300000; //The time that require move to destination
var Orbis_btf;
var Geenie_to_Orbis;
var Orbis_docked;
var Ariant_btf;
var Geenie_to_Ariant;
var Ariant_docked;

function init() {
	Orbis_btf = em.getChannelServer().getMapFactory().getMap(200000152);
	Ariant_btf = em.getChannelServer().getMapFactory().getMap(260000110);
	Geenie_to_Orbis = em.getChannelServer().getMapFactory().getMap(200090410);
	Geenie_to_Ariant = em.getChannelServer().getMapFactory().getMap(200090400);
	Orbis_docked = em.getChannelServer().getMapFactory().getMap(200000100);
	Ariant_docked = em.getChannelServer().getMapFactory().getMap(260000100);
	Orbis_Station = em.getChannelServer().getMapFactory().getMap(200000151);
	var cTime = new Date();
	var m = cTime.getMinutes();
	var s = cTime.getSeconds();
	if(m < 10) {
		m %= 10;
	}
	if((m >= 0 && m < 5)) {
		if(m != 4) {
			s = closeTime - ((m * 60000) + (s * 1000));
			em.setProperty("entry", "true");
			em.schedule("stopentry", s);
		} else {
			m = beginTime - ((m * 60000) + (s * 1000));
			em.setProperty("entry", "false");
		}
		Ariant_docked.setDocked(true);
		Orbis_Station.setDocked(true);
		em.setProperty("docked", "true");
		em.schedule("takeoff", m);
	} else {
		m = rideTime - ((m * 60000) + (s * 1000));
		Ariant_docked.setDocked(false);
		Orbis_Station.setDocked(false);
		em.setProperty("docked", "false");
		em.setProperty("entry", "false");
		em.schedule("scheduleNew", m);
	}
}

function scheduleNew() {
	Ariant_docked.setDocked(true);
	Orbis_Station.setDocked(true);
	Ariant_docked.broadcastMessage(MaplePacketCreator.boatPacket(true));
	Orbis_Station.broadcastMessage(MaplePacketCreator.boatPacket(true));
	em.setProperty("docked", "true");
	em.setProperty("entry", "true");
	em.schedule("stopEntry", closeTime);
	em.schedule("takeoff", beginTime);
}

function stopEntry() {
	em.setProperty("entry","false");
}

function takeoff() {
	Ariant_docked.setDocked(false);
	Orbis_Station.setDocked(false);
	Ariant_docked.broadcastMessage(MaplePacketCreator.boatPacket(false));
	Orbis_Station.broadcastMessage(MaplePacketCreator.boatPacket(false));
	em.setProperty("docked","false");
	var temp1 = Orbis_btf.getCharacters().iterator();
	while(temp1.hasNext()) {
		temp1.next().changeMap(Geenie_to_Ariant, Geenie_to_Ariant.getPortal(0));
	}
	var temp2 = Ariant_btf.getCharacters().iterator();
	while(temp2.hasNext()) {
		temp2.next().changeMap(Geenie_to_Orbis, Geenie_to_Orbis.getPortal(0));
	}
	em.schedule("arrived", rideTime);
}

function arrived() {
	var temp1 = Geenie_to_Orbis.getCharacters().iterator();
	while(temp1.hasNext()) {
		temp1.next().changeMap(Orbis_docked, Orbis_docked.getPortal(0));
	}
	var temp2 = Geenie_to_Ariant.getCharacters().iterator();
	while(temp2.hasNext()) {
		temp2.next().changeMap(Ariant_docked, Ariant_docked.getPortal(0));
	}
	scheduleNew();
}
