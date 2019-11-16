/* Author: Xterminator
	Map(s): 		Phantom Forest : Crossroads (610010200)
	Description: 		Takes you to Forgotten Path (610010005) (Only activated if player have required item)
*/
function enter(pi) {
	if (pi.haveItem(3992040)) {
		pi.warp(610010005, "U6_1");
		return true;
	} else {
		return false;
	}
}