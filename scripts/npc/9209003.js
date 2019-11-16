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
			cm.sendSimple("#b欢迎世纪玩家 #r#h ##k ！这里是「狩猎勋章」升级处！\r\n\r\n狩猎怪物获得战利品，可兑换/升级勋章！\r\n#r特别提示:兑换前请确认背包格子,避免溢出！" +
            "#k\r\n#L101##b#v1142350#Lv45.四维+5.HP/MP+500.攻/魔+5.#r兑换需要:\r\n#k#v4000040##v4000176##v2012001#x20.#v4000070##v4000071##v4000072##v4000074#x200.金币200万.\r\n\r\n#L102##b#v1142351#Lv75.四维+7.HP/MP+700.攻/魔+7.#r兑换需要:\r\n#k#v1142350#x1.#v2022142##v4000257#x20.#v4000053##v4000054##v4000082#x200.金币500万.\r\n\r\n#L103##b#v1142352#Lv90.四维+9.HP/MP+900.攻/魔+9.#r兑换需要:\r\n#k#v1142351#x1.#v4001241##v4001242#x10.#v4000151#x50.#v4000273##v4000274##v4000478#x200.金币800万.\r\n\r\n#L104##b#v1142353#Lv105.四维+11.HP/MP+1100.攻/魔+11.#r兑换需要:\r\n#k#v1142353#x1.#v4000175##v4000235##v4000243#x10.#v4000432##v4000434##v4000265#x200.金币1千500万.\r\n\r\n#L105##b#v1142354#Lv120.四维+13.HP/MP+1300.攻/魔+13.#r兑换需要:\r\n#k#v1142353#x1.#v4000460##v4000461##v4000462#x10.#v4000448##v4000453##v4000458#x200.金币2千万.\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4000040, 20) & cm.haveItem(4000176, 20) & cm.haveItem(2012001, 20) & cm.haveItem(4000070, 200) & cm.haveItem(4000071, 200) & cm.haveItem(4000072, 200) & cm.haveItem(4000074, 200) && cm.getMeso() > 1500000) {
                    cm.gainItem(4000040, -20);
                    cm.gainItem(4000176, -20);
                    cm.gainItem(2012001, -20);
                    cm.gainItem(4000070, -200);
                    cm.gainItem(4000071, -200);
                    cm.gainItem(4000072, -200);
                    cm.gainItem(4000074, -200);
		            cm.gainMeso(-2000000);
				    cm.gainItem(1142350,5,5,5,5,500,500,5,5,0,0,0,0,0,0);//勋章
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功兑换「见习十字猎人勋章 I」！！！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(1142350, 1) & cm.haveItem(2022142, 20) & cm.haveItem(4000257, 20) & cm.haveItem(4000082, 200) & cm.haveItem(4000053, 200) & cm.haveItem(4000054, 200) && cm.getMeso() > 3000000) {
                    cm.gainItem(1142350, -1);
                    cm.gainItem(2022142, -20);
                    cm.gainItem(4000257, -20);
                    cm.gainItem(4000082, -200);
                    cm.gainItem(4000053, -200);
                    cm.gainItem(4000054, -200);
		            cm.gainMeso(-5000000);
				    cm.gainItem(1142351,7,7,7,7,700,700,7,7,0,0,0,0,0,0);//勋章
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功兑换「见习十字猎人勋章 II」！！！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(1142351, 1) & cm.haveItem(4000151, 50) & cm.haveItem(4001241, 10) & cm.haveItem(4001242, 10) & cm.haveItem(4000273, 200) & cm.haveItem(4000274, 200) & cm.haveItem(4000478, 200) && cm.getMeso() > 8000000) {
                    cm.gainItem(1142351, -1);
                    cm.gainItem(4001241, -10);//暴力熊足
                    cm.gainItem(4001242, -10);//心疤狮王足
                    cm.gainItem(4000151, -50);//时间门神袖章
                    cm.gainItem(4000273, -200);//陈年老骨头
                    cm.gainItem(4000274, -200);//断裂的角
                    cm.gainItem(4000478, -200);//木制马尾
		            cm.gainMeso(-8000000);
				    cm.gainItem(1142352,9,9,9,9,900,900,9,9,0,0,0,0,0,0);//勋章
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功兑换「正式十字猎人勋章」！！！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(1142352, 1) & cm.haveItem(4000175, 10) & cm.haveItem(4000235, 10) & cm.haveItem(4000243, 10) & cm.haveItem(4000432, 200) & cm.haveItem(4000434, 200) & cm.haveItem(4000265, 200) && cm.getMeso() > 15000000) {
                    cm.gainItem(1142352, -1);
                    cm.gainItem(4000175, -10);
                    cm.gainItem(4000235, -10);
                    cm.gainItem(4000243, -10);
                    cm.gainItem(4000432, -200);
                    cm.gainItem(4000434, -200);
                    cm.gainItem(4000265, -200);
		            cm.gainMeso(-15000000);
				    cm.gainItem(1142353,11,11,11,11,1100,1100,11,11,0,0,0,0,0,0);//勋章
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功兑换「专业十字猎人勋章」！！！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 105) {
                if (cm.haveItem(1142353, 1) & cm.haveItem(4000460, 10) & cm.haveItem(4000461, 10) & cm.haveItem(4000462, 10) & cm.haveItem(4000448, 200) & cm.haveItem(4000453, 200) & cm.haveItem(4000458, 200) && cm.getMeso() > 20000000) {
                    cm.gainItem(1142353, -1);
                    cm.gainItem(4000460, -10);//古代头盔
                    cm.gainItem(4000461, -10);//骑士面具
                    cm.gainItem(4000462, -10);//守护之角
                    cm.gainItem(4000448, -200);//绿色心脏
                    cm.gainItem(4000453, -200);//蓝色心脏
                    cm.gainItem(4000458, -200);//红色心脏
		            cm.gainMeso(-20000000);
				    cm.gainItem(1142354,13,13,13,13,1300,1300,13,13,0,0,0,0,0,0);//勋章
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功兑换「大师十字猎人勋章」！！！");
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

	