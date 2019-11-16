/* Author: Xterminator
	Map(s): 		Crimsonwood Mountain : Cavern of Fear (610020010)
	Description: 		Takes you to Cavern of Valor (610020015) (Only activated if player have required item)
*/
function enter(pi) {
	if (pi.haveItem(3992040)) {
		pi.warp(610020015, "CC6_A");
		return true;
	} else {
		return false;
	}
}