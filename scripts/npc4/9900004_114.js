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
            var gsjb = "你好，这里可以合成贝勒德系列。\r\n";
            gsjb += "#L1##v1113072##z1113072##l\r\n";
            gsjb += "#L2##v1113073##z1113073##l\r\n";
            gsjb += "#L3##v1113074##z1113074##l\r\n";
            gsjb += "#L4##v1113075##z1113075##l\r\n";
            gsjb += "#L5##v1032220##z1032220##l\r\n";
            gsjb += "#L6##v1032221##z1032221##l\r\n";
            gsjb += "#L7##v1032222##z1032222##l\r\n";
            gsjb += "#L8##v1032223##z1032223##l\r\n";
            gsjb += "#L9##v1132243##z1132243##l\r\n";
            gsjb += "#L10##v1132244##z1132244##l\r\n";
            gsjb += "#L11##v1132245##z1132245##l\r\n";
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
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1302059##z1302059#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n #v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 2) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 2
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1113072##z1113072#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 10\r\n #v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 3) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 3
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1113073##z1113073#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 15\r\n #v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 4) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 4
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1113074##z1113074#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 30\r\n #v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 5) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 5
                    cm.sendGetNumber("合成需要材料如下：\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n #v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 6) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 6
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1032220##z1032220#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 10\r\n #v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 7) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 7
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1032221##z1032221#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 15\r\n #v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 8) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 8
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1032222##z1032222#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 30\r\n #v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 9) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 9
                    cm.sendGetNumber("合成需要材料如下：\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 5\r\n #v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 10) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 10
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1132243##z1132243#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 10\r\n #v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 11) {
                    if (1<0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 11
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1132244##z1132244#\r\n#v4005004#黑暗水晶 × 2\r\n#v4000463#货币 × 25\r\n #v4031138#金币：10000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

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
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1302059, selection) &&cm.haveItem(4000463, selection*5) && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(6000463, -selection*5);
					 cm.gainItem(1302059, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1113072, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 2) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1113072, selection) &&cm.haveItem(4000463, selection*10) && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*10);
					 cm.gainItem(1113072, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1113073, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 3) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1113073, selection) &&cm.haveItem(4000463, selection*15)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*15);
					 cm.gainItem(1113073, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1113074, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 4) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1113074, selection) &&cm.haveItem(4000463, selection*30) && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*30);
					 cm.gainItem(1113074, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1113075, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 5) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(4000463, selection*5) && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1032220, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 6) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1032220, selection) &&cm.haveItem(4000463, selection*10) && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*10);
					 cm.gainItem(1032220, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1032221, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 7) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1032221, selection) &&cm.haveItem(4000463, selection*15)  && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*15);
					 cm.gainItem(1032221, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1032222, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 8) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1032222, selection)  &&cm.haveItem(4000463, selection*30)&& cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*30);
					 cm.gainItem(1032222, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1032223, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 9) {
                 if (cm.haveItem(4005004, selection*2)  &&cm.haveItem(4000463, selection*5) && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*5);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1132243, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 10) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1132243, selection) &&cm.haveItem(4000463, selection*10) && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*10);
					 cm.gainItem(1132243, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1132244, selection);
                    cm.sendNext("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendNext("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 11) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1132244, selection)  &&cm.haveItem(4000463, selection*15) && cm.getPlayer().getMeso() >selection*10000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(4000463, -selection*25);
					 cm.gainItem(1132244, -selection);
					cm.gainMeso(-10000000* selection); //加减金币
					cm.gainItem(1132245, selection);
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
