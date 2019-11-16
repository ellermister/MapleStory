/**
	Reactor for Perion - Kills all boogies in the map.
	@author Jvlaple
*/
	function act() {
	rm.getPlayer().getMap().killAllBoogies();
	return true;
}
