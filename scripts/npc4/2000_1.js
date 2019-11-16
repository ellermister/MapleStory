var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 红色箭头 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
function start() {

    if (cm.getChar().getMapId() != 209000015) {
        cm.sendSimple("#b各大排名可查看！\r\n\r\n\r\n#L0#"+红色箭头+"人气排行榜#l\t\t\t#L1#"+红色箭头+"等级排行榜#l  \r\n#r#L2#"+红色箭头+"家族排行榜#l  \t\t\t#L10#"+红色箭头+"金币排行榜#l\r\n\r\n");
    } else {
        cm.sendOk("不要再这个地图使用我")
    }
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) { //人气排行
        cm.人气排行榜();
        cm.dispose();
    } else if (selection == 1) {
        //Level
        cm.displayLevelRanks();
        cm.dispose();
    } else if (selection == 2) {
        //MapGui
        cm.displayGuildRanks();
        cm.dispose();
    } else if (selection == 10) {
        //MapGui
        cm.金币排行();
        cm.dispose();

    }
}