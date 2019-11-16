/* Author: Xterminator
	Map(s): 		Phantom Forest : Dead Man's Gorge (610010004)
	Description: 		(Only activated if player have required item)
*/
function enter(pi) {
	if (pi.haveItem(3992040)) {
		pi.warp(610010004, "U5_1");
		return true;
	} else {
		return false;
	}
}