/* 
 * 脚本类型: cm
 * 脚本用途: 点卷中介
 * 脚本作者: 故事丶
 * 制作时间: 2014/12/18
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
            var gsjb = "你好，这里可以合成120级武器。\r\n";
            gsjb += "#L1##v1302086##z1302086##l\r\n";
            gsjb += "#L2##v1402047##z1402047##l\r\n";
            gsjb += "#L3##v1432049##z1432049##l\r\n";
            gsjb += "#L4##v1442067##z1442067##l\r\n";
            gsjb += "#L5##v1382059##z1382059##l\r\n";
            gsjb += "#L6##v1452059##z1452059##l\r\n";
            gsjb += "#L7##v1462051##z1462051##l\r\n";
            gsjb += "#L8##v1332076##z1332076##l\r\n";
            gsjb += "#L9##v1472071##z1472071##l\r\n";
            gsjb += "#L10##v1482024##z1482024##l\r\n";
            gsjb += "#L11##v1492025##z1492025##l\r\n";
            cm.sendSimple(gsjb);
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能参与兑换。");
                cm.dispose();
            }
            if (selection == 0) {
                 if (cm.haveItem(4004004) == 0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 0
                    cm.sendGetNumber("合成一个#v4005004#需要10个#v4004004#\r\n请输入[#r黑暗水晶母矿#k]的数量:\r\n当前: #r #c4004004# 个 \r\n", 1, 1, 100000 );

                }

            
            }else if (selection == 1) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 1
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1302059##z1302059#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n#v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 2) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 2
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1402036##z1402036#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n#v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 3) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 3
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1432038##z1432038#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n#v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 4) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 4
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1442045##z1442045#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币× 5\r\n#v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 5) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 5
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1382036##z1382036#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n#v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 6) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 6
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1452044##z1452044#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n#v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 7) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 7
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1462039##z1462039#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n#v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 8) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 8
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1332050##z1332050#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n#v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 9) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 9
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1472051##z1472051#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n#v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 10) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 10
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1482013##z1482013#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n#v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 11) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 11
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1492013##z1492013#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n#v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

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
            }else if (beauty == 1) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1302059, selection) && cm.haveItem(4000463, selection*5) && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(1302059, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1302086, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 2) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1402036, selection) && cm.haveItem(4000463, selection*5)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(1402036, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1402047, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 3) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1432038, selection) && cm.haveItem(4000463, selection*5)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(1432038, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1432049, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 4) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1442045, selection) && cm.haveItem(4000463, selection*5)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(1442045, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1442067, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 5) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1382036, selection) && cm.haveItem(4000463, selection*5)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(1382036, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1382059, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 6) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1452044, selection) && cm.haveItem(4000463, selection*5)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(1452044, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1452059, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 7) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1462039, selection) && cm.haveItem(4000463, selection*5)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(1462039, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1462051, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 8) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1332050, selection) && cm.haveItem(4000463, selection*5)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(1332050, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1332076, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 9) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1472051, selection) && cm.haveItem(4000463, selection*5)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(1472051, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1472071, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 10) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1482013, selection) && cm.haveItem(4000463, selection*5)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(1482013, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1482024, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 11) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1492013, selection) && cm.haveItem(4000463, selection*5)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(1492013, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1492025, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}
