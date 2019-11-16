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
            text += "#e#r你好！这里是单次充值奖励领取处。\r\n#b单次充值100元/300元/500元/分别会赠送给您一个兑换币，根据需求兑换自己喜欢的道具即可！\r\n\r\n"//3
            text += "#L1##e#d#v4031683#单次充值100元.赠送XXX.\r\n"//3
            text += "#L2##e#d#v4031684#单次充值300元.赠送XXX.#l\r\n"//3
            text += "#L3##e#d#v4031685#单次充值500元.赠送XXX.#l\r\n"//3
            text += "#L4##e#d#v3010894#充值奖励商店.\r\n"//3
            //text += "#L5##e#d#v1402046#1500元累计奖励领取处.\r\n"//3
            //text += "#L6##e#d#v4031687#2000元累计奖励领取处.\r\n"//3
            //text += "#L7##e#d#v4031688#3000元累计奖励领取处.#l\r\n"//3
            //text += "#L8##e#d#v4031689#5000元累计奖励领取处#l\r\n"//3
            //text += "#L9##e#d#v1462050#永恒冥雷弩制作#l\r\n"//3
            //text += "#L10##e#d#v1472068#永恒大悲赋制作#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9330084, 1);
        } else if (selection == 2) {
		cm.openNpc(9330084, 2);
        } else if (selection == 3) {
		cm.openNpc(9330084, 3);
        } else if (selection == 4) {
		cm.openNpc(9330084, 64);
        } else if (selection == 5) {
		cm.openNpc(9330084, 65);
        } else if (selection == 6) {
		cm.openNpc(9330084, 66);
        } else if (selection == 7) {
		cm.openNpc(9330084, 67);
        } else if (selection == 8) {
		cm.openNpc(9000018, 68);
        } else if (selection == 9) {
		cm.openNpc(9000018, 69);
        } else if (selection == 10) {
		cm.openNpc(9000018, 610);
	}
    }
}


