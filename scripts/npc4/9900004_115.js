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
            gsjb += "#L0#萌新武器合成系统#v1492231##l\r\n";
            gsjb += "#L1#萌新套服合成系统#v1052319##l\r\n";
            gsjb += "#L2#萌新首饰合成系统#v1132013##l\r\n";
            gsjb += "#L3#萌新戒指合成系统#v1113040##l\r\n";
            gsjb += "#L4#萌新宝石合成系统#v4021007##l\r\n";
            gsjb += "#L5#萌新矿石合成系统#v4011005##l\r\n";
            gsjb += "#L6#萌新水晶合成系统#v4251202##l\r\n";
            gsjb += "#L7#萌新材料合成系统#v4001017##l\r\n";
            cm.sendSimple(gsjb);
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能参与兑换。");
                cm.dispose();
            }
            if (selection == 0) {
                
		cm.openNpc(9310023, 1);

            
            }else if (selection == 1) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4032485).iterator();
                if (cm.getPlayer().getCSPoints(0)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 22
                      cm.sendGetNumber("请输入兑换#r#z2040710##k的数量:\r\n#b比例 - (#r10000 = 1#b)\r\n你的点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );

                }

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






