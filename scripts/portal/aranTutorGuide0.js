function enter(pi) {
	if (pi.getAranIntroState("normal=o")) {
		pi.blockPortal();
		return false;
	}
	pi.playerMessage("冒险岛提示：按一下CTRL键，能够对怪物进行一般攻击。");
	pi.updateAranIntroState("normal=o;arr0=o;mo1=o;mo2=o;mo3=o");
	pi.blockPortal();
	pi.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialGuide1", 1);
	return true;
}