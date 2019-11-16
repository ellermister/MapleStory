/*
2511000- Reactor for PPQ [Pirate PQ]
@author Jvlaple
*/

function act() {
	var eim = rm.getPlayer().getEventInstance();
	var now = eim.getProperty("openedBoxes");
	var nextNum = now + 1;
	eim.setProperty("openedBoxes", nextNum);
	rm.spawnMonster(9300109, 3);
	rm.spawnMonster(9300110, 5);
	rm.mapMessage(5, "Some monsters are summoned.");
}