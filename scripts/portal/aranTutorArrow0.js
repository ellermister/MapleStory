function enter(pi) {
	if (pi.getAranIntroState("arr0=o")) {
		pi.blockPortal();
		return false;
	}
	pi.updateAranIntroState("arr0=o;mo1=o;mo2=o;mo3=o");
	pi.blockPortal();
	pi.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3", 1);
	return true;
}