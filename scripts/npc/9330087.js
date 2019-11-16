importPackage(java.util);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server);


var slot;
var item;
var qty;

var text;
var fee;
var status = 0;

var ttt ="#fUI/UIWindow.img/Quest/icon9/0#";
var xxx ="#fUI/UIWindow.img/Quest/icon8/0#";
var sss = "#fUI/UIWindow.img/QuestIcon/3/0#";

var Priceone = 5000000; //一点人气需要的冒险币
var Pricetwo = 500; //1百万需要的点卷
var Pricethr = 500; //1元宝能买到的点卷数量.
var nulled;

var music = Array("Bgm00/SleepyWood", "Bgm00/FloralLife", "Bgm00/GoPicnic", "Bgm00/Nightmare", "Bgm00/RestNPeace",
"Bgm01/AncientMove", "Bgm01/MoonlightShadow", "Bgm01/WhereTheBarlogFrom", "Bgm01/CavaBien", "Bgm01/HighlandStar", "Bgm01/BadGuys",
"Bgm02/MissingYou", "Bgm02/WhenTheMorningComes", "Bgm02/EvilEyes", "Bgm02/JungleBook", "Bgm02/AboveTheTreetops",
"Bgm03/Subway", "Bgm03/Elfwood", "Bgm03/BlueSky", "Bgm03/Beachway", "Bgm03/SnowyVillage",
"Bgm04/PlayWithMe", "Bgm04/WhiteChristmas", "Bgm04/UponTheSky", "Bgm04/ArabPirate", "Bgm04/Shinin'Harbor", "Bgm04/WarmRegard",
"Bgm05/WolfWood", "Bgm05/DownToTheCave", "Bgm05/AbandonedMine", "Bgm05/MineQuest", "Bgm05/HellGate",
"Bgm06/FinalFight", "Bgm06/WelcomeToTheHell", "Bgm06/ComeWithMe", "Bgm06/FlyingInABlueDream", "Bgm06/FantasticThinking",
"Bgm07/WaltzForWork", "Bgm07/WhereverYouAre", "Bgm07/FunnyTimeMaker", "Bgm07/HighEnough", "Bgm07/Fantasia",
"Bgm08/LetsMarch", "Bgm08/ForTheGlory", "Bgm08/FindingForest", "Bgm08/LetsHuntAliens", "Bgm08/PlotOfPixie",
"Bgm09/DarkShadow", "Bgm09/TheyMenacingYou", "Bgm09/FairyTale", "Bgm09/FairyTalediffvers", "Bgm09/TimeAttack",
"Bgm10/Timeless", "Bgm10/TimelessB", "Bgm10/BizarreTales", "Bgm10/TheWayGrotesque", "Bgm10/Eregos",
"Bgm11/BlueWorld", "Bgm11/Aquarium", "Bgm11/ShiningSea", "Bgm11/DownTown", "Bgm11/DarkMountain",
"Bgm12/AquaCave", "Bgm12/DeepSee", "Bgm12/WaterWay", "Bgm12/AcientRemain", "Bgm12/RuinCastle", "Bgm12/Dispute",
"Bgm13/CokeTown", "Bgm13/Leafre", "Bgm13/Minar'sDream", "Bgm13/AcientForest", "Bgm13/TowerOfGoddess",
"Bgm14/DragonLoad", "Bgm14/HonTale", "Bgm14/CaveOfHontale", "Bgm14/DragonNest", "Bgm14/Ariant", "Bgm14/HotDesert",
"Bgm15/MureungHill", "Bgm15/MureungForest", "Bgm15/WhiteHerb", "Bgm15/Pirate", "Bgm15/SunsetDesert",
"BgmEvent/FunnyRabbit", "BgmEvent/FunnyRabbitFaster","BgmGL/amoria", "BgmGL/chapel", "BgmGL/cathedral", "BgmGL/Amorianchallenge",
"BgmJp/Feeling", "BgmJp/BizarreForest", "BgmJp/Hana", "BgmJp/Yume", "BgmJp/Bathroom", "BgmJp/BattleField", "BgmJp/FirstStepMaster");

//-----------------------------------------------------------------------------

var beauty = 0;
var haircolor = Array();
var skin = Array(1, 2, 3, 4, 9, 10);
var mhair = Array(30000,30020,30030,30040,30050,30060,30100,30110,30120,30130,30140,30150,30160,30170,30180,30190,30200,30210,30220,30230,30240,30250,30260,30270,30280,30290,30300,30310,30320,30330,30340,30350,30360,30370,30400,30410,30420,30440,30450,30460,30470,30480,30490,30510,30520,30530,30540,30550,30560,30600,30610,30620,30630,30640,30650,30660,30670,30680,30700,30710,30720,30730,30740,30750,30760,30770,30780,30790,30800,30810,30820,30830,30840,30850,30860,30870,30880,30890,30900,30910,30920,30930,30940,30950,30990,33000,33040,33030,33050,34300,33120,33110,33150,33170,33200,33210,33220,33230,33240,33250,33260);
var fhair = Array(31000,31010,31020,31030,31040,31050,31060,31070,31080,31090,31100,31110,31120,31130,31140,31150,31160,31170,31180,31190,31200,31210,31220,31230,31240,31250,31260,31270,31280,31290,31300,31310,31320,31330,31340,31350,31400,31410,31420,31440,31450,31460,31470,31480,31490,31510,31520,31530,31540,31550,31560,31610,31620,31630,31640,31650,31660,31670,31680,31690,31700,31710,31720,31730,31740,31750,31760,31770,31780,31790,31800,31810,31820,31830,31840,31850,31860,31870,31880,31890,31910,31920,31930,31940,31950,34000,34010,34040,34050,34060,34070,34080,34090,34100,34110,34120,34130,34140,34150,34160,34170,34180,34190,34200,34210,34220,34230,34240,34250,34260,34270);
var hairnew = Array();
var mface = Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20015, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023, 20024, 20025, 20026, 20027);
var fface = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012,21013,21014, 21015, 21016, 21017, 21018, 21019, 21020, 21021,21022, 21023, 21024,21025, 21026,21027);
var facenew = Array();
var colors = Array();

//-----------------------------------------------------------------------------

var bxjd = Array(
		Array(1002776,300,1),
		Array(1002777,300,1),
		Array(1002778,300,1),
		Array(1002779,300,1),
		Array(1002780,300,1),
		Array(1052155,300,1),
		Array(1052156,300,1),
		Array(1052157,300,1),
		Array(1052158,300,1),
		Array(1052159,300,1),
		Array(1082234,300,1),
		Array(1082235,300,1),
		Array(1082236,300,1),
		Array(1082237,300,1),
		Array(1082238,300,1),
		Array(1072355,300,1),
		Array(1072356,300,1),
		Array(1072357,300,1),
		Array(1072358,300,1),
		Array(1072359,300,1),
		Array(1302081,200,1),
		Array(1312037,200,1),
		Array(1322060,200,1),
		Array(1332073,200,1),
		Array(1332074,200,1),
		Array(1372044,200,1),
		Array(1382057,200,1),
		Array(1402046,200,1),
		Array(1412033,200,1),
		Array(1422037,200,1),
		Array(1432047,200,1),
		Array(1442063,200,1),
		Array(1452057,200,1),
		Array(1462050,200,1),
		Array(1472068,200,1),
		Array(1482023,200,1),
		Array(1052158,200,1),
		Array(1492023,200,1),
		Array(1002790,300,1),
		Array(1002791,300,1),
		Array(1002792,300,1),
		Array(1002793,300,1),
		Array(1002794,300,1),
		Array(1052160,300,1),
		Array(1052161,300,1),
		Array(1052162,300,1),
		Array(1052163,300,1),
		Array(1052164,300,1),
		Array(1082239,300,1),
		Array(1082240,300,1),
		Array(1082241,300,1),
		Array(1082242,300,1),
		Array(1082243,300,1),
		Array(1072361,300,1),
		Array(1072362,300,1),
		Array(1072363,300,1),
		Array(1072364,300,1),
		Array(1072365,300,1),
		Array(1302086,100,1),
		Array(1312038,100,1),
		Array(1322061,100,1),
		Array(1332075,100,1),
		Array(1332076,100,1),
		Array(1372045,100,1),
		Array(1382059,100,1),
		Array(1402047,100,1),
		Array(1412034,100,1),
		Array(1422038,100,1),
		Array(1432049,100,1),
		Array(1442067,100,1),
		Array(1452059,100,1),
		Array(1462051,100,1),
		Array(1472071,100,1),
		Array(1482024,100,1),
		Array(1492025,100,1)
);

//-----------------------------------------------------------------------------

	function start() {
		status = -1;
		action(1, 0, 0);
		}
	function action(mode, type, selection) {
	if (mode == -1) {
		cm.sendOk("#b好的,下次再见.");
		cm.dispose();
		} else {
	if (status >= 0 && mode == 0) {
		cm.sendOk("#b好的,下次再见.");
		cm.dispose();
		return;
		}
	if (mode == 1)
		status++;
		else
		status--;

//-----------------------------------------------------------------------------

	if (status == 0) {

   	    var add = "欢迎来到#r"+cm.ms()+"冒险岛#k,下面是本服的普通玩家副本,";

		add += "功能强大,集合了所有玩家经常能够用到的功能,本服新开,长久稳定,";

		add += "是玩家驻扎的唯一选择,赶快邀请你的朋友一起加入吧.\r\n\r\n#b";

		add += "" + sss + "\r\n";

		add += "#L0#"+ttt+""+xxx+"-银行系统#l\r\n";

		add += "#L3#"+xxx+""+ttt+"-兑换点卷#l\r\n";

		add += "#L4#"+ttt+""+xxx+"-常用功能[#r好友,清理,自杀,锁定#b]#l\r\n";

		add += "#L5#"+xxx+""+ttt+"-宝箱坚定物品[#r永恒,重生,GM卷,玩具#b]#l\r\n";

		cm.sendSimple (add);   

//-----------------------------------------------------------------------------

	} else if (status == 1) {

	if (selection == 1){

	    var add = "欢迎来到#r"+cm.ms()+"冒险岛#k,我是本服美容美发服务生.";

		add +="下面是一些普通玩家发型与其他功能,加入会员享受皇家发型.\r\n\r\n\r\n";

		add += "" + sss + "\r\n  ";

		add +="#L50##b" + xxx + "" + ttt + "-肤色#l\r\n  ";

		add +="#L51##b" + ttt + "" + xxx + "-发型#l\r\n  ";

		add +="#L52##b" + xxx + "" + ttt + "-发型颜色#l\r\n  ";

		add +="#L53##b" + ttt + "" + xxx + "-眼睛#l\r\n  ";

		add +="#L54##b" + xxx + "" + ttt + "-眼睛颜色#l";

		cm.sendSimple (add); 

	} else if(selection == 0){

	    var add = "欢迎来到#r"+cm.ms()+"冒险岛#k,我是本服银行工作人员.\r\n\r\n";

		add += "你拥有存款:#r " + cm.getChar().getyh() + " #k亿\r\n\r\n";

		add += "" + sss + "\r\n";

		add +="#L20##b" + xxx + "-存入 5亿冒险币#l  ";

		add +="#L21##b" + ttt + "-提取 5亿#l\r\n";

		add +="#L22##b" + xxx + "-存入10亿冒险币#l  ";

		add +="#L23##b" + ttt + "-提取10亿#l\r\n";

		add +="#L24##b" + xxx + "-存入15亿冒险币#l  ";

		add +="#L25##b" + ttt + "-提取15亿#l";

		cm.sendSimple (add); 

	} else if(selection == 2){

	    var add = "欢迎来到#r"+cm.ms()+"冒险岛#k,我可以为你做的是激活全部技能.";

		add +="因部分技能可能无法激活,原因可能导致炸线,所以管管禁止了这些技能,";

		add +="请各位玩家给予谅解,感谢您对我们的支持.\r\n\r\n";

		add +="#r 被禁止使用的技能为:#k\r\n   海盗:#s5121003#\r\n   黑骑:#s1321007#\r\n   英雄:#s1111002##s1121010#\r\n";

		add +="                            #L6##b我要激活所有技能#l\r\n";

		cm.sendSimple (add,2); 

	} else if(selection == 3){

	    var add = "欢迎来到#r"+cm.ms()+"冒险岛#k,我这里可以#b兑换点卷#k.";

		add +="本服功能非常完善,开放所有贩卖,若发现BUG请提交给管管,";

		add +="我们将在第一时间处理解决,感谢您对我们的支持.\r\n\r\n";

		add += "" + sss + "\r\n  ";

		//add +="#L7##b" + xxx + "" + ttt + "-购买人气#l\r\n  ";

		//add +="#L8##b" + ttt + "" + xxx + "-购买金币#l\r\n  ";

		add +="#L9##b" + xxx + "" + ttt + "-兑换点卷#l";

		cm.sendSimple (add); 

	} else if(selection == 4){

	    var add = "欢迎来到#r"+cm.ms()+"冒险岛#k,我可以为你做的是常用功能服务#k.";

		add +="本服功能非常完善,开放所有功能,若发现BUG请提交给管管,";

		add +="我们将在第一时间处理解决,感谢您对我们的支持.\r\n\r\n";

		add += "" + sss + "\r\n  ";

		add +="#L10##b" + xxx + "" + ttt + "-暴烈自杀#l\r\n  ";

		add +="#L11##b" + ttt + "" + xxx + "-增加好友量#l\r\n  ";

		add +="#L12##b" + xxx + "" + ttt + "-清理背包垃圾#l\r\n  ";

		add +="#L100##b" + ttt + "" + xxx + "-装备锁定[#r固定期限,无法解锁#b]#l";

		cm.sendSimple (add); 

	} else if (selection == 5){

   	    var add = "欢迎来到#r"+cm.ms()+"冒险岛#k,下面是本服的强大装备坚定系统,";

		add += "本服BOSS都有暴此物品,然后拿到我这里坚定,可以随机获得高级装备,";

		add += "不要问我有没有垃圾装备,我这里只出高级装备,哈哈.\r\n\r\n\r\n#b";

		add += "" + sss + "\r\n  ";

		add += "#L13#"+xxx+""+ttt+"-宝箱鉴定开始#l";

		cm.sendSimple (add);  

		}

//-----------------------------------------------------------------------------

	} else if (status == 2){

	if(selection == 6){
		if (cm.getLevel() >= 1) {
		cm.teachSkill(1003,1,1);
		cm.teachSkill(1004,1,1);
		cm.teachSkill(1005,1,1);
		cm.teachSkill(1121011,1,1);
		cm.teachSkill(1221012,1,1);
		cm.teachSkill(1321010,1,1);
		cm.teachSkill(2121008,1,1);
		cm.teachSkill(2221008,1,1);
		cm.teachSkill(2321009,1,1);
		cm.teachSkill(3121009,1,1);
		cm.teachSkill(3221008,1,1);
		cm.teachSkill(4121009,1,1);
		cm.teachSkill(4221008,1,1); 
		cm.teachSkill(1000002,8,8); 
		cm.teachSkill(3000002,8,8);
		cm.teachSkill(4000001,8,8); 
		cm.teachSkill(1000001,10,10); 
		cm.teachSkill(2000001,10,10);
		cm.teachSkill(1000000,16,16); 
		cm.teachSkill(2000000,16,16);
		cm.teachSkill(3000000,16,16); 
		cm.teachSkill(1001003,20,20); 
		cm.teachSkill(3200001,30,30);
		cm.teachSkill(1001004,20,20);
		cm.teachSkill(1001005,20,20);
		cm.teachSkill(2001002,20,20);
		cm.teachSkill(2001003,20,20);
		cm.teachSkill(2001004,20,20);
		cm.teachSkill(2001005,20,20);
		cm.teachSkill(3000001,20,20);
		cm.teachSkill(3001003,20,20);
		cm.teachSkill(3001004,20,20);
		cm.teachSkill(3001005,20,20);
		cm.teachSkill(4000000,20,20);
		cm.teachSkill(4001344,20,20);
		cm.teachSkill(4001334,20,20);
		cm.teachSkill(4001002,20,20);
		cm.teachSkill(4001003,20,20);
		cm.teachSkill(1101005,20,20);
		cm.teachSkill(1100001,20,20); 
		cm.teachSkill(1100000,20,20);
		cm.teachSkill(1200001,20,20);
		cm.teachSkill(1200000,20,20);
		cm.teachSkill(1300000,20,20);
		cm.teachSkill(1300001,20,20);
		cm.teachSkill(3100000,20,20);
		cm.teachSkill(3200000,20,20);
		cm.teachSkill(4100000,20,20);
		cm.teachSkill(4200000,20,20); 
		cm.teachSkill(4201002,20,20);
		cm.teachSkill(4101003,20,20);
		cm.teachSkill(3201002,20,20);
		cm.teachSkill(3101002,20,20);
		cm.teachSkill(1301004,20,20);
		cm.teachSkill(1301005,20,20);
		cm.teachSkill(1201004,20,20);
		cm.teachSkill(1201005,20,20);
		cm.teachSkill(1101004,20,20); 
		cm.teachSkill(1101006,20,20);
		cm.teachSkill(1201006,20,20);
		cm.teachSkill(1301006,20,20);
		cm.teachSkill(2101001,20,20);
		cm.teachSkill(2100000,20,20);
		cm.teachSkill(2101003,20,20);
		cm.teachSkill(2101002,20,20);
		cm.teachSkill(2201001,20,20);
		cm.teachSkill(2200000,20,20);
		cm.teachSkill(2201003,20,20);
		cm.teachSkill(2201002,20,20);
		cm.teachSkill(2301004,20,20);
		cm.teachSkill(2301003,20,20);
		cm.teachSkill(2300000,20,20);
		cm.teachSkill(2301001,20,20);
		cm.teachSkill(3101003,20,20);
		cm.teachSkill(3101004,20,20);
		cm.teachSkill(3201003,20,20);
		cm.teachSkill(3201004,20,20);
		cm.teachSkill(4100002,20,20);
		cm.teachSkill(4101004,20,20);
		cm.teachSkill(4200001,20,20);
		cm.teachSkill(4201003,20,20); 
		cm.teachSkill(4211005,20,20);
		cm.teachSkill(4211003,20,20);
		cm.teachSkill(4210000,20,20);
		cm.teachSkill(4110000,20,20);
		cm.teachSkill(4111001,20,20);
		cm.teachSkill(4111003,20,20);
		cm.teachSkill(3210000,20,20);
		cm.teachSkill(3110000,20,20);
		cm.teachSkill(3210001,20,20);
		cm.teachSkill(3110001,20,20);
		cm.teachSkill(3211002,20,20);
		cm.teachSkill(3111002,20,20);
		cm.teachSkill(2210000,20,20);
		cm.teachSkill(2211004,20,20);
		cm.teachSkill(2211005,20,20);
		cm.teachSkill(2111005,20,20);
		cm.teachSkill(2111004,20,20);
		cm.teachSkill(2110000,20,20);
		cm.teachSkill(2311001,20,20);
		cm.teachSkill(2311005,30,30);
		cm.teachSkill(2310000,20,20);
		cm.teachSkill(1311007,20,20);
		cm.teachSkill(1310000,20,20);
		cm.teachSkill(1311008,20,20);
		cm.teachSkill(1210001,20,20);
		cm.teachSkill(1211009,20,20);
		cm.teachSkill(1210000,20,20);
		cm.teachSkill(1110001,20,20);
		cm.teachSkill(1111007,20,20);
		cm.teachSkill(1110000,20,20); 
		cm.teachSkill(1121000,20,20);
		cm.teachSkill(1221000,20,20);
		cm.teachSkill(1321000,20,20);
		cm.teachSkill(2121000,20,20);
		cm.teachSkill(2221000,20,20);
		cm.teachSkill(2321000,20,20);
		cm.teachSkill(3121000,20,20);
		cm.teachSkill(3221000,20,20);
		cm.teachSkill(4121000,20,20);
		cm.teachSkill(4221000,20,20); 
		cm.teachSkill(1321007,0,0);//
		cm.teachSkill(1320009,25,25);
		cm.teachSkill(1320008,25,25);
		cm.teachSkill(2321006,10,10);
		cm.teachSkill(1220010,10,10);
		cm.teachSkill(1221004,25,25);
		cm.teachSkill(1221003,25,25);
		cm.teachSkill(1100003,30,30);
		cm.teachSkill(1100002,30,30);
		cm.teachSkill(1101007,30,30);
		cm.teachSkill(1200003,30,30);
		cm.teachSkill(1200002,30,30);
		cm.teachSkill(1201007,30,30);
		cm.teachSkill(1300003,30,30);
		cm.teachSkill(1300002,30,30);
		cm.teachSkill(1301007,30,30);
		cm.teachSkill(2101004,30,30);
		cm.teachSkill(2101005,30,30);
		cm.teachSkill(2201004,30,30);
		cm.teachSkill(2201005,30,30);
		cm.teachSkill(2301002,30,30);
		cm.teachSkill(2301005,30,30);
		cm.teachSkill(3101005,30,30);
		cm.teachSkill(3201005,30,30);
		cm.teachSkill(4100001,30,30);
		cm.teachSkill(4101005,30,30);
		cm.teachSkill(4201005,30,30);
		cm.teachSkill(4201004,30,30);
		cm.teachSkill(1111006,30,30);
		cm.teachSkill(1111005,30,30);
		cm.teachSkill(1111002,30,30);
		cm.teachSkill(1111004,30,30);
		cm.teachSkill(1111003,30,30);
		cm.teachSkill(1111008,30,30);
		cm.teachSkill(1211006,30,30);
		cm.teachSkill(1211002,30,30);
		cm.teachSkill(1211004,30,30);
		cm.teachSkill(1211003,30,30);
		cm.teachSkill(1211005,30,30);
		cm.teachSkill(1211008,30,30);
		cm.teachSkill(1211007,30,30);
		cm.teachSkill(1311004,30,30);
		cm.teachSkill(1311003,30,30);
		cm.teachSkill(1311006,30,30);
		cm.teachSkill(1311002,30,30);
		cm.teachSkill(1311005,30,30);
		cm.teachSkill(1311001,30,30);
		cm.teachSkill(2110001,30,30);
		cm.teachSkill(2111006,30,30);
		cm.teachSkill(2111002,30,30);
		cm.teachSkill(2111003,30,30);
		cm.teachSkill(2210001,30,30);
		cm.teachSkill(2211006,30,30);
		cm.teachSkill(2211002,30,30);
		cm.teachSkill(2211003,30,30);
		cm.teachSkill(2311003,30,30);
		cm.teachSkill(2311002,30,30);
		cm.teachSkill(2311004,30,30);
		cm.teachSkill(2311006,30,30);
		cm.teachSkill(3111004,30,30);
		cm.teachSkill(3111003,30,30);
		cm.teachSkill(3111005,30,30);
		cm.teachSkill(3111006,30,30);
		cm.teachSkill(3211004,30,30);
		cm.teachSkill(3211003,30,30);
		cm.teachSkill(3211005,30,30);
		cm.teachSkill(3211006,30,30);
		cm.teachSkill(4111005,30,30);
		cm.teachSkill(4111006,20,20);
		cm.teachSkill(4111004,30,30);
		cm.teachSkill(4111002,30,30);
		cm.teachSkill(4211002,30,30);
		cm.teachSkill(4211004,30,30);
		cm.teachSkill(4211001,30,30);
		cm.teachSkill(4211006,30,30);
		cm.teachSkill(1120004,30,30);
		cm.teachSkill(1120005,30,30);
		cm.teachSkill(1121008,30,30);
		cm.teachSkill(1121006,30,30);
		cm.teachSkill(1121002,30,30);
		cm.teachSkill(1220005,30,30);
		cm.teachSkill(1221009,30,30);
		cm.teachSkill(1220006,30,30);
		cm.teachSkill(1221007,30,30);
		cm.teachSkill(1221011,30,30);
		cm.teachSkill(1221002,30,30);
		cm.teachSkill(1320005,30,30);
		cm.teachSkill(1320006,30,30);
		cm.teachSkill(1321003,30,30);
		cm.teachSkill(1321002,30,30);
		cm.teachSkill(2121005,30,30);
		cm.teachSkill(2121003,30,30);
		cm.teachSkill(2121004,30,30);
		cm.teachSkill(2121002,30,30);
		cm.teachSkill(2121007,30,30);
		cm.teachSkill(2121006,30,30);
		cm.teachSkill(2221007,30,30);
		cm.teachSkill(2221006,30,30);
		cm.teachSkill(2221003,30,30);
		cm.teachSkill(2221005,30,30);
		cm.teachSkill(2221004,30,30);
		cm.teachSkill(2221002,30,30);
		cm.teachSkill(2321007,30,30);
		cm.teachSkill(2321003,30,30);
		cm.teachSkill(2321008,30,30);
		cm.teachSkill(2321005,30,30);
		cm.teachSkill(2321004,30,30);
		cm.teachSkill(2321002,30,30);
		cm.teachSkill(3120005,30,30);
		cm.teachSkill(3121008,30,30);
		cm.teachSkill(3121003,30,30);
		cm.teachSkill(3121007,30,30);
		cm.teachSkill(3121006,30,30);
		cm.teachSkill(3121002,30,30);
		cm.teachSkill(3121004,30,30);
		cm.teachSkill(3221006,30,30);
		cm.teachSkill(3220004,30,30);
		cm.teachSkill(3221003,30,30);
		cm.teachSkill(3221005,30,30);
		cm.teachSkill(3221001,30,30);
		cm.teachSkill(3221002,30,30);
		cm.teachSkill(3221007,30,30);
		cm.teachSkill(4121004,30,30);
		cm.teachSkill(4121008,30,30);
		cm.teachSkill(4121003,30,30);
		cm.teachSkill(4121006,30,30);
		cm.teachSkill(4121007,30,30);
		cm.teachSkill(4120005,30,30);
		cm.teachSkill(4221001,30,30);
		cm.teachSkill(4221007,30,30);
		cm.teachSkill(4221004,30,30);
		cm.teachSkill(4221003,30,30);
		cm.teachSkill(4221006,30,30);
		cm.teachSkill(4220005,30,30);
		cm.teachSkill(1321001,30,30);
		cm.teachSkill(4120002,30,30);
		cm.teachSkill(2221001,30,30);
		cm.teachSkill(3100001,30,30);
		cm.teachSkill(1121001,30,30);
		cm.teachSkill(1221001,30,30);
		cm.teachSkill(2121001,30,30);
		cm.teachSkill(2221001,30,30);
		cm.teachSkill(2321001,30,30);
		cm.teachSkill(4220002,30,30);
		cm.teachSkill(8,1,1);
		cm.teachSkill(5000000,20,20); 
		cm.teachSkill(5001001,20,20); 
		cm.teachSkill(5001002,20,20); 
		cm.teachSkill(5001003,20,20); 
		cm.teachSkill(5001005,10,10); 
		cm.teachSkill(5100000,10,10); 
		cm.teachSkill(5100001,20,20); 
		cm.teachSkill(5101002,20,20); 
		cm.teachSkill(5101003,20,20); 
		cm.teachSkill(5101004,20,20); 
		cm.teachSkill(5101005,10,10); 
		cm.teachSkill(5101006,20,20); 
		cm.teachSkill(5101007,10,10); 
		cm.teachSkill(5200000,20,20); 
		cm.teachSkill(5201001,20,20); 
		cm.teachSkill(5201002,20,20); 
		cm.teachSkill(5201003,20,20); 
		cm.teachSkill(5201004,20,20); 
		cm.teachSkill(5201005,10,10); 
		cm.teachSkill(5201006,20,20); 
		cm.teachSkill(5110000,20,20); 
		cm.teachSkill(5110001,40,40); 
		cm.teachSkill(5111002,30,30); 
		cm.teachSkill(5111004,20,0);  
		cm.teachSkill(5111005,20,20); 
		cm.teachSkill(5210000,20,20); 
		cm.teachSkill(5211001,30,30); 
		cm.teachSkill(5211002,30,30); 
		cm.teachSkill(5211004,30,30); 
		cm.teachSkill(5211005,30,30); 
		cm.teachSkill(5211006,20,20); 
		cm.teachSkill(5121000,20,20); 
		cm.teachSkill(5121001,30,30); 
		cm.teachSkill(5121002,30,30);
		cm.teachSkill(5121004,30,30); 
		cm.teachSkill(5121005,30,30); 
		cm.teachSkill(5121007,30,30); 
		cm.teachSkill(5121008,1,1);   
		cm.teachSkill(5121009,20,20); 
		cm.teachSkill(5121010,30,30); 
		cm.teachSkill(5221000,20,20); 
		cm.teachSkill(5220001,30,30); 
		cm.teachSkill(5220002,20,20); 
		cm.teachSkill(5221003,30,30); 
		cm.teachSkill(5221004,30,30); 
		cm.teachSkill(5221006,10,10);
		cm.teachSkill(5221007,30,30); 
		cm.teachSkill(5221008,30,30); 
		cm.teachSkill(5221009,20,20); 
		cm.teachSkill(5221010,25,25); 
		cm.teachSkill(5220011,20,20); 
                cm.teachSkill(1004,1,0);
		cm.teachSkill(1003,1,0);
		cm.teachSkill(1005,1,0);
		cm.teachSkill(1006,1,0);
		cm.teachSkill(1016,1,0);
		cm.teachSkill(10000018,1,0);
		cm.teachSkill(10001003,1,0);
		cm.teachSkill(10001004,1,0);
		cm.teachSkill(10001005,1,0);
		cm.teachSkill(10001006,1,0);
		cm.teachSkill(10001017,1,0);
		cm.teachSkill(20000024,1,0);
		cm.teachSkill(20001003,1,0);
		cm.teachSkill(20001004,1,0);
		cm.teachSkill(20001005,1,0);
		cm.teachSkill(20001006,1,0);
                cm.maxAllSkills(20);
		cm.sendOk("激活成功");
		cm.dispose();
		} else {
  		cm.sendOk("120级以上才能使用");
		cm.dispose();
		}


	} else if (selection == 7) {
		cm.sendNext("  #fUI/UIWindow.img/QuestIcon/6/0#\r\n  您好，我是#b#r"+cm.ms()+"冒险岛#k人气商。\r\n  购买人气的价格为每点 #r" + Priceone + "#k 游戏币\r\n  如需购买,请点下一步!");
                test = 1;

	} else if (selection == 8) {
		cm.sendNext("  #fUI/UIWindow.img/QuestIcon/7/0#\r\n  您好，我是#b#b#r"+cm.ms()+"冒险岛#k金币商。\r\n  购买金币的价格为 #r100万冒险币#k 需要 #r" + Pricetwo + "#k 点卷购买\r\n  如需购买,请点下一步!");
                test = 2;

	} else if (selection == 9) {
		cm.sendNext("  #fUI/UIWindow.img/QuestIcon/4/0#\r\n  您好，我是#b#b#r"+cm.ms()+"冒险岛#k点卷商。\r\n  购买点卷的价格为 #r1充值币#k 可以购买 #r" + Pricethr + "#k 点卷\r\n  如需购买,请点下一步!");
                test = 3;

	} else if (selection == 10) {
		var statup = new java.util.ArrayList();
		cm.getChar().setHp(0);
		cm.getChar().setMp(0);
		statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.HP, java.lang.Integer.valueOf(0)));
		statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.MP, java.lang.Integer.valueOf(0)));
		cm.c.getPlayer().getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.updatePlayerStats(statup));
		cm.serverNotice("可怜的"+ cm.getChar().getName() +"，情场失意，在市场惨烈自杀，大家安慰安慰它吧。"); 
		cm.dispose();  
		

	}else if (selection == 11){

	    var add = "欢迎来到#r"+cm.ms()+"冒险岛#k,我可以为你扩充好友储存数量.";

		add +="当然#b最高可增加50个好友,#k希望你在本服玩的开心,朋友多多,快乐多多.\r\n\r\n";

		add +="#r注意:每次只增加5个好友数量.#k\r\n";

		add +="#L14##b"+ttt+"我要增加好友数量"+ttt+"#l\r\n";

		cm.sendSimple (add); 



	}else if (selection == 12){

	    var add = "欢迎来到#r"+cm.ms()+"冒险岛#k,我可以为你清理背包多余的垃圾.";

		add +="在清理前请将你的重要物品放进仓库,否则清理时可能会丢失,";

		add +="丢失后无法找回,请慎重考虑哦.\r\n\r\n";

		add +="#L15#"+ttt+"-#b装备栏[慎重]#l\r\n";

		add +="#L16#"+ttt+"-#b消耗栏[慎重]#l\r\n";

		add +="#L17#"+ttt+"-#b任务栏[慎重]#l\r\n";

		add +="#L18#"+ttt+"-#b杂物栏[慎重]#l\r\n";

		add +="#L19#"+ttt+"-#b现金栏[慎重]#l\r\n";

		cm.sendSimple (add); 


	}else if (selection == 100){

	    var add = "欢迎来到#r"+cm.ms()+"冒险岛#k,我可以为你锁定装备.";

		add +="装备锁定后无法丢弃,无法交易,无法解锁,只有装备锁定时间结束才可以交易丢弃,";

		add +="如果你考虑得当,那么请进入下面的选项吧...\r\n\r\n";

		add +="#L101#"+ttt+"-#b锁定-[#r500点卷#b]#l\r\n";

		add +="#L102#"+ttt+"-#b解锁-[#r500点卷#b]#l";

		cm.sendSimple (add); 



	} else if (selection == 13) {
		if (!cm.haveItem(4002001)) {
		cm.sendOk("#b请收集到宝箱后进行鉴定,你目前的宝箱不足.");
		cm.dispose();
		} else {
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		for(var i = 1;i<=5;i++){
		if(cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(i)).isFull()){
		cm.sendOk("#b您至少应该让所有包裹都空出一格");
		cm.dispose();
		return;
		}
		}
		var chance = Math.floor(Math.random()*bxjd.length);
		var finalitem = Array();
		for(var i = 0 ;i<bxjd.length;i++){
		if(bxjd[i][1] >= chance){
		finalitem.push(bxjd[i]);
		}
		}
		if(finalitem.length != 0){
		var random = new java.util.Random();
		var finalchance = random.nextInt(finalitem.length);
		var itemId = finalitem[finalchance][0];
		var quantity = finalitem[finalchance][2];
		var Laba = finalitem[finalchance][2];
		if(ii.getInventoryType(itemId).getType() == 1){
		var toDrop = ii.randomizeStats(ii.getEquipById(itemId));
		}else{
		var toDrop = new net.sf.odinms.client.Item(itemId, 0, quantity);
		}
		cm.gainItem(4002001,-1);
		net.sf.odinms.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop,-1);
		if(Laba == 1){

cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.getItemMegas(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "从飞天猪获得！大家一起恭喜他/她吧！！！",toDrop, true).getBytes());
		cm.sendOk("#b非常感谢参加本次系统活动,多多努力,获取更多的礼物吧.");
		cm.dispose();
		}else{
		cm.sendOk("#b欢迎参加本次系统活动,抱歉你这次没有中奖呢.");
		cm.gainItem(4002001,-1);
		cm.dispose();
		}
		}
		}

	} else if (selection == 24) {
		if (cm.getMeso() >= 1500000000) {
		cm.setyh(15);
		cm.gainMeso(-1500000000); 
		cm.sendOk("#b存储成功.");   
		cm.dispose();
                } else {
		cm.sendOk("#b您背包余额不足,无法进行存储.");
		cm.dispose();
                }   
                             
	} else if (selection == 25) {
		if (cm.getMeso() >= 647000000) {
		cm.sendOk("#b您身上的金币过多,请使用后在来取款.");
                cm.dispose();
		} else if (cm.getyh() >= 15) {
		cm.gainMeso(1480000000);                
		cm.setyh(-15); 
		cm.sendOk("#b取款成功.");
		cm.dispose();
                } else {
		cm.sendOk("#b您的银行存款数量没有这么多.");
		cm.dispose();
                }  
  
	} else if (selection == 22) {
		if (cm.getMeso() >= 1000000000) {
		cm.setyh(10);
		cm.gainMeso(-1000000000);   
		cm.sendOk("#b存储成功.");
		cm.dispose();
                } else {
		cm.sendOk("#b您背包余额不足,无法进行存储.");
		cm.dispose();
		}

	} else if (selection == 23) {
		if (cm.getMeso() >= 1147000000) {
		cm.sendOk("#b您身上的金币过多,请使用后在来取款.");
                cm.dispose();
                } else if (cm.getyh() >= 10) {
		cm.gainMeso(980000000);                
		cm.setyh(-10); 
		cm.sendOk("#b取款成功.");
		cm.dispose();
                } else {
		cm.sendOk("#b您的银行存款数量没有这么多.");
		cm.dispose();
		}  
  
	} else if (selection == 20) {
		if (cm.getMeso() >= 500000000) {
		cm.setyh(5);
		cm.gainMeso(-500000000);   
		cm.sendOk("#b存储成功.");  
		cm.dispose();
                } else {
		cm.sendOk("#b您背包余额不足,无法进行存储.");
		cm.dispose();
		}

	} else if (selection == 21) {
		if (cm.getMeso() >= 1647000000) {
		cm.sendOk("#b您身上的金币过多,请使用后在来取款.");
                cm.dispose();
                } else if (cm.getyh() >= 5) {
		cm.gainMeso(480000000);                
		cm.setyh(-5);
		cm.sendOk("#b取款成功.");
		cm.dispose();
                } else {
		cm.sendOk("#b您的银行存款数量没有这么多.");
		cm.dispose();
		} 

	} else if (selection == 50) {
		cm.sendStyle("用我们特殊开发的机器可查看护肤后的效果噢,想换成什么样的皮肤呢？请选择～~", skin, 0);
                test = 4;

	} else if (selection == 51) {
		facenew = Array();
		hairnew = Array();
		if (cm.getChar().getGender() == 0) {
		for(var i = 0; i < mhair.length; i++) {
		hairnew.push(mhair[i] + parseInt(cm.getChar().getHair() % 10));
		}
		} 
		if (cm.getChar().getGender() == 1) {
		for(var i = 0; i < fhair.length; i++) {
		hairnew.push(fhair[i] + parseInt(cm.getChar().getHair() % 10));
		}
		}
		cm.sendStyle("我可以改变你的发型,让它比现在看起来漂亮.你为什么不试着改变它下? 如果你有#b初级VIP1会员#k,我将会帮你改变你的发型,那么选择一个你想要的新发型吧!", hairnew,0);
                test = 5;

	} else if (selection == 52) {
		beauty = 2;
		haircolor = Array();
		var current = parseInt(cm.getChar().getHair()/10)*10;
		for(var i = 0; i < 8; i++) {
		haircolor.push(current + i);
		}
		cm.sendStyle("我可以改变你的发色,让它比现在看起来漂亮. 你为什么不试着改变它下? 如果你有#b初级VIP1会员#k,我将会帮你改变你的发色,那么选择一个你想要的新发色吧!", haircolor,0);
                test = 6;

	} else if (selection == 53) {
		facenew = Array();
		if (cm.getChar().getGender() == 0) {
		for(var i = 0; i < mface.length; i++) {
		facenew.push(mface[i] + cm.getChar().getFace() % 1000 - (cm.getChar().getFace() % 100));
		}
		}
		if (cm.getChar().getGender() == 1) {
		for(var i = 0; i < fface.length; i++) {
		facenew.push(fface[i] + cm.getChar().getFace() % 1000 - (cm.getChar().getFace() % 100));
		}
		}
		cm.sendStyle("我可以改变你的脸型,让它比现在看起来漂亮. 你为什么不试着改变它下? 如果你是#b初级VIP1会员#k,我将会帮你改变你的脸型,那么选择一个你想要的新脸型吧!", facenew,0);
                test = 7;
	} else if (selection == 54) {
		if (cm.getChar().getGender() == 0) {
		var current = cm.getChar().getFace() % 100 + 20000;
		}else{
		var current = cm.getChar().getFace() % 100 + 21000;
		}
		colors = Array();
		colors = Array(current, current + 100, current + 200, current + 300, current + 400, current + 500, current + 600, current + 700);
		cm.sendStyle("请选择你喜欢的颜色.", colors,0);
                test = 8;

		}

//-----------------------------------------------------------------------------

	} else if (status == 3){

	if (selection == 14) {
		if (cm.getMeso() >=5000000) { 
		var capacity = cm.getPlayer().getBuddylist() .getCapacity();
		if (capacity >= 50 ) {
		cm.getPlayer().dropMessage(1, "不能再增加人数.");
		cm.dispose(); 
		}else{
		var newcapacity = capacity + 5;
		cm.updateBuddyCapacity(newcapacity);
		cm.getPlayer().dropMessage(1, "成功增加5个好友空间.");
		cm.gainMeso(-5000000);
		cm.dispose(); 
		}
		}else{
		cm.getPlayer().dropMessage(1, "您的钱不够.");
		cm.dispose(); 
		}

	} else if(selection == 15){
		cm.deleteItem(1); 
		cm.sendOk("清理成功!"); 
		cm.dispose(); 

	} else if(selection == 16){
		cm.deleteItem(2); 
		cm.sendOk("清理成功!"); 
		cm.dispose(); 
		
	} else if(selection == 17){
		cm.deleteItem(3); 
		cm.sendOk("清理成功!"); 
		cm.dispose(); 
		
	} else if(selection == 18){
		cm.deleteItem(4); 
		cm.sendOk("清理成功!"); 
		cm.dispose(); 

	} else if(selection == 19){
		cm.deleteItem(5); 
		cm.sendOk("清理成功!"); 
		cm.dispose(); 


	} else if(selection == 101){

	    var add = ""+ttt+"#b请输入装备的顺序数字,我将为你锁定它.\r\n";

		add +=""+ttt+"装备锁定后无法交易,丢弃,解锁,请考虑后操作.\r\n";

		add +=""+ttt+"注意:#r此功能只可使用与装备栏.";

		cm.sendGetNumber(add,1,1,100); 

                test = 9;


	} else if(selection == 102){


	    var add = ""+ttt+"#b请输入装备的顺序数字,我将为你解锁它.\r\n";

		add +=""+ttt+"装备解锁后可以交易,丢弃,解锁,请考虑后操作.\r\n";

		add +=""+ttt+"注意:#r此功能只可使用与装备栏.";

		cm.sendGetNumber(add,1,1,100); 

                test = 10;

	} else if(selection == 103){

	    var add = ""+ttt+"#b请输入装备的顺序数字,我将为你锁定它.\r\n";

		add +=""+ttt+"装备锁定后无法交易,丢弃,解锁,请考虑后操作.\r\n";

		add +=""+ttt+"注意:#r此功能只可使用与装备栏.";

		cm.sendGetNumber(add,1,1,100); 

                test = 11;

	} else if(selection == 104){

	    var add = ""+ttt+"#b请输入装备的顺序数字,我将为你锁定它.\r\n";

		add +=""+ttt+"装备锁定后无法交易,丢弃,解锁,请考虑后操作.\r\n";

		add +=""+ttt+"注意:#r此功能只可使用与装备栏.";

		cm.sendGetNumber(add,1,1,100); 

                test = 12;




	} else if (test == 1) {
		cm.sendGetNumber("#fUI/UIWindow.img/QuestIcon/6/0#\r\n\r\n#b购买#r1点人#b气需要#r金币500万#b,\r\n您目前所有金币一共可购买#r" + Math.floor(cm.getMeso() / Priceone) + "#k#b点人气,\r\n请在下面输入你要购买的人气数量. ",1,1,10000);	
                test = 1;

	} else if (test == 2) {
		cm.sendGetNumber("#fUI/UIWindow.img/QuestIcon/7/0#\r\n\r\n#b购买#r100万金币#b需要#r100点卷#b,\r\n请在下面输入你要购买的金币数量.\r\n#r输入1则是100万的意思. ",1,1,1000);	
                test = 2;

	} else if (test == 3) {
		cm.sendGetNumber("#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#b购买#r1点卷#b需要#r1充值币#b,\r\n请在下面输入你要购买的点卷数量.\r\n#r输入1则是1点的意思. ",1,1,500000);	
                test = 3;

	} else if (test == 4) {
                cm.setSkin(skin[selection]);
		cm.sendOk("好了,你的朋友们一定认不出来是你了!");
		cm.dispose();

	} else if (test == 5) {
                cm.setHair(hairnew[selection]);
		cm.sendOk("好了,你的朋友们一定认不出来是你了!");
		cm.dispose();

	} else if (test == 6) {
		cm.setHair(haircolor[selection]);
		cm.sendOk("好了,你的朋友们一定认不出来是你了!");
		cm.dispose();

	} else if (test == 7) {
                cm.setFace(facenew[selection]);
		cm.sendOk("好了,你的朋友们一定认不出来是你了!");
		cm.dispose();

	} else if (test == 8) {
                cm.setFace(colors[selection]);
		cm.sendOk("好了,你的朋友们一定认不出来是你了!");
		cm.dispose();


		}

//-----------------------------------------------------------------------------

	} else if (status == 4){

	if (test == 1) {
		nulled = selection;
		if ((cm.getPlayer().getFame() + nulled) < 32767){
		cm.sendYesNo("#b您购买 #r" + nulled + "#k #b点人气,需要 #r" + nulled * Priceone + "#k #b游戏币,您确定要购买吗？");  
		test = 1;
		}else{
		cm.sendOk("由于最大人气上限为32767，您已经不能购买这么多人气了!");
		cm.dispose();
		}

	} else if (test == 2) {
		nulled = selection;
            	cm.sendYesNo("#b您购买 #r" + nulled + "#k #b百万冒险币,需要 #r" + nulled * Pricetwo + "#k #b点卷,您确定要购买吗？" );  
                test = 2;
          
	} else if (test == 3) {
                nulled = selection;
            	cm.sendYesNo("#b您购买 #r" + nulled + "#k #b元宝点卷,#b将能购买到 #r" + nulled * Pricethr + "#k #b点卷,您确定要购买吗？" ); 
                test = 3;


	} else if (test == 9) {
		slot = selection;
		var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot);
		cm.sendYesNo("你确定要加锁下面这件装备吗?\r\n");
                test = 13;

	} else if (test == 10) {
		slot = selection;
		var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot);
		cm.sendYesNo("#b你确定要加锁下面这件装备吗?\r\n");
                test = 14;

	} else if (test == 11) {
		slot = selection;
		var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot);
		cm.sendYesNo("#b你确定要加锁下面这件装备吗?\r\n");
                test = 15;

	} else if (test == 12) {
		slot = selection;
		var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot);
		cm.sendYesNo("#b你确定要加锁下面这件装备吗?\r\n");
                test = 16;


		}

//-----------------------------------------------------------------------------

	} else if (status == 5) {

	if (test == 1) {
		if (cm.getMeso() < (nulled * Priceone)){
		cm.sendOk("#b您好,你身上的钱只够买: #r" + Math.floor(cm.getMeso() / Priceone) + " #k#b点人气.");
		}else{
		cm.gainFame(nulled);
		cm.gainMeso(-nulled * Priceone);
		cm.sendOk("#b购买人气成功,您当前的人气值: #r" + cm.getPlayer().getFame() + "#k." );
		}
		cm.dispose();

	} else if (test == 2) {
                if (cm.getChar().getNX() < (nulled * Pricetwo)){
		cm.sendOk("#b您好,你拥有的点卷只够买:#r" + Math.floor(cm.getChar().getNX() / Pricetwo) + " #k#b百万冒险币");
		}else{
		cm.gainNX(nulled);
		cm.gainMeso(-nulled * Priceone);
		cm.sendOk("#b购买点卷成功,您当前的有金币: #r" + cm.getChar().getMeso() + "#k." );
		}
		cm.dispose();

	} else if (test == 3) {
                if (cm.getzb() < (nulled)){
        	cm.sendOk("#b您好,你拥有的点卷只够买: #r" + Math.floor(cm.getzb() * Pricethr) + " #k#b点卷.");
        	}else{
		cm.gainNX(nulled * Pricethr);
		cm.setzb(-nulled);
		cm.sendOk("#b购买点卷成功,您当前的有点卷: #r" + cm.getChar().getNX() + "#k." );
		}
		cm.dispose();

	} else if (test == 13) {
		var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot);
		cm.getChar().lockitem(slot,true)
		cm.sendOk("#b成功锁定,请检查背包.");
		cm.dispose();

	} else if (test == 14) {
		var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot);
		cm.getChar().lockitem(slot,false)
		cm.sendOk("#b成功锁定,请检查背包.");
		cm.dispose();

	} else if (test == 15) {
		var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot);
		cm.getChar().lockitem(slot,true)
		cm.sendOk("#b成功锁定,请检查背包.");
		cm.dispose();

	} else if (test == 16) {
		var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(slot);
		cm.getChar().lockitem(slot,true)
		cm.sendOk("#b成功锁定,请检查背包.");
		cm.dispose();


	   	}

//-----------------------------------------------------------------------------
						
		}
		}
		}


