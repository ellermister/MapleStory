status = -1;
var itemList = Array(
//-------耳环-------
Array(2290000,800,1,1),
			Array(2041120,800,1,1),//欢乐力量卷轴30%
			Array(2041121,800,1,1),//欢乐敏捷卷轴30%
			Array(2041122,800,1,1),//欢乐智力卷轴30%
			Array(2041123,800,1,1)//欢乐幸运卷轴30%
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("可以抽取蓝调戒指专用卷轴哦！");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.haveItem(4030002,1)) {
            cm.sendYesNo("你好，这里玩具副本蓝调戒指专用卷轴抽取处，你要抽取吗？");
        } else {
            cm.sendOk("你背包里有#b#t4030002##k吗?");
            cm.safeDispose();
        }
    } else if (status == 1) {
        var chance = Math.floor(Math.random() * 800);
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
            item = cm.gainGachaponItem(itemId, quantity, "玩具副本奖励", notice);
            if (item != -1) {
                cm.gainItem(4030002, -1);
                cm.sendOk("你获得了 #b#t" + item + "##k " + quantity + "个。");
            } else {
                cm.sendOk("你确实有#b#t4030002##k吗？如果是，请你确认在背包的装备，消耗，其他窗口中是否有一格以上的空间。");
            }
            cm.safeDispose();
        } else {
            cm.sendOk("今天的运气可真差，什么都没有拿到。\r\n(获得了安慰奖：白雪人法老的蓝宝石。)");
            cm.gainItem(4030002, -1);
            cm.gainItem(4030002, 1);
            cm.safeDispose();
        }
    }
}