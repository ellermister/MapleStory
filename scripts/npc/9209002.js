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
			cm.sendSimple("#b欢迎世纪玩家 #r#h ##k ！这里是「副本奖励」兑换处！\r\n\r\n挑战副本获得战利品，可兑换下列所有奖励！\r\n#r特别提示:兑换前请确认背包格子,避免溢出！" +
            "#k\r\n#L101##b#v1112426#四维+5.HP/MP+888.攻/魔+5（10天权）.\r\n#r兑换需要:#k#v4310099#x30.#v4000017#x10.#v4000021#x10.金币50万.\r\n\r\n#L102##b#v1112585#四维+6.HP/MP+1000.攻/魔+6（10天权）.\r\n#r兑换需要:#k#v4002000#x30.#v4021001#x5.#v4011004#x5.金币500万.\r\n\r\n#L103##b#v1112915#四维+3.HP/MP+500.攻/魔+3(永久使用).\r\n#r兑换需要:#k#v4002001#x30.#v4021002#x10.#v4011004#x10.金币1千万.\r\n\r\n#L104##b#v1082232#四维+3.HP/MP+500.攻/魔+3(永久使用).\r\n#r兑换需要:#k#v4002002#x20.#v4021004#x15.#v4011006#x15.金币1千万.\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4310099, 30) & cm.haveItem(4000017, 10) & cm.haveItem(4000021, 10) && cm.getMeso() > 500000) {
                    cm.gainItem(4310099, -30);
                    cm.gainItem(4000017, -10);
                    cm.gainItem(4000021, -10);
		            cm.gainMeso(-500000);
				    cm.gainItem(1112426,5,5,5,5,888,888,5,5,0,0,0,0,0,0,240);//蒲公英戒指 月妙
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功兑换月妙副本奖励「蒲公英戒指10天权」！！！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4002000, 30) & cm.haveItem(4021001, 5) & cm.haveItem(4011004, 5) && cm.getMeso() > 5000000) {
                    cm.gainItem(4002000, -30);
                    cm.gainItem(4021001, -5);
                    cm.gainItem(4011004, -5);
		            cm.gainMeso(-5000000);
			        cm.gainItem(1112585,6,6,6,6,1000,1000,6,6,0,0,0,0,0,0,240);//废弃天使
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功兑换废弃副本奖励「天使祝福戒指10天权」！！！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(4002001, 30) & cm.haveItem(4021002, 10) & cm.haveItem(4011004, 10) && cm.getMeso() > 10000000) {
                    cm.gainItem(4002001, -30);
                    cm.gainItem(4021002, -10);
                    cm.gainItem(4011004, -10);
		            cm.gainMeso(-10000000);
				    cm.gainItem(1112915,3,3,3,3,500,500,3,3,0,0,0,0,0,0);//玩具蓝调
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功兑换玩具副本奖励「蓝调戒指」！！！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(4002002, 20) & cm.haveItem(4021004, 15) & cm.haveItem(4011006, 15) && cm.getMeso() > 10000000) {
                    cm.gainItem(4002002, -20);
                    cm.gainItem(4021004, -15);
                    cm.gainItem(4011006, -15);
		            cm.gainMeso(-10000000);
				    cm.gainItem(1082232,3,3,3,3,500,500,3,3,20,20,0,0,0,0);//女神的手镯
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功兑换天空副本奖励「女神的手镯」！！！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 105) {
                if (cm.haveItem(2022034, 30) ) {
                    cm.gainItem(2022034, -30);
                    cm.gainItem(2040917, 1);
					cm.gainItem(4031456,30)
                    cm.sendOk("获得#i2040917#x1#i4031456#x30");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]集齐美食，兑换了新年馈赠[祥龙风筝]！！");
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
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]集齐美食，兑换了新年馈赠[祥龙风筝]！！");
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
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]集齐美食，兑换了新年馈赠[祥龙风筝]！！");
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
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]集齐美食，兑换了新年馈赠[祥龙风筝]！！");
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
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]集齐美食，兑换了新年馈赠[祥龙风筝]！！");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有#i4032226#,请在次确认");
                    cm.dispose();
				}
			 }
        }
    }
}

	