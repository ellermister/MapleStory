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
			cm.sendSimple("#b欢迎玩家 #r#h ##k,世纪冒险岛祝您步步高升！万事大吉！\r\n\r\n抽取礼包的时候拿到了红包？找我就对啦！我会给你兑换成非常好的物品的！\r\n#r温馨提示:兑换前请确认背包格子,千万不要溢出拿不到哦！\r\n" +
            "#k\r\n#L101##r#i4031549##bx1#r换#b祥龙风筝#i1102248##bx1.\r\n\r\n#L102##r#i4031548##bx1#r换#b春节币#i4310110#x888.\r\n\r\n#L103##r#i4031547##bx1#r换#b春节币#i4310110##bx588.\r\n\r\n#L104##r#i4031546##bx1#r换#b春节币#i4310110##bx188.\r\n\r\n#L105##r#v4310070# 换 世纪冒险岛新年礼包\r\n\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4031549, 1)) {
                    cm.gainItem(4031549, -1);
					//cm.gainItem(1002851,10,10,10,10,300,300,3,3,50,50,5,5,0,0)
					cm.gainItem(1102248,8,8,8,8,1888,1888,8,8,88,88,0,0,0,0)
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]用特级红包，兑换了新年馈赠[祥龙风筝]！！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]凤鸣春日晓，龙起海天高。");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]祝全体世纪冒险岛玩家，新年大吉，大展宏图！龙凤呈祥！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4031548, 1) ) {
                    cm.gainItem(4031548, -1);
                    cm.gainItem(4310110,888);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]打开了[新年大红包]获得了888个新年纪念币.世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(4031547, 1) ) {
                    cm.gainItem(4031547, -1);
                    cm.gainItem(4310110,588);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]打开了[新年中红包]获得了588个新年纪念币.世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(4031546, 1) ) {
                    cm.gainItem(4031546, -1);
                    cm.gainItem(4310110,188);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]打开了[新年小红包]获得了188个新年纪念币.世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
                    cm.dispose();
				}
			 }else if (selection == 105) {
                if (cm.haveItem(4310070, 1) ) {
                    cm.gainItem(4310070, -1);
					cm.gainItem(3010789,1)//椅子
					cm.gainItem(2022070,10)//祝福
					cm.gainItem(4310110,188)//春节币188
					cm.gainItem(4032226,8)//黄金猪猪
					cm.gainItem(1003965,1)//帽子
					cm.gainItem(1052661,1)//
                cm.gainNX(8888);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]领取了[世纪冒险岛新年礼包]世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
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

	