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
            text += "#L1##e#d#v4170008#领取 50元    首冲礼包！#l\r\n\r\n"//3
            text += "#L2##d#v4170010#领取100元累计充值礼包！#l\r\n\r\n"//3
            text += "#L3##d#v4170011#领取300元累计充值礼包！#l\r\n\r\n"//3
            text += "#L4##d#v4170012#领取500元累计充值礼包！#l\r\n\r\n"//3
            text += "#L5##d#v4001245#领取800元累计充值礼包！#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9900004, 70);
        } else if (selection == 2) {
		cm.openNpc(9900004, 71);
        } else if (selection == 3) {
		cm.openNpc(9900004, 72);
        } else if (selection == 5) {
		cm.openNpc(9900004, 74);
        } else if (selection == 4) {
		cm.openNpc(9900004, 73);
	}
    }
}


