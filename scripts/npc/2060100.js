function start(){
	var quast = net.sf.odinms.server.quest.MapleQuest.getInstance(6301);
	if(cm.getChar().getQuest(quast).getStatus().equals(net.sf.odinms.client.MapleQuestStatus.Status.STARTED)){
		if (cm.haveItem(4000175)) {
			cm.warp(923000000);
			cm.gainItem(4000175, -1);
			cm.removeAll(4031472);
			cm.getPlayer().getMap().broadcastMessage(net.sf.odinms.tools.MaplePacketCreator.getClock(300));
			cm.setTimeOut(1000 * 60 * 5, 230040001);
		} else {
			cm.sendOk("In order to open the crack of dimension you will have to posess one piece of Miniature Pianus. Those could be gained by defeating a Pianus.");
		}
	} else {
		cm.sendOk("I'm #bCarta the sea-witch.#k Don't fool around with me, as I'm known for my habit of turning people into worms.");
	}
	cm.dispose();
	return;
}