function enter(pi) {
	if (!pi.isQuestActive(21001)) {
		pi.warp(914000220, 2);
		return true;
	} else {
		pi.warp(914000400, 2);
		return true;
	}
}