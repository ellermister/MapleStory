
importPackage(net.sf.odinms.server.maps); 
function act() { 
 rm.dropItems(); 
rm.changeMusic("Bgm06/FinalFight"); 
 if (rm.getPlayer().getMap().getMonsterById(9420546) == null && rm.getPlayer().getMap().getMonsterById(9420547) == null && rm.getPlayer().getMap().getMonsterById(9420548) == null && rm.getPlayer().getMap().getMonsterById(9420549) == null ) { 
  rm.getReactor().getMap().addMapTimer(2 * 60 * 60,5510300);   
 } 
rm.mapMessage("如你所愿，暴力熊出现了!"); 
 rm.spawnMonster(9420541); 
} 
