/*
        《该文件是Ver.079 奶茶端封测第一版服务端的核心文件之一》
  目前版权 (C) 2010年   Vr001 封测版             <492214831@qq.com>
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
                
   cm.sendOk("感谢使用.");
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
	text += " #r《该文件是Ver.079 奶茶端第一版服务端的核心文件之一》#k\r\n"
	text += "目前版权 (C) 2015年  #b小灰灰<492214831@qq.com>#k\r\n"; 
	text += "***************************************************\r\n";
	text += "之前人员 (C) 2015年   #b小灰灰<492214831@qq.com>#k\r\n";
	//text += "                #bMatthias Butz<matze@odinms.de>#k\r\n";
	//text += "         #bJan Christian Meyer <vimes@odinms.de>#k\r\n";
	text += "***************************************************\r\n";
	text += " @该服务端目前维护人员:#b小灰灰#k\r\n";
	text += " @这个文件是自由形式.你可以任意内容\r\n";
	text += " @这个程序发布的目的是期望它能有所用\r\n";
	text += " @如果你需要技术支持,可以联系更新/维护人员#dQQ492214831#k\r\n";
	text += " @你应该已经收到一份#bAffero GNU通用公共授权#k\r\n";
	text += " @如果不是,请仔细查看#b网站：http://ormxd.xicp.net/#k"
	text += " \r\n#L1#查看设置"
   cm.sendSimple(text);
    } else if (status == 1) {
           if (selection == 0) {      
	   cm.warp(910000000); 
           cm.dispose(); 
    }else if  (selection == 1) {                    
	   cm.sendOk("#e游戏设置:#n\r\n#e本服#b不卖会员/BT装备/BT属性/BT物品/#n#k！\r\n本服为经典耐玩性!经验为4倍!双倍卡/精灵吊坠都可以获得经验的加成效果!#b4 * 2 * 2 = 16#k 倍!\r\n本服只为那些喜欢耐玩,追求平衡,喜欢不Bt的玩家绕道,如果你喜欢Bt服.请你去别的服吧!\r\n不管是内部测试,还是对外开放测试.档案绝对会保留.无特殊要求绝不删档.\r\n本服修复任务系统.做任务获得经验.远程职业的攻击系统.以及很多地方都修复了!\r\n#r升级送点活动进行中!#k\r\n点卷开放购买.你可以在游戏自由市场小姐处#k查看购买详情!\r\n如果你还有疑问,可以输入#d@帮助#k查看!!\r\n");
           cm.dispose();
    }else if  (selection == 2) {
	   cm.openNpc(9310057);
    }else if  (selection == 3) {      
           cm.openNpc(9310059);		           
    }else if  (selection == 4) {
	   cm.openShop(223); 
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


