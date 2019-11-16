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
 -如果不是,请仔细查看 http://www.gnu.org/licenses/*
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
text += "#b欢迎来到#r奶茶冒险岛#k！以下是您的数据累计：\r\n#b◤目前已经杀死怪物：#r"+ cm.getChar().getsg() +"#b 头◥\r\n◣目前剩余积分：#r"+cm.getboss()+"#b 点(积分可通过副本获得)◢"
//text +=  "#k.\r\n点卷能去商场购买物品(充值比例：#r#e1:200#n#k)\r\n点卷:#r" + cm.getChar().getNX() + "#k.\r\n";
//text += "#n#r#L10#快速转职#l#b      #b#L12#副本组队#k#l      #k#L6##r充值点卷领取#l\r\n\r\n"; 

//text += "#d#L12#副本组队#k#l\r\n";
//text += "#L3##r每日任务#k#l\r\n";
//text += "#k#L6##r清理背包物品#l\r\n";
//text += "#b#L13#家族排行#l      #b#L9#等级排行#l\r\n\r\n";
//text += "#b#L17##l\r\n";
//text += "#b#L7##l\r\n";
//text += "#b#L27#精灵吊坠兑换1天(2000点卷)#l\r\n";
text += "#b#L8#每日签到#l      #r#L11#赞助者礼包#l  #L3##r#k#l\r\n\r\n";
//text += "#d#L1##k#l";
//text += "#k#L11#充值礼包领取#l";
        
        cm.sendSimple(text);
    } else if (status == 1) {
           if (selection == 0) {      
   cm.warp(910000000); 
           cm.dispose(); 
    }else if  (selection == 1) {                    

cm.sendOk("您好！你的200级以后来找我，我能帮你激活最大技能!");
cm.dispose();

    }else if  (selection == 2) {
 cm.warp(100000200);
         cm.dispose();
    }else if  (selection == 3) {      
       
}else if  (selection == 4) {    
           cm.openNpc(9900000); 
    }else if  (selection == 5) {
           cm.openNpc(9030100); 
    }else if  (selection == 6) {
           cm.openNpc(9000009); 
    }else if  (selection == 7) { 
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格");
					cm.dispose();
					return;
				}
			}
		if(cm.getNX() >= 40000){
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1122017);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy();
		var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 30 * 24 * 60 * 60 * 1000);
		toDrop.setExpiration(temptime);		
		toDrop.setWatk(2);
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
		   cm.gainNX(-40000);//
                   cm.sendOk("兑换成功！");
                   cm.dispose();
				   }else{
                   cm.sendOk("对不起.你没有4W点卷无法兑换！");
                   cm.dispose();
				   }
    }else if  (selection == 17) { 
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格");
					cm.dispose();
					return;
				}
			}
		if(cm.getNX() >= 10000){
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1122017);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy();
		var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000);
		toDrop.setExpiration(temptime);		
		toDrop.setWatk(2);
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
		   cm.gainNX(-10000);//
                   cm.sendOk("兑换成功！");
                   cm.dispose();
				   }else{
                   cm.sendOk("对不起.你没有4W点卷无法兑换！");
                   cm.dispose();
				   }
    }else if  (selection == 27) { 
	
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格");
					cm.dispose();
					return;
				}
			}
		if(cm.getNX() >= 2000){
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1122017);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy();
		var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000);
		toDrop.setExpiration(temptime);		
		toDrop.setWatk(2);
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
		   cm.gainNX(-2000);//
                   cm.sendOk("兑换成功！");
                   cm.dispose();
				   }else{
                   cm.sendOk("对不起.你没有4W点卷无法兑换！");
                   cm.dispose();
				   }
    }else if  (selection == 10) {     
           cm.openNpc(9900001);        
    }else if  (selection == 8) {//每日签到
         if(cm.getBossLog('qiandao') >= 1){
         cm.sendOk("你今日签到过了。请不要重复签到！");
}else{
        cm.setBossLog("qiandao");//增加签到列表
        cm.gainMeso(+10000);//签到金币请自己修改 删除 添加
        cm.gainNX(+100);//签到点卷请自己修改 删除 添加
        gainItem(5030001,1);
        cm.sendOk("恭喜你获得了每日签到的奖励！");
        cm.dispose();
}
    }else if  (selection == 9) {  
cm.displayLevelRanks();        
        cm.dispose();  
}else if  (selection == 13) {  
   cm.displayGuildRanks();
cm.dispose();   
}else if  (selection == 11) {  
cm.openNpc(9900004);    


}else if  (selection == 12) {  
     if (cm.getLevel() <8) {  
                cm.sendOk("孩子，等你长大了再去吧！");
cm.dispose();
}else{
cm.warp(100000200);
          cm.dispose();
}
}


}
}
}

