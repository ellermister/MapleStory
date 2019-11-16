function enter(pi) {
	if (!pi.isQuestActive(21000)) {
		pi.playerMessage("必须接受了赫丽娜的任务才能通过。");
		pi.unblockPortal();
	}
	pi.aranTemporarySkills();
	pi.blockPortal();
	pi.warp(914000200, 1);
	return true;
}