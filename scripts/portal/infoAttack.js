function enter(pi) {
	if (pi.isQuestActive(1035))
		pi.showWZEffect("UI/tutorial.img/20", 1);
	pi.blockPortal();
	return true;
}