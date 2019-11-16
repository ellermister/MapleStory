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
    if (status == 0) {
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
		if (!cm.getPlayer().getCSPoints(1) >= 15000) {
            cm.sendOk("每次强化需要消耗一个#b15000#k点卷,您目前点卷余额为:#b"+cm.getPlayer().getCSPoints(1)+"");
            cm.dispose();
            return;
        }
		var Id = cm.getInventory(1).getItem(1).getItemId();
        var selStr = "您好欢迎来到#r强化中心#k\r\n\r\n#b";
            selStr += "您要强化的物品是 #v"+Id+"##t"+Id+"# \r\n当前已强化次数:#r"+cm.getInventory(1).getItem(1).getLevel()+"#b 可强化次数为:#r"+cm.getInventory(1).getItem(1).getUpgradeSlots()+"#b\r\n每次强化增加#r1#b次可强化次数,消耗一个#b15000#k点卷.\r\n您目前点卷余额为:#b"+cm.getPlayer().getCSPoints(1)+"\r\n#r                                      你确定要强化吗？";
        cm.sendYesNo(selStr);
    } else if (status == 1) {
		cm.getChar().modifyCSPoints(1,-15000);
        cm.getInventory(1).getItem(1).setUpgradeSlots(cm.getInventory(1).getItem(1).getUpgradeSlots()+1);
		cm.刷新状态();
		cm.喇叭(2,"恭喜[" + cm.getPlayer().getName() + "]在强化中心中消耗15000点卷升级了一次可强化次数！"); 
        cm.dispose();
    }
}