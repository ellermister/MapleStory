importPackage(net.sf.odinms.client);

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
			qm.sendNext("你好！我是枫树管理人佳佳。冒险的第5个节日，你过的愉快吗？愿意跟我一起参加5根蜡烛活动吗？");
		} else if (status == 1) {
			qm.sendNextPrev("啊～，你问我5根蜡烛是什么？就是和我一起制作蛋糕的活动。请你照看好蜡烛，不让它熄灭的时候，我会制作蛋糕，然后交给你。");
		} else if (status == 2) {
			qm.sendAcceptDecline("为了这一天...我特地向射手村的明明女士学习了制作蛋糕的方法。你只要在#b30分钟#k内保管好蜡烛，不让它熄灭就可以。我会制作好蛋糕，然后送给你一块。搜集到5块蛋糕块只后，就能拼成一整个蛋糕。怎么样？你想参加吗？");
		} else if (status == 3) {
			if (!qm.haveItem(3994086)) {
				qm.gainItem(3994086, 1);
			}
			qm.sendOk("请你把得到的蛋糕放到盒子里...啊，蛋糕盒你可以在我这里用一张枫叶交换。好的，30分钟后，我会给你一块蛋糕。");
			qm.completeQuest();
			qm.dispose();
		}
	}
}