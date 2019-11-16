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
				 
               if (cm.haveItem(4200007, 1)){
				cm.sendOk("你是个可疑的人，不允许打开兑换。");
				cm.dispose();    
			   }
               if (cm.haveItem(5220006, 1)){
				cm.sendOk("你是个可疑的人，不允许打开兑换。");
				cm.dispose();    
			   }
				 
            var gsjb = "";
            gsjb = "你为什么那么弱，因为你的憎恨，还不够深。\r\n\r\n";
            gsjb += "#L4##b制作#v4031217##b#l\r\n";
            gsjb += "#L1##b#v4031196##z4031196# 兑换#v4001322# #b比例 - (#r1 = 1#b)#l\r\n";
            gsjb += "#L8##b#v4001085##z4001085# 兑换#v4001322# #b比例 - (#r1 = 1#b)#l\r\n";
            gsjb += "#L6##b#v4001080##z4001080# 兑换#v4001323# #b比例 - (#r1 = 1#b)#l\r\n";
           // gsjb += "#L2##b#v4001241##z4001241# 兑换#v4170016# #b比例 - (#r1 = 2#b)#l\r\n";
           // gsjb += "#L3##b#v4001242##z4001242# 兑换#v4170016# #b比例 - (#r1 = 2#b)#l\r\n";
            gsjb += "#L7##b#v4001083##z4001083# 兑换#v4170016# #b比例 - (#r1 = 2#b)#l\r\n";
            gsjb += "#L9##b#v4001430##z4001430# 兑换#v4170016# #b比例 - (#r1 = 5#b)#l\r\n";
            gsjb += "#L5##b#v2041200##z2041200# 兑换 #v2340000##v2049100# x1#l\r\n";
            cm.sendSimple(gsjb);
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能参与兑换。");
                cm.dispose();
            }
            if (selection == 0) {
                if (cm.getPlayer().getCSPoints(0) / 500 == 0) {
                    cm.sendOk("您的帐户点卷不足无法兑换国庆纪念币。");
                    status = -1;
                } else {
                    beauty = 1;
                    cm.sendGetNumber("请输入#r点卷#k兑换#b#z4000463##k的数量:\r\n#b比例 - (#r500 = 1#b)\r\n你的账户信息 - \r\n    点卷数量: #r" +
                            cm.getPlayer().getCSPoints(0) + " \r\n", 1, 1, cm.getPlayer().getCSPoints(0) / 500);

                }

            
            } else if (selection == 1) {
                if (cm.haveItem(4031196) == 0) {
                    cm.sendOk("你的物品不足兑换.");
                    status = -1;
                } else {
                    beauty = 1
           cm.sendGetNumber("请输入数量:\r\n#b比例 - (#r1 = 1#b)\r\n  当前拥有数量: #c4031196# 个#r \r\n", 1, 1, 100000 ); }

            } else if (selection == 2) {
                if (cm.haveItem(4001241) == 0) {
                    cm.sendOk("你的物品不足兑换.");
                    status = -1;
                } else {
                    beauty = 2
           cm.sendGetNumber("请输入数量:\r\n#b比例 - (#r1 = 2#b)\r\n  当前拥有数量: #c4001241# 个#r \r\n", 1, 1, 100000 ); }

            } else if (selection == 3) {
                if (cm.haveItem(4001242) == 0) {
                    cm.sendOk("你的物品不足兑换.");
                    status = -1;
                } else {
                    beauty = 3
           cm.sendGetNumber("请输入数量:\r\n#b比例 - (#r1 = 2#b)\r\n  当前拥有数量: #c4001242# 个#r \r\n", 1, 1, 100000 ); }

            } else if (selection == 4) {
                if (1 < 0) {
                    cm.sendOk("你的物品不足兑换.");
                    status = -1;
                } else {
                    beauty = 4
           cm.sendGetNumber("请输入数量:\r\n#b比例 - (#r1 = 1#b)\r\n  需要:#v4000235##v4000243##v4000175##v4001080##v4001083##v4001084##v4001085#各×1 #r \r\n", 1, 1, 100000 ); }

            } else if (selection == 5) {
                if (cm.haveItem(2041200) == 0){
                    cm.sendOk("你的物品不足兑换.");
                    status = -1;
                } else {
                    beauty = 5
           cm.sendGetNumber("请输入数量:\r\n#b比例 - (#r1 = 1#b)\r\n  当前拥有数量: #c2041200# 个#r \r\n", 1, 1, 1 ); }


            } else if (selection == 6) {
                if (cm.haveItem(4001080) == 0) {
                    cm.sendOk("你的物品不足兑换.");
                    status = -1;
                } else {
                    beauty = 6
           cm.sendGetNumber("请输入数量:\r\n#b比例 - (#r1 = 1#b)\r\n  当前拥有数量: #c4001080# 个#r \r\n", 1, 1, 100000 ); }


            } else if (selection == 7) {
                cm.sendOk("请打败扎昆,在退场npc(阿们)那里兑换.");
                cm.dispose();
                if (cm.haveItem(4001083) == 0){
                    cm.sendOk("你的物品不足兑换.");
                    status = -1;
                } else {
                    beauty = 7
           cm.sendGetNumber("请输入数量:\r\n#b比例 - (#r1 = 2#b)\r\n  当前拥有数量: #c4001083# 个#r \r\n", 1, 1, 100000 ); }


            }else if (selection == 8) {
                if (cm.haveItem(4001085) == 0) {
                    cm.sendOk("你的物品不足兑换.");
                    status = -1;
                } else {
                    beauty = 8
           cm.sendGetNumber("请输入数量:\r\n#b比例 - (#r1 = 1#b)\r\n  当前拥有数量: #c4001085# 个#r \r\n", 1, 1, 100000 ); }

            }else if (selection == 9) {
                if (cm.haveItem(4001430) == 0){
                    cm.sendOk("你的物品不足兑换.");
                    status = -1;
                } else {
                    beauty = 9
           cm.sendGetNumber("请输入数量:\r\n#b比例 - (#r1 = 5#b)\r\n  当前拥有数量: #c4001430# 个#r \r\n", 1, 1, 1 ); }


            }


        } else if (status == 2) {
            if (beauty == 0) {
                if (cm.haveItem(4000040, selection)){
					 cm.gainItem(4000040, -selection);
                    cm.sendOk("兑换成功。 [#r"+selection+"#k] 兑换了:[#r"+(selection*100000)+"#k] 金币");
                     cm.gainMeso(+100000* selection);
					 cm.dispose();
                } else {
                    cm.sendOk("条件不足，无法兑换。");
                    cm.dispose()
                }
            } if (beauty == 1) {
                if (cm.haveItem(4031196, selection)){
					 cm.gainItem(4031196, -selection);
					 cm.gainItem(4001322, selection);
                    cm.sendOk("兑换成功。 [#r"+selection+"#k] 共兑换了:[#r"+(selection)+"#k]个 蓝宝石");
					cm.worldMessage(6,"玩家：["+cm.getName()+"]殴打了BOSS，在鼬神那里兑换了："+(selection)+"个 蓝宝石。");
					 cm.dispose();
                } else {
                    cm.sendOk("条件不足，无法兑换。");
                    cm.dispose()
                }
            }if (beauty == 2) {
                if (cm.haveItem(4001241, selection)){
					 cm.gainItem(4001241, -selection);
					 cm.gainItem(4170016, selection*2);
                    cm.sendOk("兑换成功。 [#r"+selection+"#k] 共兑换了:[#r"+(selection*2)+"#k]个 彩蛋");
					cm.worldMessage(6,"玩家：["+cm.getName()+"]殴打了BOSS，在鼬神那里兑换了："+(selection*2)+"个 彩蛋。");
					 cm.dispose();
                } else {
                    cm.sendOk("条件不足，无法兑换。");
                    cm.dispose()
                }
            }if (beauty == 3) {
                if (cm.haveItem(4001242, selection)){
					 cm.gainItem(4001242, -selection);
					 cm.gainItem(4170016, selection*2);
                    cm.sendOk("兑换成功。 [#r"+selection+"#k] 共兑换了:[#r"+(selection*2)+"#k]个 彩蛋");
					cm.worldMessage(6,"玩家：["+cm.getName()+"]殴打了BOSS，在鼬神那里兑换了："+(selection*2)+"个 彩蛋。");
					 cm.dispose();
                } else {
                    cm.sendOk("条件不足，无法兑换。");
                    cm.dispose()
                }
            }if (beauty == 4) {
                if (cm.haveItem(4000235, selection) && cm.haveItem(4000243, selection) && cm.haveItem(4000175, selection) && cm.haveItem(4001080, selection) && cm.haveItem(4001083, selection) && cm.haveItem(4001084, selection) && cm.haveItem(4001085, selection)){
					 cm.gainItem(4000235, -selection);
					 cm.gainItem(4000243, -selection);
					 cm.gainItem(4000175, -selection);
					 cm.gainItem(4001080, -selection);
					 cm.gainItem(4001083, -selection);
					 cm.gainItem(4001084, -selection);
					 cm.gainItem(4001085, -selection);
					 cm.gainItem(4031217, selection);
                    cm.sendOk("兑换成功。 [#r"+selection+"#k] 共兑换了:[#r"+(selection)+"#k]个 黄金钥匙");
					cm.worldMessage(6,"玩家：["+cm.getName()+"]殴打了好多BOSS，在鼬神那里兑换了："+(selection)+"个 黄金钥匙。");
					 cm.dispose();
                } else {
                    cm.sendOk("条件不足，无法兑换。");
                    cm.dispose()
                }
            }if (beauty == 5) {
                if (cm.haveItem(2041200, selection)){
					 cm.gainItem(2041200, -selection);
					 cm.gainItem(2340000, selection);
					 cm.gainItem(2049100, selection);
                    cm.sendOk("兑换成功。 [#r"+selection+"#k] 共兑换了:[#r"+(selection)+"#k]个 混沌、祝福卷。");
					//cm.worldMessage(6,"玩家：["+cm.getName()+"]殴打了BOSS，在鼬神那里兑换了："+(selection)+"个 混沌、祝福卷。");
					 cm.dispose();
                } else {
                    cm.sendOk("条件不足，无法兑换。");
                    cm.dispose()
                }
            }if (beauty == 6) {
                if (cm.haveItem(4001080, selection)){
					 cm.gainItem(4001080, -selection);
					 cm.gainItem(4001323, selection);
                    cm.sendOk("兑换成功。 [#r"+selection+"#k] 共兑换了:[#r"+(selection)+"#k]个 红宝石");
					cm.worldMessage(6,"玩家：["+cm.getName()+"]殴打了BOSS，在鼬神那里兑换了："+(selection)+"个 红宝石。");
					 cm.dispose();
                } else {
                    cm.sendOk("条件不足，无法兑换。");
                    cm.dispose()
                }
            }if (beauty == 7) {
                if (cm.haveItem(4001083, selection)){
					 cm.gainItem(4001083, -selection);
					 cm.gainItem(4170016, selection*2);
                    cm.sendOk("兑换成功。 [#r"+selection+"#k] 共兑换了:[#r"+(selection*2)+"#k]个 彩蛋");
					cm.worldMessage(6,"玩家：["+cm.getName()+"]殴打了BOSS，在鼬神那里兑换了："+(selection*2)+"个 彩蛋。");
					 cm.dispose();
                } else {
                    cm.sendOk("条件不足，无法兑换。");
                    cm.dispose()
                }
            }if (beauty == 8) {
                if (cm.haveItem(4001085, selection)){
					 cm.gainItem(4001085, -selection);
					 cm.gainItem(4001322, selection);
                    cm.sendOk("兑换成功。 [#r"+selection+"#k] 共兑换了:[#r"+(selection)+"#k]个 蓝宝石");
					cm.worldMessage(6,"玩家：["+cm.getName()+"]殴打了BOSS，在鼬神那里兑换了："+(selection)+"个 蓝宝石。");
					 cm.dispose();
                } else {
                    cm.sendOk("条件不足，无法兑换。");
                    cm.dispose()
                }
            }if (beauty == 9) {
                if (cm.haveItem(4001430, selection)){
					 cm.gainItem(4001430, -selection);
					 cm.gainItem(4170016, selection*5);
                    cm.sendOk("兑换成功。 [#r"+selection+"#k] 共兑换了:[#r"+(selection*5)+"#k]个 彩蛋");
					cm.worldMessage(6,"玩家：["+cm.getName()+"]殴打了BOSS，在鼬神那里兑换了："+(selection*5)+"个 彩蛋。");
					 cm.dispose();
                } else {
                    cm.sendOk("条件不足，无法兑换。");
                    cm.dispose()
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}
