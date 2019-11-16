/*
	Pink Balloon - LudiPQ Bonus stage NPC
*/

function start() {
	cm.warp(922011100);
    cm.sendNext("你已经离开奖励地图");
	cm.dispose();
}

function action(mode, type, selection) {
    cm.dispose();
}