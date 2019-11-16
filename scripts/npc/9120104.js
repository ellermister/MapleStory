/*
                《该文件是XioxMS服务端的核心文件之一》
  目前版权 (C) 2010年   XioxMS             <735173071@qq.com>
 * -----------------------------------------------------------*
  之前人员 (C) 2008年   Huy              <patrick.huy@frz.cc>
                       Matthias Butz       <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>
 * ------------------------------------------------------------*
 @该服务端目前维护人员:xioxms
 @这个文件是自由形式.你可以任意内容
 @这个程序发布的目的是期望它能有用@
 @如果你需要技术支持,可以联系更新/维护人员<QQ735173071>
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
	text += "#b如果你击退了怪物，可以在我这里升级装备哦！\r\n◤目前已经杀死怪物：#r"+ cm.getChar().getsg() +"#b 头◥\r\n◣目前已经完成副本：#r"+cm.getboss()+"#b 次◢\r\n\r\n#k"
        text += "★★★★★★★★★初级枫叶装备进阶★★★★★★★★★\r\n"; 
        text += "  鼠标移动在道具名字上可以查看属性哦!\r\n                   #b↓↓全职装备升级↓↓\r\n"; 
        text += "#n#r#L1#  #z1002419# LV1#b升级成#r#z1002509#LV8#b(需要消耗1500个击杀点)#l\r\n"; //枫叶帽 枫叶头盔LV8
        text += "#n#r#L13##z1002508# LV8#b升级成#r#z1002510#LV30#b(需要消耗5000个击杀点)#l\r\n"; //1002508   枫叶头盔 LV8  1002510   枫叶头盔       LV30
        text += "#n#r#L14##z1002510#LV30#b升级成#r#z1002511#LV70#b(需要消耗12000个击杀点#l\r\n"; //枫叶头盔       LV30 1002511   枫叶头盔 LV70
        text += "#r#L15##b※※※#r#z1002511#LV70#b升级成为#r#z1002758#LV90#b※※※\r\n              ↑↑(需要消耗1200个击杀点)↑↑#l\r\n"; //枫叶帽 枫叶头盔
        text += "\r\n                   ↓↓战士装备升级↓↓\r\n"; 
	text += "#r#L2##z1302030#LV43#b升级成#r#z1302064#LV64#b(需要消耗5000个击杀点#l\r\n";  //枫叶剑 枫叶突击剑
	text += "#r#L3##z1412011#LV43#b升级成#r#z1312032#LV64#b(需要消耗5000个击杀点#l\r\n"; //1412011   枫叶斧 1312032   枫叶破击斧
	text += "#r#L4##z1422014#LV43#b升级成#r#z1322054#LV64#b(需要消耗5000个击杀点#l\r\n"; //1422014   枫叶锤 1322054   枫叶地震锤
        text += "#r#L5##z1432012#LV43#b升级成#r#z1432040#LV64#b(需要消耗5000个击杀点#l\r\n"; //1432012   枫叶枪 1432040   枫叶钻天枪 
        text += "#r#L6##z1442024#LV43#b升级成#r#z1442030#LV 70#b(需要消耗5000个击杀点#l\r\n"; //1442024   枫叶矛1442030   枫之雪板 
        text += "\r\n                   ↓↓飞侠装备升级↓↓\r\n"; 
	text += "#r#L7##z1332025#LV43#b升级成#r#z1332055#LV64#b(需要消耗5000个击杀点#l\r\n"; //1332025   枫叶刃 1332055   枫叶锁魄铗
	text += "#r#L8##z1472032#LV43#b升级成#r#z1472055#LV63#b(需要消耗5000个击杀点#l\r\n"; //1472032   枫叶拳 1472055   枫叶定天拳
        text += "\r\n                   ↓↓法师装备升级↓↓\r\n";  
	text += "#r#L9##z1382012#LV43#b升级成#r#z1372034#LV64#b(需要消耗5000个击杀点#l\r\n"; //1382012   枫叶杖1372034
        text += "\r\n                   ↓↓弓手装备升级↓↓\r\n";  
	text += "#r#L10##z1452022#L43#b升级成#r#z1452045#LV64#b(需要消耗5000个击杀点#l\r\n"; //1452022   枫叶弓 1452045   枫叶HAPPY弓
	text += "#r#L11##z1462019#LV43#b升级成#r#z1462040#LV64#b(需要消耗5000个击杀点#l\r\n"; //1462019   枫叶弩 1462040   枫叶击星弩 
        text += "\r\n                   ↓↓海盗装备升级↓↓\r\n";  
        text += "#r#L12##z1482020#L43#b升级成#r#z1482022#LV64#b(需要消耗5000个击杀点#l\r\n"; //1482020   枫叶指节1482022   枫叶金爪 
   cm.sendSimple(text);
    } else if (status == 1) {
           if (selection == 0) {      
	   cm.warp(910000000); 
           cm.dispose(); 
    }else if  (selection == 1) {    //枫叶帽 进阶头盔                
	   if ((cm.getChar().getsg() >= 500)&&(cm.haveItem(1002419, 1))){ 
                   cm.getPlayer().gainsg(-500); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了500个击退点！");
                   cm.gainItem(1002419,-1); //头盔
                   cm.gainItem(1002509,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }
    }else if  (selection == 2) {  //枫叶剑
	   if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1302030, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1302030,-1); //头盔
                   cm.gainItem(1302064,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }
    }else if  (selection == 3) {      //1412011   枫叶斧 1312032   枫叶破击斧
          if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1412011, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1412011,-1); //头盔
                   cm.gainItem(1312032,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }
    }else if  (selection == 4) { //1422014   枫叶锤 1322054   枫叶地震锤
           if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1422014, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1422014,-1); //头盔
                   cm.gainItem(1322054,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }
    }else if  (selection == 5) {//1432012   枫叶枪 1432040   枫叶钻天枪 
                     if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1432012, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1432012,-1); //头盔
                   cm.gainItem(1432040,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }
    }else if  (selection == 6) {//1442024   枫叶矛1442030   枫之雪板 
	  if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1442024, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1442024,-1); //头盔
                   cm.gainItem(1442030,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }
    }else if  (selection == 7) {     //1332025   枫叶刃 1332055   枫叶锁魄铗
           if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1332025, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1332025,-1); //头盔
                   cm.gainItem(1332055,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }
    }else if  (selection == 8) {     //1472032   枫叶quan 1472055   枫叶锁quan
           if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1472032, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1472032,-1); //头盔
                   cm.gainItem(1472055,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }    
    }else if  (selection == 10) {   //1452022   枫叶弓 1452045   枫叶HAPPY弓
	   if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1452022, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1452022,-1); //头盔
                   cm.gainItem(1452045,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }    
      }else if  (selection == 9) { //1382012   枫叶杖1372034
	  if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1382012, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1382012,-1); //头盔
                   cm.gainItem(1372034,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }    
       }else if  (selection == 11) {   //1462019   枫叶弩 1462040   枫叶击星弩 
	  if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1462019, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1462019,-1); //头盔
                   cm.gainItem(1462040,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }    
               }else if  (selection == 12) {  //1482020   枫叶指节1482022   枫叶金爪 
	  if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1482020, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1482020,-1); //头盔
                   cm.gainItem(1482022,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }    
           }else if  (selection == 13) {   //1002508   枫叶头盔 LV8  1002510   枫叶头盔       LV30
	  if ((cm.getChar().getsg() >= 1500)&&(cm.haveItem(1002509, 1))){ 
                   cm.getPlayer().gainsg(-1500); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了1500个击退点！");
                   cm.gainItem(1002509,-1); //头盔
                   cm.gainItem(1002510,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }    
           }else if  (selection == 14) {   //1002510   枫叶头盔 LV30 1002511   枫叶头盔       LV70
	  if ((cm.getChar().getsg() >= 5000)&&(cm.haveItem(1002510, 1))){ 
                   cm.getPlayer().gainsg(-5000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了5000个击退点！");
                   cm.gainItem(1002510,-1); //头盔
                   cm.gainItem(1002511,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }    
           }else if  (selection == 15) {   //枫叶头盔       LV30 1002511   枫叶头盔 LV70
	  if ((cm.getChar().getsg() >= 12000)&&(cm.haveItem(1002511, 1))){ 
                   cm.getPlayer().gainsg(-12000); 
		   cm.sendOk("恭喜你的装备进化完成了！消耗了12000个击退点！");
                   cm.gainItem(1002511,-1); //头盔
                   cm.gainItem(1002758,1); //头盔
                   cm.serverNotice("玩家: " + cm.c.getPlayer().getName() + " 成功进阶了装备等级！");
                   cm.mapMessage("[道具]升级成功！");	
		   cm.dispose();
	   }else{
		   cm.sendOk("需要击退点或者无需要升级的装备，请认真核实！");
		   cm.dispose();
	   }    
    }        
}
}
}


