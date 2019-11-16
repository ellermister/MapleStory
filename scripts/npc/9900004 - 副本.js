/*
 礼包
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
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
		var Editing = false //true=显示;false=开启兑换
          if(Editing){
          cm.sendOk("兑换暂未开启");
          cm.dispose();
          return;
        } 
			cm.sendSimple("#b#r#h ##k ,欢迎来到礼包兑换中心！#b兑换前请确认背包格子,否则后果自负！！" +
            "#k\r\n#L101##r礼包一\r\n#L102##r礼包二\r\n#L103##r礼包三\r\n#L104##r礼包四\r\n#L105##r礼包五\r\n#L106##r礼包六");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4000423, 1) ) {//判断角色是否有物品
                    cm.gainItem(1032061,100,100,100,100,150,150,1,1,80,80,50,50,20,20);//物品代码,力量,敏捷,智力,运气,HP,MP,攻击力,魔法力,防御力,命中率,回避率,移动速度,跳跃力
                    cm.gainItem(1032061,1,10);//物品代码,力量,敏捷,智力,运气,HP,MP,攻击力,魔法力,防御力,命中率,回避率,移动速度,跳跃力
					cm.gainItem(4000423,-1)
                    cm.sendOk("兑换成功");//兑换成功道具提醒 自己改代码
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的物品请在次确认足够的物品请在次确认");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4000423, 3) ) {
                    cm.gainItem(4000423, -3);
                    cm.gainItem(5121009, 1);
					cm.gainItem(4031456, 3);
                    cm.sendOk("兑换成功");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的物品请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(4000423, 15) ) {
                    cm.gainItem(4000423, -15);
                    cm.gainItem(2040914, 1);
					cm.gainItem(4031456, 15);
                    cm.sendOk("兑换成功");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的物品,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(4000423, 20) ) {
                    cm.gainItem(4000423, -20);
                    cm.gainItem(2049104, 1);
					cm.gainItem(4031456,20)
                    cm.sendOk("兑换成功#i2049104#x1#i4031456#x20");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的物品,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 105) {
                if (cm.haveItem(4000423, 30) ) {
                    cm.gainItem(4000423, -30);
                    cm.gainItem(2040917, 1);
					cm.gainItem(4031456,30)
                    cm.sendOk("兑换成功");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的物品,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 106) {
                if (cm.haveItem(4000423, 100) ) {
                    cm.gainItem(4000423, -100);
                    cm.gainItem(1142005, 1);
					cm.gainItem(4031456,100)
                    cm.sendOk("兑换成功");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的物品,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 107) {
                if (cm.haveItem(4032226, 1) ) {
                    cm.gainItem(4032226, -1);
                    cm.gainItem(2022488, 1);
                    cm.sendOk("兑换成功");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的物品,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 108) {
                if (cm.haveItem(4032226, 20) ) {
                    cm.gainItem(4032226, -20);
                    cm.gainItem(2022489, 1);
                    cm.sendOk("兑换成功");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的物品,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 109) {
                if (cm.haveItem(4032226, 20) ) {
                    cm.gainItem(4032226, -20);
                    cm.gainItem(2022490, 1);
                    cm.sendOk("兑换成功");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的物品,请在次确认");
                    cm.dispose();
				}
			 }
        }
    }
}

	