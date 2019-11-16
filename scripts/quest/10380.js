importPackage(net.sf.odinms.client);

var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			qm.sendNext("你好！你知道战神回到冒险岛世界的消息了吗？为了欢迎战神的归来，冒险岛运营员和等待战神归来的少女利琳准备了特别的礼物。");
		} else if (status == 1) {
			qm.sendNextPrev("#v1112405# 全属性 + 3  攻击力 +3  魔力 +3  HP +30  MP +30 \r\n\r\n战神达到70级转职时，利琳会把自己心爱的戒指作为礼物送给他。");
		} else if (status == 2) {
			qm.sendNextPrev("原来是无法交换的物品，但那样的话，战神以外的其他职业就无法使用了。所以我进行了特殊处理。");
		} else if (status == 3) {
			qm.sendNextPrev("把利琳的戒指做成了可以在帐号内移动的物品。虽然不能和其他玩家交易，但可以放在仓库里，转移给同一帐号下的其他角色。");
		} else if (status == 4) {
			qm.sendAcceptDecline("好了，你理解了吗？");
		} else if (status == 5) {
			qm.gainItem(2031008, 1);
			qm.completeQuest();
			qm.sendNext("我送你一个里恩移动券，用它可以直接移动到利琳所在的村庄里恩。等你成为战神，达到70级之后，就可以使用它了～");
		} else if (status == 6) {
			qm.sendPrev("希望战神的归来，可以给冒险岛世界的所有人带来喜悦～");
			qm.dispose();
		} 
	}
}