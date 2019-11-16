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
				 
				 
		/*	if (cm.getLevel() < 200){
                cm.sendOk("测试中。");
				cm.safeDispose(); //结束脚本
			}	*/
            var gsjb = "";
            gsjb = "#r请寻找各种矿石，来制作#v4011008##z4011008#！\r\n";
            gsjb += "#r使用矿石大家族打造一个锂母矿需要1个小矿石。\r\n#k#v4010000##v4010001##v4010002##v4010003##v4010004##v4010005##v4010006#\r\n#v4020000##v4020001##v4020002##v4020003##v4020004##v4020005##v4020006##v4020007##v4020008#\r\n#L1#查询当前拥有的小矿石#l\r\n\r\n打造一个锂#v4011008#需要200个#v4010007#\r\n#L2#查询当前拥有的锂母矿#l\r\n";
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

            
            }else if (selection == 1) {
					z1 = cm.getPlayer().getItemQuantity(4010000, false);
					z2 = cm.getPlayer().getItemQuantity(4010001, false);
					z3 = cm.getPlayer().getItemQuantity(4010002, false);
					z4 = cm.getPlayer().getItemQuantity(4010003, false);
					z5 = cm.getPlayer().getItemQuantity(4010004, false);
					z6 = cm.getPlayer().getItemQuantity(4010005, false);
					z7 = cm.getPlayer().getItemQuantity(4010006, false);
					z8 = cm.getPlayer().getItemQuantity(4020000, false);
					z9 = cm.getPlayer().getItemQuantity(4020001, false);
					z10 = cm.getPlayer().getItemQuantity(4020002, false);
					z11 = cm.getPlayer().getItemQuantity(4020003, false);
					z12 = cm.getPlayer().getItemQuantity(4020004, false);
					z13 = cm.getPlayer().getItemQuantity(4020005, false);
					z14 = cm.getPlayer().getItemQuantity(4020006, false);
					z15 = cm.getPlayer().getItemQuantity(4020007, false);
					z16 = cm.getPlayer().getItemQuantity(4020008, false);
					var zliang = z1 + z2 + z3 + z4 + z5 + z6 + z7 + z8 + z9 +z10 +z11 +z12 +z13 +z14 +z15 +z16;
				
                if (zliang == 0) {
                    cm.sendNext("你的物品不足兑换.");
                    status = -1;
                } else {
                    beauty = 1
					//cm.sendGetNumber("请输入数量:\r\n#b比例 - (#r1 = 1000#b)\r\n#v4000000##v4000016##v4000010##v4000004##v4000011##v4000001##v4000003##v4000012#当前数量共: "+zliang+"个#r \r\n", 1, 1, 100000 ); 
					cm.sendYesNo("#v4010000##v4010001##v4010002##v4010003##v4010004##v4010005##v4010006##v4020000##v4020001##v4020002##v4020003##v4020004##v4020005##v4020006##v4020007##v4020008#\r\n兑换比例: 每#r1#k个 = #r1#k 个锂母矿#v4010007#合成费每个：#r1W金币#k\r\n当前共有: #r"+zliang+"#k 个小矿石.是否全部兑换成锂母矿#v4010007#");
					}

            }else if (selection == 2) {
					z1 = cm.getPlayer().getItemQuantity(4010007, false);
					var zliang = z1;
				
                if (zliang == 0) {
                    cm.sendNext("你的物品不足兑换.");
                    status = -1;
                } else {
                    beauty = 2
					//cm.sendGetNumber("请输入数量:\r\n#b比例 - (#r1 = 1000#b)\r\n#v4000000##v4000016##v4000010##v4000004##v4000011##v4000001##v4000003##v4000012#当前数量共: "+zliang+"个#r \r\n", 1, 1, 100000 ); 
					//cm.sendYesNo("每#r200#k个#v4010007#可以提炼成#r1#k个#v4011008#\r\n当前拥有: #r"+zliang+"#k 个锂母矿.是否提炼成成锂#v4011008#？");
                    cm.sendGetNumber("每#r200#k个#v4010007#可以提炼成#r1#k个#v4011008# 合成费每个：#r100W金币\r\n当前拥有: #r"+zliang+"#k 个锂母矿.需要提炼成多少个锂#v4011008#？\r\n", 1, 1, 100000 );
					}

            }


        } else if (status == 2) {
            if (beauty == 1) {
					z1 = cm.getPlayer().getItemQuantity(4010000, false);
					z2 = cm.getPlayer().getItemQuantity(4010001, false);
					z3 = cm.getPlayer().getItemQuantity(4010002, false);
					z4 = cm.getPlayer().getItemQuantity(4010003, false);
					z5 = cm.getPlayer().getItemQuantity(4010004, false);
					z6 = cm.getPlayer().getItemQuantity(4010005, false);
					z7 = cm.getPlayer().getItemQuantity(4010006, false);
					z8 = cm.getPlayer().getItemQuantity(4020000, false);
					z9 = cm.getPlayer().getItemQuantity(4020001, false);
					z10 = cm.getPlayer().getItemQuantity(4020002, false);
					z11 = cm.getPlayer().getItemQuantity(4020003, false);
					z12 = cm.getPlayer().getItemQuantity(4020004, false);
					z13 = cm.getPlayer().getItemQuantity(4020005, false);
					z14 = cm.getPlayer().getItemQuantity(4020006, false);
					z15 = cm.getPlayer().getItemQuantity(4020007, false);
					z16 = cm.getPlayer().getItemQuantity(4020008, false);
					var zliang = z1 + z2 + z3 + z4 + z5 + z6 + z7 + z8 + z9 +z10 +z11 +z12 +z13 +z14 +z15 +z16;
                if (zliang > 0){
					cm.removeAll(4010000);  //清楚物品所有数目
					cm.removeAll(4010001);  //清楚物品所有数目
					cm.removeAll(4010002);  //清楚物品所有数目
					cm.removeAll(4010003);  //清楚物品所有数目
					cm.removeAll(4010004);  //清楚物品所有数目
					cm.removeAll(4010005);  //清楚物品所有数目
					cm.removeAll(4010006);  //清楚物品所有数目
					cm.removeAll(4020000);  //清楚物品所有数目
					cm.removeAll(4020001);  //清楚物品所有数目
					cm.removeAll(4020002);  //清楚物品所有数目
					cm.removeAll(4020003);  //清楚物品所有数目
					cm.removeAll(4020004);  //清楚物品所有数目
					cm.removeAll(4020005);  //清楚物品所有数目
					cm.removeAll(4020006);  //清楚物品所有数目
					cm.removeAll(4020007);  //清楚物品所有数目
					cm.removeAll(4020008);  //清楚物品所有数目
					cm.gainItem(4010007,zliang);
					cm.gainMeso(-10000* zliang); //加减金币
					cm.sendOk("兑换成功。共兑换了:[#r"+(zliang)+"#k] 个锂母矿。");
					cm.worldMessage(6,"玩家：["+cm.getName()+"]努力寻找矿石，在一护那里兑换了："+(zliang)+" 个锂母矿。");
					cm.dispose();
                } else {
					cm.sendOk("您的物品不足，无法兑换。");
                    cm.dispose()
                }
            } 
			if (beauty == 2) {
               if (cm.haveItem(4010007, selection*200)){
					 cm.gainItem(4010007, -selection*200);
					 cm.gainItem(4011008, selection);
					cm.gainMeso(-1000000* selection); //加减金币
					 cm.sendOk("兑换成功。共兑换了:[#r"+(selection)+"#k] 个锂。");
					 cm.worldMessage(6,"玩家：["+cm.getName()+"]努力寻找矿石，在一护那里兑换了："+(selection)+" 个锂。");
					 cm.dispose();
                } else {
					cm.sendOk("您的物品不足，无法兑换。");
                    cm.dispose()
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}

