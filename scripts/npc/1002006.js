/*
                《该文件是XioxMS服务端的核心文件之一》
  目前版权 (C) 2010年   XioxMS             <100807851@qq.com>
 * -----------------------------------------------------------*
  之前人员 (C) 2008年   Huy              <patrick.huy@frz.cc>
                       Matthias Butz       <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>
 * ------------------------------------------------------------*
 @该服务端目前维护人员:xioxms
 @这个文件是自由形式.你可以任意内容
 @这个程序发布的目的是期望它能有用@
 @如果你需要技术支持,可以联系更新/维护人员<QQ100807851>
 @你应该已经收到一份Affero GNU通用公共授权
 -如果不是,请仔细查看http://www.gnu.org/licenses/*
*/
/*@
1602000   战士第一转技能效果14天
1602001   魔法师第一转技能效果14天
1602002   弓箭手第一转技能效果14天
1602003   飞侠第一转技能效果14天
*/
var texiao="#v1602000##v1602001##v1602002##v1602003#";
var mz = "#b奶茶冒险岛#k";//游戏名字
var itemname1= "初入游戏新手";
var yikexing ="★☆☆☆☆";
var erxing ="★★☆☆☆";
var sanxing="★★★☆☆";
var sixing="★★★★☆";
var wuxing="★★★★★";
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
	text += "欢迎来到"+mz+"\r\n领取新手礼包需要击退怪物 #r10#k 只.击退怪物 #r"+ cm.getChar().getsg() +"#k 只"
	text += "\r\n#L2##b游戏介绍#k"; 
	text += "\r\n#L1##b领取新手礼包【★☆☆☆☆新手星级戒指】#k";
        cm.sendSimple(text);
    } else if (status == 1) {
           if (selection == 0) {      
	   cm.warp(910000000); 
           cm.dispose(); 
    }else if  (selection == 1) {                    
	  	   if ((cm.getChar().getsg() >= 0)&&(cm.getChar().getsg2() == 0)){ 
                   cm.getChar().setsg2(1);
                   cm.getPlayer().gainsg(-1); 
                   //1002419 1122019 5030001 5071000
		   cm.sendOk("恭喜你领取了#b新手礼包！#k物品清单如下：\r\n#v1002419##v1112423##v1122019##v1142000##v5071000##v1052023#");
                   cm.gainItem(1052023,1); //黑秀臀装
                   cm.gainItem(1002419,1); //枫叶帽
                   cm.gainItem(1122019,1); //冒险之xin
                   cm.gainItem(5150000,1); 
		   cm.gainMeso(100000);
                   cm.gainItem(1142000,1); //冒险勋章之星
                   cm.gainItem(5071000,1); //喇叭
                     var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();	
            var type = ii.getInventoryType(1112423); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(111242)).copy(); // 生成一个Equip类
            toDrop.setOwner(yikexing);
toDrop.setLocked(1);
toDrop.setStr(3);
toDrop.setDex(3);
toDrop.setInt(3);
toDrop.setLuk(3);
toDrop.setMatk(3);	
toDrop.setWatk(3);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	
cm.getChar().saveToDB(true);
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 通过了最基本的打猎测试，进入了踏上了冒险旅途！");
                   cm.mapMessage("[道具][冒险之心]发出了神秘的光芒，可能薇薇安可以帮助你.");	
		   cm.dispose();
	   }else{
		   cm.sendOk("领取这个新手礼包需要击杀怪物 #r10#k 只.\r\n#b你没有通过初级测试,或者已经领取过一次了！");
		   cm.dispose();
	   }
    }else if  (selection == 3) { //战士
               cm.openNpc(10202); 
    }else if  (selection == 2) {      
           cm.sendOk("#e#b欢迎来到"+mz+" "+mz+"有你更精彩！#n#k\r\n本服介绍<\r\n#b游戏转职请去找Npc酷男孩\r\n各大城市内npc可以进入副本挑战\r\n杀怪奖励npc请去各大城市查看\r\n获得点卷请去查看星源Npc\r\n#k1.本服为经典仿官方模式运营.许多设置按照官方为标准来修改.\r\n2.玩家可以享受其中的一些乐趣.拒绝变态和一切不平衡元素.\r\n本服为修复程度完善的服.长久稳定,#d不卖会员,属性装备,变态道具#k.欢迎不喜欢变态的玩家入驻.\r\n3.我们每天都在更新游戏的数据,让玩家玩着#b不蛋疼,玩着舒心#k.\r\n                     #n                  冒险岛");
		cm.dispose();	
    }else if  (selection == 4) { //法师
          cm.openNpc(10201); 
    }else if  (selection == 5) {//飞侠
           cm.openNpc(10203); 
    }else if  (selection == 6) {//弓箭手
	cm.openNpc(10200); 
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


