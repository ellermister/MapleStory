var status;
var name;
var mapId;
var cost;
var map1;
var map2;
var map3;
var map4;
var map5;
var scost;

function start() {
	status = -1;
	action(1,0,0);
}

function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1) {
		status = 0;
		cm.sendNext("您好~！我是射手村中巴。你想不想又快捷又安全的到达其他地方去？那么请使用我们的出租车吧。它会马上将你送到你想去的地方，价格很便宜哦！");
	} else if (status == 0) {
		status = 1;
		map1 = "明珠港"; //104000000
		map2 = "勇士部落"; //102000000
		map3 = "魔法密林"; //101000000
		map4 = "废气都市"; //103000000
		map5 = "诺特勒斯号码头"; //120000000
		if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
			cm.sendSimple("新手的话价格可以#b9折#k优惠。请选择你的目的地吧。\r\n#b#L0#" + map1 + " (120 金币)#l\r\n#L1#" + map2 + " (100 金币)#l\r\n#L2#" + map3 + " (100 金币)#l\r\n#L3#" + map4 + " (80 金币)#l\r\n#L4#" + map5 + " (100 金币)#l#k");
		} else {
			cm.sendSimple("请选择你的目的地吧。按照目的地不同，车费也有所不同。\r\n#b#L0#" + map1 + " (1200 金币)#l\r\n#L1#" + map2 + " (1000 金币)#l\r\n#L2#" + map3 + " (1000 金币)#l\r\n#L3#" + map4 + " (800 金币)#l\r\n#L4#" + map5 + " (1000 金币)#l#k");
		}
	} else if (status == 1) {
		if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
			if (selection == 0) {
				scost = "120";
				mapId = 104000000;
				cost = 120;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 1) {
				scost = "100";
				mapId = 102000000;
				cost = 100;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 2) {
				scost = "100";
				mapId = 101000000;
				cost = 100;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 3) {
				scost = "80";
				mapId = 103000000;
				cost = 80;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 4) {
				scost = "100";
				mapId = 120000000;
				cost = 100;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else {
				cm.dispose();
			}
		} else {
			if (selection == 0) {
				scost = "1200";
				mapId = 104000000;
				cost = 1200;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 1) {
				scost = "1000";
				mapId = 102000000;
				cost = 1000;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 2) {
				scost = "1000";
				mapId = 101000000;
				cost = 1000;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 3) {
				scost = "800";
				mapId = 103000000;
				cost = 800;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else if (selection == 4) {
				scost = "1000";
				mapId = 120000000;
				cost = 1000;
				status = 2;
				cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + mapId + "##k吗？票价是 #b" + scost + " 金币#k。");
			} else {
				cm.dispose();
			}
		}			
	} else if (status == 2) {
		if (mode == 1) {
			if (cm.getMeso() >= cost) {
				cm.gainMeso(-cost);
				cm.warp(mapId,0);
				cm.dispose();
			} else {
				cm.sendNext("你好象没有足够的金币，这样的话，我不能为你服务。");
				cm.dispose();
			}
		} else {
			cm.sendNext("在这个村子里还有许多漂亮的景点，如果你想去其他地方，欢迎随时使用我们的出租车服务。");
			cm.dispose();
		}
	}
}