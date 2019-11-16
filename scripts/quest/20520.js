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
			qm.sendNext("恭喜你已经到达50级，对于骑士来说，你目前的状况……");
		} else if (status == 1) {
			qm.sendNextPrev("我还是直接说吧，你现在已经50级了，却还在走路。难道你不感觉到累吗？如果你厌倦了像蜗牛一样的移动速度。那么我会告诉你一些关于我们骑士的特殊骑宠。");
		} else if (status == 2) {
			qm.sendAcceptDecline("确实，50级了还在走路，是不符合骑士的品味，有一种骑士团特有的骑宠……如果你想知道的话，就去#m130000000#那里了解一下详细情况吧。");
			qm.completeQuest();
			qm.dispose();
		}
	}
}