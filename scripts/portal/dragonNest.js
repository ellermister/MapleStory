/*
	九灵龙蛋任务，入口控制脚本

	by 芯碎王子
*/

function enter(pi) {
	var nextmap = pi.getC().getChannelServer().getMapFactory().getMap(240040611);   //进入后的地图实例
	var obj = nextmap.getMapObjects();   //获取里面地图的所有地图对象
	var iter = obj.iterator();      //用于遍历
	if(!pi.haveItem(4001094)){      //判断是否有九灵龙的蛋
		pi.getPlayer().getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(5, "您必须拥有九灵龙的蛋才能从这里进去!")); 
		return false;
	}
	if(nextmap.playerCount() > 0){  //判断地图内是否有人进入了
		pi.getPlayer().getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(5, "里面已经有人在会见九灵龙了,请稍后进入!")); 
		return false;	
	}
	while (iter.hasNext()) {   //遍历地图对象， 如果有NPC 则移除
		var npcobj = iter.next();
		if (npcobj.getType() == net.sf.odinms.server.maps.MapleMapObjectType.NPC){
			nextmap.removeMapObject(npcobj);	//移除地图对象
		}
	}
	pi.gainItem(4001094,-1);
	nextmap.resetReactors(); 
	nextmap.clearMapTimer();		
	pi.warp(240040611, "out00");
	nextmap.addMapTimer(120,240040610);  //加时间限制
	return true;
}