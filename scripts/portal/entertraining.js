function enter(pi) {
	if (pi.isQuestActive(1041))
		pi.warp(1010100, 4);
	else if (pi.isQuestActive(1042))
		pi.warp(1010200, 4);
	else if (pi.isQuestActive(1043))
		pi.warp(1010300, 4);
	else if (pi.isQuestActive(1044))
		pi.warp(1010400, 4);
	else
		pi.playerMessage("接受麦加的修炼的冒险家才可以入场.");
	return false;
}