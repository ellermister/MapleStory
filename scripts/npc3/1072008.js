/* Author: Xterminator
	NPC Name: 		Kyrin
	Map(s): 		Hidden Street : Pirate Test Room (108000500 - 108000503)
	Description: 		2nd Pirate Instructor
*/
var status = 0;
var item;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.sendNext("Good. You're showing me you don't want to give up this great opportunity. When you collect #b15 #t" + item + "#s#k, then talk to me.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getQuestStatus(2191).equals(net.sf.odinms.client.MapleQuestStatus.Status.STARTED)) {
				item = 4031856;
			} else {
				item = 4031857;
			}
			if (cm.haveItem(item, 15)) {
				cm.sendNext("Ohhh... So you managed to gather up 15 #t" + item + "#s! Wasn't it tough? That's amazing... alright then, now let's talk about The Nautilus.");
			} else {
				cm.sendYesNo("Hmmm... What is it? I don't think you have been able to gather up all #b15 #t" + item + "#s#k yet... If it's too hard for you, then you can step out and try again later. Do you want to give up and step outside right now?");
			}
		} else if (status == 1) {
			if (!cm.haveItem(item, 15)) {
				cm.sendNext("Really? Ok, I'll take you outside right now. Please don't give up, though. You'll get the opportunity to try this again. Hopefully by then, you'll be ready to handle this with ease...");
			} else {
				cm.sendNextPrev("These crystals can only be used here, so I'll just take them back.");
			}
		} else if (status == 2) {
			var eim = cm.getPlayer().getEventInstance();
			if (eim != null) {
				eim.unregisterPlayer(cm.getPlayer());
				eim.dispose();
			}
			cm.warp(120000101);
			cm.dispose();
		}
	}
}