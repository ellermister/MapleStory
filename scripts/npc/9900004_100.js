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
            text += "#d#e这里是进行各种装备制造的快速通道，#r更多兑换，请前往枫叶集市查看！\r\n#b请问你要制造什么装备？\r\n\r\n"//3
            text += "#L1##r制作并升级老公老婆戒指.#l\r\n\r\n"//3
			//text += "#L6##b月妙#d副本奖励:#k兑换[蒲公英戒指].#rNEW!#l\r\n\r\n"//3
			text += "#L7##r月妙#d副本奖励:#k[金铃铛]抽奖.#rNEW!#l\r\n\r\n"//3
			//text += "#L4##b废弃#d副本奖励:#k兑换[天使的祝福].#k#l\r\n\r\n"//3
			//text += "#L5##b玩具#d副本奖励:#k兑换[蓝调戒指].#rNEW!#k#l\r\n\r\n"//3
            text += "#L2##b毒雾#d副本奖励:#k制作并升级[阿尔泰耳环].#k#l\r\n\r\n"//3
            text += "#L3##b男女#d副本奖励:#k制作并升级[小眼镜].#k#l\r\n\r\n"//3			
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9000017, 0);
        } else if (selection == 6) {
		cm.openNpc(9000017, 60);
        } else if (selection == 2) {
		cm.openNpc(9000017, 30);
        } else if (selection == 3) {
		cm.openNpc(9000017, 20);
        } else if (selection == 4) {
		cm.openNpc(9000017, 40);
		} else if (selection == 5) {
		cm.openNpc(9000017, 50);
        } else if (selection == 60) {
		cm.openNpc(9000017, 60);
        } else if (selection == 7) {
		cm.openNpc(9900004, 1086);
        } else if (selection == 8) {
		cm.openNpc(9000017, 80);		
	}
    }
}


