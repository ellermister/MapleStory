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
			qm.sendNext("好久不见。这段时间你真的强了很多。现在冒险骑士团几乎找不到比你更强的人了。骑士团长们好像也不是你的对手了……客套话就说到这里，下面我就直话直说了。");
		} else if (status == 1) {
			qm.sendNextPrev("有一个新任务。根据前不久收到的情报，#r黑色之翼#k的某个成员妄图对女皇不利。为了阻止他，骑士团的高级骑士#b#p1103000##k正在采取行动，但他一个人好像有点困难。");
		} else if (status == 2) {
			qm.sendNextPrev("金银岛还行，而神秘岛是连骑士团的情报员都不太了解的地方，因此需要支援。你能去支援#p1103000#吗？她最后一次和我们联系是在#b#m211000000##k，你先去那里找找#p1103000#。");
		} else if (status == 3) {
			qm.startQuest();
			qm.sendAcceptDecline("最后忘记告诉你的是，杜纳米斯最后是在#b冰峰雪域#k失去联系的，去冰峰雪域应该就能找到他……");
			qm.dispose();
		}
	}
}