/*
 * 
 * @wnms
 * @大擂台传送副本npc
 */
var 蓝色角点 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
function start() {
    status = -1;
    action(1, 0, 0);
}
var 冒险币 = 5000;
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
            cm.sendSimple("#r亲爱的各位老板们，欢迎来到高端商店，以下看到属性都是虚假的，真正的属性请看旁边的介绍\r\n<请选择你要购买的物品>\r\n\r\n#d#L0#购买#v1112793##z1112793#X1个\t需要点卷：5000点\r\n\r\n#L1#购买#v1702224##z1702224#（+10攻、+10魔攻）\t需要点卷：2万点\r\n\r\n#L2#购买#v1032024##z1032024#（+10攻、+10魔攻）\t需要点卷：2万点\r\n\r\n");
        } else if (status == 1) {
            if (selection == 0) {//副本传送
                if (cm.getPlayer().getCSPoints(1) >= 5000) {
				cm.gainNX(-5000);
				cm.gainItem(1112793, 1);//
			cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功在高端商店购买一个【快乐戒指】，把它砸到极致吧！！");				
            cm.sendOk("购买成功！");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足5000点，无法购买!");
            cm.dispose();
			}
            } else if (selection == 1) {//副本兑换奖励
                if (cm.getPlayer().getCSPoints(1) >= 20000) {
				cm.gainNX(-20000);
				//cm.gainItem(1702224, 1);//
				cm.gainItem(1702224,0,0,0,0,0,0,10,10,0,0,0,0,0,0);//xunzhang
			cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功在高端商店购买一个【透明武器】！！");		
            cm.sendOk("购买成功！");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足2万点，无法购买!");
            cm.dispose();
			}
            }else if(selection == 2){
                if (cm.getPlayer().getCSPoints(1) >= 20000) {
				cm.gainNX(-20000);
				//cm.gainItem(1702224, 1);//
				cm.gainItem(1032024,0,0,0,0,0,0,10,10,0,0,0,0,0,0);//xunzhang
			cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功在高端商店购买一个【透明耳环】！！");		
            cm.sendOk("购买成功！");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足2万点，无法购买!");
            cm.dispose();
			}
        }
        }
    }
}


