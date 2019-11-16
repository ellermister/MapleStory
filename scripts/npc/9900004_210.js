/*
    会员购买NPC
    乐 章编写
    QQ:237253995
*/


var name = "萌新冒险岛";//这里填上F的名字

var web = "官方网站";//这里填上网页

//直接购买需要的充值币

var v1 = 100;//买VIP1需要的充值币
var v2 = 200;//买VIP2需要的充值币
var v3 = 300;//买VIP3需要的充值币
var v4 = 400;//买VIP4需要的充值币
var v5 = 500;//买VIP5需要的充值币

//升级需要

var v3v4 = 51;//2-3
var v4v5 = 51;//2-4
var v5v6 = 51;//3-4


//点卷|10E邮票|修炼点|勋章属性|精灵吊坠10天,属性|属性点|GM卷|黄金猪猪|骑宠抽奖卷
var libao1 = Array(3000,0,0,200,20,100,10,10,0);	
var libao2 = Array(6000,0,0,20,50,200,0,0,0);
var libao3 = Array(9000,0,0,50,100,300,0,0,0);
var libao4 = Array(12000,0,0,100,150,400,0,0,0);
var libao5 = Array(15000,0,0,480,500,1000,0,0,0);
var libao6 = Array(180000,0,0,250,300,600,0,0,0);

//==============以上是参数部分======================


var ttt ="#fUI/Basic/CheckBox/3#";//"+ttt+"//美化
importPackage(net.sf.cherry.client);
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
                 
            cm.sendOk("如果你想好了要做什么,我会很乐意的为你服务的..O(∩_∩)O~"); 
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
				if(cm.getPlayer().getvip() <= 0){
					var vipstr = "普通玩家";					
				}else if(cm.getPlayer().getvip() == 1){
					var vipstr = " 萌新vIp";					
				}else if(cm.getPlayer().getvip() == 2){
					var vipstr = " 萌新vIp②";					
				}else if(cm.getPlayer().getvip() == 3){
					var vipstr = " 萌新vIp③";
                                }else if(cm.getPlayer().getvip() == 4){
					var vipstr = " 萌新vIp④";	
}else if(cm.getPlayer().getvip() == 5){
					var vipstr = " 萌新vIp⑤";						
}else if(cm.getPlayer().getvip() == 6){
var vipstr = "●萌新vIp⑤の战斗之神";
}else if(cm.getPlayer().getvip() == 7){
var vipstr = "☆黄金☆金战斗之神";
}else if(cm.getPlayer().getvip() == 8){
var vipstr = "☆★☆终极斗神☆★☆";
}else{
var vipstr = "无法识别你的身份";			
}
var textz = "这里是#r"+name+"#k的会员办理.(#r本服只有一个会员#k)\r\n\r\n#b     #k会员等级:#r"+vipstr+".\r\n#b     #k暂有充值币:#r"+cm.getmoneyb()+".\r\n#b     #k#b请保持装备栏有至少2个空格,其他物品栏等尽量多的空格.否则赠送东西无法装下，将不接受任何处理!\r\n#b";

textz += "#L2#"+ttt+" 成为#r 萌新vIp #k#b[#r"+v1+"#n#b充值币]#l\r\n";
//textz += "#L3#"+ttt+" 成为#r 萌新vIp #k#b[#r50#n#b充值币 #r50000#n#b点卷]#l\r\n";

//textz += "#L3#"+ttt+" 成为#r 萌新vIp② #k#b[#r"+v2+"#n#b充值币]#l\r\n";

//textz += "#L4#"+ttt+" 购买#r 萌新vIp③ #k#b[#r"+v3+"#n#b充值币]#l\r\n";

//textz += "#L5#"+ttt+" 购买#r 萌新vIp④ #k#b[#r"+v4+"#n#b充值币]#l\r\n";

//textz += "#L6#"+ttt+" 购买#r 萌新vIp⑤ #k#b[#r"+v5+"#n#b充值币]#l\r\n";

//textz += "#L7#"+ttt+" [不开放，出错不赔偿]购买#r 萌新vIp⑤の战斗之神 #k#b[#r"+v5+"#n#b充值币]#l\r\n\r\n";




//textz += "#L70#"+ttt+"#r 萌新vIp③#k升级到#r萌新vIp④#b[#r"+v3v4+"#n#b充值币]#l\r\n";

//textz += "#L8#"+ttt+"#r 萌新vIp④#k升级到#r萌新vIp⑤#b[#r"+v4v5+"#n#b充值币]#l\r\n";

//textz += "#L9#"+ttt+"#r [不开放，出错不赔偿]萌新vIp⑤#k升级到#r萌新vIp⑤の战斗之神#b[#r"+v5v6+"#n#b充值币]#l\r\n";


textz += "#L72#"+ttt+" >>>>>>>>>>>>>>>>>>>>>>>查看VIP简介#l";

//textz += "\r\n\r\n#n直接开通会员，可以获得积分币反馈.\r\n\r\n充值币:#r"+cm.getmoneyb()+"元  #k慈善币:#r"+cm.getcsb()+"元  #k存款:"+cm.getMoney()+"个邮票\r\n#k今日进入扎洞:#r" + cm.getBossLog('zakum') + "#r次  #k黑龙洞穴:#r" + cm.getBossLog('hontale') + "#r次  #k会员等级:#r"+cm.getVip()+"星"; 

cm.sendSimple (textz);    



                }else if  (selection == 2) { 
                       if(cm.getPlayer().getvip() >= 1) {
                       cm.sendOk("您已经是vip了！."); 
                       cm.dispose(); 
				} else  if(cm.haveItem(1142186,1,true,false)){
                    cm.sendOk("请扔掉原来的勋章#r虎年勋章#k,才能办理该业务.");
                    cm.dispose();
                } else  if(cm.getmoneyb() < 100){
                    cm.sendOk("你没有足够的充值币,不能办理该业务.");
                    cm.dispose();
                } else if(cm.getPlayer().getLevel() >= 0) { 
         //if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull()){
		if(1>2){
							cm.sendOk("请保证其他栏位有空格接受VIP礼包.");
							cm.dispose();
}else{   
                       cm.setmoneyb(-v1);  
                       cm.getPlayer().gainvip(1);
//---------------------------------------------------
       cm.gainNX(libao1[0]);//点卷
       //cm.gainrw13(libao1[2]); //修炼

var xunzhang = 1142145;//勋章

			cm.gainItem(1902015,1);//战神
			cm.gainItem(1902016,1);//战神
			cm.gainItem(1902017,1);//战神
			cm.gainItem(1902018,1);//战神
			cm.gainItem(1912011,1);//狼鞍子
				cm.gainItem(1142145,40,40,40,40,200,200,10,10,0,0,0,0,20,10);
//var shuxing = libao1[3]; //设置
/*
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(40);
		        toDrop.setDex(40);
		        toDrop.setInt(10);
		        toDrop.setLuk(40);
		        toDrop.setSpeed(20);
		        toDrop.setJump(10);
						toDrop.setMatk(10);//魔法力
						toDrop.setWatk(10);//攻击力
		        //toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
          //  cm.getPlayer().gainAp(libao1[5]);//属性点
            //cm.gainItem(4031065,libao1[6]);//大吉(换GM卷)
           // cm.gainItem(4032226,libao1[7]);//黄金猪猪(抽奖)
			cm.gainItem(1902015,1);//战神
			cm.gainItem(1902016,1);//战神
			cm.gainItem(1902017,1);//战神
			cm.gainItem(1902018,1);//战神
			cm.gainItem(1912011,1);//狼鞍子
			//cm.gainItem(1112586,1);//黑天使的祝福
//---------------------------------------------------
		       cm.getChar().saveToDB(true);
			   
			   */
                       cm.sendOk("欢迎加入#r萌新vip#k!"); 
cm.serverNotice("萌新公告：玩家“"+ cm.getChar().getName() +"”成为了萌新vip!");
cm.serverNotice("萌新公告：玩家“"+ cm.getChar().getName() +"”成为了萌新vip!");
cm.serverNotice("萌新公告：玩家“"+ cm.getChar().getName() +"”成为了萌新vip!");
					//cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(2,cm.getC().getChannel(),"123萌新管理员" + " : 恭喜：" + cm.getPlayer().getName() +" 玩家成为萌新vIp!!!",true).getBytes());
					//cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(2,cm.getC().getChannel(),"321萌新管理员" + " : 恭喜：" + cm.getPlayer().getName() +" 玩家成为萌新vIp!!!",true).getBytes());
					//cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(2,cm.getC().getChannel(),"321萌新管理员" + " : 恭喜：" + cm.getPlayer().getName() +" 玩家成为萌新vIp!!!",true).getBytes());
                       cm.dispose(); 
}
                    } else { 
                       cm.sendOk("你的充值币不足!."); 
                       cm.dispose();   
                   } 
                }else if  (selection == 3) { 
                    if(cm.getPlayer().getvip() >= 1) {
                       cm.sendOk("您已经是vip了！."); 
                       cm.dispose(); 
				} else  if(cm.haveItem(1142186,1,true,false)){
                    cm.sendOk("请扔掉原来的勋章#r虎年勋章#k,才能办理该业务.");
                    cm.dispose();
                } else  if(cm.getmoneyb() < 50){
                    cm.sendOk("你没有足够的充值币,不能办理该业务.");
                    cm.dispose();
				} else  if(cm.getNX() < 50000){
                    cm.sendOk("你没有足够的点卷,不能办理该业务.");
                    cm.dispose();
                } else if(cm.getPlayer().getLevel() >= 0) { 
         if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull()){
							cm.sendOk("请保证其他栏位有空格接受VIP礼包.");
							cm.dispose();
}else{   
                       cm.setmoneyb(-50);  
					   cm.gainNX(-50000);  
                       cm.getPlayer().gainvip(1);
//---------------------------------------------------
       cm.gainNX(libao1[0]);//点卷
       //cm.gainrw13(libao1[2]); //修炼


var xunzhang = 1142145;//勋章
//var shuxing = libao1[3]; //设置
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(40);
		        toDrop.setDex(40);
		        toDrop.setInt(10);
		        toDrop.setLuk(40);
		        toDrop.setSpeed(20);
		        toDrop.setJump(10);
						toDrop.setMatk(10);//魔法力
						toDrop.setWatk(10);//攻击力
		        //toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
          //  cm.getPlayer().gainAp(libao1[5]);//属性点
            //cm.gainItem(4031065,libao1[6]);//大吉(换GM卷)
            //cm.gainItem(4032226,libao1[7]);//黄金猪猪(抽奖)
			cm.gainItem(1902015,1);//战神
			cm.gainItem(1902016,1);//战神
			cm.gainItem(1902017,1);//战神
			cm.gainItem(1902018,1);//战神
			cm.gainItem(1912011,1);//狼鞍子
			//cm.gainItem(1112586,1);//黑天使的祝福
//---------------------------------------------------
		       cm.getChar().saveToDB(true);
                       cm.sendOk("欢迎加入#r萌新vip#k!"); 
cm.serverNotice("萌新公告: 玩家“"+ cm.getChar().getName() +"”成为了萌新vip!");
cm.serverNotice("萌新公告：玩家“"+ cm.getChar().getName() +"”成为了萌新vip!");
cm.dispose(); 
}
                    } else { 
                       cm.sendOk("你的充值币不足!."); 
                       cm.dispose();   
                   } 
                }else if  (selection == 4) { 
                  if(cm.getPlayer().getvip() >= 3) {
                       cm.sendOk("您已经是萌新vIp③,或者以上了，请不要重复购买"); 
cm.dispose();  
               } else  if(cm.haveItem(1142186,1,true,false)){
                    cm.sendOk("请扔掉原来的勋章#r虎年勋章#k,才能办理该业务.");
                    cm.dispose();
                } else  if(cm.haveItem(1122017,1,true,false)){
						cm.sendOk("你已经有一个精灵吊坠了！请扔掉或者过期后再办理该业务.");
						cm.dispose();
                      // } else if(cm.getReborns() >= 30) { 
                       if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull()){
							cm.sendOk("请保证其他栏位有空格接受VIP礼包.");
							cm.dispose();
}else{   
                       cm.setmoneyb(-v3);  
                       cm.getChar().SetVip(3); 
                     //---------------------------------------------------
       cm.gainNX(libao3[0]);//点卷
       cm.gainItem(4002001,libao3[1]);//邮票
       //cm.gainrw13(libao3[2]); //修炼

var xunzhang = 1142186;//勋章
var shuxing = libao3[3]; //设置
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        //toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
//吊坠
var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(1122017); //获得装备的类形
var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // 生成一个Equip类
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30 * 4 *10); //时间
toDrop.setExpiration(temptime); //给装备时间
		        toDrop.setStr(libao3[4]);
		        toDrop.setDex(libao3[4]);
		        toDrop.setInt(libao3[4]);
		        toDrop.setLuk(libao3[4]);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包		
            cm.getPlayer().gainAp(libao3[5]);//属性点
            //cm.gainItem(4031065,libao3[6]);//大吉(换GM卷)
            //cm.gainItem(4032226,libao3[7]);//黄金猪猪(抽奖)
           // cm.gainItem(4031250,libao3[8]);//骑宠抽奖卷
						           // cm.gainItem(1003056,1);//专属VIP帽子
//---------------------------------------------------
		        cm.getChar().saveToDB(true);
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为萌新vIp③!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为萌新vIp③!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为萌新vIp③!!!",true).getBytes());
                       cm.sendOk("成功成为#r萌新vIp③#k!"); 
                       cm.dispose();  } 
                    } else { 
                       cm.sendOk("您的充值币不足!.."); 
                       cm.dispose();   
                    } 
}else if  (selection == 5) { 
                  if(cm.getPlayer().getvip() >= 4) {
                       cm.sendOk("您已经是VIP4,或者以上了，请不要重复购买"); 
cm.dispose();    } else  if(cm.haveItem(1142186,1,true,false)){
                    cm.sendOk("请扔掉原来的勋章#r虎年勋章#k,才能办理该业务.");
                    cm.dispose();
                } else  if(cm.haveItem(1122017,1,true,false)){
						cm.sendOk("你已经有一个精灵吊坠了！请扔掉或者过期后再办理该业务.");
						cm.dispose();
                       } else if(cm.getReborns() >= 50){ 
                      if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull()){
							cm.sendOk("请保证其他栏位有空格接受VIP礼包.");
							cm.dispose();
}else{   
                         cm.setmoneyb(-v4);  
                       cm.getChar().SetVip(4); 
                     //---------------------------------------------------
       cm.gainNX(libao4[0]);//点卷
       cm.gainItem(4002001,libao4[1]);//邮票
      // cm.gainrw13(libao4[2]); //修炼

var xunzhang = 1142186;//勋章
var shuxing = libao4[3]; //设置
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        //toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
//吊坠
var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(1122017); //获得装备的类形
var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // 生成一个Equip类
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30 * 4 *10); //时间
toDrop.setExpiration(temptime); //给装备时间
		        toDrop.setStr(libao4[4]);
		        toDrop.setDex(libao4[4]);
		        toDrop.setInt(libao4[4]);
		        toDrop.setLuk(libao4[4]);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包		
            cm.getPlayer().gainAp(libao4[5]);//属性点
           // cm.gainItem(4031065,libao4[6]);//大吉(换GM卷)
           // cm.gainItem(4032226,libao4[7]);//黄金猪猪(抽奖)
           // cm.gainItem(4031250,libao4[8]);//骑宠抽奖卷
						          //  cm.gainItem(1003057,1);//专属VIP帽子
//---------------------------------------------------
		        cm.getChar().saveToDB(true);

                       cm.sendOk("成功成为#r萌新vIp④#k!"); 
 cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为萌新vIp④!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为萌新vIp④!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为萌新vIp④!!!",true).getBytes());	
                       cm.dispose();  } 
                    } else { 
                       cm.sendOk("您的充值币不足！"); 
                       cm.dispose();   
                    } 


}else if  (selection == 6) { 
                  if(cm.getPlayer().getvip() >= 5) {
                       cm.sendOk("您已经是萌新vIp⑤了，请不要重复购买."); 
cm.dispose();  } else  if(cm.haveItem(1142186,1,true,false)){
                    cm.sendOk("请扔掉原来的勋章#r虎年勋章#k,才能办理该业务.");
                    cm.dispose();
                } else  if(cm.haveItem(1122017,1,true,false)){
						cm.sendOk("你已经有一个精灵吊坠了！请扔掉或者过期后再办理该业务.");
						cm.dispose();
                       } else if(cm.getmoneyb() >= v4) { 
                      if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull()){
							cm.sendOk("请保证其他栏位有空格接受VIP礼包.");
							cm.dispose();
}else{   
                       cm.setmoneyb(-v5);  
                       cm.getChar().SetVip(5); 
                      //---------------------------------------------------
       cm.gainNX(libao5[0]);//点卷
       cm.gainItem(4002001,libao5[1]);//邮票
       //cm.gainrw13(libao4[2]); //修炼

var xunzhang = 1142186;//勋章
var shuxing = libao5[3]; //设置
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        //toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
//吊坠
var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(1122017); //获得装备的类形
var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // 生成一个Equip类
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30 * 4 *10); //时间
toDrop.setExpiration(temptime); //给装备时间
		        toDrop.setStr(libao5[4]);
		        toDrop.setDex(libao5[4]);
		        toDrop.setInt(libao5[4]);
		        toDrop.setLuk(libao5[4]);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包		
            cm.getPlayer().gainAp(libao5[5]);//属性点
          //  cm.gainItem(4031065,libao5[6]);//大吉(换GM卷)
           // cm.gainItem(4032226,libao5[7]);//黄金猪猪(抽奖)
         //   cm.gainItem(4031250,libao5[8]);//骑宠抽奖卷
						           // cm.gainItem(1003058,1);//专属VIP帽子
//---------------------------------------------------
		        cm.getChar().saveToDB(true);

                       cm.sendOk("成功成为#r萌新vIp⑤#k!"); 
 cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为萌新vIp⑤!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为萌新vIp⑤!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为萌新vIp⑤!!!",true).getBytes());	
                       cm.dispose();  } 
                    } else { 
                       cm.sendOk("你没有足够的充值币."); 
                       cm.dispose();   
                    } 


}else if  (selection == 7) { 
                  if(cm.getPlayer().getvip() >= 6) {
                       cm.sendOk("您已经是萌新vIp⑤の战斗之神了，请不要重复购买."); 
cm.dispose();  } else  if(cm.haveItem(1142186,1,true,false)){
                    cm.sendOk("请扔掉原来的勋章#r虎年勋章#k,才能办理该业务.");
                    cm.dispose();
                } else  if(cm.haveItem(1122017,1,true,false)){
						cm.sendOk("你已经有一个精灵吊坠了！请扔掉或者过期后再办理该业务.");
						cm.dispose();
                       } else if(cm.getmoneyb() >= v5) { 
                      if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull()){
							cm.sendOk("请保证其他栏位有空格接受VIP礼包.");
							cm.dispose();
}else{   
                       cm.setmoneyb(-v5);  
                       cm.getChar().SetVip(6); 
                      //---------------------------------------------------
       cm.gainNX(libao6[0]);//点卷
       cm.gainItem(4002001,libao6[1]);//邮票
       cm.gainrw13(libao6[2]); //修炼

var xunzhang = 1142186;//勋章
var shuxing = libao6[3]; //设置
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        //toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
//吊坠
var ii = net.sf.cherry.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(1122017); //获得装备的类形
var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // 生成一个Equip类
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30 * 4 *10); //时间
toDrop.setExpiration(temptime); //给装备时间
		        toDrop.setStr(libao6[4]);
		        toDrop.setDex(libao6[4]);
		        toDrop.setInt(libao6[4]);
		        toDrop.setLuk(libao6[4]);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.cherry.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包		
            cm.getPlayer().gainAp(libao6[5]);//属性点
            cm.gainItem(4031065,libao6[6]);//大吉(换GM卷)
            cm.gainItem(4032226,libao6[7]);//黄金猪猪(抽奖)
            cm.gainItem(4031250,libao6[8]);//骑宠抽奖卷
//---------------------------------------------------
			cm.gainItem(1902055, 1);
			cm.gainItem(1912048, 1);
		        cm.getChar().saveToDB(true);

                       cm.sendOk("成功成为#r萌新vIp⑤の战斗之神#k!"); 
 cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为萌新vIp⑤の战斗之神!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为萌新vIp⑤の战斗之神!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成为七里vIp⑤の战斗之神!!!",true).getBytes());	
cm.viplaba("恭喜:" + cm.getPlayer().getName() +"加入萌新顶级会员.",5121006);
                       cm.dispose();  } 
                    } else { 
                       cm.sendOk("你没有足够的充值币."); 
                       cm.dispose();   
                    } 
                   
//=====================================================================================
}else if  (selection == 70) { 
                       if(cm.getPlayer().getvip() != 3) {
                       cm.sendOk("您的会员等级不适合进行该操作."); cm.dispose();   
                  } else if(cm.haveItem(1142186,1,true,false)){
                    cm.sendOk("请扔掉原来的勋章#r虎年勋章#k,我将赠送你新的勋章.");
                    cm.dispose();
                       } else if(cm.getmoneyb() >= v3v4) { 
                       cm.setmoneyb(-v3v4); 
                    
                       cm.getChar().SetVip(4); 

                      //---------------------------------------------------
       cm.gainNX(libao4[0]-libao3[0]);//点卷
       cm.gainItem(4002001,libao4[1]-libao3[1]);//邮票
       cm.gainrw13(libao4[2]-libao3[2]); //修炼

var xunzhang = 1142186;//勋章
var shuxing = libao4[3]; //设置
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        //toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);

            cm.getPlayer().gainAp(libao4[5]-libao3[5]);//属性点
            cm.gainItem(4031065,libao4[6]-libao3[6]);//大吉(换GM卷)
            cm.gainItem(4032226,libao4[7]-libao3[7]);//黄金猪猪(抽奖)
            cm.gainItem(4031250,libao4[8]-libao3[8]);//骑宠抽奖卷
						            cm.gainItem(1003057,1);//专属VIP帽子

//---------------------------------------------------

                       
  cm.sendOk("成功升级成为#r萌新vIp④#k!"); 
 cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成功升级成为萌新vIp④!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成功升级成为萌新vIp④!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成功升级成为萌新vIp④!!!",true).getBytes());	
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    } 



}else if  (selection == 8) { 
                         if(cm.getPlayer().getvip() != 4) {
                       cm.sendOk("您的会员等级不适合进行该操作."); cm.dispose();   
                  } else if(cm.haveItem(1142186,1,true,false)){
                    cm.sendOk("请扔掉原来的勋章#r虎年勋章#k,我将赠送你新的勋章.");
                    cm.dispose();
                       } else if(cm.getmoneyb() >= v4v5) { 
                       cm.setmoneyb(-v4v5); 
                    
                       cm.getChar().SetVip(5); 

                      //---------------------------------------------------
       cm.gainNX(libao5[0]-libao4[0]);//点卷
       cm.gainItem(4002001,libao5[1]-libao4[1]);//邮票
       cm.gainrw13(libao4[2]-libao3[2]); //修炼

var xunzhang = 1142186;//勋章
var shuxing = libao5[3]; //设置
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        //toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);

            cm.getPlayer().gainAp(libao5[5]-libao4[5]);//属性点
            cm.gainItem(4031065,libao5[6]-libao4[6]);//大吉(换GM卷)
            cm.gainItem(4032226,libao5[7]-libao4[7]);//黄金猪猪(抽奖)
            cm.gainItem(4031250,libao5[8]-libao4[8]);//骑宠抽奖卷
						            cm.gainItem(1003058,1);//专属VIP帽子

//---------------------------------------------------

                      
  cm.sendOk("成功升级成为#r萌新vIp⑤#k!"); 
 cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成功升级成为萌新vIp⑤!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成功升级成为萌新vIp⑤!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成功升级成为七里香vIp⑤!!!",true).getBytes());	 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    } 

}else if  (selection == 9) { 
                         if(cm.getPlayer().getvip() != 5) {
                       cm.sendOk("您的会员等级不适合进行该操作."); cm.dispose();   
                  } else if(cm.haveItem(1142186,1,true,false)){
                    cm.sendOk("请扔掉原来的勋章#r虎年勋章#k,我将赠送你新的勋章.");
                    cm.dispose();
                       } else if(cm.getmoneyb() >= v5v6) { 
                       cm.setmoneyb(-v5v6); 
                    
                       cm.getChar().SetVip(6); 

                      //---------------------------------------------------
       cm.gainNX(libao6[0]-libao5[0]);//点卷
       cm.gainItem(4002001,libao6[1]-libao5[1]);//邮票
       cm.gainrw13(libao6[2]-libao5[2]); //修炼

var xunzhang = 1142186;//勋章
var shuxing = libao6[3]; //设置
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        //toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);

            cm.getPlayer().gainAp(libao5[5]-libao4[5]);//属性点
            cm.gainItem(4031065,libao6[6]-libao5[6]);//大吉(换GM卷)
            cm.gainItem(4032226,libao6[7]-libao5[7]);//黄金猪猪(抽奖)
            cm.gainItem(4031250,libao6[8]-libao5[8]);//骑宠抽奖卷

//---------------------------------------------------

  			cm.gainItem(1902055, 1);
			cm.gainItem(1912048, 1);
  cm.sendOk("成功升级成为#r萌新vIp⑤の战斗之神#k!"); 
 cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成功升级成为萌新vIp⑤の战斗之神!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成功升级成为萌新vIp⑤の战斗之神!!!",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"萌新管理员" + " : 恭喜:" + cm.getPlayer().getName() +" 玩家成功升级成为萌新vIp⑤の战斗之神!!!",true).getBytes());	
cm.viplaba("恭喜:" + cm.getPlayer().getName() +"加入萌新顶级会员.",5121006); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    } 

}else if  (selection == 73) { 
                       if(cm.getPlayer().getvip() > 1) {
                       cm.sendOk("您已经不是初级VIP了，不能直接生成超级VIP"); 
                       } else if(cm.getmoneyb() >= 150) { 
                       cm.setmoneyb(-150); 
                       cm.getChar().upVip3(); 
                       cm.getChar().SetVip(3); 
                       //cm.gainItem(1302073,1); 
                       cm.sendOk("超级VIP升级成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    } 


}else if  (selection == 20) { 
                       if(cm.getPlayer().getvip() != 1) {
                       cm.sendOk("您的身份不适合办理该项业务."); 
cm.dispose();
                       } else if(cm.getmoneyb() >= v1v2) { 
                      if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3) ||  cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull() ||cm.getMeso()+V2_money-V1_money >= 2147483647 ||cm.haveItem(1142174) == false){
cm.sendOk("接收VIP礼物，需要: \r\n \r\n "+ttt+" #b背包装备栏3个空格 "+ttt+" 其他栏1个空格\r\n "+ttt+" 自身金币加上#r"+V2_money+"#b减去#r"+V1_money+"#b小于最大金钱数量.\r\n "+ttt+" #b把赠送的#r#t1142174##b放在背包.\r\n    当前你的条件不满足.");
							cm.dispose();
}else{   
                       cm.setmoneyb(-v1v2); 
                       cm.getChar().SetVip(2); 
                       cm.gainNX(V2_NX);
                       cm.gainNX(-V1_NX);
                       cm.gainMeso(V2_money);
                       cm.gainMeso(-V1_money);
                       cm.removeAll(1142174);
// V1-v2 赠送   [格式 cm.gainitem(ID,数量);] 

                       
                        cm.gainItem(4031454,5);//纪念币X5
                        cm.gainItem(1902019,1);//鳄鱼王 
                        cm.gainItem(1912012,1);//鳄鱼王马鞍

//属性勋章 1142175- 
var xunzhang = 1142175;//设置勋章代码
var shuxing = 20; //设置V2勋章属性.
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
		        cm.getChar().saveToDB(true);
                       cm.sendOk("升级成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); }
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    } 

}else if  (selection == 21) { 
                       if(cm.getPlayer().getvip() != 2) {
                       cm.sendOk("您的身份不适合办理该项业务."); 
cm.dispose();
                       } else if(cm.getmoneyb() >= v2v3) { 
                       if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3) ||  cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull() ||cm.getMeso()+V3_money-V1_money >= 2147483647 ||cm.haveItem(1142174) == false){
cm.sendOk("接收VIP礼物，需要: \r\n \r\n "+ttt+" #b背包装备栏3个空格 "+ttt+" 其他栏1个空格\r\n "+ttt+" 自身金币加上#r"+V3_money+"#b减去#r"+V1_money+"#b小于最大金钱数量.\r\n "+ttt+" #b把二星会员赠送的#r#t1142174##b放在背包.\r\n    当前你的条件不满足.");
							cm.dispose();
}else{   
                       cm.setmoneyb(-v2v3); 
                       cm.getChar().SetVip(3); 
                       cm.gainNX(V3_NX);
                       cm.gainNX(-V2_NX);
                       cm.gainMeso(V3_money);
                       cm.gainMeso(-V2_money);
                       cm.removeAll(1142174);
// V2-v3 赠送   [格式 cm.gainitem(ID,数量);] 

                       
							cm.gainItem(5220040,30); //猪蛋
							cm.gainItem(2340000,20);  //祝福卷

//属性勋章 1142176- 
var xunzhang = 1142074;//设置勋章代码
var shuxing = 300; //设置V3勋章属性.
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
		        cm.getChar().saveToDB(true);
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP2成功升级到VIP3",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP2成功升级到VIP3",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP2成功升级到VIP3",true).getBytes());
                       cm.sendOk("升级成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); }
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    } 
}else if  (selection == 22) { 
                       if(cm.getPlayer().getvip() != 1) {
                       cm.sendOk("您的身份不适合办理该项业务."); 
cm.dispose();
                       } else if(cm.getmoneyb() >= v1v4) { 
                      if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3) ||  cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull() ||cm.getMeso()+V4_money-V1_money >= 2147483647 ||cm.haveItem(1142174) == false){
cm.sendOk("接收VIP礼物，需要: \r\n \r\n "+ttt+" #b背包装备栏3个空格 "+ttt+" 其他栏1个空格\r\n "+ttt+" 自身金币加上#r"+V4_money+"#b减去#r"+V1_money+"#b小于最大金钱数量.\r\n "+ttt+" #b把一星会员赠送的#r#t1142174##b放在背包.\r\n    当前你的条件不满足.");
							cm.dispose();
}else{   
                       cm.setmoneyb(-v1v4); 
                       cm.getChar().SetVip(4); 
                       cm.gainNX(V4_NX);
                       cm.gainNX(-V1_NX);
                       cm.gainMeso(V4_money);
                       cm.gainMeso(-V1_money);
                       cm.removeAll(1142174);
// V1-v3 赠送   [格式 cm.gainitem(ID,数量);] 

                       
                        cm.gainItem(4031454,15);//纪念币X5
                        cm.gainItem(1902018,1);//狼神3
                       cm.gainItem(1912011,1);//狼鞍子

//属性勋章 1142177- 
var xunzhang = 1142177;//设置勋章代码
var shuxing = 40; //设置V4勋章属性.
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
		        cm.getChar().saveToDB(true);
                       cm.sendOk("升级成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
cm.serverNotice("[会员公告]:玩家:"+ cm.getChar().getName() +" 成功成为本服至尊,大家欢迎！");
cm.serverNotice("[会员公告]:玩家:"+ cm.getChar().getName() +" 成功成为本服至尊,大家欢迎！");
cm.serverNotice("[会员公告]:玩家:"+ cm.getChar().getName() +" 成功成为本服至尊,大家欢迎！");
cm.serverNotice("[会员公告]:玩家:"+ cm.getChar().getName() +" 成功成为本服至尊,大家欢迎！");

                       cm.dispose(); }
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    } 




}else if  (selection == 23) { 
                       if(cm.getPlayer().getvip() != 2) {
                       cm.sendOk("您的身份不适合办理该项业务."); 
cm.dispose();
                       } else if(cm.getmoneyb() >= v2v3) { 
                      if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3) ||  cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull() ||cm.getMeso()+V3_money-V2_money >= 2147483647 ||cm.haveItem(1142175) == false){
cm.sendOk("接收VIP礼物，需要: \r\n \r\n "+ttt+" #b背包装备栏3个空格 "+ttt+" 其他栏1个空格\r\n "+ttt+" 自身金币加上#r"+V3_money+"#b减去#r"+V2_money+"#b小于最大金钱数量.\r\n "+ttt+" #b把一星会员赠送的#r#t1142175##b放在背包.\r\n    当前你的条件不满足.");
							cm.dispose();
}else{   
                       cm.setmoneyb(-v2v3); 
                       cm.getChar().SetVip(3); 
                       cm.gainNX(V3_NX);
                       cm.gainNX(-V2_NX);
                       cm.gainMeso(V3_money);
                       cm.gainMeso(-V2_money);
                       cm.removeAll(1142175);
// V1-v3 赠送   [格式 cm.gainitem(ID,数量);] 

                       
                        cm.gainItem(4031454,5);//纪念币X5
                        cm.gainItem(1902017,1);//狼神3
                       cm.gainItem(1912011,1);//狼鞍子

//属性勋章 1142176- 
var xunzhang = 1142176;//设置勋章代码
var shuxing = 30; //设置V3勋章属性.
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
		        cm.getChar().saveToDB(true);
                       cm.sendOk("升级成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); }
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    } 

}else if  (selection == 24) { 
                       if(cm.getPlayer().getvip() != 2) {
                       cm.sendOk("您的身份不适合办理该项业务."); 
cm.dispose();
                       } else if(cm.getmoneyb() >= v2v4) { 
                       if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3) ||  cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull() ||cm.getMeso()+V4_money-V2_money >= 2147483647 ||cm.haveItem(1142175) == false){
cm.sendOk("接收VIP礼物，需要: \r\n \r\n "+ttt+" #b背包装备栏3个空格 "+ttt+" 其他栏1个空格\r\n "+ttt+" 自身金币加上#r"+V4_money+"#b减去#r"+V1_money+"#b小于最大金钱数量.\r\n "+ttt+" #b把一星会员赠送的#r#t1142175##b放在背包.\r\n    当前你的条件不满足.");
							cm.dispose();
}else{   
                       cm.setmoneyb(-v2v4); 
                       cm.getChar().SetVip(4); 
                       cm.gainNX(V4_NX);
                       cm.gainNX(-V2_NX);
                       cm.gainMeso(V4_money);
                       cm.gainMeso(-V2_money);
                       cm.removeAll(1142175);
// V1-v3 赠送   [格式 cm.gainitem(ID,数量);] 

                       
                        cm.gainItem(4031454,10);//纪念币X5
                        cm.gainItem(1902018,1);//狼神3
                       cm.gainItem(1912011,1);//狼鞍子

//属性勋章 1142177- 
var xunzhang = 1142177;//设置勋章代码
var shuxing = 40; //设置V4勋章属性.
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
		        cm.getChar().saveToDB(true);
                       cm.sendOk("升级成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
cm.serverNotice("[会员公告]:玩家:"+ cm.getChar().getName() +" 成功成为本服至尊,大家欢迎！");
cm.serverNotice("[会员公告]:玩家:"+ cm.getChar().getName() +" 成功成为本服至尊,大家欢迎！");
cm.serverNotice("[会员公告]:玩家:"+ cm.getChar().getName() +" 成功成为本服至尊,大家欢迎！");
cm.serverNotice("[会员公告]:玩家:"+ cm.getChar().getName() +" 成功成为本服至尊,大家欢迎！");

                       cm.dispose(); }
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    } 

}else if  (selection == 25) { 
                       if(cm.getPlayer().getvip() != 3) {
                       cm.sendOk("您的身份不适合办理该项业务."); 
cm.dispose();
                       } else if(cm.getmoneyb() >= v3v4) { 
                       if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(3) ||  cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(4)).isFull() ||cm.getMeso()+V4_money-V3_money >= 2147483647 ||cm.haveItem(1142074) == false){
cm.sendOk("接收VIP礼物，需要: \r\n \r\n "+ttt+" #b背包装备栏3个空格 "+ttt+" 其他栏1个空格\r\n "+ttt+" 自身金币加上#r"+V4_money+"#b减去#r"+V3_money+"#b小于最大金钱数量.\r\n "+ttt+" #b把三星会员赠送的#r#t1142074##b放在背包.\r\n    当前你的条件不满足.");
							cm.dispose();
}else{   
                       cm.setmoneyb(-v3v4); 
                       cm.getChar().SetVip(4); 
                       cm.gainNX(V4_NX);
                       cm.gainNX(-V3_NX);
                       cm.gainMeso(V4_money);
                       cm.gainMeso(-V3_money);
                       cm.removeAll(1142074);
// V1-v3 赠送   [格式 cm.gainitem(ID,数量);] 

                       
							cm.gainItem(5220040,20); //猪蛋
							cm.gainItem(2340000,20);  //祝福卷
							cm.gainItem(3010070,1);

//属性勋章 1142177- 
var xunzhang = 1142178;//设置勋章代码
var shuxing = 500; //设置V4勋章属性.
var toDrop = new net.sf.cherry.client.Equip(xunzhang,0);
		        toDrop.setStr(shuxing);
		        toDrop.setDex(shuxing);
		        toDrop.setInt(shuxing);
		        toDrop.setLuk(shuxing);
		        toDrop.setSpeed(20);
		        toDrop.setJump(20);
		        toDrop.setLocked(1);						
net.sf.cherry.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
		        cm.getChar().saveToDB(true);
                       cm.sendOk("升级成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP3成功升级到VIP4",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP3成功升级到VIP4",true).getBytes());
							cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"系统管理员" + " : " + "恭喜 " + cm.getPlayer().getName() +" 玩家从VIP3成功升级到VIP4",true).getBytes());
                       cm.dispose(); }
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    } 



                }else if  (selection == 9) { 
				cm.teachSkill(21000000,10,10); //矛连击强化
				cm.teachSkill(21001001,15,15); //战斗步伐
				cm.teachSkill(21000002,20,20); //双重重击
				cm.teachSkill(21001003,20,20); //快速矛
				cm.teachSkill(21100000,20,20); //精准矛
				cm.teachSkill(21100001,20,20); //三重重击
				cm.teachSkill(21100002,30,30); //战神突进
				cm.teachSkill(21101003,20,20); //抗压
				cm.teachSkill(21100004,20,20); //斗气爆裂
				cm.teachSkill(21100005,20,20); //连环吸血
				cm.teachSkill(21110000,20,20); //爆击强化
				cm.teachSkill(21111001,20,20); //灵巧击退
				cm.teachSkill(21110002,20,20); //全力挥击
				cm.teachSkill(21110003,30,30); //终极投掷
				cm.teachSkill(21110004,30,30); //幻影狼牙
				cm.teachSkill(21111005,20,20); //冰雪矛
				cm.teachSkill(21110006,20,20); //旋风
				cm.teachSkill(21110007,20,20); //全力挥击
				cm.teachSkill(21110008,20,20); //全力挥击
				cm.teachSkill(21121000,1,1); //冒险岛勇士
				cm.teachSkill(21120001,30,30); //攻击策略
				cm.teachSkill(21120002,30,30); //战神之舞
				cm.teachSkill(21120009,30,30); //战神之舞
				cm.teachSkill(21120010,30,30); //战神之舞
				cm.teachSkill(21121003,30,30); //战神的意志
				cm.teachSkill(21120004,30,30); //防守策略
				cm.teachSkill(21120005,30,30); //巨熊咆哮
				cm.teachSkill(21120006,30,30); //钻石星辰
				cm.teachSkill(21120007,30,30); //战神之盾
				cm.teachSkill(21121008,1,1); //勇士的意志
			cm.sendOk("恭喜你激活成功~~~~");
                       cm.dispose(); 
}else if  (selection == 10) { 
			cm.sendSimple("您好，这里是我要爱乐岛椅子专卖店 \r\n 请选择你喜欢的\r\n  #L11##v3010000##l1充值币 #L12##v3012011##l10充值币 #L13##v3010002##l2充值币   #L14##v3010003##l2充值币 #L15##v3010004##l1充值币 #L16##v3010005##l1充值币 #L17##v3010006##l2充值币 #L18##v3010007##l4充值币 #L19##v3010008##l4充值币 #L20##v3010009##l3充值币 #L21##v3010010##l3充值币 #L22##v3010012##l2充值币 #L23##v3010013##l5充值币 #L24##v3010014##l2充值币 #L25##v3010016##l2充值币 #L26##v3010017##l2充值币 #L27##v3010018##l5充值币 #L28##v3010019##l5充值币 #L29##v3010021##l5充值币 #L30##v3010024##l5充值币 #L31##v3010028##l5充值币 #L32##v3010029##v3010030##v3010031##v3010032##v3010033##l 一共10充值币 #L33##v3010034##l5充值币 #L34##v3010035##l5充值币 #L35##v3010036##l10充值币 #L36##v3010037##l10充值币 #L37##v3010039##l5充值币 #L38##v3010040##l5充值币 #L39##v3010041##l5充值币 #L40##v3010043##l10充值币 #L41##v3010044##l10充值币 #L42##v3010045##l10充值币 #L43##v3010046##l10充值币 #L44##v3010047##l10充值币  #L45##v3010049##l15充值币 #L46##v3010050##l5充值币 #L47##v3010051##v3010052##l5充值币 #L48##v3010054##l10充值币 #L49##v3010057##l10充值币 #L50##v3010058##l15充值币 #L51##v3010062##l15充值币 #L52##v3010068##l15充值币 #L53##v3010069##l15充值币 #L54##v3010070##l15充值币 #L55##v3010071##l15充值币 #L56##v3010073##l15充值币 #L57##v3020001##l15充值币 #L58##v3010075##l15充值币 #L59##v3010077##l15充值币 #L60##v3010093##l15充值币 #L61##v3010098##l15充值币 #L62##v3010099##l30充值币 #L63##v3010100##l15充值币 #L64##v3010106##l15充值币 #L65##v3010111##l10充值币 #L66##v3012001##l15充值币 #L67##v3012002##l15充值币 #L68##v3012003##l15充值币 #L69##v3012006##l15充值币 #L70##v3012010##l15充值币 #L71##v3010025##l15充值币 #L72##v3010048##l10充值币");

}else if  (selection == 11) { 
			if(cm.getmoneyb() >= 1) { 
                       cm.setmoneyb(-1); 
                       cm.gainItem(3010000,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 12) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(3012011,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 13) { 
			if(cm.getmoneyb() >= 2) { 
                       cm.setmoneyb(-2); 
                       cm.gainItem(3010002,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 14) { 
			if(cm.getmoneyb() >= 2) { 
                       cm.setmoneyb(-2); 
                       cm.gainItem(3010003,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 15) { 
			if(cm.getmoneyb() >= 1) { 
                       cm.setmoneyb(-1); 
                       cm.gainItem(3010004,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 16) { 
			if(cm.getmoneyb() >= 1) { 
                       cm.setmoneyb(-1); 
                       cm.gainItem(3010005,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 17) { 
			if(cm.getmoneyb() >= 2) { 
                       cm.setmoneyb(-2); 
                       cm.gainItem(3010006,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 18) { 
			if(cm.getmoneyb() >= 4) { 
                       cm.setmoneyb(-4); 
                       cm.gainItem(3010007,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 19) { 
			if(cm.getmoneyb() >= 4) { 
                       cm.setmoneyb(-4); 
                       cm.gainItem(3010008,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 20) { 
			if(cm.getmoneyb() >= 3) { 
                       cm.setmoneyb(-3); 
                       cm.gainItem(3010009,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 21) { 
			if(cm.getmoneyb() >= 3) { 
                       cm.setmoneyb(-3); 
                       cm.gainItem(3010010,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 22) { 
			if(cm.getmoneyb() >= 2) { 
                       cm.setmoneyb(-2); 
                       cm.gainItem(3010012,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 23) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010013,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 24) { 
			if(cm.getmoneyb() >= 2) { 
                       cm.setmoneyb(-2); 
                       cm.gainItem(3010014,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 25) { 
			if(cm.getmoneyb() >= 2) { 
                       cm.setmoneyb(-2); 
                       cm.gainItem(3010016,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 26) { 
			if(cm.getmoneyb() >= 2) { 
                       cm.setmoneyb(-2); 
                       cm.gainItem(3010017,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 27) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010018,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 28) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010019,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 29) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010021,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 30) { 
			if(cm.getmoneyb() >= 2) { 
                       cm.setmoneyb(-2); 
                       cm.gainItem(3010024,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 31) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010028,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 32) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(3010029,1); 
cm.gainItem(3010030,1); cm.gainItem(3010031,1); cm.gainItem(3010032,1); cm.gainItem(3010033,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 33) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010034,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 34) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010035,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 35) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(3010036,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 36) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(3010037,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 37) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010039,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 38) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010040,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 39) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010041,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 40) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(3010043,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 41) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(3010044,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 42) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(30100445,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 43) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(3010046,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 44) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(3010047,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 45) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010049,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 46) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010050,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 47) { 
			if(cm.getmoneyb() >= 5) { 
                       cm.setmoneyb(-5); 
                       cm.gainItem(3010051,1); 
                       cm.gainItem(3010052,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 48) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(3010054,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 49) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(3010057,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 50) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010058,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 51) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010062,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 52) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010068,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 53) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010069,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 54) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010070,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 55) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010071,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 56) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010073,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 57) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3020001,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 58) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010075,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 59) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010077,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 60) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010093,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 61) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010098,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 62) { 
			if(cm.getmoneyb() >= 30) { 
                       cm.setmoneyb(-30); 
                       cm.gainItem(3010099,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 63) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010100,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();    
                    
}
}else if  (selection == 64) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010106,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
}
}else if  (selection == 65) { 
			if(cm.getmoneyb() >= 10) { 
                       cm.setmoneyb(-10); 
                       cm.gainItem(3010111,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 66) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3012001,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 67) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3012002,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 68) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3012003,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 69) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3012006,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 70) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3012010,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 71) { 
			if(cm.getmoneyb() >= 15) { 
                       cm.setmoneyb(-15); 
                       cm.gainItem(3010025,1); 
                       cm.sendOk("购买椅子成功！祝您游戏愉快！ 你现在剩有充值币 #r"+cm.getmoneyb()+"#k"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("你没有足够的充值币，请充值！"); 
                       cm.dispose();   
                    
}
}else if  (selection == 72) { 
			if(cm.getPlayer().getvip() >= 10) { 
                       cm.sendOk("尊贵的玩家:\r\n你已经是本服的#r至尊VIP了#k!"); 
                       cm.dispose(); 
                    } else { 
                       cm.sendOk("Vip礼包:\r\n1.#v2022450# 经验增长20%  \r\n2.#v1142145# 4属性40，攻击力10，魔法力10。[会员称号]\r\n3.#v5073000# 登陆通知全线玩家.\r\n4.#v1902015##v1902016##v1902017##v1902018##v1912011# 坐骑 \r\n5.#v2022070# 会员buff指令[#b@祝福#k]一天10次[持续30分钟].\r\n"); 
                       cm.dispose();   
                    
                   
}
    } 
}}
