var messages = Array("Your courage for challenging the Mu Lung Dojo is commendable!", "If you want to taste the bitterness of defeat, come on in!", "I will make you thoroughly regret challenging the Mu Lung Dojo! Hurry up!");

function start(ms) {
	if (ms.getPlayer().getMap().getId() == 925020000) {
		ms.getPlayer().startMapEffect(messages[Math.floor(Math.random()*messages.length)], 5120024);
	} else {
		ms.getPlayer().resetEnteredScript();
		ms.getPlayer().startMapEffect("哈！我不会让你离开的，除非你能打败我！", 5120024);
	}
}