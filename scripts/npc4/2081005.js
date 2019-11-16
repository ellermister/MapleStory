/*
	Crystal of Roots - Leafre Cave of life
 */

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (cm.getMapId() == 240040700) {
            cm.sendYesNo("你想离开这里到 #m240050400# 吗?");
        } else {
            cm.sendYesNo("你想离开这里到 #m240050400# 吗?");
        }
    } else if (status == 1) {
        if (cm.getMapId() == 240040700) {
            cm.warp(240050400, 0);
        } else {
            cm.warp(240050400, 0);
        }
        cm.dispose();
    }
}