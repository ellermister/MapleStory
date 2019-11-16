function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
			//显示物品ID图片用的代码是  #v这里写入ID#
            text += "#k在冒险岛的世界里，有许许多多的野外BOSS哦。比如蜗牛王，蘑菇王等等...那么如果你能猎杀他们获得战利品，我就会授予你赏金猎人的戒指哦！去寻找各地的BOSS吧！\r\n(暂未开放.脚本制作中...)\r\n\r\n"//3
            text += "#L1##e#dLv 30#v1113164#新手赏金猎人戒指.#l\r\n"//3
            text += "#L2##e#dLv 60#v1113165#赏金猎人戒指.#l\r\n"//3
            text += "#L3##e#dLv 90#v1113166#高手赏金猎人戒指.#l\r\n"//3
            text += "#L4##e#dLv135#v1113167#大师赏金猎人戒指.#l\r\n"//3
            text += "#L5##e#dLv150#v1113168#传说赏金猎人戒指.#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9310060, 70);
        } else if (selection == 2) {
		cm.openNpc(9310060, 5);
        } else if (selection == 3) {
		cm.openNpc(9310060, 4);
        } else if (selection == 4) {
		cm.openNpc(9310060, 1);
        } else if (selection == 5) {
		cm.openNpc(9310060, 2);
        } else if (selection == 4) {
		cm.openNpc(9000017, 3);
	}
    }
}


