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
            text += "#L1##r我要购买#z5220007#（可以租赁武器一天使用权）#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                if (cm.getPlayer().getCSPoints(1) >= 300) {
				cm.gainNX(-300);
				cm.gainItem(5220007, 1);//
            cm.sendOk("换购成功！");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足，无法购买!");
            cm.dispose();
			}
		}
    }
}


