/***************************
*     《Vr001 封测版 ONLINE》    *
****************************
*    1061014  -  无影      *
*    PQ：蝙蝠魔的末日      *
***************************/

var status = 0;

var minLevel = 70; //最低等级
var maxLevel = 120; //最高等级

var minPartySize = 1; //最少成员
var maxPartySize = 6; //最大成员

function start() {
	status = -1;
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
		if (status == 0) {
			// 如果是在一个组队上.没有导言.直接检查组队条件
			if (cm.getParty() == null) { // 不是组队
				cm.sendOk("#b蝙蝠魔的末日#kPQ任务 - 任务可获奖励：\r\n\r\n#e#b何露斯之眼#k     #d海量经验#k    #r大量点卷、冒险币\r\n*******************************************\r\n#n#b但是系统判断你没有组队.你无法挑战这个PQ任务！\r\n#b请拥有自己的组队后让队长来和我对话！\r\n\r\n个人情况：\r\n目前已经完成该挑战 #r"+cm.getboss()+"#k #b次！");
				cm.mapMessage("在这个组队挑战任务中，你总共完成了 "+cm.getboss()+" 次！");		
				cm.dispose();
			} else if (!cm.isLeader()) { // 不是组长
				cm.sendOk("如果你想完成#b怪物通缉令#kPQ，请让你的#b小组组长#k和我对话.");
				cm.mapMessage("在这个组队挑战任务中，你总共完成了 "+cm.getboss()+" 次！");
				cm.dispose();
			} else {
				// Check if all party members are within PQ levels
				var party = cm.getParty().getMembers();
				var mapId = cm.getPlayer().getMapId();
				var next = true;
				var levelValid = 0;
				var inMap = 0;
				var it = party.iterator();
				while (it.hasNext()) {
					var cPlayer = it.next();
					if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
						levelValid += 1;
					} else {
						next = false;
					}
					if (cPlayer.getMapid() == mapId) {
						inMap += 1;
					}
				}
				if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
					next = false;
				}
				if (next) { //加载活动脚本
					var em = cm.getEventManager("Vr001 封测版pq");
					cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 的小组进入了PQ!!");
					if (em == null) {
						cm.sendOk("无法加载这个脚本。脚本名称：#bVr001 封测版pq#k\r\n#e请联系管理员解决！#kQQ#r100807851");
					} else {
						if (em.getProperty("entryPossible") != "false") {
							em.startInstance(cm.getParty(),cm.getPlayer().getMap());
							cm.removeAll(4001008);
							cm.removeAll(4001007);
							if(cm.partyMemberHasItem(4001008) || cm.partyMemberHasItem(4001007)) { 
								cm.getPlayer().getEventInstance().setProperty("smugglers", "true"); 
								cm.partyNotice("Your smuggling attempt has been detected. We will allow the attempt, but you will not get any NX cash from this run.");

							}
							em.setProperty("entryPossible", "false");
							cm.getPlayer().getEventInstance().setProperty("startTime", new java.util.Date().getTime());
						} else { // Check if the PQ really has people inside
							var playersInPQ = 0;
							for (var mapid = 970030204; mapid <= 970030204; mapid++) {
								playersInPQ += cm.countPlayersInMap(mapid);
							}
							if (playersInPQ <= 1)
								em.setProperty("entryPossible", "true");
							cm.sendOk("已经有小组进入了该PQ。请稍后再试！");
						}
					}
					cm.dispose();
				} else {
					cm.sendNext("#r需要组队成员:" + minPartySize + " 个玩家。 等级范围,最低 " + minLevel + "级 最高 " + maxLevel + "级.\r\n\r\n#k#b请检查你的小组是否达到以上条件！！");
					cm.dispose();
				}
			}
		}
	}
}
