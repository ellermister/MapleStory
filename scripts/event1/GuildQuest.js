//CherryMS LoveMXD
//非同意内禁止转载
//CherryMS.cn

var exitMap;
 
importPackage(net.sf.odinms.world);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server.maps);
importPackage(java.lang);

function init() {
        em.setProperty("shuffleReactors","false");
}

function monsterValue(eim, mobId) { //should only trigger on ergoth
        if (mobId == 9300028) { //but, just to be safe...
                var rubian = new Item(4001024, 0, 1);
                var map = eim.getMapInstance(990000900);
                var reactor = map.getReactorByName("boss");
                map.spawnItemDrop(reactor, eim.getPlayers().get(0), rubian, reactor.getPosition(), true, false);
        }
        return -1;
}

function setup(eim) {
	exitMap = em.getChannelServer().getMapFactory().getMap(990001100); //returning path
	
	//no time limit yet until clock can be visible in all maps
        
        //shuffle reactors in two maps for stage 3
        eim.getMapInstance(990000501).shuffleReactors();
        eim.getMapInstance(990000502).shuffleReactors();
        
        //force no-respawn on certain map reactors
        eim.getMapInstance(990000611).getReactorByName("").setDelay(-1);
        eim.getMapInstance(990000620).getReactorByName("").setDelay(-1);
        eim.getMapInstance(990000631).getReactorByName("").setDelay(-1);
        eim.getMapInstance(990000641).getReactorByName("").setDelay(-1);
        
        //activate three minutes after start
        eim.setProperty("entryTimestamp",System.currentTimeMillis() + (3 * 60000));
        eim.setProperty("canEnter","true");
	eim.schedule("begin", 3 * 60000);//3分钟。。。
}

function begin(eim) {
        eim.setProperty("canEnter","false");
        eim.schedule("earringcheck", 15000);
        var party = eim.getPlayers();
        //if (party.size() < 6) { //如果要少于6人就退出就把//去掉囖~
        //        end(eim,"There are no longer enough players to continue, and those remaining shall be warped out.");
        //} else {
		var iter = party.iterator();
                while (iter.hasNext()) {
                        iter.next().getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,"一股神秘的力量使大门打开了。"));
		}
        //}
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(990000000);
	player.changeMap(map, map.getPortal(0));
        player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock((Long.parseLong(eim.getProperty("entryTimestamp")) - System.currentTimeMillis()) / 1000));
	
	//player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock(1800));
}

function playerRevive(eim, player) {
        var returnMap = 990000200;
        if (eim.getProperty("canEnter").equals("true")) {
                returnMap = 990000000;
        }
        player.setHp(50);
        player.setStance(0);
        player.changeMap(eim.getMapInstance(returnMap), eim.getMapInstance(returnMap).getPortal(0));
        return false;
}

function playerDead(eim, player) {
}

function playerDisconnected(eim, player) {
        var party = eim.getPlayers();
	if (player.getName().equals(eim.getProperty("leader"))) { //check for party leader
		//boot all players and end
		var iter = party.iterator();
                while (iter.hasNext()) {
			var pl = iter.next();
                        pl.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,"带领人员离开了，所下的成员不能继续调查古堡。"));
			if (pl.equals(player)) {
				removePlayer(eim, pl);
			}			
			else {
				eim.unregisterPlayer(pl);
				pl.changeMap(exitMap, exitMap.getPortal(0));
			}
		}
		eim.dispose();
	}
	else { //boot d/ced player and check if enough players left
		removePlayer(eim, player);
                if (party.size() < 6) { //five after player booted
                        end(eim,"没有足够的成员不能继续任务。");
                }
	}
}

function leftParty(eim, player) { //ignore for GQ
}

function disbandParty(eim) { //ignore for GQ
}

function playerExit(eim, player) {
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(0));
        var party = eim.getPlayers();
        if (party.size() < 6) { //five after player booted
                end(eim,"没有足够的成员不能继续任务。");
        }
}

function end(eim, msg) {
        var iter = eim.getPlayers().iterator();
        while (iter.hasNext()) {
                var player = iter.next();
                player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,msg));
		eim.unregisterPlayer(player);
                player.changeMap(exitMap, exitMap.getPortal(0));
	}
	eim.dispose();
}

//for offline players
function removePlayer(eim, player) {
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
}

function clearPQ(eim) {
	var iter = eim.getPlayers().iterator();
        var bonusMap = eim.getMapInstance(990001000);
        while (iter.hasNext()) {
                var player = iter.next();
		player.changeMap(bonusMap, bonusMap.getPortal(0));
                player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock(40));
	}
        eim.schedule("finish", 40000)
}

function finish(eim) {
        var iter = eim.getPlayers().iterator();
        while (iter.hasNext()) {
		var player = iter.next();
		eim.unregisterPlayer(player);
                player.changeMap(exitMap, exitMap.getPortal(0));
	}
	eim.dispose();
}

function allMonstersDead(eim) {
        //do nothing; GQ has nothing to do with monster killing
}

function cancelSchedule() {
}

function timeOut() {
	
}

function earringcheck(eim, player) {
	var iter = eim.getPlayers().iterator();
        while (iter.hasNext()) {
		var pl = iter.next();
                if (pl.getHp() > 0 && pl.getMapId() > 990000200 && pl.getInventory(MapleInventoryType.EQUIPPED).countById(1032033) == 0) {
			pl.addHP(-30000);
			pl.getMap().broadcastMessage(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,pl.getName() + " 玩家由于没有戴耳环受到邪恶之力的影响死亡。"));
                }
        }
        eim.schedule("earringcheck", 15000);
}
