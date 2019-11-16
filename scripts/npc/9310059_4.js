var status = 0;
var itemList = 
Array(     
			Array(2340000,800,1,1), //祝福
			Array(1332114,800,1,1), //刃
			Array(1372071,800,1,1), //短杖
			Array(1382093,800,1,1), //杖
			Array(1402085,800,1,1), //双手
			Array(1432075,800,1,1), //枪
			Array(1452100,800,1,1), //弓
			Array(1472111,800,1,1), //拳
			Array(3015183,600,1,1), //大兔子
			Array(2043002,800,1,1), //单手剑10
			Array(2044002,800,1,1), //双手剑10
			Array(2044302,800,1,1), //枪10
			Array(2044502,800,1,1), //弓10
			Array(2044702,800,1,1), //拳套10
			Array(2043802,800,1,1), //长杖10
			Array(2043702,800,1,1), //短杖10
			Array(2000005,800,20,1), //超级
			Array(2043702,800,1,1), //短杖10
			Array(2043702,800,1,1), //短杖10
			Array(2049100,600,1,1) //混沌
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
            cm.sendOk("天空副本主要出产：#v1452100#各职业77黄金枫叶武器，#v2043702#只有10%卷轴，#v3015183#精品椅子，#v2340000##v2049100#祝福卷轴/混沌卷轴，#v2000005#超级药水x20，等奖励.");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.haveItem(4170006, 1)) {
            cm.sendYesNo("天空副本主要出产：#v1452100#各职业77黄金枫叶武器，#v2043702#只有10%卷轴，#v3015183#精品椅子，#v2340000##v2049100#祝福卷轴/混沌卷轴，#v2000005#超级药水x20，等奖励.");
        } else {
            cm.sendOk("天空副本主要出产：#v1452100#各职业77黄金枫叶武器，#v2043702#只有10%卷轴，#v3015183#精品椅子，#v2340000##v2049100#祝福卷轴/混沌卷轴，#v2000005#超级药水x20，等奖励.你背包里有1个#b#t4170005##k吗?");
            cm.safeDispose();
        }
    } else if (status == 1) {
        var chance = Math.floor(Math.random() * +900);
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
            item = cm.gainGachaponItem(itemId, quantity, "天空副本福利抽奖", notice);
            if (item != -1) {
                cm.gainItem(4170006, -1);
                cm.sendOk("你获得了 #b#t" + item + "##k " + quantity + "个。");
            } else {
                cm.sendOk("你确实有#b#t4170005##k吗？如果是，请你确认在背包的装备，消耗，其他窗口中是否有一格以上的空间。");
            }
            cm.safeDispose();
        } else {
            cm.sendOk("今天的运气可真差，什么都没有拿到。");
            cm.gainItem(4170006, -1);
            cm.safeDispose();
        }
    }
}