// Snail rusher
// MrDk/Useless
// Found at GM

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
			cm.sendOk("See you later!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getLevel() >= 30 && cm.getLevel() <= 200) {
				cm.sendNext("Hey! Have you ever heard of the #bSnail Rush Event#k?!");
			} else {
				cm.sendOk("As we're moving to a very cold place, only people that are trained enough are able to enter the place. Please come back once you're #rlevel 50#k or higher!");
				cm.dispose();
			}
		} else if (status == 1) {
			cm.sendNext("No? Alright, let me explain it to you!\r\nFirst of all, you'll have to pick a team. After that you will be warped to the event map. Your task is to get the snail to the other side of the map by attacking it with your team! The first team to finish wins the event! That's simple, isn't it?");
		} else if (status == 2) {
			cm.sendNext("Before you start, please wait for the #rGamemaster#k, he or she will start the event. Stay wherever you are and do not move to the right side of the map.");
		} else if (status == 3) {
			cm.sendSimple("Please pick a team!\r\n#b#L0#Team Maple#l#k\r\n#r#L1#Team Story#l#k");
		} else if (status == 4) {
			if (selection == 0) {
				cm.warp(109060000, 1);
			} else if (selection == 1) {
				cm.warp(109060000, 0);
			}
			cm.dispose();
		}
	}
}