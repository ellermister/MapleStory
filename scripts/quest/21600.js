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
			qm.sendNext("已经50级了啊。很快嘛。但是走起路来是不是就感觉慢很多了呢？站神的骑宠狼神原来是战神专用的坐骑。");
		} else if (status == 1) {
			qm.sendAcceptDecline("如果你想要回曾经离开的狼神。那么得先帮个忙。这样吧，你先去找#b纳努科#k吧。他会告诉你怎么做的。怎么样？愿意去吗？");
		} else if (status == 2) {
			qm.startQuest();
			qm.sendNext("好的。那么就要麻烦你跑一趟了。关于一些事情他会详细告诉你。");
		} else if (status == 3) {
			qm.dispose();
		}
	}
}