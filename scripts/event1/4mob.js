importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.world);
importPackage(net.sf.odinms.server.life);
var mapId=910000000;
var checkstart=0;
var chanel=1;

var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.SECOND, 5);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 50 * 1; // Every 1 minute
    }
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}


function start() {
    scheduleNew();
	if(em.getMin()==0){
		startInstance(); //怪物攻城
	}
}

function startInstance() {//怪物攻城
	var mobCount = net.sf.odinms.net.channel.ChannelServer.getInstance(chanel).getMapFactory().getMap(mapId).mobCount();
	if(mobCount==0){
		var map = em.getChannelServer().getMapFactory().getMap(mapId, false, false); 
		var Rand = Math.floor(Math.random() * 952)+479;
		var overrideStats = new net.sf.odinms.server.life.MapleMonsterStats(); 			
			var mob = net.sf.odinms.server.life.MapleLifeFactory.getMonster(9600076);
			overrideStats.setHp(1500000000); 
			overrideStats.setExp(20000000); 
			overrideStats.setMp(2100000000); 
			mob.setOverrideStats(overrideStats); 
			mob.setHp(1500000000); 
			if(em.getChannelServer().getChannel()==chanel){
				map.spawnMonsterOnGroudBelow(mob, new java.awt.Point(-1192, 34));
			}
		scheduleNew2();
    }
    em.getChannelServer().broadcastPacket(net.sf.odinms.tools.MaplePacketCreator.serverNotice(0,"[十万火急] 1线市场突然出现一头巨兽，是英雄就拿起宝刀K掉吧!"));
	
}           

function scheduleNew2() {//攻城提醒
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.SECOND, 5);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 2; // Every 1 minute
    }
    setupTask = em.scheduleAtTimestamp("started", nextTime);
}

function started() {
	checkstart=checkstart+1;
	var mobCount = net.sf.odinms.net.channel.ChannelServer.getInstance(chanel).getMapFactory().getMap(mapId).mobCount();
    if(mobCount==0){
		if(checkstart>20){
			em.getChannelServer().broadcastPacket(net.sf.odinms.tools.MaplePacketCreator.serverNotice(0,"[警告] 巨兽悄悄的消失在1线市场!"));
			checkstart=0;
		}else{
			scheduleNew2();
			em.getChannelServer().broadcastPacket(net.sf.odinms.tools.MaplePacketCreator.serverNotice(0,"[十万火急] 1线市场突然出现一头巨兽，是英雄就拿起宝刀K掉吧!"));
			var map = em.getChannelServer().getMapFactory().getMap(mapId, false, false); 
		var overrideStats = new net.sf.odinms.server.life.MapleMonsterStats(); 			
			var mob = net.sf.odinms.server.life.MapleLifeFactory.getMonster(9600076);
			overrideStats.setHp(1500000000); 
			overrideStats.setExp(20000000); 
			overrideStats.setMp(200000000); 
			mob.setOverrideStats(overrideStats); 
			mob.setHp(1500000000); 
			if(em.getChannelServer().getChannel()==chanel){
				map.spawnMonsterOnGroudBelow(mob, new java.awt.Point(-1192, 34));
			}
		}
		
    }else{
		checkstart=0;
    }
}