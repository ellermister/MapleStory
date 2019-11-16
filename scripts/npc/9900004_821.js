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
            cm.sendOk("如果要强化。请吧物品放在背包第一格!");
            cm.dispose();
            return;
        }
		if (cm.getPlayer().getCSPoints(1) < 10000) {
            cm.sendOk("每次强化需要消耗一个#b10000#k点卷,您目前点卷余额为:#b"+cm.getPlayer().getCSPoints(1)+"");
            cm.dispose();
            return;
        }
		力量 =cm.getInventory(1).getItem(1).getStr();
		敏捷 = cm.getInventory(1).getItem(1).getDex();
		运气 = cm.getInventory(1).getItem(1).getLuk();
		智力 = cm.getInventory(1).getItem(1).getInt();
		攻击 = cm.getInventory(1).getItem(1).getWatk();
		魔法 = cm.getInventory(1).getItem(1).getMatk();
		s1 = Math.floor(Math.random() * (20 - 5) + 5);
		s2 =  Math.floor(Math.random() * (20 - 5) + 5);
		s3 =  Math.floor(Math.random() * (20 - 5) + 5);
		s4 =  Math.floor(Math.random() * (20 - 5) + 5);
		s5 =  Math.floor(Math.random() * (20 - 5) + 5);
		s6 =  Math.floor(Math.random() * (20 - 5) + 5);
		var Id = cm.getInventory(1).getItem(1).getItemId();
        var selStr = "您好欢迎来到#r强化中心#k\r\n\r\n#b";
            selStr += "您要强化的物品是 #v"+Id+"##t"+Id+"# \r\n";
			selStr +="目前力量:"+cm.getInventory(1).getItem(1).getStr()+"\r\n";
			selStr +="目前敏捷:"+cm.getInventory(1).getItem(1).getDex()+"\r\n";
			selStr +="目前智力:"+cm.getInventory(1).getItem(1).getInt()+"\r\n";
			selStr +="目前运气:"+cm.getInventory(1).getItem(1).getLuk()+"\r\n";
			selStr +="目前物理攻击:"+cm.getInventory(1).getItem(1).getWatk()+"\r\n";
			selStr +="目前魔法攻击:"+cm.getInventory(1).getItem(1).getMatk()+"\r\n";
			selStr +="#e强化后属性会随机增加#b5-20#k.强化需要消耗#r10000#k点券 。是否强化？";
        cm.sendYesNo(selStr);
    } else if (status == 1) {
		cm.gainNX(-10000);
		cm.getInventory(1).getItem(1).setStr(力量+s1);
		cm.getInventory(1).getItem(1).setDex(敏捷+s2);
		cm.getInventory(1).getItem(1).setInt(智力+s3);
		cm.getInventory(1).getItem(1).setLuk(运气+s4);
		cm.getInventory(1).getItem(1).setWatk(攻击+s5);
		cm.getInventory(1).getItem(1).setWatk(魔法+s6);
		cm.刷新状态();
		cm.喇叭(2,"恭喜[" + cm.getPlayer().getName() + "]在强化中心消耗10000点券增加了5-20随机属性！"); 
        cm.dispose();
    }
}