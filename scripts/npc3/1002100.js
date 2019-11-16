/* Author: Xterminator
	NPC Name: 		Jane
	Map(s): 		Victoria Road : Lith Harbor (104000000)
	Description: 		Sells potions/food if completed all her quests
*/
importPackage(net.sf.odinms.client);

var status = 0;
var amount = -1;
var item;
var cost;
var rec;
var recName;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status <= 2 && mode == 0) {
			cm.dispose();
			return;
		} else if (status >= 3 && mode == 0) {
			cm.sendNext("I still have quite a few of the materials you got me before. The items are all there so take your time choosing.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getQuestStatus(2013).equals(MapleQuestStatus.Status.COMPLETED)) {
				cm.sendNext("It's you... thanks to you I was able to get a lot done. Nowadays I've been making a bunch of items. If you need anything let me know.");
			} else {
				if (cm.getQuestStatus(2010).equals(MapleQuestStatus.Status.COMPLETED))
					cm.sendNext("You don't seem strong enough to be able to purchase my potion ...");
				else
					cm.sendOk("我的梦想是做一个到处游荡的旅行家。就像你们。。。可是我爸爸担心我，不需我去。。。");
				cm.dispose();
			}
		} else if (status == 1) {
			var selStr = "Which item would you like to buy?#b";
			var items = new Array(2000002, 2022003, 2022000, 2001000);
			var costs = new Array(310, 1060, 1600, 3120);
			for (var i = 0; i < items.length; i++) {
				selStr += "\r\n#L" + i + "##z" + items[i] + "# (Price : " + costs[i] + " mesos)#l";
			}
			cm.sendSimple(selStr);
		} else if (status == 2) {
			var itemSet = new Array(2000002, 2022003, 2022000, 2001000);
			var costSet = new Array(310, 1060, 1600, 3120);
			var recHpMp = new Array(300, 1000, 800, 1000);
			var recNames = new Array("HP", "HP", "MP","HP and MP");
			item = itemSet[selection];
			cost = costSet[selection];
			rec = recHpMp[selection];
			recName = recNames[selection];
			cm.sendGetNumber("You want #b#t" + item + "##k? #t" + item + "# allows you to recover " + rec + " " + recName + ". How many would you like to buy?", 1, 1, 100);
		} else if (status == 3) {
			cm.sendYesNo("Will you purchase #r" + selection + "#k #b#t" + item + "#(s)#k? #t" + item + "# costs " + cost + " mesos for one, so the total comes out to be #r" + cost * selection + "#k mesos.");
			amount = selection;
		} else if (status == 4) {
			if (cm.getMeso() < cost * amount || !cm.canHold(item)) {
				cm.sendNext("Are you lacking mesos by any chance? Please check and see if you have an empty slot available at your etc. inventory, and if you have at least #r" + cost * amount + "#k mesos with you.");
			} else {
				cm.gainMeso(-cost * amount);
				cm.gainItem(item, amount);
				cm.sendNext("Thank you for coming. Stuff here can always be made so if you need something, please come again.");
			}
			cm.dispose();
		}
	}
}