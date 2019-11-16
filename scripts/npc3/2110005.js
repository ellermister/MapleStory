var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		cm.sendNext("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		cm.dispose(); 
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("#v3991022##v3991004##v3991011##v3991002##v3991014##v3991012##v3991004#\r\n你好!亲爱的奶茶玩家！初来乍到是否觉得很难混？~\r\n送你一个全属性15的#v1142000# +冒险币50w，祝你如鱼得水~\r\n#r另外再送你几样！#v1002419#+#v5072000#+#v2000005#。   #b是否领取？");
	} else if (status == 1) {
		if (cm.getChar().getPresent() == 0) {
            
            var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1142000); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1142000)).copy(); // 生成一个Equip类
//toDrop.setLocked(1);
toDrop.setStr(15);
toDrop.setDex(15);
toDrop.setInt(15);
toDrop.setLuk(15);
toDrop.setHp(15);
toDrop.setMp(15);
toDrop.setMatk(15);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.gainMeso(500000);
		cm.gainItem(1002419,1);
		cm.gainItem(5072000,10);
		cm.gainItem(2000005,10);
            //cm.modifyNX(0, 0);//显示得点

cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包		
cm.getChar().setPresent(1);
            cm.serverNotice(5,"[奶茶冒险岛]新人:"+cm.getChar().getName()+" 领取了1个全属性15的枫叶帽，还没有的新人朋友请找NPC色色领取！");
            cm.serverNotice(5,"[奶茶冒险岛]新人:"+cm.getChar().getName()+" 领取了1个全属性15的枫叶帽，还没有的新人朋友请找NPC色色领取！");
            cm.serverNotice(5,"[奶茶冒险岛]新人:"+cm.getChar().getName()+" 领取了1个全属性15的枫叶帽，还没有的新人朋友请找NPC色色领取！");
			
			cm.getChar().saveToDB(true);
			cm.sendOk("恭喜：操作已成功。领取完成！");
			cm.dispose();
		} else {
			cm.sendOk("每个帐号只可以领取#b1次#k。你已经领取过了！");
			cm.dispose();
		       }	
		}
	}
}
