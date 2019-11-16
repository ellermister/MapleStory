var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		cm.sendNext("...................");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("首次充值礼包领取地点!你是否领取？");
	} else if (status == 1) {
		if (cm.getChar().getsc() == 0) {;
			cm.sendOk("对不起！你没有充值过！");
			cm.dispose();
		} else {
			cm.sendOk("每个帐号只可以领取#b1次#k。你已经领取过了！");
			cm.dispose();
		       }	
		}
	}
}