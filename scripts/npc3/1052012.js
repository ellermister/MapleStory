/*
 《Vr001 封测版 ONLINE》
   ***********
   *废弃 都市*
   ***********
马龙 - 网吧管理员
*/

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
		cm.sendNext("你一定很忙吧？如果你在#b主题网吧#k上网，你或许可以试着享受一下#b网吧专用功能#k呢！");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("嘿！你是在#b冒险岛主题网吧#k吗？\r\n#b主题网吧可以享受VIP功能呢！#k但是只能在#r频道5#k进入，想尝试下吗？");
	} else if (status == 1) {
		cm.sendNext("这个功能目前还在属于#r完善阶段#k，所以你暂时无法体验到该项目。请见谅！");
		cm.dispose();
		}
	}
}
