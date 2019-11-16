/* Author: Xterminator
	Map(s): 		Singapore : The Engine Room (541010100)
	Description: 		Spawns Capt. Latanica
*/

function act() {
	rm.changeMusic("Bgm09/TimeAttack");
	rm.mapMessage("As you wish, here comes Capt. Latanica!");
	rm.spawnMonster(9420513);
}