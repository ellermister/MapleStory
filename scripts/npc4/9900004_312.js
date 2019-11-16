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
            var gsjb = "你好，这里可以合成140级武器。\r\n";
            gsjb += "#L1##v1302152##z1302152##l\r\n";
            gsjb += "#L2##v1402095##z1402095##l\r\n";
            gsjb += "#L3##v1432088##z1432088##l\r\n";
            gsjb += "#L4##v1442116##z1442116##l\r\n";
            gsjb += "#L5##v1382104##z1382104##l\r\n";
            gsjb += "#L6##v1452111##z1452111##l\r\n";
            gsjb += "#L7##v1462099##z1462099##l\r\n";
            gsjb += "#L8##v1332130##z1332130##l\r\n";
            gsjb += "#L9##v1472122##z1472122##l\r\n";
            gsjb += "#L10##v1482086##z1482086##l\r\n";
            gsjb += "#L11##v1492085##z1492085##l\r\n";
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
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1302153##z1302153# [#r#c1302153##k/1]  #v4011008##z4011008# [#r#c4011008##k/10]  \r\n#v4000463#货币 × 30\r\n #v4005004##z4005004# [#r#c4005004##k/5] #v4250802##z4250802# [#r#c4250802##k/10] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/50000000]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 2) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 2
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1402096##z1402096# [#r#c1402096##k/1]  #v4011008##z4011008# [#r#c4011008##k/10]  \r\n#v4000463#货币 × 30\r\n #v4005004##z4005004# [#r#c4005004##k/5] #v4250802##z4250802# [#r#c4250802##k/10] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/50000000]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 3) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 3
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1432087##z1432087# [#r#c1432087##k/1]  #v4011008##z4011008# [#r#c4011008##k/10]  \r\n#v4000463#货币 × 30\r\n #v4005004##z4005004# [#r#c4005004##k/5] #v4250802##z4250802# [#r#c4250802##k/10] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/50000000]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 4) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 4
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1442117##z1442117# [#r#c1442117##k/1]  #v4011008##z4011008# [#r#c4011008##k/10]  \r\n#v4000463#货币 × 30\r\n #v4005004##z4005004# [#r#c4005004##k/5] #v4250802##z4250802# [#r#c4250802##k/10] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/50000000]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 5) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 5
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1382105##z1382105# [#r#c1382105##k/1]  #v4011008##z4011008# [#r#c4011008##k/10]  \r\n#v4000463#货币 × 30\r\n #v4005004##z4005004# [#r#c4005004##k/5] #v4250902##z4250902# [#r#c4250902##k/10] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/50000000]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 6) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 6
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1452112##z1452112# [#r#c1452112##k/1]  #v4011008##z4011008# [#r#c4011008##k/10]  \r\n#v4000463#货币 × 30\r\n #v4005004##z4005004# [#r#c4005004##k/5] #v4251102##z4251102# [#r#c4251102##k/10] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/50000000]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 7) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 7
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1462100##z1462100# [#r#c1462100##k/1]  #v4011008##z4011008# [#r#c4011008##k/10]  \r\n#v4000463#货币 × 30\r\n #v4005004##z4005004# [#r#c4005004##k/5] #v4251102##z4251102# [#r#c4251102##k/10] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/50000000]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 8) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 8
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1332131##z1332131# [#r#c1332131##k/1]  #v4011008##z4011008# [#r#c4011008##k/10]  \r\n#v4000463#货币 × 30\r\n #v4005004##z4005004# [#r#c4005004##k/5] #v4251002##z4251002# [#r#c4251002##k/10] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/50000000]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 9) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 9
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1472123##z1472123# [#r#c1472123##k/1]  #v4011008##z4011008# [#r#c4011008##k/10]  \r\n#v4000463#货币 × 30\r\n #v4005004##z4005004# [#r#c4005004##k/5] #v4251002##z4251002# [#r#c4251002##k/10] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/50000000]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 10) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 10
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1482087##z1482087# [#r#c1482087##k/1]  #v4011008##z4011008# [#r#c4011008##k/10]  \r\n#v4000463#货币 × 30\r\n #v4005004##z4005004# [#r#c4005004##k/5] #v4250802##z4250802# [#r#c4250802##k/10] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/50000000]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 11) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 11
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1492086##z1492086# [#r#c1492086##k/1]  #v4011008##z4011008# [#r#c4011008##k/10]  \r\n#v4000463#货币 × 30\r\n #v4005004##z4005004# [#r#c4005004##k/5] #v4251102##z4251102# [#r#c4251102##k/10] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/50000000]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );
                    

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
            }else if (beauty == 1) {
                 if (cm.haveItem(4005004, selection*5) &&cm.haveItem(4250802, selection*10) &&cm.haveItem(4011008, selection*10)&& cm.haveItem(4000463, selection*30)  &&cm.haveItem(1302153, selection) && cm.getPlayer().getMeso() >selection*50000000){
					 cm.gainItem(4011008, -selection*10);
					 cm.gainItem(4005004, -selection*5);
					 cm.gainItem(4250802, -selection*10);
					 cm.gainItem(4000463, -selection*30);
					 cm.gainItem(1302153, -selection);
					cm.gainMeso(-50000000* selection); //加减金币
					cm.gainItem(1302152, selection);
					cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
					cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 2) {
                 if (cm.haveItem(4005004, selection*5) &&cm.haveItem(4250802, selection*10) &&cm.haveItem(4011008, selection*10)&& cm.haveItem(4000463, selection*30)  &&cm.haveItem(1402096, selection) && cm.getPlayer().getMeso() >selection*50000000){
					 cm.gainItem(4011008, -selection*10);
					 cm.gainItem(4005004, -selection*5);
					 cm.gainItem(4250802, -selection*10);
					 cm.gainItem(4000463, -selection*30);
					cm.gainItem(1402096, -selection);
					cm.gainMeso(-50000000* selection); //加减金币
					cm.gainItem(1402095, selection);
					cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
					cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 3) {
                 if (cm.haveItem(4005004, selection*5) &&cm.haveItem(4250802, selection*10) &&cm.haveItem(4011008, selection*10)&& cm.haveItem(4000463, selection*30)  &&cm.haveItem(1432087, selection) && cm.getPlayer().getMeso() >selection*50000000){
					 cm.gainItem(4011008, -selection*10);
					 cm.gainItem(4005004, -selection*5);
					 cm.gainItem(4250802, -selection*10);
					 cm.gainItem(4000463, -selection*30);
					cm.gainItem(1432087, -selection);
					cm.gainMeso(-50000000* selection); //加减金币
					cm.gainItem(1432088, selection);
					cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
					cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 4) {
                 if (cm.haveItem(4005004, selection*5) &&cm.haveItem(4250802, selection*10) &&cm.haveItem(4011008, selection*10)&& cm.haveItem(4000463, selection*30)  &&cm.haveItem(1442117, selection) && cm.getPlayer().getMeso() >selection*50000000){
					 cm.gainItem(4011008, -selection*10);
					 cm.gainItem(4005004, -selection*5);
					 cm.gainItem(4250802, -selection*10);
					 cm.gainItem(4000463, -selection*30);
					cm.gainItem(1442117, -selection);
					cm.gainMeso(-50000000* selection); //加减金币
					cm.gainItem(1442116, selection);
					cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
					cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 5) {
                 if (cm.haveItem(4005004, selection*5) &&cm.haveItem(4250902, selection*10) &&cm.haveItem(4011008, selection*10)&& cm.haveItem(4000463, selection*30)  &&cm.haveItem(1382105, selection) && cm.getPlayer().getMeso() >selection*50000000){
					 cm.gainItem(4011008, -selection*10);
					 cm.gainItem(4005004, -selection*5);
					 cm.gainItem(4250902, -selection*10);
					 cm.gainItem(4000463, -selection*30);
					cm.gainItem(1382105, -selection);
					cm.gainMeso(-50000000* selection); //加减金币
					cm.gainItem(1382104, selection);
					cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
					cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 6) {
                 if (cm.haveItem(4005004, selection*5) &&cm.haveItem(4251102, selection*10) &&cm.haveItem(4011008, selection*10)&& cm.haveItem(4000463, selection*30)  &&cm.haveItem(1452112, selection) && cm.getPlayer().getMeso() >selection*50000000){
					 cm.gainItem(4011008, -selection*10);
					 cm.gainItem(4005004, -selection*5);
					 cm.gainItem(4251102, -selection*10);
					 cm.gainItem(4000463, -selection*30);
					cm.gainItem(1452112, -selection);
					cm.gainMeso(-50000000* selection); //加减金币
					cm.gainItem(1452111, selection);
					cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
					cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 7) {
                 if (cm.haveItem(4005004, selection*5) &&cm.haveItem(4251102, selection*10) &&cm.haveItem(4011008, selection*10)&& cm.haveItem(4000463, selection*30)  &&cm.haveItem(1462100, selection) && cm.getPlayer().getMeso() >selection*50000000){
					 cm.gainItem(4011008, -selection*10);
					 cm.gainItem(4005004, -selection*5);
					 cm.gainItem(4251102, -selection*10);
					 cm.gainItem(4000463, -selection*30);
					cm.gainItem(1462100, -selection);
					cm.gainMeso(-50000000* selection); //加减金币
					cm.gainItem(1462099, selection);
					cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
					cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 8) {
                 if (cm.haveItem(4005004, selection*5) &&cm.haveItem(4251002, selection*10) &&cm.haveItem(4011008, selection*10)&& cm.haveItem(4000463, selection*30)  &&cm.haveItem(1332131, selection) && cm.getPlayer().getMeso() >selection*50000000){
					 cm.gainItem(4011008, -selection*10);
					 cm.gainItem(4005004, -selection*5);
					 cm.gainItem(4251002, -selection*10);
					 cm.gainItem(4000463, -selection*30);
					cm.gainItem(1332131, -selection);
					cm.gainMeso(-50000000* selection); //加减金币
					cm.gainItem(1332130, selection);
					cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
					cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 9) {
                 if (cm.haveItem(4005004, selection*5) &&cm.haveItem(4251002, selection*10) &&cm.haveItem(4011008, selection*10)&& cm.haveItem(4000463, selection*30)  &&cm.haveItem(1472123, selection) && cm.getPlayer().getMeso() >selection*50000000){
					 cm.gainItem(4011008, -selection*10);
					 cm.gainItem(4005004, -selection*5);
					 cm.gainItem(4251002, -selection*10);
					 cm.gainItem(4000463, -selection*30);
					cm.gainItem(1472123, -selection);
					cm.gainMeso(-50000000* selection); //加减金币
					cm.gainItem(1472122, selection);
					cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
					cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 10) {
                 if (cm.haveItem(4005004, selection*5) &&cm.haveItem(4250802, selection*10) &&cm.haveItem(4011008, selection*10)&& cm.haveItem(4000463, selection*30)  &&cm.haveItem(1482087, selection) && cm.getPlayer().getMeso() >selection*50000000){
					 cm.gainItem(4011008, -selection*10);
					 cm.gainItem(4005004, -selection*5);
					 cm.gainItem(4250802, -selection*10);
					 cm.gainItem(4000463, -selection*30);
					cm.gainItem(1482087, -selection);
					cm.gainMeso(-50000000* selection); //加减金币
					cm.gainItem(1482086, selection);
					cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
					cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 11) {
                 if (cm.haveItem(4005004, selection*5) &&cm.haveItem(4251102, selection*10) &&cm.haveItem(4011008, selection*10)&& cm.haveItem(4000463, selection*30)  &&cm.haveItem(1492086, selection) && cm.getPlayer().getMeso() >selection*50000000){
					 cm.gainItem(4011008, -selection*10);
					 cm.gainItem(4005004, -selection*5);
					 cm.gainItem(4251102, -selection*10);
					 cm.gainItem(4000463, -selection*30);
					cm.gainItem(1492086, -selection);
					cm.gainMeso(-50000000* selection); //加减金币
					cm.gainItem(1492085, selection);
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


