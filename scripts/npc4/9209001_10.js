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
			cm.sendSimple("#b欢迎玩家 #r#h ##k ,收获不小嘛,那么就把你钓到的鱼在我这里兑换奖励吧！小鱼我可不要！要大的！！\r\n#r特别提示:兑换前请确认背包格子,溢出后果自负！戒指/勋章只能领一次！" +
            "#k\r\n#L101##b#v1142146#四维+9.HP/MP+900.攻/魔+9.\r\n#r兑换需要：#k#v4031640#113cm.#v4031644#148cm.各50条.金币888万.\r\n\r\n#L102##b#i1112907#四维+5.HP/MP+500.攻/魔+5.(有泡泡特效)\r\n#r兑换需要：#k#v4031640#113cm.#v4031644#148cm.各50条.金币1000万.\r\n\r\n#L103##b#v1142610#四维+12.HP/MP+1200.攻/魔+12.\r\n#r兑换需要：#k#v1142146#钓鱼王勋章x1 + #v4001200#x10条.金币1500万.\r\n\r\n#L104##b#v4001200#x1#r兑换需要：\r\n#k#v4031628#120cm/128cm/131cm/140cm.#v4031630#30cm/53cm/60cm/100cm.\r\n  每种鱼各10条.100万金币.\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4031640, 50) & cm.haveItem(4031644, 50) && cm.getMeso() > 8888888) {
                    cm.gainItem(4031640, -50);
                    cm.gainItem(4031644, -50);
					cm.gainItem(1142146,9,9,9,9,900,900,9,9,0,0,0,0,0,0)
		            cm.gainMeso(-8888888);
                    cm.sendOk("获得#v1142146#钓鱼王勋章.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的道具.");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4031640, 50) & cm.haveItem(4031644, 50) && cm.getMeso() > 10000000) {
                    cm.gainItem(4031640, -50);
                    cm.gainItem(4031644, -50);
                    cm.gainItem(1112907,5,5,5,5,500,500,5,5,50,50,5,5,5,5);
		            cm.gainMeso(-10000000);
                    cm.sendOk("获得#v1112907#小鱼戒指！.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的道具.");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(1142146, 1) & cm.haveItem(4001200, 10) && cm.getMeso() > 15000000) {
                    cm.gainItem(1142146, -1);
                    cm.gainItem(4001200, -10);
                    cm.gainItem(2340000, 1);
					cm.gainItem(1142610,12,12,12,12,1200,1200,12,12,0,0,0,0,0,0)
		            cm.gainMeso(-15000000);
                    cm.sendOk("获得#v1142610#天才钓鱼王勋章.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的道具.");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(4031628, 10) & cm.haveItem(4031641, 10) && cm.haveItem(4031642, 10) & cm.haveItem(4031643, 10) && cm.haveItem(4031630, 10) & cm.haveItem(4031637, 10) && cm.haveItem(4031638, 10) & cm.haveItem(4031639, 10) && cm.getMeso() > 1000000) {
                    cm.gainItem(4031628, -10);
                    cm.gainItem(4031641, -10);
                    cm.gainItem(4031642, -10);
                    cm.gainItem(4031643, -10);
                    cm.gainItem(4031630, -10);
                    cm.gainItem(4031637, -10);
                    cm.gainItem(4031638, -10);
                    cm.gainItem(4031639, -10);
                    cm.gainItem(4001200, 1);
		            cm.gainMeso(-1000000);
                    cm.sendOk("获得#v4032226#小鱼x1.");
                    cm.dispose();
                } else {
                    cm.sendOk("您身上没有足够的道具.");
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

	