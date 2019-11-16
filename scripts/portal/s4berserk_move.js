function enter(pi) {
	if(pi.getPlayer().getEventInstance().getProperty("canWarp")) {
	pi.warp(910500200, "out01");
	return true;
	}

	pi.playerMessage("You must defeat all the monsters first.");
	return true;
}