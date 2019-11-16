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
			cm.sendSimple("#b欢迎玩家 #r#h ##k ,狩猎的时候获得了很多的黄金枫叶吧！在我这里可以兑换丰厚奖励哦！\r\n#r特别提示:兑换前请确认背包格子,溢出后果自负！" +
            "#k\r\n#L105##r#i4000313##bx15#r抽取#b所有职业技能书#v2280003#.\r\n\r\n#L101##r#i4000313##bx10#r换#b超级药水#v2000005#x50.\r\n\r\n#L102##r#i4000313##bx20#r换#b枫叶#i4001126#x500.\r\n\r\n#L103##r#i4000313##bx100#r换#b祝福卷轴#i2340000#x1.\r\n\r\n#L104##r#i4000313##bx50#r换#b黄金猪猪#i4032226#x1.\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4000313, 10) ) {
                    cm.gainItem(4000313, -10);
					cm.gainItem(2000005, 50)
                    cm.sendOk("获得#v2000005#.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的#v4000313#,请在次确认.");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4000313, 20) ) {
                    cm.gainItem(4000313, -20);
                    cm.gainItem(4001126, 500);
                    cm.sendOk("获得#v4001126#枫叶x500！.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的#v4000313#,请在次确认.");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(4000313, 100) ) {
                    cm.gainItem(4000313, -100);
                    cm.gainItem(2340000, 1);
                    cm.sendOk("获得#v2340000#祝福卷轴.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的#v4000313#,请在次确认.");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(4000313, 50) ) {
                    cm.gainItem(4000313, -50);
                    cm.gainItem(4032226, 1);
                    cm.sendOk("获得#v4032226#黄金猪猪x1.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的#v4000313#,请在次确认.");
                    cm.dispose();
				}
			 }else if (selection == 105) {
                    cm.openNpc(9330083, 1);
                } 
			 else if (selection == 106) {
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

	