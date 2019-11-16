var minPlayers = 6;

function init() {
    exitMap = em.getChannelServer().getMapFactory().getMap(922010000);
    em.setProperty("started", "false");
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup() {
    em.setProperty("started", "true");
    var eim = em.newInstance("LudiMazePQ");
    eim.startEventTimer(60 * 60 * 1000);
    return eim;
}

function scheduledTimeoutt(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++)
    playerExit2(eim,party.get(i));
    em.setProperty("started", "false");
}

function playerExit2(eim, player) {
    var map = eim.getMapFactory().getMap(922011100);
    eim.unregisterPlayer(player);
    player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim, player) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++)
    playerExit(eim,party.get(i));
    em.setProperty("started", "false");
}

function playerEntry(eim, player) {
    var map = eim.getMapFactory().getMap(922010100);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
if (eim.isLeader(player) || party.size() <= minPlayers) {
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++)
            playerExit(eim, party.get(i));
        eim.dispose();
    } else
        playerExit(eim, player);
}

function playerDisconnected(eim, player) {
    var party = eim.getPlayers();
    if (eim.isLeader(player) || party.size() < minPlayers) {
    for (var i = 0; i < party.size(); i++)
        playerExit(eim, party.get(i));
        em.setProperty("started", "false");
    } else
        removePlayer(eim, player);
}

function leftParty(eim, player) {			
    var party = eim.getPlayers();
    if (party.size() < minPlayers) {
        for (var i = 0; i < party.size(); i++)
            playerExit(eim,party.get(i));
    em.setProperty("started", "false");
        eim.dispose();
    } else
        playerExit(eim, player);
}

function disbandParty(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
 em.setProperty("started", "false");
    }
    eim.dispose();
}

function playerExit(eim, player) {
    var map = eim.getMapFactory().getMap(922010000);
    eim.unregisterPlayer(player);
    player.changeMap(map, map.getPortal(0));
}

// For offline players
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}

function clearPQ(eim) {
    eim.disposeIfPlayerBelow(100, 922010000);

    em.setProperty("started", "false");
}

function finish(eim) {
    eim.disposeIfPlayerBelow(100, 0);

    em.setProperty("started", "false");
}

function timeOut(eim) {
    eim.disposeIfPlayerBelow(100, 922010000);

    em.setProperty("started", "false");
}

function cancelSchedule() {}
function playerDead() {}
function allMonstersDead(eim) {}