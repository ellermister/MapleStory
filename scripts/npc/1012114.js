/*1012114.js - Growlie 
 *@author Jvlaple
 *Tigur duude in PQ ;)
 */
 
importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.server.life);
importPackage(java.awt);

var status;
var curMap;
var playerStatus;
var chatState;
var preamble;
var mySelection;

			

function start() {
	status = -1;
	mapId = cm.getChar().getMapId();
	if (cm.getParty() != null) //Check for Party
	playerStatus = cm.isLeader();
	preamble = null;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (playerStatus) {
			var eim = cm.getPlayer().getEventInstance();
			var party = cm.getPlayer().getEventInstance().getPlayers();
			if (status == 0) {
				cm.sendSimple("Hello, I'm Growlie and I want #bRice Cakes#k...#b\r\n#L0#I brought you Rice Cakes!#l\r\n#L1#What do I do here?#l\r\n#L2#I want to go out!#l#k");
			} else if (status == 1) {
				mySelection = selection;
				switch (mySelection) {
					case 0 : if (cm.haveItem(4001101, 10)) {
								cm.gainItem(4001101, -10);
								clear(1, eim, cm);
								cm.givePartyExp(1600, party);
								cm.sendNext("Thank you for giving me #bRice Cakes#k!");
								} else {
								cm.sendNext("You haven't gotten me 10 #bRice Cakes#k! Rawr!");
								cm.dispose();
								}
							break;
					case 1 : cm.sendNext("This is the Primrose Hill where the Moon Bunny will make #bRice Cakes#k when there is a full moon. To make a full moon, plant the seeds obtained from the primroses and when all 6 seeds are planted, them full moon will appear. The #rMoon Bunny will then be summoned, and you must protect him from the other monsters that try to attack him#k. In the event of #bMoon Bunny#k dying, you will fail the quest and I will be hungry and angry...");
							 cm.dispose();
							 break;
					case 2 : cm.sendNext("Alright, but come back soon and get me some #bRice Cakes#k!");
							 break;
				}
			} else if (status == 2) {
				switch (mySelection) {
					case 0 : //eim.finishPQ();
							 var mf = eim.getMapFactory();
							 map = mf.getMap(910010100);
							 for (var i = 0; i < party.size(); i++) {
								party.get(i).changeMap(map, map.getPortal(0));
								eim.unregisterPlayer(party.get(i));
							 }
							 eim.dispose();
							 cm.dispose();
							 break;
					case 1 : break; //Can't happen o.O
					case 2 : eim.unregisterPlayer(cm.getPlayer());
							 cm.warp(910010300, 0);
							 cm.dispose();
				}
			}
		} else {
			var eim = cm.getPlayer().getEventInstance();
			var party = cm.getPlayer().getEventInstance().getPlayers();
			if (status == 0) {
				cm.sendYesNo("Would you like to quit the Party Quest?");
			} else if (status == 1) {
				eim.unregisterPlayer(cm.getPlayer());
				cm.warp(910010300, 0);
				cm.dispose();
			}
		}
	}
}

function clear(stage, eim, cm) {
	eim.setProperty("1stageclear","true");
	var packetef = MaplePacketCreator.showEffect("quest/party/clear");
	var packetsnd = MaplePacketCreator.playSound("Party1/Clear");
	var packetglow = MaplePacketCreator.environmentChange("gate",2);
	var map = eim.getMapInstance(cm.getChar().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
	var mf = eim.getMapFactory();
	//map = mf.getMap(922010100 + stage * 100);
	//cm.givePartyExp(300, party);
	cm.mapMessage("Clear!");
}
	