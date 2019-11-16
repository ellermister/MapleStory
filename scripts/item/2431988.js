status = -1;
var itemList = Array(
// ------ 150装备 ------
Array(1003797,500,1,3), //高贵战士头盔 - (无描述)
Array(1003798,500,1,3), //高贵流丹维奇帽 - (无描述)
Array(1003799,500,1,3), //高贵游侠贝雷帽 - (无描述)
Array(1003800,500,1,3), //高贵刺客软帽 - (无描述)
Array(1003801,500,1,3), //高贵流浪者帽 - (无描述)
Array(1042254,500,1,3), //鹰眼战士盔甲 - (无描述)
Array(1042255,500,1,3), //鹰眼丹维奇长袍 - (无描述)
Array(1042256,500,1,3), //鹰眼游侠斗篷 - (无描述)
Array(1042257,500,1,3), //鹰眼刺客衬衣 - (无描述)
Array(1042258,500,1,3), //鹰眼流浪者外衣 - (无描述)
Array(1062165,500,1,3), //魔术师战士短裤 - (无描述)
Array(1062166,500,1,3), //魔术师丹维奇短裤 - (无描述)
Array(1062167,500,1,3), //魔术师游侠短裤 - (无描述)
Array(1062168,500,1,3), //魔术师刺客短裤 - (无描述)
Array(1062169,500,1,3)  //魔术师流浪者短裤 - (无描述)
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendOk("不想使用吗？…我的肚子里有各类#b奇特座椅或卷轴、装备、新奇道具#k哦！");
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        var chance = Math.floor(Math.random() * 500);
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
            item = im.gainGachaponItem(itemId, quantity, "150装备箱", notice);
            if (item != -1) {
		im.gainItem(2431988, -1);
                im.sendOk("你获得了 #b#t" + item + "##k " + quantity + "个。");
            } else {
                im.sendOk("请你确认在背包的装备，消耗，其他窗口中是否有一格以上的空间。");
            }
            im.safeDispose();
        } else {
            im.sendOk("今天的运气可真差，什么都没有拿到。");
            im.safeDispose();
        }
    }
}