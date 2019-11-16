/*
设置类："+cm.getboss()+" 显示PQ的完成次数
	 cm.setboss(1);  增加1次数完成次数
	 cm.setboss(-1); 减去1次数完成次数
*/
importPackage(net.sf.odinms.client);

function start() {
	status = -1;
	
	action(1, 0, 0);
}

function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 0 && mode == 0) {
                
			cm.sendOk("....");
			cm.dispose();
			return;                    
                }
                if (mode == 1) {
			status++;
		}
		else {
			status--;
		} 
		        if (status == 0) {
			cm.sendSimple("完成 #b挑战副本#k 成功的话，系统会记录你的挑战次数。不光完成挑战可以换取奖励，完成PQ 酷兽 组队任务后，用挑战次数，也可以换取丰厚的奖励哦！！\r\n目前成功挑战了 #r"+cm.getboss()+"#k 次！\r\n#L1#换购#b#z1002574##k-100次数\r\n#L2#换购稀有点装#b#z1050128##k-20次数\r\n#L3#换购#d100#k瓶#b#z2000005##k-50次数\r\n#L4#换购#d10#k个#b#z2022251##k-5次数\r\n#L5#换购#b#z2340000##n#k-300点数#r#e[HO~]\r\n#L6##n#k我该如何获得挑战次数");
			} else if (status == 1) { 
			if (selection == 1) {
           	   if (cm.getboss()>=100) { 
                   cm.gainItem(1002574,1);
		   cm.setboss(-100);
                   cm.sendNextPrev("\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n兑换成功！你现在剩余 #r"+cm.getboss()+"#k 次数！\r\n");
		   cm.serverNotice("[冒险岛] 玩家: " + cm.c.getPlayer().getName() + " 兑换了【海盗船长帽】(全属性+5)");
				
                   cm.dispose();
                   } else {
		   cm.sendOk("次数不足"); 
		   cm.dispose(); }
//-------------------------------换购稀有点装-----------------------------
			} else if  (selection == 2) { 
			 if (cm.getboss()>=20) { 
                   cm.gainItem(1050128,1);
		   cm.setboss(-20);
                   cm.sendNextPrev("\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n兑换成功！你现在剩余 #r"+cm.getboss()+"#k 次数！\r\n");
		   cm.serverNotice("[冒险岛] 玩家: " + cm.c.getPlayer().getName() + " 兑换了稀有点装！");
				
                   cm.dispose();
                   } else {
		   cm.sendOk("次数不足"); 
		   cm.dispose(); }
//-----------------------------换购超级药水---------------------------------
            } else if (selection == 3) {
		   if (cm.getboss()>=50) { 
                   cm.gainItem(2000005,100);
		   cm.setboss(-50);
                   cm.sendNextPrev("\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n兑换成功！你现在剩余 #r"+cm.getboss()+"#k 次数！\r\n");
		   cm.serverNotice("[冒险岛] 玩家: " + cm.c.getPlayer().getName() + " 兑换了一组超级药水(HPMP全满)！")	
                   cm.dispose();
                   } else {
		   cm.sendOk("次数不足"); 
		   cm.dispose(); }
//----------------------------枫叶棒棒糖兑换------------------------------------
            } else if (selection == 4) {
		   if (cm.getboss()>=5) { 
                   cm.gainItem(2022251,10);
		   cm.setboss(-5);
                   cm.sendNextPrev("\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n兑换成功！你现在剩余 #r"+cm.getboss()+"#k 次数！\r\n");
		   cm.serverNotice("[冒险岛] 玩家: " + cm.c.getPlayer().getName() + " 兑换了枫叶棒棒糖！(1分钟内上升100命中)！")	
                   cm.dispose();
                   } else {
		   cm.sendOk("次数不足"); 
		   cm.dispose(); }
//-------------------------------祝福卷轴------------------------------------
	                 } else if (selection == 5) {
		   if (cm.getboss()>=300) { 
                   cm.gainItem(2340000,1);
		   cm.setboss(-300);
                   cm.sendNextPrev("\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n兑换成功！你现在剩余 #r"+cm.getboss()+"#k 次数！\r\n");
		   cm.serverNotice("[冒险岛] 玩家: " + cm.c.getPlayer().getName() + " 得到了【祝福卷轴】！！")	
                   cm.dispose();
                   } else {
		   cm.sendOk("次数不足"); 
		   cm.dispose(); }
//------------------------------疑问------------------------------------------
} else if (selection == 6) {
			cm.sendNext("你是不是想知道闯关次数怎么获得呢？当你在可乐小姐Npc进入副本地图的时候，完成你要挑战的组队任务，只要你完成了，就能获得一次次数~！！");
			cm.dispose();}}}}