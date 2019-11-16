/*
Vr001 封测版 ONLINE
完善中的玩具城脚本
*/

var status = 0;

var minLevel = 30;
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
			if (cm.getParty() == null) { //没有组队
				cm.sendOk("进入需要: #r\r\n" + minPartySize + " 位组员.最低 " + minLevel + " 级,最高 " + maxLevel + "级.");
				cm.dispose();
			} else if (!cm.isLeader()) { // 不是队长
				cm.sendOk("请e让你的小组组长和我对话！.");
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
					var em = cm.getEventManager("LudiPQ");
					if (em == null) {
						cm.sendOk("The Ludibrium PQ has encountered an error. Please report this on the forums, with a screenshot.");
					} else {
						if (em.getProperty("entryPossible") != "false") {
							// Begin the PQ.
							em.startInstance(cm.getParty(), cm.getPlayer().getMap());
							// Remove Passes and Coupons
							if (cm.getPlayer().getEventInstance() == null) {
								cm.sendOk("The Ludibrium PQ has encountered an error. Please report this on the forums, with a screenshot.");
								cm.dispose();
							} else {
								//var party2 = cm.getPlayer().getEventInstance().getPlayers();
								cm.removeAll(4001022);
								cm.removeAll(4001023); 
								// Mimicking exact GMS behavior, only removes from leader
								if(cm.partyMemberHasItem(4001022) || cm.partyMemberHasItem(4001023)) { 
								cm.getPlayer().getEventInstance().setProperty("smugglers", "true"); 
								cm.partyNotice("Your smuggling attempt has been detected. We will allow the attempt, but you will not get any NX cash from this run.");

								}
								cm.getPlayer().getEventInstance().setProperty("startTime", new java.util.Date().getTime());
								em.setProperty("entryPossible", "false");
							}
						} else {
							cm.sendNext("里面已经开始了战斗，你们等等吧，或者换个频道试试吧！");
						}
					}
					cm.dispose();
				} else {
					cm.sendNext("你好，你想挑战这个PQ吗？进入收到了限制，请确定你的组队时这样完整的。进入需要: #r\r\n" + minPartySize + " 位组员.最低 " + minLevel + " 级,最高 " + maxLevel + "级.");
					cm.dispose();
				}
			}
		}
	}
}
