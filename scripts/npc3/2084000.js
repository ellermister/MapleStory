/*
*********该文件为Vr001 封测版服务端的NPC脚本文件**********
*********该脚本适用服务端为Vr001 封测版版本为079**********
******************版权Vr001 封测版***********************
*****************制作永恒装备**********************
****************Vr001 封测版服务端专用NPCJS**************
****************版权所有Vr001 封测版*********************
******************维护/更新************************
***************************************************
*/

importPackage(net.sf.odinms.client);

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else
		cm.dispose();
	if (status == 0 && mode == 1) {
		var selStr = "啊哈！！你是怎么找到我的！我可以帮你制作#r永恒装备！#k\r\n#e#r心动吗？\r\n#b请选择你想制作的道具吧！#b\r\n(听说其他永恒道具也可以制作哦！)"
		var options = new Array("#r永恒饰品(全职业可用)","#d能否告诉我需要什么材料？");
		for (var i = 0; i < options.length; i++){
			selStr += "\r\n#L" + i + "# " + options[i] + "#l";
		}
			
		cm.sendSimple(selStr);
	}
	else if (status == 1 && mode == 1) {
		selectedType = selection;
		if (selectedType == 0){ //全职业可用的永恒装备
			var selStr = "如果有材料，我可以为你制作以下的物品。你需要哪一种？#b";
			var items = new Array ("永恒金盾坠 （耳饰）#k(等级限制 : 120, 全职业)#b","封印的永恒玉佩 （项链）#k(等级限制 : 120, 全职业)#b","永恒玉佩 （项链） #k(等级限制 : 120, 全职业)#b","永恒不灭披风 （披风）#k(等级限制 : 120, 全职业)#b");
			for (var i = 0; i < items.length; i++){
				selStr += "\r\n#L" + i + "# " + items[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 1){ //能否告诉我需要什么材料
			cm.sendOk("合成永恒装备（120级全职业可用）。如果你有以下材料才可以合成！\r\n#r陈年老骨头\r\n永恒的雪花\r\n枫叶\r\n冒险币\r\n#k以上道具怪物均可掉落");
			cm.dispose();
			//var selStr = "嗯...你想合成什么样的？#b";
			//var items = new Array ("");
			for (var i = 0; i < items.length; i++){
				selStr += "\r\n#L" + i + "# " + items[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 2){ //其他永恒道具去哪制造？
			cm.sendOK("尊敬的玩家，在我这里只可以合成的永恒道具有限哦！如果你需要其他职业的永恒装备道具。不妨多去找找其他地图哦！");
	

			cm.sendSimple(selStr);
		}
		else if (selectedType == 3){ //wand refine
			var selStr = "要是你能收集各种材料，我就用魔法给你做短杖。你想做什么样的短杖？#b";
			var items = new Array ("木制短杖#k(等级限制 : 8, 公用)#b","高级木制短杖#k(等级限制 : 13, 公用)#b","金属短杖#k(等级限制 : 18, 公用)#b","冰精短杖#k(等级限制 : 23, 魔法师)#b","锂矿短杖#k(等级限制 : 28, 魔法师)#b","法师短杖#k(等级限制 : 33, 魔法师)#b","妖精短杖#k(等级限制 : 38, 魔法师)#b","大魔法师短杖#k(等级限制 : 48, 魔法师)#b");
			for (var i = 0; i < items.length; i++){
				selStr += "\r\n#L" + i + "# " + items[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
		else if (selectedType == 4){ //staff refine
			var selStr = "要是你能收集各种材料，我就用魔法给你做长杖。你想做什么样的长杖？#b";
			var items = new Array ("木制长杖#k(等级限制 : 10, 魔法师)#b","蓝宝石长杖#k(等级限制 : 15, 魔法师)#b","祖母缘长杖#k(等级限制 : 15, 魔法师)#b","古树长杖#k(等级限制 : 20, 魔法师)#b","法师长杖#k(等级限制 : 25, 魔法师)#b","精灵长杖#k(等级限制 : 45, 魔法师)#b");
			for (var i = 0; i < items.length; i++){
				selStr += "\r\n#L" + i + "# " + items[i] + "#l";
			}
			cm.sendSimple(selStr);
		}
	}
	else if (status == 2 && mode == 1) {
		selectedItem = selection;

		if (selectedType == 0){ //全职业可用的永恒装备
			var itemSet = new Array(1032031,1122011,1122012,1102172);
			var matSet = new Array(new Array(4031875,4000273,4001126),new Array(4031875,4000273,4001126),new Array(4031875,4000273,4001126),new Array(4031875,4000273,4001126));
			var matQtySet = new Array(new Array(200,200,200),new Array(200,200,200),new Array(200,200,200),new Array(200,200,300));
			var costSet = new Array(5000000,5000000,5000000,5000000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 1){ //glove upgrade
			var itemSet = new Array(1082021,1082022,1082027,1082028,1082052,1082053,1082055,1082056,1082063,1082064,1082082,1082080,1082087,1082088);
			var matSet = new Array(new Array(1082020,4011001),new Array(1082020,4021001),new Array(1082026,4021000),new Array(1082026,4021008),new Array(1082051,4021005),
				new Array(1082051,4021008),new Array(1082054,4021005),new Array(1082054,4021008),new Array(1082062,4021002),new Array(1082062,4021008),
				new Array(1082081,4021002),new Array(1082081,4021008),new Array(1082086,4011004,4011006),new Array(1082086,4021008,4011006));
			var matQtySet = new Array(new Array(1,1),new Array(1,2),new Array(1,3),new Array(1,1),new Array(1,3),new Array(1,1),new Array(1,3),new Array(1,1),new Array(1,4),
				new Array(1,2),new Array(1,5),new Array(1,3),new Array(1,3,5),new Array(1,2,3));
			var costSet = new Array (20000,25000,30000,40000,35000,40000,40000,45000,45000,50000,55000,60000,70000,80000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 2){ //hat upgrade
			var itemSet = new Array(1002065,1002013);
			var matSet = new Array(new Array(1002064,4011001),new Array(1002064,4011006));
			var matQtySet = new Array(new Array(1,3),new Array(1,3));
			var costSet = new Array(40000,50000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 3){ //wand refine
			var itemSet = new Array (1372005,1372006,1372002,1372004,1372003,1372001,1372000,1372007);
			var matSet = new Array(4003001,new Array(4003001,4000001),new Array(4011001,4000009,4003000),new Array(4011002,4003002,4003000),new Array(4011002,4021002,4003000),
				new Array(4021006,4011002,4011001,4003000),new Array(4021006,4021005,4021007,4003003,4003000),new Array(4011006,4021003,4021007,4021002,4003002,4003000));
			var matQtySet = new Array (5,new Array(10,50),new Array(1,30,5),new Array(2,1,10),new Array(3,1,10),new Array(5,3,1,15),new Array(5,5,1,1,20),new Array(4,3,2,1,1,30));
			var costSet = new Array (1000,3000,5000,12000,30000,60000,120000,200000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 4){ //staff refine
			var itemSet = new Array (1382000,1382003,1382005,1382004,1382002,1382001);
			var matSet = new Array(4003001,new Array(4021005,4011001,4003000),new Array(4021003,4011001,4003000),new Array(4003001,4011001,4003000),
				new Array(4021006,4021001,4011001,4003000),new Array(4011001,4021006,4021001,4021005,4003000,4000010,4003003));
			var matQtySet = new Array (5,new Array(1,1,5),new Array(1,1,5),new Array(50,1,10),new Array(2,1,1,15),new Array(8,5,5,5,30,50,1));
			var costSet = new Array (2000,2000,2000,5000,12000,180000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		
		var prompt = "你想做一个#t" + item + "#吗？这需要下面的道具。怎么样？想做吗？#b";

		if (mats instanceof Array){
			for(var i = 0; i < mats.length; i++){
				prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
			}
		}
		else {
			prompt += "\r\n#i"+mats+"# " + matQty + " #t" + mats + "#";
		}
		
		if (cost > 0)
			prompt += "\r\n#i4031138# " + cost + " 金币";
		
		cm.sendYesNo(prompt);
	}
	else if (status == 3 && mode == 1) {
		var complete = true;
		if (cm.getMeso() < cost)
			{
				cm.sendOk("请你确认是否有需要的物品或者背包的装备窗有没有空间。")
			}
			else
			{
				if (mats instanceof Array) {
					for(var i = 0; complete && i < mats.length; i++)
					{
						if (matQty[i] == 1)	{
							if (!cm.haveItem(mats[i]))
							{
								complete = false;
							}
						}
						else {
							var count = 0;
							var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats[i]).iterator();
							while (iter.hasNext()) {
								count += iter.next().getQuantity();
							}
							if (count < matQty[i])
								complete = false;
						}					
					}
				}
				else {
					var count = 0;
					var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats).iterator();
					while (iter.hasNext()) {
						count += iter.next().getQuantity();
					}
					if (count < matQty)
						complete = false;
				}
			}
			
			if (!complete) 
				cm.sendOk("请你确认是否有需要的物品或者背包的装备窗有没有空间。");
			else {
				if (mats instanceof Array) {
					for (var i = 0; i < mats.length; i++){
						cm.gainItem(mats[i], -matQty[i]);
					}
				}
				else
					cm.gainItem(mats, -matQty);
					
				if (cost > 0)
					cm.gainMeso(-cost);
				
				cm.gainItem(item, 1);
				cm.sendOk("好！你的东西已经做好了，我的手艺果然不错！你看见过这么完美的东西吗？下次再来吧。");
			}
		cm.dispose();
	}
}
