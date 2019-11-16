var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			qm.sendNext("怎么样，已经到达#b110级#k了。以前学习的技能运用的如何？");
		} else if (status == 1) {
			qm.sendNextPrev("#b骑士团长#k们好像又学会了其他的技能。你也别闲着，快去学习吧。骑士团长们说不定会反对……但学还是不学还是取决于你自己。");
		} else if (status == 2) {
			qm.sendAcceptDecline("你在这段时间学了很多技能吗？应该不少吧……现在你想学习#b新技能#k吗？");
			qm.startQuest();
			qm.dispose();
		}
	}
}