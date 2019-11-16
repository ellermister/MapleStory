var 爱心 = "#fEffect/CharacterEff/1022223/4/0#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 正方形 = "#fUI/UIWindow/Quest/icon3/6#";
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
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
            text += "#e#d#l这里是[精灵吊坠]兑换！\r\n"//3
            text += "" + 红色箭头 + "#L1##e#d兑换#v1122017##z1122017# 1个\t使用时间：30天\t需要:#v4031311#x100个#l\r\n\r\n"//3
            //text += "#L2##e#d#v4000435# 1个兑换  #v2049100#x2张#l\r\n"//3
            //text += "" + 蓝色箭头 + "#L3##e#d#v4170001#x20 + #v1032060# 升级至 #v1032061#全属性+3 攻魔+1#l\r\n"//3
            //text += "" + 蓝色箭头 + "#L4##e#d#v4170001#x30 + #v1032061# 升级至 #v1032101#全属性+6 攻魔+2#l\r\n"//3
            //text += "" + 蓝色箭头 + "#L5##e#d#v4170001#x50 + #v1032101# 升级至 #v1032186#全属性+9 攻魔+3#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		         if(cm.haveItem(4031311,100)){
				cm.gainItem(4031311, -100);
			    cm.gainItem(1122017,1,720);//吊坠
				//cm.gainMeso(999999);
            cm.sendOk("换购成功！");
			//cm.worldMessage(6,"玩家：["+cm.getName()+"]制作了[阿尔泰耳环]，继续加油将它打造到极致吧！");
cm.喇叭(3, "玩家：[" + cm.getPlayer().getName() + "]成功兑换[精灵吊坠]，使用时间：30天，恭喜恭喜！");
            cm.dispose();
			}else{
            cm.sendOk("您的材料不足！制作[精灵吊坠]，需要\r\n#v4031311#x100个");
            cm.dispose();
			}
        } else if (selection == 2) {
		cm.openNpc(9270045, 4);
        } else if (selection == 3) {
		cm.openNpc(9000017, 31);
        } else if (selection == 4) {
		cm.openNpc(9000017, 32);
        } else if (selection == 5) {
		cm.openNpc(9000017, 33);
        } else if (selection == 6) {
		cm.openNpc(9270045, 8);
	}
    }
}


