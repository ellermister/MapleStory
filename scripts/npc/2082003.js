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
			cm.sendOk("你在这里还有其他的事情没有办完吗？");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("你想离开神木村，前往 #b时间神殿#k 吗？如果是的话，我可以带你进入通往时间神殿的路！怎么样？决定要去吗？");
		} else if (status == 1) {
			cm.sendNext("很好，那我们现在就出发吧！");
		} else if (status == 2) {
			cm.warp(200090500, 0);
			cm.dispose();
		}
	}
}