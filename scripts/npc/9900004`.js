var status = 0;
var item = 
Array(
			Array(2210029,700,3), //黄金猪猪变身道具
			Array(1092030,700,1), //枫叶盾
			Array(2022485,700,2), //跳跃力 +20，30分钟内持续
			Array(2022488,700,3), //Max HP 15% Max MP 15%，30分钟内持续
			Array(2100103,700,3), //武陵道场召唤包_萧公
			Array(1092008,750,1), //锅盖
			Array(2210000,750,3), //蘑菇仔的雕像
			Array(2210001,750,3), //漂漂猪的雕像
			Array(2210002,750,3), //白外星人的雕像
			Array(2210010,750,3), //超人变形变身药水
			Array(2210011,850,3), //超人变形变身药水
			Array(1032009,850,1), //黄方耳环
			Array(2210012,850,3), //老鼠变身
			Array(2210013,850,3), //老鼠变身
			Array(1302028,600,1), //紫雨伞
			Array(2210019,600,3), //白色兔子变身药水
			Array(2210020,600,3), //粉红兔子变身药水
			Array(1302028,600,1), //紫雨伞
			Array(1302061,550,1), //蔓藤鞭子
			Array(2210024,550,3), //我是宝贝龙
			Array(1302061,550,1), //蔓藤鞭子
			Array(1302061,550,1), //蔓藤鞭子
			Array(1302061,550,1), //蔓藤鞭子
			Array(1302063,500,1), //燃烧的火焰刀
			Array(1032035,700,1), //枫叶耳环
			Array(2210009,700,3), //苏菲莉亚丢弃的人偶
			Array(1032035,700,1), //枫叶耳环
			Array(2101118,700,3), //舞狮怪物包
			Array(2101132,700,3), //七色彩蛋包
			Array(1002508,700,1), //枫叶头盔
			Array(2210008,700,3), //幽灵糖果
			Array(1002508,700,1), //枫叶头盔
			Array(2101022,700,3), //黄金蛋召唤包
			Array(1002508,700,1), //枫叶头盔
			Array(1302058,700,1), //冒险岛伞
			Array(2022071,850,3), //太极战士
			Array(1302058,700,1), //冒险岛伞
			Array(1302058,700,1), //冒险岛伞
			Array(1302058,700,1), //冒险岛伞
			Array(1002418,700,1), //废报纸头盔
			Array(1002418,700,1), //废报纸头盔
			Array(1002418,700,1), //废报纸头盔
			Array(1002418,700,1), //废报纸头盔
			Array(1032010,700,1), //黄心耳环
			Array(1032010,700,1), //黄心耳环
			Array(1032010,700,1), //黄心耳环
			Array(1032010,700,1), //黄心耳环
			Array(1122003,700,1), //黄色蝶型领结
			Array(1122003,700,1), //黄色蝶型领结
			Array(1122003,700,1), //黄色蝶型领结
			Array(1122003,700,1), //黄色蝶型领结
			Array(1122003,700,1), //黄色蝶型领结
			Array(1122003,700,1), //黄色蝶型领结
			Array(2022141,800,1), //震魂包子
			Array(2022141,800,1), //震魂包子
			Array(2022141,800,1), //震魂包子
			Array(2022141,800,1), //震魂包子
			Array(2022141,800,1), //震魂包子
			Array(2022139,800,1), //四季烧麦
			Array(2022139,800,1), //四季烧麦
			Array(2022139,800,1), //四季烧麦
			Array(2022139,800,1), //四季烧麦
			Array(2022139,800,1), //四季烧麦
			Array(2022176,900,1), //超级药水
			Array(2022176,900,1), //超级药水
			Array(2022176,900,1), //超级药水
			Array(2022176,900,1), //超级药水
			Array(2022245,800,1), //心跳停止糖
			Array(2022245,800,1), //心跳停止糖
			Array(2022245,800,1), //心跳停止糖
			Array(2022245,800,1), //心跳停止糖
			Array(2022245,800,1), //心跳停止糖
			Array(2210006,600,1), //彩虹蜗牛壳
			Array(2210006,600,1), //彩虹蜗牛壳
			Array(2210006,600,1), //彩虹蜗牛壳
			Array(2210006,600,1), //彩虹蜗牛壳
			Array(2210006,600,1), //彩虹蜗牛壳
			Array(2210024,600,1), //我是宝贝龙
			Array(2210024,600,1), //我是宝贝龙
			Array(2210024,600,1), //我是宝贝龙
			Array(2210024,600,1), //我是宝贝龙
			Array(1402014,100,1), //温度计
			Array(3010068,80,1), //露水椅子
			Array(3010093,80,1), //鲜美的火鸡椅子
			Array(3010044,80,1), //同一红伞下
			Array(1442020,500,1), //巨灵开山斧
			Array(2043803,200,1), //长帐攻击必成卷
			Array(1122000,20,1) //黑龙项链
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
			if (cm.haveItem(5220040)) {
				cm.sendYesNo("欢迎参加本次系统活动。使用飞天猪的蛋你可获得异想不到的物品！系统会随机抽取物品，物品列表见市场NPC：冒险岛管理员2 是否继续使用飞天猪的迷之蛋进行抽奖？");
			} else {
				cm.sendOk("欢迎参加本次系统活动。你确定有飞天猪的蛋吗？");
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
					var toDrop = ii.randomizeStats(ii.getEquipById(itemId));
				}else{
					var toDrop = new net.sf.odinms.client.Item(itemId, 0, quantity);
				}
				net.sf.odinms.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.getItemMegas(cm.getC().getChannel(),cm.getPlayer().getName() + " : " + "从系统内置活动获得！大家一起恭喜他（她）吧！！！",toDrop, true).getBytes());
				cm.gainItem(5220040,-1);
				cm.sendOk("非常感谢参加本次系统活动。多多努力。获取更多的礼物吧！");
				cm.dispose();
			} else {
				cm.sendOk("哎呀……怎么搞的？什么都没拿到！过段时间再来吧！");
				cm.gainItem(5220040,-1);
				cm.dispose();
			}
		}
	}
}