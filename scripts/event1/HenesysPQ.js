//INSERT monsterdrops (monsterid,itemid,chance) VALUES (9300061,4001101,1);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.net);
importPackage(net.sf.odinms.tools);

var exitMap;
var instanceId;
var minPlayers = 0;
var pqTime = 600;//10 Minutes

function init() {
    instanceId = 1;
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup() {
    exitMap = em.getChannelServer().getMapFactory().getMap(910010300);
    var instanceName = "HenesysPQ" + instanceId;
    var eim = em.newInstance(instanceName);
    var mf = eim.getMapFactory();
    instanceId++;
    var map = mf.getMap(910010300);
    map.shuffleReactors();
    eim.addMapInstance(910010300,map);
    var firstPortal = eim.getMapInstance(910010000).getPortal("next00");
    firstPortal.setScriptName("hpq1");
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(910010300);
    player.changeMap(map, map.getPortal(0));
}

function playerDead(eim, player) {
    if (player.isAlive()) { //don't trigger on death, trigger on manual revive
        if (eim.isLeader(player)) { //check for party leader
            //boot whole party and end
            var party = eim.getPlayers();
            for (var i = 0; i < party.size(); i++) {
                playerExit(eim, party.get(i));
            }
            eim.dispose();
        }
        else { //boot dead player
            // If only 2 players are left, uncompletable:
            var party = eim.getPlayers();
            if (party.size() < minPlayers) {
                for (var i = 0; i < party.size(); i++) {
                    playerExit(eim,party.get(i));
                }
                eim.dispose();
            }
            else
                playerExit(eim, player);
        }
    }
}

function playerDisconnected(eim, player) {
    if (eim.isLeader(player)) { //check for party leader
        //boot whole party and end
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++) {
            if (party.get(i).equals(player)) {
                removePlayer(eim, player);
            }
            else {
                playerExit(eim, party.get(i));
            }
        }
        eim.dispose();
    }
    else { //boot d/ced player
        // If only 2 players are left, uncompletable:
        var party = eim.getPlayers();
        if (party.size() < minPlayers) {
            for (var i = 0; i < party.size(); i++) {
                playerExit(eim,party.get(i));
            }
            eim.dispose();
        }
        else
            playerExit(eim, player);
    }
}

function leftParty(eim, player) {			
    // If only 2 players are left, uncompletable:
    var party = eim.getPlayers();
    if (party.size() < minPlayers) {
        for (var i = 0; i < party.size(); i++) {
            playerExit(eim,party.get(i));
        }
        eim.dispose();
    }
    else
        playerExit(eim, player);
}

function disbandParty(eim) {
    //boot whole party and end
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));
}

//for offline players
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}

function clearPQ(eim) {
    //HPQ does nothing special with winners
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function allMonstersDead(eim) {
//do nothing; HPQ has nothing to do with monster killing
}

function cancelSchedule() {
}

function timeOut() {
    var iter = em.getInstances().iterator();
    while (iter.hasNext()) {
        var eim = iter.next();
        if (eim.getPlayerCount() > 0) {
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext()) {
                playerExit(eim, pIter.next());
            }
        }
        eim.dispose();
    }
}
