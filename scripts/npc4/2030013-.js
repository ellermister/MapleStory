var status = -1;
var victim;
var log = "ZakumChallage";

function start() {
	if (cm.getPlayer().getClient().getChannel() != 1 && cm.getPlayer().getClient().getChannel() != 2) {
		cm.playerMessage(5, "只能在1频或2频打");
		cm.dispose();
		return false;
	}
    var level = cm.getPlayerStat("LVL");
	
    if (!cm.haveItem(4001017) || level < 50 || cm.getBossLog(log) > 5) {
		cm.playerMessage(5, "你没有火焰之眼或者是你的等级尚未达到50 或每天的挑战超过五次");
		cm.dispose();
    } else {
		if (cm.getPlayer().getParty() == null){
			cm.sendNext("请组队后再跟我说话");
		    cm.dispose();
			return;
		} else {
			var mapId = cm.getPlayer().getMapId();
            var next = true;
            var party = cm.getPlayer().getParty().getMembers();
            var it = party.iterator();
            while (it.hasNext()) {
                var cPlayer = it.next();
                victim = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                if (victim == null || victim.getMapId() != mapId) || victim.getLevel() < 50 || !victim.haveItem(4001017, 1) || victim.getBossLog(log) > 5) {
					next = false;
                    break;
                }
            }

            if (!next) {
				if(victim != null){
					cm.sendNext("请确认您跟您的队员("+victim.getName()+")在这一张地图 等级超过五十 都有火焰之眼 挑战没有超过五次");
				} else {
					cm.sendNext("请确认您跟您的队员在这一张地图 等级超过五十 都有火焰之眼 挑战没有超过五次");
                }
				cm.dispose();
                return;
            }
			if (!cm.isLeader()) {
				cm.playerMessage(5, "请让你的队长来找我");
			} else if (cm.getPlayerCount(280030000) <= 0) { // Fant. Map
				var FantMap = cm.getMap(280030000);
				FantMap.resetFully();
				marr.setCustomData("" + cm.getCurrentTime());
				var party = cm.getPlayer().getParty().getMembers();
				var it = party.iterator();
				while (it.hasNext()) {
					var cPlayer = it.next();
					victim = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
					if (victim != null){
						victim.setBossLog(log);
					}
				}
				cm.warpParty(280030000, "sp");
			} else {
				/*if (cm.getMap(280030000).getSpeedRunStart() == 0 && (cm.getMonsterCount(280030000) <= 0 || cm.getMap(280030000).isDisconnected(cm.getPlayer().getId()))) {
					cm.warp(280030000, "sp");
					cm.dispose();
				} else{
					cm.warp(280030000, 0);
				}*/
			}
			cm.dispose();
		}
    }
}
function action(mode, type, selection) {
    switch (status) {
	case 1:
	    if (mode == 1) {
			cm.warp(211042300, 0);
	    }
	    cm.dispose();
	    break;
    }
}