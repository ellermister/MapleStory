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
            text += "#e#r累积充值达到300礼包，可获得：#n#b\r\n1、祝福*混沌各15张\r\n2、皇家理发卷10张\r\n3、快乐戒指1个\r\n4、43级枫叶武器+7\r\n5、冒险币=600万\r\n6、任选小椅子一张\r\n7、勋章一枚（全属性+20、攻击/魔攻+20、移动/跳跃+20、血/蓝+2000、防御、魔防、回避、命中+100）\r\n#r领取礼包必须要有足够的空间哦，否则被系统吞了东西，管理员不负责哦\r\n "//3
            text += "#L1##r#v4310016#领取累计充值300礼包#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("请清理你的背包，至少空出2个位置！");
            cm.dispose();
        } else if(cm.haveItem(4310016,1)){
				cm.gainItem(4310016, -1);
				cm.gainItem(5150040, 10);//皇家
				cm.gainItem(2049100, 15);//祝福
				cm.gainItem(2340000, 15);//混沌
				cm.gainItem(1112793, 1);//快乐戒指
				cm.gainItem(1142070,20,20,20,20,2000,2000,20,20,100,100,100,100,20,20);
				cm.gainMeso(6000000);
            cm.sendOk("领取成功，43级满卷武器、小椅子必须找管理员获得！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功领取累积充值礼包1！！");
            cm.dispose();
			}else{
            cm.sendOk("你的充值达不到限度，或者你已经领取过了，请勿重复领取！");
            cm.dispose();
			}
		}
    }
}


