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
			cm.sendSimple("#k欢迎玩家 #r#h ##k,这里是世纪赞助商城，感谢玩家们的赞助！\r\n充值比例：1元=1个#v4310150#+200点券。\r\n#r特别提示:兑换前请确认背包格子,避免溢出！\r\n10元特惠礼包内涵:#v4032226#x5.#v2000005#x20.#v2022109#x5.#v4001126#x50." +
            "#k\r\n#L101##k#v4000422#10元特惠礼包x1 价格 #v4310150#x10.\r\n\r\n#L102##k#v4000422#10元特惠礼包x10 价格 #v4310150#x100.\r\n\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4310150, 10)) {
                    cm.gainItem(4310150, -10);
                    cm.gainItem(4032226, 5);
                    cm.gainItem(2000005, 10);
                    cm.gainItem(2022109, 5);
                    cm.gainItem(4001126, 50);
                    cm.sendOk("成功购买礼包！感谢赞助！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功购买10元特惠礼包，感谢您对世纪冒险岛的赞助！！");
                    cm.dispose();
                } else {
                    cm.sendOk("商品纪念币不足，请联系GM购买！");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4310150, 100) ) {
                    cm.gainItem(4310150, -100);
                    cm.gainItem(4032226, 50);
                    cm.gainItem(2000005, 100);
                    cm.gainItem(2022109, 50);
                    cm.gainItem(4001126, 500);
                    cm.sendOk("成功购买礼包！感谢赞助！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功购买10元特惠礼包x10，感谢您对世纪冒险岛的赞助！！");
                    cm.dispose();
                } else {
                    cm.sendOk("商品纪念币不足，请联系GM购买！");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(4310110, 188) ) {
                    cm.gainItem(4310110, -188);
                    cm.gainItem(1132041,8,8,8,8,888,888,1,1,0,0,0,0,0,0);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的#v4310110#,请在次确认.");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(4310110, 3) ) {
                    cm.gainItem(4310110, -3);
                    cm.gainItem(5121020, 6);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的#v4031636#,请在次确认.");
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

	