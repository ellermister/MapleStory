var status = 0

function start(){
	action(1, 0, 0);
}

function action(mode, type ,selection){
	if(mode == 1) {
		status++;
	} else if(mode == 0) {
		status--;
	} else {
		cm.dispose();
		return;
	}
	if(status == 1){
		cm.saveLocation("WEDDING");
		cm.warp(700000000 ,0);
		cm.dispose();
	} else {
		cm.dispose();
	}
}