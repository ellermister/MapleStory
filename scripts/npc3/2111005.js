/*
                《该文件是Vr001 封测版服务端的核心文件之一》
  目前版权 (C) 2010年   Vr001 封测版             <159502199@qq.com>
 * -----------------------------------------------------------*
  之前人员 (C) 2008年   Huy              <patrick.huy@frz.cc>
                       Matthias Butz       <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>
 * ------------------------------------------------------------*
 @该服务端目前维护人员:Vr001 封测版
 @这个文件是自由形式.你可以任意内容
 @这个程序发布的目的是期望它能有用@
 @如果你需要技术支持,可以联系更新/维护人员<QQ100807851>
 @你应该已经收到一份Affero GNU通用公共授权
 -如果不是,请仔细查看http://www.gnu.org/licenses/*
*/
/*
******************NPC抽奖**********************
*/

importPackage(net.sf.odinms.client);



var status = 0;
var chance1 = Math.floor(Math.random()*200+1);
var chance2 = Math.floor(Math.random()*50);
var chance3 = (Math.floor(Math.random()*20)+1);
var chance4 = Math.floor(Math.random()*2+1);
var itemchance = chance1 + chance2 + chance3 * chance4;
var itemamount = Math.floor(Math.random()*50+1);


function start() {
	status = -1;
	action(1, 0, 0);
}


function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("哇.在活动中你的运气很好.祝你下次好运~!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
				cm.sendNext("我是活动NPC.\r\n如果你有\r\n#e #b#v4032491##k#r10个、\r\n可以在我这里随机换取物品哦~!\r\n进入活动地图可以获得: #v4032491#");
			}
		else if (status == 1) {
                        if (cm.haveItem(4032491)) {
			cm.sendYesNo("你需要消耗#v4032491#2个来抽取物品吗？");
			}
			else if (!cm.haveItem(4032491)) {
			cm.sendOk("你没有#v4032491#.我无法为你服务！\r\n获取#v4032491#的方法：\r\n#b通过#r金猪#b进入#r活动地图#k在规定的而时间内打败怪物。\r\n怪物可掉落该物品！");
			cm.dispose();
			}
		}
		else if (status == 2) {
			cm.gainItem(4032491, -10);

			if ((itemchance >= 1) && (itemchance <= 20)) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得诚实冒险岛家勋章!");
			cm.gainItem(1142000, 1);
			}
			else if ((itemchance >= 21) && (itemchance <= 40)) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得勤奋冒险岛家勋章!");
			cm.gainItem(1142004, 1);
			}
			else if ((itemchance >= 41) && (itemchance <= 50)) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得寿司椅!");
			cm.gainItem(3010019, 1);
			}
			else if ((itemchance >= 51) && (itemchance <= 60)) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得枫叶1200个.F6!");
			cm.gainItem(4001126, 1200);
			}
			else if ((itemchance >= 61) && (itemchance <= 70)) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得宝箱!");
			cm.gainItem(4001102, 1);
			}
			else if (itemchance == 71) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得枫叶400个!");
			cm.gainItem(4001126, 400);
			}
  
			else if (itemchance == 72) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得枫叶400个!");
			cm.gainItem(4001126, 400);
			}
			else if (itemchance == 73) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得枫叶400个!");
			cm.gainItem(4001126, 400);
			}
			else if (itemchance == 74) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得枫叶3年旗!");
			cm.gainItem(1412028, 1);
			}
			else if (itemchance == 75) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得酒瓶!");
			cm.gainItem(1422011, 1);
			}
			else if (itemchance == 76) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得枫叶400个!");
			cm.gainItem(4001126, 400);
			}
			else if (itemchance == 77) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得枫叶400个!");
			cm.gainItem(4001126, 400);
			}
			else if (itemchance == 78) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得枫叶400个!");
			cm.gainItem(4001126, 400);
			}
			else if (itemchance == 79) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得枫叶400个!");
			cm.gainItem(4001126, 400);
			}
			else if (itemchance == 80) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得钓鱼秆!");
			cm.gainItem(1432039, 1);
			}	
			else if (itemchance == 81) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得冻冻鱼!");
			cm.gainItem(1442039, 1);
			}
			else if (itemchance == 82) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得虎年福袋召唤包!");
			cm.gainItem(2101245, 5);
			}
			else if (itemchance == 83) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得蝙蝠椅!");
			cm.gainItem(3010040, 1);
			}	
			else if (itemchance == 84) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得寒冰椅子!");
			cm.gainItem(3010045, 1);
			}
			else if (itemchance == 85) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得圣诞树椅子!");
			cm.gainItem(3010048, 1);
			}
			else if (itemchance == 86) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得露水椅子!");
			cm.gainItem(3010068, 1);
			}
			else if (itemchance == 87) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得冒险岛偶像明星勋章!");
			cm.gainItem(1142006, 1);
			}	
			else if (itemchance == 88) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得骑士团长勋章!");
			cm.gainItem(1142069, 1);
			}
			else if (itemchance == 89) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得北极熊椅子!");
			cm.gainItem(3010099, 1);
			}
			else if (itemchance == 90) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得红浴巾!");
			cm.gainItem(1051098, 1);
			}
			else if (itemchance == 91) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得蓝浴巾!");
			cm.gainItem(1050100, 1);
			}
			else if (itemchance == 92) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得香菇!");
			cm.gainItem(1382016, 1);
			}
			else if (itemchance == 93) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得神兽椅!");
			cm.gainItem(3010071, 1);
			}
			else if (itemchance == 94) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得暖暖桌");
			cm.gainItem(3010021, 1);
			}
			else if (itemchance == 95) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得虎虎生威!");
			cm.gainItem(3010111, 1);
			}
			else if (itemchance == 96) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得桶浴!");
			cm.gainItem(3012002, 1);
			}
			else if (itemchance == 97) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得橡皮榔头!");
			cm.gainItem(1302021, 1);
			}
			else if (itemchance == 98) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得浪人披风（粉）!");
			cm.gainItem(1102041, 1);
			}
			else if (itemchance == 99) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得英雄战神勋章!");
			cm.gainItem(1142133, 1);
			}
			else if (itemchance == 100) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得风吹稻香!");
			cm.gainItem(3012006, 1);
			}
			else if (itemchance == 101) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得2010虎年勋章!");
			cm.gainItem(1142186, 1);
			}
			else if (itemchance == 102) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得血色玫瑰!");
			cm.gainItem(3010057, 1);
			}
			else if (itemchance == 103) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得世界末日!");
			cm.gainItem(3010058, 1);
			}
			else if (itemchance == 104) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得电视宅人!");
			cm.gainItem(3010098, 1);
			}
			else if (itemchance == 105) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得雪房子!");
			cm.gainItem(3010049, 1);
			}
			else if (itemchance == 106) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得红色鞭子!");
			cm.gainItem(1302013, 1);
			}
			else if (itemchance == 107) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得工地手套红!");
			cm.gainItem(1082146, 1);
			}
			else if (itemchance == 108) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得超级滑雪板!");
			cm.gainItem(1442046, 1);
			}
			else if (itemchance == 109) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得绯红之弓!");
			cm.gainItem(1452060, 1);
			}
			else if (itemchance == 110) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得蓝色雨伞!");
			cm.gainItem(1302017, 1);
			}
			else if (itemchance == 111) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得绯红弯刃!");
			cm.gainItem(1442068, 1);
			}
			else if (itemchance == 112) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得绯红法杖!");
			cm.gainItem(1382060, 1);
			}
			else if (itemchance == 113) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得鱿鱼剑!");
			cm.gainItem(1302104, 1);
			}
			else if (itemchance == 114) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得冻冻鱼!");
			cm.gainItem(1442018, 1);
			}
			else if (itemchance == 115) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得七彩霓虹灯泡!");
			cm.gainItem(1302080, 1);
			}
			else if (itemchance == 116) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得薄光刃!");
			cm.gainItem(1302068, 1);
			}
			else if (itemchance == 117) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得赫丽娜的邮票!");
			cm.gainItem(4031561, 1);
			}
			else if (itemchance == 118) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得达克鲁的邮票!");
			cm.gainItem(4031560, 1);
			}
			else if (itemchance == 119) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得汉斯的邮票!");
			cm.gainItem(4031559, 1);
			}
			else if (itemchance == 120) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得暴力熊帽!");
			cm.gainItem(1002926, 1);
			}
			else if (itemchance == 121) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得心疤狮王!");
			cm.gainItem(1002927, 1);
			}
			else if (itemchance == 122) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得PB椅子!");
			cm.gainItem(3010073, 1);
			}
			else if (itemchance == 123) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得强化版枫叶头盔!");
			cm.gainItem(1002758, 1);
			}
			else if (itemchance == 124) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得假扎昆头盔!");
			cm.gainItem(1002430, 1);
			}
			else if (itemchance == 125) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得真扎昆头盔!");
			cm.gainItem(1002390, 1);
			}
			else if (itemchance == 126) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得扎昆头盔!");
			cm.gainItem(1002357, 1);
			}
			else if (itemchance == 127) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，超级药水100个!");
			cm.gainItem(2000005, 1);
			}
			else if (itemchance == 128) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，超级药水100个!");
			cm.gainItem(2000005, 1);
			}
			else if (itemchance == 129) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，超级药水100个!");
			cm.gainItem(2000005, 1);
			}
			else if (itemchance == 130) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，超级药水100个!");
			cm.gainItem(2000005, 1);
			}
			else if (itemchance == 131) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得狼神50级!");
			cm.gainItem(1902015, 1);
			}
			else if (itemchance == 132) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得转身币1枚!");
			cm.gainItem(4001129, 1);
			}
			else if (itemchance == 133) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得一刀两断!");
			cm.gainItem(1302056, 1);
			}
			else if (itemchance == 134) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得一刀两断!");
			cm.gainItem(1302056, 1);
			}
			else if (itemchance == 135) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得一刀两断!");
			cm.gainItem(1302056, 1);
			}
			else if (itemchance == 136) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得烛影摇红!");
			cm.gainItem(1312030, 1);
			}
			else if (itemchance == 137) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得烛影摇红!");
			cm.gainItem(1312030, 1);
			}
			else if (itemchance == 138) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得烛影摇红!");
			cm.gainItem(1312030, 1);
			}
			else if (itemchance == 139) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得震雷钉!");
			cm.gainItem(1322045, 1);
			}
			else if (itemchance == 140) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得震雷钉!");
			cm.gainItem(1322045, 1);
			}
			else if (itemchance == 141) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得震雷钉!");
			cm.gainItem(1322045, 1);
			}
			else if (itemchance == 142) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得阴风碎魂刃!");
			cm.gainItem(1332052, 1);
			}
			else if (itemchance == 143) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得阴风碎魂刃!");
			cm.gainItem(1332052, 1);
			}
			else if (itemchance == 144) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得阴风碎魂刃!");
			cm.gainItem(1332052, 1);
			}
			else if (itemchance == 145) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得嗜魂法杖!");
			cm.gainItem(1372010, 1);
			}
			else if (itemchance == 146) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得嗜魂法杖!");
			cm.gainItem(1372010, 1);
			}
			else if (itemchance == 147) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得嗜魂法杖!");
			cm.gainItem(1372010, 1);
			}
			else if (itemchance == 148) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得偃月之杖!");
			cm.gainItem(1382037, 1);
			}
			else if (itemchance == 149) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得偃月之杖!");
			cm.gainItem(1382037, 1);
			}
			else if (itemchance == 150) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得偃月之杖!");
			cm.gainItem(1382037, 1);
			}
			else if (itemchance == 151) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得红莲落神枪!");
			cm.gainItem(1432030, 1);
			}
			else if (itemchance == 152) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得红莲落神枪!");
			cm.gainItem(1432030, 1);
			}
			else if (itemchance == 153) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得红莲落神枪!");
			cm.gainItem(1432030, 1);
			}
			else if (itemchance == 154) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得战魂斗杀戟!");
			cm.gainItem(1442044, 1);
			}
			else if (itemchance == 155) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得战魂斗杀戟!");
			cm.gainItem(1442044, 1);
			}
			else if (itemchance == 156) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得战魂斗杀戟!");
			cm.gainItem(1442044, 1);
			}
			else if (itemchance == 157) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得斩天刀!");
			cm.gainItem(1402035, 1);
			}
			else if (itemchance == 158) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得斩天刀!");
			cm.gainItem(1402035, 1);
			}
			else if (itemchance == 159) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得斩天刀!");
			cm.gainItem(1402035, 1);
			}
			else if (itemchance == 160) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得永恒舞空靴!");
			cm.gainItem(1072358, 1);
			}
			else if (itemchance == 161) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得龙魂祭!");
			cm.gainItem(1412021, 1);
			}
			else if (itemchance == 162) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得龙魂祭!");
			cm.gainItem(1412021, 1);
			}
			else if (itemchance == 163) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得龙魂祭!");
			cm.gainItem(1412021, 1);
			}
			else if (itemchance == 164) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得泰坦之锤!");
			cm.gainItem(1422027, 1);
			}

			else if (itemchance == 165) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得泰坦之锤!");
			cm.gainItem(1422027, 1);
			}
			else if (itemchance == 166) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得泰坦之锤!");
			cm.gainItem(1422027, 1);
			}
			else if (itemchance == 167) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，天鹰弓(白)");
			cm.gainItem(1452019, 1);
			}
			else if (itemchance == 168) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，天鹰弓(白)");
			cm.gainItem(1452019, 1);
			}
			else if (itemchance == 169) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，天鹰弓(白)");
			cm.gainItem(1452019, 1);
			}
			else if (itemchance == 170) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得逆龙咆哮拳!");
			cm.gainItem(1472053, 1);
			}
			else if (itemchance == 171) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得逆龙咆哮拳!");
			cm.gainItem(1472053, 1);
			}
			else if (itemchance == 172) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得逆龙咆哮拳!");
			cm.gainItem(1472053, 1);
			}
			else if (itemchance == 173) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得光圣鹞弩(白)");
			cm.gainItem(1462015, 1);
			}
			else if (itemchance == 174) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得光圣鹞弩(白)");
			cm.gainItem(1462015, 1);
			}
			else if (itemchance == 175) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得光圣鹞弩(白)");
			cm.gainItem(1462015, 1);
			}
			else if (itemchance == 176) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得金圣鹞弩(黄)!");
			cm.gainItem(1462016, 1);
			}
			else if (itemchance == 177) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得金圣鹞弩(黄)!");
			cm.gainItem(1462016, 1);
			}
			else if (itemchance == 178) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得金圣鹞弩(黄)!");
			cm.gainItem(1462016, 1);
			}
			else if (itemchance == 179) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得圣十字护盾!");
			cm.gainItem(1092061, 1);
			}
			else if (itemchance == 180) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得圣十字护盾!");
			cm.gainItem(1092061, 1);
			}
			else if (itemchance == 181) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得圣十字护盾!");
			cm.gainItem(1092061, 1);
			}
			else if (itemchance == 182) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得金枪!");
			cm.gainItem(1492012, 1);
			}
			else if (itemchance == 183) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得金枪!");
			cm.gainItem(1492012, 1);
			}
			else if (itemchance == 184) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得金枪!");
			cm.gainItem(1492012, 1);
			}
			else if (itemchance == 185) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得金枪!");
			cm.gainItem(1492012, 1);
			}
			else if (itemchance == 186) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得金枪!");
			cm.gainItem(1492012, 1);
			}
			else if (itemchance == 195) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得黑环凳!");
			cm.gainItem(3010030, 1);
			}
			else if (itemchance == 196) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得蓝环凳!");
			cm.gainItem(3010029, 1);
			}
			else if (itemchance == 197) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得红环凳!");
			cm.gainItem(3010031, 1);
			}
			else if (itemchance == 198) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得黄环凳!");
			cm.gainItem(3010032, 1);
			}
			else if (itemchance == 199) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，沙漠兔子2靠垫!");
			cm.gainItem(3010052, 1);
			}
			else if (itemchance == 200) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得沙漠兔子1靠垫!");
			cm.gainItem(3010051, 1);
			}
			else if (itemchance == 201) {
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得同一红伞下!"); 
			cm.gainItem(3010044, 1);
			}
			else if (itemchance == 202) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得浪漫秋千!");
			cm.gainItem(3010036, 1);
			}
			else if (itemchance == 203) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得猪猪凳!");
			cm.gainItem(3010037, 1);
			}
			else if (itemchance == 204) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得魔女的飞扫把!");
			cm.gainItem(3010043, 1);
			}
			else if (itemchance == 205) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得篝火!");
			cm.gainItem(3012001, 1);
			}
			else if (itemchance == 206) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得大黄风!");
			cm.gainItem(3010069, 1);
			}
			else if (itemchance == 207) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得公主凳!");
			cm.gainItem(3010050, 1);
			}
			else if (itemchance == 208) { 
cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得猫头鹰椅子!");
			cm.gainItem(3010077, 1);
			}
			else if ((itemchance >= 209) && (itemchance <= 215)) { 
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得火柴!");
			cm.gainItem(1302084, 1);
			}
			else if ((itemchance >= 216) && (itemchance <= 221)) { 
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得雪狼战椅!");
			cm.gainItem(3010106, 1);
			}
			else if ((itemchance >= 222) && (itemchance <= 228)) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，2010年专属勋章!");
			cm.gainItem(2000005, 1);
			}
			else if ((itemchance >= 228) && (itemchance <= 240)) {
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得爱心椅子!");
			cm.gainItem(3012003, 1);
			}
			else if (itemchance >= 228) { 
 cm.serverNotice("『活动公告』：恭喜"+ cm.getChar().getName() +"，获得财神椅子!");
			cm.gainItem(3010100, 1);
			}

			cm.dispose();
		}
	}
}
