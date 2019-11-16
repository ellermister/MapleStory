/*
	亲亲嘴冒险专用脚本
	扎昆召唤
	芯碎王子修改
*/

function act() {
        if(rm.getPlayer().getEventInstance() != null)
        rm.getPlayer().getEventInstance().setProperty("canEnter", "false");
	rm.getReactor().getMap().addMapTimer(2 * 60 * 60,211042300); 
        rm.changeMusic("Bgm06/FinalFight");
        rm.spawnFakeMonster(8800000);
        for (i=8800003; i<8800011; i++) rm.spawnMonster(i);
	rm.mapMessage("请注意!扎昆出来了.");
}
