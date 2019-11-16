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
            text += "#e#r官方认证老玩家，可获得：#n#b\r\n1、点劵8W \r\n2、皇家坐骑10个\r\n3、皇家发型10个\r\n4、金币1000W\r\n5、抵用卷3W\r\n6、64级本职业武器+7\r\n7、43级本职业武器+7\r\n8、精灵吊坠一个\r\n#r领取礼包必须要有足够的空间哦，否则被系统吞了东西，管理员不负责哦\r\n"//3
            text += "#L1##r#v4310010#领取官方认证老玩家礼包#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("请清理你的背包，至少空出2个位置！");
            cm.dispose();
        } else if(cm.haveItem(4310010,1)){
				cm.gainItem(4310010, -1);
				cm.gainItem(5150040, 10);//皇家
				cm.gainItem(4001215, 10);//坐骑
				cm.gainMeso(+10000000);
				cm.gainDY(30000);
				cm.gainItem(1122017,0,0,0,0,0,0,0,0,0,0,0,0,0,0);//
            cm.sendOk("领取成功，43武器、64武器必须找管理员获得！");
            cm.dispose();
			}else{
            cm.sendOk("你不是官方认证老玩家，无法领取！！");
            cm.dispose();
			}
		}
    }
}


