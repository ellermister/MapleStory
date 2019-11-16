importPackage(net.sf.odinms.server.maps);

function start() {
    cm.sendAcceptDecline("本服务器骑士团技能已经全部修复完毕！现开启#b骑士团#k职业！致此，你可以体验新职业的乐趣。另外。新职业版本我们也将会和盛大同步更新。尽情期待！第五职业矛战士登场！");
}

function action(mode, type, selection) {
    var returnmap = cm.getChar().getSavedLocation(SavedLocationType.CYGNUSINTRO);

    if (returnmap == null) {
        cm.warp(130000000, 0);
    } else {
        if (mode == 1) {
            cm.warp(returnmap != -1 ? returnmap : 130000000, 0);
        } else {
            cm.warp(130000000, 0);
        }
        cm.getChar().clearSavedLocation(SavedLocationType.CYGNUSINTRO);
    }
    dispose();
}
