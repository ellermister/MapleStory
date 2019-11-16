/* Author: Xterminator
	NPC Name: 		Pison
	Map(s): 		Victoria Road : Lith Harbor (104000000)
	Description: 		Florina Beach Tour Guide
*/
importPackage(net.sf.odinms.server.maps);

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		} else if (status <= 2 && mode == 0) {
			cm.sendNext("看来你在这里有些事还没有办完嘛？身心疲惫的时候到这黄金海滩休息放松一下也不错。");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("你听说过在离明珠港不远的地方有个叫#b黄金海滩#k的美丽海滩吗？只要你有#b1500金币#k或#b自由旅行卷#k，我就送你到那里去。怎么样？想不想去黄金海滩？\r\n\r\n#L0##b我想付1500金币#l\r\n#L1#我有自由旅行卷#l\r\n#L2#自由旅行卷#k是什么?#l");
		} else if (status == 1) {
			if (selection == 0) {
				cm.sendYesNo("你要付#b1500金币#k去黄金海滩吗？好~但那里也有怪物。你不要忘记准备。那我去准备出发。怎么样？你想现在去黄金海滩吗？");
			} else if (selection == 1) {
				status = 2;
				cm.sendYesNo("你有#b自由旅行卷#k吗？有那个随时可以去黄金海滩。好~但那里也有怪物。你不要忘记准备。那我去准备出发怎么样？你想现在去黄金海滩吗？");
			} else if (selection == 2) {
				status = 4;
				cm.sendNext("呼呼。。。你想知道#b自由旅行卷#k是什么？如果你有自由旅行卷，你随时可以免费去黄金海滩。这张票是很特别的，我们也一直严格管理，但几天前我去地球本部的时候弄丢了。");
			}
		} else if (status == 2) {
			if (cm.getMeso() < 1500) {
				cm.sendNext("你金币好像不够吧？多赚点钱再来吧。你可以把你穿的衣服卖掉……或者在海边打猎，怪物会掉落金币……赚钱的办法很多呀！");
				cm.dispose();
			} else {
				cm.gainMeso(-1500);
				cm.getChar().saveLocation(SavedLocationType.FLORINA);
				cm.warp(110000000, 0);
				cm.dispose();
			}
		} else if (status == 3) {
			if (cm.haveItem(4031134)) {
				cm.getChar().saveLocation(SavedLocationType.FLORINA);
				cm.warp(110000000, 0);
				cm.dispose();
			} else {
				cm.sendNext("哼……#b自由旅行卷#k在哪里？确实有吗？你再确认吧。");
				cm.dispose();
			}
		} else if (status == 4) {
			cm.sendNext("呼呼……你想知道#b自由旅行卷#k是什么？如果你有自由旅行卷，你随时可以免费去黄金海滩。这张票是很特别的，我们也一直严格管理，但几天前我去地球本部的时候弄丢了。");
		} else if (status == 5) {
			cm.sendNextPrev("可惜我还没找回了它。希望地球本部的某人能找到它。如果你有机会去地球本部找我们那个票吧。可能对你很有用。");
		} else if (status == 6) {
			cm.dispose();
		}
	}
}