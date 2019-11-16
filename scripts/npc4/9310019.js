var 星星 = "#fEffect/CharacterEff/1114000/2/0#";
var 爱心 = "#fEffect/CharacterEff/1022223/4/0#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 正方形 = "#fUI/UIWindow/Quest/icon3/6#";
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var ttt ="#fUI/UIWindow.img/Quest/icon9/0#";
var xxx ="#fUI/UIWindow.img/Quest/icon8/0#";
var sss ="#fUI/UIWindow.img/QuestIcon/3/0#";
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
            //text += ""+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+"\r\n"
			text += "\t\t\t  #e欢迎来到#b世纪冒险岛 #k!#n\r\n"
            //text += ""+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+"\r\n"
            text += "#L1##e#d" + 蓝色箭头 + "Lv10.月妙组队副本#l#L2##d" + 蓝色箭头 + "Lv21.废弃组队副本#l\r\n\r\n"//3
            text += "#L3##d" + 蓝色箭头 + "Lv35.玩具组队副本#l#L4##d" + 蓝色箭头 + "Lv51.天空组队副本#l\r\n\r\n"//3
            text += "#L5##d" + 蓝色箭头 + "Lv51.毒物组队副本#l#L6##d" + 蓝色箭头 + "Lv105.海盗组队副本#l\r\n\r\n"//3
            text += "#L7##d" + 蓝色箭头 + "Lv71.罗密欧与朱丽叶组队副本#l\r\n\r\n"//3
            text += "#L9##d" + 蓝色箭头 + "英语学院副本#l\r\n\r\n"//3
            text += "#L10##d" + 蓝色箭头 + "怪物嘉年华(组队对抗副本.最低2V2)#l\r\n\r\n"//3
            text += "#L8##d" + 蓝色箭头 + "遗址公会对抗战(家族副本)#l\r\n\r\n"//3
			//text += "#L15##d" + 蓝色箭头 + "远征闹钟(100-200)#l\r\n\r\n"//3
            //text += ""+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+爱心+"\r\n"
	    text += " #L11#"+ttt+""+xxx+"远征闹钟(100级)#l#b#L12#"+ttt+""+xxx+"远征扎昆(120级)#l#b\r\n";

	    text += " #L13#"+ttt+""+xxx+"远征大树(130级)#l#b#L14#"+ttt+""+xxx+"远征妖僧(140级)#l#b\r\n";

            text += " #L15#"+ttt+""+xxx+"远征黑龙(150级)#l#b#L16#"+ttt+""+xxx+"远征鱼王(120级)#l#b\r\n\r\n";

            //text += "#L11##dLv120.千年树精王遗迹Ⅱ#l\r\n\r\n"//3
            //text += "#L12##dLv130.人偶师BOSS挑战#l\r\n\r\n"//3
            //text += "" + 蓝色箭头 + "#L13##rLv120级以上.绯红副本挑战#l\r\n\r\n"//3
            //text += "" + 蓝色箭头 + "#L14##rLv140级以上.御姐副本挑战#l\r\n\r\n"//3
            //text += ""+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+星星+"\r\n"
            cm.sendSimple(text);
        } else if (selection == 1) { //月妙组队副本
            cm.openNpc(1012112, 0);
        } else if (selection == 2) {  //废弃组队副本
            cm.openNpc(9020000, 0);
        } else if (selection == 3) { //玩具组队副本
            cm.openNpc(2040034, 0);
        } else if (selection == 4) {//天空组队副本
            cm.openNpc(2013000, 0);
        } else if (selection == 5) {//毒物组队副本
            //cm.warp(300030100);
			cm.warpParty(300030100);
            cm.dispose();
        } else if (selection == 6) {//海盗组队副本
            cm.openNpc(2094000, 0);
        } else if (selection == 7) {//罗密欧与朱丽叶组队副本
			//cm.warp(261000011);
			cm.warpParty(261000011);
            cm.dispose();
        } else if (selection == 8) {//遗址公会对抗战
			cm.warp(101030104);
            cm.dispose();
        } else if (selection == 9) {//英语学院副本
            cm.warp(702090400);
            cm.dispose();
            //cm.openNpc(9310057, 0);
        } else if (selection == 11) {//闹钟
            cm.warp(220080000);
            cm.dispose();
            //cm.openNpc(9310057, 0);
        } else if (selection == 12) {//扎
            cm.warp(211042400);
            cm.dispose();
            //cm.openNpc(9310057, 0);
        } else if (selection == 13) {//大树
            if (cm.getLevel() < 130 ) {  
            cm.sendOk("本地图限制等级130级。您的能力没有资格挑战副本");
                cm.dispose();
              }else{
			cm.warp(541020700);  
				cm.dispose();
                return;
	      } 
        } else if (selection == 14) {//妖僧
            if (cm.getLevel() < 140 ) {  
            cm.sendOk("本地图限制等级140级。您的能力没有资格挑战副本");
                cm.dispose();
              }else{
			cm.warp(702070400);  
                cm.dispose();
                return;
	      }
        } else if (selection == 15) {//黑龙
            if (cm.getLevel() < 150 ) {  
            cm.sendOk("本地图限制等级150级。您的能力没有资格挑战副本");
                cm.dispose();
              }else{
			cm.warp(240050400);  
                cm.dispose();
                return;
	      } 
        } else if (selection == 16) {//鱼王
            if (cm.getLevel() < 120 ) {  
            cm.sendOk("本地图限制等级120级。您的能力没有资格挑战副本");
                cm.dispose();
              }else{
			cm.warp(230040420);  
                cm.dispose();
                return;
	      }
        } else if (selection == 10) {//.怪物嘉年华
            cm.warp(980000000);
            cm.dispose();
            //cm.openNpc(9310057, 0);
        } else if (selection == 15) {//.阿里安特
            cm.openNpc(2101018, 0);
        }
    }
}


