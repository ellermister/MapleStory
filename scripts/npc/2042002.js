var status;
var questions = new Array("日本人是人？",
"春哥强大过于曾哥?",
"本服的QQ群是不是:112968939?",
"你接吻吐不吐舌头?",
"我帅不帅?",
"鸵鸟的眼睛比他脑子大?",
"爱迪生发明了灯泡是害怕黑暗?",
"这个私服版本是不是079?",
"冒险岛世界里面最弱小的怪物是蓝蜗牛 ?",
"冒险岛079目前最强BOSS是绿水灵王?",
"粉色花.是不是在天空之城?",
"当你杀死勇士部落的野猪,野猪会暴[皮革]?.",
"我是不是帅到一塌糊涂呀?.",
"射手村是不是有鳄鱼？.",
"中国是不是世界上最强大的国家?.",
" 麻花疼是不是人？.",
"初学者坐出租车是否只需要100金币?.",
"奶茶冒险岛是不是最好玩的.",
"陈天桥是不是狗娘养的.",
"凤姐是不是你老婆.",
"我是不是犀利哥在世?.",
"扎昆是不是在泰国打的?.",
"A+B是不是=C?.",
"Y+X是不是=Z?.",
"H+M是不是=N?.",
"奶茶冒险岛是不是1月25号开的?.",
"凤姐昨天多我笑了,你相信吗?."
);
var answers = new Array(false, false, true, true, true, true, true, true, false, false, false, false, true, false, true, false, false, true, true, false, false, false, false, true, true, true, false);
var rOutput = new Array("请看看小学语文书再来吧..",
"请看看小学语文书再来吧..'",
"请看看小学语文书再来吧..",
"请看看小学语文书再来吧..",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧..",
"请看看小学语文书再来吧..",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧..",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧..",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧..",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧..",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧..",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧..",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧..",
"请看看小学语文书再来吧...",
"请看看小学语文书再来吧..."
);
var asked = new Array();
var currentQuestion;

function start() {
status = -1;
action(1, 0, -1);
}

function action(mode, type, selection) {
if (status == 3 && mode == 1) { // continue quiz.
status = 2;
selection = 0;
} else if (mode == 1 || (mode == 0 && type == 1)) // answering / accepting
status++;
else {
if (type == 12 && mode == 0) // declining.
cm.sendOk("你好!这里是#b冒险岛答题活动#k!");
cm.dispose();
return;
}
	
if (status == 0)
cm.sendAcceptDecline("欢迎来到#b奶茶冒险岛#k,为增加游戏乐趣,#b管管#k使用此NPC,为玩家服务,很强大的答题任务,内容涉及#b网络内容#k,以及#b英文考试#k.\r\n#r点击接受,开始你的智力考核吧.#k");

else if (status == 1)
//cm.sendSimple("欢迎来到#b奶茶冒险岛#k,为增加游戏乐趣,#b管管#k使用此NPC,为玩家服务,很强大的答题任务,内容涉及#b网络内容#k,以及#b英文考试#k.#b\r\n#L0#开始答题!#l\r\n#L1#如何解释答题?#l\r\n#L2#查看答题奖励#l\r\n#L3#哪里做了疑问来从.#l");
cm.sendSimple("欢迎来到#b奶茶冒险岛#k由于此NPC发现有玩家任意刷道具！\r\n暂时停止此NPC使用！\r\n#L3#谢谢您对我们的支持.#l");

else if (status == 2) {
if (selection == 0) {
if (questions.length == asked.length) {
cm.sendNext("#b你是不是大学毕业了,脑子这么灵活,既然全被你答对了.");
getPrize();
cm.dispose();
} else {
currentQuestion = -1;
while (contains(currentQuestion) || currentQuestion == -1) {
currentQuestion = Math.floor(Math.random() * questions.length);
}
asked.push(currentQuestion);
cm.sendYesNo("#b答题活动.阶段 "+asked.length+":#k\r\n"+questions[currentQuestion]);
}
} else if (selection == 1) {
cm.sendNext("#b答题不需要答案,你只要点击右下角的是或者不是就可以完成答题.");
status = 0;
} else if (selection == 2) {
cm.sendNext("#b答题任务强化了哦,增加了GM卷,漂亮的椅子,还有特殊玩具哦,如果你答题到了一般,选择不在继续,将可以获得小部分奖励.");
status = 0;
} else if (selection == 3) {
cm.sendNext("谢谢你对我们的支持..");
cm.dispose();
}
} else if (status == 3) {
var answer = mode == 0 ? false : true;
if (answers[currentQuestion] == answer) {
cm.sendYesNo("#b正确#k.你想获得更好的奖励而继续答题下去么?");
} else {
cm.sendOk("#r不正确的答案 !#k\r\n"+rOutput[currentQuestion]);
cm.dispose();
}
} else if (status == 4) {
getPrize();
cm.sendOk("#b你完成了..你获得了奖励.请去背包查收.");
cm.dispose();
}
}

function contains(quest) {
for (var i = 0; i < asked.length; i++) {
if (asked[i] == quest)
return true;
}
return false;
}

function getPrize() {
var hasQuant = false;
var junk = new Array(4000009, 4000006, 4000005, 4000014, 4000016, 4000023, 4000022, 4000030, 4000029, 4000036, 4000038, 4000422);//其他设置

var junkWeap = new Array(1432043,1432000, 1432001, 1432009, 1432024, 1432042, 1432002, 1442039, 1322010,
				 1442007, 1322004, 1442035, 1442024, 1442025, 1382000, 1382003, 1382018, 
				 1382042, 1382004, 1382015, 1382012, 1322051, 1382019, 1382019, 1412001, 
				 1412000, 1412005, 1412013, 1412018, 1412005, 1412008, 1412027, 1422000,
				 1422006, 1422003, 1422004, 1422033, 1402013, 1402029, 1402007, 1402044, 
				 1402006, 1402002, 1402010, 1402014, 1402009, 1402018, 1372005, 1372006,
				 1372043, 1372022, 1372001, 1452023, 1452001, 1452032, 1312018, 1472030,
				 1472003, 1472000, 1312005, 1462023, 1462000, 1462034, 1462005, 1332021,
				 1332032, 1332007, 1332006, 1312033, 1332029, 1332049);//普通武器

var useable = new Array(2022280, 2022073, 2022112, 2022089, 2010000, 2022178, 2100016, 2100000, 2102006, 2100001, 2100007);//消耗设置

var goodEqWeap = new Array(1432039, 1432007, 1432040, 1302058, 1432018, 1432011, 1432030, 1442034, 1442020, 
			   1442019, 1442045, 1442044, 1432039, 1382007, 1382034, 1382024, 1302104, 1412025, 
			   1382016, 1382035, 1382037, 1412018, 1412007, 1412019, 1412027, 1412008, 1412025, 
			   1372011, 1412009, 1412010, 1412021, 1422027, 1422013, 1372017, 1422010, 1422029, 
			   1422009, 1422005, 1422025, 1402037, 1402035, 1402016, 1302128, 1402004, 1402012, 
			   1402039, 1372010, 1372016, 1372008, 1372015, 1372033, 1302129, 1452017, 1452019, 
			   1452020, 1452014, 1452012, 1452060, 1472028, 1402044, 1312013, 1472053, 1472033, 
			   1462017, 1462015, 1462021, 1462013, 1382060, 1402063, 1332026, 1332051, 1332052, 
			   1312030, 1312015, 1312010, 1312004, 1312016, 1322045, 1302063, 1322020, 1322019,
			   1322029); //玩具设置

var Rare = new Array(1432038, 1442002, 1382036, 1412026, 1422028, 1402036, 1372032, 1452044, 1472052, 1472051,
		     1462039, 1332050, 1332049, 1312031, 1322052, 1302059, 2022118);//高级装备设置


var rand = Math.floor(Math.random() * 100)+(asked.length*2);
var curArray;
if (rand < 20) {
curArray = junk;
hasQuant = true;

} else if (rand >= 20 && rand <= 40) {
curArray = junkWeap;

} else if (rand > 40 && rand <= 60) {
curArray = useable;
hasQuant = true;

} else if (rand > 60 && rand <= 80) {
curArray = goodEqWeap;

} else if (rand > 80 && rand <= 95) {
curArray = goodEqWeap;
} else {
curArray = Rare;
}
cm.gainItem(curArray[Math.floor(Math.random() * curArray.length)], hasQuant ? Math.floor(Math.random() * 20) : 1);
}