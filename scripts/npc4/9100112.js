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
            text += "#e#d我不是转职NPC哦~要转职的话请点击游戏右下角[拍卖]角色快捷转职，会很方便的，有事情就联系QQ群主，欢迎您的加入！#l\r\n\r\n"//3
            text += "#L1##r查看官网#l\r\n\r\n"//3
			text += "#L2##r查看官网#l\r\n\r\n"//3
			text += "#L3##r查看官网#l\r\n\r\n"//3
			text += "#L4##r查看官网#l\r\n\r\n"//3
			text += "#L5##r查看官网#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			cm.openWeb("www.sf5y.com");
            cm.dispose();
        } else if (selection == 2) {
			cm.openWeb("www.sf5y.com");
            cm.dispose();
        } else if (selection == 3) {
			cm.openWeb("www.sf5y.com");
            cm.dispose();
        } else if (selection == 4) {
			cm.openWeb("www.sf5y.com");
            cm.dispose();
        } else if (selection == 5) {
			cm.openWeb("www.sf5y.com");
            cm.dispose();
		}
	}
}



