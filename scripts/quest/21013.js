importPackage(net.sf.odinms.client);

var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.sendNext("I'm sure it will come in handy during your journey. Please, don't decline my offer.");
        	qm.dispose();
    	} else {
        	if (mode > 0)
            		status++;
        	else
            		status--;
		if (status == 0) {
			qm.sendSimple("英、英雄大人……我一直都很想见你。 \r\n#b#L0#（做腼腆状。）#l");
		} else if (status == 1) {
			qm.sendAcceptDecline("我从很久以前就想送英雄大人一件礼物……既然今天遇见了英雄，不知英雄能否赏脸收下我这份薄礼？");
		} else if (status == 2) {
			if (!qm.isQuestActive(21013)) {
				qm.startQuest();
			}
			qm.sendNext("制作礼物的材料放在这附近的箱子里了。劳烦英雄大人找到这个箱子，把 #b#t4032309##k 和 #b#t4032310##k 带来给我。然后我就能立刻把礼物做好。", 1);
		} else if (status == 3) {
			qm.sendNext("不过因为目前系统有点问题，所以管理员直接会把 #b#t4032309##k 和 #b#t4032310##k 给你，你直接给我就可以了！", 1);
		} else if (status == 4) {
			qm.gainItem(4032309, 1);
			qm.gainItem(4032310, 1);
			qm.displayGuide(18);
			qm.dispose();
		}
	}
}

function end(mode, type, selection) {
	if (mode == -1) {
        	qm.dispose();
    	} else {
        	if (mode > 0)
            		status++;
        	else
            		status--;
		if (status == 0) {
			qm.sendNext("嗯……看好了。礼物已经制作完成了！怎么样。很不错的椅子吧！希望大家能希望本服务器！ \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i3010062# 1 #t3010062# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 95 exp");
		} else if (status == 1) {
			if (qm.isQuestActive(21013)) {
				qm.gainItem(3010062, 1);
				qm.completeQuest();
				qm.getPlayer().gainExp(95, true, true);
			}
			qm.sendNextPrev("在这里，一个完全组装好的椅子，只为你！我一直想给你一个椅子作为礼物，因为我知道一个英雄可以偶尔使用一些很好的休息。", 1);
		} else if (status == 2) {
			qm.sendNextPrev("英雄是不可战胜的。英雄是人。我相信你将面临的挑战，有时甚至动摇。但是，你是一个英雄，因为你有克服任何障碍的能力！", 1)
		} else if (status == 3) {
			qm.displayGuide(19);
			qm.dispose();
		}
	}
}