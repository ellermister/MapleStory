var status = 0;
var itemList = 
Array(     
			Array(2040017,800,1,1), //头盔命中率卷轴60%
			Array(2040105,800,1,1), //脸部装饰回避率卷轴10%
			Array(2040106,800,1,1), //脸部装饰回避率卷轴60%
			Array(2040200,800,1,1), //眼部装饰命中率卷轴10%
			Array(2040201,800,1,1), //眼部装饰命中率卷轴60%
			Array(2040205,800,1,1), //眼部装饰智力卷轴10%
			Array(2040206,800,1,1), //眼部装饰智力卷轴60%		
			Array(2040301,800,1,1), //耳环智力卷轴 60
			Array(2040302,800,1,1), //耳环智力卷轴 10
			Array(2040501,800,1,1), //全身铠甲敏捷卷轴60
			Array(2040513,800,1,1), //全身铠甲智力卷轴60
			Array(2040613,800,1,1), //裤裙敏捷卷轴60%
			Array(2040704,800,1,1), //鞋子跳跃卷轴60
			Array(2040705,800,1,1), //鞋子跳跃卷轴10
			Array(2040804,800,1,1), //手套攻击卷轴60
			Array(2040805,800,1,1), //手套攻击卷轴10
			Array(2040816,800,1,1), // 手套魔力卷轴10%
			Array(2040817,800,1,1), //手套魔力卷轴60%
			Array(2040914,800,1,1), // 盾牌攻击卷轴60%
			Array(2041013,800,1,1), //披风力量卷轴60
			Array(2041016,800,1,1), //披风智力卷轴60
			Array(2041019,800,1,1), //披风敏捷卷轴60
			Array(2041022,800,1,1), //披风运气卷轴60
			Array(2043002,600,1,1), //单手剑10
			Array(2043001,600,1,1), //单手剑60
			Array(2044002,600,1,1), //双手剑10
			Array(2044001,600,1,1), //双手剑60
			Array(2044302,600,1,1), //枪10
			Array(2044301,600,1,1), //枪60
			Array(2044502,600,1,1), //弓10
			Array(2044501,600,1,1), //弓60
			Array(2044602,600,1,1), //弩10
			Array(2044601,600,1,1), //弩60
			Array(2044702,600,1,1), //拳套10
			Array(2044701,600,1,1), //拳套60
			Array(2043802,600,1,1), //长杖10
			Array(2043801,600,1,1), //长杖60
			Array(2043702,600,1,1), //短杖10
			Array(2043701,600,1,1), //短杖60
			Array(1082145,600,1,1), //黄手套
			Array(1082146,600,1,1), //红手套
			Array(1082147,600,1,1), //蓝手套
			Array(1082148,600,1,1), //紫手套
			Array(1082149,600,1,1), //褐手套
			Array(1082150,600,1,1), //灰手套
			Array(1092030,600,1,1), //枫叶盾
			Array(1302030,600,1,1), //43枫叶剑
			Array(1382012,600,1,1), //43枫叶杖
			Array(1472032,600,1,1), //43枫叶拳
			Array(1452022,600,1,1), //43枫叶弓
			Array(1332025,600,1,1), //43枫叶刃
			Array(1432058,600,1,1), //43枫叶枪
			Array(1092021,600,1,1), //光子盾
			Array(1092029,600,1,1), //电磁光盾
			Array(1012170,400,1,1), //GWW
			Array(1112319,600,1,1) //戒指
);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("不想使用吗？…我的肚子里有各类#b奇特座椅或卷轴、装备、新奇道具#k哦！");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.haveItem(4170002, 1)) {
            cm.sendYesNo("这里是废弃组队，蛋蛋抽奖处。奖励为：90#v01012170#,#v1112319#，#v1332025#各职业43级枫叶武器/枫叶盾，#v1092021##v1092029#光子/电磁盾，#v1082149#各色工地手套｛包括褐色｝，各种#v2044602#10%/60%卷轴。 ");
        } else {
            cm.sendOk("这里是废弃组队，蛋蛋抽奖处。奖励为：90#v01012170#,#v1112319#，#v1332025#各职业43级枫叶武器/枫叶盾，#v1092021##v1092029#光子/电磁盾，#v1082149#各色工地手套｛包括褐色｝，各种#v2044602#10%/60%卷轴。  你背包里有1个#b#t4170002##k吗?");
            cm.safeDispose();
        }
    } else if (status == 1) {
        var chance = Math.floor(Math.random() * 900);
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
            item = cm.gainGachaponItem(itemId, quantity, "废弃副本福利抽奖", notice);
            if (item != -1) {
                cm.gainItem(4170002, -1);
                cm.sendOk("你获得了 #b#t" + item + "##k " + quantity + "个。");
            } else {
                cm.sendOk("你确实有#b#t4170002##k吗？如果是，请你确认在背包的装备，消耗，其他窗口中是否有一格以上的空间。");
            }
            cm.safeDispose();
        } else {
            cm.sendOk("今天的运气可真差，什么都没有拿到。");
            cm.gainItem(4170002, -1);
            cm.safeDispose();
        }
    }
}