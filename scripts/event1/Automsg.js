var setupTask;

function init() {
	scheduleNew();
}

function scheduleNew() {
	setupTask = em.schedule("start", 1000 * 60*3);
}

function cancelSchedule() {
	setupTask.cancel(true);
}

function start() {
	scheduleNew();
var Message = new Array("如果有不足的地方请提出来，或者有更好的建议也提出来，一起完美我们的枫叶世界!",
"让我们一起拒绝外挂，一起携手打造美好的冒险环境。",
"祝大家能够玩的开心，好友成群!",
"在游戏中遇到了问题或者BUG请及时提交，一起来完美我们的世界!");
	em.getChannelServer().broadcastPacket(net.sf.odinms.tools.MaplePacketCreator.serverNotice(0,Message[Math.floor(Math.random() * Message.length)]));
}
