var status = 0;
var job;

importPackage(net.sf.odinms.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if ((mode == 0 && status == 2) || (mode == 0 && status == 13)) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("从我这里可以免费传送出去.但是将减少一次进来的机会哦!");
		} else if (status == 1) {
			cm.sendYesNo("怎么样？你想出去吗？");
		} else if (status == 2) {
			cm.warp(551030100); 
			cm.dispose();
		}
	}
}	
