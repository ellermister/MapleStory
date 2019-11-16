function enter(pi) {
	if (pi.getAranIntroState("mo3=o")) {
		pi.blockPortal();
		return false;
	}
	pi.updateAranIntroState("mo1=o;mo2=o;mo3=o");
	pi.blockPortal();
	pi.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/legendBalloon3", 1);
	return true;
}