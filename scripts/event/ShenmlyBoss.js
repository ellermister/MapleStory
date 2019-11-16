/* 
 * 神秘领域
 */

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("ShenmlyBoss");
	var map = 0;
    var Suijimap = java.lang.Math.floor(Math.random() * 3);
    var Suijimob = java.lang.Math.floor(Math.random() * 5);
    if(Suijimap == 0){
    map = eim.setInstanceMap(931050800);
    }else if(Suijimap == 1){
    map = eim.setInstanceMap(931050810);
    }else if(Suijimap == 2){
    map = eim.setInstanceMap(931050820);
    }
	map.resetFully();
    if(Suijimob == 0){
    if(Suijimap == 0){
	for(var i = 9300563; i <= 9300573; i++){
	if( i == 9300564){
		continue;
	}else if(i == 9300565){
		continue;
	}else{
    var mob = em.getMonster(i);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(3087, 575));
	}
	}
    }else if(Suijimap == 1){
	for(var i = 9300563; i <= 9300573; i++){
	if( i == 9300564){
		continue;
	}else if(i == 9300565){
		continue;
	}else{
    var mob = em.getMonster(i);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-2077, 29));
	}
	}
    }else if(Suijimap == 2){
	for(var i = 9300563; i <= 9300573; i++){
	if( i == 9300564){
		continue;
	}else if(i == 9300565){
		continue;
	}else{
    var mob = em.getMonster(i);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(57, 392));
	}
	}
	}
    }else if(Suijimob == 1){
    if(Suijimap == 0){
	for(var i = 9300580; i <= 9300587; i++){
    var mob = em.getMonster(i);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(3087, 575));
	}
    }else if(Suijimap == 1){
	for(var i = 9300580; i <= 9300587; i++){
    var mob = em.getMonster(i);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-2077, 29));
	}
    }else if(Suijimap == 2){
	for(var i = 9300580; i <= 9300587; i++){
    var mob = em.getMonster(i);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(57, 392));
	}
    }
    }else if(Suijimob == 2){
    if(Suijimap == 0){
    var mob = em.getMonster(9300594);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(3087, 575));
    }else if(Suijimap == 1){
    var mob = em.getMonster(9300594);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-2077, 29));
    }else if(Suijimap == 2){
    var mob = em.getMonster(9300594);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(57, 392));
    }
    }else if(Suijimob == 3){
    if(Suijimap == 0){
    var mob = em.getMonster(9300600);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(3087, 575));
    }else if(Suijimap == 1){
    var mob = em.getMonster(9300600);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-2077, 29));
    }else if(Suijimap == 2){
    var mob = em.getMonster(9300600);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(57, 392));
    }
    }else if(Suijimob == 4){
    if(Suijimap == 0){
    var mob = em.getMonster(9300608);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(3087, 575));
    }else if(Suijimap == 1){
    var mob = em.getMonster(9300608);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-2077, 29));
    }else if(Suijimap == 2){
    var mob = em.getMonster(9300608);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(57, 392));
    }
    }
    eim.startEventTimer(60 * 60 * 1000); //一小时
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function changedMap(eim, player, mapid) {
    if (mapid < 931050800 || mapid >931050820) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }
}

function playerDisconnected(eim, player) {
    eim.disposeIfPlayerBelow(100, 100000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    return 0;
}

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 100000000);
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