/* global cm */

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
    } else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "帅气拉风坐骑！站街必备哦，快快购买吧!\r\n\r\n";
                text += "" + 蓝色箭头 + "#L1##r#v1902024##z1902024#\t使用权：需要200充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L2##r#v1902013##z1902013#\t使用权：需要188充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L3##r#v1902045##z1902045#\t使用权：需要250充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L4##r#v1902033##z1902033#\t使用权：需要150充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L5##r#v1902036##z1912029#\t使用权：需要100充值币\r\n\r\n"//3	
                text += "" + 蓝色箭头 + "#L6##r#v1902032##z1902032#\t使用权：需要200充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L7##r#v1902020##z1902020#\t使用权：需要150充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L8##r#v1902014##z1902014#\t使用权：需要100充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L9##r#v1902021##z1902021#\t使用权：需要100充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L10##r#v1902009##z1902009#\t使用权：需要100充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L11##r#v1902031##z1902031#\t使用权：需要100充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L12##r#v1902035##z1902035#\t使用权：需要150充值币\r\n\r\n"//3	
                text += "" + 蓝色箭头 + "#L13##r#v1902018##z1912011#\t使用权：需要100充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L14##r#v1902039##z1902039#\t使用权：需要50充值币\r\n\r\n"//3
                text += "" + 蓝色箭头 + "#L15##r#v1902038##z1902038#\t使用权：需要50充值币\r\n\r\n"//3				
                cm.sendSimple(text);
            }
        } else if (selection == 1) {
            if (!cm.beibao(1, 0)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 200) {
                cm.setmoneyb(-200);
                cm.gainItem(1912017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1902024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买天马坐骑使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }
        } else if (selection == 2) {
            if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 188) {
                cm.setmoneyb(-188);
                cm.gainItem(1902013, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912009, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买无辜水牛坐骑使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }
        } else if (selection == 3) {
            if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 250) {
                cm.setmoneyb(-250);
                cm.gainItem(1902045, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912038, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买老虎只是传说坐骑使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }
        } else if (selection == 4) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 150) {
                cm.setmoneyb(-150);
                cm.gainItem(1902033, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912026, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买老虎只是传说坐骑使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }
        } else if (selection == 5) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 100) {
                cm.setmoneyb(-100);
                cm.gainItem(1902036, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912029, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买老虎只是传说坐骑使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }
        } else if (selection == 6) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 200) {
                cm.setmoneyb(-200);
                cm.gainItem(1902032, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买梦魇使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }
        } else if (selection == 7) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 150) {
                cm.setmoneyb(-150);
                cm.gainItem(1902020, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912013, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买热气球使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }
        } else if (selection == 8) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 100) {
                cm.setmoneyb(-100);
                cm.gainItem(1902014, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912010, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买玩具坦克使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }	
        } else if (selection == 9) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 100) {
                cm.setmoneyb(-100);
                cm.gainItem(1902021, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912014, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买变形金刚使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }	
        } else if (selection == 10) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 100) {
                cm.setmoneyb(-100);
                cm.gainItem(1902009, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912004, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买鸵鸟坐骑使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }	
        } else if (selection == 11) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 100) {
                cm.setmoneyb(-100);
                cm.gainItem(1902031, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买骑士团战车使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }			
        } else if (selection == 12) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 150) {
                cm.setmoneyb(-150);
                cm.gainItem(1902035, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912028, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买蝙蝠怪使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }
        } else if (selection == 13) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 100) {
                cm.setmoneyb(-100);
                cm.gainItem(1902018, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912011, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买狼神使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }
        } else if (selection == 14) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 50) {
                cm.setmoneyb(-50);
                cm.gainItem(1902039, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912032, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买男男机车使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }
        } else if (selection == 15) {
             if (!cm.beibao(1, 1)) {//前面的1对应装备第一栏，也就是装备 后面就是格数
                cm.sendOk("装备栏空余不足1个空格！");//判断不等于，就提示对话
                cm.dispose();
            } else if (cm.getmoneyb() >= 50) {
                cm.setmoneyb(-50);
                cm.gainItem(1902038, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				cm.gainItem(1912031, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                cm.喇叭(1, "[" + cm.getPlayer().getName() + "]成功购买女女机车使用权！");
                cm.dispose();
            } else {
                cm.sendOk("充值币不足无法换购！");
                cm.dispose();
            }
        }
    }
}