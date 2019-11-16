var 聊天 = "#fUI/StatusBar/BtChat/normal/0#";
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
			text += "\t\t\t  #e欢迎来到#b520冒险岛 #k!#n\r\n"
            text += "#d1.本服经验-金币-爆率：1倍#l\r\n\r\n"//3
            text += "#r2.本服不私下出售任何物品礼包#l\r\n\r\n"//3
            text += "#r3.本服充值比例：1:100#l\r\n\r\n"//3
            text += "#r4.目前只开放职业：战士.魔法师.弓箭手.飞侠\r\n(其余职业后期开放)#l\r\n\r\n"//3
            text += "#r5.完善所有副本+任务+部分游戏功能#l\r\n\r\n"//3
            text += "#r6.出现假死情况请点击拍卖边上的"+ 聊天 +"按钮即可解除假死#l\r\n\r\n"//3
            cm.sendOk(text);
		    cm.dispose();
		}
    }
}


