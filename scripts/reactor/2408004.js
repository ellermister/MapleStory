/*
	九灵龙蛋任务 -- 反应脚本
	
	by 芯碎王子
*/
function act() {
	if (rm.getPlayer().getMaxHp() > 100) {		
		rm.getPlayer().getMap().getReactorById(2406000).setState(1);		
		rm.getPlayer().getMap().broadcastMessage(net.sf.odinms.tools.MaplePacketCreator.spawnReactor(rm.getPlayer().getMap().getReactorById(2406000)));				
		rm.getReactor().setState(1);
	}
	else {
		rm.getReactor().setState(0);
	}
}
