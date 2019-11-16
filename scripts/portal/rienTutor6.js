function enter(pi) {
	if (pi.getAranIntroState("miss=o")) {
		return false;
	}
	pi.updateAranIntroState2("miss=o;helper=clear");
	pi.blockPortal();
	pi.removeTutorialSummon();
	return true;
}