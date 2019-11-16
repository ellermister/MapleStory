【】status = -1;
var itemList = Array(
			Array(2040874,80,1,1), //暴风手套攻击卷轴
			Array(2040875,80,1,1), //暴风手套攻击卷轴
                        Array(1113077,100,1,1), //绝对之戒
			Array(2044003,100,1,1), //双手剑攻击必成卷
			Array(2043003,100,1,1), //单手剑攻击必成卷
			Array(1122122,200,1,1), //真觉醒之心
			Array(1122123,200,1,1), //真觉醒之心
			Array(1122124,200,1,1), //真觉醒之心
			Array(1122125,200,1,1), //真觉醒之心
			Array(1122126,200,1,1), //真觉醒之心
			Array(2043103,100,1,1), //单手斧攻击必成卷
			Array(2044103,100,1,1), //双手斧攻击必成卷
			Array(2043203,200,1,1), //单手钝器攻击必成卷
			Array(2044203,250,1,1), //双手钝器攻击必成卷
			Array(2044303,100,1,1), //枪攻击必成卷
			Array(2044908,100,1,1), //短枪攻击必成卷
			Array(1112584,300,1,1), //旭日戒指
			Array(2044403,100,1,1), //矛攻击必成卷
			Array(2044503,100,1,1), //弓攻击必成卷
			Array(2044603,100,1,1), //弩攻击必成卷
			Array(1112593,300,1,1), //全能戒指
			Array(1132072,250,1,1), //锐利棕色金腰带
			Array(1132087,350,1,1), //三国名将活动挑战者腰带
			Array(1132181,350,1,1), //黄金发财梦腰带
			Array(1132110,200,1,1), //传说冒险岛腰带
			Array(2044703,100,1,1), //拳套攻击必成卷
			Array(1012474,100,1,1), //10周年大赏枫叶脸饰
			Array(2043303,100,1,1), //短剑攻击必成卷
			Array(2044815,100,1,1), //指节攻击必成卷
			Array(2043803,100,1,1), //长杖攻击必成卷
			Array(2043703,100,1,1), //短杖攻击必成卷
			Array(1082149,250,1,1), //喝色工地手套
			Array(1082515,200,1,1), //妖精工地手套
			Array(1102084,150,1,1), //粉红盖亚披风
			Array(1102086,200,1,1), //紫色盖亚披风
			Array(2040874,80,1,1), //爆风手套必成卷
			Array(1112105,200,1,1), //粉红绸带名片戒指
			Array(1112135,150,1,1), //水墨花名片戒指
			Array(1112141,100,1,1), //红玫瑰名片戒指
			Array(1112952,50,1,1), //希拉的愤怒
			Array(4251202,60,1,1), //高等五彩水晶
			Array(1432013,100,1,1), //南瓜枪
			Array(1302035,100,1,1), //枫叶旗
			Array(1442018,100,1,1), //冻冻鱼
			Array(1442039,100,1,1), //冻冻鱼
			Array(1072743,100,1,1), //暴君西亚戴斯靴
			Array(1072744,100,1,1), //暴君赫尔梅斯靴
			Array(1072745,100,1,1), //暴君凯伦靴
			Array(1072746,100,1,1), //暴君利卡昂靴
			Array(1072747,100,1,1), //暴君阿尔泰靴
			Array(1302063,100,1,1), //燃烧的火焰刀
			Array(1302106,100,1,1), //燃烧的冰焰刀			
			Array(1112145,100,1,1), //浪漫花边名片戒指				
		        Array(2040506,300,1,1), //全身铠甲敏捷必成卷			
                        Array(1462112,200,1,1), //枫叶超级努
                        Array(1452124,200,1,1), //枫叶超级弓
                        Array(1003693,100,1,1), //小南瓜帽
                        Array(1003788,300,1,1), //妖精真挚帽
                        Array(1003780,100,1,1), //自由布莱克缤帽
                        Array(1003745,400,1,1), //白蛇帽子
                        Array(1492096,200,1,1), //风叶超级短枪
                        Array(1402105,200,1,1), //风业超级巨见
                        Array(1382119,200,1,1), //超级风业长帐
                        Array(1332143,200,1,1), //超级风业短刀
                        Array(1402014,280,1,1), //温度计
                        Array(1452022,400,1,1), //风业弓
                        Array(1432012,400,1,1), //风业枪
                        Array(1462019,400,1,1), //风业弩
                        Array(1302208,400,1,1), //风业剑
                        Array(1472032,400,1,1), //风业拳                     
                        Array(3010112, 425, 1, 1)
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("不想抽奖吗？…我的池塘里有各类#b奇特座椅或卷轴、装备、新奇道具#k哦！");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.getPlayer().getCSPoints(1) >= 5000) {
            cm.sendYesNo("当前点卷余额：#r#e" + cm.getPlayer().getCSPoints(1) + "#n\r\n#b5000#r 点券抽奖一次！ ");
        } else {
            cm.sendOk("您有5000点券吗?");
            cm.safeDispose();
        }
    } else if (status == 1) {
        var chance = Math.floor(Math.random() * 400);
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
            item = cm.gainGachaponItem(itemId, quantity, "限时抽奖", notice);
            if (item != -1) {
				cm.gainNX(-5000);
                cm.gainItem(5220040, -1);
                cm.sendOk("你获得了 #b#t" + item + "##k " + quantity + "个。");
            } else {
                cm.sendOk("你确实有5000点券吗？如果是，请你确认在背包的装备，消耗，其他窗口中是否有一格以上的空间。");
            }
            cm.safeDispose();
        } else {
            cm.sendOk("今天的运气可真差，什么都没有拿到。\r\n(获得了安慰奖：白雪人法老的蓝宝石。)");
				cm.gainNX(-5000);
            cm.gainItem(5220040, -1);
            cm.gainItem(4001322, 1);
            cm.safeDispose();
        }
    }
}