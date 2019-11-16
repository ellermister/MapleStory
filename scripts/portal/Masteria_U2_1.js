/* Author: Xterminator
	Map(s): 		Phantom Forest : Haunted Hill (610010001)
	Description: 		Takes you to Dead Man's Gorge (610010004) (Only activated if player have required item)
*/
function enter(pi) {
	if (pi.haveItem(3992040)) {
		pi.warp(610010004, "U5_1");
		return true;
	} else {
		return false;
	}
}