/*
	九灵龙任务--反应二脚本
	
	芯碎王子制作
*/

function act() {
	var map = rm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(240040610);  //外面的地图
	var Reactors = rm.getReactor();  // 本Reactors类
	var qust = net.sf.odinms.server.quest.MapleQuest.getInstance(3706);	
	var quststats = new net.sf.odinms.client.MapleQuestStatus(qust,net.sf.odinms.client.MapleQuestStatus.Status.STARTED,2081007);
	rm.spawnNpc(2081008, rm.getPlayer());	 //刷NPC出来
	new net.sf.odinms.server.maps.MapMonitor(rm.getReactor().getMap(),map.getPortal(10),rm.getPlayer().getClient().getChannel(),Reactors);			
	rm.getReactor().getMap().broadcastMessage(net.sf.odinms.tools.MaplePacketCreator.destroyReactor(Reactors)); //销毁Reactor
	rm.getPlayer().updateQuest(quststats);		//更新任务
	rm.mapMessage("一只龙宝宝从这个蛋里蹦了出来.");
}
