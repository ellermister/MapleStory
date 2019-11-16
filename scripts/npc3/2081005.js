function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} 
	else {
		if (mode == 0) {
			cm.sendOk("里面有非常邪恶的黑暗龙王。。");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getPlayer().getBuffedValue(net.sf.odinms.client.MapleBuffStat.MORPH) >= 0) {
				cm.sendYesNo("你想进去挑战黑暗龙王吗？这个BOSS可是非常强大的啊。。。\r\n小广告：Vr001 封测版服务端出售中..有意者请联系：1449274741");
			}
			else {
				cm.sendOk("看样子你还不具备挑战的条件啊。。");
				cm.dispose();
				return;
			}
		} 
		else if (status == 1) {
			cm.warp(240050000);
			cm.getPlayer().cancelEffectFromBuffStat(net.sf.odinms.client.MapleBuffStat.MORPH);
			cm.dispose();
			return;
		}
	}
}
