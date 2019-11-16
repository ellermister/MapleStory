/*Pirate PQ Reactor - Spawns 6 of each Pirate when opened.
 *@author Jvlaple
 *2511001.js
 */

function act() {
	for (var i = 0; i < 6; i++)
		rm.spawnMonster(9300124);
	for (var k = 0; k < 6; k++) 
		rm.spawnMonster(9300125);
}