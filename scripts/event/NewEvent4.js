/* 
 * 测试脚本
 */

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("NewEvent4");
    eim.setInstanceMap(321190300).resetPQ(level);
    eim.setInstanceMap(321190310).resetPQ(level);
    eim.setInstanceMap(321190320).resetPQ(level);
    var map = eim.setInstanceMap(321190350);
    map.resetFully();
    em.getMapFactory().getMap(321190350).killAllMonsters(false);
    var mob = em.getMonster(9500006);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 10);
    modified.setOMp(mob.getMobMaxMp() * 10);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(246, 245));
    eim.startEventTimer(1000 * 60 * 30); //30 min
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
    if (mapid < 321190300 || mapid > 321190350) {
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

function end(eim) {
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}


function allMonstersDead(eim) {
    //em.broadcastYellowMsg("[系列-射手村]已被击败，勇士们解放了！");
    //em.broadcastServerMsg(5120059, "[系列-神木村]已被击败，请在10秒内点击蛋蛋龙获得奖励。" ,true);
    //eim.startEventTimer(1000 * 10); //10 min
    //eim.getMapInstance(4).spawnNpc(9900007, new java.awt.Point(257, 245));
}


function leftParty(eim, player) {}
function disbandParty(eim) {}
function playerDead(eim, player) {}
function cancelSchedule() {}