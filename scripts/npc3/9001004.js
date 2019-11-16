/*
Vr001 封测版 ONLINE
枫叶之旅
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
			cm.sendSimple(""+ cm.getChar().getName() +"，你们想干嘛？如果你可以给我#v4031155#50个.我可以传送你去下一关哦！\r\n完成第一关卡获得经验.冒险币#k\r\n#L1##b进入下一关 #r<#z4031155#>#k50#r个\r\n#L2##b获取增益BUFF#k\r\n#L3##b介绍一下#k\r\n#L4##b退出该PQ#k\r\n");
//------------------------------进入下一关-------------------------------
			} else if (status == 1) { 
			if (selection == 1) {
			if (cm.haveItem(4031155, 50)) { 
			cm.gainItem(4031155,-50);
		   	cm.warp(105100300);
			cm.gainExp(30000);
			cm.gainMeso(50000);
			cm.mapMessage("完成了第一关！进入第二关！得到了3万经验值和5万冒险币的奖励！");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("缺少 50 个#v4031155#");
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
		   cm.sendNextPrev("击败地图怪物，掉落的物品可以进入下一关！");
		   cm.dispose(); 
//--------------------------------退出该PQ------------------------------------
            } else if (selection == 4) {
		   cm.sendOk("退出组队即可自动离开该PQ"); 
			cm.mapMessage("退出组队即可自动离开该PQ");
		   cm.dispose(); }
//-------------------------------关于（不用这个）------------------------------------
	                 } else if (selection == 5) {
                   cm.sendNextPrev("首先你需要击败#r骷髅龙#k，得到50个纪念币，然后交给我。我传送你去下一个地图！并且给你#r海量经验值#k的奖励！");
                   cm.dispose();
		}}}
