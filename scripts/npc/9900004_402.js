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
            text += "#e#r你好！在我这里可以帮你制作你所需要的武器，以下是我可以为您制作的武器列表.\r\n\r\n"//3
            text += "#L1##e#d#v1302030#枫叶剑制作.\r\n"//3
            text += "#L2##e#d#v1332025#枫叶刃制作#l\r\n"//3
            text += "#L3##e#d#v1382012#枫叶杖制作#l\r\n"//3
            text += "#L4##e#d#v1432012#枫叶枪制作#l\r\n"//3
            text += "#L5##e#d#v1442024#枫叶矛制作#l\r\n"//3
            text += "#L6##e#d#v1452022#枫叶弓制作#l\r\n"//3
            text += "#L7##e#d#v1462019#枫叶弩制作#l\r\n"//3
            text += "#L8##e#d#v1472032#枫叶拳制作#l\r\n"//3
            text += "#L9##e#d#v1422014#枫叶锤制作#l\r\n"//3
            text += "#L10##e#d#v1412011#枫叶斧制作#l\r\n"//3
            text += "#L11##e#d#v1482020#枫叶指节制作#l\r\n"//3
            text += "#L12##e#d#v1492020#枫叶短枪制作#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(1002006, 11);
        } else if (selection == 2) {
		cm.openNpc(1002006, 12);
        } else if (selection == 3) {
		cm.openNpc(1002006, 13);
        } else if (selection == 4) {
		cm.openNpc(1002006, 14);
        } else if (selection == 5) {
		cm.openNpc(1002006, 15);
        } else if (selection == 6) {
		cm.openNpc(1002006, 16);
        } else if (selection == 7) {
		cm.openNpc(1002006, 17);
        } else if (selection == 8) {
		cm.openNpc(1002006, 18);
        } else if (selection == 9) {
		cm.openNpc(1002006, 19);
        } else if (selection == 10) {
		cm.openNpc(1002006, 101);
        } else if (selection == 11) {
		cm.openNpc(1002006, 111);
        } else if (selection == 12) {
		cm.openNpc(1002006, 112);
	}
    }
}


