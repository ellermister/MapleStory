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
            text += "#L1##e#d#v1302064#枫叶突袭剑制作.\r\n"//3
            text += "#L2##e#d#v1332056#枫叶追魂刺制作#l\r\n"//3
            text += "#L3##e#d#v1372034#枫叶仙姬杖制作#l\r\n"//3
            text += "#L4##e#d#v1382039#枫叶丹心杖制作#l\r\n"//3
            text += "#L5##e#d#v1432040#枫叶钻天枪制作#l\r\n"//3
            text += "#L6##e#d#v1442051#枫叶战斧制作#l\r\n"//3
            text += "#L7##e#d#v1452045#枫叶HAPPY弓制作#l\r\n"//3
            text += "#L8##e#d#v1462040#枫叶击星弩制作#l\r\n"//3
            text += "#L9##e#d#v1402039#枫叶枭首剑制作#l\r\n"//3
            text += "#L10##e#d#v1472055#枫叶定天拳制作#l\r\n"//3
            text += "#L11##e#d#v1312032#枫叶破击斧单手制作#l\r\n"//3
            text += "#L12##e#d#v1322054#枫叶地震锤单手制作#l\r\n"//3
            text += "#L13##e#d#v1412027#枫叶乾坤轮双手制作#l\r\n"//3
            text += "#L14##e#d#v1422029#枫叶轰天镗双手制作#l\r\n"//3
            text += "#L15##e#d#v1482022#枫叶金爪制作#l\r\n"//3
            text += "#L16##e#d#v1492022#枫叶加仑手枪制作#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(1002006, 21);
        } else if (selection == 2) {
		cm.openNpc(1002006, 22);
        } else if (selection == 3) {
		cm.openNpc(1002006, 23);
        } else if (selection == 4) {
		cm.openNpc(1002006, 24);
        } else if (selection == 5) {
		cm.openNpc(1002006, 25);
        } else if (selection == 6) {
		cm.openNpc(1002006, 26);
        } else if (selection == 7) {
		cm.openNpc(1002006, 27);
        } else if (selection == 8) {
		cm.openNpc(1002006, 28);
        } else if (selection == 9) {
		cm.openNpc(1002006, 29);
        } else if (selection == 10) {
		cm.openNpc(1002006, 210);
        } else if (selection == 11) {
		cm.openNpc(1002006, 211);
        } else if (selection == 12) {
		cm.openNpc(1002006, 212);
        } else if (selection == 13) {
		cm.openNpc(1002006, 213);
        } else if (selection == 14) {
		cm.openNpc(1002006, 214);
        } else if (selection == 15) {
		cm.openNpc(1002006, 215);
        } else if (selection == 16) {
		cm.openNpc(1002006, 216);
	}
    }
}


