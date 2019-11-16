/*
	NPC: Athena Pierce
 	Map: Black Road - Ready to Leave (914000100)
 	Description: First NPC you talk to as Aran
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
			cm.sendNext("战神你终于醒了~~你怎么就这么喜欢睡懒觉呢..\r\n我们都等你好久了！");
		} else if (status == 1) {
			cm.sendNextPrev("什么？你问我今天有什么安排？今天我们一起去金银岛旅游的！你忘记了吗？真笨啊你！\r\n既然你都准备好了，那我们就出发吧！");
		} else if (status == 2) {
			cm.sendNextPrev("#b(我还没刷牙洗脸呢.)#k\r\n我靠，战神，你不会吧！不管了！等不了你！出发吧！");
		} else if (status == 3) {
		cm.warp(140000000, 0);
			cm.dispose();
		}
	}
}