/*	
	Author: Traitor
	Map(s):	All Dojo maps
	Desc:  SPAWN MOBS AND ALL THAT SNAZZ YO.
*/

importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.scripting.npc);

function start(ms) {
    if (ms.getPlayer().getCygnusLinkId() <= 0 && !ms.getPlayer().getJob().isA(MapleJob.KNIGHT) && ms.getPlayer().getLevel() >= 20) {
        NPCScriptManager.getInstance().start(ms.getClient(), 1101001, null, null);
    }
}