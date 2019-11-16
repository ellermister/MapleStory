var eventmapid = 220080001;
var returnmap = 980010000;

var monster = new Array(
4130103, // 战甲吹泡泡鱼
9300039, // 远古精灵
9300119, // 老海盗
9300152, // 生气的法兰肯
9400549, // 死灵骑士
9300028, // 艾里葛斯
8180000, // 火焰龙
8180001, // 天鹰
9500392, // 拉瓦那
8220003, // 大海兽
8210011, // 第二座塔的阿尼
9400014, // 天球
8500001 // 帕普拉图斯的座钟
);

function init() {
    // After loading, ChannelServer
}

function setup(partyid) {
    var instanceName = "BossQuest" + partyid;

    var eim = em.newInstance(instanceName);
    // If there are more than 1 map for this, you'll need to do mapid + instancename
    var map = eim.createInstanceMapS(eventmapid);
    map.toggleDrops();
    map.spawnNpc(9250156, new java.awt.Point( - 780, -557));

    eim.setProperty("points", 0);
    eim.setProperty("monster_number", 0);

    beginQuest(eim);
    return eim;
}

function beginQuest(eim) { // Custom function
    if (eim != null) {
        eim.startEventTimer(5000); // After 5 seconds -> scheduledTimeout()
    }
}

function monsterSpawn(eim) { // Custom function
    var monsterid = monster[parseInt(eim.getProperty("monster_number"))];
    var mob = em.getMonster(monsterid);

    switch (monsterid) {
    case 8180000:
    case 8180001:
        //Manon Griffey
        var modified = em.newMonsterStats();
        modified.setOExp(mob.getMobExp() * 8);
        modified.setOHp(mob.getMobMaxHp() * 4);
        modified.setOMp(mob.getMobMaxMp() * 1.5);

        mob.setOverrideStats(modified);
        break;
    case 4130103:
        // Rombot
        var modified = em.newMonsterStats();
        modified.setOExp(mob.getMobExp() * 5);
        modified.setOHp(mob.getMobMaxHp() * 8);
        modified.setOMp(mob.getMobMaxMp() * 1.5);

        mob.setOverrideStats(modified);
        break;
    case 8220003:
        // Lev
        var modified = em.newMonsterStats();
        modified.setOExp(mob.getMobExp() * 5);
        modified.setOHp(mob.getMobMaxHp() * 3);
        modified.setOMp(mob.getMobMaxMp() * 1.5);

        mob.setOverrideStats(modified);
        break;
    case 9300119:
        // Lord Pirate
    case 9300152:
        // Angry Frankenlloyd
    case 9400549:
        // Headless Horseman
        var modified = em.newMonsterStats();
        modified.setOExp(mob.getMobExp() * 3);
        modified.setOHp(mob.getMobMaxHp() * 3);
        modified.setOMp(mob.getMobMaxMp() * 1.5);

        mob.setOverrideStats(modified);
        break;
    case 9500392:
        // Ravana HARD
    case 9300028:
        // Ergoth
        var modified = em.newMonsterStats();
        modified.setOExp(mob.getMobExp() * 3);
        modified.setOHp(mob.getMobMaxHp() * 3);
        modified.setOMp(mob.getMobMaxMp() * 1.5);

        mob.setOverrideStats(modified);
        break;
    case 8500001:
        // Papulatus
        var modified = em.newMonsterStats();
        modified.setOExp(mob.getMobExp() * 0.3); //2nd body gives exp as well
        modified.setOHp(mob.getMobMaxHp() * 2.5);
        modified.setOMp(mob.getMobMaxMp() * 1.5);

        mob.setOverrideStats(modified);
        break;
    case 9400014:
        // Black Crow
    case 9300039:
        // Papa Pixie
        var modified = em.newMonsterStats();
        modified.setOExp(mob.getMobExp() * 1.5);
        modified.setOHp(mob.getMobMaxHp() * 1.5);
        modified.setOMp(mob.getMobMaxMp() * 1.5);

        mob.setOverrideStats(modified);
        break;
    case 8210011:
        // Ani 2
        var modified = em.newMonsterStats();
        modified.setOExp(mob.getMobExp() * 2.2);
        modified.setOHp(mob.getMobMaxHp() * 1.1);
        modified.setOMp(mob.getMobMaxMp() * 0.8);

        mob.setOverrideStats(modified);
        break;
    }
    eim.registerMonster(mob);

    var map = eim.getMapInstance(0);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point( - 400, -386));
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function changedMap(eim, player, mapid) {
    if (mapid != eventmapid) {
        eim.unregisterPlayer(player);

        eim.disposeIfPlayerBelow(0, 0);
    }
}

function scheduledTimeout(eim) {
    var num = parseInt(eim.getProperty("monster_number"));
    if (num < monster.length) {
        monsterSpawn(eim);
        eim.setProperty("monster_number", num + 1);
    } else {
        eim.disposeIfPlayerBelow(100, returnmap);
    }
    // When event timeout..

    // restartEventTimer(long time)
    // stopEventTimer()
    // startEventTimer(long time)
    // isTimerStarted()
}

function allMonstersDead(eim) {
    eim.restartEventTimer(3000);

    var mobnum = parseInt(eim.getProperty("monster_number"));
    var num = mobnum * 35; // Total 1170
    var totalp = parseInt(eim.getProperty("points")) + num;

    eim.setProperty("points", totalp);
    //暂时去掉奖励
    //eim.broadcastPlayerMsg(5, "Your team've gained " + num + " points! With a total of " + totalp + ".");

    eim.saveBossQuest(num);

    if (mobnum < monster.length) {
        eim.broadcastPlayerMsg(6, "Prepare! The next boss will appear in a glimpse of an eye!");
    } else {
        eim.saveBossQuest(1000);
        //暂时去掉奖励
        //eim.broadcastPlayerMsg(5, "Your team've beaten the MED mode and have gained an extra 1000 points!");
    }
    // When invoking unregisterMonster(MapleMonster mob) OR killed
    // Happens only when size = 0
}

function playerDead(eim, player) {
    // Happens when player dies
}

function playerRevive(eim, player) {
    return true;
    // Happens when player's revived.
    // @Param : returns true/false
}

function playerDisconnected(eim, player) {
    return 0;
    // return 0 - Deregister player normally + Dispose instance if there are zero player left
    // return x that is > 0 - Deregister player normally + Dispose instance if there x player or below
    // return x that is < 0 - Deregister player normally + Dispose instance if there x player or below, if it's leader = boot all
}

function monsterValue(eim, mobid) {
    return 0;
    // Invoked when a monster that's registered has been killed
    // return x amount for this player - "Saved Points"
}

function leftParty(eim, player) {
    // Happens when a player left the party
    eim.unregisterPlayer(player);

    var map = em.getMapFactory().getMap(returnmap);
    player.changeMap(map, map.getPortal(0));

    eim.disposeIfPlayerBelow(0, 0);
}

function disbandParty(eim, player) {
    // Boot whole party and end
    eim.disposeIfPlayerBelow(100, returnmap);
}

function clearPQ(eim) {
    // Happens when the function EventInstanceManager.finishPQ() is invoked by NPC/Reactor script
}

function removePlayer(eim, player) {
    eim.dispose();
    // Happens when the funtion NPCConversationalManager.removePlayerFromInstance() is invoked
}

function registerCarnivalParty(eim, carnivalparty) {
    // Happens when carnival PQ is started. - Unused for now.
}

function onMapLoad(eim, player) {
    // Happens when player change map - Unused for now.
}

function cancelSchedule() {}