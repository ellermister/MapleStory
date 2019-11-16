function action(mode, type, selection) {
    if (cm.getPlayer().getMapId() == 920011200) { //exit
	for (var i = 4001044; i < 4001064; i++) {
		cm.removeAll(i); //holy
	}
	cm.warp(200080101);//出口
	cm.dispose();
	return;
    }
    var em = cm.getEventManager("OrbisPQ");
    if (em == null) {
	cm.sendOk("请再一次尝试.");
	cm.dispose();
	return;
    }
    if (cm.getLevel() > 200 ) {  
	cm.sendOk("我只想跟你的队长说话!");
	cm.dispose();
	return;
    }
    if (em.getProperty("pre").equals("0")) {
	for (var i = 4001044; i < 4001064; i++) {
		cm.removeAll(i); //holy
	}
	cm.sendNext("请救救我，我被困在了爸爸的小精灵的印章，我们塔的恐怖！他把我们所有的米勒娃雕像都放错了地方，我们得把它弄回来！哦，对不起，我的管家，说我是米勒娃的皇家仆人。请你把所有的云打了，获得20个云朵碎片放入地图亭子的光球下！");
	cm.dispose();
	return;
    }
    switch(cm.getPlayer().getMapId()) {
	case 920010000:
	    cm.warpParty(920010000, 2);//传送到这个地图的链接地图
	    cm.givePartyExp(1);
	    break;
	case 920010100:
	    if (em.getProperty("stage").equals("6")) {
		if (em.getProperty("finished").equals("0")) {
		    cm.warpParty(920010800); //GARDEN.	
		} else {
		    cm.sendOk("谢谢你拼好了女神像，我送你去BOSS关吧！");
		}
	    } else {
		cm.sendOk("请收集女神像的各个部件，把女神像拼好，然后点击我，送你去BOSS地图");
	    } 
	    break;
	case 920010200: //walkway
	    if (!cm.haveItem(4001050,30)) {
		cm.sendOk("打死怪物获得30个碎片给我，幽灵的亡魂没必要打，因为不掉碎片!");
	    } else if(cm.haveItem(4001044,1)){
		cm.sendOk("收集成功，你可以出去了!");
	    } else {
		cm.removeAll(4001050);
		cm.gainItem(4001044,1); //first piece
		cm.gainItem(4001049,1); //sixth
		cm.givePartyExp(40000);
		clear();
	    }
	    break;
	case 920010300: //storage
	    if (!cm.haveItem(4001051,15)) {
		cm.sendOk("请收集15个碎片给我，打死小狮子会掉!\r\n从最下面开始往上数是1-15层，左边是单数层，右边是双数层\r\n\r\n狮子依次出现的层数为：\r\n1层 10层 9层 13层 11层\r\n 6层 12层 2层 5层 15层\r\n 8层 4层 7层 3层 14层。");
	    } else if(cm.haveItem(4001045,1)){
		cm.sendOk("你已经有了，可以出去了!");
	    } else {
		cm.removeAll(4001051);
		cm.gainItem(4001045,1);
		cm.givePartyExp(40000);
		clear();
	    }
	    break;
	case 920010400: //lobby
	    if (em.getProperty("stage3").equals("0")) {
		cm.sendOk("请，找到这个唱片的一周，并将它放在音乐播放。\r\n#v4001056#星期天\r\n#v4001057#星期一\r\n#v4001058#星期二\r\n#v4001059#星期三\r\n#v4001060#星期四\r\n#v4001061#星期五\r\n#v4001062#星期六\r\n");
	    } else if (em.getProperty("stage3").equals("1")) {
		if (cm.canHold(4001046,1)) {
		    cm.gainItem(4001046,1); //third piece
		    cm.givePartyExp(50000);
		    clear();
		    em.setProperty("stage3", "2");
		} else {
		    cm.sendOk("Please make room!");
		}
	    } else {
		cm.sendOk("Thank you so much!");
	    }
	    break;
	case 920010500: //sealed
	    if (em.getProperty("stage4").equals("0")) {
		var players = Array();
		var total = 0;
		for (var i = 0; i < 3; i++) {
		    var z = cm.getMap().getNumPlayersItemsInArea(i);
		    players.push(z);
		    total += z;
		}
		if (total != 3) {
		    cm.sendOk("需要3个队友站上台阶，多一个人都不行，提示是：\r\n300、030、003按这样的顺序依次站好！");
		} else {
		    var num_correct = 0;
		    for (var i = 0; i < 3; i++) {
			if (em.getProperty("stage4_" + i).equals("" + players[i])) {
			    num_correct++;
			}
		    }
		    if (num_correct == 3) {
			if (cm.canHold(4001047,1)) {
	    		    clear();
			    cm.gainItem(4001047,1); //fourth
			    cm.givePartyExp(30000);
	    		    em.setProperty("stage4", "1");
			} else {
			    cm.sendOk("Please make room!");
			}
		    } else {
    	    		cm.showEffect(true, "quest/party/wrong_kor");
    	    		cm.playSound(true, "Party1/Failed");
			if (num_correct > 0) {
			    cm.sendOk("One of the platforms is correct.");
			} else {
			    cm.sendOk("All of the platforms are wrong.");
			}
		    }
		}
	    } else {
		cm.sendOk("The portal is opened! Go!");
	    }
	    cm.dispose();
	    break;
	case 920010600: //lounge
	    if (!cm.haveItem(4001052,10)) {
		cm.sendOk("收集10个碎片给我，在最下面的小黑屋打箱子获得！！！");
	    } else if(cm.haveItem(4001048,1)){
		cm.sendOk("收集成功，你可以出去了!");
	    cm.dispose();
	    } else {
		cm.givePartyItems(4001052,-1,true);
		cm.removeAll(4001052);
		cm.gainItem(4001048,1); //fifth piece
		cm.givePartyExp(30000);
		clear();
	    }
	    break;
	case 920010700: //on the way up
	    if (em.getProperty("stage6").equals("0")) {
		var react = Array();
		var total = 0;
	    	for(var i = 0; i < 3; i++) {
		    if (cm.getMap().getReactorByName("" + (i + 1)).getState() > 0) {
			react.push("1");
			total += 1;
		    } else {
			react.push("0");
		    }
	    	}
		if (total != 2) {
		    cm.sendOk("请你的全部队友团队协助上去打最下面的3个杆子，最上面的两个杆子不用打，队长点我就行\r\n\r\n#r友情提示：上去一个阶梯，丢一个金币记录一下！\r\n答案是：两个下，一个上");
		} else {
		    var num_correct = 0;
		    for (var i = 0; i < 3; i++) {
			if (em.getProperty("stage62_" + i).equals("" + react[i])) {
			    num_correct++;
			}
		    }
		    if (num_correct == 3) {
			if (cm.canHold(4001049,1)) {
	    		    clear();
			    cm.gainItem(4001049,1); //sixth
			    cm.givePartyExp(100000);
	    		    em.setProperty("stage6", "1");
			} else {
			    cm.sendOk("Please make room!");
			}
		    } else {
    	    		cm.showEffect(true, "quest/party/wrong_kor");
    	    		cm.playSound(true, "Party1/Failed");
			if (num_correct >= 1) { //this should always be true
			    cm.sendOk("One of the levers is correct.");
			} else {
			    cm.sendOk("Both of the levers are wrong.");
			}
		    }
		}
	    } else {
		cm.sendOk("Thank you!!");
	    }
	    break;
	case 920010800:
	    cm.sendNext("请你打死种子，种在两边的盆子上，把黑色的食人花打死，BOSS就出来了！然后把BOSS打死获得特别奇怪的种子，把特别奇怪的种子，种在盆子上，长出草，用普通攻击打死草获得生命种子，然后出去，把生命草丢在女神像的中间！"); 
	    break;
	case 920010900:
	    cm.sendNext("这是塔的监狱。在这里你可以找到一些好吃的东西。"); 
	    break;
	case 920011000:
	    cm.sendNext("这是塔楼的隐藏空间。在这里你可以找到一些好吃的东西。"); 
	    break;
    }
    cm.dispose();
}

function clear() {
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
}