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
			cm.sendSimple("#b欢迎玩家 #r#h ##k ,世纪冒险岛祝您小年快乐！福袋换好礼！福袋右边三情法师获得哦！\r\n#r特别提示:兑换前请确认背包格子,溢出后果自负！" +
            "#k\r\n#L101##r福袋#i3993001##bx66#r换#b#v1002851#四维+10.HP/MP+300.攻/魔+3.\r\n\r\n#L102##r福袋#i3993001##bx5#r换#b#i5390003#【新年庆祝喇叭1】x50.\r\n\r\n#L103##r福袋#i3993001##bx5#r换#b#i5390004#【新年庆祝喇叭2】x50.\r\n\r\n#L104##r福袋#i3993001##bx66#r换#b#i1132041#四维+5.HP/MP+888.攻/魔+1.\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(3993001, 66) ) {
                    cm.gainItem(3993001, -66);
					cm.gainItem(1002851,10,10,10,10,300,300,3,3,50,50,5,5,0,0)
                    cm.sendOk("获得#v1002851#金鸡帽.小年快乐哦！");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的#v3993001#,请在次确认.");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(3993001, 5) ) {
                    cm.gainItem(3993001, -5);
                    cm.gainItem(5390003,50);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的#v3993001#,请在次确认.");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(3993001, 5) ) {
                    cm.gainItem(3993001, -5);
                    cm.gainItem(5390004, 50);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的#v3993001#,请在次确认.");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(3993001, 66) ) {
                    cm.gainItem(3993001, -66);
                    cm.gainItem(1132041,8,8,8,8,888,888,1,1,0,0,0,0,0,0);
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

	