/* 
    暴力熊脚本 
    亲亲嘴冒险 芯碎王子修改    
    非同意内禁止转载 

*/  
importPackage(net.sf.cherry.server.maps); 

function act(){
if (rm.getPlayer().getMap().getMonsterById(9420520) == null  && rm.getPlayer().getMap().getMonsterById(9420521) == null && rm.getPlayer().getMap().getMonsterById(9420522) == null ) {
	rm.getReactor().getMap().addMapTimer(2 * 60 * 60,541020700);   
        rm.mapMessage("克雷赛尔已被召唤");
        rm.spawnMonster(9420520, -178, -212);
        rm.createMapMonitor(1,540000000,"sp");
	}else{
	 rm.mapMessage("大树妖正在挑战中.....不能重复召唤!!");
	}
}