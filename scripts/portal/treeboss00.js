
/* 
    大树妖脚本。 
    亲亲嘴冒险 芯碎王子 修改
    非同意内禁止转载 
*/ 

importPackage(net.sf.cherry.server.maps); 
importPackage(net.sf.cherry.net.channel); 
importPackage(net.sf.cherry.tools); 

function enter(pi) { 
 var nextMap = 541020800; 
 var treeboss00Map = pi.getC().getChannelServer().getMapFactory().getMap(541020800); 
 var mapobjects = treeboss00Map.getMapObjects(); 
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


 if (pi.getBossLog('treeboss00')>=5) {   
  sendMessage(pi,"每天挑战5次！你明天再来吧"); 
  return false; }
   

if(player != null && boss != null){
	sendMessage(pi,"对抗 大树妖BOSS 还在进行中。。请稍候再来。。。"); 
  	return false; }

 if (treeboss00Map.getCharacters().isEmpty() && pi.getBossLog('treeboss00') < 5) { 
  treeboss00Map.resetReactors(); 
 } 
  pi.getC().getChannelServer().getMapFactory().getMap(541020800).clearMapTimer(); 
  pi.getC().getChannelServer().getMapFactory().getMap(541020800).killAllMonsters(); 
  pi.setBossLog('treeboss00'); 
  pi.warp(541020800);  
  return true; 
   
} 
function sendMessage(pi,message) { 
 pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, message)); 
} 