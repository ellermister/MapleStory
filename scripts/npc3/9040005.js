function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} 
	else {
		if (mode == 0) {
			cm.sendOk("Good luck on completing the Boss Quest!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var instance = cm.isPlayerInstance();
			if (instance == true) cm.sendSimple("What would you like to do? \r\n #L0#Leave the Guild Quest#l");
			else cm.sendOk("Sorry, but I cannot do anything for you!");
		} 
		else if (status == 1) {
			cm.sendYesNo("Are you sure you want to do that? You won't be able to come back!");
		}
		else if (status == 2) {
			var instance = cm.isPlayerInstance();
			if (instance == true) cm.getChar().getEventInstance().removePlayer(cm.getChar());
			cm.dispose();
			return;
		} 
	}
}
