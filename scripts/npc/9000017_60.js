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
            text += "#e#k#l月妙组队副本奖励兑换处：\r\n#d[月妙组队]获得的#v4310099#可以交换#v1112426#(全属性+2.攻/魔+2.HP/MP+1000)10天的使用权！带带新朋友，1000血量戒指轻松到手！\r\n兑换#v1112426# 1个:10天/不可叠加.\t需要:#v4310099#x30个.\r\n\r\n"//3
            text += "#r#L1##e#r兑换蒲公英戒指#l\r\n\r\n"//3
            //text += "#L2##e#d兑换蒲公英戒指#l\r\n"//3
            //text += "" + 蓝色箭头 + "#L3##e#d#v4170001#x20 + #v1032060# 升级至 #v1032061#全属性+3 攻魔+1#l\r\n"//3
            //text += "" + 蓝色箭头 + "#L4##e#d#v4170001#x30 + #v1032061# 升级至 #v1032101#全属性+6 攻魔+2#l\r\n"//3
            //text += "" + 蓝色箭头 + "#L5##e#d#v4170001#x50 + #v1032101# 升级至 #v1032186#全属性+9 攻魔+3#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		         if(cm.haveItem(4310099,30)){
				cm.gainItem(4310099, -30);
				cm.gainItem(1112426,2,2,2,2,1000,1000,2,2,10,10,0,0,0,0,240);//枫叶耳环
				//cm.gainMeso(999999);
            cm.sendOk("换购成功！");
			//cm.worldMessage(6,"玩家：["+cm.getName()+"]制作了[阿尔泰耳环]，继续加油将它打造到极致吧！");
cm.喇叭(3, "玩家：[" + cm.getPlayer().getName() + "]成功兑换月妙组队副本奖励：[蒲公英戒指]血量+1000:10天使用权，恭喜恭喜！血量多多！");
            cm.dispose();
			}else{
            cm.sendOk("您的材料不足！制作[#v1032111#]，需要\r\n#v4030002#x30个");
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


