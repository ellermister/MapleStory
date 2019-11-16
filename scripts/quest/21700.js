importPackage(net.sf.odinms.client);

var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.sendNext("What's stopping you? I promise, I won't be disappointed even if the #p1201001# shows no reaction to you. Please, rush over there and grab the #p1201001#. Just #bclick#k on it.");
        	qm.dispose();
    	} else {
        	if (mode > 0)
            		status++;
        	else
            		status--;
		if (status == 0) {
			qm.sendNext("你似乎在回想什么。这个长矛果然认出了你。那么你肯定就是#b使用长矛的英雄，战神了#k。你想起什么其他的了吗？有关长矛的技能之类……", 8);
		} else if (status == 1) {
			qm.sendNextPrev("#b(说技能倒是想起来了几个。)#k", 2);
		} else if (status == 2) {
			qm.sendNextPrev("如果数量不多，不过也已经很不容易了。现在让我们集中精力来恢复过去的技能吧。虽然你失忆了，但毕竟是以前曾经烂熟与心的东西，要恢复起来应该很快。", 8);
		} else if (status == 3) {
			qm.sendNextPrev("怎么恢复过去的技能？", 2);
		} else if (status == 4) {
			qm.sendNextPrev("这个方法只有一个。修炼！修炼！修炼！除了修炼还是修炼，总有一天身体会回想起那些被遗忘的技能！所以我要给你介绍一个知道你修炼的老师。", 8);
		} else if (status == 5) {
			qm.sendNextPrev("老师？", 2);
		} else if (status == 6) {
			if (!qm.isQuestActive(21700) && !qm.haveItem(1442079)) {
				qm.gainItem(1442079, 1);
				qm.updateQuest(21700, "create@");
				qm.completeQuest();
			}
			qm.sendNext("武器要是能使的更熟练就好了。送你一支#p1201001#。希望你在修炼的时候能够进步的很快。带着这支长矛……");
		} else if (status == 7) {
			qm.sendPrev("从村子出去后往#b左#k走，有个小修炼场。去见见那里的#b普奥#k。他偶尔会有点老年痴呆……不过他一直在等待着英雄的出现，并不段研究着各种技能。你要是能够得到他的帮助，肯定会受益非浅。", 8);
			qm.dispose();
		}
	}
}

function end(mode, type, selection) {

}