var status = 0;
var sel;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;

		if (status == 0)
			cm.sendSimple("#fEffect/CharacterEff/1112905/0/1#你好，你现在想做什么呢?\r\n#b#L0##fEffect/CharacterEff/1112905/0/1#我想创建一个家族#l\r\n#L1##fEffect/CharacterEff/1112905/0/1#我想解散我的家族#l\r\n#L2##fEffect/CharacterEff/1112905/0/1#增加我家族成员数量的上限#l#k\r\n#r#L3##fEffect/CharacterEff/1112905/0/1#改变家族的徽章#l#k\r\n#r#e#L4##fEffect/CharacterEff/1112905/0/1#用邮票给家族加10GP[必须要族长]#l#k");
		else if (status == 1)
		{
			sel = selection;
			if (selection == 0)
			{
				if (cm.getChar().getGuildId() > 0)
				{
					cm.sendOk("你已经拥有家族了，不能创建.");
					cm.dispose();
				}
				else
					cm.sendYesNo("创建一个新的家族需要 #b" + cm.getChar().guildCost() + " 金币#k, 你确定继续创建?");
			}
			else if (selection == 1)
			{
				if (cm.getChar().getGuildId() <= 0 || cm.getChar().getGuildRank() != 1)
				{
					cm.sendOk("你不是族长，因此你不能解散该家族.");
					cm.dispose();
				}
				else
					cm.sendYesNo("你确定真的要解散你的家族? 当你解散后你将不能恢复所有家族相关资料以及GP的数值.");
			}
			else if (selection == 2)
			{
				if (cm.getChar().getGuildId() <= 0 || cm.getChar().getGuildRank() != 1)
				{
					cm.sendOk("你不是族长，因此你将不能增加你家族成员的数量上限.");
					cm.dispose();
				}
				else
					cm.sendYesNo("增加你家族成员的数量上限需要" + cm.getChar().capacityCost() + " 金币#k, 你确定要增加吗?");
			}
			else if (selection == 3)
			{
cm.openNpc(2010008);
			} else if (selection == 4) {
if (cm.getChar().getGuildId() == 0) {
cm.sendOk("你没有家族!");
cm.dispose();
} else if (!cm.haveItem(4031561)) {
cm.sendOk("你没有#v4031561#我不能给你加GP");
cm.dispose();
} else {
cm.gainGP(10);
cm.gainItem(4031561,-1);
cm.sendOk("成功了");
cm.dispose();
}
			}
			} else if (selection == 5) {
if (cm.getChar().getGuildId() == 0) {
cm.sendOk("你没有家族!");
cm.dispose();
} else if (!cm.haveItem(4001024)) {
cm.sendOk("你没有#v4001024#我不能给你加GP");
cm.dispose();
} else {
cm.gainGP(10);
cm.gainItem(4031561,-100);
cm.sendOk("成功了");
cm.dispose();
}
		} else if (status == 2)
		{
			if (sel == 0 && cm.getChar().getGuildId() <= 0)
			{
				cm.getChar().genericGuildMessage(1);
				cm.dispose();
			}
			else if (sel == 1 && cm.getChar().getGuildId() > 0 && cm.getChar().getGuildRank() == 1)
			{
				cm.getChar().disbandGuild();
				cm.dispose();
			}
			else if (sel == 2 && cm.getChar().getGuildId() > 0 && cm.getChar().getGuildRank() == 1)
			{
				cm.getChar().increaseGuildCapacity();
				cm.dispose();
			}
		}
	}
}
