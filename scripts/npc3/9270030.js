/* 	
Ralph (Old Guy in Boat Quay) 
Function: Useless.
Cody/AAron
*/


var status = 0;
var job;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendOk("I heard you were goin' to attempt to slay the leader of those pirates on the ghost ship! *hic* You'll ne'er make it in there without an essence of light");
			cm.dispose();
			return;
		}
	}
}	