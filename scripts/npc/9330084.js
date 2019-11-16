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
			cm.sendOk("解梦功能暂不开放~");
			cm.dispose();
			return;
		}
	}
}	
