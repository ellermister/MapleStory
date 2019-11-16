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
			qm.sendAcceptDecline("小女皇在冒险岛世界出现后，黑魔法师的气息好像变得更强了。听说已经出现了因为黑魔法师的气息而变质的物质。吃了变质的物质之后，怪物也许会变的更强。必须尽快对变质的物质进行分析才行……你能帮我吗？");
		} else if (status == 1) {
			qm.startQuest();
			qm.dispose();
		}
	}
}