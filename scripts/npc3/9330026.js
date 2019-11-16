/*
*		第二关
*		XIOXMS
*/
importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.server.life);
importPackage(java.awt);
var playerStatus;
function start() {
status = -1;

action(1, 0, 0);
}
function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 0 && mode == 0) {
                
   cm.sendOk("怎么办。。");
   cm.dispose();
   return;                    
                }
                if (mode == 1) {
   status++;
  }
  else {
   status--;
  }
          if (status == 0) {
	var tex2 = "";	
	var text = "";
	for(i = 0; i < 10; i++){
		text += "";
	}				
	text += "#b下一关就是这个副本的最强BOSS了！HP和MP都非常BT。。你应该好好思考一下是不是要让你们的组员和你一起去送死！"
	text += "\r\n#L1##r召唤怪物";
        text += "\r\n#L2##b进入下一关#k"; 
        cm.sendSimple(text);
    } else if (status == 1) {
           if (selection == 0) {      
	   cm.warp(910000000); 
           cm.dispose(); 
    }else if  (selection == 1) {     
		var party = cm.getPlayer().getParty();	
		if (party == null || party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendOk("需要小组组长权限！");
                    cm.dispose();
		//cm.getChar().setsg2(2);
		//cm.gainItem(4001117,-1);
		//cm.givePartyExp(40000);
		//cm.gainExp(30000);
	  	//cm.summonMob(9300184, 1000, 500, 1);//大臣10W血
                cm.dispose();
                }else if (cm.getChar().getsg2() == 21){ 
                             cm.sendOk("已经召唤了！如果打完了，请选择进入下一关。");
                             cm.dispose();
        }else {
        cm.getChar().setsg2(21); //第5关
       cm.summonMob(9300287, 10000000, 70000, 1); //树妖王
        cm.dispose();
}

    }else if  (selection == 2) {
if (cm.getChar().getsg2() <= 20){ 
                             cm.sendOk("并非是你召唤的怪物！");
                             cm.dispose();     
     }else  var map =cm.getChar().getMap();
    if(map.countMobOnMap() >= 1){
cm.sendOk("请消灭当前怪物才能进入下一关");
cm.dispose();
    }else{
     cm.warpParty(970032200);//进入下一个地图
     cm.givePartyExp(6000);
     cm.showEffect("quest/party/clear");
     cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[怪物总动员]" + " : " + " [" + cm.getPlayer().getName() + "]的小组完成了第21阶段挑战，进入了下一关卡！",true).getBytes()); 
     cm.dispose();
}
    }else if  (selection == 3) {      
           cm.sendOk("");
		cm.dispose();	
    }else if  (selection == 4) {
          cm.sendOk("");
		cm.dispose();
    }else if  (selection == 5) {
           cm.openNpc(9030100); 
    }else if  (selection == 6) {
	  cm.sendOk("");
		cm.dispose();
    }else if  (selection == 7) {     
           cm.openNpc(1012103);  	     
    }else if  (selection == 8) {
           cm.openNpc(1052004);                  
    }else if  (selection == 9) {  
	   var statup = new java.util.ArrayList();
	   var p = cm.c.getPlayer();
	   if(p.getExp() < 0){
		   p.setExp(0) 
		   statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.EXP, java.lang.Integer.valueOf(0))); 
		   p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
		   cm.sendOk("经验值已修复完成");
		   cm.dispose();
	   }else{
		   cm.sendOk("您的经验值正常,无需修复!");
		   cm.dispose();
	   }
    }      
}}}
