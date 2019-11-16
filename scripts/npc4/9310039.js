/*
 *
 *  此脚本由冒险岛制作完成
 * 
 *
 */

importPackage(net.sf.odinms.server.maps); 
importPackage(net.sf.odinms.net.channel); 
importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.server.life);
importPackage(java.awt);

var status = 0;

function start() 
	{
	status = -1;
	action(1, 0, 0);
	}

function action(mode, type, selection)
{
	var nextmap = cm.getC().getChannelServer().getMapFactory().getMap(702060000);
	if (mode == -1)
	{
		cm.dispose();
	}
	else if (mode == 0)
	{
		cm.sendOk("好的如果要挑战#b妖僧#k随时来找我.");
		cm.dispose();
	} 
	else 
	{
	if (mode == 1)
	status++;
	else
	status--;
		
	if (status == 0)
	{	/*if (cm.getC().getChannel() != 2){
			cm.sendOk("   少林妖僧的挑战只能在#r2#k频道进行!");
			cm.dispose();
			}else{*/
			if (cm.getPlayerCount(702060000) > 0){
	            cm.sendOk("已经有人挑战妖僧你无法进入！");
                    cm.dispose();
			}else{
				cm.sendYesNo("你是否要挑战#b妖僧#k呢?");
			}
		//}
	}
	else if (status == 1) 
	{ 	
		var party = cm.getPlayer().getParty();		
		if (party == null || party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendOk("你不是队长。请你们队长来说话吧！");
                    cm.dispose();
                }else if(cm.getBossLog("shaoling") > 1) {
	            cm.sendOk("您好,系统限定每天只能挑战1次!");
                    cm.dispose();
		}else if(party.getMembers().size() < 1) {
	            cm.sendOk("需要 1 人以上的组队才能进入！!");
                    cm.dispose();
		}else{
if(cm.getMonsterCount(702060000) <= 0){
		cm.spawnMobOnMap(9600025,1,351,580,702060000);
	
}			cm.givePartyBossLog("shaoling");
			nextmap.resetReactors();			
			cm.warpParty(702060000);
			cm.dispose();
		}
	}
}
}