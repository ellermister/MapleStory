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
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.haveItem(4001116)) {
				cm.sendSimple("Hello human! Yes, you!\r\nThat.. necklace.. It's beautiful!\r\nMay I ask you where you've found that #bHectagon Necklace#k?\r\n#L0#I got this from someone named...#l");
			} else {
				cm.sendOk("Where could that #bHectagon Necklace#k be?!");
				cm.dispose();
			}
		} else if (status == 1) {
			if (selection == 0) {
				cm.sendSimple("Oh, it doesn't matter where you got it from!\r\nWould you give this to me? It requires special materials to active it, and it doesn't look good on you anyway!#L0#A little less rude would be nice...#l");
			}
		} else if (status == 2) {
			if (selection == 0) {
				cm.sendSimple("I'm sorry! It's just so satisfying to see that necklace after all those years again!\r\nI've been looking for it for ages, but without result.\r\n#L0#Hmmm.. If you want it so bad, should we make a deal?#l");
			}
		} else if (status == 3) {
			if (selection == 0) {
				cm.sendSimple("A deal, hmm?\r\nAlright! If you can find me a #b Stump Eraser, Mushmom Eraser, Lupin Eraser, Wraith Eraser, Slime Eraser, Octopus Eraser and the Hectagon Necklace#k, I will give you an adorable #bSeal Cushion#k!#L0# Alright, we have a deal!#l");
			}
		} else if (status == 4) {
			if (selection == 0) {
				cm.sendSimple("#L0#I'll get back to you when I have the items ready!#l\r\n#L1#I have all the required items ready!#l");
			}
		} else if (status == 5) {
			if (selection == 0) {
				cm.sendOk("Good luck! I hope we meet eachother again soon!");
				cm.dipose();
			} else if (selection == 1) {
				if (cm.haveItem(4001116) && cm.haveItem(4001038) && cm.haveItem(4001039) && cm.haveItem(4001040) && cm.haveItem(4001041) && cm.haveItem(4001042) && cm.haveItem(4001043)) {
					var rand = 1 + Math.floor(Math.random() * 11);
					cm.sendOk("Thank you so much for getting me the necklace! I can now try to unleash the power inside! Don't worry, it's nothing bad!\r\nHere's your #bSeal Cushion#k as I promised!");
					if (rand == 1) {
						cm.gainItem(3010007, 1); // Pink Seal Cushion
					} else if (rand == 2) {
						cm.gainItem(3010007, 1); // Pink Seal Cushion
					} else if (rand == 3) {
						cm.gainItem(3010007, 1); // Pink Seal Cushion
					} else if (rand == 4) {
						cm.gainItem(3010008, 1); // Blue Seal Cushion
					} else if (rand == 5) {
						cm.gainItem(3010008, 1); // Blue Seal Cushion
					} else if (rand == 6) {
						cm.gainItem(3010008, 1); // Blue Seal Cushion
					} else if (rand == 7) {
						cm.gainItem(3010016, 1); // Grey Seal Cushion
					} else if (rand == 8) {
						cm.gainItem(3010016, 1); // Grey Seal Cushion
					} else if (rand == 9) {
						cm.gainItem(3010010, 1); // White Seal Cushion
					} else if (rand == 10) {
						cm.gainItem(3010010, 1); // White Seal Cushion
					} else if (rand == 11) {
						cm.gainItem(3010017, 1); // Gold Seal Cushion
					}
					cm.gainItem(4001038, -1); // Stump Eraser
					cm.gainItem(4001039, -1); // Mushmom Eraser
					cm.gainItem(4001040, -1); // Lupin Eraser
					cm.gainItem(4001041, -1); // Wraith Eraser
					cm.gainItem(4001042, -1); // Slime Eraser
					cm.gainItem(4001043, -1); // Octopus Eraser
					cm.gainItem(4001116, -1); // Hectagon Necklace
					cm.dispose();
				} else {
					cm.sendOk("Sorry, but you don't have the items with you that I asked for!");
					cm.dispose();
				}
			}
		}
	}
}