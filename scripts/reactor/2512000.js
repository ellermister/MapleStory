/*2512000.js
 *@Author Jvlaple
 *Pirate PQ Reactor
 */
 
function act() {
	var eim = rm.getPlayer().getEventInstance();
	var now = parseInt(eim.getProperty("openedBoxes"));
	var nextNum = now + 1;
	eim.setProperty("openedBoxes", nextNum);
	rm.dropItems(true, 1, 30, 60, 15);
}