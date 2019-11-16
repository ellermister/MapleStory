/*需要脚本至尊,请联系QQ：13535330294.*/

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
}else if (cm.getPlayer().getMapId() == 920010400){
var text = "跳到上面去,然后收集3个音乐碟子.交给我即可完成本关.\r\n#L1#进入下#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 920010600){
var text = "能来这里,你应该有打败BOSS的可能!\r\n#L2#进入下一关#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);

}else if (cm.getPlayer().getMapId() == 920010200){
var text = "能来这里,你应该有打败BOSS的可能!\r\n#L3#进入下一关#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);

}else if (cm.getPlayer().getMapId() == 920010800){
var text = "能来这里,你应该有打败BOSS的可能!\r\n\r\n#L4##b召唤远古精灵#l\r\n\r\n#L5##r领取奖励#l#k\r\n\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);


}else if (cm.getPlayer().getMapId() == 920011200){
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
var text = "但愿有人能消灭这里的怪物.我的神！少放屁~~牙牙地";
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
cm.givePartyExp(+30000);
cm.sendOk("但愿你们能坚持下来.");
cm.dispose();

}else {	
cm.sendOk("#v4001063# 需要20个, 目前数量不足!");
cm.dispose();
}


}else if (selection == 1) {
if (cm.getHour() < 0) {
cm.sendOk("过掉活动时间,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");

cm.dispose();
}else if (cm.getHour() > 99) {
cm.warp(910000000,0);
cm.sendOk("过掉活动时间,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");

cm.dispose();
}else if (cm.haveItem(4001056,3)) {
cm.getMap(920010600).addMapTimer(1800, 200080101);
cm.gainItem(4001056,-3);

cm.warpParty(920010600);
cm.givePartyExp(+35000);
cm.sendOk("但愿你们能坚持下来.");
cm.dispose();

}else {	
cm.sendOk("#v4001056# 需要3个, 目前数量不足!");
cm.dispose();
}
}else if (selection == 2) {
if (cm.getHour() < 0) {
cm.warp(910000000,0);
cm.sendOk("过掉活动时间,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");

cm.dispose();
}else if (cm.getHour() > 99) {
cm.warp(910000000,0);
cm.sendOk("过掉活动时间,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");
cm.dispose();
}else if (cm.haveItem(4001050,40)) {
cm.getMap(920010200).addMapTimer(900, 200080101);
cm.gainItem(4001050,-40);
cm.warpParty(920010200);
cm.givePartyExp(+40000);
cm.sendOk("但愿你能打败他~");
cm.dispose();
}else {	
cm.sendOk("但愿你能继续下去.请收集40个#v4001050#.然后交给我!");
cm.dispose();
}



}else if (selection == 3) {
if (cm.getHour() < 0) {
cm.warp(910000000,0);
cm.sendOk("过掉活动时间,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");

cm.dispose();
}else if (cm.getHour() > 99) {
cm.warp(910000000,0);
cm.sendOk("过掉活动时间,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");
cm.dispose();
}else if (cm.haveItem(4001052,30)) {
cm.getMap(920010800).addMapTimer(900, 200080101);
cm.gainItem(4001052,-30);

cm.gainItem(4001049,1);

cm.warpParty(920010800);
cm.givePartyExp(+45000);
cm.sendOk("但愿你能打败他~");
cm.dispose();
}else {	
cm.sendOk("但愿你能继续下去.请收集30个#v4001052#.然后交给我!");
cm.dispose();
}



}else if (selection == 4) {
if (cm.itemQuantity(4001054) < 10) {
    cm.sendOk("请找到#v4001054# 消灭上面的花即可爆出 需要10个");
    cm.dispose();
       } else if (cm.itemQuantity(4001049) > 0) {
                    cm.gainItem(4001049,-1); 
                    cm.gainItem(4001054,-10);  
cm.summonMob(9300039, 999999, 100000, 1);//船长5E血

cm.serverNotice("【女神组队任务】:[" + cm.getPlayer() + "] 成功召唤出了远古精灵,他们能否打败远古精灵 救出女神呢?女神是我的");             
 
                    
                    cm.dispose();
                } else {
                    cm.sendOk("请检查背包是否有#v4001049# 在上一关通关时可获得");
                    cm.dispose();
                }                    

}else if (selection == 5) {
if (!cm.haveItem(4001045,1)) {
cm.sendOk("您不能选择这个奖励关卡.请消灭远古精灵,救出女神!!!放开哪女神 让我来");
cm.dispose();
}else { 
cm.getMap(920011100).addMapTimer(60, 920011300);
cm.removeAll(4001045);
cm.warpParty(920011100);
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
cm.sendOk("#v3994026##r字奖励关卡:#k\r\n   由于掉率相比#b银字#k低了5倍,\r\n#v3994034##r字奖励关卡:#k\r\n   由于掉率相比#b银字#k低了4倍\r\n   特别包含#b[110级装备,部分玩具,100%必成卷.稀有椅子]#k等.\r\n#v3994027##r字奖励关卡:#k\r\n   进入后,在60秒内,会有无数装备飞出来,你能捡到那就是你的啦~\r\n   特别包含#b[110级装备,部分玩具,100%必成卷.稀有椅子]#k等..\r\n\r\nPs:当然,也可以和别人稀疏冒险岛挑战,而且只消耗队长的字符哦!");
cm.dispose();

}}}}
