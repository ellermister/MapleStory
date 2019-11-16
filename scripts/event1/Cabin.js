//汉化

importPackage(net.sf.odinms.tools);

//Time Setting is in millisecond
var closeTime = 20000; 
var beginTime = 30000;
var rideTime = 60000; 
var KC_Waiting;
var Subway_to_KC;
var KC_docked;
var NLC_Waiting;
var Subway_to_NLC;
var NLC_docked;
var toggleMsg = true;

function init() {
	KC_Waiting = em.getChannelServer().getMapFactory().getMap(200000132);
	NLC_Waiting = em.getChannelServer().getMapFactory().getMap(240000111);
	Subway_to_KC = em.getChannelServer().getMapFactory().getMap(200090210);
	Subway_to_NLC = em.getChannelServer().getMapFactory().getMap(200090200);
	KC_docked = em.getChannelServer().getMapFactory().getMap(200000100);
	NLC_docked = em.getChannelServer().getMapFactory().getMap(240000100);
	scheduleNew();
}

function scheduleNew() {
	em.setProperty("docked", "true");
	em.setProperty("entry", "true");
	if(toggleMsg) {
		KC_docked.broadcastMessage(MaplePacketCreator.serverNotice(1, "航班公告:奶茶冒险岛航班K001次开往天空之城的已经到达。"));
		NLC_docked.broadcastMessage(MaplePacketCreator.serverNotice(1, "航班公告:奶茶冒险岛航班K002次开往神木村的已经到达。"));
	}
	em.schedule("stopEntry", closeTime);
	em.schedule("takeoff", beginTime);
}

function stopEntry() {
	em.setProperty("entry","false");
}

function takeoff() {
	em.setProperty("docked","false");
	var temp1 = KC_Waiting.getCharacters().iterator();
	while(temp1.hasNext()) {
		temp1.next().changeMap(Subway_to_NLC, Subway_to_NLC.getPortal(0));
	}
	var temp2 = NLC_Waiting.getCharacters().iterator();
	while(temp2.hasNext()) {
		temp2.next().changeMap(Subway_to_KC, Subway_to_KC.getPortal(0));
	}
	if(toggleMsg) {
		KC_docked.broadcastMessage(MaplePacketCreator.serverNotice(1, "航班公告:奶茶冒险岛航班K001次开往神木村的已经发出，来不及乘坐的岛民请等候下个班次。"));
		NLC_docked.broadcastMessage(MaplePacketCreator.serverNotice(1, "航班公告:奶茶冒险岛航班K002次开往天空之岛的已经发出，来不及乘坐的岛民请等候下个班次。"));
	}
	var temp = rideTime / 1000;
	Subway_to_KC.broadcastMessage(MaplePacketCreator.getClock(temp));
	Subway_to_NLC.broadcastMessage(MaplePacketCreator.getClock(temp));
	em.schedule("arrived", rideTime);
}

function arrived() {
	var temp1 = Subway_to_KC.getCharacters().iterator();
	while(temp1.hasNext()) {
		temp1.next().changeMap(KC_docked, KC_docked.getPortal(0));
	}
	var temp2 = Subway_to_NLC.getCharacters().iterator();
	while(temp2.hasNext()) {
		temp2.next().changeMap(NLC_docked, NLC_docked.getPortal(0));
	}
	scheduleNew();
}

function cancelSchedule() {
}
