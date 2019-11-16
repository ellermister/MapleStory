var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
			cm.sendOk("感谢使用~!");
            cm.dispose();
        }
        status--;
    }
    //if (status == 0) {
        if (cm.getInventory(1).getItem(1) == null) {
            cm.sendOk("装备栏第一格必须有物品才行哦~!");
            cm.dispose();
            return;
        }
		if (cm.getInventory(1).getItem(1).getLevel() >= 120) {
            cm.sendOk("强化的装备等级不能大于#r120#k级哦~!\r\n当前#v"+Id+"##t"+Id+"# #b 已强化次数:#r"+cm.getInventory(1).getItem(1).getLevel()+"");
            cm.dispose();
            return;
        }
		if (cm.getInventory(1).getItem(1).getUpgradeSlots() >= 5) {
			var Id = cm.getInventory(1).getItem(1).getItemId();
            cm.sendOk("可升级次数不能超过#r 5 #k次哦~!\r\n当前#v"+Id+"##t"+Id+"# #b 可强化次数为:#r"+cm.getInventory(1).getItem(1).getUpgradeSlots()+"");
            cm.dispose();
            return;
        }
		if (!cm.haveItem(4001083,1)) {
            cm.sendOk("材料强化系统使用需要以下材料:\r\n#v4001083##t4001083# x 1\r\n#v4001322##t4001322# x 3\r\n#v4001126##t4001126# x 200\r\n冒险币 = 10000000");
            cm.dispose();
            return;
        }
		if (!cm.haveItem(4001322,3)) {
            cm.sendOk("材料强化系统使用需要以下材料:\r\n#v4001083##t4001083# x 1\r\n#v4001322##t4001322# x 3\r\n#v4001126##t4001126# x 200\r\n冒险币 = 10000000");
            cm.dispose();
            return;
        }
		if (!cm.haveItem(4001126,200)) {
            cm.sendOk("材料强化系统使用需要以下材料:\r\n#v4001083##t4001083# x 1\r\n#v4001322##t4001322# x 3\r\n#v4001126##t4001126# x 200\r\n冒险币 = 10000000");
            cm.dispose();
            return;
        }
		if (!cm.getMeso() >= 10000000) {
            cm.sendOk("材料强化系统使用需要以下材料:\r\n#v4001083##t4001083# x 1\r\n#v4001322##t4001322# x 3\r\n#v4001126##t4001126# x 200\r\n冒险币 = 10000000");
            cm.dispose();
            return;
        }
		var Id = cm.getInventory(1).getItem(1).getItemId();
        var selStr = "您好欢迎来到#r强化中心#k\r\n\r\n#b";
            selStr += "您要强化的物品是 #v"+Id+"##t"+Id+"# \r\n当前已强化次数:#r"+cm.getInventory(1).getItem(1).getLevel()+"#b 可强化次数为:#r"+cm.getInventory(1).getItem(1).getUpgradeSlots()+"#b\r\n材料强化系统使用需要以下材料:\r\n#v4001083# x 1   #v4001322# x 3 #v4001126# x 200 冒险币 = 10000000 是否强化？";
        cm.sendYesNo(selStr);
    } else if (status == 1) {
		cm.gainItem(4001083,-1);
		cm.gainItem(4001322,-3);
		cm.gainItem(4001126,-200);
		cm.gainMeso(-10000000);
        cm.getInventory(1).getItem(1).setUpgradeSlots(cm.getInventory(1).getItem(1).getUpgradeSlots()+1);
		cm.刷新状态();
		cm.喇叭(2,"恭喜[" + cm.getPlayer().getName() + "]在强化中心中消耗材料升级了一次可强化次数！"); 
        cm.dispose();
    }
}