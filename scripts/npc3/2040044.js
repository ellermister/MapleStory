//圣殿

importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.server.life);
importPackage(java.awt);

var status;

var exp = 8000;
			
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1 && cm.isLeader()) {
		var eim = cm.getChar().getEventInstance();
		var leaderPreamble = eim.getProperty("crackLeaderPreamble");
		if (leaderPreamble == null) {
			eim.setProperty("crackLeaderPreamble", "done");
			cm.sendNext("看到我旁边的老鼠了吗？打到他，他会召唤一个大怪物！达到大怪物！从他的身上抢来钥匙，再和我谈话！");
			cm.dispose();
		} else {
			if (cm.haveItem(4001023)) {
				status = 0;
				cm.sendSimple("恭喜你打到了大怪物！\r\n\r\n#L0##m922011100# (跳过奖金池)#l\r\n#L1##m922011000# (移动到奖金地图)#l\r\n");
			} else {
				cm.sendNext("收集到钥匙了吗？");
				cm.dispose();
			}
		}
	} else if (status == -1 && !cm.isLeader()) {
		cm.sendNext("看到我旁边的老鼠了吗？打到他，他会召唤一个大怪物！达到大怪物！从他的身上抢来钥匙，再和我谈话！");
		cm.dispose();
	} else if (status == 0 && cm.isLeader()) {
		var eim = cm.getChar().getEventInstance();
		var em = cm.getEventManager("LudiPQ");
		clear(9,eim,cm);
		cm.gainItem(4001023,-1);
		var party = eim.getPlayers();
		cm.givePartyExp(exp, party);
		em.setProperty("entryPossible", "true");
		var endTime = new java.util.Date().getTime();
		var startTime = cm.getPlayer().getEventInstance().getProperty("startTime");
		var startTime2 = cm.getPlayer().getEventInstance().getProperty("s9start");
		
		var get30 = false;
		if(((endTime - startTime) < 600000))
			get30 = true;
			
		var get34 = false;
		if(((endTime - startTime2) < 90000))
			get34 = true;
			
		var giveNx = eim.getProperty("smugglers") != "true";
		eim.dispose();
		/** BONUS EVENT SCRIPT START */
		if(selection == 0) {
			for (var i = 0; i < party.size(); i++) {
				warpToBonus(eim, party.get(i), 922011100, giveNx);
				if(giveNx) {
					if(get30) party.get(i).finishAchievement(30);
					if(get34) party.get(i).finishAchievement(34);
				}
			}
		} else {
			bem = cm.getEventManager("LudiPQBonus");
			if (bem == null) {
				for (var i = 0; i < party.size(); i++) {
					warpToBonus(eim, party.get(i), 221024500, giveNx);
					if(giveNx) {
						if(get30) party.get(i).finishAchievement(30);
						if(get34) party.get(i).finishAchievement(34);
					}
				}
			} else {
				for (var i = 0; i < party.size(); i++) {
					if(giveNx) {
						party.get(i).finishAchievement(28);
						party.get(i).finishAchievement(36);
						if(get30) party.get(i).finishAchievement(30);
						if(get34) party.get(i).finishAchievement(34);
					}
					eim.unregisterPlayer(party.get(i));
				}
				bem.startInstance(cm.getParty(),cm.getChar().getMap());
			}
		}
		/**BONUS EVENT SCRIPT END */
		
		cm.dispose();
	} else {
		cm.dispose();
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
	//map.broadcastMessage(packetglow);
	// stage 9 does not have a door, might be cause of DC error
}

function warpToBonus(eim, player, bonusMapId, giveNx) {
	if(giveNx) {
		player.finishAchievement(28);
		player.finishAchievement(36);
	}
	
	var bonusMap = cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(bonusMapId);
	eim.unregisterPlayer(player);
	player.changeMap(bonusMap, bonusMap.getPortal(0));
}
