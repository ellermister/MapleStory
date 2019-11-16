importPackage(net.sf.odinms.client);

var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.sendNext("还没做好准备吗？那么准备好后再来跟我说一声。");
        	qm.dispose();
    	} else {
        	if (mode > 0)
            		status++;
        	else
            		status--;
		if (status == 0) {
			qm.sendAcceptDecline("开始基础体力锻炼吧？准备好了？再确认一下剑是否装备好了？技能和药水是否已经托到了快捷栏中？");
		} else if (status == 1) {
			if (!qm.isQuestActive(21016)) {
				qm.startQuest();
			}
			qm.sendNext("很好。下面要去打猎的#r#o0100132#s#k，是比#o0100131#s更厉害一些的怪兽。去#b#m140020100##k抓#r15只#k，这将有助于你的体力提高。体力就是冒险动力的来源！快出去吧！", 1);
		} else if (status == 2) {
			qm.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3", 1);
			qm.dispose();
		}
	}
}

function end(mode, type, selection) {

}