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
                text += "";//
            }
			text += "\t\t\t  #e欢迎来到#b天成冒险岛 #k!#n\r\n"
			text += "\t\t\t  #e您当前积分为：#b"+cm.getHyPay(4)+"#k!#n\r\n"
            text += "#L1##d5积分抽奖(卷轴)#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
            cm.gainExp(330000);1
        } else if (selection == 2) {
		}
    }
}


