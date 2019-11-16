/* Author: Xterminator
	NPC Name: 		Peter
	Map(s): 		Maple Road: Entrance - Mushroom Town Training Camp (3)
	Description: 	Takes you out of Entrace of Mushroom Town Training Camp
*/

var status = -1;


function action(mode, type, selection) {

    if (mode == 1) {

	status++;
 
   } else {

	status--;
 
   }

    if (status == 0) {

	cm.sendNext("尊敬的 #b#r#h ##k ,欢迎来到#b世纪冒险岛#k.\r\n世纪冒险岛版本为#rVer079#k的冒险岛，本服只开放#r冒险家#b(战士.魔法师.飞侠.弓箭手)#k，暂时不开放海盗、骑士团和战神，本服为复古回忆服，只为了和一起重拾以前一起开心的回忆！！希望你能在世纪冒险岛找到曾经的回忆，祝您开心每一天\r\n\r\n\t\t\t\t\t\t\t#r世纪冒险岛\t管理员:小义丶");
    } else if (status == 1) {

	cm.sendNextPrev("请记住，本服严禁使用各种非法程序，包括变速齿轮、脚本挂机，一旦发现，立刻#r删号踢群#k处理！毫不留情！！如果你同意，就点击 下一步 ,获得新手礼包,开始你的冒险之旅吧！！！");

    } else if (status == 2) {

	cm.warp(10000, 0);

	cm.gainExp(3);
	cm.gainItem(5530000,+1);
cm.喇叭(2, "欢迎[" + cm.getPlayer().getName() + "]来到世纪冒险岛，打开背包特殊栏，可领取新手礼包哦！");
	cm.dispose();

    }

}
