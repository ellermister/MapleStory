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
			cm.sendOk("旅行者，你好啊。最近怪物发生了一些小异常，经调查是属于#b地狱大公#k做的坏事。我们已经发现了他的巢穴……等待#b英雄一网打尽#k！这是一个#b小组的挑战项目#k。只有小组才可以挑战。。如果你想挑战这个项目。#b请让队长#k和我旁边的#b冒险岛运营员2#k对话！\r\n\r\n#e任务可获得奖励：#k\r\n#v1122010##n#b何露斯之眼#k    #e#b海量经验#k#n   #e#d大量点卷/冒险币#k\r\n\r\n#e任务目前开放的挑战模式：\r\n#b#i3994115##n 请让#r小组组长#k#b和#r冒险岛运营员2#k#b对话");
			cm.dispose();
			return;
		}
	}
}	
