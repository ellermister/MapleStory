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
                text += "#d亲爱的萌新，真心的欢迎你来到世纪冒险岛这个有爱的大家庭，以下是我对你努力升级的一些回赠，祝你在世纪冒险岛能天天开心~~也希望你在这里能收获友谊与自信，让我们回忆曾经玩冒险岛的记忆，世纪冒险岛因为有你们，将会变得更好！！当您的角色升级至 50 和 70级的时候，头上的灯泡一定要点击，会获得#v4310057#每次1个,这是兑换帽子的道具！\r\n\r\n";
            text += "" + 蓝色箭头 + "#L1#领取#v1003439##z1003439#\t\r\n\r\n"//3
            //text += "" + 蓝色箭头 + "#L2##r#v1122017##z1122017#\t使用权：10小时\t需要点卷：600点\r\n\r\n"//3
            //text += "" + 蓝色箭头 + "#L3##r#v1122017##z1122017#\t使用权：1天\t需要点卷：1200点\r\n\r\n"//3
            //text += "" + 蓝色箭头 + "#L4##r#v1122017##z1122017#\t使用权：7天\t需要点卷：6000点\r\n\r\n"//3
            //text += "" + 蓝色箭头 + "#L5##r#v4310003##z4310003#1个\t需要点卷：800点\r\n\r\n"//3
            cm.sendSimple(text);
            }
        } else if (selection == 1) {
            if (cm.haveItem(4310057, 1)) {
cm.gainItem(4310057, -1);
cm.gainItem(1003439,8,8,8,8,0,0,0,0,30,30,15,15,0,0);
cm.喇叭(2, "【世纪冒险岛】赠送[" + cm.getPlayer().getName() + "]一个【粉色扎昆头盔】，做为对你努力升级的奖励，要继续加油哦！！");
            cm.dispose();
			}else{
            cm.sendOk("对不起没有#v4310057# x1个\r\n我无法赠送你【粉色扎昆头盔】哦！快快升级吧~\r\n升级到50级和70级都能领取一个哦！");
            cm.dispose();
			}
        } else if (selection == 2) {
if (cm.getPlayer().getCSPoints(1) >= 600) {
cm.gainNX(-600);
cm.gainItem(1122017,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功购买精灵坠子10小时使用权！");
cm.dispose();
}else{
cm.sendOk("道具不足无法换购！");
cm.dispose();
}
        } else if (selection == 3) {
if (cm.getPlayer().getCSPoints(1) >= 1200) {
cm.gainNX(-1200);
cm.gainItem(1122017,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功购买精灵坠子1天使用权！");
cm.dispose();
}else{
cm.sendOk("道具不足无法换购！");
cm.dispose();
}
        } else if (selection == 4) {
if (cm.getPlayer().getCSPoints(1) >= 6000) {
cm.gainNX(-6000);
cm.gainItem(1122017,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功购买精灵坠子7天使用权！");
cm.dispose();
}else{
cm.sendOk("道具不足无法换购！");
cm.dispose();
}
        } else if (selection == 5) {
if (cm.getPlayer().getCSPoints(1) >= 800) {
cm.gainNX(-800);
cm.gainItem(4310003,1);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功购买(蛋糕馅饼纪念徽章)1个，快去抽奖吧！");
cm.dispose();
}else{
cm.sendOk("点卷不足，无法购买！");
cm.dispose();
}
		}
    }
}


