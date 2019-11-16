function enter(pi) {
	if (pi.getAranIntroState("mo2=o")) {
		pi.blockPortal();
		return false;
	}
	pi.playWZSound("Aran/balloon");
	pi.updateAranIntroState("mo1=o;mo2=o");
	pi.blockPortal();
	pi.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/legendBalloon2", 1);
	return true;
}