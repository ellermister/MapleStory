/**
 *9201023 - Nana(K)
 *@author Jvlaple
 */
 
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
		if (cm.getPlayer().getMarriageQuestLevel() == 1 || cm.getPlayer().getMarriageQuestLevel() == 52) {
			if (!cm.haveItem(4000015, 40)) {
				if (status == 0) {
					cm.sendNext("Hey, you look like you need proofs of love? I can get them for you.");
				} else if (status == 1) {
					cm.sendNext("All you have to do is bring me 40 #bHorned Mushroom Caps#k.");
					cm.dispose();
				}
			} else {
				if (status == 0) {
					cm.sendNext("Wow, you were quick! Heres the proof of love...");
					cm.gainItem(4000015, -40)
					cm.gainItem(4031367, 1);
					cm.dispose();
				}
			}
		} else {
			cm.sendNext("Nice to meet you! I am Nana the Fairy from Amoria. I am waiting for you to prove your devotion to your loved one by obtaining a Proof of Love! To start, you'll have to venture to Amoria to find my good friend, Moony the Ringmaker. Even if you are not interested in marriage yet, Amoria is open for everyone! Go visit Thomas Swift at Henesys to head to Amoria. If you are interested in weddings, be sure to speak with Ames the Wise once you get there!");
			cm.dispose();
		}
	}
}				