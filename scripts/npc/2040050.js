/*
Vr001 封测版 ONLINE
<159502199@qq.com>
<QQ:100807851>
*/

var status = 0;
var menu = "";
var set;
var makeitem;
var access = true;
var reqitem = new Array();
var cost = 4000;
var makeditem = new Array(4006000,4006001);
var reqset = new Array([[[4000046,20],[4000027,20],[4021001,1]],
						[[4000025,20],[4000049,20],[4021006,1]],
						[[4000129,15],[4000130,15],[4021002,1]],
						[[4000074,15],[4000057,15],[4021005,1]],
						[[4000054,7],[4000053,7],[4021003,1]]],
						
						[[[4000046,20],[4000027,20],[4011001,1]],
						[[4000014,20],[4000049,20],[4011003,1]],
						[[4000132,15],[4000128,15],[4011005,1]],
						[[4000074,15],[4000069,15],[4011002,1]],
						[[4000080,7],[4000079,7],[4011004,1]]]);

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1 || (mode == 0 && (status ==1 || status == 2))) {
		cm.dispose();
		return;
	}
	if(mode == 0) {
		cm.sendNext("没有足够的材料?那就别烦我!狩猎去!");
		cm.dispose();
	}
	if(mode == 1) {
		status++;
	}
	if(status == 0) {
		cm.sendNext("Alright, 混和青蛙的舌用松鼠的牙齿和。。。 表示惊讶是的! 忘记提出那闪闪发光的白色粉!! 男人, 那可能真的坏。。。 哇!! 多久有你在那里站立? 我 maaaay 有稍微被运的离开以我的工作。。。 hehe。");
	} else if(status == 1) {
		cm.sendSimple("我是流浪的炼金术士..你想要我帮你做什么呢?\r\n\r\n#L0##b制作魔法石#k#l\r\n#L1##b制作召唤石#k#l");
	} else if(status == 2) {
		set = selection;
		makeitem = makeditem[set];
		for(i=0; i < reqset[set].length; i++) {
			menu += "\r\n#L"+i+"##b用 #t"+reqset[set][i][0][0]+"# 和 #t"+reqset[set][i][1][0]+"##k#l";
		}
		cm.sendSimple("哈哈. #b#t"+makeitem+"##k 多少我都能制作.只要你有足够的材料,魔法石可以用于高级的技术魔法之类的... 有 5个方法制造 #t"+makeitem+"#. 哪一个方法做你想要做到?"+menu);
	} else if(status == 3) {
		set = reqset[set][selection];
		reqitem[0] = new Array(set[0][0],set[0][1]);
		reqitem[1] = new Array(set[1][0],set[1][1]);
		reqitem[2] = new Array(set[2][0],set[2][1]);
		menu = "";
		for(i=0; i < reqitem.length; i++) {
			menu += "\r\n#v"+reqitem[i][0]+"# #b"+reqitem[i][1]+" #t"+reqitem[i][0]+"##k";
		}
		menu += "\r\n#i4031138# #b"+cost+" 冒险币#k";
		cm.sendYesNo("制作 #b5 个 #t"+makeitem+"##k, 你需要准备以下材料:\r\n"+menu);
	} else if(status == 4) {
		for(i=0; i < reqitem.length; i++) {
			if(!cm.haveItem(reqitem[i][0],reqitem[i][1]))
				access = false;
		}
		if(access == false || !cm.canHold(makeitem) || cm.getMeso() < cost) {
			cm.sendNext("看样子你的材料好像不够呀..");
		} else {
			cm.sendOk("在这里，拿 5 块 #b#t"+makeitem+"##k. 甚至我必须承认, 这是一杰作。 好的, 如果你需要我的帮忙未来的某一天, 必定来向后地和谈话对我!");
			cm.gainItem(reqitem[0][0],-reqitem[0][1]);
			cm.gainItem(reqitem[1][0],-reqitem[1][1]);
			cm.gainItem(reqitem[2][0],-reqitem[2][1]);
			cm.gainMeso(-cost);
			cm.gainItem(makeitem,5);
		}
		cm.dispose();
	}
}
