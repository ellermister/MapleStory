/*
 *@Map(s):     All Dojo fighting maps
 *@Function:   Spawns dojo monsters and handles time
*/

importPackage(net.sf.odinms.server.life);
importPackage(net.sf.odinms.tools);

function start(ms) {
    ms.getPlayer().resetEnteredScript();
    var stage = (ms.getPlayer().getMap().getId() / 100) % 100;
    if (stage % 6 == 1)
        ms.getPlayer().setDojoStart();
    if (ms.getPlayer().getMap().getCharacters().size() == 1)
        ms.getPlayer().showDojoClock();
    if (stage % 6 > 0) {
        var realstage = stage - ((stage / 6) | 0);
        ms.getPlayer().getClient().getSession().write(MaplePacketCreator.environmentChange("Dojang/start", 4));
        ms.getPlayer().getClient().getSession().write(MaplePacketCreator.environmentChange("dojang/start/stage", 3));
        ms.getPlayer().getClient().getSession().write(MaplePacketCreator.environmentChange("dojang/start/number/" + realstage, 3));
        ms.getPlayer().getClient().getSession().write(MaplePacketCreator.getEnergy(ms.getPlayer().getDojoEnergy()));
        var mob = MapleLifeFactory.getMonster(9300183 + realstage);
        if (mob != null && ms.getPlayer().getMap().getMonsterById(9300183 + realstage) == null) {
            mob.setBoss(false);
            ms.getPlayer().getMap().spawnDojoMonster(mob);
        }
    }
}
