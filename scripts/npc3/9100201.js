var status = 0;
var item = 
Array(
			Array(2290000,800,1), //磁石70
			Array(2290001,800,1), //磁石50
			Array(2290002,600,1), //啊基里斯70
			Array(2290003,800,1), //啊基50
			Array(2290004,600,1), //突进70
			Array(2290005,800,1), //突进50
			Array(2290006,700,1), //泰山70
			Array(2290007,800,1), //泰山50
			Array(2290008,400,1), //进斗气70
			Array(2290009,400,1), //进斗气50 
			Array(2290010,600,1), //轻舞70
			Array(2290011,600,1), //轻舞50
			Array(2290012,600,1), //连环破70
			Array(2290013,600,1), //连环破50
			Array(2290014,800,1), //寒冰70
			
			Array(2290015,800,1), //寒冰50
			Array(2290016,800,1), //葵花70
			Array(2290017,800,1), //葵花50
			Array(2290018,800,1), //圣阴剑70
			Array(2290019,800,1), //圣锤子70
			Array(2290020,800,1), //圣域70
			Array(2290021,800,1), //圣域50


                        Array(2290022,600,1), //恶龙70
			Array(2290023,600,1), //恶龙50
			Array(2290024,800,1), //法反70
			Array(2290025,800,1), //法反50
			Array(2290026,800,1), //创70
			Array(2290027,800,1), //创50
			Array(2290028,800,1), //终极70
			Array(2290029,800,1), //中级50
			Array(2290030,600,1), //连环破70
			Array(2290031,600,1), //50
			Array(2290032,800,1), //连环闪70
			Array(2290033,800,1), //50
			Array(2290034,800,1), //圣盾70
			Array(2290035,800,1), //50
			Array(2290036,800,1), //火球70
			Array(2290037,800,1), //50
			Array(2290038,800,1), //冰兽70
			Array(2290039,800,1), //50
			Array(2290040,600,1), //落星70
			Array(2290041,600,1), //50
			Array(2290042,800,1), //冰球70
			Array(2290043,800,1), //冰球50
			Array(2290044,800,1), //火兽70
			Array(2290045,800,1), //50
			Array(2290046,800,1), //冰破70
			Array(2290047,800,1), //50
			Array(2290048,300,1), //圣光70
			Array(2290049,400,1), //50
			Array(2290050,800,1), // 光芒飞溅70
			Array(2290051,800,1), //50
			Array(2290052,500,1), //火眼70
			Array(2290053,500,1), //50
			Array(2290054,900,1), //飞龙70
			Array(2290055,900,1), //50
			Array(2290056,800,1), //神尖70
			Array(2290057,800,1), //50
			Array(2290058,800,1), //击退70
			Array(2290059,800,1), //50
			Array(2290060,400,1), //暴风雨70
			Array(2290061,300,1), //暴风雨50
			Array(2290062,800,1), //火凤凰70
			Array(2290063,800,1), //50
			Array(2290064,800,1), //集中70
			Array(2290065,800,1), //50
			Array(2290066,500,1), //神努手70
			Array(2290067,800,1), //50
			Array(2290068,800,1), //刺眼70
			Array(2290069,800,1), //50
			Array(2290070,800,1), //穿透70
			Array(2290071,800,1), //50
			Array(2290072,800,1), //冰鹰70
			Array(2290073,800,1), //50
			Array(2290074,800,1), //一己70
			Array(2290075,800,1), //50
			Array(2290076,800,1), //假动作70
			Array(2290077,800,1), //50
			Array(2290078,800,1), //拳套攻击诅咒卷轴30
			Array(2290079,800,1), //拳套攻击诅咒卷轴30
			Array(2290080,800,1), //拳套攻击诅咒卷轴30
			Array(2290084,800,1), //拳套攻击诅咒卷轴30
			Array(2290085,800,1), //拳套攻击诅咒卷轴30
			Array(2290092,800,1), //拳套攻击诅咒卷轴30
			Array(2290093,800,1), //拳套攻击诅咒卷轴30
			Array(2290096,800,1), //拳套攻击诅咒卷轴30
			Array(2290112,800,1), //拳套攻击诅咒卷轴30
			Array(2290113,800,1), //拳套攻击诅咒卷轴30
			Array(2290119,800,1), //拳套攻击诅咒卷轴30
			Array(2290120,800,1), //拳套攻击诅咒卷轴30
			Array(2290125,800,1),//拳套攻击诅咒卷轴30
			Array(2290132,800,1),//拳套攻击诅咒卷轴30
			Array(2290133,800,1),//拳套攻击诅咒卷轴30
			Array(2290078,900,1),//拳套攻击诅咒卷轴
			Array(2022176,800,1),//超级
			Array(4002001,600,1),//超级
			Array(4002002,600,1),//超级
			Array(4002003,600,1),//超级
			Array(2022140,700,1),//笑口
			Array(2100016,600,1),//奇怪召唤报
			Array(2100075,400,1)//蜈蚣王
);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getNX() >= 999) {
				cm.sendYesNo("欢迎参加本次系统活动。使用点卷你可获得异想不到的技能书！系统会随机抽取技能书,是否继续使用999点卷进行抽奖？");
			} else {
				cm.sendOk("欢迎参加本次系统活动。你确定有999点卷吗？");
				cm.dispose();
			}
		} else if (status == 1){	
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
			for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出一格");
					cm.dispose();
					return;
				}
			}
			var chance = Math.floor(Math.random()*1000);
			var finalitem = Array();
			for(var i = 0 ;i<item.length;i++){
				if(item[i][1] >= chance){
					finalitem.push(item[i]);
				}
			}
			if(finalitem.length != 0){
				var random = new java.util.Random();
				var finalchance = random.nextInt(finalitem.length);
				var itemId = finalitem[finalchance][0];
				var quantity = finalitem[finalchance][2];
			        if(ii.getInventoryType(itemId).getType() == 1){
			        	var toDrop = ii.randomizeStats(ii.getEquipById(itemId)).copy();
				}
				else{
				 	 var toDrop = new net.sf.odinms.client.Equip(itemId,0).copy();
				}
				net.sf.odinms.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop,-1);
				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.getItemMega(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "从卷轴抽奖机获得！大家一起恭喜他（她）吧！！！",toDrop, true).getBytes());				
				cm.gainNX(-999);
				cm.getPlayer().saveToDB(true);
				cm.sendOk("非常感谢参加本次系统活动。多多努力。获取更多的礼物吧！");
				cm.dispose();
			} else {							
				cm.gainNX(-999);
				cm.gainItem(2022140,1);
				cm.getPlayer().saveToDB(true);
				cm.sendOk("欢迎参加本次系统活动。你什么也没抽到。给你一点安慰奖！");
				cm.dispose();
			}
		}
	}
}
