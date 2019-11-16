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
            var gsjb = "你好，这里可以合成130级武器。\r\n";
            gsjb += "#L1##v1302153##z1302153##l\r\n";
            gsjb += "#L2##v1402096##z1402096##l\r\n";
            gsjb += "#L3##v1432087##z1432087##l\r\n";
            gsjb += "#L4##v1442117##z1442117##l\r\n";
            gsjb += "#L5##v1382105##z1382105##l\r\n";
            gsjb += "#L6##v1452112##z1452112##l\r\n";
            gsjb += "#L7##v1462100##z1462100##l\r\n";
            gsjb += "#L8##v1332131##z1332131##l\r\n";
            gsjb += "#L9##v1472123##z1472123##l\r\n";
            gsjb += "#L10##v1482087##z1482087##l\r\n";
            gsjb += "#L11##v1492086##z1492086##l\r\n";
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
                    cm.sendGetNumber("合成一个#v4005004#需要10个#v4004004#\r\n请输入[#r黑暗水晶母矿#k]的数量:\r\n当前: #r #c4004004# 个 \r\n", 1, 1, 1 );

                }

            
            }else if (selection == 1) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 1
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1302086##z1302086#\r\n#v4250802##z4250802# × 2\r\n#v4000463#货币 × 15\r\n#v4031138#金币：30000000\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 2) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 2
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1402047##z1402047#\r\n#v4250802##z4250802# × 2\r\n#v4000463#货币 × 15\r\n#v4031138#金币：30000000\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 3) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 3
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1402049##z1402049#\r\n#v4250802##z4250802# × 2\r\n#v4000463#货币 × 15\r\n#v4031138#金币：30000000\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 4) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 4
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1442067##z1442067#\r\n#v4250802##z4250802# × 2\r\n#v4000463#货币 × 15\r\n#v4031138#金币：30000000\r\n请输入要合成的数量:\r\n", 1, 1, 1 );
					
                }

            }else if (selection == 5) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 5
                   cm.sendGetNumber("合成需要材料如下：\r\n#v1382059##z1382059#\r\n#v4250802##z4250802# × 2\r\n#v4000463#货币 × 15\r\n#v4031138#金币：30000000\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 6) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 6
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1452059##z1452059#\r\n#v4250802##z4250802# × 2\r\n#v4000463#货币 × 15\r\n#v4031138#金币：30000000\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 7) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 7
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1462051##z1462051#\r\n#v4250802##z4250802# × 2\r\n#v4000463#货币 × 15\r\n#v4031138#金币：30000000\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 8) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 8
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1332076##z1332076#\r\n#v4250802##z4250802# × 2\r\n#v4000463#货币 × 15\r\n#v4031138#金币：30000000\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 9) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 9
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1472071##z1472071#\r\n#v4250802##z4250802# × 2\r\n#v4000463#货币 × 15\r\n#v4031138#金币：30000000\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 10) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 10
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1482024##z1482024#\r\n#v4250802##z4250802# × 2\r\n#v4000463#货币 × 15\r\n#v4031138#金币：30000000\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 11) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 11
                    
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1492025##z1492025#\r\n#v4250802##z4250802# × 2\r\n#v4000463#货币 × 15\r\n#v4031138#金币：30000000\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

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
                 if (cm.haveItem(4250802, selection*2) &&cm.haveItem(1302086, selection) && cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*30000000){
					 cm.gainItem(4250802, -selection*2);
					 cm.gainItem(4000463, -selection*15);
					 cm.gainItem(1302086, -selection);
					cm.gainMeso(-30000000* selection); //加减金币
					cm.gainItem(1302153, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 2) {
                 if (cm.haveItem(4250802, selection*2) &&cm.haveItem(1402047, selection) && cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*30000000){
					cm.gainItem(4250802, -selection*2);
					cm.gainItem(4000463, -selection*15);
					cm.gainItem(1402047, -selection);
					cm.gainMeso(-30000000* selection); //加减金币
					cm.gainItem(1402096, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 3) {
                if (cm.haveItem(4250802, selection*2) &&cm.haveItem(1432049, selection) && cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*30000000){
					cm.gainItem(4250802, -selection*2);
					cm.gainItem(4000463, -selection*15);
					cm.gainItem(1432049, -selection);
					cm.gainMeso(-30000000* selection); //加减金币
					cm.gainItem(1432087, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 4) {
                 if (cm.haveItem(4250802, selection*2) &&cm.haveItem(1442067, selection) && cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*30000000){
					cm.gainItem(4250802, -selection*2);
					cm.gainItem(4000463, -selection*15);
					cm.gainItem(1442067, -selection);
					cm.gainMeso(-30000000* selection); //加减金币
					cm.gainItem(1442117, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 5) {
                if (cm.haveItem(4250902, selection*2) &&cm.haveItem(1382059, selection) && cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*30000000){
					cm.gainItem(4250902, -selection*2);
					cm.gainItem(4000463, -selection*15);
					cm.gainItem(1382059, -selection);
					cm.gainMeso(-30000000* selection); //加减金币
					cm.gainItem(1382105, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 6) {
                if (cm.haveItem(4251102, selection*2) &&cm.haveItem(1452059, selection) && cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*30000000){
					cm.gainItem(4251102, -selection*2);
					cm.gainItem(4000463, -selection*15);
					cm.gainItem(1452059, -selection);
					cm.gainMeso(-30000000* selection); //加减金币
					cm.gainItem(1452112, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 7) {
                if (cm.haveItem(4251102, selection*2) &&cm.haveItem(1462051, selection) && cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*30000000){
					cm.gainItem(4251102, -selection*2);
					cm.gainItem(4000463, -selection*15);
					cm.gainItem(1462051, -selection);
					cm.gainMeso(-30000000* selection); //加减金币
					cm.gainItem(1462100, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 8) {
               if (cm.haveItem(4251002, selection*2) &&cm.haveItem(1332076, selection) && cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*30000000){
					cm.gainItem(4251002, -selection*2);
					cm.gainItem(4000463, -selection*15);
					cm.gainItem(1332076, -selection);
					cm.gainMeso(-30000000* selection); //加减金币
					cm.gainItem(1332131, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 9) {
                if (cm.haveItem(4251002, selection*2) &&cm.haveItem(1472071, selection) && cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*30000000){
					cm.gainItem(4251002, -selection*2);
					cm.gainItem(4000463, -selection*15);
					cm.gainItem(1472071, -selection);
					cm.gainMeso(-30000000* selection); //加减金币
					cm.gainItem(1472123, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 10) {
                if (cm.haveItem(4250802, selection*2) &&cm.haveItem(1482024, selection) && cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*30000000){
					cm.gainItem(4250802, -selection*2);
					cm.gainItem(4000463, -selection*15);
					cm.gainItem(1482024, -selection);
					cm.gainMeso(-30000000* selection); //加减金币
					cm.gainItem(1482087, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 11) {
                if (cm.haveItem(4251102, selection*2) &&cm.haveItem(1492025, selection) && cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*30000000){
					cm.gainItem(4251102, -selection*2);
					cm.gainItem(4000463, -selection*15);
					cm.gainItem(1492025, -selection);
					cm.gainMeso(-30000000* selection); //加减金币
					cm.gainItem(1492086, selection);
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



