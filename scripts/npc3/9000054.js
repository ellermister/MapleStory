/*
Vr001 封测版 ONLINE
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
			cm.sendSimple("嘿！\r\n#k\r\n#L1##b进入领奖地点#r<#z4031460#>#k20#r个");
//------------------------------进入下一关-------------------------------
			} else if (status == 1) { 
			if (selection == 1) {
			if (cm.haveItem(4031460,20)) { 
			cm.gainItem(4031460,-20);
			cm.removeAll(4031460);
		   	cm.warp(912000000);
			cm.gainExp(300000);
			cm.mapMessage("进入PQ挑战第二关！获得了 30万 经验值！");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("缺少 20 个#v4031460#");
			cm.dispose(); }}}}}
