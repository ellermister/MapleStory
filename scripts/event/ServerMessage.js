var Message = new Array(
"欢迎来到本服务器游戏。目前游戏存在BUG较多。游戏中难免会出现掉线或者其他问题。", 
"游戏内，所有的东西都是要靠自己的努力得到。GM不会给任何玩家任何东西。", 
"请勿使用任何非法程序：变速齿轮,吸怪,无敌,虚假MISS,飞天,修改WZ,快速过图,修改怪物状态,挂机等外挂,被发现则封号封IP！", 
"发现游戏错误地方(BUG)或游戏漏洞时.请第一时间提交给在线管理.如发现BUG不提交，利用游戏BUG非法获得其物品财产将处于封号处理。对于提交重大BUG的玩家，我们将会给予点券奖励！", 
"使用 @help 命令，可以查看你当前能使用的命令列表。", 
"如果无法和NPC进行对话，请使用 @ea 命令。", 
"在一些常去的城市地图可以点击左边的快捷移动，来快速移动到自由市场，匠人街等等地图。", 
"玩家可以到专业技术地图学习各种生活技能。",
"如果玩家卡在了地图，可以使用@FM回到市场",
"严禁玩家私下RMB等非游戏数据交易,谁先提出非法交易,另一方提供截图举报,即可无尝获得对方交易物品.事后24小时内举报也可.");

var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    setupTask = em.schedule("start", 900000);
}

function cancelSchedule() {
    setupTask.cancel(false);
}

function start() {
    scheduleNew();
    em.broadcastServerMsg("[公告事项] " + Message[Math.floor(Math.random() * Message.length)]);
}