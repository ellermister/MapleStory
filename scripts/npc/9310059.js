/*
	Mady By Coffee
	Powered By XXMS
	Warp NPC
*/

var bossmaps = Array(
										Array(100000005,0,"铁甲猪公园III"), 																Array(105070002,0,"蘑菇王之墓"), 
										Array(105090900,0,"被诅咒的寺院"), 																
										Array(230040420,0,"皮亚奴斯洞穴"), 
										Array(211042300,0,"扎昆入口"), 
										Array(220080001,0,"时间塔的本源"), 
										Array(240020402,0,"喷火龙栖息地"), 
										Array(240020101,0,"格瑞芬多森林"), 
										
										Array(240040700,0,"暗黑龙王洞穴"), 
										
										Array(270050000,0,"神的黄昏:品克缤场所")								
										);
var monstermaps = Array(
										Array(100040001,0,"南部森林训练场Ⅰ8级-15级"), 
										Array(101010100,0,"大木林Ⅰ8级-15级"), 
										Array(104040000,0,"射手训练场 1级-15级"), 
										Array(103000101,0,"地铁一号线<第1地区> 20级-30级"), 
										Array(103000105,0,"地铁一号线<第4地区> 50级-70级"), 
										Array(101030110,0,"第1军营"), 
										Array(106000002,0,"危险的峡谷Ⅱ"), 
										Array(101030103,0,"遗迹发掘地Ⅲ"), 
										Array(101040001,0,"野猪的领土 20级-35级"), 
										Array(101040003,0,"钢之黑怪之地"), 
										Array(101030001,0,"野猪的领土Ⅱ"), 
										Array(104010001,0,"猪的海岸 10级-20级"), 
										Array(930000100,0,"森林初入"),
										Array(930000200,0,"变质的森林"),
										Array(105070001,0,"蚂蚁广场 20级-40级"), 
										Array(105090300,0,"龙穴"), 
										Array(105040306,0,"巨人之林 60级-80级"), 
										Array(230020000,0,"东海叉路"), 
										Array(230010400,0,"西海叉路"), 
										Array(211041400,0,"死亡之林Ⅳ"), 
										Array(222010000,0,"乌山入口"),
										Array(220070301,0,"时间停止之间"), 
										Array(220070201,0,"消失的时间"), 
										Array(220050300,0,"时间通道"), 
										Array(220010500,0,"露台大厅 40级-70级"), 
										Array(250020000,0,"初级修炼场 50级-60级"), 
										Array(251010000,0,"十年药草地"), 
										Array(200040000,0,"云彩公园Ⅲ"), 
										Array(200010301,0,"黑暗庭院Ⅰ"), 
										Array(240020100,0,"火焰死亡战场 100级-120级"), 
										Array(240040500,0,"龙之巢穴入口"), 
										Array(240040000,0,"龙的峡谷"), 
										Array(600020300,0,"狼蛛洞穴"), 
										
										
										Array(800020130,0,"大佛的邂逅"),
	
	Array(749020000,0,"国庆蛋糕地图")
										); 
var townmaps = Array(
										Array(910000000,0,"自由市场"), 
										Array(1010000,0,"彩虹村 彩虹岛新手村"), 
										Array(60000,0,"南港 彩虹岛新手村"), 
										Array(104000000,0,"明珠港"), 
										Array(100000000,0,"射手村"), 
										Array(101000000,0,"魔法密林"), 
										Array(180000001,0,"黑暗小屋"), 
										Array(102000000,0,"勇士部落"), 
										Array(103000000,0,"废弃都市"), 
										Array(120000000,0,"诺特勒斯号码头"),
										Array(105040300,0,"林中之城"), 
										Array(200000000,0,"天空之城"),
										Array(211000000,0,"冰峰雪域"), 
										Array(230000000,0,"水下世界"),  
										Array(222000000,0,"童话村"), 
										Array(220000000,0,"玩具城"),
										Array(701000000,0,"东方神州"),
										Array(250000000,0,"武陵"), 
										Array(702000000,0,"少林寺"), 
										Array(500000000,0,"泰国"),
										Array(260000000,0,"阿里安特"), 
										Array(741000000,0,"不夜城"), 
										Array(600000000,0,"新叶城"), 
										Array(240000000,0,"神木村"), 
										Array(742000000,0,"台湾101大道"), 
										Array(261000000,0,"马加提亚"), 
									
										Array(221000000,0,"地球防御本部"), 
										Array(251000000,0,"百草堂"),
										Array(701000200,0,"上海豫园"),
										Array(550000000,0,"吉隆大都市"),
										Array(130000000,0,"圣地"),
										
										Array(551000000,0,"甘榜村"),
										Array(740000000,0,"西门町"), 
										Array(801000000,0,"昭和村"), 
										Array(540010000,0,"新加坡机场"),
										Array(541000000,0,"新加坡码头"),
										Array(300000000,0,"艾林森林"), 
										
										Array(270000100,0,"时间神殿"), 
										Array(702100000,0,"藏经阁"), 
										
										Array(800000000,0,"古代神社"), 
										
										Array(130000200,0,"圣地岔路"),
										Array(741000208,0,"钓鱼场"),
										Array(925020000,0,"武陵道场入口"),
										Array(930000000,0,"毒雾森林"),
										
								
										Array(930000010,0,"森林入口"), 
										
										Array(702090101,0,"英语村"), 
										Array(680000000,0,"幸福天堂"), 
										Array(700000000,0,"红鸾宫")
							);
var chosenMap = -1;
var monsters = 0;
var towns = 0;
var bosses = 0;

importPackage(net.sf.odinms.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 3 && mode == 0) {
			cm.sendOk("下次再见!.");
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
                        cm.sendNext("Hi,我是世界传送员!");                  
                }
               if (status == 1) {
                   cm.sendSimple("#fUI/UIWindow.img/QuestIcon/3/0#\r\n#L0#世界传送#l\r\n#L1#抱歉,我走错了#l");
               }
               else if (status == 2) {
                   if (selection == 0) {
                       cm.sendSimple("#fUI/UIWindow.img/QuestIcon/3/0#\r\n#L0#城镇地图#l\r\n#L1#练级地图#l\r\n#L2#BOSS地图#l");
                   }
                   else if (selection == 1) {
                       cm.dispose();
                   }
               }
               else if (status == 3) {
                   if (selection == 0) {
                        var selStr = "选择你的目的地吧.#b";
			for (var i = 0; i < townmaps.length; i++) {
				selStr += "\r\n#L" + i + "#" + townmaps[i][2] + "";
			}
                        cm.sendSimple(selStr);
                        towns = 1;
                   }
                   if (selection == 1) {
                       var selStr = "选择你的目的地吧.#b";
                       for (var i = 0; i < monstermaps.length; i++) {
				selStr += "\r\n#L" + i + "#" + monstermaps[i][2] + "";
                       }
                       cm.sendSimple(selStr);
                       monsters = 1;
                   }
                   if (selection == 2) {
                       var selStr = "选择你的目的地吧.#b";
                       for (var i = 0; i < bossmaps.length; i++) {
				selStr += "\r\n#L" + i + "#" + bossmaps[i][2] + "";
                       }
                       cm.sendSimple(selStr);
                       bosses = 1;
                   }
               }
            else if (status == 4) {
                if (towns == 1) {
                cm.sendYesNo("你确定要去 " + townmaps[selection][2] + "? 价格:#r"+townmaps[selection][1]+"#k金币");
		chosenMap = selection;
                towns = 2;
                }
                else if (monsters == 1) {
                cm.sendYesNo("你确定要去 " + monstermaps[selection][2] + "? 价格:#r"+monstermaps[selection][1]+"#k金币");
                chosenMap = selection;
                monsters = 2;
                }
                else if (bosses == 1) {
                cm.sendYesNo("你确定要去 " + bossmaps[selection][2] + "? 价格:#r"+bossmaps[selection][1]+"#k金币");
                chosenMap = selection;
                bosses = 2;
                }
            }
            else if (status == 5) {
                if (towns == 2) {
                	if(cm.getMeso()>=townmaps[chosenMap][1]){
                		cm.warp(townmaps[chosenMap][0], 0);
                		cm.gainMeso(-townmaps[chosenMap][1]);
                	}else{
                		cm.sendOk("你没有足够的金币哦!");
                	}
                    cm.dispose();
                }
                else if (monsters == 2) {
                    if(cm.getMeso()>=monstermaps[chosenMap][1]){
                		cm.warp(monstermaps[chosenMap][0], 0);
                		cm.gainMeso(-monstermaps[chosenMap][1]);
                	}else{
                		cm.sendOk("你没有足够的金币哦!");
                	}
                    cm.dispose();
                }
                else if (bosses == 2) {
                    if(cm.getMeso()>=bossmaps[chosenMap][1]){
                		cm.warp(bossmaps[chosenMap][0], 0);
                		cm.gainMeso(-bossmaps[chosenMap][1]);
                	}else{
                		cm.sendOk("你没有足够的金币哦!");
                	}
                    cm.dispose();
                }
            }
              
            }
}
