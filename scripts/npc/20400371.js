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
		var stage2status = eim.getProperty("stage2status");
		if (stage2status == null) {
			if (playerStatus) { // Leader
				var map = eim.getMapInstance(cm.getChar().getMapId());
				var passes = cm.haveItem(4001022,15);
				var stage2leader = eim.getProperty("stage2leader");
				if (stage2leader == "done") {
					if (passes) {
						// Clear stage
						cm.sendNext("恭喜你通过了第二关，请通往下一关的大门！");
						party = eim.getPlayers();
						map = cm.getMapId();
						cm.removeAll(4001022);
						//cm.gainItem(4001022, -15);
						clear(2,eim,cm);
						cm.givePartyExp(exp, party);
						cm.dispose();
					} else { // Not done yet
						cm.sendNext("收集到 15 张通行证了吗？如果收集到了可以来找我，我会为你开往下一关的大门。");
					}
					cm.dispose();
				} else {
					cm.sendOk("欢迎来到第二关，这里是废弃的塔。看到下面的箱子了吗？敲碎他们。得到通行证15张跟我对话。");
					eim.setProperty("stage2leader","done");
					cm.dispose();
				}
			} else { // Members
				cm.sendNext("欢迎来到第二关，这里是废弃的塔。看到下面的箱子了吗？敲碎他们。得到通行证15张跟我对话。");
				cm.dispose();
			}
		} else {
			cm.sendNext("恭喜你通过了第二关，请通往下一关的大门！");
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
	map = mf.getMap(922010200);
	var nextStage = eim.getMapInstance(922010300);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("lpq3");
	}
}