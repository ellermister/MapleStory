/* 
 * 穿越时空挑战皇陵
 */


function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("ZChaosPQ10" + leaderid);
    eim.setInstanceMap(745010000).resetPQ(level);
    eim.setInstanceMap(745010100).resetPQ(level);
    eim.setInstanceMap(745010200).resetPQ(level);
    eim.setInstanceMap(745010300).resetPQ(level);
    eim.setInstanceMap(745010400).resetPQ(level);
    var map = eim.setInstanceMap(745010500);
    map.resetPQ(level);
    var mob = em.getMonster(9410224);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 25);
    mob.setOverrideStats(modified);
    mob.changeLevel(level);
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(0, 98));
    map.resetFully();
    eim.startEventTimer(1000 * 60 * 30); //30分钟
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function changedMap(eim, player, mapid) {
    if (mapid != 745010000 && mapid != 745010100 && mapid != 745010200 && mapid != 745010300 && mapid != 745010400 && mapid != 745010500) {
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

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function playerDisconnected(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    return 0;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function monsterValue(eim, mobId) {
    return 1;
}

function allMonstersDead(eim) {
    var state = em.getProperty("state");
    if (state.equals("1")) {
        em.setProperty("state", "2");
    } else if (state.equals("2")) {
        em.setProperty("state", "3");
    }
}

function playerRevive(eim, player) {
    return false;
}

function clearPQ(eim) {
    scheduledTimeout(eim);
}
function leftParty(eim, player) {}
function disbandParty(eim) {}
function playerDead(eim, player) {}
function cancelSchedule() {}