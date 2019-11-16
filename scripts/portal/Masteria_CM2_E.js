/* Author: Xterminator
	Map(s): 		Crimsonwood Mountain : Valley of Heroes 2 (610020001)
	Description: 		(Only activated if player have required item)
*/
function enter(pi) {
	if (pi.haveItem(3992039)) {
		pi.warp(610020001, "CM2_F");
		return true;
	} else {
		return false;
	}
}