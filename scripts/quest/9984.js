var status = -1;

function end(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (qm.getPlayer().getHp() < 50) {
				qm.sendNext("郁闷的很啊");
				qm.dispose();
			} else {
				qm.sendNext("你已经收集好#b50个枫叶#k了呀。不错。你很想知道把枫叶含在嘴里有什么特殊的结果吧。我现在就告诉你。也没啥好处……");
			}
		} else if (status == 1) {
			qm.sendNextPrev("呵呵，说笑的。怎么会没有用呢。做为奖励，我送你一份礼物。希望你喜欢。虽然不是什么好东西，但是佩带起来也是有很好的效果。");
		} else if (status == 2) {
			qm.sendNextPrev("这是利用你所给我的枫叶所制造的耳环。希望你能喜欢~！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v1032035# 1 #t1032035# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 5000 exp");
		} else if (status == 3) {
			qm.gainExp(5000);
			qm.gainItem(1032035, 1);
			qm.gainItem(4001126, -50);
			qm.completeQuest();
			qm.dispose();
		}
	}
}