var status = 0
var chair = 3012003

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (mode == 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }
	if(status == 1){
		cm.sendYesNo("请问是否要领取#v1112320#和#v3012003#.");
	} else if(status == 2){
		if(cm.getPlayer().getMarriageId() > 0) {
			if(!cm.canHold(1112320)){
				cm.sendNext("背包空间不足");
				cm.dispose();
				return;
			} else if(cm.getPlayer().getOneTimeLog("LoveChair") > 0){
				cm.sendNext("你已经领取过结婚礼包");
				cm.dispose();
				return;
			}
			cm.getPlayer().setOneTimeLog("LoveChair");
		    cm.getPlayer().setVip(3);
			cm.gainItem(chair, 1);
			cm.gainItem(1112320,5,5,5,5,500,500,5,5,10,10,10,10,10,10);
			cm.喇叭(3, "玩家：[" + cm.getPlayer().getName() + "]成功领取结婚戒指，恭喜！！");
			cm.sendNext("#v"+chair+"#、#v1112804#已经放到了你的背包、下线以后，重新上，就有结婚经验了！！");
		}
		cm.dispose();
	} else {
		cm.dispose();
	}
}