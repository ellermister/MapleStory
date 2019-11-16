//定时召唤怪物
//CherryMS LoveMXD


importPackage(net.sf.odinms.client);

function init() {
	scheduleNew();
}

function scheduleNew() {
	em.schedule("start", 5*60*1000); //每5分钟出现一次
}

function start() {
	scheduleNew();
	var hotSand = em.getChannelServer().getMapFactory().getMap(110040000, false, false);
	var kingClang = net.sf.odinms.server.life.MapleLifeFactory.getMonster(5220001);
	var current1 = em.getChannelServer().getMapFactory().getMap(110040000).spawnMob(5220001);
	var current2 = em.getChannelServer().getMapFactory().getMap(110040000).spawnMob(5220000);
	if (current1 == 0 && current2 == 0) {
		var random = Math.floor(Math.random()*7);
		var posX;
		var posY;
		switch (random) { //一下是坐标，随机选择一个发生。
			case 1:
				posX = -116;
				posY = -833;
				break;
			case 2:
				posX = -1056;
				posY = 173;
				break;
			case 3:
				posX = -300;
				posY = 176;
				break;
			case 4:
				posX = 964;
				posY = 173;
				break;
			case 5:
				posX = 286;
				posY = -473;
				break;
			default:
				posX = 709;
				posY = -353;
		}
		hotSand.spawnMonsterOnGroundBelow(kingClang, new java.awt.Point(posX, posY));
		hotSand.broadcastMessage(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6, "[公告事项] 巨居蟹在这个沙滩上出现了。"));
	}
	scheduleNew();
}
