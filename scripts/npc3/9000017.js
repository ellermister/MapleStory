var status = 0;
var item = 
Array(
			Array(2040017,800,1), //头盔命中率卷轴60%
			Array(2040013,800,1), //头盔智力卷轴30
			Array(2040012,800,1), //头盔智力卷轴70
			Array(2040105,800,1), //脸部装饰回避率卷轴10%
			Array(2040106,800,1), //脸部装饰回避率卷轴60%
			Array(2040108,800,1), //脸部装饰回避率诅咒卷轴30% 
			Array(2040109,800,1), //脸部装饰回避率诅咒卷轴70% 
			Array(2040200,800,1), //眼部装饰命中率卷轴10%
			Array(2040201,800,1), //眼部装饰命中率卷轴60%
			Array(2040203,800,1), //眼部装饰命中率诅咒卷轴30% 
			Array(2040204,800,1), //眼部装饰命中率诅咒卷轴70%
			Array(2040205,800,1), //眼部装饰智力卷轴10%
			Array(2040206,800,1), //眼部装饰智力卷轴60%
			Array(2040208,800,1), // 眼部装饰智力诅咒卷轴30%
			Array(2040209,800,1), //眼部装饰智力诅咒卷轴70%
			
			Array(2040301,800,1), //耳环智力卷轴 60
			Array(2040302,800,1), //耳环智力卷轴 10
			Array(2040304,800,1), //耳环智力诅咒卷轴70
			Array(2040305,800,1), //耳环智力诅咒卷轴30
			Array(2040306,800,1), //耳环敏捷卷轴70
			Array(2040307,800,1), //耳环敏捷卷轴30


                        Array(2040406,800,1), //上衣力量卷轴70%
			Array(2040407,800,1), //上衣力量卷轴30
			Array(2040410,800,1), //上衣运气诅咒卷轴70%
			Array(2040411,800,1), //上衣运气诅咒卷轴30%
			Array(2040501,800,1), //全身铠甲敏捷卷轴60
			Array(2040509,800,1), //全身铠甲敏捷卷轴30
			Array(2040513,800,1), //全身铠甲智力卷轴60
			Array(2040518,800,1), //全身铠甲智力卷轴70
			Array(2040519,800,1), //全身铠甲智力卷轴30
			Array(2040610,800,1), //裤裙敏捷诅咒卷轴70
			Array(2040611,800,1), //裤裙敏捷诅咒卷轴30
			Array(2040613,800,1), //裤裙敏捷卷轴60%
			Array(2040704,800,1), //鞋子跳跃卷轴60
			Array(2040705,800,1), //鞋子跳跃卷轴10
			Array(2040715,800,1), //鞋子跳跃卷轴30
			Array(2040804,800,1), //手套攻击卷轴60
			Array(2040811,800,1), //手套攻击卷轴30
			Array(2040810,800,1), //手套攻击卷轴70
			Array(2040805,800,1), //手套攻击卷轴10
			Array(2040816,800,1), // 手套魔力卷轴10%
			Array(2040817,800,1), //手套魔力卷轴60%
			Array(2040815,800,1), //手套魔力卷轴30%
			Array(2040922,800,1), //盾牌魔力诅咒卷轴30%
			Array(2040919,800,1), //盾牌魔力诅咒卷轴60%
			Array(2040921,800,1), //盾牌魔力诅咒卷轴70%
			Array(2040914,800,1), // 盾牌攻击卷轴60%
			Array(2040916,700,1), //盾牌攻击卷轴70%
			Array(2040917,700,1), //盾牌攻击诅咒卷轴30%
			Array(2041013,900,1), //披风力量卷轴60
			Array(2041016,900,1), //披风智力卷轴60
			Array(2041019,900,1), //披风敏捷卷轴60
			Array(2041022,800,1), //披风运气卷轴60
			Array(2041200,10,1), //暗黑龙王石
			Array(2043005,800,1), //单手剑攻击诅咒卷轴30
			Array(2044005,800,1), //双手剑攻击诅咒卷轴30
			Array(2044305,800,1), //枪攻击诅咒卷轴30
			Array(2044405,800,1), //矛攻击诅咒卷轴30
			Array(2044505,800,1), //弓攻击诅咒卷轴30
			Array(2044605,800,1), //弩攻击诅咒卷轴30
			Array(2044705,800,1), //拳套攻击诅咒卷轴30
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
			if (cm.getNX() >=300) {
				cm.sendYesNo("欢迎参加本次系统活动。使用点卷你可获得异想不到的卷轴！系统会随机抽取物品,是否继续使用888点卷进行抽奖？");
			} else {
				cm.sendOk("欢迎参加本次系统活动。你确定有300点卷吗？");
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
				cm.gainNX(-300);
				cm.getPlayer().saveToDB(true);
				cm.sendOk("非常感谢参加本次系统活动。多多努力。获取更多的礼物吧！");
				cm.dispose();
			} else {							
				cm.gainNX(-300);
				cm.gainItem(2022140,1);
				cm.getPlayer().saveToDB(true);
				cm.sendOk("欢迎参加本次系统活动。你什么也没抽到。给你一点安慰奖！");
				cm.dispose();
			}
		}
	}
}
