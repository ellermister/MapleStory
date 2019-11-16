/* Author: Xterminator
	Map(s): 		Phantom Forest : Dead Man's Gorge (610010004)
	Description: 		Takes you to Haunted Hill (610010001) (Only activated if player have required item)
*/
function enter(pi) {
	if (pi.haveItem(3992040)) {
		pi.warp(610010001, "U2_1");
		return true;
	} else {
		return false;
	}
}