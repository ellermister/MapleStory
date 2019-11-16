importPackage(net.sf.odinms.server.maps); 

function act() { 
rm.dropItems(); 
rm.changeMusic("Bgm06/FinalFight"); 
 if (rm.getPlayer().getMap().getMonsterById(9420541) == null && rm.getPlayer().getMap().getMonsterById(9420542) == null && rm.getPlayer().getMap().getMonsterById(9420543) == null && rm.getPlayer().getMap().getMonsterById(9420544) == null ) { 
 rm.getReactor().getMap().addMapTimer(2 * 60 * 60,551030100);   
 } 
 rm.mapMessage("如你所愿，心疤狮王出现了!"); 
rm.spawnMonster(9420546); 
} 
