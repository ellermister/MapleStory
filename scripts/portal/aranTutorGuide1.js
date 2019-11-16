function enter(pi) {
	if (pi.getAranIntroState("chain=o")) {
		pi.blockPortal();
		return false;
	}
	pi.playerMessage("冒险岛提示：按住CTRL键，能够进行连续攻击。");
	pi.updateAranIntroState("normal=o;arr0=o;arr1=o;mo1=o;chain=o;mo2=o;mo3=o;mo4=o");
	pi.blockPortal();
	pi.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialGuide2", 1);
	return true;
}