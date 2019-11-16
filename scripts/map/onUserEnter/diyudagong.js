/*
	亲亲嘴冒险专用脚本

	少林妖僧 -- 地图反应
	
	by-- 芯碎王子
		
	QQ:7851103

*/
importPackage(net.sf.odinms.server.life);
importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.scripting.npc);
importPackage(java.awt);
function start(ms) {	
	var mob = MapleLifeFactory.getMonster(9400633);
	var pMap = ms.getPlayer().getMap();
	if(ms.getPlayer().getBossLog("shaolingb") >= 3){		
		NPCScriptManager.getInstance().start(ms.getPlayer().getClient(), 1100000); //不知道怎么写队员没点NPC的情况下也能写Bosslog记录次数，只能用这馊主意了!
	}else{
	   ms.getPlayer().setBossLog("shaolingb");
	}

if (pMap.countMobOnMap() < 1){		
		pMap.addMapTimer(1800, pMap.getReturnMapId());
       		pMap.spawnMonsterWithEffect(mob, 2, new Point(619, 45));  
		pMap.mapMessage(5, " 地狱大公被召唤，您只有30分钟时间挑战它,努力战斗吧!!");	
        	
	}

}