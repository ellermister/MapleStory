/* 
 * 大运动会 罗密欧与朱丽叶
 */

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    em.setProperty("stage", "0");
    em.setProperty("stage1", "0");
    em.setProperty("stage2", "0");
    em.setProperty("stage3", "0");
    em.setProperty("stage4", "0");
    em.setProperty("stage5", "0");
    var eim = em.newInstance("ZChaosPQ3" +  + leaderid);
    eim.setInstanceMap(926110000).resetPQ(level);
    eim.setInstanceMap(926110001).resetPQ(level);
    eim.setInstanceMap(926110100).resetPQ(level);
    eim.setInstanceMap(926110200).resetPQ(level);
    eim.setInstanceMap(926110200).resetPQ(level);
    eim.setInstanceMap(926110201).resetPQ(level);
    eim.setInstanceMap(926110202).resetPQ(level);
    var map = eim.setInstanceMap(926110203);
    map.resetPQ(level);
    map.spawnNpc(2112010, new java.awt.Point(200, 188));
    eim.setInstanceMap(926110400).resetPQ(level);
    var map1 = eim.setInstanceMap(926110401);
    map1.resetFully();
    var mob = em.getMonster(9300139);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 350);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map1.spawnMonsterOnGroundBelow(mob, new java.awt.Point(80, 150));
    map1.spawnNpc(2112003, new java.awt.Point(-380, -126));
    eim.startEventTimer(1200000);
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
    player.tryPartyQuest(1205);
}

function changedMap(eim, player, mapid) {
    if (mapid < 926110000 || mapid > 926110600) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }
}

function playerDisconnected(eim, player) {
    eim.disposeIfPlayerBelow(100, 261000021);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    return 0;
}

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 261000021);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
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