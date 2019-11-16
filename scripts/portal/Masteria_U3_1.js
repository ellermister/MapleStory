/* Author: Xterminator
	Map(s): 		Phantom Forest : Swamp Bog (610010002)
	Description: 	Takes you to Crossroads (610010201) (Only activated if player have required item)
*/
function enter(pi) {
	if (pi.haveItem(3992040)) {
		pi.warp(610010201, "B2_1");
		return true;
	} else {
		return false;
	}
}