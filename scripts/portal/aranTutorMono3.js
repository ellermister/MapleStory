function enter(pi) {
	if (pi.getAranIntroState("mo4=o")) {
		pi.blockPortal();
		return false;
	}
	pi.updateAranIntroState("normal=o;arr0=o;mo1=o;mo2=o;mo3=o;mo4=o");
	pi.blockPortal();
	pi.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/legendBalloon6", 1);
	return true;
}