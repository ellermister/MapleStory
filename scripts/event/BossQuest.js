importPackage(java.lang);

var monster;
var mapid = 551030200;

monster = new Array(
3220000, // 树妖王
9300003, // 绿水灵王
4130103, // 战甲吹泡泡鱼
9300012, // 阿丽莎乐
8220001, // 驮狼雪人
8220000, // 艾利杰
9300119, // 老海盗
9300152, // 生气的法兰肯
9300039, // 远古精灵
9300032, // 石像4
9300028, // 艾里葛斯
9400549, // 死灵骑士
8180001, // 天鹰
8180000, // 火焰龙
8500001, // 帕普拉图斯的座钟
9400014, // 天球
9420544, // 愤怒的暴力熊
9420549, // 愤怒的心疤狮王
9400121, // 女老板
9400300 // 大头头
);

function init() {}

function monsterValue(eim, mobId) {
    return 1;
}

function setup(partyid) {
    var instanceName = "BossQuest" + partyid;

    var eim = em.newInstance(instanceName);
    // If there are more than 1 map for this, you'll need to do mapid + instancename
    var map = eim.createInstanceMap(mapid);
    map.toggleDrops();

    eim.setProperty("points", 0);
    eim.setProperty("monster_number", 0);

    eim.schedule("beginQuest", 5000);
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(mapid, 0);
    player.changeMap(map, map.getPortal(0));
}

function playerDead(eim, player) {}

function playerRevive(eim, player) {
    player.setHp(player.getMaxHp());
    playerExit(eim, player);
    return false;
}

function playerDisconnected(eim, player) {
    return 0;
}

function leftParty(eim, player) {
    playerExit(eim, player);
}

function disbandParty(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
}

function playerExit(eim, player) {
    var party = eim.getPlayers();
    var dispose = false;
    if (party.size() == 1) {
        dispose = true;
    }
    eim.saveBossQuestPoints(parseInt(eim.getProperty("points")), player);
    player.dropMessage(6, "[The Boss Quest] Your current points have been awarded, spend them as you wish. Better luck next time!"));
    eim.unregisterPlayer(player);

    if (dispose) {
        eim.dispose();
    }
}

function removePlayer(eim, player) {
    var party = eim.getPlayers();
    var dispose = false;
    if (party.size() == 1) {
        dispose = true;
    }
    eim.saveBossQuestPoints(parseInt(eim.getProperty("points")), player);
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);

    if (dispose) {
        eim.dispose();
    }
}

function clearPQ(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
}

function allMonstersDead(eim) {
    var monster_number = parseInt(eim.getProperty("monster_number"));
    var points = parseInt(eim.getProperty("points"));

    var monster_end = java.lang.System.currentTimeMillis();
    var monster_time = Math.round((monster_end - parseInt(eim.getProperty("monster_start"))) / 1000);

    if (3600 - monster_time <= 0) {
        points += monster_number * 10000;
    } else {
        points += (monster_number * 10000) + ((3600 - monster_time) * (monster_number + 1));
    }
    monster_number++;

    eim.setProperty("points", points);
    eim.setProperty("monster_number", monster_number);

    var map = eim.getMapInstance(mapid, 0);

    if (monster_number > 19) {
        map.broadcastMessage(tools.MaplePacketCreator.serverNotice(6, "[The Boss Quest] Congratulations! Your team has defeated all the bosses with " + points + " points!"));
        map.broadcastMessage(tools.MaplePacketCreator.serverNotice(6, "[The Boss Quest] The points have been awarded, spend them as you wish."));
        disbandParty();
    } else {
        map.broadcastMessage(tools.MaplePacketCreator.serverNotice(6, "[The Boss Quest] Your team now has " + points + " points! The next boss will spawn in 10 seconds."));
        map.broadcastMessage(tools.MaplePacketCreator.getClock(10));
        eim.schedule("monsterSpawn", 1000);
    }
}

function monsterSpawn(eim) {
    var mob = em.getMonster(monster[parseInt(eim.getProperty("monster_number"))]);
    var overrideStats = new server.life.MapleMonsterStats();

    if (parseInt(eim.getProperty("monster_number")) > 14) {
        overrideStats.setHp(mob.getHp() / 2);
    } else {
        overrideStats.setHp(mob.getHp() * 2);
    }
    overrideStats.setExp(mob.getExp());
    overrideStats.setMp(mob.getMaxMp());
    mob.setOverrideStats(overrideStats);

    if (parseInt(eim.getProperty("monster_number")) > 14) {
        mob.setHp(mob.getHp() / 2);
    } else {
        mob.setHp(mob.getHp() * 2);
    }
    eim.registerMonster(mob);

    var map = eim.getMapInstance(mapid, 0);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(100, 100));
    eim.setProperty("monster_start", java.lang.System.currentTimeMillis());
}

function beginQuest(eim) {
    var map = eim.getMapInstance(mapid, 0);
    map.broadcastMessage(tools.MaplePacketCreator.serverNotice(6, "[The Boss Quest] The creatures of the darkness are coming in 30 seconds. Prepare for the worst!"));
    eim.schedule("monsterSpawn", 30000);
    map.broadcastMessage(tools.MaplePacketCreator.getClock(30));
}

function cancelSchedule() {}