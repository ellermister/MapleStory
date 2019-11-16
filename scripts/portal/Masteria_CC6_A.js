/* Author: Xterminator
	Map(s): 		Crimsonwood Mountain : Cavern of Valor (610020015)
	Description: 		Takes you to Cavern of Fear (610020010) (Only activated if player have required item)
*/
function enter(pi) {
	if (pi.haveItem(3992040)) {
		pi.warp(610020010, "CC1_A");
		return true;
	} else {
		return false;
	}
}