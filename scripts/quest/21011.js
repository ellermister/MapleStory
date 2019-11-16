importPackage(net.sf.odinms.client);

var status = -1;

function start(mode, type, selection) {

}

function end(mode, type, selection) {
	if (mode == -1) {
		qm.sendNext("呜呜，你是嫌这把剑太寒碜吗？");
        	qm.dispose();
    	} else {
        	if (mode > 0)
            		status++;
        	else
            		status--;
		if (status == 0) {
			qm.sendNext("和#p1201000#在一起的，难道……难道就是传说中的英雄？#p1201000#！别不耐烦地点头，给我们介绍介绍呀！这位就是传说中的英雄吗？！");
		} else if (status == 1) {
			qm.sendNextPrev("   #i4001171#");
		} else if (status == 2) {
			qm.sendNextPrev("……真对不起，太激动了，忍不住嗓门大了些。呜呜～真是令人激动……唉，眼泪都快出来了……#p1201000#这回可开心了。");
		} else if (status == 3) {
			qm.sendNextPrev("等等……英雄大人怎么能没有武器呢？我听说每个英雄都有自己的独特武器……啊，估计是和黑魔法师战斗的时候遗失了。");
		} else if (status == 4) {
			qm.sendYesNo("虽然寒碜了点，不过#b先拿这把剑用着吧#k。算是送给英雄的礼物。英雄如果没有武器，岂不是会有些奇怪？ \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i1302000# 1 #t1302000# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35 exp");
		} else if (status == 5) {
			if (qm.isQuestActive(21011)) {
				qm.gainItem(1302000, 1);
				qm.completeQuest();
				qm.getPlayer().gainExp(35, true, true);
			}
			qm.sendNext("#b（看自己这技能水平没一点英雄的样子……这把剑感觉也很陌生。以前的我是用剑的吗？这把剑怎么用呢？）#k", 3);
		} else if (status == 6) {
			qm.displayGuide(16);
			qm.dispose();
		}
	}
}