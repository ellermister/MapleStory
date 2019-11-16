var 正在进行中 = "#fUI/UIWindow/Quest/Tab/enabled/1#";
var 完成 = "#fUI/UIWindow/Quest/Tab/enabled/2#";
var 正在进行中蓝 = "#fUI/UIWindow/MonsterCarnival/icon1#";
var 完成红 = "#fUI/UIWindow/MonsterCarnival/icon0#";
var 爱心 = "#fEffect/CharacterEff/1022223/4/0#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 正方形 = "#fUI/UIWindow/Quest/icon3/6#";
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 蓝色角点 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var 正在进行中 = "#fUI/UIWindow/Quest/Tab/enabled/1#";
var 完成 = "#fUI/UIWindow/Quest/Tab/enabled/2#";
var 正在进行中蓝 = "#fUI/UIWindow/MonsterCarnival/icon1#";
var 完成红 = "#fUI/UIWindow/MonsterCarnival/icon0#";
var 大心 = "#fEffect/CharacterEff/1051295/0/0#";
var 琴符 = "#fUI/UIWindow/Quest/icon0#";
var 小雪花 = "#fEffect/CharacterEff/1003393/0/0#";
var 音符 = "#fEffect/CharacterEff/1032063/0/0#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 爱心1 = "#fEffect/CharacterEff/1032063/0/0#";


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
			text += "   "+爱心1+"    "+爱心+"#b萌新主线任务列表#k"+爱心+"    "+爱心1+"#n\r\n"   
			
			if(cm.getgrname() == 0){
					text += "      #L1#"+音符+"#b主线任务1(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 0){
					text += ""+爱心+"#r#b主线任务1#n"+爱心+"#l"+完成+"#k\r\n"//3
			}
			
			if(cm.getgrname() == 1 && cm.getLevel() > 14){
					text += "      #L2#"+音符+"#b主线任务2(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 1 && cm.getLevel() > 14){
					text += ""+爱心+"#r#b主线任务2#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.15#k)主线任务2   \r\n"//3
			}
			
			if(cm.getgrname() == 2 && cm.getLevel() > 20){
					text += "      #L3#"+音符+"#b主线任务3(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 2 && cm.getLevel() > 20){
					text += ""+爱心+"#r#b主线任务3#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.21#k)主线任务3   \r\n"//3
			}
			
			if(cm.getgrname() == 3 && cm.getLevel() > 29){
					text += "      #L4#"+音符+"#b主线任务4(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 3 && cm.getLevel() > 29){
					text += ""+爱心+"#r#b主线任务4#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.30#k)主线任务4   \r\n"//3
			}
			
			if(cm.getgrname() == 4 && cm.getLevel() > 34){
					text += "      #L5#"+音符+"#b主线任务5(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 4 && cm.getLevel() > 34){
					text += ""+爱心+"#r#b主线任务5#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.35#k)主线任务5   \r\n"//3
			}
			
			if(cm.getgrname() == 5 && cm.getLevel() > 39){
					text += "      #L6#"+音符+"#b主线任务6(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 5 && cm.getLevel() > 39){
					text += ""+爱心+"#r#b主线任务6#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.40#k)主线任务6   \r\n"//3
			}
			
			
			if(cm.getgrname() == 6 && cm.getLevel() > 44){
					text += "      #L7#"+音符+"#b主线任务7(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 6 && cm.getLevel() > 44){
					text += ""+爱心+"#r#b主线任务7#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.45#k)主线任务7   \r\n"//3
			}
			if(cm.getgrname() == 7 && cm.getLevel() > 49){
					text += "      #L8#"+音符+"#b主线任务8(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 7 && cm.getLevel() > 49){
					text += ""+爱心+"#r#b主线任务8#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.50#k)主线任务8   \r\n"//3
			}
			
			
			if(cm.getgrname() == 8 && cm.getLevel() > 59){
					text += "      #L9#"+音符+"#b主线任务9(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 8 && cm.getLevel() > 59){
					text += ""+爱心+"#r#b主线任务9#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.60#k)主线任务9   \r\n"//3
			}
			
			if(cm.getgrname() == 9 && cm.getLevel() > 64){
					text += "      #L10#"+音符+"#b主线任务10(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 9 && cm.getLevel() > 64){
					text += ""+爱心+"#r#b主线任务10#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.65#k)主线任务10   \r\n"//3
			}
			
			if(cm.getgrname() == 10 && cm.getLevel() > 69){
					text += "      #L11#"+音符+"#b主线任务11(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 10 && cm.getLevel() > 69){
					text += ""+爱心+"#r#b主线任务11#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.70#k)主线任务11   \r\n"//3
			}
			
			if(cm.getgrname() == 11 && cm.getLevel() > 74){
					text += "      #L12#"+音符+"#b主线任务12(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 11 && cm.getLevel() > 74){
					text += ""+爱心+"#r#b主线任务12#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.75#k)主线任务12   \r\n"//3
			}
			
			if(cm.getgrname() == 12 && cm.getLevel() > 79){
					text += "      #L13#"+音符+"#b主线任务13(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 12 && cm.getLevel() > 79){
					text += ""+爱心+"#r#b主线任务13#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.80#k)主线任务13   \r\n"//3
			}
			
			if(cm.getgrname() == 13 && cm.getLevel() > 89){
					text += "      #L14#"+音符+"#b主线任务14(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 13 && cm.getLevel() > 89){
					text += ""+爱心+"#r#b主线任务14#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.90#k)主线任务14   \r\n"//3
			}
			
			if(cm.getgrname() == 14 && cm.getLevel() > 99){
					text += "      #L15#"+音符+"#b主线任务15(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 14 && cm.getLevel() > 99){
					text += ""+爱心+"#r#b主线任务15#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.100#k)主线任务15   \r\n"//3
			}
			
			if(cm.getgrname() == 15 && cm.getLevel() > 109){
					text += "      #L16#"+音符+"#b主线任务16(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 15 && cm.getLevel() > 109){
					text += ""+爱心+"#r#b主线任务16#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.110#k)主线任务16   \r\n"//3
			}
			
			if(cm.getgrname() == 16 && cm.getLevel() > 119){
					text += "      #L17#"+音符+"#b主线任务17(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 16 && cm.getLevel() > 119){
					text += ""+爱心+"#r#b主线任务17#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.120#k)主线任务17   \r\n"//3
			}
			
			if(cm.getgrname() == 17 && cm.getLevel() > 129){
					text += "      #L18#"+音符+"#b主线任务18(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 17 && cm.getLevel() > 129){
					text += ""+爱心+"#r#b主线任务18#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.130#k)主线任务18   \r\n"//3
			}
			
			if(cm.getgrname() == 18 && cm.getLevel() > 139){
					text += "      #L19#"+音符+"#b主线任务19(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 18 && cm.getLevel() > 139){
					text += ""+爱心+"#r#b主线任务19#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.140#k)主线任务19   \r\n"//3
			}
			
			if(cm.getgrname() == 19 && cm.getLevel() > 149){
					text += "      #L20#"+音符+"#b主线任务20(#r可开始#k)#n"+音符+"#l\r\n\r\n"//3
				} else if(cm.getgrname() > 19 && cm.getLevel() > 149){
					text += ""+爱心+"#r#b主线任务20#n"+爱心+"#l"+完成+"#k\r\n"//3
				} else {
					text += ""+琴符+"#b   (#rlv.150#k)主线任务20   \r\n"//3
			}
            cm.sendSimple(text);
        } else if (selection == 1) {
			if (cm.haveItem(4000002,50) && cm.haveItem(4000017,10)){
				cm.gainItem(4000002, -50);//获得物品
				cm.gainItem(4000017, -10);//获得物品
				cm.gainExp(10000);//个人给经验
				cm.gainItem(1442012,40,40,40,40,40,40,40,40,0,0,0,0,0,0);
				cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务1，获得经验值奖励全属性40天空雪板！");
				cm.setgrname(1);
				cm.sendOk("完成了主线任务，获得全属性40天空雪板！");
				cm.dispose();
		}else{

			cm.sendOk(感叹号+"#r欢迎进入主线剧情1。#k\r\n还记得初次来到冒险岛的时候吗？我们从萌新岛一点一滴的故事。\r\n来到明珠港以后，我们不断前行，掉落在一个叫#r（猪的海岸）#k的地方。\r\n请你到那里寻找回忆，并且收集50个#v4000002#10个#v4000017#。\r\n奖励：#v1442012# 全属性40。");
			cm.dispose();
	    }
        } else if (selection == 2) {
		if (cm.haveItem(4000015,50) && cm.haveItem(4000008,50)){
			cm.gainItem(4000015, -50);//获得物品
			cm.gainItem(4000008, -50);//获得物品
			cm.gainMeso(+200000); //加减金币
			 cm.gainExp(50000);//个人给经验
					cm.setgrname(2);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务2，获得经验值奖励20W金币！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{

			cm.sendOk(感叹号+"#r欢迎进入主线剧情2。#k\r\n是在某个深处，让我们停留了无数次，无脑的敲打着键盘。\r\n请到一个叫#r（蚂蚁洞Ⅰ）#k的地方。\r\n收集50个#v4000015#50个#v4000008#。\r\n奖励：#v4031138# 20W。");
			cm.dispose();
	    }
        } else if (selection == 3) {
		if (cm.haveItem(4250602,1)){
			cm.gainItem(4250602,-1);
			cm.gainItem(1142107,5,5,5,5,5,5,1,1,0,0,0,0,0,0);
			cm.setgrname(3);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务3，获得经验值奖励:新手勋章各属性5 攻/魔1！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();	
		}else{

		 cm.sendOk(感叹号+"#r欢迎进入主线剧情3。#k\r\n请到#r（废弃都市寻找女神组队任务）#k，收集一个#v4250602#给我。\r\n奖励：#v1142107# 各属性5 攻/魔1！");
		 cm.dispose();
		
	    }
        } else if (selection == 4) {
			
		if (cm.haveItem(4000106,50) && cm.haveItem(4000107,20)){
			cm.gainItem(4000106, -50);//获得物品
			cm.gainItem(4000107, -20);//获得物品
			cm.gainItem(2022003, 200);//获得物品
			cm.gainItem(2000006, 200);//获得物品
			cm.gainExp(92000);//个人给经验
			cm.setgrname(4);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务4，获得经验值奖励HPMP药水各200！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情4。#k\r\n请到#r（露台大厅）#k收集50个#v4000106#20个#v4000107#给我。\r\n奖励：#v2022003#×200#v2000006#×200。");
			cm.dispose();
	    }
        } else if (selection == 5) {
			
		if (cm.haveItem(4031231,10) && cm.haveItem(4031258,10)){
			cm.gainItem(1082245,5,5,5,5,0,0,2,2,0,0,0,0,0,0);
			cm.gainExp(122000);//个人给经验
			cm.setgrname(5);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务5，获得经验值奖励手套各属性5 攻/魔2！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情5。#k\r\n请到童话村-乌山入口收集#v4031231##v4031258#各十个交给我。\r\n奖励：#v1082245#各属性5 攻/魔2");
			cm.dispose();
	    }
        } else if (selection == 6) {
			if (cm.haveItem(4000276 ,100) && cm.haveItem(4000277 ,50)){
			//cm.gainItem(1142107,5,5,5,5,5,5,1,1,0,0,0,0,0,0);
			cm.gainItem(4000276, -100);//获得物品
			cm.gainItem(4000277, -50);//获得物品
			cm.gainItem(1012101,2,2,2,2,0,0,1,1,0,0,0,0,0,0);
			cm.gainExp(252000);//个人给经验
			cm.setgrname(6);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务6，获得经验值奖励脸饰各属性2 攻/魔1！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情6。#k\r\n请到#r（通天林入口）#k收集100个#v4000276#50个#v4000277#交给我。\r\n奖励：#v1012101#各属性2 攻/魔1");
			cm.dispose();
	    }
        } else if (selection == 7) {
			if (cm.haveItem(4000115 ,50)){
			//cm.gainItem(1142107,5,5,5,5,5,5,1,1,0,0,0,0,0,0);
			cm.gainItem(4000115, -50);//获得物品
			cm.gainItem(1032098,2,2,2,2,0,0,2,2,10,10,5,5,0,0);
			cm.gainExp(412000);//个人给经验
			cm.setgrname(7);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务7，获得经验值奖励耳环各属性2 攻/魔2！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情7。#k\r\n请到#r（时间之路4）#k收集50个#v4000115#交给我。\r\n奖励：#v1032098#各属性2 攻/魔2");
			cm.dispose();
	    }
        } else if (selection == 8) {
			if (cm.haveItem(4000286 ,50) && cm.haveItem(1142107 ,1)){
			//cm.gainItem(1142107,5,5,5,5,5,5,1,1,0,0,0,0,0,0);
			cm.gainItem(4000286, -50);//获得物品
			cm.gainItem(1142107, -1);//获得物品
			cm.gainItem(1142108,6,6,6,6,0,0,2,2,10,10,5,5,0,0);
			cm.gainExp(612000);//个人给经验
			cm.setgrname(8);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务8，获得经验值奖励中级称号各属性6 攻/魔2！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情8。#k\r\n请到#r（初级修炼场）#k收集50个#v4000286#并把#v1142107#交给我。\r\n奖励：#v1142108#各属性6 攻/魔2");
			cm.dispose();
	    }
		} else if (selection == 9) {
			if (cm.haveItem(4000177 ,50) && cm.haveItem(4000025 ,50)){
			//cm.gainItem(1142107,5,5,5,5,5,5,1,1,0,0,0,0,0,0);
			cm.gainItem(4000177, -50);//获得物品
			cm.gainItem(4000025, -50);//获得物品
			cm.gainItem(1102082,5,5,5,5,0,0,2,2,10,10,5,5,0,0);
			cm.gainExp(812000);//个人给经验
			cm.setgrname(9);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务9，获得经验值奖励披风各属性5 攻/魔2！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情9。#k\r\n请到#r（巨人之林）#k收集50个#v4000177#50个#v4000025#交给我。\r\n奖励：#v1102082#各属性5 攻/魔2");
			cm.dispose();
	    }
		} else if (selection == 10) {
			if (cm.haveItem(4000289 ,100)){
			//cm.gainItem(1142107,5,5,5,5,5,5,1,1,0,0,0,0,0,0);
			cm.gainItem(4000289, -100);//获得物品
			cm.gainItem(1113165,2,2,2,2,0,0,2,2,10,10,5,5,0,0);
			cm.gainExp(1512000);//个人给经验
			cm.setgrname(10);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务10，获得经验值奖励戒指各属性2 攻/魔2！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情10。#k\r\n请到#r（妖怪森林）#k收集100个#v4000289#交给我。\r\n奖励：#v1113165#各属性2 攻/魔2");
			cm.dispose();
	    }	
		} else if (selection == 11) {
			if (cm.haveItem(1142004 ,1)){
			cm.gainItem(1142004, -1);//获得物品
			cm.gainItem(1132088,5,5,5,5,0,0,1,1,10,10,5,5,0,0);
			cm.gainExp(1812000);//个人给经验
			cm.setgrname(11);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务11，获得经验值奖励腰带各属性5 攻/魔1！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情11。#k\r\n请完成#r（罗密欧与朱丽叶副本）#k把#v1142004#交给我。\r\n奖励：#v1132088#各属性5 攻/魔1");
			cm.dispose();
	    }
		} else if (selection == 12) {
			if (cm.haveItem(4000226 ,30) && cm.haveItem(4000229 ,30)){
			//cm.gainItem(1142107,5,5,5,5,5,5,1,1,0,0,0,0,0,0);
			cm.gainItem(4000226, -30);//获得物品
			cm.gainItem(4000229, -30);//获得物品
			cm.gainItem(1072718,5,5,5,5,0,0,1,1,10,10,5,5,0,0);
			cm.gainExp(2212000);//个人给经验
			cm.setgrname(12);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务12，获得经验值奖励鞋子各属性5 攻/魔1！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情12。#k\r\n请到#r（神木村西边森林）#k收集30个#v4000226#30个#v4000229#交给我。\r\n奖励：#v1072718#各属性5 攻/魔1");
			cm.dispose();
	    }
		} else if (selection == 13) {
			if (cm.haveItem(4000238 ,50)){
			//cm.gainItem(1142107,5,5,5,5,5,5,1,1,0,0,0,0,0,0);
			cm.gainItem(4000238, -50);//获得物品
			//cm.gainItem(4000229, -100);//获得物品
			//cm.gainItem(1072718,5,5,5,5,0,0,1,1,10,10,5,5,0,0);
			cm.gainExp(2212000);//个人给经验
			cm.gainMeso(+10000000); //加减金币
			cm.setgrname(13);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务13，获得经验值奖励金币1000W！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情13。#k\r\n请到#r（天空之巢路口）#k收集50个#v4000238#交给我。\r\n奖励#v4031138#：1000W");
			cm.dispose();
	    }
		} else if (selection == 14) {
			if (cm.haveItem(4000182 ,100)){
			cm.gainItem(4000182, -100);//获得物品
			cm.gainItem(1022129,5,5,5,5,0,0,1,1,10,10,5,5,0,0);
			cm.gainExp(3212000);//个人给经验
			cm.setgrname(14);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务14，获得经验值奖励眼镜各属性5 攻/魔1！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情14。#k\r\n请到#r（深海峡谷1）#k收集100个#v4000182#交给我。\r\n奖励：#v1022129#各属性5 攻/魔1");
			cm.dispose();
	    }	
		} else if (selection == 15) {
			if (cm.haveItem(1142032 ,1) && cm.haveItem(1142108 ,1)){
			cm.gainItem(1142032, -1);//获得物品
			cm.gainItem(1142108, -1);//获得物品
			cm.gainItem(1142109,7,7,7,7,0,0,3,3,10,10,5,5,0,0);
			cm.gainExp(3212000);//个人给经验
			cm.setgrname(15);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务15，获得经验值奖励高级称号各属性7 攻/魔3！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情15。#k\r\n请完成毒雾森林副本把#v1142032#和以前的#v1142108#交给我。\r\n奖励：#v1142109#各属性7 攻/魔3");
			cm.dispose();
	    }
		} else if (selection == 16) {
			if (cm.haveItem(4000180 ,100) && cm.haveItem(4000181 ,100)){
			cm.gainItem(4000180, -100);//获得物品
			cm.gainItem(4000181, -100);//获得物品
			cm.gainItem(1112676,2,2,2,2,0,0,2,2,10,10,5,5,0,0);
			cm.gainExp(7212000);//个人给经验
			cm.setgrname(16);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务16，获得经验值奖励戒指属性2 攻/魔2！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			cm.sendOk(感叹号+"#r欢迎进入主线剧情16。#k\r\n请到#r（受难船的墓地）#k收集100个#v4000180#100个#v4000181#交给我。\r\n奖励：#v1112676#各属性2 攻/魔2");
			cm.dispose();
	    }	
		} else if (selection == 17) {
			if (cm.haveItem(4001266 ,1)){
				if (!cm.canHold(1912000,1)) {
				cm.sendOk("请检查你的背包是否已满。");
				cm.dispose();
				return;
				}
				if (!cm.canHold(1902001,1)) {
				cm.sendOk("请检查你的背包是否已满。");
				cm.dispose();
				return;
				}
				if (!cm.canHold(1912011,1)) {
				cm.sendOk("请检查你的背包是否已满。");
				cm.dispose();
				return;
				}
				if (!cm.canHold(1902015,1)) {
				cm.sendOk("请检查你的背包是否已满。");
				cm.dispose();
				return;
				}
				if (!cm.canHold(1902016,1)) {
				cm.sendOk("请检查你的背包是否已满。");
				cm.dispose();
				return;
				}
				if (!cm.canHold(1902017,1)) {
				cm.sendOk("请检查你的背包是否已满。");
				cm.dispose();
				return;
				}
				if (!cm.canHold(1902018,1)) {
				cm.sendOk("请检查你的背包是否已满。");
				cm.dispose();
				return;
				}
			//cm.gainItem(4000180, -200);//获得物品
			cm.gainItem(4001266, -1);//获得物品
			if (cm.getJob()==2112){
                cm.teachSkill(20001003 ,1,1); //Magic Armor战神
                cm.teachSkill(20001004 ,1,1); //Magic Armor战神
				cm.gainItem(1912011, 1);//获得物品
				cm.gainItem(1902015, 1);//获得物品
				cm.gainItem(1902016, 1);//获得物品
				cm.gainItem(1902017, 1);//获得物品
				cm.gainItem(1902018, 1);//获得物品
				cm.gainExp(17212000);//个人给经验
				cm.setgrname(17);
				cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务17，获得经验值奖励坐骑技能与坐骑一只！");
				cm.sendOk("完成了主线任务，获得奖励！");
				cm.safeDispose(); //结束脚本
				return;
			}
			cm.gainItem(1912000, 1);//获得物品
			cm.gainItem(1902001, 1);//获得物品
            cm.teachSkill(1003,1,1); //Magic Armor
            cm.teachSkill(1004,1,1); //Magic Armor
			//cm.gainItem(1112676,2,2,2,2,0,0,2,2,10,10,5,5,0,0);
			cm.gainExp(17212000);//个人给经验
			cm.setgrname(17);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务17，获得经验值奖励坐骑技能与坐骑一只！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
				if (!cm.canHold(4001266,1)) {
				cm.sendOk("请检查你的背包是否已满。");
				cm.dispose();
				return;
				}
			cm.gainItem(4001266, 1);//获得物品
			cm.sendOk(感叹号+"#r欢迎进入主线剧情17。萌新冒险岛祝你玩的开心！\r\n无需完成，再次点我奖励：奖励坐骑技能与坐骑一只！");
			cm.dispose();
	    }
		} else if (selection == 18) {
			if (cm.haveItem(4000235 ,1) && cm.haveItem(4000243 ,1) && cm.haveItem(4000460 ,1) && cm.haveItem(4000461 ,1) && cm.haveItem(4000462 ,1)){
			//cm.gainItem(4000180, -200);//获得物品
			//cm.gainItem(4000181, -200);//获得物品
			cm.gainItem(4000235, -1);//获得物品
			cm.gainItem(4000243, -1);//获得物品
			cm.gainItem(4000460, -1);//获得物品
			cm.gainItem(4000461, -1);//获得物品
			cm.gainItem(4000462, -1);//获得物品
			cm.gainItem(1052457  ,10,10,10,10,0,0,2,2,100,100,50,50,0,0);
			cm.gainExp(37212000);//个人给经验
			cm.setgrname(18);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务18，获得经验值奖励套服各属性10 攻/魔2！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			//cm.sendOk(感叹号+"#r欢迎进入主线剧情17。萌新冒险岛祝你玩的开心！\r\n无需完成，再次点我奖励：奖励坐骑技能与坐骑一只！");
			cm.sendOk(感叹号+"#r欢迎进入主线剧情18。#k\r\n请打败#r（喷火龙，天鹰，多多，玄冰独角兽，雷卡）#k\r\n收集#v4000235##v4000243##v4000460##v4000461##v4000462#各1个交给我。\r\n奖励：#v1052457#各属性10 攻/魔2");
			cm.dispose();
	    }	
		} else if (selection == 19) {
			if (cm.haveItem(4001084 ,1) && cm.haveItem(4001085 ,1)){
			//cm.gainItem(4000180, -200);//获得物品
			//cm.gainItem(4000181, -200);//获得物品
			cm.gainItem(4001084, -1);//获得物品
			cm.gainItem(4001085, -1);//获得物品
			cm.gainItem(1112661  ,5,5,5,5,0,0,5,5,0,0,30,30,0,0);
			cm.gainExp(57212000);//个人给经验
			cm.setgrname(19);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务19，获得经验值奖励戒指各属性5 攻/魔5！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			//cm.sendOk(感叹号+"#r欢迎进入主线剧情17。萌新冒险岛祝你玩的开心！\r\n无需完成，再次点我奖励：奖励坐骑技能与坐骑一只！");
			cm.sendOk(感叹号+"#r欢迎进入主线剧情19。#k\r\n请打败#r（闹钟，鱼王）#k收集#v4001084##v4001085#各1个证明你的实力。\r\n奖励：#v1112661#各属性5 攻/魔5");
			cm.dispose();
	    }	
		} else if (selection == 20) {
		if (cm.haveItem(4000273 ,200) && cm.haveItem(4000274 ,200)){
			//cm.gainItem(4000180, -200);//获得物品
			//cm.gainItem(4000181, -200);//获得物品
			cm.gainItem(4000273, -200);//获得物品
			cm.gainItem(4000274, -200);//获得物品
			cm.gainItem(1142110  ,8,8,8,8,200,200,5,5,50,50,30,30,10,10);
			cm.gainExp(77212000);//个人给经验
			cm.setgrname(20);
			cm.worldMessage(6,"玩家：["+cm.getName()+"]完成了主线任务20，获得经验值奖励称号各属性8 攻/魔5！");
			cm.sendOk("完成了主线任务，获得奖励！");
			cm.dispose();
		}else{
			//cm.sendOk(感叹号+"#r欢迎进入主线剧情17。萌新冒险岛祝你玩的开心！\r\n无需完成，再次点我奖励：奖励坐骑技能与坐骑一只！");
			cm.sendOk(感叹号+"#r欢迎进入主线剧情20。#k\r\n请到#r（死龙巢穴）#k收集#v4000273##v4000274#各200个交给我。\r\n奖励：#v1142110#各属性8 攻/魔5");
			cm.dispose();
	    }20
		}
    }
}
