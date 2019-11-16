var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 3);
    cal.set(java.util.Calendar.MINUTE, 50);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 5;
    }
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
scheduleNew();
var Message = new Array(" 请各位玩家注意了.请不要在有3只相同宠物的情况下在特殊栏里面使用 集合道具 功能!",
	                " 游戏中，如果恶意利用有错误的技能导致别的玩家掉线，将会受到惩罚 ",
	                " 游戏内，所有的东西都是要靠自己的努力得到。GM不会给任何玩家任何东西 ",
                        " 请勿使用以下非法程序：变速齿轮,吸怪,无敌,虚假MISS,修改WZ,修改怪物状态,挂机等外挂,被发现则封号封IP ",
                        " NCMS - 奶茶2.0版商业端 ",
                        " 服务器测试初期阶段,有的东西还未完善,希望各位玩家能将您的好建议提供给客服,同时如果您提的建议好,我们采用了也会颁发相应奖励 ",
                        " 本服已开启扎昆、闹钟、暴力熊、心疤狮王、暗黑龙王、克雷塞尔(大树妖)等BOSS正常召唤。欢迎玩家测试挑战!",
                        " 发现游戏错误地方(BUG)或游戏漏洞时.请第一时间提交给在线管理.如发现BUG不提交，利用游戏BUG非法获得其物品财产将处于封号处理。对于提交重大BUG的玩家，我们将会给予点券奖励 ");
	em.getChannelServer().broadcastPacket(net.sf.odinms.tools.MaplePacketCreator.serverNotice(0, Message[Math.floor(Math.random() * Message.length)]));
}
