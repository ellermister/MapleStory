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
            text += "#e#d"+爱心1+"   "+爱心1+"  #d萌新冒险岛#k  "+爱心1+"   "+爱心1+"#n\r\n"
			text +="#r[更新公告] 每日副本，废弃，月秒，玩具，天空总合15次可获得30000点卷#k感谢支持~!\r\n";
			text += "#d------------------------------------------  [ GM遗言 ]\r\n#k";
            text += "#d" + 感叹号 + "Hi~#b" + cm.getName() + "#k#n,#d您今天已在线了：#b" + cm.getGamePoints() + "#d分钟,请注意休息哦~!#k#n\r\n"
            text += "#d你现在资产有#b " + cm.getPlayer().getCSPoints(1) + " #d点卷#n#b " + cm.getPlayer().getCSPoints(2) + " #d抵用卷 和 "+cm.getmoneyb()+"充值币\r\n副本完成了: "+cm.getBossLog("fb")+"次！\r\n"
			text += "#d------------------------------------------  [实用功能]\r\n#k";
            text += "#b#L111#" + 小雪花 + "自由市场#l#L112#" + 小雪花 + "每日跑商#l#L1#" + 小雪花 + "新人礼包#l#L2#" + 小雪花 + "装备合成#l\r\n"
			text += "#L208#" + 小雪花 + "公婆戒指#l#L1111#" + 小雪花 + "玩家排名#l#L258#" + 小雪花 + "帅气坐骑#l\r\n"
            text += "#L6#" + 小雪花 + "中介服务#l#L486#" + 小雪花 + "特色主线#l#L115#"
            text += "#L3#" + 小雪花 + "等级奖励#l#L10#" + 小雪花 + "新点卷商城" + 美化new + "#l\r\n\r\n"
			text += "#d------------------------------------------  [副本活动]";
            text += "#b#L11#" + 音符 + "快捷消耗商店#l#L12#" + 音符 + "功能道具商店#l#L13#" + 音符 + "低级装备商店#l\r\n"
            text += "#L14#" + 音符 + "查看本服副本#l#L15#" + 音符 + "副本征集喇叭#l#L16#" + 音符 + "重返BOSS挑战#l\r\n"
			text += "#L482#" + 音符 + "平民搬砖系统#l#L483#" + 音符 + "装备进阶强化#l#L484#" + 音符 + "BOSS战利品#l\r\n"
            text += "#L17#" + 音符 + "查询地图爆率#l#L19#" + 音符 + "道具回收系统#l#L1012#" + 音符 + "精灵吊坠#l\r\n"
	    text += "#L1000#" + 音符 + "快捷传送#l\t#L1001#" + 音符 + "快速转职#l    #L1009#" + 音符 + "装备强化#l\r\n\r\n"
            if (cm.getPlayer().isGM()) {
                text += " \r\n\t\t#r以下功能，仅管理员可见，普通玩家看不见\r\n"
                text += "#L1000#快捷传送#l\t#L1001#快速转职#l\r\n"
                text += "#L1002#刷新当前地图#l#L1003#刷新个人状态#l#L1004#查看管理员指令#l\r\n"
                text += "#L1005#重载副本#l#L1006#重载爆率#l#L1007#重载反应堆#l#L1008#重载传送点#l\r\n"
                text += "#L1009#重载任务#l#L1010#重载商店#l#L1011#重载封包头#l\r\n"
            }
            cm.sendSimple(text);
        } else if (selection == 1) {//
            if (cm.getgrname() <= 0 && cm.getLevel() >= 10) {
                cm.setgrname(1);
                cm.gainItem(5150040, 5);//皇家理发卷
                cm.gainItem(5151001, 5);//射手村染色高级会员卡
                cm.gainItem(5152001, 5);//射手村整形手术高级会员卡
                cm.gainItem(5153000, 5);//射手村护肤中心会员卡
                cm.gainItem(5072000, 5);//高质地喇叭
		cm.gainItem(4000463, 10);//老公老婆戒指
		cm.gainItem(1112446, 1);//老公老婆戒指
		cm.gainItem(1112724, 10,10,10,10,0,0,10,0,0,0,0,0,0,0);//我是新手戒指
                cm.gainItem(1142358,50,50,50,50,200,200,10,0,0,0,0,0,15,20 );//新手勋章
                cm.gainDY(30000);
                //cm.getPlayer().modifyCSPoints(1, 100000);
                cm.gainMeso(30000000);
                cm.喇叭(1, "萌萌的新人"+cm.getPlayer().getName()+"领取了新人礼包");
                cm.sendOk("恭喜你成功领取礼包，列表如下：\r\n#v5150040# x1 #v5151001# x1\r\n#v5152001# x1 #v5153000# x1\r\n#v4000463# x10\r\n#v5072000# x5\r\n#v1142358# x1\r\n抵用卷 x30000 游戏币 x3000000");
                cm.dispose();
            } else {
                cm.sendOk("领取失败了！\r\n可能的原因1：等级低于10级无法领取！\r\n可能的原因2：你已经领取过一次了,就无法再次领取了！\r\n如有疑问，请联系客服!");
                cm.dispose();
            }
        } else if (selection == 2) {//
            cm.openNpc(9900004,2);
			 } else if (selection == 1111) {//
            cm.openNpc(9040004,0);
	    } else if (selection == 482) {//
            cm.openNpc(9900004,482);
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



