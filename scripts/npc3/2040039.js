//笔芯制作

importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.server.life);
importPackage(java.awt);

var status;

var exp = 10000;
			
function start() {
	status = -1;
	playerStatus = cm.isLeader();
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		var eim = cm.getChar().getEventInstance();
		var stage4status = eim.getProperty("stage4status");
		if (stage4status == null) {
			if (playerStatus) { // Leader
				var map = eim.getMapInstance(cm.getChar().getMapId());
				var passes = cm.haveItem(4001022,6);
				var stage4leader = eim.getProperty("stage4leader");
				if (stage4leader == "done") {
					if (passes) {
						// Clear stage
						cm.sendNext("恭喜你通过本关，我已经为你敞开下一关的大门！");
						party = eim.getPlayers();
						map = cm.getMapId();
						cm.removeAll(4001022);
						//cm.gainItem(4001022, -6);
						clear(4,eim,cm);
						cm.givePartyExp(exp, party);
						cm.dispose();
					} else { // Not done yet
						cm.sendNext("收集到 6张通关卡 了吗？");
					}
					cm.dispose();
				} else {
					cm.sendOk("欢迎来到第6关，打到藏在黑暗之中的怪物获得 6 张通关卡就可以通过本关。");
					eim.setProperty("stage4leader","done");
					cm.dispose();
				}
			} else { // Members
				cm.sendNext("欢迎来到第6关，打到藏在黑暗之中的怪物获得 6 张通关卡就可以通过本关。");
				cm.dispose();
			}
		} else {
			cm.sendNext("恭喜你通过本关，我已经为你敞开下一关的大门！");
			cm.dispose();
		}
	}
}

function clear(stage, eim, cm) {
	eim.setProperty("stage" + stage.toString() + "status","clear");
	var packetef = MaplePacketCreator.showEffect("quest/party/clear");
	var packetsnd = MaplePacketCreator.playSound("Party1/Clear");
	var packetglow = MaplePacketCreator.environmentChange("gate",2);
	var map = eim.getMapInstance(cm.getChar().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
	map.broadcastMessage(packetglow);
	var mf = eim.getMapFactory();
	map = mf.getMap(922010400);
	var nextStage = eim.getMapInstance(922010500);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("lpq5");
	}
}