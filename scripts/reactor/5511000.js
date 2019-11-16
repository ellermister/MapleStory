/* 
    暴力熊脚本 
    亲亲嘴冒险 芯碎王子修改

    根据 51会员oung 发的咖啡端 暴力熊召唤脚本修改得之
    非同意内禁止转载 

*/ 

importPackage(net.sf.odinms.server.maps); 
function act() { 
 rm.dropItems(); 
 rm.changeMusic("Bgm06/FinalFight"); 
 if (rm.getPlayer().getMap().getMonsterById(9420546) == null && rm.getPlayer().getMap().getMonsterById(9420547) == null && rm.getPlayer().getMap().getMonsterById(9420548) == null && rm.getPlayer().getMap().getMonsterById(9420549) == null ) { 
  rm.getReactor().getMap().addMapTimer(2 * 60 * 60,551030100); 
 }
rm.mapMessage("暴力熊成功召唤!"); 
  rm.spawnMonster(9420541);   
} 
