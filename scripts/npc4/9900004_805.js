function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
			//显示物品ID图片用的代码是  #v这里写入ID#
            text += "#e#r累积充值达到2000礼包，可获得：#n#b\r\n1、祝福*混沌各20张\r\n2、皇家理发卷*10张\r\n3、绝对指环（四维+15、攻击+15、魔攻+15、血/蓝+300、防御、魔防、回避、命中+100）\r\n4、猫头鹰+5(四维+15、攻击+10、魔攻+10)\r\n5、黄色雪鞋+5（四维+15、攻击+15、魔攻+15）\r\n6、给100级本职业武器增加2次可升级次数（已经帮你砸好，砸完+9）\r\n7、给桑拿服增加2次可升级次数（已经帮你砸好，砸完+12）\r\n8、任选巨无霸椅子一张\r\n9、冒险岛=1500万\r\n10、回收精灵吊坠，并且在精灵吊坠上面+10G、+10魔攻\r\n11、勋章一枚（全属性+35、攻击/魔攻+35、移动/跳跃+20、血/蓝+3500、防御、魔防、回避、命中+100）\r\n#r领取礼包必须要有足够的空间哦，否则被系统吞了东西，管理员不负责哦\r\n"//3
            text += "#L1##r#v4310018#领取累计充值2000礼包#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("请清理你的背包，至少空出2个位置！");
            cm.dispose();
        } else if(cm.haveItem(4310018,1)){
				cm.gainItem(4310018, -1);
				cm.gainItem(5150040, 10);//皇家
				cm.gainItem(2049100, 20);//祝福
				cm.gainItem(2340000, 20);//混沌
				cm.gainItem(1113057,15,15,15,15,300,300,15,15,100,100,100,100,0,0);//绝对指环
				cm.gainItem(1142536,35,35,35,35,3500,3500,35,35,100,100,100,100,20,20);//勋章
				cm.gainItem(1122017,0,0,0,0,0,0,10,10,0,0,0,0,0,0);//
				cm.gainMeso(15000000);
            cm.sendOk("领取成功，猫头鹰+5、黄色雪鞋+5、任选巨无霸椅子一张、必须找管理员获得！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功领取累积充值礼包4！！");
            cm.dispose();
			}else{
            cm.sendOk("你的充值达不到限度，或者你已经领取过了，请勿重复领取！");
            cm.dispose();
			}
		}
    }
}


