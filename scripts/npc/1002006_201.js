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
            cm.sendSimple("#r你好！\r\n<请选择你要进行的操作>\r\n\r\n#d#L0#购买#v4310003##z4310003#X1个\t需要点卷：400点\r\n\r\n#L1#购买#v4310003##z4310003#X10个\t需要点卷：4000点\r\n\r\n#b#L2#" + 蓝色角点 + "开始抽奖" + 蓝色角点 + "\r\n\r\n");
        } else if (status == 1) {
            if (selection == 0) {//副本传送
                if (cm.getPlayer().getCSPoints(1) >= 400) {
				cm.gainNX(-400);
				cm.gainItem(4310003, 1);//
            cm.sendOk("购买成功！");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足300点，无法购买!");
            cm.dispose();
			}
            } else if (selection == 1) {//副本兑换奖励
                if (cm.getPlayer().getCSPoints(1) >= 4000) {
				cm.gainNX(-4000);
				cm.gainItem(4310003, 10);//
			cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功购买10个黄金叶子，来一波精彩的10连抽吧！！");
            cm.sendOk("购买成功！");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足4000点，无法购买!");
            cm.dispose();
			}
            }else if(selection == 2){
                cm.openNpc(9050003,0);
        }
        }
    }
}


