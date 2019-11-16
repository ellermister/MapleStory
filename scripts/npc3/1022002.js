var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.sendOk("看来你是个懂的珍惜生命的人。别再来烦我，快走吧。");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("什么？你想挑战蝙蝠怪的封印？像你这样的小毛孩去挑战的话，很可能会丢掉性命……不过和我倒是没什么关系。一共需要#b10000金币#k的手续费，你应该有吧？");
		} else if (status == 1) {
			if (cm.getLevel() >= 50) {
				if (cm.getMeso() < 10000) {
					cm.sendOk("这点钱都没有？你是一个奇怪的人！快走开。");
					cm.dispose();
				} else {
					cm.sendNext("好，你可别怨我。到了之后，你去找我的徒弟#b无影#k，就可以参加远征队。");
				}
			} else {
				cm.sendOk("没达到50级的小毛孩连去那里的资格都没有。快走开。");
				cm.dispose();
			}
		} else if (status == 2) {
			cm.gainMeso(-10000);
			cm.warp(105100100);
			cm.dispose();
		}
	}
}