// NPC: Beardman
// Used for: Warps people to 109050000
// Found at the top of the Chimney map
// MrDk/Useless

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("Alright, see you next time!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.haveItem(5220001)) {
				cm.sendNext("What brings you all the way up here, traveler?");
			} else {
				cm.sendOk("Hmm, I don't think I can help you at all...");
				cm.dispose();
			}
		} else if (status == 1) {
			cm.sendNext("Oh, is that a #bEvent Ticket#k?\r\nSo your task was to get all the way up here! A great accomplishment!");
		} else if (status == 2) {
			cm.sendNext("Remember to wait for a #rGamemaster#k in the next map. He or she will tell you if you have won anything!");
		} else if (status == 3) {
			cm.warp(109050000, 0);
			cm.dispose();
		}
	}
}