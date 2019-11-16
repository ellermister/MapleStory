/* Author: Xterminator
	Map(s): 		Crimsonwood Mountain : Valley of Heroes 1 (610020000)
	Description: 		(Only activated if player have required item)
*/
function enter(pi) {
	if (pi.haveItem(3992039)) {
		pi.warp(610020000, "CM1_D");
		return true;
	} else {
		return false;
	}
}