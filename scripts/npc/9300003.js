var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (cm.getMapId() != 700000100) {
        cm.sendOk("如果你想结婚,请告诉我.");
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendYesNo("你想开始结婚仪式吗?");
    } else if (status == 1) {
        var marr = cm.getQuestRecord(160001);
        var data = marr.getCustomData();
        if (data == null) {
            marr.setCustomData("0");
            data = "0";
        }
        if (data.equals("0")) {
            if (!cm.getParty().getMembers().size() == 2) { //判断组队成员是否达到2人。
                cm.sendNext("组队人员不能超过两个人。不是你们两个人结婚吗？")
                cm.dispose();
            } else if (!cm.isLeader()) { // 不是队长
                cm.sendOk("你想结婚吗？那就请你的组队长和我讲话吧…");
                cm.dispose();
            } else if (cm.getPlayer().getMarriageId() > 0) { //查看玩家是否已经结婚。
                cm.sendNext("你已经结婚了吧… 结婚的话是不能再结婚的。")
                cm.dispose();
            } else if (cm.MarrageChecking() == 3) { //检测组队中是否已经结婚
                cm.sendNext("你的组队中，已经有人结过婚了。\r\n请检查后再试。");
                cm.dispose();
            } else if (cm.allMembersHere() == false) { //检测是否在同1地图
                cm.sendNext("请确保您的伴侣和您在同一地图。")
                cm.dispose();
            } else if (cm.MarrageChecking() == 4) {
                cm.sendNext("我不支持同性结婚。所以不让你们进去")
                cm.dispose();
            } else if (cm.MarrageChecking() == 5) {
                cm.sendNext("男士:#b#b#t1050121##k或#b#b#t1050122##k或#b#b#t1050113##k，女士:#b#t1051129##k或#b#t1051130##k或#b#t1051114##k。其中#b#t1050121##k，#b#t1051129##k，#b#t1050113##k，#b#t1051114##k,这些道具在冒险商城可以购买，#b#t1050122##k和#b#t1051130##k是在那边那位红线女那里卖。\r\n\r\n#b请穿上礼服后再和我对话。")
                cm.dispose();
            } else if (cm.MarrageChecking() == 6) {
                cm.sendNext("组队成员中有人没有结婚戒指。")
                cm.dispose();
            } else {
                var chr = cm.getMap().getCharacterById(cm.getPartyFormID());
                if (chr == null) {
                    cm.sendOk("请确定你的伴侣是在同一地图.");
                    cm.dispose();
                    return;
                }
                marr.setCustomData("2_");
                cm.setQuestRecord(chr, 160001, "2_");
                cm.doWeddingEffect(chr);
            }
        } else if (data.equals("2_") || data.equals("2")) {
            if (cm.getPlayer().getMarriageId() <= 0) {
                cm.sendOk("请确认你的伴侣同意开始结婚仪式.");
                cm.dispose();
                return;
            }
            var chr = cm.getMap().getCharacterById(cm.getPlayer().getMarriageId());
            if (chr == null) {
                cm.sendOk("请确定你的伴侣是在同一地图.");
                cm.dispose();
                return;
            }
            cm.setQuestRecord(cm.getPlayer(), 160001, "3");
            cm.setQuestRecord(chr, 160001, "3");
            var dat = parseInt(cm.getQuestRecord(160002).getCustomData());
            if (dat > 10) {
                cm.warpMap(700000200, 0);
            } else {
                cm.setQuestRecord(chr, 160002, "0");
                cm.setQuestRecord(cm.getPlayer(), 160002, "0");
                cm.warpMap(700000300, 0);
            }
        } else {
            cm.sendOk("你们开始结婚啦!");
        }
        cm.dispose();
    }
}