//笔芯制作

importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.server.life);
importPackage(java.awt);

var status;

var exp = 8000;
			
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
		var stage3status = eim.getProperty("stage3status");
		if (stage3status == null) {
			if (playerStatus) { // Leader
				var map = eim.getMapInstance(cm.getChar().getMapId());
				var passes = cm.haveItem(4001022,32);
				var stage3leader = eim.getProperty("stage3leader");
				if (stage3leader == "done") {
					if (passes) {
						// Clear stage
						cm.sendNext("恭喜通过！我已经为你开往了下一关的大门！");
						party = eim.getPlayers();
						map = cm.getMapId();
						cm.removeAll(4001022);
						//cm.gainItem(4001022, -32);
						clear(3,eim,cm);
						cm.givePartyExp(exp, party);
						cm.dispose();
					} else { // Not done yet
						cm.sendNext("收集到了 32 张通行证了吗？ 把他给我，我就可以帮你开往下一关的大门！");
					}
					cm.dispose();
				} else {
					cm.sendOk("欢迎来到第三关，打到章鱼怪获得32张通行证后和我谈话。");
					eim.setProperty("stage3leader","done");
					cm.dispose();
				}
			} else { // Members
				cm.sendNext("欢迎来到第三关，打到章鱼怪获得32张通行证后和我谈话。");
				cm.dispose();
			}
		} else {
			cm.sendNext("恭喜通过！我已经为你开往了下一关的大门！");
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
	map = mf.getMap(922010300);
	var nextStage = eim.getMapInstance(922010400);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("lpq4");
	}
}