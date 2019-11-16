function enter(pi) {
	if (pi.getAranIntroState("mo1=o")) {
		pi.blockPortal();
		return false;
	}
	pi.updateAranIntroState("mo1=o");
	pi.blockPortal();
        pi.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/legendBalloon1", 1);
	return true;
}