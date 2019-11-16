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
			cm.sendSimple("#b欢迎玩家 #r#h ##k,世纪冒险岛祝您步步高升！万事大吉！\r\n\r\n你还没有#v4310110#吧.嗯……有付出就有回报，你帮我搜集新年需要的材料我付给你[春节纪念币].\r\n#r温馨提示:兑换前请确认背包格子,千万不要溢出拿不到哦！\r\n" +
            "#k\r\n#L101##r#i4000189##bx200#r换#b春节#i4310110##bx10#L102##r#i4000190##bx200#r换#b春节#i4310110#x10\r\n\r\n#L103##r#i4000191##bx200#r换#b春节#i4310110##bx10#L104##r#i4000192##bx200#r换#b春节#i4310110##bx10\r\n\r\n#L105##r#i4000193##bx200#r换#b春节#i4310110##bx10.\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4000189, 200)) {
                    cm.gainItem(4000189, -200);
                    cm.gainItem(4310110,10);
					//cm.gainItem(1002851,10,10,10,10,300,300,3,3,50,50,5,5,0,0)
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]赚取了[春节纪念币]世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4000190, 200) ) {
                    cm.gainItem(4000190, -200);
                    cm.gainItem(4310110,10);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]赚取了[春节纪念币]世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(4000191, 200) ) {
                    cm.gainItem(4000191, -200);
                    cm.gainItem(4310110,10);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]赚取了[春节纪念币]世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(4000192, 200) ) {
                    cm.gainItem(4000192, -200);
                    cm.gainItem(4310110,10);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]赚取了[春节纪念币]世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
                    cm.dispose();
				}
			 }else if (selection == 105) {
                if (cm.haveItem(4000193, 200) ) {
                    cm.gainItem(4000193, -200);
					cm.gainItem(4310110,10)
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]赚取了[春节纪念币]世纪冒险岛祝全体玩家新年快乐！");
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

	