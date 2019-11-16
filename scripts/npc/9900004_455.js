
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
            //gsjb += "点券: #r " + cm.getChar().getNX() + " #k   充值币:#r "+cm.getmoneyb()+" #k   豆豆:#r "+cm.getChar().getCashDD()+" \r\n\r\n";
            //gsjb += "#L3##b挂机豆豆兑换#v4001322#(抽奖用)    #b比例为：(#r1000 = 1#b)#l\r\n";
			//gsjb += "#L23#[#r豆豆#k]兑换[#r游戏金币#k]  #b比例 - (#r1 = 500#k)#l\r\n";
            //gsjb += "#L5#[#r充值币#k]#b兑换[货币]#v4000463#  #b比例 - (#r1 = 1#k)#l\r\n";
            //gsjb += "#L10#[#r货币#k]#v4000463#兑换[#r充值币#k]  #b比例 - (#r1 = 1#k)#l\r\n";
            //gsjb += "#L9#[#r点卷#k]兑换#v4000463#[#r货币#k]  #b比例 - (#r1500 = 1#b)#l\r\n";
				 
				
            var gsjb = "";
            gsjb = " #b萌新冒险岛 - #k这里是兑换系统.\r\n#r1人民币 = 2充值币#k\r\n";
            gsjb += "#L9##b临时兑换#v4001028#兑换#v4250602#(#r1 = 1#b)#l\r\n\r\n";
            gsjb += "#L10##b#v4250602#兑换血量#r    #b比例为:(#r1 = 50#b)#l\r\n\r\n";
            gsjb += "#L11#[#r充值币#k]#b兑换[货币]#v4000463#  #b比例 - (#r1 = 1#k)#l\r\n";
            gsjb += "#L12##b#v4000463#[#r货币#k]兑换[#r金币#k]  #b比例 - (#r1 = 150W#b)#l\r\n";
            gsjb += "#L13##b#v4000463#[#r货币#k]兑换[#r点卷#k]  #b比例 - (#r1 = 666#b)#k#l\r\n";
			gsjb += "#L140##b#v4000463#[#r点卷#k]兑换[#r货币#k]  #b比例 - (#r1000 = 1#b)#k#l\r\n";
			gsjb += "#L1##r5货币购买混沌卷轴。#v2049100##z2049100# ×1#l\r\n"//3
			gsjb += "#L2##r5货币购买祝福卷轴。#v2340000##z2340000# ×1#l\r\n"//3
			gsjb += "#L3##r5货币购买宿命剪刀。#v5520000##z5520000# ×1#l\r\n"//3
			gsjb += "#L4##r20货币购买金锤子。#v5570000##z5570000# ×1#l\r\n"//3
			gsjb += "#L6##r10货币购买双倍经验3天权。#v5211047# ×1#l\r\n"//3
			gsjb += "#L7##r30货币购买永久雇佣商人。#v5030001# ×1#l\r\n"//3
			gsjb += "#L8##r200点券购买雇佣商人1天。#v5030001# ×1#l\r\n"//3
			
			
			
			
			
			
			
			
			/*
            //gsjb += "#L12#[#r点卷#k]兑换#v2043003#[#r单手剑必成卷#k]  #b比例 - (#r10000 = 1#k)#l\r\n";
			//gsjb += "#L13#[#r点卷#k]兑换#v2044003#[#r双手剑必成卷#k]  #b比例 - (#r10000 = 1#k)#l\r\n";
			gsjb += "#L14#[#r点卷#k]兑换#v2044303#[#r枪攻击必成卷#k]  #b比例 - (#r10000 = 1#k)#l\r\n";
			gsjb += "#L15#[#r点卷#k]兑换#v2044503#[#r弓攻击必成卷#k]  #b比例 - (#r10000 = 1#k)#l\r\n";
			gsjb += "#L16#[#r点卷#k]兑换#v2044603#[#r弩攻击必成卷#k]  #b比例 - (#r10000 = 1#k)#l\r\n";
			gsjb += "#L17#[#r点卷#k]兑换#v2043303#[#r短剑攻击必成卷#k]  #b比例 - (#r10000 = 1#k)#l\r\n";
			gsjb += "#L18#[#r点卷#k]兑换#v2044703#[#r拳套攻击必成卷#k]  #b比例 - (#r10000 = 1#k)#l\r\n";
			gsjb += "#L19#[#r点卷#k]兑换#v2044815#[#r指节攻击必成卷#k]  #b比例 - (#r10000 = 1#k)#l\r\n";
			gsjb += "#L20#[#r点卷#k]兑换#v2044908#[#r短枪攻击必成卷#k]  #b比例 - (#r10000 = 1#k)#l\r\n";
			gsjb += "#L21#[#r点卷#k]兑换#v2040506#[#r全身敏捷必成卷#k]  #b比例 - (#r10000 = 1#k)#l\r\n";
			gsjb += "#L22#[#r点卷#k]兑换#v2040710#[#r鞋子跳跃必成卷#k]  #b比例 - (#r10000 = 1#k)#l\r\n";
			
			*/
			
            cm.sendSimple(gsjb);
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能参与兑换。");
                cm.dispose();
            }
            if (selection == 0) {
                if (cm.getPlayer().getCSPoints(0) / 500 == 0) {
                    cm.sendNext("您的帐户点卷不足无法兑换国庆纪念币。");
                    status = -1;
                } else {
                    beauty = 1;
                    cm.sendGetNumber("请输入#r点卷#k兑换#b#z4000463##k的数量:\r\n#b比例 - (#r500 = 1#b)\r\n你的账户信息 - \r\n    点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) / 500);

                }

            
            } else if (selection == 1) {
               if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("你的货币不足。");
                    status = -1;
                } else {
                    beauty = 1;
                    cm.sendGetNumber("请输入要兑换#v2049100##z2049100# 的数量。\r\n当前货币: #r#c4000463##k \r\n\r\n\r\n", 1, 1, 10000);

                }
            } else if (selection == 2) {
               if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("你的货币不足。");
                    status = -1;
                } else {
                    beauty = 2;
                    cm.sendGetNumber("请输入要兑换#v2340000##z2340000# 的数量。\r\n当前货币: #r#c4000463##k \r\n\r\n\r\n", 1, 1, 10000);

                }
            } else if (selection == 3) {
               if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("你的货币不足。");
                    status = -1;
                } else {
                    beauty = 3;
                    cm.sendGetNumber("请输入要兑换#v5520000##z5520000# 的数量。\r\n当前货币: #r#c4000463##k \r\n\r\n\r\n", 1, 1, 10000);

                }
            } else if (selection == 4) {
               if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("你的货币不足。");
                    status = -1;
                } else {
                    beauty = 4;
                    cm.sendGetNumber("请输入要兑换#v5570000##z5570000# 的数量。\r\n当前货币: #r#c4000463##k \r\n\r\n\r\n", 1, 1, 10000);

                }
            } else if (selection == 5) {
               if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("你的货币不足。");
                    status = -1;
                } else {
                    beauty = 5;
                    cm.sendGetNumber("请输入要兑换#v1122017##z1122017# 的数量。\r\n当前货币: #r#c4000463##k \r\n\r\n\r\n", 1, 1, 10000);

                }
            }  else if (selection == 6) {
               if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("你的货币不足。");
                    status = -1;
                } else {
                    beauty = 6;
                    cm.sendGetNumber("请输入要兑换#v5211047##z5211047# 的数量。\r\n当前货币: #r#c4000463##k \r\n\r\n\r\n", 1, 1, 1);

                }
            } else if (selection == 7) {
               if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("你的货币不足。");
                    status = -1;
                } else {
                    beauty = 7;
                    cm.sendGetNumber("请输入要兑换#v5030001# 的数量。\r\n当前货币: #r#c4000463##k \r\n\r\n\r\n", 1, 1, 1);

                }
            } else if (selection == 9) {
               if (cm.haveItem(4001028) == 0) {
                    cm.sendNext("你的货币不足。");
                    status = -1;
                } else {
                    beauty = 9;
                    cm.sendGetNumber("请输入要兑换#v4250602# 的数量。\r\n当前货币: #r#v4001028##c4001028##k \r\n\r\n\r\n", 1, 1, 100);

                }
            } else if (selection == 8) {
               if (cm.getPlayer().getCSPoints(1) < 200) {
                    cm.sendNext("你的点券不足。");
                    status = -1;
                } else {
                    beauty = 8;
                    cm.sendGetNumber("请输入要兑换#v5030001# 的数量。\r\n当前点券: #r"+cm.getPlayer().getCSPoints(1)+"#k \r\n\r\n\r\n", 1, 1, 1);

                }
            } else if (selection == 1) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("您的帐户#z4000463#数量不足兑换点卷。");
                    status = -1;
                } else {
                    beauty = 2;
                    cm.sendGetNumber("请输入#b#z4000463##k兑换#r点卷#k的数量:\r\n#b比例 - (#r1 = 500#b)\r\n你的账户信息 - \r\n    点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + "    \r\n", 1, 1, iter.next().getQuantity());

                }
            } else if (selection == 23) {
               // var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4001126).iterator();
                if (cm.getChar().getCashDD() == 0) {
                    cm.sendNext("您的挂机豆豆数量不足兑换.");
                    status = -1;
                } else {
                    beauty = 23;
                    cm.sendGetNumber("请输入豆豆的数量:\r\n#b比例 - (#r1 = 500#b)\r\n  当前豆豆数量: #r" +
                            //cm.getChar().getCashDD() + "   \r\n", 1, 1, iter.next().getQuantity());
                            cm.getChar().getCashDD() + " \r\n", 1, 1, 100000 );

                }

            }else if (selection == 10) {
                //var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4250602).iterator();
                if (cm.haveItem(4250602) == 0) {
					 // cm.gainItem(4250602, +5);
                    cm.sendNext("您的高等黄晶不足兑换.");
                    status = -1;
                } else {
                    beauty = 10;
                   //    cm.sendGetNumber("请输入#r#v4250602##z4250602##k#b#k兑换#rHP#k的数量:\r\n#d比例:(#r1 = 50#d)\r\n你的账户信息 - 当前HP:#r "+cm.getChar().getMaxHp()+" \r\n    当前#r#v4250602##z4250602#拥有数量为: #r#c4250602#   \r\n", 1, 1, iter.next().getQuantity());
     cm.sendGetNumber("请输入#r#v4250602##z4250602##k#b#k兑换#rHP#k的数量:\r\n#d比例:(#r1 = 50#d)\r\n\r\n    当前#r#v4250602##z4250602#拥有数量为: #r#c4250602#   \r\n", 1, 1, 100000);

                }

            }else if (selection == 5) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4031172).iterator();
                if (cm.getmoneyb() < 1) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 5;
                    cm.sendGetNumber("请输入[#r货币#k]的数量:\r\n#b比例为:(#r1 = 1#b)\r\n当前充值币: #r" +
                           cm.getmoneyb() + "   #k\r\n当前点券：#r"+cm.getPlayer().getCSPoints(0), 1, 1, iter.next().getQuantity());

                }

            }else if (selection == 12) {
               // var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 12
                  //  cm.sendGetNumber("请输入[#r货币#k]的数量:\r\n#b比例为:(#r1 = 500W#b)\r\n当前货币: #r #c4000463# 个  #k\r\n当前金币：#r"+ cm.getPlayer().getMeso(),1, 1, iter.next().getQuantity());
   cm.sendGetNumber("请输入兑换的货币数量:\r\n#b比例 - (#r1 = 150W#b)\r\n  当前货币: #r #c4000463# 个 \r\n", 1, 1, 100000 );
                }

            }else if (selection == 7) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("您的国庆币不足兑换.");
                    status = -1;
                } else {
                    beauty = 7
                    cm.sendGetNumber("请输入[#r国庆币#k]的数量:\r\n#b比例为:(#r1 = 1#b)\r\n当前国庆币: #r #c4000463# 个  #k\r\n当前充值币：#r"+ cm.getmoneyb(), 1, 1, iter.next().getQuantity());

                }

            }else if (selection == 13) {
               // var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("您的货币不足兑换.");
                    status = -1;
                } else {
                    beauty = 13
                    cm.sendGetNumber("请输入[#r货币#k]的数量:\r\n#b比例为:(#r1 = 666#b)\r\n当前货币: #r #c4000463# 个 \r\n", 1, 1, 100000 );

                }
				
            }else if (selection == 140) {
               // var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.getPlayer().getCSPoints(1)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 140
                   //   cm.sendGetNumber("请输入兑换#r#z4000463##k的数量:\r\n#b比例 - (#r1500 = 1#b)\r\n你的点卷数量: #r" +
                       //     cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );
 cm.sendGetNumber("请输入兑换#r#z4000463##k的数量:\r\n#b比例 - (#r1000 = 1#b)\r\n你的点卷数量: #r" +cm.getPlayer().getCSPoints(1) + " \r\n", 1, 1, 100000 );

					   
					   
                }

            }else if (selection == 9) {
               // var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.getPlayer().getCSPoints(1)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 9
                   //   cm.sendGetNumber("请输入兑换#r#z4000463##k的数量:\r\n#b比例 - (#r1500 = 1#b)\r\n你的点卷数量: #r" +
                       //     cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );
 cm.sendGetNumber("请输入兑换#r#z4000463##k的数量:\r\n#b比例 - (#r1500 = 1#b)\r\n你的点卷数量: #r" +cm.getPlayer().getCSPoints(1) + " \r\n", 1, 1, 100000 );

					   
					   
                }

            }else if (selection == 10) {
                if (cm.haveItem(4000463) == 0) {
                    cm.sendNext("您的国庆币不足兑换.");
                    status = -1;
                } else {
                    beauty = 10
                    cm.sendGetNumber("请输入[#r国庆币#k]的数量:\r\n#b比例为:(#r1 = 1#b)\r\n当前国庆币: #r #c4000463# 个  #k\r\n当前充值币：#r"+ cm.getmoneyb(), 1, 1, 100000);

                }

            }else if (selection == 11) {
				
               if (cm.getmoneyb() < 1) {
                    cm.sendNext("您的货币不足兑换");
                    status = -1;
                } else {
                    beauty = 11;
                    cm.sendGetNumber("请输入[#r货币#k]的数量:\r\n#b比例为:(#r1 = 1#b)\r\n当前充值币: #r" +
                            cm.getmoneyb() + " \r\n", 1, 1, 200 );
                }

            }else if (selection == 12) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(2044906).iterator();
                if (cm.getPlayer().getCSPoints(0)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 12
                      cm.sendGetNumber("请输入兑换#r#z2043003##k的数量:\r\n#b比例 - (#r10000 = 1#b)\r\n你的点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );

                }

            }else if (selection == 13) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.getPlayer().getCSPoints(0)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 13
                      cm.sendGetNumber("请输入兑换#r#z2044003##k的数量:\r\n#b比例 - (#r10000 = 1#b)\r\n你的点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );

                }

            }else if (selection == 14) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.getPlayer().getCSPoints(0)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 14
                      cm.sendGetNumber("请输入兑换#r#z2044303##k的数量:\r\n#b比例 - (#r10000 = 1#b)\r\n你的点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );

                }

            }else if (selection == 15) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.getPlayer().getCSPoints(0)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 15
                      cm.sendGetNumber("请输入兑换#r#z2044503##k的数量:\r\n#b比例 - (#r10000 = 1#b)\r\n你的点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );

                }

            }else if (selection == 16) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.getPlayer().getCSPoints(0)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 16
                      cm.sendGetNumber("请输入兑换#r#z2044603##k的数量:\r\n#b比例 - (#r10000 = 1#b)\r\n你的点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );

                }

            }else if (selection == 17) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.getPlayer().getCSPoints(0)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 17
                      cm.sendGetNumber("请输入兑换#r#z2043303##k的数量:\r\n#b比例 - (#r10000 = 1#b)\r\n你的点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );

                }

            }else if (selection == 18) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.getPlayer().getCSPoints(0)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 18
                      cm.sendGetNumber("请输入兑换#r#z2044703##k的数量:\r\n#b比例 - (#r10000 = 1#b)\r\n你的点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );

                }

            }else if (selection == 19) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.getPlayer().getCSPoints(0)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 19
                      cm.sendGetNumber("请输入兑换#r#z2044815##k的数量:\r\n#b比例 - (#r10000 = 1#b)\r\n你的点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );

                }

            }else if (selection == 20) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.getPlayer().getCSPoints(0)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 20
                      cm.sendGetNumber("请输入兑换#r#z2044908##k的数量:\r\n#b比例 - (#r10000 = 1#b)\r\n你的点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );

                }

            }else if (selection == 21) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
                if (cm.getPlayer().getCSPoints(0)  == 0) {
                    cm.sendNext("您的点券不足兑换.");
                    status = -1;
                } else {
                    beauty = 21
                      cm.sendGetNumber("请输入兑换#r#z2040506##k的数量:\r\n#b比例 - (#r10000 = 1#b)\r\n你的点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) );

                }

            }else if (selection == 22) {
                var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(4000463).iterator();
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
           if (beauty == 1) {
               if (cm.haveItem(4000463, selection*5)){
					//cm.setmoneyb(-selection*5);  //加减充值币
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(2049100, selection);
                     cm.sendNext("成功兑换了:[#r"+selection+"#k]个#v2049100##z2049100#");
					 cm.dispose();
                } else {
                    cm.sendNext("条件不足无法兑换。");
                    cm.dispose()
                }
            } else if (beauty == 2) {
                if (cm.haveItem(4000463, selection*5)){
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(2340000, selection);
                     cm.sendNext("成功兑换了:[#r"+selection+"#k]个#v2340000##z2340000#");
					 cm.dispose();
                } else {
                    cm.sendNext("条件不足无法兑换。");
                    cm.dispose()
                }

            } else if (beauty == 9) {
                if (cm.haveItem(4001028, selection)){
					 cm.gainItem(4001028, -selection);
					 cm.gainItem(4250602, selection);
                     cm.sendNext("成功兑换了:[#r"+selection+"#k]个#v4250602##z4250602#");
					 cm.dispose();
                } else {
                    cm.sendNext("条件不足无法兑换。");
                    cm.dispose()
                }

            } else if (beauty == 3) {
                if (cm.haveItem(4000463, selection*5)){
					 cm.gainItem(4000463, -selection*5);
					 cm.gainItem(5520000, selection);
                     cm.sendNext("成功兑换了:[#r"+selection+"#k]个#v5520000##z5520000#");
					 cm.dispose();
                } else {
                    cm.sendNext("条件不足无法兑换。");
                    cm.dispose()
                }

            } else if (beauty == 4) {
                if (cm.haveItem(4000463, selection*20)){
					 cm.gainItem(4000463, -selection*20);
					 cm.gainItem(5570000, selection);
                     cm.sendNext("成功兑换了:[#r"+selection+"#k]个#v5570000##z5570000#");
					 cm.dispose();
                } else {
                    cm.sendNext("条件不足无法兑换。");
                    cm.dispose()
                }

            } else if (beauty == 5) {
                if (cm.haveItem(4000463, selection*50)){
					 cm.gainItem(4000463, -selection*50);
					 cm.gainItem(1122017, selection);
                     cm.sendNext("成功兑换了:[#r"+selection+"#k]个#v1122017##z1122017#");
					 cm.dispose();
                } else {
                    cm.sendNext("条件不足无法兑换。");
                    cm.dispose()
                }

            }  else if (beauty == 6) {
                if (cm.haveItem(4000463, selection*10)){
					 cm.gainItem(4000463, -selection*10);
					 cm.gainItem(5211047, selection,3);
                     cm.sendNext("成功兑换了:[#r"+selection+"#k]个#v5211047#，*#r下线或者换线生效。#k");
					 cm.dispose();
                } else {
                    cm.sendNext("条件不足无法兑换。");
                    cm.dispose()
                }
				
			}  else if (beauty == 140) {
                if (cm.getPlayer().getCSPoints(1) >= selection*1000){
					 cm.gainItem(4000463, selection);
					 cm.gainNX(-selection*1000);	//加减点券
                     cm.sendNext("成功兑换了:[#r"+selection+"#k]个#v4000463#。#k");
					 cm.dispose();
                } else {
                    cm.sendNext("条件不足无法兑换。");
                    cm.dispose()
                }

            } else if (beauty == 7) {
                if (cm.haveItem(4000463, selection*30)){
					 cm.gainItem(4000463, -selection*30);
					 cm.gainItem(5030001, selection);
                     cm.sendNext("成功兑换了:[#r"+selection+"#k]个#v5030001#");
					 cm.dispose();
                } else {
                    cm.sendNext("条件不足无法兑换。");
                    cm.dispose()
                }

            } else if (beauty == 8) {
                if (cm.getPlayer().getCSPoints(1) > 199){
					cm.gainNX(-200);	//加减点券
					 cm.gainItem(5030001, 1,1);
                     cm.sendNext("购买成功。");
					 cm.dispose();
                } else {
                    cm.sendNext("条件不足无法兑换。");
                    cm.dispose()
                }

            } 





		   if (beauty == 1) {
                if (selection <= 0) {
                    cm.sendOk("输入的兑换数字错误。");
                    cm.dispose();
                /*
                } else if (selection >= 200) {
                    sl = (selection / 200) + 1;
                } else {
                    sl = 3;
                }

                //if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull()){
                if (cm.getSpace(4) < sl) {
                    cm.sendOk("你的背包“其它”空间不足!请至少有" + sl + "个空间以上.\r\n如果上面有出现小数的话请入位!\r\n如：出现<至少有7.5个空间以上>那么您就需要留8个空间!");
                    cm.dispose();
*/
                } else if (cm.getPlayer().getCSPoints(0) >= selection * 500) {
                    cm.gainNX(-selection * 500);
                    cm.gainItem(4000463, selection);
                    cm.sendOk("您成功将 #r " + (selection * 500) + " #k点卷 兑换成 国庆纪念币#v4000463# x #r" + selection + " #k")
                } else {
                    cm.sendNext("兑换" + selection + "个#z4000463##v4000463# 需要#r " + (selection * 500) + "#k点卷。您没有足够的点卷。");
                    cm.dispose();
                }
            } else if (beauty == 2) {
                if (cm.haveItem(4000463, selection)) {
                    cm.gainItem(4000463, -selection);
                    cm.gainNX(+500 * selection);
                    cm.sendOk("您成功将#z4000463##v4000463# x #r" + selection + " #k换为#r " + (500 * selection) + " #k点卷。");
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换点卷。");
                    cm.dispose();
                }

            }else if (beauty == 10) {
                 if (cm.haveItem(4250602, selection)) {
                    cm.gainItem(4250602, -selection);
					//cm.getChar().setMaxHp(cm.getChar().getMaxHp()+Math.floor(50 * selection));
					//cm.setMaxHP(selection*50)
					cm.setMaxHp(cm.getPlayer().getStat().getMaxHp()+Math.floor(50 * selection));
                    cm.sendOk("您成功将#r#v4250602##z4250602##k x #r" + selection *50  + " #k换为#r  #kHP。#r#e请换线查看!#k#n");
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose();
                }
            }else if (beauty == 5) {
                 if (cm.getmoneyb() >= 1){
					 cm.setmoneyb(-selection);
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose();
                }
				var czb=cm.getmoneyb();
				 if (czb < 0){
					 cm.setmoneyb(+selection);
                    cm.sendNext("您的货币不足，无法兑换。");
                    cm.dispose();
                } else {
                    //cm.gainNX(+1000 * selection);
                    cm.gainItem(4000463, +selection);
                    cm.sendNext("兑换成功。 [#r"+selection+"#k] 充值币兑换了:[#r"+(selection*1)+"#k]个 货币");
                    cm.dispose();
                }
				
				
				
				
				
            }else if (beauty == 12) {
                 if (cm.haveItem(4000463, selection)){
					 cm.gainItem(4000463, -selection);
                    cm.sendNext("兑换成功。 [#r"+selection+"#k] 货币兑换了:[#r"+(selection*150)+"#k]w 金币");
                     cm.gainMeso(+1500000* selection);
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 7) {
                 if (cm.haveItem(4000463, selection)){
					 cm.gainItem(4000463, -selection);
                    cm.sendNext("兑换成功。 [#r"+selection+"#k] 国庆币兑换了:[#r"+(selection*1)+"#k]个 充值币");
                     //cm.gainMeso(+2000000* selection);
					 cm.setmoneyb(+selection);
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 13) {
                 if (cm.haveItem(4000463, selection)){
					 cm.gainItem(4000463, -selection);
                    cm.sendNext("兑换成功。 [#r"+selection+"#k] 货币兑换了:[#r"+(selection*666)+"#k]个 点卷");
                    cm.gainNX(+666 * selection);
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 10) {
                if (cm.haveItem(4000463, selection)){
					 cm.gainItem(4000463, -selection);
					 cm.setmoneyb(+selection);
                    cm.sendNext("兑换成功。 [#r"+selection+"#k] 货币兑换了:[#r"+(selection)+"#k] 充值币");
                    //cm.gainNX(+1000 * selection);
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 11) {
                 if (cm.getmoneyb() >= 1){
					 cm.setmoneyb(-selection);
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose();
                }
				var czb=cm.getmoneyb();
				 if (czb < 0){
					 cm.setmoneyb(+selection);
                    cm.sendNext("您的货币不足，无法兑换。");
                    cm.dispose();
                } else {
                    //cm.gainNX(+1000 * selection);
                    cm.gainItem(4000463, +selection);
                    cm.sendNext("兑换成功。 [#r"+selection+"#k] 充值币兑换了:[#r"+(selection*1)+"#k]个 货币");
                    cm.dispose();
                }
				
            }else if (beauty == 12) {
                 if (cm.getPlayer().getCSPoints(0) >= selection * 10000){
					
                    cm.gainNX(-selection * 10000);
                    cm.gainItem(2043003, selection);
                    cm.sendOk("您成功兑了#v2043003# x #r" + selection + " #k")
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 13) {
                 if (cm.getPlayer().getCSPoints(0) >= selection * 10000){
					
                    cm.gainNX(-selection * 10000);
                    cm.gainItem(2044003, selection);
                    cm.sendOk("您成功兑了#v2044003# x #r" + selection + " #k")
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 14) {
                 if (cm.getPlayer().getCSPoints(0) >= selection * 10000){
					
                    cm.gainNX(-selection * 10000);
                    cm.gainItem(2044303, selection);
                    cm.sendOk("您成功兑了#v2044303# x #r" + selection + " #k")
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 15) {
                 if (cm.getPlayer().getCSPoints(0) >= selection * 10000){
					
                    cm.gainNX(-selection * 10000);
                    cm.gainItem(2044503, selection);
                    cm.sendOk("您成功兑了#v2044303# x #r" + selection + " #k")
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 16) {
                 if (cm.getPlayer().getCSPoints(0) >= selection * 10000){
					
                    cm.gainNX(-selection * 10000);
                    cm.gainItem(2044603, selection);
                    cm.sendOk("您成功兑了#v2044303# x #r" + selection + " #k")
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 17) {
                 if (cm.getPlayer().getCSPoints(0) >= selection * 10000){
					
                    cm.gainNX(-selection * 10000);
                    cm.gainItem(2043303, selection);
                    cm.sendOk("您成功兑了#v2044303# x #r" + selection + " #k")
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 18) {
                 if (cm.getPlayer().getCSPoints(0) >= selection * 10000){
					
                    cm.gainNX(-selection * 10000);
                    cm.gainItem(2044703, selection);
                    cm.sendOk("您成功兑了#v2044303# x #r" + selection + " #k")
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 19) {
                 if (cm.getPlayer().getCSPoints(0) >= selection * 10000){
					
                    cm.gainNX(-selection * 10000);
                    cm.gainItem(2044815, selection);
                    cm.sendOk("您成功兑了#v2044303# x #r" + selection + " #k")
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 20) {
                 if (cm.getPlayer().getCSPoints(0) >= selection * 10000){
					
                    cm.gainNX(-selection * 10000);
                    cm.gainItem(2044908, selection);
                    cm.sendOk("您成功兑了#v2044303# x #r" + selection + " #k")
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 21) {
                 if (cm.getPlayer().getCSPoints(0) >= selection * 10000){
					
                    cm.gainNX(-selection * 10000);
                    cm.gainItem(2040506, selection);
                    cm.sendOk("您成功兑了#v2040506# x #r" + selection + " #k")
					 cm.dispose();
                } else {
                    cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose()
                }
            }else if (beauty == 22) {
                 if (cm.getPlayer().getCSPoints(0) >= selection * 10000){
					
                    cm.gainNX(-selection * 10000);
                    cm.gainItem(2040710, selection);
                    cm.sendOk("您成功兑了#v2040506# x #r" + selection + " #k")
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
