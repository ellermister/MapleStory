importPackage(net.sf.odinms.client);

var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.sendNext("嗯……如果你需要帮助再告诉我吧！");
        	qm.dispose();
    	} else {
        	if (mode > 0)
            		status++;
        	else
            		status--;
		if (status == 0) {
			qm.sendNext("欢迎英雄！那是什么？你想知道我知道你是谁？这很容易。余窃听一些我旁边大声说话的人。我相信传闻传遍全岛了。大家都知道，你回来了！");
		} else if (status == 1) {
			qm.sendNextPrev("无论如何，你回来了就好！能力是什么问题？嗯？你不知道你是否是真正的英雄不是？因为你失去的记忆？！没有办法...这一定是因为你的数百年冰河中导致的。");
		} else if (status == 2) {
			qm.sendNextPrev("嗯，你是指什么？剑？在很久以前你并不是用剑的。你有相当大的能力。不过我不怎么相信！那么这样，你先杀死3个怪物给我看看吧！");
		} else if (status == 3) {
			if (!qm.isQuestActive(21012)) {
				qm.startQuest();
			}
			qm.sendNext("这里正好有 #r#o9300383#怪#k 你杀死 #r3#k 个后再来跟我说话吧！", 1);
		} else if (status == 4) {
			qm.displayGuide(17);
			qm.dispose();
		}
	}
}

function end(mode, type, selection) {
	if (mode == -1) {
		qm.sendNext("什么？你不需要药水？");
        	qm.dispose();
    	} else {
        	if (mode > 0)
            		status++;
        	else
            		status--;
		if (status == 0) {
			qm.sendNext("嗯……看你的表情就知道你啥都没想起来。不过不用担心。说不定这反倒更好。来，这里有一些药水，加油吧！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i2000022# 10 #t2000022# \r\n#i2000023# 10 #t2000023# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 57 exp");
		} else if (status == 1) {
			if (qm.isQuestActive(21012)) {
				qm.gainItem(2000022, 10);
				qm.gainItem(2000023, 10);
				qm.completeQuest();
				qm.getPlayer().gainExp(57, true, true);
			}
			qm.sendOk("#b（就算我真的是英雄……一个什么能力都没有的英雄又能有什么用呢？）#k", 2);
		} else if (status == 2) {
			qm.dispose();
		}
	}
}