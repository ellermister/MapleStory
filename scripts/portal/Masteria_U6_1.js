/* Author: Xterminator
	Map(s): 		Phantom Forest : Forgotten Path (610010005)
	Description: 		Takes you to Swamp Bog (610010002) (Only activated if player have required item)
*/
function enter(pi) {
	if (pi.haveItem(3992040)) {
		pi.warp(610010002, "U3_1");
		return true;
	} else {
		return false;
	}
}