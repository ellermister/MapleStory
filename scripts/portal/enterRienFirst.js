function enter(pi) {
	if (!pi.isQuestFinished(21014))
		pi.warp(140000000, 1);
	else
		pi.warp(140000000, 3);
	return true;
}