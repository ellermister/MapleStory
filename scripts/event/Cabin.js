/*
*该文件为PQ脚本
*文件名：shijian.js
*适用NPC-PQ挑战NPC
*适用服务端：XioxMS-079仿官方服务端
*版权所有：XioxMS-
*技术支持：XioxMS-
*联系：XioxMS@qq.com
*/
importPackage(net.sf.odinms.world); 
var exitMap; 
var instanceId; 
var minPlayers = 1;
var mapId = 200090200;   //传送地图
var qtmapId = 240000110;

importPackage(net.sf.odinms.world); 
var exitMap; 
var instanceId; 
var minPlayers = 1; 
function init() { 
 instanceId = 1; 
} 
function monsterValue(eim, mobId) { 
 return 1; 
} 
function setup() { 
 exitMap = em.getChannelServer().getMapFactory().getMap(qtmapId); // <exit> 
 var instanceName = "duwu" + instanceId;
 var eim = em.newInstance(instanceName); 
  
 var mf = eim.getMapFactory(); 
  
 instanceId++; 
  
 var map = mf.getMap(mapId); 
 map.shuffleReactors(); 
 var firstPortal = eim.getMapInstance(mapId).getPortal("next00"); 
 em.schedule("timeOut", 800* 120);//到达制定地图后规定时间是2分钟。可以在此修改
  
 return eim; 
} 
function playerEntry(eim, player) { 
 var map = eim.getMapInstance(mapId); 
 player.changeMap(map, map.getPortal(0)); 
  
 //TODO: hold time across map changes 
 player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock(120));
 player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(5, "祝你旅途愉快……"));  //进入地图后聊天窗内提示该语句
 startInstance(eim); 
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
/*以下代码可以实现怪物最大设置。但是服务端貌似不支持所有屏敞掉*/
/*function startInstance(eim) { 
 if (eim.getPlayerCount() > 0) { 
  var map = eim.getMapFactory().getMap(mapId, false, false); 
   for (var x = 0; x < 1; x++) { 
    var mob = net.sf.odinms.server.life.MapleLifeFactory.getMonster(8820008); 
    var overrideStats = new net.sf.odinms.server.life.MapleMonsterStats(); 
    overrideStats.setHp(mob.getHp() * 2100000000); 
    overrideStats.setExp(mob.getExp()* 9999999); 
    overrideStats.setMp(mob.getMaxMp()* 50000); 
    mob.setOverrideStats(overrideStats); 
    mob.setHp(mob.getHp() * 2100000000); 
    eim.registerMonster(mob); 
    map.spawnMonsterOnGroudBelow(8820008, new java.awt.Point(0,-160)); 
   } 
 } 
} */
function allMonstersDead(eim) { 
        var map = eim.getMapFactory().getMap(mapId, false, false); 
        var winner = eim.getPlayers().get(0); 
        var price; 
        var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance(); 
        price = ii.getEquipById(4031817);
        var itemid = new Item(4031817, 0, 1);
        var reactor = map.getReactorByName("wgquest");
        map.spawnItemDrop(reactor, eim.getPlayers().get(0), itemid, reactor.getPosition(), true, false);

} 

