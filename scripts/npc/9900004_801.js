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
            text += "#e#r累积充值达到100礼包，可获得：#n#b\r\n1、丽琳的戒指1个（每个账号只能佩戴一个）--(全属性+15、10攻、10魔攻、血蓝+100)\r\n2、扎昆头盔1个\r\n3、皇家理发卷5长\r\n4、祝福*混沌各5张\r\n5、快乐戒子1个 (四维属性5 攻击力与魔法力5)\r\n6、30级本职业武器+7\r\n7、冒险币=200W\r\n#r领取礼包必须要有足够的空间哦，否则被系统吞了东西，管理员不负责哦\r\n "//3
            text += "#L1##r#v4310014#领取累计充值100礼包#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("请清理你的背包，至少空出2个位置！");
            cm.dispose();
        } else if(cm.haveItem(4310014,1)){
				cm.gainItem(4310014, -1);
				cm.gainItem(5150040, 5);//皇家
				cm.gainItem(2049100, 5);//祝福
				cm.gainItem(2340000, 5);//混沌
				cm.gainItem(1112793, 1);//快乐戒指
				cm.gainItem(1002357, 1);//扎头
				cm.gainItem(1112405,15,15,15,15,100,100,10,10,0,0,50,50,0,0);
				cm.gainMeso(2000000);
            cm.sendOk("领取成功，30级满卷武器必须找管理员获得！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功领取累积充值100礼包！！");
            cm.dispose();
			}else{
            cm.sendOk("你的充值达不到限度，或者你已经领取过了，请勿重复领取！");
            cm.dispose();
			}
		}
    }
}


