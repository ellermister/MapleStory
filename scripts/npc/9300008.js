/*
	脚本类型: 		NPC
	所在地图:		孤星殿
	脚本名字:		红鸾宫地图离开NPC
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == -1) {
            cm.dispose();
        } else if (status == 0) {
            cm.sendSimple("祝两位喜结娘缘，五福四海，早生贵子！#b\r\n#L0# 结婚好了，想到宴客堂招待宴客。")
        } else if (status == 1) {
            cm.warp(700000200)
            cm.dispose();
        }
    }
}