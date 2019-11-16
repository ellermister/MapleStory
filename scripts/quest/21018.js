importPackage(net.sf.odinms.client);

var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.sendNext("只要消灭5只就可以了，你怕了吗？");
        	qm.dispose();
    	} else {
        	if (mode > 0)
            		status++;
        	else
            		status--;
		if (status == 0) {
			qm.sendNext("来，让我测试一下，你至今为止的基础体力训练结果。测试方法很简单。这座岛上有一种最强悍凶猛的怪兽，叫呆呆雪精灵，你只要击退它就可以！要是能击退#r50#k只就最好了……");
		} else if (status == 1) {
			qm.sendAcceptDecline("不过#o0100134#的数量本来就不多，杀掉那么多恐怕不利生态平衡的保持，你消灭5只就差不多了。你看，这训练与自然环境之间是多么滴和谐啊！真是完美啊……");
		} else if (status == 2) {
			if (!qm.isQuestActive(21018))
				qm.startQuest();
			qm.sendNext("#o0100134#在岛的较深处。村子左边的路一直走，就能看到#b#m140010200##k，请去那里消灭#r5只#o0100134#s#k。");
		} else if (status == 3) {
			qm.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1", 1);
			qm.dispose();
		}
	}
}

function end(mode, type, selection) {

}