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
                cm.sendOk("如果需要点卷中介服务在来找我吧。");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
                 // cm.getChar().gainCashDD(+1000);
            var gsjb = "#v2022361#你好，这里可以合成130级套服#v2022361#\r\n";
            gsjb += "#L1##v1052498##z1052498##l\r\n";
            gsjb += "#L2##v1052499##z1052499##l\r\n";
            gsjb += "#L3##v1052500##z1052500##l\r\n";
            gsjb += "#L4##v1052501##z1052501##l\r\n";
            gsjb += "#L5##v1052502##z1052502##l\r\n";
            cm.sendSimple(gsjb);
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能参与兑换。");
                cm.dispose();
            }
            if (selection == 0) {
                 if (cm.haveItem(4004004) == 0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 0
                    cm.sendGetNumber("合成一个#v4005004#需要10个#v4004004#\r\n请输入[#r黑暗水晶母矿#k]的数量:\r\n当前: #r #c4004004# 个 \r\n", 1, 1, 100000 );

                }

            
            }else if (selection == 1) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 1
                    cm.sendGetNumber("             #v2022361#合成需要材料如下#v2022361#          \r\n#v4250802##z4250802# [#r#c4250802##k/1]       #v4011008##z4011008# [#r#c4011008##k/1]\r\n#v1050100##z1050100# [#r#c1050100##k/1]             #v1051098##z1051098# [#r#c1051098##k/1]\r\n\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 2) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 2
                    cm.sendGetNumber("             #v2022361#合成需要材料如下#v2022361#          \r\n#v4250902##z4250902# [#r#c4250902##k/1]       #v4011008##z4011008# [#r#c4011008##k/1]\r\n#v1050100##z1050100# [#r#c1050100##k/1]             #v1051098##z1051098# [#r#c1051098##k/1]\r\n\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 3) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 3
                    cm.sendGetNumber("             #v2022361#合成需要材料如下#v2022361#          \r\n#v4251102##z4251102# [#r#c4251102##k/1]       #v4011008##z4011008# [#r#c4011008##k/1]\r\n#v1050100##z1050100# [#r#c1050100##k/1]             #v1051098##z1051098# [#r#c1051098##k/1]\r\n\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 4) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 4
                    cm.sendGetNumber("             #v2022361#合成需要材料如下#v2022361#          \r\n#v4251002##z4251002# [#r#c4251002##k/1]       #v4011008##z4011008# [#r#c4011008##k/1]\r\n#v1050100##z1050100# [#r#c1050100##k/1]             #v1051098##z1051098# [#r#c1051098##k/1]\r\n\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 5) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 5
                    cm.sendGetNumber("             #v2022361#合成需要材料如下#v2022361#          \r\n#v4251102##z4251102# [#r#c4251102##k/1]       #v4011008##z4011008# [#r#c4011008##k/1]\r\n#v1050100##z1050100# [#r#c1050100##k/1]             #v1051098##z1051098# [#r#c1051098##k/1]\r\n\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 6) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 6
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1452044##z1452044#\r\n#v4005004#黑暗水晶 × 2\r\n#v4031138#金币：20000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 7) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 7
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1462039##z1462039#\r\n#v4005004#黑暗水晶 × 2\r\n#v4031138#金币：20000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 8) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 8
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1332050##z1332050#\r\n#v4005004#黑暗水晶 × 2\r\n#v4031138#金币：20000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 9) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 9
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1472051##z1472051#\r\n#v4005004#黑暗水晶 × 2\r\n#v4031138#金币：20000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 10) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 10
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1482013##z1482013#\r\n#v4005004#黑暗水晶 × 2\r\n#v4031138#金币：20000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }else if (selection == 11) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 11
                    cm.sendGetNumber("合成需要材料如下：\r\n#v1492013##z1492013#\r\n#v4005004#黑暗水晶 × 2\r\n#v4031138#金币：20000000\r\n请输入要合成的数量:\r\n", 1, 1, 100000 );

                }

            }
               


			
			
			
			
			
        } else if (status == 2) {
            if (beauty == 0) {
               if (cm.haveItem(4004004, selection*10)&&cm.haveItem(4001126, selection*10)){
					 cm.gainItem(4004004, -selection*10);
                    cm.sendOk("合成物品成功！");
                   // cm.gainNX(+1000 * selection);
					cm.gainItem(4005004, selection);
					 cm.dispose();
                } else {
                    cm.sendOk("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
                    cm.sendGetNumber("             #v2022361#合成需要材料如下#v2022361#          \r\n#v4250802##z4250802# [#r#c4250802##k/1]       #v4011008##z4011008# [#r#c4011008##k/1]\r\n#v1050100##z1050100# [#r#c1050100##k/1]             #v1051098##z1051098# [#r#c1051098##k/1]\r\n\r\n请输入要合成的数量:\r\n", 1, 1, 1 );
            }else if (beauty == 1) {
                 if (cm.haveItem(4250802, selection) &&cm.haveItem(1050100, selection) &&cm.haveItem(1051098, selection) &&cm.haveItem(4011008, selection)){
					 cm.gainItem(4250802, -selection);
					 cm.gainItem(1050100, -selection);
					 cm.gainItem(1051098, -selection);
					 cm.gainItem(4011008, -selection);
					cm.gainItem(1052498, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
				
            }else if (beauty == 2) {
                 if (cm.haveItem(4250902, selection) &&cm.haveItem(1050100, selection) &&cm.haveItem(1051098, selection) &&cm.haveItem(4011008, selection)){
					 cm.gainItem(4250902, -selection);
					 cm.gainItem(1050100, -selection);
					 cm.gainItem(1051098, -selection);
					 cm.gainItem(4011008, -selection);
					cm.gainItem(1052499, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 3) {
                 if (cm.haveItem(4251102, selection) &&cm.haveItem(1050100, selection) &&cm.haveItem(1051098, selection) &&cm.haveItem(4011008, selection)){
					 cm.gainItem(4251102, -selection);
					 cm.gainItem(1050100, -selection);
					 cm.gainItem(1051098, -selection);
					 cm.gainItem(4011008, -selection);
					cm.gainItem(1052500, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 4) {
                 if (cm.haveItem(4251002, selection) &&cm.haveItem(1050100, selection) &&cm.haveItem(1051098, selection) &&cm.haveItem(4011008, selection)){
					 cm.gainItem(4251002, -selection);
					 cm.gainItem(1050100, -selection);
					 cm.gainItem(1051098, -selection);
					 cm.gainItem(4011008, -selection);
					cm.gainItem(1052501, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 5) {
                 if (cm.haveItem(4251102, selection) &&cm.haveItem(1050100, selection) &&cm.haveItem(1051098, selection) &&cm.haveItem(4011008, selection)){
					 cm.gainItem(4251102, -selection);
					 cm.gainItem(1050100, -selection);
					 cm.gainItem(1051098, -selection);
					 cm.gainItem(4011008, -selection);
					cm.gainItem(1052502, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 6) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1452044, selection) && cm.getPlayer().getMeso() >selection*20000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(1452044, -selection);
					cm.gainMeso(-20000000* selection); //加减金币
					cm.gainItem(1452059, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 7) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1462039, selection) && cm.getPlayer().getMeso() >selection*20000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(1462039, -selection);
					cm.gainMeso(-20000000* selection); //加减金币
					cm.gainItem(1462051, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 8) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1332050, selection) && cm.getPlayer().getMeso() >selection*20000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(1332050, -selection);
					cm.gainMeso(-20000000* selection); //加减金币
					cm.gainItem(1332076, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 9) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1472051, selection) && cm.getPlayer().getMeso() >selection*20000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(1472051, -selection);
					cm.gainMeso(-20000000* selection); //加减金币
					cm.gainItem(1472071, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 10) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1482013, selection) && cm.getPlayer().getMeso() >selection*20000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(1482013, -selection);
					cm.gainMeso(-20000000* selection); //加减金币
					cm.gainItem(1482024, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 11) {
                 if (cm.haveItem(4005004, selection*2) &&cm.haveItem(1492013, selection) && cm.getPlayer().getMeso() >selection*20000000){
					 cm.gainItem(4005004, -selection*2);
					 cm.gainItem(1492013, -selection);
					cm.gainMeso(-20000000* selection); //加减金币
					cm.gainItem(1492025, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}
