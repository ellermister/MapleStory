/*
	版权：Vr001 封测版	2010
***************************************
        9010019 第二关进入npc
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
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("前往第二关吗？");
        } else if (status == 1) {
            if(cm.getLevel() >= 70 ){  
                if (cm.getParty() == null) { 
                    cm.sendOk("需要条件：\r\n开设一个#r小组#k。并且等级达到#r70级#k\r\n#e          缺少以上条件"); 
                    cm.dispose(); 
                    } 
            if (!cm.isLeader()) {  //不是小组组长
                cm.sendOk("#e如果你想挑战这个副本。#r请叫你的小组组长和我说话."); 
                cm.dispose(); 
                    }else { 
            var party = cm.getParty().getMembers(); 
            var next = true; 
                if (party.size() > 3){  
                    next = false; 
                    } 
                if (next) { 
            var em = cm.getEventManager("boss2");  
                if (em == null) { 
                    cm.sendOk("脚本出错!请检查配置文件!\r\n配置文件ID：#bboss2"); 
                } else {  
                em.startInstance(cm.getParty(),cm.getChar().getMap()); 
                party = cm.getChar().getEventInstance().getPlayers(); 
                cm.removeFromParty(4001008, party); 
                cm.removeFromParty(4001007, party);  
                } 
            cm.serverNotice("玩家:" + cm.c.getPlayer().getName() + "进入PQ第二关！");
            cm.dispose(); 
                    } 
                } 
            }else{ 
                cm.sendOk("对不起,你的等级太低#r 70 #k级才可以挑战该副本."); 
                cm.dispose(); 
            }
        }
    }
}
