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
            var gsjb = "你好，这里可以合成160级武器。\r\n";
            gsjb += "#L1##v1302333##z1302333##l\r\n";
            gsjb += "#L2##v1402251##z1402251##l\r\n";
            gsjb += "#L3##v1432214##z1432214##l\r\n";
            gsjb += "#L4##v1442268##z1442268##l\r\n";
            gsjb += "#L5##v1372222##z1372222##l\r\n";
            gsjb += "#L6##v1452252##z1452252##l\r\n";
            gsjb += "#L7##v1462239##z1462239##l\r\n";
            gsjb += "#L8##v1332274##z1332274##l\r\n";
            gsjb += "#L9##v1472261##z1472261##l\r\n";
            gsjb += "#L10##v1482216##z1482216##l\r\n";
            gsjb += "#L11##v1492231##z1492231##l\r\n";
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
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1302275##z1302275# [#r#c1302275##k/1]      #v4011008##z4011008# [#r#c4011008##k/30]  \r\n#v4251202##z4251202# [#r#c4251202##k/20]      #v4005004##z4005004# [#r#c4005004##k/50]\r\n#v4031236##z4031236# [#r#c4031236##k/35]  #v4001158##z4001158# [#r#c4001158##k/20] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/400000000]  #v4031217##z4031217# [#r#c4031217##k/10]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 2) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 2
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1402196##z1402196# [#r#c1402196##k/1]      #v4011008##z4011008# [#r#c4011008##k/30]  \r\n#v4251202##z4251202# [#r#c4251202##k/20]      #v4005004##z4005004# [#r#c4005004##k/50]\r\n#v4031236##z4031236# [#r#c4031236##k/35]  #v4001158##z4001158# [#r#c4001158##k/20] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/400000000]  #v4031217##z4031217# [#r#c4031217##k/10]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 3) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 3
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1432167##z1432167# [#r#c1432167##k/1]       #v4011008##z4011008# [#r#c4011008##k/30]  \r\n#v4251202##z4251202# [#r#c4251202##k/20]       #v4005004##z4005004# [#r#c4005004##k/50]\r\n#v4031236##z4031236# [#r#c4031236##k/35]   #v4001158##z4001158# [#r#c4001158##k/20] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/400000000]  #v4031217##z4031217# [#r#c4031217##k/10]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 4) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 4
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1442223##z1442223# [#r#c1442223##k/1]      #v4011008##z4011008# [#r#c4011008##k/30]  \r\n#v4251202##z4251202# [#r#c4251202##k/20]      #v4005004##z4005004# [#r#c4005004##k/50]\r\n#v4031236##z4031236# [#r#c4031236##k/35]  #v4001158##z4001158# [#r#c4001158##k/20] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/400000000]  #v4031217##z4031217# [#r#c4031217##k/10]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 5) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 5
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1382208##z1382208# [#r#c1382208##k/1]      #v4011008##z4011008# [#r#c4011008##k/30]  \r\n#v4251202##z4251202# [#r#c4251202##k/20]      #v4005004##z4005004# [#r#c4005004##k/50]\r\n#v4031236##z4031236# [#r#c4031236##k/35]  #v4001158##z4001158# [#r#c4001158##k/20] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/400000000]  #v4031217##z4031217# [#r#c4031217##k/10]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 6) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 6
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1452205##z1452205# [#r#c1452205##k/1]      #v4011008##z4011008# [#r#c4011008##k/30]  \r\n#v4251202##z4251202# [#r#c4251202##k/20]      #v4005004##z4005004# [#r#c4005004##k/50]\r\n#v4031236##z4031236# [#r#c4031236##k/35]  #v4001158##z4001158# [#r#c4001158##k/20] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/400000000]  #v4031217##z4031217# [#r#c4031217##k/10]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 7) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 7
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1462193##z1462193# [#r#c1462193##k/1]      #v4011008##z4011008# [#r#c4011008##k/30]  \r\n#v4251202##z4251202# [#r#c4251202##k/20]      #v4005004##z4005004# [#r#c4005004##k/50]\r\n#v4031236##z4031236# [#r#c4031236##k/35]  #v4001158##z4001158# [#r#c4001158##k/20] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/400000000]  #v4031217##z4031217# [#r#c4031217##k/10]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 8) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 8
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1332225##z1332225# [#r#c1332225##k/1]      #v4011008##z4011008# [#r#c4011008##k/30]  \r\n#v4251202##z4251202# [#r#c4251202##k/20]      #v4005004##z4005004# [#r#c4005004##k/50]\r\n#v4031236##z4031236# [#r#c4031236##k/35]  #v4001158##z4001158# [#r#c4001158##k/20] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/400000000]  #v4031217##z4031217# [#r#c4031217##k/10]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 9) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 9
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1472214##z1472214# [#r#c1472214##k/1]      #v4011008##z4011008# [#r#c4011008##k/30]  \r\n#v4251202##z4251202# [#r#c4251202##k/20]      #v4005004##z4005004# [#r#c4005004##k/50]\r\n#v4031236##z4031236# [#r#c4031236##k/35]  #v4001158##z4001158# [#r#c4001158##k/20] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/400000000]  #v4031217##z4031217# [#r#c4031217##k/10]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 10) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 10
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1482216##z1482216# [#r#c1482216##k/1]      #v4011008##z4011008# [#r#c4011008##k/30]  \r\n#v4251202##z4251202# [#r#c4251202##k/20]      #v4005004##z4005004# [#r#c4005004##k/50]\r\n#v4031236##z4031236# [#r#c4031236##k/35]  #v4001158##z4001158# [#r#c4001158##k/20] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/400000000]  #v4031217##z4031217# [#r#c4031217##k/10]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );

                }

            }else if (selection == 11) {
                    if (1<0) {
                    cm.sendOk("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 11
                    cm.sendGetNumber("			   #v2022359#合成需要材料如下#v2022359#\r\n#v1492179##z1492179# [#r#c1492179##k/1]      #v4011008##z4011008# [#r#c4011008##k/30]  \r\n#v4251202##z4251202# [#r#c4251202##k/20]      #v4005004##z4005004# [#r#c4005004##k/50]\r\n#v4031236##z4031236# [#r#c4031236##k/35]  #v4001158##z4001158# [#r#c4001158##k/20] \r\n#v4031138#金币[#r"+cm.getPlayer().getMeso()+"#k/400000000]  #v4031217##z4031217# [#r#c4031217##k/10]\r\n请输入要合成的数量:\r\n", 1, 1, 1 );
                    

                }

            }
               


			
			
			
			
			
        } else if (status == 2) {
            if (beauty == 0) {
               if (cm.haveItem(4004004, selection*10)&& cm.haveItem(4001126, selection*10)){
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
                 if (cm.haveItem(4031236, selection*35) && cm.haveItem(4001158, selection*20) && cm.haveItem(4005004, selection*50) && cm.haveItem(4031217, selection*10) && cm.haveItem(4011008, selection*30) && cm.haveItem(4251202, selection*20) && cm.haveItem(1302275, selection) && cm.getPlayer().getMeso() >selection*400000000){
					 cm.gainItem(4031236, -selection*35);
					 cm.gainItem(4001158, -selection*20);
					 cm.gainItem(4005004, -selection*50);
					 cm.gainItem(4031217, -selection*10);
					 cm.gainItem(4011008, -selection*30);
					 cm.gainItem(4251202, -selection*20);
					 cm.gainItem(1302275, -selection);
					cm.gainMeso(-400000000* selection); //加减金币
					cm.gainItem(1302333, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 2) {
                 if (cm.haveItem(4031236, selection*35) && cm.haveItem(4001158, selection*20) && cm.haveItem(4005004, selection*50) && cm.haveItem(4031217, selection*10) && cm.haveItem(4011008, selection*30) && cm.haveItem(4251202, selection*20) && cm.haveItem(1402196, selection) && cm.getPlayer().getMeso() >selection*400000000){
					 cm.gainItem(4031236, -selection*35);
					 cm.gainItem(4001158, -selection*20);
					 cm.gainItem(4005004, -selection*50);
					 cm.gainItem(4031217, -selection*10);
					 cm.gainItem(4011008, -selection*30);
					 cm.gainItem(4251202, -selection*20);
					cm.gainItem(1402196, -selection);
					cm.gainMeso(-400000000* selection); //加减金币
					cm.gainItem(1402251, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 3) {
                 if (cm.haveItem(4031236, selection*35) && cm.haveItem(4001158, selection*20) && cm.haveItem(4005004, selection*50) && cm.haveItem(4031217, selection*10) && cm.haveItem(4011008, selection*30) && cm.haveItem(4251202, selection*20) && cm.haveItem(1432167, selection) && cm.getPlayer().getMeso() >selection*400000000){
					 cm.gainItem(4031236, -selection*35);
					 cm.gainItem(4001158, -selection*20);
					 cm.gainItem(4005004, -selection*50);
					 cm.gainItem(4031217, -selection*10);
					 cm.gainItem(4011008, -selection*30);
					 cm.gainItem(4251202, -selection*20);
					cm.gainItem(1432167, -selection);
					cm.gainMeso(-400000000* selection); //加减金币
					cm.gainItem(1432214, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 4) {
                 if (cm.haveItem(4031236, selection*35) && cm.haveItem(4001158, selection*20) && cm.haveItem(4005004, selection*50) && cm.haveItem(4031217, selection*10) && cm.haveItem(4011008, selection*30) && cm.haveItem(4251202, selection*20) && cm.haveItem(1442223, selection) && cm.getPlayer().getMeso() >selection*400000000){
					 cm.gainItem(4031236, -selection*35);
					 cm.gainItem(4001158, -selection*20);
					 cm.gainItem(4005004, -selection*50);
					 cm.gainItem(4031217, -selection*10);
					 cm.gainItem(4011008, -selection*30);
					 cm.gainItem(4251202, -selection*20);
					cm.gainItem(1442223, -selection);
					cm.gainMeso(-400000000* selection); //加减金币
					cm.gainItem(1442268, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 5) {
                 if (cm.haveItem(4031236, selection*35) && cm.haveItem(4001158, selection*20) && cm.haveItem(4005004, selection*50) && cm.haveItem(4031217, selection*10) && cm.haveItem(4011008, selection*30) && cm.haveItem(4251202, selection*20) && cm.haveItem(1382208, selection) && cm.getPlayer().getMeso() >selection*400000000){
					 cm.gainItem(4031236, -selection*35);
					 cm.gainItem(4001158, -selection*20);
					 cm.gainItem(4005004, -selection*50);
					 cm.gainItem(4031217, -selection*10);
					 cm.gainItem(4011008, -selection*30);
					 cm.gainItem(4251202, -selection*20);
					cm.gainItem(1382208, -selection);
					cm.gainMeso(-400000000* selection); //加减金币
					cm.gainItem(1372222, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 6) {
                 if (cm.haveItem(4031236, selection*35) && cm.haveItem(4001158, selection*20) && cm.haveItem(4005004, selection*50) && cm.haveItem(4031217, selection*10) && cm.haveItem(4011008, selection*30) && cm.haveItem(4251202, selection*20) && cm.haveItem(1452205, selection) && cm.getPlayer().getMeso() >selection*400000000){
					 cm.gainItem(4031236, -selection*35);
					 cm.gainItem(4001158, -selection*20);
					 cm.gainItem(4005004, -selection*50);
					 cm.gainItem(4031217, -selection*10);
					 cm.gainItem(4011008, -selection*30);
					 cm.gainItem(4251202, -selection*20);
					cm.gainItem(1452205, -selection);
					cm.gainMeso(-400000000* selection); //加减金币
					cm.gainItem(1452252, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 7) {
                 if (cm.haveItem(4031236, selection*35) && cm.haveItem(4001158, selection*20) && cm.haveItem(4005004, selection*50) && cm.haveItem(4031217, selection*10) && cm.haveItem(4011008, selection*30) && cm.haveItem(4251202, selection*20) && cm.haveItem(1462193, selection) && cm.getPlayer().getMeso() >selection*400000000){
					 cm.gainItem(4031236, -selection*35);
					 cm.gainItem(4001158, -selection*20);
					 cm.gainItem(4005004, -selection*50);
					 cm.gainItem(4031217, -selection*10);
					 cm.gainItem(4011008, -selection*30);
					 cm.gainItem(4251202, -selection*20);
					cm.gainItem(1462193, -selection);
					cm.gainMeso(-400000000* selection); //加减金币
					cm.gainItem(1462239, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 8) {
                 if (cm.haveItem(4031236, selection*35) && cm.haveItem(4001158, selection*20) && cm.haveItem(4005004, selection*50) && cm.haveItem(4031217, selection*10) && cm.haveItem(4011008, selection*30) && cm.haveItem(4251202, selection*20) && cm.haveItem(1332225, selection) && cm.getPlayer().getMeso() >selection*400000000){
					 cm.gainItem(4031236, -selection*35);
					 cm.gainItem(4001158, -selection*20);
					 cm.gainItem(4005004, -selection*50);
					 cm.gainItem(4031217, -selection*10);
					 cm.gainItem(4011008, -selection*30);
					 cm.gainItem(4251202, -selection*20);
					cm.gainItem(1332225, -selection);
					cm.gainMeso(-400000000* selection); //加减金币
					cm.gainItem(1332274, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 9) {
                 if (cm.haveItem(4031236, selection*35) && cm.haveItem(4001158, selection*20) && cm.haveItem(4005004, selection*50) && cm.haveItem(4031217, selection*10) && cm.haveItem(4011008, selection*30) && cm.haveItem(4251202, selection*20) && cm.haveItem(1472214, selection) && cm.getPlayer().getMeso() >selection*400000000){
					 cm.gainItem(4031236, -selection*35);
					 cm.gainItem(4001158, -selection*20);
					 cm.gainItem(4005004, -selection*50);
					 cm.gainItem(4031217, -selection*10);
					 cm.gainItem(4011008, -selection*30);
					 cm.gainItem(4251202, -selection*20);
					cm.gainItem(1472214, -selection);
					cm.gainMeso(-400000000* selection); //加减金币
					cm.gainItem(1472261, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 10) {
                 if (cm.haveItem(4031236, selection*35) && cm.haveItem(4001158, selection*20) && cm.haveItem(4005004, selection*50) && cm.haveItem(4031217, selection*10) && cm.haveItem(4011008, selection*30) && cm.haveItem(4251202, selection*20) && cm.haveItem(1482168, selection) && cm.getPlayer().getMeso() >selection*400000000){
					 cm.gainItem(4031236, -selection*35);
					 cm.gainItem(4001158, -selection*20);
					 cm.gainItem(4005004, -selection*50);
					 cm.gainItem(4031217, -selection*10);
					 cm.gainItem(4011008, -selection*30);
					 cm.gainItem(4251202, -selection*20);
					cm.gainItem(1482168, -selection);
					cm.gainMeso(-400000000* selection); //加减金币
					cm.gainItem(1482216, selection);
                    cm.sendOk("合成物品成功！");
					cm.dispose();
                } else {
                    cm.sendOk("未达到合成需求无法合成，请检查合成需要的东西。");
                    cm.dispose()
                }
            }else if (beauty == 11) {
                 if (cm.haveItem(4031236, selection*35) && cm.haveItem(4001158, selection*20) && cm.haveItem(4005004, selection*50) && cm.haveItem(4031217, selection*10) && cm.haveItem(4011008, selection*30) && cm.haveItem(4251202, selection*20) && cm.haveItem(1492179, selection) && cm.getPlayer().getMeso() >selection*400000000){
					 cm.gainItem(4031236, -selection*35);
					 cm.gainItem(4001158, -selection*20);
					 cm.gainItem(4005004, -selection*50);
					 cm.gainItem(4031217, -selection*10);
					 cm.gainItem(4011008, -selection*30);
					 cm.gainItem(4251202, -selection*20);
					cm.gainItem(1492179, -selection);
					cm.gainMeso(-400000000* selection); //加减金币
					cm.gainItem(1492231, selection);
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
