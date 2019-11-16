function start() {

if (cm.getLevel() > 30 ) {  
	if (cm.getBossLog('每日福利') >= 1) {
        cm.sendOk("今天己经领过了，请明天再来找我吧！");
	    cm.dispose();
	} else {
		cm.setBossLog('每日福利');
		cm.gainDY(1000);//抵用券
		cm.gainMeso(2000000);
		cm.serverNotice("『公告』：玩家【"+ cm.getChar().getName() +"】在拍卖 每日福利 领取了200万游戏币、1000抵用卷。");
		cm.dispose();
	}
  
  
    } else {
            cm.sendOk("等级必须大于30级哦~！");
	    cm.dispose();
	}
}

