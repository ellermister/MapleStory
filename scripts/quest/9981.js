importPackage(net.sf.odinms.client);

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
			qm.sendNext("祝贺你努力升级。作为升级的祝贺，我送你一个枫叶。希望你能在#r#e冒险岛#k#k度过愉快的一天～\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v4001126# 29个");
		} else if (status == 1) {
			qm.completeQuest();
			qm.gainItem(4001126, 29);
			qm.dispose();
		}
	}
}