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
            text += "#e#d这里是结婚戒指补领处！结婚时候没有得到戒指的，可以来这里领取！记得先去找GM！.\r\n\r\n "//3
            text += "#L1##r兑换戒指#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("请清理你的背包，至少空出2个位置！");
            cm.dispose();
        } else if(cm.haveItem(4310014,1)){
				cm.gainItem(4310014, -1);
				cm.gainItem(1112320,5,5,5,5,500,500,5,5,10,10,10,10,10,10);//吊坠
				//cm.gainItem(1082102,50,50,50,50,0,0,20,20,0,0,0,0,0,0);//吊坠
				//cm.gainItem(1102039,50,50,50,50,0,0,20,20,0,0,0,0,0,0);//吊坠
                                //cm.gainNX(+2000);
				//cm.gainMeso(1000000);
            cm.sendOk("结婚戒指，补领成功！!");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]结婚戒指，补领成功！！");
            cm.dispose();
			}else{
            cm.sendOk("要先找GM哦~");
            cm.dispose();
			}
		}
    }
}


