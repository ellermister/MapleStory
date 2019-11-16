// NPC Name: -
// NPC Purpose: Exchanges slot machine ticket for iTCG etc. item
// iTCG item exchanger
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
			cm.sendOk("Talk to me to receive your prize!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("Do you have any silver looking ticket with you?");
		} else if (status == 1) {
			cm.sendSimple("#L0#What are you?#l\r\n#L1#I would like to exchange my #bSlot machine ticket#k#l");
		} else if (status == 2) {
			if (selection == 0) {
				cm.sendOk("I'm the #rClaw Machine#k.\r\nInsert a #bSlot machine ticket#k and I will exchange it for a forging item.");
				cm.dispose();
			} else if (selection == 1) {
				var rand = 1 + Math.floor(Math.random() * 20);
				if (cm.haveItem(5220010)) {
					cm.sendOk("#r-You hear the Claw Machine rattle while it's grabbing an old item-#k\r\n\r\nHere you go, enjoy!");
					if (rand == 1) {
						cm.gainItem(4031755, 1); // Taru totem 1
					} else if (rand == 2) {
						cm.gainItem(4031913, 1); // Stone Tiger Head 1
					} else if (rand == 3) {
						cm.gainItem(4031759, 1); // Subani's Ankh 1
					} else if (rand == 4) {
						cm.gainItem(4031914, 1); // Typhon Crest 1
					} else if (rand == 5) {
						cm.gainItem(4031914, 1); // Typhon Crest 2
					} else if (rand == 6) {
						cm.gainItem(4031916, 1); // Pharoah's Wrappings 1
					} else if (rand == 7) {
						cm.gainItem(4031916, 1); // Pharoah's Wrappings 2
					} else if (rand == 8) {
						cm.gainItem(4031917, 1); // Crystal Shard 1
					} else if (rand == 9) {
						cm.gainItem(4031917, 1); // Crystal Shard 2
					} else if (rand == 10) {
						cm.gainItem(4031758, 1); // Naricain Jewel 1
					} else if (rand == 11) {
						cm.gainItem(4031758, 1); // Naricain Jewel 2
					} else if (rand == 12) {
						cm.gainItem(4031757, 1); // Antellion Relic 1
					} else if (rand == 13) {
						cm.gainItem(4031757, 1); // Antellion Relic 2
					} else if (rand == 14) {
						cm.gainItem(4031757, 1); // Antellion Relic 3
					} else if (rand == 15) {
						cm.gainItem(4031756, 1); // Mystic Astrolabe 1
					} else if (rand == 16) {
						cm.gainItem(4031756, 1); // Mystic Astrolabe 2
					} else if (rand == 17) {
						cm.gainItem(4031756, 1); // Mystic Astrolabe 3
					} else if (rand == 18) {
						cm.gainItem(4031915, 1); // LeFay Jewel 1
					} else if (rand == 19) {
						cm.gainItem(4031915, 1); // LeFay Jewel 2
					} else if (rand == 20) {
						cm.gainItem(4031915, 1); // LeFay Jewel 3
					}
					cm.gainItem(5220010,-1); // Slot machine ticket
					cm.dispose();
				} else {
					cm.sendOk("Sorry, but it seems that you do not have the required #bSlot machine ticket#k with you!");
					cm.dispose();
				}
			}
		}
	}
}