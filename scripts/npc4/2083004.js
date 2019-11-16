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
			text += "\t\t\t欢迎来到#b牵绊冒险岛 #k!#n\r\n"
            text += "#L1##rLv120-200挑战暗黑龙王\r\n\r\n"//3
            text += "#L2##d我点错了\r\n\r\n"//3
            //text += "#L5##dLv100-200.毒物组队副本#l#L6##dLv55-200.海盗组队副本#l\r\n\r\n"//3
            //text += "#L7##dLv90以上.罗密欧与朱丽叶组队副本#l\r\n\r\n"//3
            //text += "#L9##dLv10级以上.英语学院副本#l\r\n\r\n"//3
            //text += "#L10##dLv30-200.怪物嘉年华(组队对抗副本.最低2V2)#l\r\n\r\n"//3
            //text += "#L8##d遗址公会对抗战(家族副本)#l\r\n\r\n"//3
            //text += "#L11##dLv120.千年树精王遗迹Ⅱ#l\r\n\r\n"//3
            //text += "#L12##dLv130.人偶师BOSS挑战#l\r\n\r\n"//3
            //text += "#L13##dLv120.绯红副本挑战#l\r\n\r\n"//3
            //text += "#L14##dLv140.御姐副本挑战#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) { //月妙组队副本
            if (cm.getLevel() < 120 ) {  
            cm.sendOk("本地图限制等级120级。您的能力没有资格挑战暗黑龙王");
                cm.dispose();
       } else if (cm.itemQuantity(5220006) < 1) {
       cm.sendOk("没有#v5220006#无法挑战黑龙，请到商城购买吧");
                cm.dispose();
              }else{
                        cm.gainItem(5220006,-1);
			cm.warp(240060200);
			//cm.givePartyBossLog("3");
			//cm.setbosslog(3);//BOSS重返  
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功进入暗黑龙王洞穴，开始挑战暗黑龙王！！");
				cm.dispose();
                return;
	      } 
        } else if (selection == 2) {  //废弃组队副本
            cm.sendOk("等你准备好了，再来找我吧！");
                cm.dispose();
        } else if (selection == 3) { //玩具组队副本
            cm.openNpc(2040034, 0);
        } else if (selection == 4) {//天空组队副本
            cm.openNpc(2013000, 0);
        } else if (selection == 5) {//毒物组队副本
            cm.openNpc(2133000, 0);
        } else if (selection == 6) {//海盗组队副本
            cm.openNpc(2094000, 0);
        } else if (selection == 7) {//罗密欧与朱丽叶组队副本
			cm.warp(261000011);
            cm.dispose();
        } else if (selection == 8) {//遗址公会对抗战
			cm.warp(101030104);
            cm.dispose();
        } else if (selection == 9) {//英语学院副本
            cm.warp(702090400);
            cm.dispose();
            //cm.openNpc(9310057, 0);
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


