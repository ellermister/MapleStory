function enter(pi) {
	if (pi.getAranIntroState("arr3=o")) {
		pi.blockPortal();
		return false;
	}
	pi.updateAranIntroState("cmd=o;normal=o;arr0=o;arr1=o;arr2=o;arr3=o;mo1=o;chain=o;mo2=o;mo3=o;mo4=o");
	pi.blockPortal();
	pi.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1", 1);
	return true;
}