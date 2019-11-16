function act(){
	rm.spawnMonster(9400112, 830, 160); 
	rm.getPlayer().getMap().resetReactors(); // It's the only reactor so we can do this
}