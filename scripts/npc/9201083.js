// iTCG forger one
// MrDk/Useless
// Found at New Leaf City

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
			cm.sendOk("Please come again later.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("Hmm, what brings you here?");
		} else if (status == 1) {
			cm.sendNext("Do you have any sacred item by a chance?");
		} else if (status == 2) {
			cm.sendSimple("I can create many different forging manuals if you give me a few sacred items. Please pick one: \r\n#L0#Antellion Miter#l\r\n#L1#Infinity Circlet#l\r\n#L2#Neva#l\r\n#L3#Tiger's Fang#l\r\n#L4#Winkel#l\r\n#L5#Glitter Gloves#l\r\n#L6#Crystal Leaf Earrings#l\r\n#L7#Facestompers#l\r\n#L8#Crystal Ilbi throwing-stars#l\r\n#L9#Stormcaster Gloves#l");
		} else if (status == 3) {
			if (selection == 0) {
				if (cm.haveItem(4031756) && cm.haveItem(4031757)) {
					cm.sendSimple("Hmm..\r\nIt seems you have the required items for a #rAntellion Miter forging manual#k. Do you wish me to forge one?\r\n#L10#Yes#l\r\n#L11#No#l\r\n\r\n#rMake sure you have a free ETC. slot!");
				} else if (cm.haveItem(4031756)) { // Mystic Astrolabe
					cm.sendOk("Sorry, but you still need a #rAntellion Relic#k to create a manual.");
					cm.dispose();
				} else if (cm.haveItem(4031757)) { // Antellion Relic
					cm.sendOk("Sorry, but you still need a #rMystic Astrolabe#k to create a manual.");
					cm.dispose();
				} else {
					cm.sendOk("It seems you do #enot#n have any of the required items to create a manual.\r\nRemember I need the following items to create a forging manual for you:\r\n#v4031757##bOne Antellion Relic\r\n#v4031756#  One Mystic Astrolabe");
					cm.dispose();
				}
			} else if (selection == 1) {
				if (cm.haveItem(4031758) && cm.haveItem(4031759)) {
					cm.sendSimple("Hmm..\r\nIt seems you have the required items for a #rInfinity Circlet forging manual#k. Do you wish me to forge one?\r\n#L12#Yes#l\r\n#L11#No#l\r\n\r\n#rMake sure you have a free ETC. slot!");
				} else if (cm.haveItem(4031758)) { // Naricain Jewel
					cm.sendOk("I see you have a #rNaricain Jewel#k with you.\r\nPlease bring me a #rSubani Ankh#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031759)) 	{ // Subani Ankh
					cm.sendOk("I see you have a #rSubani Ankh#k with you.\r\nPlease bring me a #rNaricain Jewel#k as well so I can create a manual for you.");
					cm.dispose();
				} else {
					cm.sendOk("It seems you do #enot#n have any of the required items to create a manual.\r\nRemember I need the following items to create a forging manual for you:\r\n#v4031758##b  One Naricain Jewel\r\n#v4031759# One Subani Ankh");
					cm.dispose();
				}
			} else if (selection == 2) {
				if (cm.haveItem(4031916) && cm.haveItem(4031914)) {
					cm.sendSimple("Hmm..\r\nIt seems you have the required items for a #rNeva forging manual#k. Do you wish me to forge one?\r\n#L13#Yes#l\r\n#L11#No#l\r\n\r\n#rMake sure you have a free ETC. slot!");
				} else if (cm.haveItem(4031916)) { // Pharoah's Wrappings
					cm.sendOk("I see you have a #rPharoah's Wrappings#k with you.\r\nPlease bring me a #rTyphon Crest#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031914)) { // Typhon Crest
					cm.sendOk("I see you have a #rTyphon Crest#k with you.\r\nPlease bring me a #rPharoah's Wrappings#k as well so I can create a manual for you.");
					cm.dispose();
				} else {
					cm.sendOk("It seems you do #enot#n have any of the required items to create a manual.\r\nRemember I need the following items to create a forging manual for you:\r\n#v4031916##b One Pharoah's Wrappings\r\n#v4031914#One Typhon Crest");
					cm.dispose();
				}
			} else if (selection == 3) {
				if (cm.haveItem(4031917) && cm.haveItem(4031913)) {
					cm.sendSimple("Hmm..\r\nIt seems you have the required items for a #rTiger's Fang forging manual#k. Do you wish me to forge one?\r\n#L14#Yes#l\r\n#L11#No#l\r\n\r\n#rMake sure you have a free ETC. slot!");
				} else if (cm.haveItem(4031917)) { // Crystal shard
					cm.sendOk("I see you have a #rCrystal Shard#k with you.\r\nPlease bring me a #rStone Tiger Head#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031913)) { // Stone tiger head
					cm.sendOk("I see you have a #rStone Tiger Head#k with you.\r\nPlease bring me a #rCrystal Shard#k as well so I can create a manual for you.");
					cm.dispose();
				} else {
					cm.sendOk("It seems you do #enot#n have any of the required items to create a manual.\r\nRemember I need the following items to create a forging manual for you:\r\n#v4031917##b One Crystal shard\r\n#v4031913# One Stone tiger head");
					cm.dispose();
				}
			} else if (selection == 4) {
				if (cm.haveItem(4031915) && cm.haveItem(4031914)) {
					cm.sendSimple("Hmm..\r\nIt seems you have the required items for a #rWinkel forging manual#k. Do you wish me to forge one?\r\n#L15#Yes#l\r\n#L11#No#l\r\n\r\n#rMake sure you have a free ETC. slot!");
				} else if (cm.haveItem(4031915)) { // LeFay Jewel
					cm.sendOk("I see you have a #rLeFay Jewel#k with you.\r\nPlease bring me a #rTyphon Crest#k as well so I can create a manual for you.");
					cm.dispose();
				}
				else if (cm.haveItem(4031914)) 	{ // Typhon Crest
					cm.sendOk("I see you have a #rTyphon Crest#k with you.\r\nPlease bring me a #rLeFay Jewel#k as well so I can create a manual for you.");
					cm.dispose();
				} else {
					cm.sendOk("It seems you do #enot#n have any of the required items to create a manual.\r\nRemember I need the following items to create a forging manual for you:\r\n#v4031915##b  One LeFay Jewel\r\n#v4031914# One Typhon Crest");
					cm.dispose();
				}
			} else if (selection == 5) {
				if (cm.haveItem(4031915) && cm.haveItem(4031916)) {
					cm.sendSimple("Hmm..\r\nIt seems you have the required items for a #rGlitter Gloves forging manual#k. Do you wish me to forge one?\r\n#L16#Yes#l\r\n#L11#No#l\r\n\r\n#rMake sure you have a free ETC. slot!");
				} else if (cm.haveItem(4031915)) { // LeFay Jewel
					cm.sendOk("I see you have a #rLeFay Jewel#k with you.\r\nPlease bring me a #rParoah's Wrappings#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031916)) 	{ // Paroah's Wrappings
					cm.sendOk("I see you have a #rParoah's Wrappings#k with you.\r\nPlease bring me a #rLeFay Jewel#k as well so I can create a manual for you.");
					cm.dispose();
				} else {
					cm.sendOk("It seems you do #enot#n have any of the required items to create a manual.\r\nRemember I need the following items to create a forging manual for you:\r\n#v4031915##b One LeFay Jewel\r\n#v4031916# One Paroah's Wrappings");
					cm.dispose();
				}
			} else if (selection == 6) {
				if (cm.haveItem(4031756) && cm.haveItem(4031755) && cm.haveItem(4031758)) {
					cm.sendSimple("Hmm..\r\nIt seems you have the required items for a #rCrystal Leaf Earrings forging manual#k. Do you wish me to forge one?\r\n#L17#Yes#l\r\n#L11#No#l\r\n\r\n#rMake sure you have a free ETC. slot!");
				} else if (cm.haveItem(4031758) && cm.haveItem(4031756)) { // Narcain Jewel and Mystic Astrolabe
					cm.sendOk("I see you have a #rNarcain Jewel#k and a #rMystic Astrolabe#k with you.\r\nPlease bring me a #rTaru Totem#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031758) && cm.haveItem(4031755)) 	{ // Naricain Jewel and Taru totem
					cm.sendOk("I see you have a #rNarcain Jewel#k and a #rTaru Totem#k with you.\r\nPlease bring me a #rMystic Astrolabe#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031756) && cm.haveItem(4031755)) 	{ // Mystic Astrolabe and Taru totem
					cm.sendOk("I see you have a #rMystic Astrolabe#k and a #rTaru Totem#k with you.\r\nPlease bring me a #rNaricain Jewel#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031756)) { // Mystic Astrolabe
					cm.sendOk("I see you have a #rMystic Astrolabe#k with you.\r\nPlease bring me a #rNaricain Jewel#k and #rTaru Totem#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031755)) { // Taru totem
					cm.sendOk("I see you have a #rTaru totem#k with you.\r\nPlease bring me a #rNaricain Jewel#k and #rMystic Astrolabe#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031758)) { // Naricain Jewel
					cm.sendOk("I see you have a #rNaricain Jewel#k with you.\r\nPlease bring me a #rMystic Astrolabe#k and #rTaru Totem#k as well so I can create a manual for you.");
					cm.dispose();
				} else {
					cm.sendOk("It seems you do #enot#n have any of the required items to create a manual.\r\nRemember I need the following items to create a forging manual for you:\r\n#v4031756##b One Mystic Astrolabe\r\n#v4031755##bOne Taru totem\r\n#v4031758##b One Naricain Jewel");
					cm.dispose();
				}
			} else if (selection == 7) {
				if (cm.haveItem(4031913) && cm.haveItem(4031755)) {
					cm.sendSimple("Hmm..\r\nIt seems you have the required items for a #rFacestompers forging manual#k. Do you wish me to forge one?\r\n#L18#Yes#l\r\n#L11#No#l\r\n\r\n#rMake sure you have a free ETC. slot!");
				} else if (cm.haveItem(4031913)) { // Stone tiger head
					cm.sendOk("I see you have a #rStone Tiger Head#k with you.\r\nPlease bring me a #rTaru Totem#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031755)) 	{ // Taru totem
					cm.sendOk("I see you have a #rTaru Totem#k with you.\r\nPlease bring me a #rStone Tiger Head#k as well so I can create a manual for you.");
					cm.dispose();
				} else {
					cm.sendOk("It seems you do #enot#n have any of the required items to create a manual.\r\nRemember I need the following items to create a forging manual for you:\r\n#v4031913##b One Stone tiger head\r\n#v4031755#One Taru Totem");
					cm.dispose();
				}
			} else if (selection == 8) {
				if (cm.haveItem(4031917) && cm.haveItem(2070006) && cm.haveItem(4031758)) {
					cm.sendSimple("Hmm..\r\nIt seems you have the required items for a #rCrystal Ilbi throwing-stars#k. Do you wish me to forge one?\r\n#L19#Yes#l\r\n#L11#No#l\r\n\r\n#rMake sure you have a free ETC. slot!");
				} else if (cm.haveItem(4031917) && cm.haveItem(2070006)) { // Crystal shard and Ilbi throwing-stars
					cm.sendOk("I see you have a #rCrystal Shard#k and a #rset of Ilbi throwing-stars#k with you.\r\nPlease bring me a #rNaricain Jewel#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031917) && cm.haveItem(4031758)) { // Crystal shard and Naricain Jewel
					cm.sendOk("I see you have a #rCrystal Shard#k and a #rNaricain jewel#k with you.\r\nPlease bring me a #rset of Ilbi throwing-stars#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(2070006) && cm.haveItem(4031758)) { // Ilbi throwing-stars and Naricain Jewel
					cm.sendOk("I see you have a #rNaricain Jewel#k and a #rset of Ilbi throwing-stars#k with you.\r\nPlease bring me a #rCrystal Shard#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031917)) { // Crystal Shard
					cm.sendOk("I see you have a #rCrystal Shard#k with you.\r\nPlease bring me a #rset of Ilbi throwing-stars#k and #rNaricain Jewel#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(2070006)) { // Set of Ilbi throwing-stars
					cm.sendOk("I see you have a #rset of Ilbi throwing-stars#k with you.\r\nPlease bring me a #rCrystal Shard#k and #rNaricain Jewel#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031758)) { // Naricain Jewel
					cm.sendOk("I see you have a #rNaricain Jewel#k with you.\r\nPlease bring me a #rCrystal Shard#k and #rset of Ilbi throwing-stars#k as well so I can create a manual for you.");
					cm.dispose();
				}
				else {
					cm.sendOk("It seems you do #enot#n have any of the required items to create a manual.\r\nRemember I need the following items to create a forging manual for you:\r\n#v4031917##b One Crystal Shard\r\n#v4031758##b One Naricain Jewel\r\n#v2070006#  One set of Ilbi throwing-stars");
					cm.dispose();
				}
			} else if (selection == 9) {
				if (cm.haveItem(4031755) && cm.haveItem(4031759) && cm.haveItem(4031757)) {
					cm.sendSimple("Hmm..\r\nIt seems you have the required items for a #rStormcaster Gloves forging manual#k. Do you wish me to forge one?\r\n#L20#Yes#l\r\n#L11#No#l\r\n\r\n#rMake sure you have a free ETC. slot!");
				} else if (cm.haveItem(4031757) && cm.haveItem(4031759)) { // Antellion Relic and Subani Ankh
					cm.sendOk("I see you have a #rAntellion Relic#k and a #rSubani Ankh#k with you.\r\nPlease bring me a #rTaru Totem#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031757) && cm.haveItem(4031755)) { // Antellion Relic and Taru totem
					cm.sendOk("I see you have a #rAntellion Relic#k and a #rTaru Totem#k with you.\r\nPlease bring me a #rSubani Ankh#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031755) && cm.haveItem(4031759)) { // Taru totem and Subani Ankh
					cm.sendOk("I see you have a #rTaru Totem#k and a #rSubani Ankh#k with you.\r\nPlease bring me a #rAntellion Relic#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031757)) { // Antellion Relic
					cm.sendOk("I see you have a #rAntellion Relic#k with you.\r\nPlease bring me a #rTaru Totem#k and #rSubani Ankh#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031755)) 	{ // Taru totem
					cm.sendOk("I see you have a #rTaru Totem#k with you.\r\nPlease bring me a #rAntellion Relic#k and #rSubani Ankh#k as well so I can create a manual for you.");
					cm.dispose();
				} else if (cm.haveItem(4031759)) 	{ // Subani Ankh
					cm.sendOk("I see you have a #rSubani Ankh#k with you.\r\nPlease bring me a #rTaru Totem#k and #rAntellion Relic#k as well so I can create a manual for you.");
					cm.dispose();
				} else {
					cm.sendOk("It seems you do #enot#n have any of the required items to create a manual.\r\nRemember I need the following items to create a forging manual for you:\r\n#v4031757##b One Antellion Relic\r\n#v4031755##b  One Taru totem\r\n#v4031759##b  One Subani Ankh");
					cm.dispose();
				}
			}
		} else if (status == 4) {
			if (selection == 10) {
				cm.sendOk("Check out #eSpindle#n in the #rOmega Sector#k. He knows how to finish forging manuals.\r\nCome back to me whenever you need help with manuals.");
				cm.gainItem(4031757, -1); // Antellion Relic
				cm.gainItem(4031756, -1); // Mystic Astrolabe
				cm.gainItem(4031823, 1); // Antellion Miter Forging manual
			}
			if (selection == 11) {
				cm.sendOk("Come back later once you have decided whether you want me to create a forging manual or not.");
			}
			if (selection == 12) {
				cm.sendOk("Check out #eSpindle#n in the #rOmega Sector#k. He knows how to finish forging manuals.\r\nCome back to me whenever you need help with manuals.");
				cm.gainItem(4031758, -1); // Naricain Jewel
				cm.gainItem(4031759, -1); // Subani Ankh
				cm.gainItem(4031822, 1); // Infinity Circlet Forging manual
			}
			if (selection == 13) {
				cm.sendOk("Check out #eSpindle#n in the #rOmega Sector#k. He knows how to finish forging manuals.\r\nCome back to me whenever you need help with manuals.");
				cm.gainItem(4031916, -1); // Pharoah's Wrappings
				cm.gainItem(4031914, -1); // Typhon Crest
				cm.gainItem(4031908, 1); // Neva Forging manual
			}
			if (selection == 14) {
				cm.sendOk("Check out #eSpindle#n in the #rOmega Sector#k. He knows how to finish forging manuals.\r\nCome back to me whenever you need help with manuals.");
				cm.gainItem(4031917, -1); // Crystal Shard
				cm.gainItem(4031913, -1); // Stone Tiger Head
				cm.gainItem(4031907, 1); // Tiger's Fang Forging manual
			}
			if (selection == 15) {
				cm.sendOk("Check out #eSpindle#n in the #rOmega Sector#k. He knows how to finish forging manuals.\r\nCome back to me whenever you need help with manuals.");
				cm.gainItem(4031915, -1); // LeFay Jewel
				cm.gainItem(4031914, -1); // Typhon Crest
				cm.gainItem(4031909, 1); // Winkel Forging manual
			}
			if (selection == 16) {
				cm.sendOk("Check out #eSpindle#n in the #rOmega Sector#k. He knows how to finish forging manuals.\r\nCome back to me whenever you need help with manuals.");
				cm.gainItem(4031915, -1); // LeFay Jewel
				cm.gainItem(4031916, -1); // Pharoah's Wrappings
				cm.gainItem(4031910, 1); // Glitter Gloves Forging manual
			}
			if (selection == 17) {
				cm.sendOk("Check out #eSpindle#n in the #rOmega Sector#k. He knows how to finish forging manuals.\r\nCome back to me whenever you need help with manuals.");
				cm.gainItem(4031756, -1); // Mystic Astrolabe
				cm.gainItem(4031755, -1); // Taru Totem
				cm.gainItem(4031758, -1); // Naricain Jewel
				cm.gainItem(4031825, 1); // Crystal Leaf Earrings Forging manual
			}
			if (selection == 18) {
				cm.sendOk("Check out #eSpindle#n in the #rOmega Sector#k. He knows how to finish forging manuals.\r\nCome back to me whenever you need help with manuals.");
				cm.gainItem(4031913, -1); // Stone Tiger Head
				cm.gainItem(4031755, -1); // Taru Totem
				cm.gainItem(4031911, 1); // Facestompers Forging manual
			}
			if (selection == 19) {
				cm.sendOk("Check out #eSpindle#n in the #rOmega Sector#k. He knows how to finish forging manuals.\r\nCome back to me whenever you need help with manuals.");
				cm.gainItem(4031917, -1); // Crystal Shard
				cm.gainItem(2070006, -1); // Ilbi Throwing-stars
				cm.gainItem(4031758, -1); // Naricain Jewel
				cm.gainItem(4031912, 1); // Crystal Ilbi throwing-stars Forging manual
			}
			if (selection == 20) {
				cm.sendOk("Check out #eSpindle#n in the #rOmega Sector#k. He knows how to finish forging manuals.\r\nCome back to me whenever you need help with manuals.");
				cm.gainItem(4031755, -1); // Taru Totem
				cm.gainItem(4031759, -1); // Subani Ankh
				cm.gainItem(4031757, -1); // Antellion Relic
				cm.gainItem(4031824, 1); // Stormcaster Gloves Forging manual
			}
			cm.dispose();
		}
	}
}