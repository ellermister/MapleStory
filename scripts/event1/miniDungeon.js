/**
-- JavaScript --------------------------------------------------------------------------------
    Mini-Dungeon Instances
-- By ---------------------------------------------------------------------------------------------
    Lios of Storybox
    Ragezone Account: og.Lios
-- Version Info -----------------------------------------------------------------------------------
    1.1 - Darkwar4ever - Modified for use in Mini-dungeons
    1.0 - Lios. First version.
---------------------------------------------------------------------------------------------------
**/

var eim;
var exitMap;
var instanceName;
var prh;
var exitMapNum = 910000000;  //Edit this to whichever map you please.  Default is Free Market.
var beginner = 104040000; //beginner hhg1
var middle = 104040001; //middle
var expert = 104040002; //high
var dungeonMap = 104040000;
function init(){
instanceName = "MiniDungeon_";
em.getIv().invokeFunction("setup",null);
}

function setup(){
    exitMap = em.getChannelServer().getMapFactory().getMap(exitMapNum);
    var eim = em.newInstance(instanceName);
    return eim;
}

function playerEntry(eim, player){
var mostRecentRoom = "MiniDungeon_" + em.getProperty("mRR");
if(em.getInstance(mostRecentRoom) == null){
    em.newInstance(mostRecentRoom);
    }
    prh = em.getInstance(mostRecentRoom);
    if (player.getReborns() > 1) {
        dungeonMap = expert;
    } else {
        if (player.getLevel() <= 120) {
            dungeonMap = beginner;
        } else if (player.getLevel() <= 150) {
            dungeonMap = middle;
        } else if (player.getLevel() <= 255) {
            dungeonMap = expert;
        }
    }
    map = prh.getMapInstance(dungeonMap);
    player.changeMap(map, map.getPortal(0));
    player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(1, "To prevent botting, you will be warped out in 60 minutes."));
        player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(6, "To prevent botting, you will be warped out in 60 minutes."));
        player.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock(3600));
    eim.schedule("bottingPrevention", 3600000);
}


function bottingPrevention(eim) {
var mostRecentRoom = "MiniDungeon_" + em.getProperty("mRR");
prh = em.getInstance(mostRecentRoom);
var iter = eim.getPlayers().iterator();
returnMap = prh.getMapInstance(exitMapNum);
    while (iter.hasNext()) {
        var player = iter.next();
        player.changeMap(returnMap, returnMap.getPortal(0));
        eim.unregisterPlayer(player);
    }
    eim.dispose();
}

function playerDisconnected(eim, player) {
            playerExit(eim, player);
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));
}
//For those dced
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}
