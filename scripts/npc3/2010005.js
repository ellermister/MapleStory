/*
Vr001 封测版 ONLINE
Vr001 封测版 Ver079
传送后的地图ID(110000000) 黄金海岸导游(天空之城)                  
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
		if (status >= 2 && mode == 0) {
			cm.sendOk("还在犹豫吗。#b黄金海滩#k有充分的怪物。");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("你好，欢迎来到#bVr001 封测版#k。我是导游。");
		} else if (status == 1) {
			cm.sendNextPrev("我可以带你去#r黄金海滩#k。但是你需要支付#b1,500#k冒险币。")
		} else if (status == 2) {
			if (cm.getMeso() < 1500) {
				cm.sendOk("你没带够钱哦！")
				cm.dispose();
			} else {
				cm.sendYesNo("你是否愿意支付#b1,500#k冒险币去#r黄金海滩#k呢？");
			}
		} else if (status == 3) {
			cm.gainMeso(-1500);
			cm.getChar().saveLocation(SavedLocationType.FLORINA);
			cm.warp(110000000, 0);
			cm.dispose();
		}
	}
}
