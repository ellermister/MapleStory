/*
	NPC Name: 		Sgt. Anderson
	Map(s): 		Ludibrium PQ Maps
	Description: 		Warps you out from Ludi PQ
*/
var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.sendOk("Keep trying!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getMapId() != 100000200) {
				cm.sendYesNo("Are you sure you want to leave the #rParty Quest#k? You'll have to start over if you change your mind.");
			} else {
				if (cm.haveItem(4001022)) {
					cm.removeAll(4001022);
				}
				if (cm.haveItem(4001023)) {
					cm.removeAll(4001023);
				}
				cm.getEventManager("LudiPQ").setProperty("entryPossible", "true");
				cm.warp(221024500, 0);
				/*if (cm.haveItem(4001022)) {
					cm.removeAll(4001022);
				}
				if (cm.haveItem(4001023)) {
					cm.removeAll(4001023);
				}*/ // Re-enable smuggling, due to popular demand.
				cm.dispose();
			}
		} else if (status == 1) {
			if (cm.getMapId() != 100000200) {
				var eim = cm.getPlayer().getEventInstance();
				if (eim == null) {
					cm.warp(100000200);
				} else if (cm.isLeader()) {
					eim.disbandParty();
					cm.getEventManager("LudiPQ").setProperty("entryPossible", "true");
				} else {
			cm.sendOk("喊你队长来和我说!");
				}
				cm.dispose();
			}
		}
	}
}