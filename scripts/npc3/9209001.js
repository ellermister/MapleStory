//周末集市欢迎人员
//CherryMS LoveMXD

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("你好，我是周末集市欢迎人员。");
		} else if (status == 1) {
			cm.sendNextPrev("周末集市里面会贩卖很多东西，而这些东西价格会一星期改动一次。");
		} else if (status == 2) {
			cm.sendNextPrev("你们可以按照这些趋势来选择购买哪种物品。");
		} else if (status == 3) {
			cm.sendNextPrev("购买来的物品可以到#p9209000#处出售您在集市里买到的物品。");
		} else if (status == 4) {
			cm.sendNextPrev("您的利益就是从里面的差价，如果有什么问题，可以到官网论坛咨询。");

		}
	}
}	
