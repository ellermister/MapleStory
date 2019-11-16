
/*
5340000  钓竿
5350000  高级鱼饵罐头
5340001  高级鱼竿
*/

importPackage(net.sf.odinms.client);

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
                
			cm.sendOk("哈~钓鱼是一种伟大的职业");
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
			cm.sendSimple("#r极光戒指领取方式:从时间最短的盒子开始领取！#l\r\n#L1##b领取极光戒指#k");
			//cm.sendSimple("你好!你有什么需要我做的吗?\r\n#L1##b进入钓鱼场#k\r\n#L2##b购买钓鱼椅子#k\r\n#L3##b使用高级鱼罐头兑换鱼饵#k\r\n#L4##b购买普通鱼饵#k\r\n#L5##b钓鱼场的介绍#k");
			} else if (status == 1) { //进入钓鱼场
			if (selection == 1) {
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格（如果出现假死请使用@假死）");
					cm.dispose();
					return;
				}
			}
			if(cm.haveItem(5532000)) {
		  var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1112404);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy();
		var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 3 * 60 * 60 * 1000);
		toDrop.setExpiration(temptime);		
		toDrop.setLuk(2);
		toDrop.setInt(2);
		toDrop.setDex(2);
		toDrop.setStr(2);
		toDrop.setHp(2);
		toDrop.setMp(2);
		toDrop.setAcc(2);
		toDrop.setAvoid(2);
		toDrop.setSpeed(2);
		toDrop.setJump(2);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
		cm.gainItem(5532000,-1)
            cm.sendOk("恭喜领取3小时极光戒指！");
		cm.dispose();
            } else if(cm.haveItem(5532001)) {
		  var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1112404);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy();
		var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000);
		toDrop.setExpiration(temptime);		
		toDrop.setLuk(2);
		toDrop.setInt(2);
		toDrop.setDex(2);
		toDrop.setStr(2);
		toDrop.setHp(2);
		toDrop.setMp(2);
		toDrop.setAcc(2);
		toDrop.setAvoid(2);
		toDrop.setSpeed(2);
		toDrop.setJump(2);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
		cm.gainItem(5532001,-1)
            cm.sendOk("恭喜领取1天极光戒指！");
		cm.dispose();
            } else if(cm.haveItem(5532002)) {
		  var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1112404);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy();
		var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000);
		toDrop.setExpiration(temptime);		
		toDrop.setLuk(2);
		toDrop.setInt(2);
		toDrop.setDex(2);
		toDrop.setStr(2);
		toDrop.setHp(2);
		toDrop.setMp(2);
		toDrop.setAcc(2);
		toDrop.setAvoid(2);
		toDrop.setSpeed(2);
		toDrop.setJump(2);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
		cm.gainItem(5532002,-1)
            cm.sendOk("恭喜领取7天极光戒指！");
			cm.dispose();
            } 
//-------------------------------购买钓鱼椅子-----------------------------
			} else if  (selection == 2) { 
			if ((cm.getMeso() >= 5000000)&&(cm.haveItem(3011000, 1))||(cm.getMeso() <= 5000000)) { 
                   	cm.sendOk("你的冒险币不足，或者你已经买了一把椅子了！");
                   	cm.dispose();
                   	} else {
		   	cm.sendOk("你已经成功买到了钓鱼椅子！花费了你500万冒险币！"); 
			cm.gainItem(3011000,1); //钓鱼椅子
			cm.gainMeso(-5000000);
		   	cm.dispose(); }
//------------------------------高级鱼饵兑换----------------------------------
            } else if (selection == 3) {
           	    if ((cm.getzb() >= 20)) { 
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(2300000);	
		var toDrop = ii.randomizeStats(ii.getEquipById(2300000)).copy();
		var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000);
		toDrop.setExpiration(temptime);		
		//toDrop.setLuk(50);
		//toDrop.setInt(50);
		//toDrop.setDex(50);
		//toDrop.setStr(50);
		//toDrop.setHp(50);
		//toDrop.setMp(50);
		//toDrop.setAcc(50);
		//toDrop.setAvoid(50);
		//toDrop.setSpeed(50);
		//toDrop.setJump(50);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
               //    cm.gainItem(2300000,50);
		   cm.setzb(-20);
		   cm.setxfb(20);//
                   cm.sendOk("兑换成功！");
                   cm.dispose();
                   } else {
		   cm.sendOk("点卷不够！需要20点充值币购买1天鱼饵！"); 
		   cm.dispose(); 
		   }
//--------------------------------鱼饵兑换------------------------------------
            } else if (selection == 4) {
           	 if ((cm.getzb() >= 2)) { 
			 var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(2300000);	
		var toDrop = ii.randomizeStats(ii.getEquipById(2300000)).copy();
		var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 1 * 60 * 60 * 1000);
		toDrop.setExpiration(temptime);		
		//toDrop.setLuk(50);
		//toDrop.setInt(50);
		//toDrop.setDex(50);
		//toDrop.setStr(50);
		//toDrop.setHp(50);
		//toDrop.setMp(50);
		//toDrop.setAcc(50);
		//toDrop.setAvoid(50);
		//toDrop.setSpeed(50);
		//toDrop.setJump(50);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
               //    cm.gainItem(2300000,50);
		   cm.setzb(-2);
		   cm.setxfb(2);//
                   cm.sendOk("兑换成功！");
                   cm.dispose();
                   } else {
		   cm.sendOk("点卷不够！需要2点充值币购买1小时鱼饵！"); 
		   cm.dispose(); 
		   }
//-------------------------------关于钓鱼场------------------------------------
	                 } else if (selection == 5) {
                   cm.sendNextPrev("进入钓鱼场需要#b鱼竿#k,也需要#b钓鱼场专用椅子#k,和#b鱼饵#k,这些你都可以通过我来购买.#b鱼竿#k请去点卷购物商场购买!\r\n#r可以钓到各种现金道具.装备.卷轴.豆豆装备！#l\r\n#b钓到的鱼也可以兑换各种勋章！#l");
                   cm.dispose();
		}}
	}
}