importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.scripting.npc);

var status = -1;

function start(mode, type, selection) {
    	if (mode == -1) {
	qm.sendNext("*Sob* Aran has declined my request!");
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
		if (status == 0)
			qm.sendAcceptDecline("嗯嗯……吓死我了……快，带我到赫丽娜那边去！");
		else if (status == 1) {
			qm.startQuest();
			qm.warp(914000300);
			qm.dispose();
		}
	}
}

function end(mode, type, selection) {
	if (mode == -1) {
	qm.sendNext("孩子怎么样？请给我的孩子。");
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
		if (status == 0)
			qm.sendYesNo("呵呵，平安回来了？孩子呢？孩子也带回来了吗？");
		else if (status == 1) {
			qm.gainItem(4001271, -1);
			qm.completeQuest();
			qm.sendNext("太好了……真是太好了。", 9);
		} else if (status == 2)
			qm.sendNextPrev("赶快上船！已经没时间了！", 3);
		else if (status == 3)
			qm.sendNextPrev("没错。现在不是感伤的时候。黑魔法师的气息越来越近！似乎他们已经察觉方舟的位置，得赶紧启航，不然就来不及了！", 9);
		else if (status == 4)
			qm.sendNextPrev("立刻出发！", 3);
		else if (status == 5)
			qm.sendNextPrev("战神！请你也上船吧！我们理解你渴望战斗的心情……不过，现在已经晚了！战斗就交给你的那些同伴吧，和我们一起去金银岛吧！", 9);
		else if (status == 6)
			qm.sendNextPrev("不行！", 3);
		else if (status == 7) {
			qm.sendNextPrev("赫丽娜，你先出发去金银岛。一定要活着，我们一定会再见的。我要和同伴们一起同黑魔法师战斗！", 3);
		} else if (status == 8) {
			qm.clearAranPolearm();
			qm.warp(914090010); // Initialize Aran Tutorial Scenes
			qm.dispose();
		}
	}
}