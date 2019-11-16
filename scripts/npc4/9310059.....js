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
            text += "#L1##r#l这里是副本奖励抽奖处.\r\n\r\n"//3
            text += "#L2##e#d月妙副本蛋抽奖#l\r\n"//3
            text += "#L3##e#d废气副本蛋抽奖#l\r\n"//3
            text += "#L4##e#d玩具副本蛋抽奖#l\r\n"//3
            text += "#L5##e#d天空副本蛋抽奖#l\r\n"//3
            text += "#L6##e#d毒雾副本蛋抽奖#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9900004, 70);
        } else if (selection == 6) {
		cm.openNpc(9310059, 5);
        } else if (selection == 5) {
		cm.openNpc(9310059, 4);
        } else if (selection == 2) {
		cm.openNpc(9310059, 1);
        } else if (selection == 3) {
		cm.openNpc(9310059, 2);
        } else if (selection == 4) {
		cm.openNpc(9310059, 3);
	}
    }
}


