function enter(pi) {
	if (pi.isQuestActive(21701))
		pi.warp(914010000);
	else if (pi.isQuestActive(21702))
		pi.warp(914010100);
	else if (pi.isQuestActive(21703))
		pi.warp(914010200);
	else
		pi.playerMessage("You can only enter the Penguin Training Center if you are getting trained by Puo.");
	return true;
}