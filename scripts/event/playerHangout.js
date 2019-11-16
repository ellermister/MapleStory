/**
-- StoryBox JavaScript --------------------------------------------------------------------------------
    Hangout instances
-- By ---------------------------------------------------------------------------------------------
    Lios of Storybox
    Ragezone Account: og.Lios
-- Version Info -----------------------------------------------------------------------------------
    1.0 - Lios. First version.
---------------------------------------------------------------------------------------------------
**/

var eim;
var exitMap;
var instanceName;
var prh;
var exitMapNum = 910000000;  //Edit this to whichever map you please.  Default is Free Market
var HangoutMap;
var HangoutMapId;

function init() {
	instanceName = "Hangout_";
	em.getIv().invokeFunction("setup", null);
}

function setup() {
    exitMap = em.getChannelServer().getMapFactory().getMap(exitMapNum); // exits to exitMapNum
    var eim = em.newInstance(instanceName);        //These two lines are basically Worthless, as the default instance is never used. 
    return eim;									//However, we need to call an instance whenever initiating an event.
}
function cancelSchedule() {
}

function playerEntry(eim, player) {
	var mostRecentRoom = "Hangout_" + em.getProperty("mRR");
	
	if (em.getInstance(mostRecentRoom) == null){
		em.newInstance(mostRecentRoom); //Only occurs when player makes a n
    }
    prh = em.getInstance(mostRecentRoom);
    map = prh.getMapInstance(em.getProperty("mRRId"));
    player.changeMap(map, map.getPortal(0));
}

function playerDisconnected(eim, player) {
	playerExit(eim, player);
	if (eim.getPlayers().size() == 0)
		eim.dispose();
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, exitMap.getPortal(0));
	if (eim.getPlayers().size() == 0)
		eim.dispose();
}

function dispose() {

}

//For those dced
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
	if (eim.getPlayers().size() == 0)
		eim.dispose();
}  