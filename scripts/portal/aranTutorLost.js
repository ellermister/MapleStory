function enter(pi) {
	if (pi.getAranIntroState("fin=o")) {
		pi.blockPortal();
		return false;
	}
	pi.updateAranIntroState("cmd=o;normal=o;arr0=o;arr1=o;arr2=o;arr3=o;fin=o;mo1=o;chain=o;mo2=o;mo3=o;mo4=o");
	pi.blockPortal();
	pi.showWZEffect("Effect/Direction1.img/aranTutorial/Child", -1);
	pi.showWZEffect("Effect/Direction1.img/aranTutorial/ClickChild", -1);
	return true;
}