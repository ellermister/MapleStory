/*
-- ---------------------
     黑龙王召唤脚本
-------------------------
      亲亲冒险岛专用
----- Version Info ------
      芯碎王子修复
-------------------------
*/

importPackage(net.sf.cherry.server.maps); 
function act(){
if (rm.getPlayer().getMap().getMonsterById(8810000) == null && rm.getPlayer().getMap().getMonsterById(8810001) == null && rm.getPlayer().getMap().getMonsterById(8810002) == null && rm.getPlayer().getMap().getMonsterById(8810003) == null && rm.getPlayer().getMap().getMonsterById(8810004) == null && rm.getPlayer().getMap().getMonsterById(8810005) == null && rm.getPlayer().getMap().getMonsterById(8810006) == null && rm.getPlayer().getMap().getMonsterById(8810007) == null && rm.getPlayer().getMap().getMonsterById(8810008) == null && rm.getPlayer().getMap().getMonsterById(8810009) == null && rm.getPlayer().getMap().getMonsterById(8810010) == null && rm.getPlayer().getMap().getMonsterById(8810011) == null && rm.getPlayer().getMap().getMonsterById(8810012) == null && rm.getPlayer().getMap().getMonsterById(8810013) == null && rm.getPlayer().getMap().getMonsterById(8810014) == null && rm.getPlayer().getMap().getMonsterById(8810015) == null && rm.getPlayer().getMap().getMonsterById(8810016) == null && rm.getPlayer().getMap().getMonsterById(8810017) == null && rm.getPlayer().getMap().getMonsterById(8810018) == null) {
	 rm.changeMusic("Bgm14/HonTale");
         rm.spawnMonster(8810026,71,260);
    	 /*rm.createMapMonitor(2,240050400,"sp","8810010,8810011,8810012,8810013,8810014,8810015,8810016,8810017",0,8810018);
    	 rm.createMapMonitor(2,240050400,"sp","8810002,8810004,8810005,8810006,8810007,8810008,8810009",1,8810003);*/
    	 rm.getReactor().getMap().addMapTimer(12 * 60 * 60, 240000000);
	 rm.mapMessage(5, "随着紫色水晶石的消失,黑暗龙王出现了.紫色水晶将在半小时后刷出来");
	}else{
	 rm.mapMessage("黑暗龙王挑战中.....不能重复召唤!!");
	}
}
