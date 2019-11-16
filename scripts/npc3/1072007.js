/* Thief Job Instructor (INSIDE)
	Thief 2nd Job Advancement
	Hidden Street : Thief's Construction Site (108000400)
*/

/** Made by xQuasar **/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1) {
		if (cm.haveItem(4031013,30)) {
			status = 0;
			cm.sendOk("Great, you passed the test! Here you go, take this Proof of a Hero to the Dark Lord to become your second job.");
		} else {
			cm.sendOk("You will need to collect 30 Dark Marbles for me.");
			cm.dispose();
		}
	} else if (status == 0) {
		cm.gainItem(4031012,1);
		cm.gainItem(4031013,-30);
		cm.warp(102040000,0);
		cm.dispose();
	}
}