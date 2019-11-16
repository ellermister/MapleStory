function enter(pi) {
	pi.spawnTutorialSummon();
	pi.tutorialSpeechBubble("欢迎来到冒险岛世界！我是负责引导的库！在你成为10级的修炼骑士之前，如果有什么不知道的。可以过来问我。如果你有什么疑问，请双击我！");
	pi.updateCygnusIntroState("helper=clear");
	pi.blockPortal();
	return true;
}