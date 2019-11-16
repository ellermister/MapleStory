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
            text += "#e#r累积充值达到500礼包，可获得：#n#b\r\n1、祝福*混沌各20张\r\n2、皇家理发卷*10张\r\n3、快乐戒指1个\r\n4、工地手套+7（21G）\r\n5、64级枫叶武器+7\r\n6、永久精灵吊坠一个（佩戴即可获得50%经验加成，升级飞起哦！）\r\n7、齿轮镖3组\r\n8、任选小椅子一张\r\n9、冒险币=1000万\r\n10、勋章一枚（全属性+25、攻击/魔攻+25、移动/跳跃+20、血/蓝+2500、防御、魔防、回避、命中+100）\r\n#r领取礼包必须要有足够的空间哦，否则被系统吞了东西，管理员不负责哦\r\n"//3
            text += "#L1##r#v4310049#领取累计充值500礼包#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("请清理你的背包，至少空出2个位置！");
            cm.dispose();
        } else if(cm.haveItem(4310049,1)){
				cm.gainItem(4310049, -1);
				cm.gainItem(5150040, 10);//皇家
				cm.gainItem(2049100, 20);//祝福
				cm.gainItem(2340000, 20);//混沌
				cm.gainItem(1112793, 1);//快乐戒指
				cm.gainItem(1142335,25,25,25,25,2500,2500,25,25,100,100,100,100,20,20);//xunzhang
				cm.gainItem(1122017,1);//
				cm.gainMeso(10000000);
            cm.sendOk("领取成功，64级满卷武器、齿轮标3组、工地手套、小椅子必须找管理员获得！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功领取累积充值礼包2！！");
            cm.dispose();
			}else{
            cm.sendOk("你的充值达不到限度，或者你已经领取过了，请勿重复领取！");
            cm.dispose();
			}
		}
    }
}


