/*
 * 大运动会 魔法鬼节院
 */
function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("ZChaosPQ5");
    var map = eim.setInstanceMap(910024000);
    map.resetFully();
    em.getMapFactory().getMap(910024000).killAllMonsters(false);
    //em.registerMonster(9500319);
    var mob = em.getMonster(9500319);
    //eim.registerMonster(mob);
    //var modified = em.newMonsterStats();
    //modified.setOHp(mob.getMobMaxHp() * 50);
    //mob.setOverrideStats(modified);
    //eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, -260));
    eim.startEventTimer(1000 * 60 * 30); //20 min
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function changedMap(eim, player, mapid) {
    if (mapid != 910024000) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }
}

function playerDisconnected(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
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
function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function clearPQ(eim) {
    scheduledTimeout(eim);
}

function allMonstersDead(eim) {
    em.broadcastServerMsg(5121027, "鬼节怪物已被消灭，请在10秒内点击NPC获得奖励。" ,true);
    eim.startEventTimer(1000 * 10); //10 min
    eim.getMapInstance(0).spawnNpc(3000122, new java.awt.Point(50, -260));
}

function leftParty(eim, player) {}
function disbandParty(eim) {}
function playerDead(eim, player) {}
function cancelSchedule() {}