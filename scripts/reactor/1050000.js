/* @Author Crovy
 * 
 * 1050000.js: Berserk 4th job quest rock - drops a shield or punts you from map.
*/

function act() {
	if (Math.random() > 0.7)
	    rm.dropItems();
	else
	    rm.warp(105090200);
}