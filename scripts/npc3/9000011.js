/*
	《Vr001 封测版 ONLINE》
      版权于 Vr001 封测版 服务端
  当前版本号为:Ver078 - Ver079
*/
importPackage(net.sf.odinms.client);

var status = 0;
var job;

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
			cm.sendOk("嘿！你好啊！想参与活动吗？参与需要一张#b活动门票#k才可以参与！活动可以获得很多的奖励。大量的经验值等等。。。\r\n但是目前该功能还在完善当中！");
			cm.dispose();
			return;
		}
	}
}	
