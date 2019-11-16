importPackage(net.sf.odinms.server.maps);
importPackage(net.sf.odinms.net.channel);
importPackage(net.sf.odinms.tools);

function enter(pi) {
	var latanicaMap = ChannelServer.getInstance(pi.getPlayer().getClient().getChannel()).getMapFactory().getMap(541010100);
	var mapchars = latanicaMap.getCharacters();
		
	if (!pi.haveItem(4000381)) {
		// Check for essence, if essence doesn't exist, deny entry
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6,"The door will not open, didn't Ralph say something about White Essence?"));
		return false;
	}
		
	else if (mapchars.isEmpty()) {
		sendMessage(pi,"You feel the cold damp of the air as you enter the chamber. Brace yourself.");
		var mapobjects = latanicaMap.getMapObjects();
		var iter = mapobjects.iterator();
		while (iter.hasNext()) {
			o = iter.next();
			if (o.getType() == MapleMapObjectType.MONSTER){
				//latanicaMap.killMonster(o, pi.getPlayer(), false);
				latanicaMap.removeMapObject(o);
			}
		}
		latanicaMap.resetReactors();
	}
	else { // someone is inside
		var mapobjects = latanicaMap.getMapObjects();
		var boss = null;
		var iter = mapobjects.iterator();
		while (iter.hasNext()) {
			o = iter.next();
			if (o.getType() == MapleMapObjectType.MONSTER){
				boss = o;
			}
		}
	}

		if (boss != null) {
			sendMessage(pi,"You hear wails and screams of terror from within. The fight against " + boss.getName() + " has already begun, you're too late!");
			return false;
		}
	
	pi.warp(541010100, 0);
	return true;
}

function sendMessage(pi,message) {
	pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, message));
}