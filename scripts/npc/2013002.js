/*.需要脚本至尊,请联系QQ：13535330294.*/

importPackage(net.sf.odinms.client);

var status;


function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1 || mode == 0) {
		cm.dispose();
		return;
	} else {
		if (mode == 1)
			status++; 
		else
			status--;
		if (status == 0) {
		if (cm.getPlayer().getMapId() == 920010000){
var text = "No1.我想你应该有能力拯救这个地方.去吧!\r\n#L0#进入下一关#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 200080101){
var text = "想挑战女神副本吗?\r\n#L1#进入下#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 541010050){
var text = "能来这里,你应该有打败BOSS的可能!\r\n#L2#进入下一关#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 920011300){
cm.removeAll(4001050);
				cm.removeAll(4001051);
				cm.removeAll(4001052);
				cm.removeAll(4001044);
				cm.removeAll(4001045);
				cm.removeAll(4001046);
				cm.removeAll(4001047);
				cm.removeAll(4001048);
				cm.removeAll(4001049);
				cm.removeAll(4001063);
				cm.removeAll(4031309);
				cm.removeAll(4001053);
				cm.removeAll(4001054);
				cm.removeAll(4001056);
				
				cm.warp(100000200);
				
				cm.dispose();
}else {//vip1待遇
var text = "但愿有人能消灭这里的怪物.我的神！";
cm.sendOk(text);
cm.dispose();
}
		}
		else if(status == 1) {
			if (selection == 0) {
if (cm.getHour() < 0) {
cm.sendOk("过掉活动时间,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");

cm.dispose();
}else if (cm.getHour() > 99) {
cm.warp(910000000,0);
cm.sendOk("过掉活动时间,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");

cm.dispose();
}else if (cm.haveItem(4001063,20)) {
cm.getMap(920010400).addMapTimer(900, 200080101);
cm.gainItem(4001063,-20);
cm.warpParty(920010400);
cm.sendOk("但愿你们能坚持下来.");
cm.dispose();

}else {	
cm.sendOk("数量不足");
cm.dispose();
}

//
}else if (selection == 1) {
if (cm.getParty() == null) { // No Party
				cm.sendOk("您想要挑战#b女神组队修炼#k吗?那么您必须要有一个组队噢!\r\n·等级要求:21级-200级.\r\n·队伍要求:3-6人\r\n#k·任务奖励:#b玩具,经验,高级装备等.");
cm.dispose();
} else if(party.getMembers().size() < 4) {
		cm.sendOk("#b你所在的队伍必须拥有3名队员才能进入.");
		cm.dispose();


                      } else if (!cm.isLeader()) { // Not Party Leader
				cm.sendOk("如果想要挑战#b女神组队修炼#k请让你们的#b组队长#k来找我吧!.");
cm.dispose();
} else if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
cm.getMap(920010000).addMapTimer(900, 200080101);
cm.warpParty(920010000);
cm.dispose();
}
}else if (selection == 2) {
if (cm.getHour() < 19) {
cm.warp(910000000,0);
cm.sendOk("过掉活动时间,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");

cm.dispose();
}else if (cm.getHour() > 22) {
cm.warp(910000000,0);
cm.sendOk("过掉活动时间,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");
cm.dispose();
}else if (cm.haveItem(4000383,500)) {
cm.gainItem(4000383,-500);
 cm.gainItem(4001117,1); 
cm.warp(541010100,0);
cm.sendOk("但愿你能打败他~");
cm.dispose();
}else {	
cm.sendOk("但愿你能打败幽灵船长,请先展现下你的实力吧~收集500个#v4000383#.请注意时间!!!超过22点,任务将视为放弃.!");
cm.dispose();
}



}else if (selection == 3) {
var map =cm.getChar().getMap();
if(map.mobCount() >= 100){
cm.sendOk("消灭地图中已有的#b船长#k才能进行再次召唤.!");
cm.dispose();
}else if (!cm.haveItem(4001117,1)) {
cm.sendOk("你貌似已经召唤过了吧?");
cm.dispose();
}else {
  cm.summonMob(9420513, 500000000, 10000, 1);//船长5E血
 cm.gainItem(4001117,-1);
cm.serverNotice("[任务]: 玩家 [" + cm.getPlayer() + "] 成功召唤了船长,他能否打败船长,获得奖励呢?");

cm.dispose();


}
}else if (selection == 4) {
if (!cm.haveItem(3994026,1)) {
cm.sendOk("您不能选择这个奖励关卡.!");
cm.dispose();
}else { 
cm.gainItem(4002002, 3);
cm.gainItem(3994026, -1);
cm.dispose(); 
} 

}else if (selection == 5) {
if (!cm.haveItem(3994034,1)) {
cm.sendOk("您不能选择这个奖励关卡.!");
cm.dispose();
}else { 
cm.gainItem(4002002, 2);
cm.gainItem(3994034, -1);
cm.dispose(); 
} 

}else if (selection == 6)  {
if (!cm.haveItem(3994027,1)) {
cm.sendOk("您不能选择这个奖励关卡.!");
cm.dispose();
}else { 
cm.gainItem(4031454, 1);
cm.gainItem(3994027, -1);
cm.dispose(); 
} 

}else if (selection == 7) {
cm.sendOk("#v3994026##r字奖励关卡:#k\r\n   由于掉率相比#b银字#k低了5倍,\r\n#v3994034##r字奖励关卡:#k\r\n   由于掉率相比#b银字#k低了4倍\r\n   特别包含#b[110级装备,部分玩具,100%必成卷.稀有椅子]#k等.\r\n#v3994027##r字奖励关卡:#k\r\n   进入后,在60秒内,会有无数装备飞出来,你能捡到那就是你的啦~\r\n   特别包含#b[110级装备,部分玩具,100%必成卷.稀有椅子]#k等..\r\n\r\nPs:当然,也可以和别人冒险岛挑战,而且只消耗队长的字符哦!");
cm.dispose();

}}}}
