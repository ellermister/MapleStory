/* Author: Xterminator
	NPC Name: 		瑞恩
	Map(s): 		Maple Road : 彩虹村 (1010000)
	Description: 		Talks about Amherst
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
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("我可以传送你去神木村.");
		} else if (status == 1) {
			cm.sendNextPrev("想去吗？");
		} else if (status == 2) {
			cm.sendPrev("点下一项开始进入！如果不去请点结束对话！");
		} else if (status == 3) {			
			cm.warp(240000000,0);
			cm.dispose();
		}
	}
}