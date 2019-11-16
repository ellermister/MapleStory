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
            text += "#e#r你好！只要你有装备租赁卷，即可在我这里租赁装备.\r\n\r\n#b使用时间:#r一天使用权\r\n"//3
            text += "#L1##e#d我要购买#v5220007#\t需要：点卷=300  时间:一天使用权#l\r\n\r\n"//3
            text += "#L2##e#d#v1302071##z1302071#  一天使用权#l\r\n"//3
            text += "#L3##e#d#v1312034##z1312034#  一天使用权#l\r\n"//3
            text += "#L4##e#d#v1402041##z1402041#  一天使用权#l\r\n"//3
            text += "#L5##e#d#v1432042##z1432042#  一天使用权#l\r\n"//3
            text += "#L6##e#d#v1442053##z1442053#  一天使用权#l\r\n"//3
            text += "#L7##e#d#v1382042##z1382042#  一天使用权#l\r\n"//3
            text += "#L8##e#d#v1452048##z1452048#  一天使用权#l\r\n"//3
            text += "#L9##e#d#v1462043##z1462043#  一天使用权#l\r\n"//3
            text += "#L10##e#d#v1332059##z1332059# 一天使用权#l\r\n"//3
            text += "#L11##e#d#v1472058##z1472058# 一天使用权#l\r\n"//3
            text += "#L12##e#d#v1492026##z1492026# 一天使用权#l\r\n"//3
            text += "#L13##e#d#v1482025##z1482025# 一天使用权#l\r\n"//3

            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9000018, 1);
        } else if (selection == 2) {
		cm.openNpc(9000018, 2);
        } else if (selection == 3) {
		cm.openNpc(9000018, 3);
        } else if (selection == 4) {
		cm.openNpc(9000018, 4);
        } else if (selection == 5) {
		cm.openNpc(9000018, 5);
        } else if (selection == 6) {
		cm.openNpc(9000018, 6);
        } else if (selection == 7) {
		cm.openNpc(9000018, 7);
        } else if (selection == 8) {
		cm.openNpc(9000018, 8);
        } else if (selection == 9) {
		cm.openNpc(9000018, 9);
        } else if (selection == 10) {
		cm.openNpc(9000018, 10);
        } else if (selection == 11) {
		cm.openNpc(9000018, 11);
        } else if (selection == 12) {
		cm.openNpc(9000018, 12);
        } else if (selection == 13) {
		cm.openNpc(9000018, 13);
	}
    }
}


