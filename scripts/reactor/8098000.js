/*
 *@Author RMZero213
 * Ludibrium Maze Party Quest
 * Do not release anywhere other than RaGEZONE. Give credit if used.
 */

function act() {
	var rand = (Math.random() * 2) + 1;
	var q = 0;
	var q2 = 0;
	if (rand < 2) {
		q = 1;
		q2 = 2;
	} else {
		q = 2;
		q2 = 1;
	}
	if (rm.getPlayer().getMapId() == 809050000) {
		rm.spawnMonster(9400209, q);
		rm.spawnMonster(9400210, q2);
	} else if (rm.getPlayer().getMapId() == 809050001) {
		rm.spawnMonster(9400211, q);
		rm.spawnMonster(9400212, q2);
	} else if (rm.getPlayer().getMapId() == 809050002) {
		rm.spawnMonster(9400213, q);
		rm.spawnMonster(9400214, q2);
	} else if (rm.getPlayer().getMapId() == 809050003) {
		rm.spawnMonster(9400213, q);
		rm.spawnMonster(9400214, q2);
	} else if (rm.getPlayer().getMapId() == 809050004) {
		rm.spawnMonster(9400215, q);
		rm.spawnMonster(9400216, q2);
	} else if (rm.getPlayer().getMapId() == 809050005) {
		rm.spawnMonster(9400217, q);
		rm.spawnMonster(9400218, q2);
	} else if (rm.getPlayer().getMapId() == 809050006) {
		rm.spawnMonster(9400217, q);
		rm.spawnMonster(9400218, q2);
	} else if (rm.getPlayer().getMapId() == 809050007) {
		rm.spawnMonster(9400215, q);
		rm.spawnMonster(9400216, q2);
	} else if (rm.getPlayer().getMapId() == 809050008) {
		rm.spawnMonster(9400213, q);
		rm.spawnMonster(9400214, q2);
	} else if (rm.getPlayer().getMapId() == 809050009) {
		rm.spawnMonster(9400211, q);
		rm.spawnMonster(9400212, q2);
	} else if (rm.getPlayer().getMapId() == 809050010) {
		rm.spawnMonster(9400209, q);
		rm.spawnMonster(9400210, q2);
	}
}