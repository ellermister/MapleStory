var status = 0;

var minLevel = 51;
var maxLevel = 200;

var minPartySize = 3;
var maxPartySize = 6;

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
			// Lakelis has no preamble, directly checks if you're in a party
			if (cm.getParty() == null) { // No Party
				cm.sendOk("您想要挑战#b远古精灵#k吗?那么您必须要有一个组队噢!\r\n·等级要求:51级-?级.\r\n·队伍要求:3~6人\r\n#k·任务奖励:#b新手大量经验.");
				cm.dispose();

                       } else if (cm.getChar().getVip()<0) { // Not Party Leader
				cm.sendOk("队长需要会员等级在1星，或以上，才能进入.");
				cm.dispose();
                      } else if (!cm.isLeader()) { // Not Party Leader
				cm.sendOk("如果想要挑战#b远古精灵组队修炼#k请让你们的#b组队长#k来找我吧!.");
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
				if (next) {
					var em = cm.warpParty(920010000);
					cm.getMap(920010000).addMapTimer(600, 920011200);
		if (em == null) {
						cm.sendOk("你已进入副本地图.请查看相关NPC了解副本");
					} else {
						if (em.getProperty("entryPossible") != "false") {
							// Begin the PQ.
							em.startInstance(cm.getParty(),cm.getPlayer().getMap());
							// Remove Passes and Coupons
							
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
							for (var mapid = 920010000; mapid <= 920011300; mapid++) {
								playersInPQ += cm.countPlayersInMap(mapid);
							}
							if (playersInPQ <= 1)
								em.setProperty("entryPossible", "true");
							cm.sendOk("Another party has already entered the #rKerning Party Quest#k in this channel. Please try another channel, or wait for the current party to finish.");
						}
					}
					cm.dispose();
	
					
                      
			} else {
					cm.sendNext("您想要挑战#b远古精灵#k吗?那么您必须要有一个组队噢!\r\n·等级要求:51级-?级.\r\n·队长要求:#r3~6人.\r\n#k·任务奖励:#b经验.#k\r\n\r\n您的组队必须有#b3~6#k名队员,并且都在此地图中.\r\n等级必须在#b51-#b?#k级之间!\r\n目前只有#b" + inMap + "位队员#k在此地图!.");
					cm.dispose();
				}
			}
		}
	}
}