/*@author Jvlaple
 *Nependath Pot - Spawns Nependath or Dark Nependath
 */
 
function act() {
	rand = Math.random();
	if (rand > .6) {
		rm.spawnMonster(9300049);//Dark
	} else {
		rm.spawnMonster(9300048);//Regular
	}
}