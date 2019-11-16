/*
爱上Mxd ONLINE
怪物悬赏令PQ 第一关
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
                
			cm.sendOk("……");
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
			cm.sendSimple(" 你如果完成了进入下一关的条件，我会给予你#r海量经验#k。\r\n 进入下一关需要你搜集#b冒险岛纪念币#k#r20#k个。这些物品可以通\r\n 过#b黑魔法师的骷髅龙#k掉落！\r\n #r你可以消耗#b冒险岛纪念币#kＸ５#r获取一个BUFF~#k\r\n#L1##b进入下一关 #r<#z4001129#>#k20#r个\r\n#L2##b获取增益BUFF#k\r\n#L3##b介绍一下#k\r\n#L4##b退出该PQ#k");
//------------------------------进入下一关-------------------------------
			} else if (status == 1) { 
			if (selection == 1) {
			if (cm.haveItem(4001129, 20)) { 
			cm.gainItem(4001129,-20);
		   	cm.warp(677000012);
			cm.gainExp(5000000);
			cm.mapMessage("进入PQ挑战第二关！获得了 500万 经验值！");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("缺少 20 个#v4001129#");
			cm.dispose(); }
//-------------------------------获取增益BUFF-----------------------------
			} else if  (selection == 2) { 
			if (cm.haveItem(4001129, 5)) {
			cm.mapMessage("该功能完善中！");
                   	cm.dispose();
                   	} else {
		   	cm.mapMessage("该功能完善中！");
		   	cm.dispose(); }
//------------------------------介绍一下----------------------------------
            } else if (selection == 3) {
		   cm.sendNextPrev("首先你需要击败#r骷髅龙#k，得到20个纪念币，然后交给我。我传送你去下一个地图！并且给你#r海量经验值#k的奖励！");
		   cm.dispose(); 
//--------------------------------退出该PQ------------------------------------
            } else if (selection == 4) {
		   cm.sendOk("退出组队即可自动离开该PQ"); 
			cm.mapMessage("退出组队即可自动离开该PQ");
		   cm.dispose(); }
//-------------------------------关于（不用这个）------------------------------------
	                 } else if (selection == 5) {
                   cm.sendNextPrev("首先你需要击败#r骷髅龙#k，得到20个纪念币，然后交给我。我传送你去下一个地图！并且给你#r海量经验值#k的奖励！");
                   cm.dispose();
		}}}
