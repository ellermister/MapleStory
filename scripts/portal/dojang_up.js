importPackage(net.sf.odinms.server.maps);
importPackage(net.sf.odinms.tools);

function enter(pi) {
    if (pi.getPlayer().getMap().getMonsterById(9300216) != null) {
        pi.getPlayer().getClient().getSession().write(MaplePacketCreator.dojoWarpUp());
        pi.getPlayer().message("获得了" + pi.getPlayer().addDojoPointsByMap() + "点修炼点数。总修炼点数为" + pi.getPlayer().getDojoPoints() + "点。");
        pi.getPlayer().getClient().getSession().write(MaplePacketCreator.updateDojoStats(pi.getPlayer(),1));
        pi.getPlayer().getClient().getSession().write(MaplePacketCreator.dojoWarpUp());
        var reactor = pi.getPlayer().getMap().getReactorByName("door");
        reactor.delayedHitReactor(pi.getC(), 800);
		// -- 清理道场物品代码 -- //
		for (var i = 2022359; i < 2022433; i++) {
		var b = -1;
		for (var a = 0; a < 100; a++) {
		if (pi.haveItem(i,a) == true){b += 1;}else{a=100;}//判断存在该物品，则丢弃。
		}
		if (b > 0) {pi.gainItem(i, -b);}
		}
		// -- 清理道场物品结束 -- //
        var stage = (pi.getPlayer().getMapId() / 100) % 100;
        var charcount = pi.getC().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMapId() + 100).getCharacters().size();
        if (stage - (stage/6) | 0 == pi.getPlayer().getVanquisherStage() && charcount < 2) // we can also try 5 * stage / 6 | 0 + 1
            pi.getPlayer().setVanquisherKills(pi.getPlayer().getVanquisherKills() + 1);
        if (stage != 38)
            if (charcount < 1)
                pi.getC().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMapId() + 100).killAllMonsters();
        return true;
    } else {
        pi.getPlayer().message("还有怪物没有消灭。");
    }
    return false;
}