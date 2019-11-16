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
				qm.sendNext("你来的可真快，幸好我已经制作好了冒险岛糖浆。什么？你说我该不会是事先做好的吧？怎么会呢，但是我要告诉你的是，听说冒险岛糖浆有可能会腐蚀#t01012098#，用起来感觉挺不放心的。");
			}
		} else if (status == 1) {
			qm.sendNextPrev("呵呵，还是玩笑话啦。做为奖励，我送你一份礼物。希望你喜欢。虽然不是什么好东西，但是佩带起来也是有很好的效果。");
		} else if (status == 2) {
			qm.sendNextPrev("这是利用你所给我的枫叶所制造的帽子。希望你能喜欢~！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v1002419# 1 #t1002419# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 3000 exp");
		} else if (status == 3) {
			qm.gainExp(3000);
			qm.gainItem(1002419, 1);
			qm.gainItem(4001126, -25);
			qm.completeQuest();
			qm.dispose();
		}
	}
}