status = -1;
var itemList = Array(
// ------ 150武器 ------
Array(1532098,500,1,3), //法弗纳荣耀炮 - (无描述)
Array(1522094,500,1,3), //法弗纳双风翼弩 - (无描述)
Array(1492179,500,1,3), //法弗纳左轮枪 - (无描述)
Array(1482168,500,1,3), //法弗纳巨狼之爪 - (无描述)
Array(1472214,500,1,3), //法弗纳危险之手 - (无描述)
Array(1462193,500,1,3), //法弗纳风翼弩 - (无描述)
Array(1452205,500,1,3), //法弗纳追风者 - (无描述)
Array(1442223,500,1,3), //法弗纳半月宽刃斧 - (无描述)
Array(1432167,500,1,3), //法弗纳贯雷枪 - (无描述)
Array(1422140,500,1,3), //法弗纳闪电锤 - (无描述)
Array(1412135,500,1,3), //法弗纳战斗切肉斧 - (无描述)
Array(1402196,500,1,3), //法弗纳忏悔之剑 - (无描述)
Array(1382208,500,1,3), //法弗纳魔冠之杖 - (无描述)
Array(1372177,500,1,3), //法弗纳魔力夺取者 - (无描述)
Array(1362090,500,1,3), //法弗纳洞察手杖 - (无描述)
Array(1342082,500,1,3), //法弗纳急速之刃 - (无描述)
Array(1332225,500,1,3), //法弗纳大马士革剑 - (无描述)
Array(1322203,500,1,3), //法弗纳戈耳迪锤 - (无描述)
Array(1312153,500,1,3), //法弗纳双刃切肉斧 - (无描述)
Array(1302275,500,1,3), //法弗纳银槲之剑 - (无描述)
Array(1242061,500,1,3), //法弗纳精神之刃 - 鲁塔比斯套装(海盗)专用武器
Array(1242060,500,1,3), //法弗纳精神之刃 - 鲁塔比斯套装(飞侠)专用武器
Array(1232057,500,1,3), //法弗纳死亡使者 - (无描述)
Array(1222058,500,1,3), //法弗纳天使手铳 - (无描述)
Array(1212063,500,1,3)  //法弗纳魔力源泉杖 - (无描述)
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
            item = im.gainGachaponItem(itemId, quantity, "150武器箱", notice);
            if (item != -1) {
		im.gainItem(2431989, -1);
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