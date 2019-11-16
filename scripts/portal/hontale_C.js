/* Portal for the LightBulb Map...

**hontale_c.js
@author Jvlaple
*/
importPackage(net.sf.odinms.server.maps);
importPackage(net.sf.odinms.net.channel);
importPackage(net.sf.odinms.tools);

function enter(pi) {

if (pi.isLeader() == true) {
	var eim = pi.getPlayer().getEventInstance();
	var party = eim.getPlayers();
	var target;
	var theWay = eim.getProperty("theWay");
	var target;
	if (theWay != null) {
		if (theWay = "light") {
			target = eim.getMapInstance(240050300); //light
		} else {
			target = eim.getMapInstance(240050310); //dark
		}
	} else {
		pi.playerMessage("Hit the Lightbulb to determine your fate!");
		return false;
	}
	var targetPortal = target.getPortal("sp");
	//Warp the full party into the map...
	var partyy = pi.getPlayer().getEventInstance().getPlayers();
	for (var i = 0; i < partyy.size(); i++) {
			party.get(i).changeMap(target, targetPortal);
	}
	return true;
	} else {
	pi.playerMessage(6, "你不是队长,只有队长才可以决定进入时间.");
	return false;
	}
}
