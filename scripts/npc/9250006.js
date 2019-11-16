var 星星 = "#fEffect/CharacterEff/1114000/2/0#";
var 爱心 = "#fEffect/CharacterEff/1022223/4/0#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 正方形 = "#fUI/UIWindow/Quest/icon3/6#";
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
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
			text += "#e#b欢迎来到海盗副本BOSS地图\r\n"
            text += ""+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+"\r\n"
            text += "#L1##r" + 蓝色箭头 + "召唤大金鱼\r\n\r\n"//3
            text += "#L2##r" + 蓝色箭头 + "获取奖励\r\n\r\n"//3
            //text += "#L3##r" + 蓝色箭头 + "挑战地狱船长#g>>>>>>#b#v4001013#出处\r\n\r\n"//3
            //text += "#L4##r" + 蓝色箭头 + "挑战海之魔女#g>>>>>>#b#v4001011#出处\r\n\r\n"//3
            text += "#L5##r" + 蓝色箭头 + "直接送我离开---没有任何奖励\r\n\r\n"//3
            text += ""+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+"\r\n"
           // text += ""+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+"\r\n"
            //text += "#L6##d" + 红色箭头 + "制作#v4031497#1个\t需要：#v4000235#3个\r\n\r\n"//3
            //text += "#L7##d" + 红色箭头 + "制作#v4031497#10个\t需要：#v4000235#30个\r\n\r\n"//3
            //text += "#L8##d" + 红色箭头 + "制作#v4031497#1个\t需要：#v4000243#3个\r\n\r\n"//3
            //text += "#L9##d" + 红色箭头 + "制作#v4031497#10个\t需要：#v4000243#30个\r\n\r\n"//3
            //text += ""+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+"\r\n"
            cm.sendSimple(text);
        } else if (selection == 1) { //月妙组队副本
			if(cm.haveItem(4031551,1)){ //物品条件
                            cm.removeAll(4031551); 
                            //cm.gainItem(4031551,-1);
			    cm.spawnMobOnMap(9600074,1,-18,238,925100500);
							    cm.spawnMobOnMap(9400592,1,1940,276,803001200);
		            //cm.summonMobter(9400633, 1);
                            //cm.summonMob(9400633,180000,5250,1);
               //cm.喇叭(2, "【组队任务 - 海盗副本】[" + cm.getPlayer().getName() + "]召唤出一只 大金鱼，你们自求多福吧！！");
			   			Packages.handling.world.World.Broadcast.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(11, cm.getClient().getChannel(), "『组队任务 - 海盗副本』" + " : " + "[" + cm.getChar().getName() + "]召唤出一只[大金鱼]，你们自求多福吧！！"));
			   cm.dispose();
		   }else{
			   cm.sendOk("需要搜集#b1个 #v4031551#");
			   cm.dispose();
		   }
        } else if (selection == 2) {  //废弃组队副本
			if(cm.haveItem(4031473,1)){ //物品条件
                            cm.removeAll(4031473); 
                            //cm.gainItem(4031497,-1);
		cm.gainItem(4170009, 1);
		cm.gainItem(4001322, 2);
		cm.warp(925100600,0);
		cm.gainExp(100000);
//cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功击败【大金鱼】，通关海盗副本，获得奖励！！");
			   			Packages.handling.world.World.Broadcast.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(12, cm.getClient().getChannel(), "『组队任务 - 海盗副本』" + " : " + "[" + cm.getChar().getName() + "]成功击败【大金鱼】，通关海盗副本，获得奖励！！"));
			   cm.dispose();
		   }else{
			   cm.sendOk("需要搜集#b1个 #v4031473#");
			   cm.dispose();
		   }
        } else if (selection == 3) { //玩具组队副本
			if(cm.haveItem(4031497,1)){ //物品条件
                            //cm.removeAll(4032398); 
                            cm.gainItem(4031497,-1);
			    cm.spawnMobOnMap(9400589,1,1940,276,803001200);
		            //cm.summonMobter(9400633, 1);
                            //cm.summonMob(9400633,180000,5250,1);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功开始挑战绯红BOSS副本，召唤出一只【地狱船长】！！");
			   cm.dispose();
		   }else{
			   cm.sendOk("需要搜集#b1个 #v4031497#");
			   cm.dispose();
		   }
        } else if (selection == 4) {//天空组队副本
			if(cm.haveItem(4031497,1)){ //物品条件
                            //cm.removeAll(4032398); 
                            cm.gainItem(4031497,-1);
			    cm.spawnMobOnMap(9400590,1,1940,276,803001200);
		            //cm.summonMobter(9400633, 1);
                            //cm.summonMob(9400633,180000,5250,1);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功开始挑战绯红BOSS副本，召唤出一只【海之魔女】！！");
			   cm.dispose();
		   }else{
			   cm.sendOk("需要搜集#b1个 #v4031497#");
			   cm.dispose();
		   }
        } else if (selection == 5) {//毒物组队副本
            cm.warp(251010404);
            cm.dispose();
        } else if (selection == 6) {//海盗组队副本
            if (!cm.canHold(4031497, 1)) {
                cm.sendOk("您的包裹空间不足.请清理背包！");
                cm.dispose();
            } else if (cm.haveItem(4000235, 3)) {
                cm.gainItem(4000235,-3);
                cm.gainItem(4031497,1);
                cm.sendOk("恭喜你成功兑换#v4031497#X1个！");
                cm.dispose();
            } else {
                cm.sendOk("兑换失败，需要#v4000235#X3个！");
                cm.dispose();
            }
        } else if (selection == 7) {//罗密欧与朱丽叶组队副本
            if (!cm.canHold(4031497, 1)) {
                cm.sendOk("您的包裹空间不足.请清理背包！");
                cm.dispose();
            } else if (cm.haveItem(4000235, 30)) {
                cm.gainItem(4000235,-30);
                cm.gainItem(4031497,10);
                cm.sendOk("恭喜你成功兑换#v4031497#X10个！");
                cm.dispose();
            } else {
                cm.sendOk("兑换失败，需要#v4000235#X30个！");
                cm.dispose();
            }
        } else if (selection == 8) {//遗址公会对抗战
            if (!cm.canHold(4031497, 1)) {
                cm.sendOk("您的包裹空间不足.请清理背包！");
                cm.dispose();
            } else if (cm.haveItem(4000243, 3)) {
                cm.gainItem(4000243,-3);
                cm.gainItem(4031497,1);
                cm.sendOk("恭喜你成功兑换#v4031497#X1个！");
                cm.dispose();
            } else {
                cm.sendOk("兑换失败，需要#v4000243#X3个！");
                cm.dispose();
            }
        } else if (selection == 9) {//英语学院副本
            if (!cm.canHold(4031497, 1)) {
                cm.sendOk("您的包裹空间不足.请清理背包！");
                cm.dispose();
            } else if (cm.haveItem(4000243, 30)) {
                cm.gainItem(4000243,-30);
                cm.gainItem(4031497,10);
                cm.sendOk("恭喜你成功兑换#v4031497#X10个！");
                cm.dispose();
            } else {
                cm.sendOk("兑换失败，需要#v4000243#X30个！");
                cm.dispose();
            }
        } else if (selection == 11) {//千年树精王遗迹
            cm.warp(541020700);
            cm.dispose();
            //cm.openNpc(9310057, 0);
        } else if (selection == 12) {//人偶师BOSS挑战
            cm.warp(910510001);
            cm.dispose();
            //cm.openNpc(9310057, 0);
        } else if (selection == 13) {//绯红
            if (cm.getLevel() < 120 ) {  
            cm.sendOk("本地图限制等级120级。您的能力没有资格挑战绯红副本");
                cm.dispose();
              }else{
			cm.warp(803001200);  
				cm.dispose();
                return;
	      } 
        } else if (selection == 14) {//御姐
            if (cm.getLevel() < 140 ) {  
            cm.sendOk("本地图限制等级140级。您的能力没有资格挑战御姐副本");
                cm.dispose();
              }else{
			cm.warp(803000505);  
                cm.dispose();
                return;
	      } 
        } else if (selection == 10) {//.怪物嘉年华
            cm.warp(980000000);
            cm.dispose();
            //cm.openNpc(9310057, 0);
        }
    }
}


