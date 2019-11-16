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
		cm.sendNext("看来你真的被美丽的外滩风景所吸引了。");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("怎么样？上海外滩风光确实不错吧，如果你有 #b2000 金币#k. 我就可以带你回 #b勇士部落#k 怎么样？要回去吗？");
	} else if (status == 1) {
		if (cm.getMeso() < 2000) {
			cm.sendNext("你确定你有 #b2000 金币#k？ 如果没有，我可不能免费送你去。");
			cm.dispose();
		} else {
			cm.gainMeso(-2000);
			cm.warp(102000000);
			cm.dispose();
			}		
		}
	}
}