//Cherry_MS_BOAT
function enter(pi) {
	
	pi.warp(200090000, 4);
	if(pi.getcherryMSEventstate("Boat","haveBalrog","true")) {
		pi.showBalrog();
	}
	return true;
}
