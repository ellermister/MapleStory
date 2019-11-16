var minPlayers = 3;

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("Dragonica" + leaderid);
    eim.setInstanceMap(240080100).resetPQ(level);
    eim.setInstanceMap(240080200).resetPQ(level);
    var map = eim.setInstanceMap(240080300);
    map.resetPQ(level);
    var mob = em.getMonster(8300006);
    mob.changeLevel(level);
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1550, 152));
    eim.setInstanceMap(240080400).resetPQ(level);
    var map1 = eim.setInstanceMap(240080500);
    map1.resetPQ(level);
    var mob = em.getMonster(8300007);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 2);
    mob.setOverrideStats(modified);
    mob.changeLevel(level);
    eim.registerMonster(mob);
    map1.spawnMonsterOnGroundBelow(mob, new java.awt.Point(700, -10));

    eim.startEventTimer(1200000); //20 min
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    var map = eim.getMapInstance(eim.getMapInstance(0).getAllMonstersThreadsafe().size() == 0 ? 2 : 0);
    player.addHP(50);
    player.changeMap(map, map.getPortal(0));
    return true;
}

function scheduledTimeout(eim) {
    end(eim);
}

function changedMap(eim, player, mapid) {
    if (mapid != 240080100 && mapid != 240080200 && mapid != 240080300 && mapid != 240080400 && mapid != 240080500) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }
}

function playerDisconnected(eim, player) {
    return 0;
}

function monsterValue(eim, mobId) {
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function end(eim) {
    eim.disposeIfPlayerBelow(100, 240080050);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {
    if (eim.getMapInstance(4).getAllMonstersThreadsafe().size() == 0) {
        eim.getMapInstance(4).spawnNpc(2085003, new java.awt.Point(700, -10));
        eim.broadcastPlayerMsg(6, "御龙魔已被消灭，传送门已开启！");
    }
}

function leftParty(eim, player) {
    end(eim);
}
function disbandParty(eim) {
    end(eim);
}
function playerDead(eim, player) {}
function cancelSchedule() {}