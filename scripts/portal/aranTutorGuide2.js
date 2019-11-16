function enter(pi) {
	if (pi.getAranIntroState("cmd=o")) {
		pi.blockPortal();
		return false;
	}
	pi.playerMessage("冒险岛提示：连续攻击后，通过方向键和攻击可以实现命令攻击。");
	pi.updateAranIntroState("cmd=o;normal=o;arr0=o;arr1=o;arr2=o;mo1=o;chain=o;mo2=o;mo3=o;mo4=o");
	pi.blockPortal();
	pi.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialGuide3", 1);
	return true;
}