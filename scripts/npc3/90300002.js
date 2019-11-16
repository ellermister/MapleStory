/*
                《该文件是Vr001 封测版服务端的核心文件之一》
  目前版权 (C) 2010年   Vr001 封测版             <159502199@qq.com>
 * -----------------------------------------------------------*
  之前人员 (C) 2008年   Huy              <patrick.huy@frz.cc>
                       Matthias Butz       <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>
 * ------------------------------------------------------------*
 @该服务端目前维护人员:Vr001 封测版
 @这个文件是自由形式.你可以任意内容
 @这个程序发布的目的是期望它能有用@
 @如果你需要技术支持,可以联系更新/维护人员<QQ100807851>
 @你应该已经收到一份Affero GNU通用公共授权
 -如果不是,请仔细查看http://www.gnu.org/licenses/*
*/

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
                
   cm.sendOk("感谢你的光临！");
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
	text += "#b尊敬的玩家你好！我是快捷使用NPC！\r\n我可以兑换，查询各种服务！\r\n#k"
	text += "#e#d#L1#使用#r1000个枫叶换取1000点卷【热~】#l#b\r\n"; 
	text += "#d#L3#使用#r1个印第安老斑鸠徽章#k#d抽取物品#r【椅子】【装备】#l\r\n";
	text += "#d#L2#使用#r挑战PQ次数#b兑换#r各种PQ专属物品【热~】#l\r\n";
        text += "#d#L4#使用#r300个永恒的雪花#b抽取#r永恒装备【热~】#l";
   cm.sendSimple(text);
    } else if (status == 1) {
           if (selection == 0) {      
	   cm.warp(910000000); 
           cm.dispose(); 
    }else if  (selection == 1) {     //换取点卷                  
	 cm.openNpc(9310060);
          cm.dispose();
    }else if  (selection == 2) {     //PQ兑换
	   cm.openNpc(9310100);
    }else if  (selection == 3) {      //活动兑换
           cm.openNpc(2111005);		           
    }else if  (selection == 4) {    //永恒装备兑换
	   cm.openNpc(2084000); 
	   cm.dispose();
    }else if  (selection == 5) {
           cm.openNpc(9030100); 
    }else if  (selection == 6) {
	   cm.openNpc(1012105); 
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
}
}
}


