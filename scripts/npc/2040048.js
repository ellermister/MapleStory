/* Author: Xterminator
	NPC Name: 		Nara
	Map(s): 		Ludibrium : Ludibrium (220000000)
	Description: 		Florina Beach Tour Guide
*/
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if ((status == 0 && mode == 0) || (status == 5 && mode == 1)) {
		cm.dispose();
		return;
	} else if (status <= 2 && mode == 0) {
		cm.sendNext("You must have some business to take care of here. You must be tired from all that traveling and hunting. Go take\r\nsome rest, and if you feel like changing your mind, then\r\ncome talk to me.");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendSimple("Have you heard of the beach with a spectacular view of the ocean called #bFlorina Beach#k, located a little far from Ludibrium? I can take you there right now for either #b1200 mesos#k, or if you have a #bVIP Ticket to Florina Beach#k with you, in which case you'll be there for free.\r\n\r\n#L0##b I'll pay 1200 mesos.#l\r\n#L1# I have a VIP Ticket to Florina Beach.#l\r\n#L2# What is a VIP Ticket to Florina Beach#k?#l");
	} else if (status == 1) {
		if (selection == 0) {
			cm.sendYesNo("You want to pay #b1200 mesos#k and leave for Florina Beach? Okay!! Please be aware that you may be running into some monsters around there, though, so make sure not to get caught off-guard. Okay, would you like to head over to Florina Beach right now?");
		} else if (selection == 1) {
			status = 2;
			cm.sendYesNo("So you have a #bVIP Ticket to Florina Beach#k? You can always head over to Florina Beach with that. Okay!! Please beware that you may be running into some monsters around there, though, so make sure not to get caught off-guard. Okay, would you like to head over to Florina Beach right now?");
		} else if (selection == 2) {
			status = 4;
			cm.sendNext("You must be curious about a #bVIP Ticket to Florina Beach#k. Yeah, I can see that. A VIP Ticket to Florina Beach is an item where as long as you have in possession, you may make your way to Florina Beach for free. It's such a rare item that even we had to buy those, but unfortunately I lost mine a few weeks ago during a long weekend.");
		}
	} else if (status == 2) {
		if (cm.getPlayer().getMeso() < 1200) {
			cm.sendNext("I think you're lacking mesos. There are many ways to gather up some money, you know, like... selling your armor... defeating monsters... doing quests... you know what I'm talking about.");
			cm.dispose();
		} else {
			cm.gainMeso(-1200);
			cm.getPlayer().saveLocation(net.sf.odinms.server.maps.SavedLocationType.FLORINA);
			cm.warp(110000000, 0);
			cm.dispose();
		}
	} else if (status == 3) {
		if (cm.haveItem(4031134)) {
			cm.getPlayer().saveLocation(net.sf.odinms.server.maps.SavedLocationType.FLORINA);
			cm.warp(110000000, 0);
			cm.dispose();
		} else {
			cm.sendNext("Hmmm..., are you sure you have a #bVIP Ticket to Florina Beach#k with you? Please double-check because I can't find it from you.");
			cm.dispose();
		}
	} else if (status == 4) {
		cm.sendNext("You must be curious about a #bVIP Ticket to Florina Beach#k. Yeah, I can see that. A VIP Ticket to Florina Beach is an item where as long as you have in possession, you may make your way to Florina Beach for free. It's such a rare item that even we had to buy those, but unfortunately I lost mine a few weeks ago during a long weekend.");
	} else if (status == 5) {
		cm.sendPrev("I came back without it, and it just feels awful not having it. Hopefully someone picked it up and put it somewhere safe. Anyway, this is my story and who knows, you may be able to pick it up and put it to good use. If you have any questions, feel free to ask.");
		}
	}
}