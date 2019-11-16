/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
					   Matthias Butz <matze@odinms.de>
					   Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* JM from tha Streetz
	Victoria Road: Kerning City (103000000)
	
	Refining NPC: 
	* Gloves
	* Glove Upgrade
	* Claw
	* Claw Upgrade
	* Processed Wood/Screws

	* Note: JM by default is used as a Megaphone shop. To move this shop to Frederick in the FM,
	* following MySQL command:
	* UPDATE `shops` SET `npcid`='9030000' WHERE (`shopid`='0')
*/

importPackage(net.sf.odinms.client);

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;

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
		var selStr = "好~服务费不会太贵，你不用担心。你想做什么？#b"
		var options = new Array("制造手套","合成手套","制造拳套","合成拳套","制造材料");
		for (var i = 0; i < options.length; i++){
			selStr += "\r\n#L" + i + "# " + options[i] + "#l";
		}
			
		cm.sendSimple(selStr);
	}
	else if (status == 1 && mode == 1) {
		selectedType = selection;
		if (selectedType == 0){ //glove refine
			var selStr = "好...你想做什么手套？#b";
			var gloves = new Array ("工地手套#k(等级限制 : 10, 公用)#b","褐短指手套#k(等级限制 : 15, 飞侠)#b","蓝短指手套#k(等级限制 : 15, 飞侠)#b","黑短指手套#k(等级限制 : 15, 飞侠)#b","青铜飞侠手套#k(等级限制 : 20, 飞侠)#b","青铜精神手套#k(等级限制 : 25, 飞侠)#b","钢铁暴风手套#k(等级限制 : 30, 飞侠)#b",
				"钢铁追击手套#k(等级限制 : 35, 飞侠)#b","红侠客手套#k(等级限制 : 40, 飞侠)#b","青月手套#k(等级限制 : 50, 飞侠)#b","青铜柔丝手套#k(等级限制 : 60, 飞侠)#b");
			for (var i = 0; i < gloves.length; i++){
				selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
			}
			equip = true;
			cm.sendSimple(selStr);
		}
		else if (selectedType == 1){ //glove upgrade
			var selStr = "好...你想合成什么手套？#b";
			var gloves = new Array ("锂矿飞侠手套#k(等级限制 : 20, 飞侠)#b","黑飞侠手套#k(等级限制 : 20, 飞侠)#b","锂矿精神手套#k(等级限制 : 25, 飞侠)#b",
				"黑精神手套#k(等级限制 : 25, 飞侠)#b","银暴风手套#k(等级限制 : 30, 飞侠)#b","黄金暴风手套#k(等级限制 : 30, 飞侠)#b","紫矿追击手套#k(等级限制 : 35, 飞侠)#b","黄金追击手套#k(等级限制 : 35, 飞侠)#b","黄金侠客手套#k(等级限制 : 40, 飞侠)#b",
				"黑侠客手套#k(等级限制 : 40, 飞侠)#b","赤月手套#k(等级限制 : 50, 飞侠)#b","黄月手套#k(等级限制 : 5, 飞侠)#b","钢铁柔丝手套#k(等级限制 : 60, 飞侠)#b","黄金柔丝手套#k(等级限制 : 60, 飞侠)#b");
			for (var i = 0; i < gloves.length; i++){
				selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
			}
			equip = true;
			cm.sendSimple(selStr);
		}
		else if (selectedType == 2){ //claw refine
			var selStr = "拳套是投飞镖时戴在手上的装备。对主要用短刀的飞侠作用不大。怎么样？你想做什么样的拳套？#b";
			var claws = new Array ("钢铁拳套#k(等级限制 : 15, 飞侠)#b","青铜指虎#k(等级限制 : 20, 飞侠)#b","狼牙#k(等级限制 : 25, 飞侠)#b","钢铁斗拳#k(等级限制 : 30, 飞侠)#b","青铜守护拳套#k(等级限制 : 35, 飞侠)#b","钢铁护腕#k(等级限制 : 40, 飞侠)#b","钢铁手甲#k(等级限制 : 50, 飞侠)#b");
			for (var i = 0; i < claws.length; i++){
				selStr += "\r\n#L" + i + "# " + claws[i] + "#l";
			}
			equip = true;
			cm.sendSimple(selStr);
		}
		else if (selectedType == 3){ //claw upgrade
			var selStr = "拳套是投飞镖时戴在手上的装备。对主要用短刀的飞侠作用不大。怎么样？你想做什么样的拳套？#b";
			var claws = new Array ("锂矿拳套#k(等级限制 : 15, 飞侠)#b","黄金拳套#k(等级限制 : 15, 飞侠)#b","钢铁指虎#k(等级限制 : 20, 飞侠)#b","朱矿指虎#k(等级限制 : 20, 飞侠)#b","锂矿斗拳#k(等级限制 : 30, 飞侠)#b","朱矿斗拳#k(等级限制 : 30, 飞侠)#b",
			"银守护拳套#k(等级限制 : 35, 飞侠)#b","黑守护拳套#k(等级限制 : 35, 飞侠)#b","赤红护腕#k(等级限制 : 40, 飞侠)#b","朱矿护腕#k(等级限制 : 40, 飞侠)#b","黑护腕#k(等级限制 : 40, 飞侠)#b","赤红手甲#k(等级限制 : 50, 飞侠)#b","蓝宝石手甲#k(等级限制 : 50, 飞侠)#b");
			for (var i = 0; i < claws.length; i++){
				selStr += "\r\n#L" + i + "# " + claws[i] + "#l";
			}
			equip = true;
			cm.sendSimple(selStr);
		}
		else if (selectedType == 4){ //material refine
			var selStr = "你说你想做材料？好~你想做什么材料？#b";
			var materials = new Array ("用树枝做木材","用木块做木材","做螺丝钉");
			for (var i = 0; i < materials.length; i++){
				selStr += "\r\n#L" + i + "# " + materials[i] + "#l";
			}
			equip = false;
			cm.sendSimple(selStr);
		}
		if (equip)
			status++;
	}
	else if (status == 2 && mode == 1) {
		selectedItem = selection;
		if (selectedType == 4){ //material refine
			var itemSet = new Array (4003001,4003001,4003000);
			var matSet = new Array(4000003,4000018,new Array (4011000,4011001));
			var matQtySet = new Array (10,5,new Array (1,1));
			var costSet = new Array (0,0,0);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		
		var prompt = "所以，你想我做一些#t" + item + "#？要是你给我材料，我给你免费服务。怎么样？你想做几次？";
		
		cm.sendGetNumber(prompt,1,1,100)
	}
	else if (status == 3 && mode == 1) {
		if (equip)
		{
			selectedItem = selection;
			qty = 1;
		}
		else
			qty = selection;

		if (selectedType == 0){ //glove refine
			var itemSet = new Array(1082002,1082029,1082030,1082031,1082032,1082037,1082042,1082046,1082075,1082065,1082092);
			var matSet = new Array(4000021,new Array(4000021,4000018),new Array(4000021,4000015),new Array(4000021,4000020),new Array(4011000,4000021),new Array(4011000,4011001,4000021),new Array(4011001,4000021,4003000),new Array(4011001,4011000,4000021,4003000),new Array(4021000,4000014,4000021,4003000),new Array(4021005,4021008,4000030,4003000),new Array(4011007,4011000,4021007,4000030,4003000));
			var matQtySet = new Array(15,new Array(30,20),new Array(30,20),new Array(30,20),new Array(2,40),new Array(2,1,10),new Array(2,50,10),new Array(3,1,60,15),new Array(3,200,80,30),new Array(3,1,40,30),new Array(1,8,1,50,50));
			var costSet = new Array(1000,7000,7000,7000,10000,15000,25000,30000,40000,50000,70000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 1){ //glove upgrade
			var itemSet = new Array(1082033,1082034,1082038,1082039,1082043,1082044,1082047,1082045,1082076,1082074,1082067,1082066,1082093,1082094);
			var matSet = new Array(new Array(1082032,4011002),new Array(1082032,4021004),new Array(1082037,4011002),new Array(1082037,4021004),new Array(1082042,4011004),new Array(1082042,4011006),new Array(1082046,4011005),new Array(1082046,4011006),new Array(1082075,4011006),new Array(1082075,4021008),new Array(1082065,4021000),new Array(1082065,4011006,4021008),new Array(1082092,4011001,4000014),new Array(1082092,4011006,4000027));
			var matQtySet = new Array(new Array(1,1),new Array(1,1),new Array(1,2),new Array(1,2),new Array(1,2),new Array(1,1),new Array(1,3),new Array(1,2),new Array(1,4),new Array(1,2),new Array(1,5),new Array(1,2,1),new Array(1,7,200),new Array(1,7,150));
			var costSet = new Array (5000,7000,10000,12000,15000,20000,22000,25000,40000,50000,55000,60000,70000,80000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 2){ //claw refine
			var itemSet = new Array(1472001,1472004,1472007,1472008,1472011,1472014,1472018);
			var matSet = new Array(new Array(4011001,4000021,4003000),new Array(4011000,4011001,4000021,4003000),new Array(1472000,4011001,4000021,4003001),new Array(4011000,4011001,4000021,4003000),new Array(4011000,4011001,4000021,4003000),new Array(4011000,4011001,4000021,4003000),new Array(4011000,4011001,4000030,4003000));
			var matQtySet = new Array(new Array(1,20,5),new Array(2,1,30,10),new Array(1,3,20,30),new Array(3,2,50,20),new Array(4,2,80,25),new Array(3,2,100,30),new Array(4,2,40,35));
			var costSet = new Array(2000,3000,5000,15000,30000,40000,50000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 3){ //claw upgrade
			var itemSet = new Array (1472002,1472003,1472005,1472006,1472009,1472010,1472012,1472013,1472015,1472016,1472017,1472019,1472020);
			var matSet = new Array(new Array(1472001,4011002),new Array(1472001,4011006),new Array(1472004,4011001),new Array(1472004,4011003),new Array(1472008,4011002),new Array(1472008,4011003),new Array(1472011,4011004),new Array(1472011,4021008),new Array(1472014,4021000),new Array(1472014,4011003),new Array(1472014,4021008),new Array(1472018,4021000),new Array(1472018,4021005));
			var matQtySet = new Array (new Array(1,1),new Array(1,1),new Array(1,2),new Array(1,2),new Array(1,3),new Array(1,3),new Array(1,4),new Array(1,1),new Array(1,5),new Array(1,5),new Array(1,2),new Array(1,6),new Array(1,6));
			var costSet = new Array (1000,2000,3000,5000,10000,15000,20000,25000,30000,30000,35000,40000,40000);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		
		var prompt = "你说你想做";
		if (qty == 1)
			prompt += "一个#t" + item + "#？";
		else
			prompt += qty + " #t" + item + "#?";
			
		prompt += "这需要下面的物品，怎么样？想做吗？#b";
		
		if (mats instanceof Array){
			for(var i = 0; i < mats.length; i++){
				prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
			}
		}
		else {
			prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
		}
		
		if (cost > 0)
			prompt += "\r\n#i4031138# " + cost * qty + " 金币";
		
		cm.sendYesNo(prompt);
	}
	else if (status == 4 && mode == 1) {
		var complete = true;
		
		if (cm.getMeso() < cost * qty)
			{
				cm.sendOk("请你确认是否有需要的物品或者背包的装备窗有没有空间。")
			}
			else
			{
				if (mats instanceof Array) {
					for(var i = 0; complete && i < mats.length; i++)
					{
						if (matQty[i] * qty == 1)	{
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
							if (count < matQty[i] * qty)
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
					if (count < matQty * qty)
						complete = false;
				}
			}
			
			if (!complete) 
				cm.sendOk("请你确认是否有需要的物品或者背包的装备窗有没有空间。");
			else {
				if (mats instanceof Array) {
					for (var i = 0; i < mats.length; i++){
						cm.gainItem(mats[i], -matQty[i] * qty);
					}
				}
				else
					cm.gainItem(mats, -matQty * qty);
					
				if (cost > 0)
					cm.gainMeso(-cost * qty);
				
				if (item == 4003000)//screws
					cm.gainItem(4003000, 15 * qty);
				else
					cm.gainItem(item, qty);
				cm.sendOk("All done. If you need anything else... Well, I'm not going anywhere.");
			}
		cm.dispose();
	}
}