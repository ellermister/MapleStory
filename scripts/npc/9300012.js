// NPC Name: Guan Zhong
// NPC Purpose: Warps you to 682000200 Chimney JQ
// MrDk/Useless

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("Talk to me once you've decided whether you wish to join the event or not!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("Welcome to the event, #h #!");
		} else if (status == 1) {
			cm.sendNextPrev("Today we're holding a #eChimney Jump Quest Event!#k");
		} else if (status == 2) {
			cm.sendNextPrev("There are a few rules before we start:\r\n#r-You must be level 30\r\n-If you die, you won't be revived\r\n-You must stay down until further notice#n");
		} else if (status == 3) {
			cm.sendNextPrev("#e#rIgnoring the rules may result in a warning or ban!#k#n");
		} else if (status == 4) {
			if (cm.getLevel() >= 30) {
				cm.sendSimple("Would you like to be warped to the Chimney Jump Quest?\r\n#L0#Yes!#l\r\n#L1#No!#l");
			} else {
				cm.sendOk("Sorry, but you need to be atleast level 30 to enter!");
				cm.dispose();
			}
		} else if (status == 5) {
			if (selection == 0) {
				cm.sendNext("Oh, before I forget!\r\nHere's your #bEvent Ticket#k! You can give this to my friend #rPietro#k once you finish the event. He might have a small prize for you!");
			} else if (selection == 1) {
				cm.sendOk("Alright, see you next time!");
				cm.dispose();
			}
		} else if (status == 6) {
			cm.warp(682000200, 0);
			cm.gainItem(5220001, -cm.itemQuantity(5220001));
			cm.gainItem(5220001, 1);
			cm.dispose();
		}
	}
}