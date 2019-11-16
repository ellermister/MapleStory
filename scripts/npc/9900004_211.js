var 正在进行中 = "#fUI/UIWindow/Quest/Tab/enabled/1#";
var 完成 = "#fUI/UIWindow/Quest/Tab/enabled/2#";
var 正在进行中蓝 = "#fUI/UIWindow/MonsterCarnival/icon1#";
var 完成红 = "#fUI/UIWindow/MonsterCarnival/icon0#";
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
            for (i = 0; i < 10; i++) {
                text += "";
            }
			text += "\t累计在线时间可领取奖励。 \r\n\t\r\n"
			//text += "#L1##r领取永久雇佣商人！#v5030001#x1#l\r\n\r\n\r\n\r\n"//3
				
			/*if(cm.getPlayer().getGamePoints() >= 60 && cm.getBossLog("在线奖励") == 0){
					text += "#L1##r"+完成红+"当天在线时间超过60分钟！"+完成+"#v5030001#x1限时：1天#l\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 60 && cm.getBossLog("在线奖励") > 0){
					text += ""+完成红+"#r当天在线时间超过60分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r当天在线时间超过60分钟！#l"+正在进行中+"\r\n\r\n"//3
			}*/
			
			if(cm.getPlayer().getGamePoints() >= 60 && cm.getBossLog("在线奖励") == 0){
					text += "#L2##r"+完成红+"在线时间超过60分钟！"+完成+"#v1122017#x1限时：1天.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 60 && cm.getBossLog("在线奖励") > 0){
					text += ""+完成红+"#r在线时间超过60分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过60分钟！#l"+正在进行中+"#v1122017#x1限时：1天\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 120 && cm.getBossLog("在线奖励") == 1){
					text += "#L3##r"+完成红+"在线时间超过120分钟！"+完成+"#v2000019#x50.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 120 && cm.getBossLog("在线奖励") > 1){
					text += ""+完成红+"#r在线时间超过120分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过120分钟！#l"+正在进行中+"#v2000019#x50\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 180 && cm.getBossLog("在线奖励") == 2){
					text += "#L4##r"+完成红+"在线时间超过180分钟！"+完成+"#v2022109#x2.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 180 && cm.getBossLog("在线奖励") > 2){
					text += ""+完成红+"#r在线时间超过180分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过180分钟！#l"+正在进行中+"#v2022109#x2\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 240 && cm.getBossLog("在线奖励") == 3){
					text += "#L5##r"+完成红+"在线时间超过240分钟！"+完成+"#v5072000#x2限时：1天#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 240 && cm.getBossLog("在线奖励") > 3){
					text += ""+完成红+"#r在线时间超过240分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过240分钟！#l"+正在进行中+"#v5072000#x2\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 300 && cm.getBossLog("在线奖励") == 4){
					text += "#L6##r"+完成红+"在线时间超过300分钟！"+完成+"#v4170011#x2.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 300 && cm.getBossLog("在线奖励") > 4){
					text += ""+完成红+"#r在线时间超过300分钟！#l"+完成+"\r\n\r\n"//3 
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过300分钟！#l"+正在进行中+"#v4170011#x2\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 360 && cm.getBossLog("在线奖励") == 5){
					text += "#L7##r"+完成红+"在线时间超过360分钟！"+完成+"#v4170005#x2.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 360 && cm.getBossLog("在线奖励") > 5){
					text += ""+完成红+"#r在线时间超过360分钟！#l"+完成+"\r\n\r\n"//3 
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过360分钟！#l"+正在进行中+"#v4170005#x2\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 420 && cm.getBossLog("在线奖励") == 6){
					text += "#L8##r"+完成红+"在线时间超过420分钟！"+完成+"#v4031138#x100w.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 420 && cm.getBossLog("在线奖励") > 6){
					text += ""+完成红+"#r在线时间超过420分钟！#l"+完成+"\r\n\r\n"//3 
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过420分钟！#l"+正在进行中+"#v4031138#x100w\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 600 && cm.getBossLog("在线奖励") == 7){
					text += "#L9##r"+完成红+"在线时间超过600分钟！"+完成+"#v4001126#x250.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 600 && cm.getBossLog("在线奖励") > 7){
					text += ""+完成红+"#r在线时间超过600分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过600分钟！#l"+正在进行中+"#v4001126#x250\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 720 && cm.getBossLog("在线奖励") == 8){
					text += "#L10##r"+完成红+"在线时间超过720分钟！"+完成+"#v2340000#x5.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 720 && cm.getBossLog("在线奖励") > 8){
					text += ""+完成红+"#r在线时间超过720分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过720分钟！#l"+正在进行中+"充值币20余额\r\n\r\n"//3
			}
            cm.sendSimple(text);
        } else if (selection == 1) {
			if(cm.haveItem(5030001, 1)){
            cm.sendOk("你已经领取过了。无法重新领取！");
            cm.dispose();
			}else if (cm.haveItem(5030000, 1)){
            cm.sendOk("你已经领取过了。无法重新领取！");
            cm.dispose();
			}else{
			cm.gainItem(5030001, 1);//
			cm.setBossLog("在线奖励");
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取永久雇佣商人！");
            cm.dispose();
			}
        } else if (selection == 2) {
			
			cm.gainItem(1122017, 1, 1);//精灵吊坠
			cm.setBossLog("在线奖励");
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了60分钟在线奖励！精灵吊坠30%经验1天.");
            cm.dispose();
			
			
        } else if (selection == 3) {
			cm.gainItem(2000019, 50, 1);//超级药水
			cm.setBossLog("在线奖励");
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了120分钟在线奖励！超级药水50个.");
            cm.dispose();
        } else if (selection == 4) {
			cm.gainItem(2022109, 2);//九灵的气息
			cm.setBossLog("在线奖励");
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了180分钟在线奖励！九灵的气息2个.");
            cm.dispose();
        } else if (selection == 5) {
			cm.gainItem(5072000, 2, 1);//喇叭
			cm.givePartyItems(5590000,-1,true);
			cm.setBossLog("在线奖励");
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了240分钟在线奖励！高质地喇叭2个.");
            cm.dispose();
        } else if (selection == 6) {
			cm.gainItem(4170011, 2);//白蛋
			cm.setBossLog("在线奖励");
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了300分钟在线奖励！白蛋2个.");
            cm.dispose();
        } else if (selection == 7) {
			cm.gainItem(4170005, 2);//黄蛋
			cm.setBossLog("在线奖励");
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了360分钟在线奖励！黄蛋2个.");
            cm.dispose();
        } else if (selection == 8) {
			cm.gainItem(5150040, 1);//蓝蛋
cm.gainMeso(+1000000); //加减金币
			cm.setBossLog("在线奖励");
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了420分钟在线奖励！奖励100W金币.");
            cm.dispose();
		} else if (selection == 9) {
			cm.gainItem(4001126, 250);//
			cm.setBossLog("在线奖励");
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了600分钟在线奖励！枫叶250个.");
            cm.dispose();
		} else if (selection == 10) {
				cm.setmoneyb(+20);
			cm.setBossLog("在线奖励");
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了720分钟在线奖励！充值币20余额.");
            cm.dispose();	
		}
    }
}



