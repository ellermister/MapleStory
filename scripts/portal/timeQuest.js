function enter(pi) {
    var map = pi.getPlayer().getMapId();
    var tomapifdone = 0;
    var tomap = 0;
    var quest = 0;

    if (map == 270010100) {
        quest = 3501;
        tomapifdone = 270010110;
        tomap = 270010000;
    } else if (map == 270010200) {
        quest = 3502;
        tomapifdone = 270010210;
        tomap = 270010110;
    } else if (map == 270010300){
        quest = 3503;
        tomapifdone = 270010310;
        tomap = 270010210;
    } else if (map == 270010400){
        quest = 3504;
        tomapifdone = 270010410;
        tomap = 270010310;
    } else if (map == 270010500){
        quest = 3507;
        tomapifdone = 270020000;
        tomap = 270010410;
    } else if (map == 270020100){
        quest = 3508;
        tomapifdone = 270020110;
        tomap = 270020000;
    } else if (map == 270020200){
        quest = 3509;
        tomapifdone = 270020210;
        tomap = 270020110;
    } else if (map == 270020300){
        quest = 3510;
        tomapifdone = 270020310;
        tomap = 270020210;
    } else if (map == 270020400){
        quest = 3511;
        tomapifdone = 270020410;
        tomap = 270020310;
    } else if (map == 270020500){
        quest = 3514;
        tomapifdone = 270030000;
        tomap = 270020410;
    } else if (map == 270030100){
        quest = 3515;
        tomapifdone = 270030110;
        tomap = 270030100;
    } else if (map == 270030200){
        quest = 3516;
        tomapifdone = 270030210;
        tomap = 270030210;
    } else if (map == 270030300){
        quest = 3517;
        tomapifdone = 270030310;
        tomap = 270030310;
    } else if (map == 270030400){
        quest = 3518;
        tomapifdone = 270030410;
        tomap = 270030410;
    } else if (map == 270030500){
        quest = 3521;
        tomapifdone = 270040000;
        tomap = 270030410;
    } else if (map == 270040000){
        quest = 3522;
        tomapifdone = 270040100;
        tomap = 270040000; 
    }

    if (pi.getQuestStatus(quest) == net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
        pi.warp(tomapifdone,0);
        return true;
    } else {
        pi.warp(tomap,0);
        pi.getPlayer().dropMessage("任务完成之前，是无法进入下一关地图的。您已被系统自动返回！");
        return true;
    }
}  