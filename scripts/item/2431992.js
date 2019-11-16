status = -1;
var itemList = Array(
// ------ 150暴君 ------
Array(1132174 , 500, 1, 3), //- 暴君西亚戴斯腰带 - (无描述)
Array(1132175 , 500, 1, 3), //- 暴君赫尔梅斯腰带 - (无描述)
Array(1132176 , 500, 1, 3), //- 暴君凯伦腰带 - (无描述)
Array(1132177 , 500, 1, 3), //- 暴君利卡昂腰带 - (无描述)
Array(1132178 , 500, 1, 3), //- 暴君阿尔泰腰带 - (无描述)
Array(1102481 , 500, 1, 3), //- 暴君西亚戴斯披风 - (无描述)
Array(1102482 , 500, 1, 3), //- 暴君赫尔梅斯披风 - (无描述)
Array(1102483 , 500, 1, 3), //- 暴君凯伦披风 - (无描述)
Array(1102484 , 500, 1, 3), //- 暴君利卡昂披风 - (无描述)
Array(1102485 , 500, 1, 3), //- 暴君阿尔泰披风 - (无描述)
Array(1082543 , 500, 1, 3), //- 暴君西亚戴斯手套 - (无描述)
Array(1082544 , 500, 1, 3), //- 暴君赫尔梅斯手套 - (无描述)
Array(1082545 , 500, 1, 3), //- 暴君凯伦手套 - (无描述)
Array(1082546 , 500, 1, 3), //- 暴君利卡昂手套 - (无描述)
Array(1082547 , 500, 1, 3), //- 暴君阿尔泰手套 - (无描述)
Array(1072743 , 500, 1, 3), //- 暴君西亚戴斯靴 - (无描述)
Array(1072744 , 500, 1, 3), //- 暴君赫尔梅斯靴 - (无描述)
Array(1072745 , 500, 1, 3), //- 暴君凯伦靴 - (无描述)
Array(1072746 , 500, 1, 3), //- 暴君利卡昂靴 - (无描述)
Array(1072747 , 500, 1, 3) //- 暴君阿尔泰靴 - (无描述)
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
            item = im.gainGachaponItem(itemId, quantity, "150暴君箱子", notice);
            if (item != -1) {
		im.gainItem(2431992, -1);
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