/* Author: Angel-SL
	NPC Name: 		Bartos
	Map(s): 		Henesys Pet Walkway
	Description: 		Quest - Multipet
*/
var status = -1;

function start(mode, type, selection) {
	qm.dispose();
}

function end(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if(qm.haveItem(5460000)) {
				qm.sendOk("You got the Pet Snack! Thanks! You can use these to feed multiple pets at once!");
				qm.teachSkill(0008, 1, 1);
				qm.gainItem(5460000, -1, false);
				qm.completeQuest();
				qm.dispose();
			} else {
				qm.sendOk("Get me the Pet Snack! It can be found in a very big shop....");
				qm.dispose();
			}
		} else {
			qm.dispose();
		}
	}
}