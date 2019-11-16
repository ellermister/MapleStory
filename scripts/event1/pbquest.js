importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.world); 
var exitMap; 
var instanceId; 
var minPlayers = 1; 
var qtmapId=270000000;
var mapId=270050107;

function init() { 
 instanceId = 1; 
} 
function monsterValue(eim, mobId) { 
 return 1; 
} 
function setup() { 
 exitMap = em.getChannelServer().getMapFactory().getMap(qtmapId); // <exit> 
 var instanceName = "pb" + instanceId;//任务名 
 var eim = em.newInstance(instanceName); 
  
 var mf = eim.getMapFactory(); 
  
 instanceId++; 
  
 var map = mf.getMap(mapId); 
 map.shuffleReactors(); 
 var firstPortal = eim.getMapInstance(mapId).getPortal("next00"); 
 em.schedule("timeOut", 10 * 60000);//10分钟 

 return eim; 
} 
function playerEntry(eim, player) { 
 var map = eim.getMapInstance(mapId); 
 player.changeMap(map, map.getPortal(0)); 
  
 //TODO: hold time across map changes 
 player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock(600));//600为时间限制10分钟。 
 player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(5, " 如果你想离开，可以跟我讲话。。")); 
	if (eim.isLeader(player)){
		 startInstance(eim); 
		}
} 
function playerDead(eim, player) { 
} 
function playerRevive(eim, player) { 
 if (eim.isLeader(player)) { //check for party leader 
  //boot whole party and end 
  var party = eim.getPlayers(); 
  for (var i = 0; i < party.size(); i++) { 
   playerExit(eim, party.get(i)); 
  } 
  eim.dispose(); 
 } 
 else { //boot dead player 
  // If only 2 players are left, uncompletable: 
  var party = eim.getPlayers(); 
  if (party.size() <= minPlayers) { 
   for (var i = 0; i < party.size(); i++) { 
    playerExit(eim,party.get(i)); 
   } 
   eim.dispose(); 
  } 
  else 
   playerExit(eim, player); 
 } 
} 
function playerDisconnected(eim, player) { 
 if (eim.isLeader(player)) { //check for party leader 
  //boot whole party and end 
  var party = eim.getPlayers(); 
  for (var i = 0; i < party.size(); i++) { 
   if (party.get(i).equals(player)) { 
    removePlayer(eim, player); 
   }    
   else { 
    playerExit(eim, party.get(i)); 
   } 
  } 
  eim.dispose(); 
 } 
 else { //boot d/ced player 
  // If only 2 players are left, uncompletable: 
  var party = eim.getPlayers(); 
  if (party.size() < minPlayers) { 
   for (var i = 0; i < party.size(); i++) { 
    playerExit(eim,party.get(i)); 
   } 
   eim.dispose(); 
  } 
  else 
   playerExit(eim, player); 
 } 
} 
function leftParty(eim, player) {    
 // If only 2 players are left, uncompletable: 
 var party = eim.getPlayers(); 
 if (party.size() <= minPlayers) { 
  for (var i = 0; i < party.size(); i++) { 
   playerExit(eim,party.get(i)); 
  } 
  eim.dispose(); 
 } 
 else 
  playerExit(eim, player); 
} 
function disbandParty(eim) { 
 //boot whole party and end 
 var party = eim.getPlayers(); 
 for (var i = 0; i < party.size(); i++) { 
  playerExit(eim, party.get(i)); 
 } 
 eim.dispose(); 
} 
function playerExit(eim, player) { 
 eim.unregisterPlayer(player); 
 player.changeMap(exitMap, exitMap.getPortal(0)); 
} 
//for offline players 
function removePlayer(eim, player) { 
 eim.unregisterPlayer(player); 
 player.getMap().removePlayer(player); 
 player.setMap(exitMap); 
} 
function clearPQ(eim) { 
 //KPQ does nothing special with winners 
 var party = eim.getPlayers(); 
 for (var i = 0; i < party.size(); i++) { 
  playerExit(eim, party.get(i)); 
 } 
 eim.dispose(); 
} 
function cancelSchedule() { 
} 
function timeOut() { 
 var iter = em.getInstances().iterator(); 
 while (iter.hasNext()) { 
  var eim = iter.next(); 
  if (eim.getPlayerCount() > 0) { 
   var pIter = eim.getPlayers().iterator(); 
   while (pIter.hasNext()) { 
    playerExit(eim, pIter.next()); 
   } 
  } 
  eim.dispose(); 
 } 
} 
function startInstance(eim) { 
 if (eim.getPlayerCount() > 0) { 
  var map = eim.getMapFactory().getMap(mapId, false, false); 
   for (var x = 0; x < 1; x++) { 
    var mob = net.sf.odinms.server.life.MapleLifeFactory.getMonster(8820008); 
  
    var overrideStats = new net.sf.odinms.server.life.MapleMonsterStats(); 
    overrideStats.setHp(2100000000); 
    overrideStats.setExp(10000000); 
    overrideStats.setMp(mob.getMaxMp()); 
    mob.setOverrideStats(overrideStats); 
    mob.setHp(2100000000); 
    eim.registerMonster(mob); 
    map.spawnMonsterOnGroudBelow(mob, new java.awt.Point(12, -160)); 
   } 
 } 
} 
function allMonstersDead(eim) { 
        var map = eim.getMapFactory().getMap(mapId, false, false); 
        var winner = eim.getPlayers().get(0); 
        var price; 
        var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance(); 
        
        var x = Math.floor(Math.random() * 100);
        if (x <= 90) {
	      var y = Math.floor(Math.random() * 27);
        var itemid = new Array(2044408,
						2044508,
						2044608,
						2044708,
						2044008,
						2044208,
						2044108,
						2044308,
						1332029,
						1442025,
						1372011,	
						2043208,
						2043308,
						2043708,
						2340000,
						4001113,
						4001114,
						4000054,
						4000053, 
						2043808,
						5200002,
						2040315,
						2040912,
						2040313,
						2043108,
						2022245,
						2022179);
						}
						else {
				 var y = Math.floor(Math.random() * 5);		
				var itmeid = Array(1332053,
				1402014,
				1372017,
				1402040,
				1442061
				);
    }
		price = ii.getEquipById(itemid[y]);//为物品ID 
    map.spawnItemDrop(winner, winner, price, winner.getPosition(), true, false); 
	
} 




