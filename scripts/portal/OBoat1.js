//cherry eidt
function enter(pi) {
	pi.warp(200090010, 4);
	if(pi.getcherryMSEventstate("Boat","haveBalrog","true")) {
		pi.showBalrog();
	}
	return true;
}
