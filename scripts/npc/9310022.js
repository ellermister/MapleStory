/*
50万冒险币一次。进入活动地图刷装备
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
            cm.sendNext("勇士你好！欢迎来到冒险岛！我能传送你进入活动地图！\r\n#b必要条件：\r\n#r等级70级！并开设一个小组！\r\n进入一次需要消耗您100万冒险币！\r\n#b介绍：\r\b当您进入地图后。在规定的时间内打败怪物可以随机获得100级内的装备道具哦！还有休闲椅子！");
        } else if (status == 1) {
            if(cm.getMeso() >= 500000 ){  
                if (cm.getParty() == null) { 
                    cm.sendOk("需要条件：\r\n开设一个#r小组#k。并且等级达到#r70级#k。以及100万冒险币\r\n#e          缺少以上条件"); 
                    cm.dispose(); 
                    } 
            if (!cm.isLeader()) {  //不是小组组长
                cm.sendOk("#e如果你想挑战这个副本。#r请叫你的小组组长和我说话."); 
                cm.dispose(); 
                    }else { 
            var party = cm.getParty().getMembers(); 
            cm.gainMeso(-50000);
            cm.serverNotice("玩家:" + cm.c.getPlayer().getName() + "进入活动地图！")
            var next = true; 
                if (party.size() > 3){  
                    next = false; 
                    } 
                if (next) { 
            var em = cm.getEventManager("shijian");  
                if (em == null) { 
                    cm.sendOk("脚本出错!请检查配置文件!\r\n配置文件ID：#bboss1"); 
                } else {  
                em.startInstance(cm.getParty(),cm.getChar().getMap()); 
                party = cm.getChar().getEventInstance().getPlayers();       
                } 
            //cm.serverNotice("玩家:" + cm.c.getPlayer().getName() + "进入PQ副本！");
            cm.dispose(); 
                    } 
                } 
            }else{ 
                cm.sendOk("对不起！挑战一次需要消耗50万冒险币"); 
                cm.dispose(); 
         
        }}
    }
}