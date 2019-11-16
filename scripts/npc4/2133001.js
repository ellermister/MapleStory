var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    switch(cm.getPlayer().getMapId()) {
	case 930000000:
	    cm.sendNext("欢迎，请通过光圈进入！.");
	    break;
	case 930000010:
	    cm.warpParty(100000000);
	    break;
	case 930000100:
	    cm.sendNext("我们必须消灭所有的怪物");
	    break;
	case 930000200:
	    cm.sendNext("我们必须消灭所有的怪物");
	    break;
	case 930000300:
		cm.givePartyExp(50000);
	    cm.warpParty(930000400);
	    break;
	case 930000400:
	    if (cm.haveItem(4001169,10)) {
		cm.givePartyExp(80000);
		cm.warpParty(930000500);
		cm.gainItem(4001169,-10);
	    } else if (!cm.haveItem(2270004)) {
		cm.gainItem(2270004,10);
		cm.sendOk("净化这些怪物的好运气！");
	    } else {
		cm.sendOk("我们必须消灭怪物，获得10个怪物之珠");
	    }
	    break;
	case 930000600:
	    cm.sendNext("This is it! Place the Magic Stone on the Altar!");
	    break;
	case 930000700:
	    cm.removeAll(4001169);//怪物之珠
	    cm.removeAll(2270004);//净化之珠
	    cm.removeAll(4001162);
	    cm.removeAll(4001163);
	    cm.warp(930000800,0);
	    break;
    }
    cm.dispose();
}