/* global cm */
var 爱心 = "";
var 音符 = "#fEffect/CharacterEff/1022223/4/0#";
var 小雪花 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var 爱心1 = "#fEffect/CharacterEff/1032063/0/0#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 美化new = "#fUI/UIWindow/Quest/icon5/1#";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
			text ="请选择你要的强化方式：\r\n";
			//text +="#L0##b材料强化 增加随机值#l\r\n";
			//text +="#L1#点券强化 增加随机值#l\r\n";
			text +="#r#L2#材料强化 增加砸卷次数#l\r\n";
			text +="#L3#点卷强化 增加砸卷次数#l";
            cm.sendSimple(text);
        } else if (selection == 0) {//材料强化 增加随即2-5
		
           cm.openNpc(9900004,822);
		
        } else if (selection == 1) {//点卷强化 增加随机2-5
            cm.openNpc(9900004,821);
			 } else if (selection == 2) {//材料强化 杂卷
            cm.openNpc(9900004,823);
	    } else if (selection == 3) {//强化 砸卷  点卷
            cm.openNpc(9900004,820);
		} else if (selection == 258) {//
            cm.openNpc(9310085,0);
		} else if (selection == 455) {//
            cm.openNpc(9900004,455)
		} else if (selection == 483) {//
            cm.openNpc(9900004,483);
		} else if (selection == 484) {//
            cm.openNpc(9900004,484);
		} else if (selection == 485) {//
            cm.openNpc(9900004,485);	
		} else if (selection == 486) {//
            cm.openNpc(9900004,486);				
        } else if (selection == 3) { //
            cm.openNpc(9900004,3);
		} else if (selection == 209) { //
            cm.openNpc(9900004,209);
		} else if (selection == 211) { //
            cm.openNpc(9900004,211);
		} else if (selection == 210) { //
            cm.openNpc(9900004,210);
		} else if (selection == 1009) { //
            cm.openNpc(9900004,82);
        } else if (selection == 4) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 5) {//
            cm.openNpc(9900004,5);
        } else if (selection == 6) {//
            cm.openNpc(9900004,6);
        } else if (selection == 7) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 8) {//
            cm.openNpc(9900004,7);
        } else if (selection == 9) {//
            cm.openNpc(9900004,9);
        } else if (selection == 10) {//
            cm.openNpc(9900004,10);
        } else if (selection == 11) {//
            cm.openShop(97);//NPCID是：2040051
            cm.dispose();
        } else if (selection == 12) {//
            cm.openShop(30);//NPCID:1200002
            cm.dispose();
        } else if (selection == 13) {//
            cm.openShop(39);//NPCID:2070002墨铁
            cm.dispose();
        } else if (selection == 14) {//
            cm.openNpc(9900004,14);
        } else if (selection == 15) {//
            cm.openNpc(9900004,15);
        } else if (selection == 16) {//
	    cm.openNpc(9900004,16);
               /*if (cm.getbossmap() == 0){
                   cm.sendOk("看来你没有加入过挑战boss的行列！");
                   cm.dispose();
                } else{
                   cm.warp(cm.getbossmap());
                   cm.dispose();
                }*/
        } else if (selection == 17) {//
            cm.openNpc(9900004,17);
		} else if (selection == 208) {//
            cm.openNpc(9900004,208);
        } else if (selection == 18) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 19) {//
            cm.openNpc(9900004,19);
        } else if (selection == 20) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
} else if (selection == 112) {//
cm.openNpc(9010009,0);
} else if (selection == 115) {//
cm.warp(209000001,0);
			cm.dispose();

		} else if (selection == 111) {//
		
			cm.warp(910000000,0);
			cm.dispose();


        } else if (selection == 1000) {//
            cm.openNpc(9900004, 1000);
        } else if (selection == 1001) {//
            cm.openNpc(9900004, 1001);
        } else if (selection == 1002) {//
            cm.刷新地图();
            cm.dispose();
        } else if (selection == 1003) {//
            cm.刷新状态();
            cm.dispose();
        } else if (selection == 1004) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 1005) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 1006) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 1007) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 1008) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 1009) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 1010) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 1011) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 1012) {//
            cm.openNpc(9900004, 78);
        } else if (selection == 1013) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 1014) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        } else if (selection == 1015) {//
            cm.sendOk("暂不开放，请等待功能完成");
            cm.dispose();
        }
    }
}



