/* 
 * 脚本类型: cm
 * 脚本作者: 萌新
 * 制作时间: 2016/8/21
 */
importPackage(net.sf.cherry.client);
var status = -1;
var beauty = 0;
var tosend = 0;
var sl;
var mats;
var dds;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendNext("如果需要点卷中介服务在来找我吧。");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
                 // cm.getChar().gainCashDD(+1000);
            var gsjb = "你好，这里是萌新合成系统。\r\n";
            gsjb += "#L1#萌新武器合成系统#v1492231##l\r\n";
            gsjb += "#L2#萌新套服合成系统#v1052498##l\r\n";
            //gsjb += "#L3#萌新首饰合成系统#v1132013##l\r\n";
            gsjb += "#L4#萌新戒指腰带耳环#v1113040##l\r\n";
            //gsjb += "#L5#萌新宝石合成系统#v4021007##l\r\n";
            gsjb += "#L6#萌新矿石合成系统#v4011008##l\r\n";
            gsjb += "#L7#萌新水晶合成系统#v4251202##l\r\n";
            gsjb += "#L10#萌新小游戏合成系统#v4080002##l\r\n";
            //gsjb += "#L8#萌新材料合成系统#v4001017##l\r\n";
            cm.sendSimple(gsjb);
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能参与兑换。");
                cm.dispose();
            }
            if (selection == 1) {
		cm.openNpc(9900004, 111);
            }else if (selection == 2) {
		cm.openNpc(9900004, 112);
            }else if (selection == 3) {
		cm.openNpc(9900004, 113);
            }else if (selection == 4) {
		cm.openNpc(9900004, 114);
            }else if (selection == 5) {
		cm.openNpc(9900004, 115);
            }else if (selection == 6) {
		cm.openNpc(9900004, 116);
            }else if (selection == 7) {
		cm.openNpc(9900004, 117);
            }else if (selection == 8) {
		cm.openNpc(9900004, 118);
            }else if (selection == 9) {
		cm.openNpc(9900004, 119);
            }else if (selection == 10) {
		cm.openNpc(9900004, 110);
            }
               


			
			
			
			
			
        } else if (status == 2) {
            if (beauty == 0) {
               if (cm.haveItem(4004004, selection*10)&&cm.haveItem(4001126, selection*10)){
					 cm.gainItem(4004004, -selection*10);
                    cm.sendNext("合成物品成功！");
                   // cm.gainNX(+1000 * selection);
					cm.gainItem(4005004, selection);
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 8) {
                 if (cm.haveItem(4004004, selection*10)&&cm.haveItem(4001126, selection*10)){
					 cm.gainItem(4004004, -selection*10);
                    cm.sendNext("合成物品成功！");
                   // cm.gainNX(+1000 * selection);
					cm.gainItem(4005004, selection);
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 23) {
                 if (cm.getChar().getCashDD() >= selection){
					
                    cm.getChar().gainCashDD(-selection);
                     cm.gainMeso(+500* selection);
                    //cm.gainItem(2040710, selection);
                    cm.sendOk("您成功兑了金币： #r" + selection*500 + " #k")
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}










