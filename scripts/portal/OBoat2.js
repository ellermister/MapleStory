//cherry_MS_BOAT
function enter(pi) {
	pi.warp(200090010, 5);
	if(pi.getcherryMSEventstate("Boat","haveBalrog","true")) {
		pi.showBalrog();
	}
	return true;
}
