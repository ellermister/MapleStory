/*
 By 梓条
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
		var Editing = false //true=显示;false=开始活动
          if(Editing){
          cm.sendOk("暂停运作");
          cm.dispose();
          return;
        } 
			cm.sendSimple("#k欢迎玩家 #r#h ##k,在我这里可以补领冒险之心.." +
            "#k\r\n#L101##k#v1122029# 战士之心. 需要 #v4032177#x1.\r\n#L102##k#v1122030# 法师之心. 需要 #v4032177#x1.\r\n#L103##k#v1122031# 弓箭之心. 需要 #v4032177#x1.\r\n#L104##k#v1122032# 飞侠之心. 需要 #v4032177#x1.\r\n\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4032177, 1)) {
                    cm.gainItem(4032177, -1);
                    cm.gainItem(1122029, 1);
                    //cm.gainItem(2000005, 10);
                    //cm.gainItem(2022109, 5);
                    //cm.gainItem(4001126, 50);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功补领冒险之心！");
                    cm.dispose();
                } else {
                    cm.sendOk("道具不足.");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4032177, 1) ) {
                    cm.gainItem(4032177, -1);
                    cm.gainItem(1122030, 1);
                    //cm.gainItem(2000005, 100);
                    //cm.gainItem(2022109, 50);
                    //cm.gainItem(4001126, 500);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功补领冒险之心！");
                    cm.dispose();
                } else {
                    cm.sendOk("道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(4032177, 1) ) {
                    cm.gainItem(4032177, -1);
                    cm.gainItem(1122031,1);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功补领冒险之心！");
                    cm.dispose();
                } else {
                    cm.sendOk("道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(4032177, 1) ) {
                    cm.gainItem(4032177, -1);
                    cm.gainItem(1122032, 1);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功补领冒险之心！");
                    cm.dispose();
                } else {
                    cm.sendOk("道具不足..");
                    cm.dispose();
				}
			 }else if (selection == 105) {
                if (cm.haveItem(2022034, 30) ) {
                    cm.gainItem(2022034, -30);
                    cm.gainItem(2040917, 1);
					cm.gainItem(4031456,30)
                    cm.sendOk("获得#i2040917#x1#i4031456#x30");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i2022034#,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 106) {
                if (cm.haveItem(2022034, 100) ) {
                    cm.gainItem(2022034, -100);
                    cm.gainItem(1142005, 1);
					cm.gainItem(4031456,100)
                    cm.sendOk("获得#i1142005#x1#i4031456#x100");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i2022034#,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 107) {
                if (cm.haveItem(4032226, 1) ) {
                    cm.gainItem(4032226, -1);
                    cm.gainItem(2022488, 1);
                    cm.sendOk("获得#i2022488#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 108) {
                if (cm.haveItem(4032226, 20) ) {
                    cm.gainItem(4032226, -20);
                    cm.gainItem(2022489, 1);
                    cm.sendOk("获得#i2022489#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请在次确认");
                    cm.dispose();
				}
			 }else if (selection == 109) {
                if (cm.haveItem(4032226, 20) ) {
                    cm.gainItem(4032226, -20);
                    cm.gainItem(2022490, 1);
                    cm.sendOk("获得#i2022490#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请在次确认");
                    cm.dispose();
				}
			 }
        }
    }
}

	