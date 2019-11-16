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
			cm.sendSimple("#b欢迎世纪玩家 #r#h ##k ！我是「卷轴」商人！\r\n\r\n在我这里你可以购买各种卷轴！\r\n#r特别提示:兑换前请确认背包格子,避免溢出！" +
            "#k\r\n#L101##b#v2043002#单手剑10%.#r需要:#k#v4000313#x10.#v4000463#x5.金币300万.\r\n#L102##b#v2043302#短剑10%.  #r需要:#k#v4000313#x10.#v4000463#x5.金币300万.\r\n#L103##b#v2043702#短杖10%.  #r需要:#k#v4000313#x10.#v4000463#x5.金币300万.\r\n#L104##b#v2043802#长杖10%.  #r需要:#k#v4000313#x10.#v4000463#x5.金币300万.\r\n#L105##b#v2044002#双手剑10%.#r需要:#k#v4000313#x10.#v4000463#x5.金币300万.\r\n#L106##b#v2044302#枪10%.    #r需要:#k#v4000313#x10.#v4000463#x5.金币300万.\r\n#L107##b#v2044702#拳套10%.  #r需要:#k#v4000313#x10.#v4000463#x5.金币300万.\r\n#L108##b#v2044502#弓10%.    #r需要:#k#v4000313#x10.#v4000463#x5.金币300万.\r\n#L109##b#v2044602#弩10%.    #r需要:#k#v4000313#x10.#v4000463#x5.金币300万.\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4000463, 5) && cm.haveItem(4000313, 10) && cm.getMeso() > 3000000) {
                    cm.gainItem(4000313, -10);
                    cm.gainItem(4000463, -5);
                    cm.gainItem(2043002, 1);
		            cm.gainMeso(-3000000);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(4000463, 5) && cm.haveItem(4000313, 10) && cm.getMeso() > 3000000) {
                    cm.gainItem(4000313, -10);
                    cm.gainItem(4000463, -5);
                    cm.gainItem(2043302, 1);
		            cm.gainMeso(-3000000);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(4000463, 5) && cm.haveItem(4000313, 10) && cm.getMeso() > 3000000) {
                    cm.gainItem(4000313, -10);
                    cm.gainItem(4000463, -5);
                    cm.gainItem(2043702, 1);
		            cm.gainMeso(-3000000);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(4000463, 5) && cm.haveItem(4000313, 10) && cm.getMeso() > 3000000) {
                    cm.gainItem(4000313, -10);
                    cm.gainItem(4000463, -5);
                    cm.gainItem(2043802, 1);
		            cm.gainMeso(-3000000);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 105) {
                if (cm.haveItem(4000463, 5) && cm.haveItem(4000313, 10) && cm.getMeso() > 3000000) {
                    cm.gainItem(4000313, -10);
                    cm.gainItem(4000463, -5);
                    cm.gainItem(2044002, 1);
		            cm.gainMeso(-3000000);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 106) {
                if (cm.haveItem(4000463, 5) && cm.haveItem(4000313, 10) && cm.getMeso() > 3000000) {
                    cm.gainItem(4000313, -10);
                    cm.gainItem(4000463, -5);
                    cm.gainItem(2044302, 1);
		            cm.gainMeso(-3000000);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 107) {
                if (cm.haveItem(4000463, 5) && cm.haveItem(4000313, 10) && cm.getMeso() > 3000000) {
                    cm.gainItem(4000313, -10);
                    cm.gainItem(4000463, -5);
                    cm.gainItem(2044702, 1);
		            cm.gainMeso(-3000000);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 108) {
                if (cm.haveItem(4000463, 5) && cm.haveItem(4000313, 10) && cm.getMeso() > 3000000) {
                    cm.gainItem(4000313, -10);
                    cm.gainItem(4000463, -5);
                    cm.gainItem(2044502, 1);
		            cm.gainMeso(-3000000);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }else if (selection == 109) {
                if (cm.haveItem(4000463, 5) && cm.haveItem(4000313, 10) && cm.getMeso() > 3000000) {
                    cm.gainItem(4000313, -10);
                    cm.gainItem(4000463, -5);
                    cm.gainItem(2044602, 1);
		            cm.gainMeso(-3000000);
                    cm.sendOk("兑换成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("您的道具不足.");
                    cm.dispose();
				}
			 }
        }
    }
}

	