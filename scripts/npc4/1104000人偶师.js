var status = 0;
var selStr;
var sel;
var selitem;
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var bbb = "#fUI/UIWindow.img/Shop/meso#";
var vvv = "#fUI/UIWindow2.img/ValuePack/button/complete/0#";//领取完成

//等级设置
var minlvl = 130;
var maxlvl = 200;
//人数设置
var minplayers = 1;
var maxplayers = 6;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
			selStr = "#r#e<130级 弗朗西斯人偶师BOSS副本>#n#k.\r\n强大的黑魔法师来袭，请火速消灭它们！副本要求1人以上，最低等级130级.大量经验/道具奖励.#v4001215#骑宠技能兑换卷，各种母矿，祝福卷轴和#v4000422#！快快挑战吧！队员越多，奖励越多！\r\n#v4000422#x1个抽奖一次,必出各职业#i1052804:#.#i1072972:#.#i1082613:#.\r\n心动不如行动！出发吧骚年！\r\n\r\n";
			selStr+="#L4##b出发 挑战弗朗西斯#l\r\n";
			selStr+="#L5#白色礼物盒抽取套装#l\r\n";
			//selStr+="#L3##r#z4310091##k#b抽取稀有椅子（每周更新）#l\r\n";
			//selStr+="#L5##r#z4310091##k#b抽取高级装备（每周更新）#b#l\r\n";
			//selStr+="#L1#简单模式（掉落#z4310091#）（扣3000抵用卷）#l\r\n";
			//selStr+="#L4#困难模式（掉落#z4310091#）（扣500点卷）#l\r\n";
			//selStr+="#L7#简单模式（组队模式）（扣队长5000抵用卷）#l\r\n";
			//selStr+="#L8#困难模式（组队模式）（扣队长1000点卷）#l";
			cm.sendSimple(selStr);
    } else if (status == 1) {
		sel=selection;
        if(sel==1){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b开启#k一个组队,而且只能是你一个人~.zzzZZZZZ..");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("请叫队长跟我说话.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(2) < 3000) { // Not Party Leader
                    cm.sendOk("你的抵用卷不足3000点，请足够后再来");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 1) {
                        cm.sendOk("#r对不起,为了彻底的测试你的能力,只能一人前往..");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw");
                    if (em == null) {
                        cm.sendOk("暂未开放.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.gainNX(2, -3000); //扣除点卷
                    cm.channelMessage(0x09, "『守卫家园』" + " : " + "玩家<" + cm.getChar().getName() + ">进入了守护地图开始保护家园");
                        cm.dispose();
                    }
}
        } else if(sel==4){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b开启#k一个组队,而且只能是你一个人~.zzzZZZZZ..");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("请叫队长跟我说话.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(910510000).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                    cm.dispose();
                    return;
                } else if (cm.haveItem(4032341) < 1) { // Not Party Leader
                    cm.sendOk("你的#v4032341#不足，请足够后再来");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
					var inMap = cm.partyMembersInMap();
            var levelValid = 0;
            for (var i = 0; i < party.size(); i++) {
                if (party.get(i).getLevel() >= minlvl && party.get(i).getLevel() <= maxlvl)
                    levelValid++;
            }
			if (inMap < minplayers || inMap > maxplayers) {
                cm.sendOk("你的队伍人数不足"+minplayers+"人.请把你的队伍人员召集到在进入副本.");
                //cm.sendOk("Your party is not a party of "+minPlayers+". Please make sure all your members are present and qualified to participate in this quest. I see #b" + inMap + "#k of your party members are in Kerning. If this seems wrong, #blog out and log back in,#k or reform the party.");
                cm.dispose();
                        return;
            } 
			if (levelValid != inMap) {
                cm.sendOk("请确保你的队伍人员最小等级在 "+minlvl+" 和 "+maxlvl+"之间.");
                cm.dispose();
                        return;
                //} else if (checkPartyLevels() == false) {//判断队伍成员等级
                 //   cm.sendOk("管理员 - 提示 \r\n\r\n队伍成员等级必须在#b" + minlvl + " - " + maxlvl + "#k之间并且必须在一张地图才能进入，请核对后在来找我。")
                 //   cm.dispose();
                } else if (checkPartySize() == false) {//判断队伍成员人数
                    cm.sendOk("管理员 - 提示 \r\n\r\n队伍成员人数必须在#b" + minplayers + "~" + maxplayers + "#k之间并且必须在一张地图才能进入，请核对后在来找我。");
                    cm.dispose();
                        return;
                
                }
			if (party.size() < 1) {
                        cm.sendOk("#r对不起,为了彻底的测试你的能力,只能一人前往..");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("ChaoJiPQ");
                    if (em == null) {
                        cm.sendOk("暂未开放.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap());
			cm.gainItem(4032341,-1);
		    //cm.gainNX(1, -500);
                    cm.worldMessage(6, "『人偶师BOSS』" + " : " + "玩家<" + cm.getChar().getName() + ">进入了人偶师BOSS地图");
                        cm.dispose();
                    }
}
        } else if(sel==7){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b开启#k一个组队");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("请叫队长跟我说话.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(2) < 5000) { // Not Party Leader
                    cm.sendOk("你的抵用卷不足5000，请足够后再来");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 2) {
                        cm.sendOk("#r对不起,组队必须2人以上，或者选择单人模式");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw");
                    if (em == null) {
                        cm.sendOk("暂未开放.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.gainNX(2, -5000); //扣除点卷
                    cm.channelMessage(0x09,"『守卫家园』" + " : " + "玩家<" + cm.getChar().getName() + ">进入了圣地开始保护圣龙[组队模式]");
                        cm.dispose();
                    }
}
        } else if(sel==8){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b开启#k一个组队");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("请叫队长跟我说话.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(1) < 1000) { // Not Party Leader
                    cm.sendOk("你的点卷不足1000，请足够后再来");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 2) {
                        cm.sendOk("#r对不起,组队必须2人以上，或者选择单人模式");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("ChaoJiPQ");
                    if (em == null) {
                        cm.sendOk("暂未开放.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
		    cm.gainNX(1, -1000);
                    cm.channelMessage(0x09, "『守卫家园』" + " : " + "玩家<" + cm.getChar().getName() + ">进入了圣地开始保护圣龙[组队模式]");
                        cm.dispose();
                    }
}
		} else if (sel==3){
			//cm.dispose();
              	       // cm.openNpc(9900003,701);  
		} else if (sel==5){
              	        cm.openNpc(1104000,1);  
			//cm.sendOk("暂未开放AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
			//cm.dispose();                      
		} else if (sel==2){
			cm.sendOkS("#r#e<守卫家园>\r\n#r#e副本特色：#k#n进入后，每次15秒刷新一批怪物，请迅速消灭\r\n#r#e挑战失败条件：#k#n地图怪物总数量超过100只。\r\n#e#r挑战待遇：#k#n杀死怪物后，有机率掉落#v4310091##z4310091#\r\n#r#e进入条件#k#n：点卷，或者抵用卷",2);
			cm.dispose();
		} else if (sel==6){
			cm.sendOkS("暂未开放",2);
			cm.dispose();
	 }
}
}
function checkPartySize() {
    var size = 0;
    if (cm.getPlayer().getParty() == null)
        size = 0;
    else
        size = (cm.getPlayer().getParty().getMembers().size());
    if (size < minplayers || size > maxplayers)
        return false;
    return true;
}

