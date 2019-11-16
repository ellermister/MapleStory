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
			qm.sendAcceptDecline("正值暑假期间，我准备了很多快速问答题。你要不要参加？");
		} else if (status == 1) {
			qm.startQuest();
			qm.sendNext("不过我现在没时间，你过一会再来找我吧。");
		} else if (status == 2) {
			qm.dispose();
		}
	}
}