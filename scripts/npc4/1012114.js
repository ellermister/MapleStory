var status = -1;
var random = java.lang.Math.floor(Math.random() * 9 + 1);
var random1 = java.lang.Math.floor(Math.random() * 15000 + 1);
var random2 = java.lang.Math.floor(Math.random() * 10 + 1);

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        cm.sendSimple("你好，我是小老虎 #bRice Cakes#k...#b\r\n#L1#查看说明#l\r\n#L2#离开地图#l\r\n#L0#我给你带来了年糕!#l");
    } else if (status == 1) {
        if (selection == 0) {
            if (!cm.isLeader()) {
                cm.sendOk("请队长与我谈话.");
            } else {
                if (cm.haveItem(4001101,20)) {
                    cm.removeAll(4001101);
                    cm.givePartyExp(6000);
					if(random <= 2 &&random >= 1){
						cm.givePartyDY(random2);
					cm.worldMessage(6,"玩家：["+cm.getName()+"]带领他的队伍完成了月妙组队副本！获得抵用卷："+random2);
					}else if(random >= 3 && random <= 4){
						cm.givePartyMeso(random1);
					cm.worldMessage(6,"玩家：["+cm.getName()+"]带领他的队伍完成了月妙组队副本！获得金币："+random1);
					}else{
					cm.worldMessage(6,"玩家：["+cm.getName()+"]带领他的队伍完成了月妙组队副本！");
					}
					cm.givePartyItems(4310099, 1);
                    cm.givePartyItems(4001322, 1);
                    cm.givePartyItems(4031191, 1);
                    //cm.addPartyTrait("will", 5);
                    //cm.addPartyTrait("sense", 1);
                    //cm.achievement(100);
                    cm.endPartyQuest(1200);
                    cm.warpParty(910010300);
                } else {
                    cm.sendNext("你没有带来 #r20#k 块月妙的年糕... ");
                }
            }
        } else if (selection == 1) {
            cm.sendNext("请点击地块让它开花，6块土地全部开花时满月将出现。满月下会召唤月妙小仙子，每隔一段时间月妙小仙子会捣出年糕，收集 #r10 #k块年糕后交给队长然后交给NPC，即可通关。\r\n#r注：在月妙仙子捣年糕的时候保护它，月妙仙子被怪物攻击后死亡则任务失败.");
        } else if (selection == 2) {
        cm.removeAll(4001095);
        cm.removeAll(4001096);
        cm.removeAll(4001097);
        cm.removeAll(4001098);
        cm.removeAll(4001099);
        cm.removeAll(4001100);
                    cm.warp(100000200);
        }
        cm.dispose();
    }
}