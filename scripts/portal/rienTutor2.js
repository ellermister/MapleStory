function enter(pi) {
	if (!pi.isQuestFinished(21011)) {
		pi.playerMessage("你必须完成任务后，才能进入下一个地图！");
		return false;
	}
	pi.warp(140090300, 1);
	return true;
}