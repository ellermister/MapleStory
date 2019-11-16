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
			text += "\t\t\t\t#e#b  萌新冒险岛VIP礼包 #k	#n\r\n"
            text += "#r\t\t\t\t 礼包折扣价格100000点卷！#l\r\n"//3
            text += "#b\t全属性188-VIP勋章#l\r\n"//3
            text += "#b\t工地手套（褐）#l\r\n"//3
            text += "#b\t高级装备特许证半个月#l\r\n"//3
            text += "#b\t送棒棒冰HP 100个#l\r\n"//3
            text += "#b\t送刨冰MP   100个#l\r\n"//3
            text += "#b\t\额外赠送5000W冒险币~#l\r\n\r\n"//3
            text += "#L1##r确定购买大礼包就点我吧！#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			if(cm.getPlayer().getCSPoints(1) >= 100000){
				cm.gainNX(-100000);
				cm.gainItem(5590001, 1, 15);//b装备特许证半个月
				cm.gainItem(2001001, 100);
				cm.gainItem(1082149, 1);
				cm.gainItem(2001002, 100);
				cm.gainMeso(50000000);
		cm.gainItem(1142216,188,188,188,188,888,888,20,20,150,150,15,15,15,15);//勋章
            cm.sendOk("购买成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]购买了萌新VIP");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足无法购买！");
            cm.dispose();
			}
		}
    }
}
