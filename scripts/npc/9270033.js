

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
		if (cm.haveItem(4000379,200)){
var text = "No1.我想你应该有能力拯救这个地方.去吧!\r\n#L0#进入下一关#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 541010040){
var text = "No2.请帮帮我,打败这里的怪物!!\r\n#L1#进入下一关#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);
}else if (cm.getPlayer().getMapId() == 541010050){
var text = "能来这里,你应该有打败BOSS的可能!\r\n#L2#进入下一关#l\r\n\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒";
cm.sendSimple(text);
}else if (cm.haveItem(4000379,0)){
var text = "很高兴你能来到这里,你必须打败BOSS，才能进入奖励关.请使用#v4001117#召唤Boss.\r\n#b#L3#召唤幽灵船长#l\r\n\r\n#k打完BOSS后,选择你捡取到BOSS掉落的物品,进行奖励.#b\r\n#L4##v4031223#金银宝箱#l\r\n\r\n#L7#返回自由市场#l";
cm.sendSimple(text);
}else {//sg1待遇
var text = "但愿有人能消灭这里的怪物.我的神！";
cm.sendOk(text);
cm.dispose();
}
		}
		else if(status == 1) {
			if (selection == 0) {
if (cm.getHour() < 0) {//时间

cm.warp(910000000,0);
cm.sendOk("活动时间已过,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");
cm.dispose();
}else if (cm.haveItem(4000379,200)) {
cm.gainItem(4000379,-200);
cm.gainItem(4031344,1);
cm.warp(541010040,0);
cm.sendOk("但愿你能坚持下来.请收集200个#v4000382#.#r依然,请不要换线#k.请注意时间!!!超过22点,任务将视为放弃.!");
cm.dispose();

}else {	
cm.sendOk("但愿你能打败幽灵船长,请先展现下你的实力吧~收集200个#v4000379#.请注意时间!!!超过22点,任务将视为放弃.!");
cm.dispose();
}

//
}else if (selection == 1) {
if (cm.getHour() < 0) {
cm.sendOk("活动时间已过,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");
cm.warp(910000000,0);
cm.dispose();
}else if (cm.haveItem(4000382,200)) {
cm.gainItem(4000382,-200);cm.gainItem(4031344,1);
cm.warp(541010050,0);
cm.sendOk("但愿你能坚持下来.请完成这关,下一关我将送你去挑战#b船长#k!~请收集收集200个#v4000383#像我报告.");
cm.dispose();

}else {	
cm.sendOk("但愿你能打败幽灵船长,请先展现下你的实力吧~收集200个#v4000382#.请注意时间!!!超过22点,任务将视为放弃.!");
cm.dispose();
}

}else if (selection == 2) {
if (cm.getHour() < 0) {
cm.sendOk("活动时间已过,副本中断,你将被传出.\r\n现在服务器时间为:" + cm.getHour() + "时:" + cm.getMin() + "分:" + cm.getSec() + "秒");
cm.warp(910000000,0);
cm.dispose();
}else if (cm.haveItem(4000383,200)) {
cm.gainItem(4000383,-200);cm.gainItem(4031344,1);
 cm.gainItem(4001117,1); 
cm.warp(541010100,0);
cm.sendOk("但愿你能打败他~");
cm.dispose();
}else {	
cm.sendOk("但愿你能打败幽灵船长,请先展现下你的实力吧~收集200个#v4000383#.请注意时间!!!超过22点,任务将视为放弃.!");
cm.dispose();
}



}else if (selection == 3) {
  var map =cm.getChar().getMap();
    if(map.countMobOnMap() >= 1){
cm.sendOk("消灭地图中已有的#b船长#k才能进行再次召唤.!");
cm.dispose();
}else if (!cm.haveItem(4001117,1)) {
cm.sendOk("你貌似已经召唤过了吧?");
cm.dispose();
}else {
  cm.summonMob(9420513, 800000000, 10000, 1);//船长5E血
 cm.gainItem(4001117,-1);
cm.serverNotice("[任务]: 玩家 [" + cm.getPlayer() + "] 成功召唤了船长,他能否打败船长,获得奖励呢?");

cm.dispose();


}
}else if (selection == 4) {

            cm.serverNotice(" 玩家:" + cm.c.getPlayer().getName() + " 打败船长后,获得了珍贵的 未鉴定的宝箱!");
cm.warp(910000000,0);
cm.gainItem(4031223,1);
cm.sendOk("点击拍卖-常用功能可以拿去鉴定");
            cm.dispose(); 

}else if (selection == 5) {
 var party = cm.getPlayer().getParty();
            if (party == null || party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendOk("请你开设一个队伍,保证你一个人在这个队伍里.");
   cm.dispose(); 
    }else  if (!cm.haveItem(3994034,1)) {
cm.sendOk("您不能选择这个奖励关卡.!");
cm.dispose();
 }else { 
            var party = cm.getParty().getMembers(); 
            var next = true; 
                if (party.size() > 6){  
                    next = false; 
                    } 
                if (next) { 
            var em = cm.getEventManager("wgquestitemdrop2");  
                if (em == null) { 
                    cm.sendOk("脚本出错,请联系GM."); 
                } else {  
                em.startInstance(cm.getParty(),cm.getChar().getMap()); 
                party = cm.getChar().getEventInstance().getPlayers(); 
                } 
            cm.serverNotice(" 玩家:" + cm.c.getPlayer().getName() + " 打败船长后,开始了紫字奖励关卡!");
cm.gainItem(3994034,-1);
            cm.dispose(); 
} 
}
}else if (selection == 6)  {
 var party = cm.getPlayer().getParty();
            if (party == null || party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendOk("请你开设一个队伍,保证你一个人在这个队伍里.");
   cm.dispose(); 
    }else  if (!cm.haveItem(3994027,1)) {
cm.sendOk("您不能选择这个奖励关卡.!");
cm.dispose();
 }else { 
            var party = cm.getParty().getMembers(); 
            var next = true; 
                if (party.size() > 6){  
                    next = false; 
                    } 
                if (next) { 
            var em = cm.getEventManager("wgquestitemdrop3");  
                if (em == null) { 
                    cm.sendOk("脚本出错,请联系GM."); 
                } else {  
                em.startInstance(cm.getParty(),cm.getChar().getMap()); 
                party = cm.getChar().getEventInstance().getPlayers(); 
                } 
            cm.serverNotice(" 玩家:" + cm.c.getPlayer().getName() + " 打败船长后,开始了银字奖励关卡!");
cm.gainItem(3994027,-1);
            cm.dispose(); 
} 
}
}else if (selection == 7) {
cm.warp(910000000,0);

            cm.dispose(); 

}}}}