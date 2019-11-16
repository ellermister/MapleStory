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
			cm.sendSimple("#b欢迎玩家 #r#h ##k ,世纪冒险岛祝您大年快乐！#v4310110#换好礼！上海豫园NPC处均可获取！\r\n#r特别提示:兑换前请确认背包格子,溢出！" +
            "#k\r\n#L101##r#i4032592##b#i4032593##b#i4032594##b#r换#b#v1102248#四维+8.HP/MP+1888.攻/魔+8.\r\n\r\n#L102##r春节币#i4310110##bx188#r换#b#i1002851#四维+10.HP/MP+300.攻/魔+3.\r\n\r\n#L103##r春节币#i4310110##bx188#r换#b#i1132041#四维+8.HP/MP+888.攻/魔+1.\r\n\r\n#L104##r春节币#i4310110##bx3#r换#b#i5121020#x6.喜洋洋BUFF.攻/魔.15分钟\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4032592, 1) & cm.haveItem(4032593, 1) & cm.haveItem(4032594, 1)) {
                    cm.gainItem(4032592, -1);
                    cm.gainItem(4032593, -1);
                    cm.gainItem(4032594, -1);
					cm.gainItem(1102248,8,8,8,8,1888,1888,8,8,88,88,0,0,0,0)
                    cm.sendOk("获得#v1102248#祥龙风筝.新年快乐！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]集齐美食，兑换了新年馈赠[祥龙风筝]！！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]凤鸣春日晓，龙起海天高。");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]祝全体世纪冒险岛玩家，新年大吉，大展宏图！龙凤呈祥！");
                    cm.dispose();
                } else {
                    cm.sendOk("您还没有凑齐全部美食.");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4310110, 188) ) {
                    cm.gainItem(4310110, -188);
                    cm.gainItem(1002851,10,10,10,10,300,300,3,3,50,50,5,5,0,0);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的#v4310110#,请在次确认.");
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

	