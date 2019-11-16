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
            text += "#e#d#l这里是[小小眼镜]锻造处！依次为，初级/中级/高级兑换。\r\n"//3
            text += "#L1##e#d1: 制作#v1022132#（4维+2、攻/魔+1） 需要:#v4001160#x10个.#l\r\n"//3
            //text += "#L2##e#d2:#v4000435# 1个兑换  #v2049100#x2张#l\r\n"//3
            text += "#L3##e#d2: #v4001160#x20 + #v1022132#获得#v1022163#（4维+4、攻/魔+2）.#l\r\n"//3
            text += "#L4##e#d3: #v4001160#x30 + #v1022163#获得#v1022149#（4维+6、攻/魔+3）.#l\r\n"//3
            //text += "" + 蓝色箭头 + "#L5##e#d#v4170001#x50 + #v1032101# 升级 #v1032186#全属性+9 攻魔+3#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		         if(cm.haveItem(4001160,10)){
				cm.gainItem(4001160, -10);
				cm.gainItem(1022132,2,2,2,2,0,0,1,1,0,0,0,0,0,0);
				//cm.gainMeso(999999);
            cm.sendOk("换购成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]制作了[初级眼镜]，继续加油将它打造到极致吧！");
cm.喇叭(3, "玩家：[" + cm.getPlayer().getName() + "]成功制作了[初级]，继续加油将它打造到极致吧！");
            cm.dispose();
			}else{
            cm.sendOk("您的材料不足！制作[初级]，需要\r\n#v4001160#x10个");
            cm.dispose();
			}
        } else if (selection == 2) {
		cm.openNpc(9270045, 4);
        } else if (selection == 3) {
		cm.openNpc(9000017, 21);
        } else if (selection == 4) {
		cm.openNpc(9000017, 22);
        } else if (selection == 5) {
		cm.openNpc(9000017, 33);
        } else if (selection == 6) {
		cm.openNpc(9270045, 8);
	}
    }
}


