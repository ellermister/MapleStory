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
			qm.sendAcceptDecline("恭喜你已到达#b100级#k，但这并不表示修炼的结束，如果继续努力，偶尔可以去骑士团长那里听听他们的建议。说不定，可以学到什么#b新技能#k……");
		} else if (status == 1) {
			qm.completeQuest();
			qm.dispose();
		}
	}
}