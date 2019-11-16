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
			cm.sendSimple("#b欢迎玩家 #r#h ##k,世纪冒险岛祝您新年快乐！万事大吉！\r\n\r\n#v4032593##v4032593##v4032593#福禄寿春卷拼盘制作#v4032593##v4032593##v4032593#\r\n#v4310110#用[春节纪念币]可购买材料，不收手工费哦！\r\n#b※[春卷]为固有道具(可交易)，包里只能存1个多换会消失.材料可叠加.\r\n#r温馨提示:兑换前请确认背包格子,千万不要溢出拿不到哦！" +
            "#k\r\n#L101##r#i4032582##bx66#i4032583##bx66#i4032584##bx66#r换#b#v4032593#福禄寿春卷拼盘x1.\r\n\r\n#L102##r春节币#i4310110##bx30#r换#b#i4032582#益寿春卷皮x11.\r\n\r\n#L103##r春节币#i4310110##bx30#r换#b#i4032583#福气肉馅x11.\r\n\r\n#L104##r春节币#i4310110##bx30#r换#b#i4032584#财运豆油x11.\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4032583, 66) & cm.haveItem(4032584, 66) & cm.haveItem(4032582, 66)) {
                    cm.gainItem(4032583, -66);
                    cm.gainItem(4032584, -66);
                    cm.gainItem(4032582, -66);
                    cm.gainItem(4032593, 1);
					//cm.gainItem(1002851,10,10,10,10,300,300,3,3,50,50,5,5,0,0)
                    cm.sendOk("获得#v4032593#福禄寿春卷拼盘.新年快乐哦！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]制作了[福禄寿春卷拼盘]新年福禄寿星高高照！世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4310110, 30) ) {
                    cm.gainItem(4310110, -30);
                    cm.gainItem(4032582,11);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]制作了[益寿春卷皮]延年益寿！世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(4310110, 30) ) {
                    cm.gainItem(4310110, -30);
                    cm.gainItem(4032583, 11);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]制作了[福气肉馅]福气满满！世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(4310110, 30) ) {
                    cm.gainItem(4310110, -30);
                    cm.gainItem(4032584, 11);
                    cm.sendOk("兑换成功.");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]制作了[财运豆油]财运亨通！世纪冒险岛祝全体玩家新年快乐！");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足哦~加油获取道具再兑换吧！新年快乐！");
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

	