/***************************
*     《Vr001 封测版 ONLINE》    *
****************************
*   9310057 蘑菇博士       *
***************************/

var status = 0;

var minLevel = 30; //最低等级
var maxLevel = 60; //最高等级

var minPartySize = 1; //最少成员
var maxPartySize = 1; //最大成员

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
				cm.sendOk("#e▲★★★★★★★★★★★★★★★★★★★★★★★▲\r\n#e#b我可以带你挑战副本#r\r\n▁▂▃▄▅▆▇█枫叶飘落之地▉▇▆▅▄▃▂▁\r\n#b挑战该副本需要等级30-60级！\r\n#r◤最小成员2人最大成员 5人！◥\r\n◣该副本掉落道具为：       ◢\r\n#v1012098#.#v1032035#.#v1002510#.#v1112116#.#v1122058##b#r隐藏道具.隐藏道具#k\r\n★★★★★★★★★大量的经验值★★★★★★★★★\r\n★★★★★★★★★隐藏点卷道具★★★★★★★★★\r\n#k▲★★★★★★★★★★★★★★★★★★★★★★★▲\r\n#d如果你想挑战请确保达到以上条件！");
				cm.mapMessage("请通过组队进入副本！需要30~60级。玩家2~5名！在这个组队挑战任务中，你总共完成了 "+cm.getboss()+" 次！");		
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
					var em = cm.getEventManager("woniu");
					cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 的小组进入了开始了获得枫叶之旅!!");
					if (em == null) {
						cm.sendOk("无法加载这个脚本。脚本名称：#bnaicha#k\r\n#e请联系管理员解决！#kQQ#rVr001 封测版@qq.com");
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
