var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (cm.getPlayer().getMapId() == 925100700) {
	cm.removeAll(4001117);
	cm.removeAll(4031437);
	cm.removeAll(4001120);
	cm.removeAll(4001121);
	cm.removeAll(4001122);
	cm.removeAll(4001260);
	cm.warp(251010404);
	cm.dispose();
	return;
    }
    switch(cm.getPlayer().getMapId()) {
	case 925100000:
	   cm.sendNext("我们这里是海盗船！我们要消灭所有的怪物保护它。\r\n#b请收集#b老海盗箱子的禁戒之枪#k5个。");
	   cm.dispose();
	   break;
	case 925100100:
	   cm.sendNext("我们这里是海盗船！我们要消灭所有的怪物保护它。\r\n#b请收集#b初级、#b中级、高级、海盗身份#k各20个。");
	   cm.dispose();
	   break;
	case 925100200:
	   cm.sendNext("我们这里是海盗船！我们要消灭所有的怪物");
	   cm.dispose();
	   break;
	case 925100300:
	   cm.sendNext("我们这里是海盗船！我们要消灭所有的怪物");
	   cm.dispose();
	   break;
	case 925100400:
	   cm.sendNext("我们这里是海盗船！我们要消灭所有的怪物保护它。\r\n#b请收集#b骷髅钥匙,丢在门上，关闭所有大门。")
	   cm.dispose();
	   break;
	case 925100500:
	   cm.openNpc(9250006, 0);	
	   //if (cm.haveItem(4031551,1)) {
	   //if (cm.getMap().getAllMonstersThreadsafe().size() == 0) {
		//cm.givePartyItems(4170009, 1);
		//cm.givePartyItems(4001322, 2);
		//cm.warpParty(925100600);
		//cm.givePartyExp(100000);
	   //} else {
	   	//cm.sendNext("请消灭，老海盗船长和他的小怪！");
	   //}
	   //cm.dispose();
	   break;
    }
}