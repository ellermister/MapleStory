//Little Suzy Event Warp NPC by Anujan
function start() {
	if (!cm.gotoEvent())
		cm.sendOk("You are not in the right level range for this event.");
	cm.dispose();
}
