
status = -1;
var itemList = Array(
Array(4001322, 500, 1, 1),//蓝宝石
Array(4001323, 500, 1, 1),//红宝石
Array(3010592, 5, 1, 1), //巨大企鹅王椅子
Array(4250602, 800, 1, 1), //兵法
Array(2070006, 400, 1, 1), //齿轮
Array(2070007, 400, 1, 1), //月牙
Array(2330003, 400, 1, 1), //子弹
Array(2330004, 400, 1, 1), //子弹
Array(3010898, 800, 1, 1), //迷你神兽椅子
Array(3010879, 800, 1, 1), //繁星椅子
Array(3010465, 800, 1, 1), //可爱音符椅子
Array(3010099, 800, 1, 1), //鬼娃娃椅子
Array(3010376, 800, 1, 1), //橙色HP药水椅子
Array(1122001, 500, 1, 1), //绿色蝶形领结
Array(1122002, 500, 1, 1), //红色蝶形领结
Array(1122003, 500, 1, 1), //黄色蝶形领结
Array(1122004, 500, 1, 1), //粉红蝶形领结
Array(1122005, 500, 1, 1), //黑色蝶形领结
Array(1122006, 500, 1, 1), //蓝色蝶形领结
Array(1122015, 500, 1, 1), //枫叶围巾
Array(1122058, 100, 1, 1), //休彼德蔓的混沌项链
Array(1132000, 800, 1, 1), //白色腰带
Array(1132001, 700, 1, 1), //黄色腰带
Array(1132002, 600, 1, 1), //蓝色腰带
Array(1132003, 500, 1, 1), //红色腰带
Array(1132004, 450, 1, 1), //黑贺腰带
Array(1132010, 500, 1, 1), //黄金猪猪腰带
Array(1132011, 500, 1, 1), //黄金猪猪腰带
Array(1132012, 500, 1, 1), //法老的腰带
Array(1132013, 500, 1, 1), //不灭的法老腰带
Array(1122074, 500, 1, 1), //枫叶吊坠
Array(1122075, 500, 1, 1), //黄金枫叶魔法吊坠
Array(1002390, 500, 1, 1), //真扎昆头盔
Array(1002418, 500, 1, 0), //废报纸头盔
Array(1002419, 500, 1, 0), //枫叶帽
Array(1002424, 500, 1, 0), //红马术帽
Array(1002425, 500, 1, 0), //蓝马术帽
Array(1002441, 500, 1, 0), //热血头带
Array(1002508, 500, 1, 0), //枫叶头盔
Array(1002509, 500, 1, 0), //枫叶头盔
Array(1002510, 500, 1, 0), //枫叶头盔
Array(1002511, 500, 1, 0), //枫叶头盔
Array(1002547, 500, 1, 0), //红猎人帽子
Array(1002550, 500, 1, 0), //黑色格莱西头盔
Array(1002551, 500, 1, 0), //蓝龙头盔
			Array(1382049,300,1), //朱雀长杖
			Array(1382050,300,1), //玄武长杖
			Array(1382051,300,1), //白虎长杖
			Array(1382052,300,1), //青龙长杖

			Array(1332114,500, 1, 1), //黄金枫叶短刀
			Array(1322084,500, 1, 1), //黄金枫叶锤子
			Array(1312056,500, 1, 1), //黄金枫叶斧子
			Array(1422057,500, 1, 1), //黄金枫叶巨锤
			Array(1442104,500, 1, 1), //黄金枫叶开山斧
			Array(1432075,500, 1, 1), //黄金枫叶枪
			Array(1402085,500, 1, 1), //黄金枫叶双手剑
			Array(1372071,500, 1, 1), //黄金枫叶短杖
			Array(1462085,500, 1, 1), //黄金枫叶弩
			Array(1452100,500, 1, 1), //黄金枫叶弓
			Array(1472111,500, 1, 1), //黄金枫叶拳套
			Array(1482073,500, 1, 1), //黄金枫叶指节
			Array(1492073,500, 1, 1), //黄金枫叶短枪
			
			Array(1302059,500, 1, 1), //黄金枫叶短枪
			Array(1402036,500, 1, 1), //黄金枫叶短枪
			Array(1432038,500, 1, 1), //黄金枫叶短枪
			Array(1442045,500, 1, 1), //黄金枫叶短枪
			Array(1382036,500, 1, 1), //黄金枫叶短枪
			Array(1452044,500, 1, 1), //黄金枫叶短枪
			Array(1472051,500, 1, 1), //黄金枫叶短枪
			Array(1332050,500, 1, 1), //黄金枫叶短枪
			Array(1462039,500, 1, 1), //黄金枫叶短枪
			Array(1482013,500, 1, 1), //黄金枫叶短枪
			Array(1492013,500, 1, 1), //黄金枫叶短枪
			
Array(1032031, 500, 1, 0), //蓝龙头盔
Array(1302056, 500, 1, 0), //蓝龙头盔
Array(1402035, 500, 1, 0), //蓝龙头盔
Array(1432030, 500, 1, 0), //蓝龙头盔
Array(1442044, 500, 1, 0), //蓝龙头盔
Array(1372010, 500, 1, 0), //蓝龙头盔
Array(1382035, 500, 1, 0), //蓝龙头盔
Array(1452019, 500, 1, 0), //蓝龙头盔
Array(1462015, 500, 1, 0), //蓝龙头盔
Array(1332051, 500, 1, 0), //蓝龙头盔
Array(1472053, 500, 1, 0), //蓝龙头盔
Array(1482012, 500, 1, 0), //蓝龙头盔
Array(1492012, 500, 1, 0), //蓝龙头盔
Array(1002554, 500, 1, 0) //武艺头绳
//-----椅子-----

);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("再见得把油。");
            cm.dispose();
        }
        status--;
    }
		if (status == 0) {
			if(cm.haveItem(4170005,3)) {
var str1 = "\r\n";	
           for (var i = 0; i < itemList.length; i++){
                   str1 += "#v"+itemList[i][0]+"#";
            }
				cm.sendYesNo("消耗3个#v4170005#抽取以下物品!\r\n#k当前拥有:#c4170005# 个。 以下是全部物品:" + str1);
			} else {
var str1 = "\r\n";	
           for (var i = 0; i < itemList.length; i++){
                   str1 += "#v"+itemList[i][0]+"#";
            }
				cm.sendOk("消耗3个#v4170005#抽取以下物品!\r\n#k当前拥有:#c4170005# 个。 以下是全部物品:" + str1);
				cm.dispose();
			}
		} else if (status == 1){	
        var chance = Math.floor(Math.random() * 700);
        var finalitem = Array();
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = finalitem[finalchance][2];
            var notice = finalitem[finalchance][3];
            item = cm.gainGachaponItem(itemId, quantity, "神圣之力黄蛋", notice);
            if (item != -1) {
				//cm.setmoneyb(-3);
cm.gainItem(4170005, -3);//获得物品
                cm.sendOk("你获得了 #b#t" + item + "##k " + quantity + "个。");
            } else {
                cm.sendOk("请你确认在背包的装备，消耗，其他窗口中是否有一格以上的空间。");
            }
            cm.safeDispose();
        } else {
            cm.sendOk("怎么没接住球啊，算了还你宝石吧。");
           // cm.setmoneyb(-3);
//cm.gainItem(4170005, 3);//获得物品
			//cm.gainNX(1000);	//加减点券
            cm.safeDispose();
        }
    }
}









