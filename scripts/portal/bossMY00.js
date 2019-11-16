/* 
    暴力熊脚本 
    亲亲嘴冒险 芯碎王子修改
    根据 51会员oung 发的咖啡端 暴力熊召唤脚本修改得之
    非同意内禁止转载 

*/  

importPackage(net.sf.odinms.server.maps); 
importPackage(net.sf.odinms.net.channel); 
importPackage(net.sf.odinms.tools); 

function enter(pi) { 
 var nextMap = 551030200; 
 var bossMY00Map = pi.getC().getChannelServer().getMapFactory().getMap(551030200); 
 var mapobjects = bossMY00Map.getMapObjects(); 
 var boss = null; 
 var player = null; 
 var iter = mapobjects.iterator(); 
 while (iter.hasNext()) { 
   o = iter.next(); 
   if (o.getType() == MapleMapObjectType.MONSTER){ 
    boss = o; 
   } 
   if (o.getType() == MapleMapObjectType.PLAYER){ 
    player = o; 
   } 
  } 
if (!pi.haveItem(4032246)) { 
  sendMessage(pi,"你没有梦幻主题公园魂魄,请检查"); 
  return false; 
 }else{
	if(player != null && boss != null){
	sendMessage(pi,"对抗 暴力熊/心疤狮王 还在进行中。。。"); 
  	return false; }
	}

 if (pi.getBossLog('bossMY00')>=2) { 
  if (!pi.haveItem(5252004)){
  sendMessage(pi,"每天只能免费挑战2次,您需要在商城购买门票才可进入！每天最多只能挑战10次"); 
  return false; }
   else {
	if (pi.getBossLog('bossMY00')>=10){
	 sendMessage(pi,"每天最多只能挑战10次,您今天已经不可再进入！"); 
 	 return false; }
	} 
	if(player != null && boss != null){
	sendMessage(pi,"对抗 暴力熊/心疤狮王 还在进行中。。。"); 
  	return false; 
	}
 	else{
	pi.gainItem(5252004,-1);
	}
 } 

 if (bossMY00Map.getCharacters().isEmpty() && pi.getBossLog('bossMY00') < 10) { 
  bossMY00Map.resetReactors(); 
 } 
  pi.getC().getChannelServer().getMapFactory().getMap(551030200).clearMapTimer(); 
  pi.getC().getChannelServer().getMapFactory().getMap(551030200).killAllMonsters(); 
  pi.setBossLog('bossMY00'); 
  pi.warp(551030200);  
  return true; 
   
} 
function sendMessage(pi,message) { 
 pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, message)); 
} 