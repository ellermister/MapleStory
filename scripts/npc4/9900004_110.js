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
            gsjb += "#L11#萌新小游戏合成系统#v4080100##l\r\n";
            gsjb += "#L0#萌新小游戏合成系统#v4080001##l\r\n";
            /*gsjb += "#L1#萌新小游戏合成系统#v4080002##l\r\n";
            gsjb += "#L2#萌新小游戏合成系统#v4080003##l\r\n";
            gsjb += "#L3#萌新小游戏合成系统#v4080004##l\r\n";
            gsjb += "#L4#萌新小游戏合成系统#v4080005##l\r\n";
            gsjb += "#L5#萌新小游戏合成系统#v4080006##l\r\n";
            gsjb += "#L6#萌新小游戏合成系统#v4080007##l\r\n";
            gsjb += "#L7#萌新小游戏合成系统#v4080008##l\r\n";
            gsjb += "#L8#萌新小游戏合成系统#v4080009##l\r\n";
            gsjb += "#L9#萌新小游戏合成系统#v4080010##l\r\n";
            gsjb += "#L10#萌新小游戏合成系统#v4080011##l\r\n"; */
            cm.sendSimple(gsjb);
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能参与兑换。");
                cm.dispose();
            }
            if (selection == 0) {
                
                if (cm.getPlayer().getMeso()  < 5000000) {
                    cm.sendNext("您的金币不足兑换.");
                    status = -1;
                } else {
                    beauty = 0
                      cm.sendGetNumber("请输入兑换#r#v4080001##k的数量:\r\n#b需要#v4031138#500W金币\r\n你的金币数量: #r" +
                      cm.getPlayer().getMeso() + " \r\n", 1, 1, 1 );

                }

            
            }else if (selection == 11) {
               
                if (cm.getPlayer().getMeso()  < 5000000) {
                    cm.sendNext("您的金币不足兑换.");
                    status = -1;
                } else {
                    beauty = 11
                      cm.sendGetNumber("请输入兑换#r#v4080100##k的数量:\r\n#b需要#v4031138#500W金币\r\n你的金币数量: #r" +
                      cm.getPlayer().getMeso() + " \r\n", 1, 1, 1 );

                }


            }
               


			
			
			
			
			
        } else if (status == 2) {
            if (beauty == 0) {
               if (cm.getPlayer().getMeso()  >= 5000000){
					cm.gainMeso(-5000000* selection); //加减金币
					cm.gainItem(4080001, selection);
                    cm.sendOk("合成物品成功！");
					 cm.dispose();
                } else {
                    cm.sendNext("您的条件不足无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 11) {
               if (cm.getPlayer().getMeso()  >= 5000000){
					cm.gainMeso(-5000000* selection); //加减金币
					cm.gainItem(4080100, selection);
                    cm.sendOk("合成物品成功！");
					 cm.dispose();
                } else {
                    cm.sendNext("您的条件不足无法兑换。");
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








