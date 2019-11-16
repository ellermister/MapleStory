importPackage(net.sf.odinms.world);
var exitMap;
var minPlayers = 1;
var instanceId;
function init() {
    instanceId = 1;
}
function setup() {
    exitMap = em.getChannelServer().getMapFactory().getMap(910000000); // <exit>
    var instanceName = "Story" + instanceId;
    var eim = em.newInstance(instanceName);
    instanceId++;
    em.setProperty("newInstance",instanceName);
    var eventTime = 60 * (1000 * 60);
    em.schedule("timeOut", eventTime);
    eim.startEventTimer(eventTime);
    return eim;
}
function playerEntry(eim, player) {
    var map = eim.getMapInstance(926100400);
    player.changeMap(map, map.getPortal(0));
}
function playerDisconnected(eim, player) {
    if (eim.isLeader(player)) { // Check for party leader
        // Boot whole party and end
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++) {
            if (party.get(i).equals(player)) {
                removePlayer(eim, player);
            } else {
                playerExit(eim, party.get(i));
            }
        }
        eim.dispose();
    } else { // Boot disconnected player
        var party = eim.getPlayers();
        if (party.size() < minPlayers) {
            for (var i = 0; i < party.size(); i++) {
                playerExit(eim,party.get(i));
            }
            eim.dispose();
        } else
            playerExit(eim, player);
    }
}
function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));
}
// For offline players
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
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
