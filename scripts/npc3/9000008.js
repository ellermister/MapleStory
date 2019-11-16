// Spindle
// MrDk/Useless
// Found at Omega Sector

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.sendOk("Just come back to me whenever you feel to pick a lock!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("I am #rMr. Pickall#k! I'm the master of lock-picking!\r\nIs there anything I can help you with?");
		} else if (status == 1) {
			cm.sendSimple("#L0#What is a #rMaster Key#k?#l\r\n#L1#What is a #rGold Box#k and #rSilver Box#k?");
		} else if (status == 2) {
			if (selection == 0) {
				if (cm.haveItem(5490000)) {
					cm.sendOk("I see you have the #rMaster Key#k with you! It has been a long time since the last time I've seen the key...\r\nYou can use this special key on a #rGold Box#k or a #rSilver Box#k. They contain valuable and less valuable stuff.");
					cm.dispose();
				} else {
					cm.sendOk("Ah, the #rMaster Key#k...\r\nIt is quite hard to obtain! Not many people managed to get one in their hands on it. The ones that did, told me they got it from special activities.\r\nIt can be used to open the ancient #rGold Box#k and #rSilver Box#k.");
					cm.dispose();
				}
			} else if (selection == 1) {
				if (cm.haveItem(4280000)) {
					cm.sendOk("You managed to find the ancient #rGold Box#k?! That's quite amazing, knowing it's very hard to obtain!\r\nAll you need now is the #rMaster Key#k. Not many people managed to get their hands on it, but I'm sure you will be able to!\r\nRemember this box contains more valuable items than the Silver one!");
					cm.dispose();
				} else if (cm.haveItem(4280001)) {
					cm.sendOk("You managed to find the ancient #rSilver Box#k?! That's quite amazing, knowing it's very hard to obtain!\r\nAll you need now is the #rMaster Key#k. Not many people managed to get their hands on it, but I'm sure you will be able to!\r\nRemember this box contains less valuable items than the Golx one!");
					dispose();
				} else {
					cm.sendSimple("Are you looking for the #rGold Box#k or the #rSilver Box#k?\r\n#L3#Gold Box#l\r\n#L4#Silver Box#l");
				}
			}
		} else if (status == 3) {
			if (selection == 3) {
				cm.sendOk("The #rGold Box#k is the hardest to obtain. The strong guardians of #bDestinyMS#k are holding them.\r\nThe guardian from the sea, the guardian of time and many others.");
				cm.dispose();
			} else if (selection == 4) {
				cm.sendOk("The #rSilver Box#k is the easiest to obtain. I heard smaller monsters at the Crimson Wood Keep are holding them.");
				cm.dispose();
			}
		}
	}
}