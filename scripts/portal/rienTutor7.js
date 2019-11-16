function enter(pi) {
	if (!pi.isQuestFinished(21014))
		pi.playerMessage("....");
	else
		pi.warp(140010100, 2);
	return true;
}