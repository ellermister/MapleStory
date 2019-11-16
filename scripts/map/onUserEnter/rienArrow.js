function start(ms) {
	if (ms.getAranIntroState2("arr=o")) {
		ms.updateAranIntroState("miss=o;arr=o;helper=clear");
		ms.showWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3", 1);
	}
}