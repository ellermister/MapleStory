var status = -1;

function action(mode, type, selection) {
    var em = cm.getEventManager("Romeo");
    if (em == null) {
        cm.sendOk("...");
        cm.dispose();
        return;
    }
	if(cm.isLeader()){
		//cm.givePartyExp(0);
		//pi.warpParty(926100100);
	}else{
        cm.playerMessage(5, "队长进入！");
        cm.dispose();
        return;
	}
    if (em.getProperty("stage").equals("1") && em.getProperty("stage5").equals("0")) {
        //advance to angry!
        cm.sendOk("把怪物都消灭了！");
        em.setProperty("stage", "2");
    } else if (em.getProperty("stage5").equals("1") && cm.getMap().getAllMonstersThreadsafe().size() == 0) {
        cm.sendOk("请进吧！");
        em.setProperty("stage5", "2");
        cm.getMap().setReactorState();
    } else {
        cm.sendOk("消灭所有的怪物！！");
    }
    cm.dispose();
}