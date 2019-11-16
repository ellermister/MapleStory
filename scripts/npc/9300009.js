importPackage(net.sf.odinms.client); 
importPackage(net.sf.odinms.tools); 
importPackage(net.sf.odinms.server);
function start() {
 status = -1;
action(1, 0, 0);
}

function action(mode, type, selection) {
 if (mode == -1 || status == 2) {
  cm.dispose();
 } else {
  if (status == 0 && mode == 0) {
   cm.sendOk("好的,希望以后还可以见到你的!");
   status = 2;
   return;
  }
  if (mode == 1)
   status++;
  else
   status--; 

  if (status == 0) {
	  cm.sendNextPrev("#r确认你已经闹完新房了吗？");
          }else if (status == 1 ) {			  
     if (cm.haveItem(4031159,1)){ 
            cm. sendOk("#b你的是结婚证书，属于钻石级婚礼，正在为你们举行钻石级的拜天地！\r\n\r\n\r\n#b结婚进程#B5%##b[40%]\r\n\r\n\r\n");        				
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】正在进行钻石级拜堂",true).getBytes());
												cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】正在进行钻石级拜堂",true).getBytes());
																		cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】钻石级拜堂完成！恭喜【" + cm.getPlayer().getName() +"】新婚快乐，进入洞房后，将开始进行你们二人的环游世界！",true).getBytes());
																								cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】钻石级拜堂完成！恭喜【" + cm.getPlayer().getName() +"】新婚快乐，进入洞房后，将开始进行你们二人的环游世界！",true).getBytes());
																													cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】水晶级拜堂完成！恭喜【" + cm.getPlayer().getName() +"】新婚快乐，进入洞房后，将开始进行你们二人的环游世界！",true).getBytes());
			cm.dispose();	
}else if (cm.haveItem(4031158,1)){ 
cm.sendOk("#b你的是结婚证书，你的婚礼属于水晶级婚礼！\r\n\r\n\r\n#b结婚进程#B10%##b[10%]\r\n\r\n\r\n正在传送你们进入场地...");
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(3,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】正在进行水晶级拜堂",true).getBytes());
												cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(3,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】正在进行水晶级拜堂",true).getBytes());
																		cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(3,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】水晶级拜堂完成！恭喜【" + cm.getPlayer().getName() +"】新婚快乐！",true).getBytes());
																								cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(3,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】水晶级拜堂完成！恭喜【" + cm.getPlayer().getName() +"】新婚快乐！",true).getBytes());
																													cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(3,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】水晶级拜堂完成！恭喜【" + cm.getPlayer().getName() +"】新婚快乐！",true).getBytes());
			cm.dispose();	

cm.dispose();
}else if (cm.haveItem(4031157,1) ){ 
 cm.sendOk("#b哦，你们已经拥有了普通证书！\r\n\r\n\r\n#b结婚进程#B100%##b[100%]\r\n\r\n\r\n拜堂完毕！...");
						cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】正在进行普通级拜堂",true).getBytes());
												cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】正在进行普通级拜堂",true).getBytes());
																		cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】普通级拜堂完成！恭喜【" + cm.getPlayer().getName() +"】新婚快乐！",true).getBytes());
																								cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】普通级拜堂完成！恭喜【" + cm.getPlayer().getName() +"】新婚快乐！",true).getBytes());
																													cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),"结婚主持人" + " : 【" + cm.getPlayer().getName() +"】普通级拜堂完成！恭喜【" + cm.getPlayer().getName() +"】新婚快乐！",true).getBytes());
                        }else{ 
						
                        cm.sendOk("#r你们没有结婚证书！#k\r\n等18岁再来找我啦！\r\n如果有18岁的话就往做走，找那个卫兵领结婚证书哈"); 
						cm.dispose();
                        } 
						 }else if (status == 2 ) {	
						 cm.warp(910000000);
        }}
}