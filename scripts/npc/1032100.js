/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Arwen the Fairy - Victoria Road : Ellinia (101000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var item;
var selected;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 1 && mode == 0) {
		cm.dispose();
		return;
	} else if (status == 2 && mode == 0) {
		cm.sendNext("" + item + "是很难做的，你先去准备材料吧。");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		if (cm.getLevel() >= 40) {
			cm.sendNext("对！我是妖精族中的炼金术专家...我们妖精族自古以来就被禁止跟人类接触，但是像你这么强壮的人没关系。你给我材料，我帮你做特别的东西。");
		} else {
			cm.sendOk("抱歉！我的稀有物品不能给我不认识的人。");
			cm.dispose();
		}
	} else if (status == 1) {
		cm.sendSimple("你想做什么样的东西呢？#b\r\n#L0#月石#l\r\n#L1#星石#l\r\n#L2#黑羽毛#l");
	} else if (status == 2) {
		selected = selection;
		if (selection == 0) {
			item = "月石";
			cm.sendYesNo("你想做月石？做那个东西，需要治炼的#b青铜#k, #b钢铁#k, #b锂矿石#k, #b朱矿石#k, #b银#k, #b紫矿石#k, #b黄金#k各一个。还需要10000金币。");
		} else if (selection == 1) {
			item = "星石";
			cm.sendYesNo("你想做星石？做那个东西，需要各一个#b石榴石#k, #b紫水晶#k, #b海蓝宝石#k, #b祖母缘#k, #b蛋白石#k, #b黄晶#k, #b钻石#k，#b黑水晶#k，还需要15000金币。");
		} else if (selection == 2) {
			item = "黑羽毛";
			cm.sendYesNo("你想做黑羽毛？做那个东西，需要1个#b火焰羽毛和一个月石和一个黑水晶#k，还需要30000金币。啊！这个翼毛是非常特别的，如果它掉在地上，它就会消失，就不能给别人。");
		}
	} else if (status == 3) {
		if (selected == 0) {
			if (cm.haveItem(4011000) && cm.haveItem(4011001) && cm.haveItem(4011002) && cm.haveItem(4011003) && cm.haveItem(4011004) && cm.haveItem(4011005) && cm.haveItem(4011006) && cm.getMeso() > 10000) {
				cm.gainMeso(-10000);
				cm.gainItem(4011000, -1);
				cm.gainItem(4011001, -1);
				cm.gainItem(4011002, -1);
				cm.gainItem(4011003, -1);
				cm.gainItem(4011004, -1);
				cm.gainItem(4011005, -1);
				cm.gainItem(4011006, -1);
				cm.gainItem(4011007, 1);
				cm.sendNext("好的！这是你要的" + item + "。它是制作精良，可能是因为我使用的是好的材料。如果你还需要我的帮助，请随时来找我");
			} else {
				cm.sendNext("你是不是钱不够？还是你没有治炼的#b青铜#k, #b钢铁#k, #b锂矿石#k, #b朱矿石#k, #b银#k, #b紫矿石#k, #b黄金#k各一个？");
				}
		} else if (selected == 1) {
			if (cm.haveItem(4021000) && cm.haveItem(4021001) && cm.haveItem(4021002) && cm.haveItem(4021003) && cm.haveItem(4021004) && cm.haveItem(4021005) && cm.haveItem(4021006) && cm.haveItem(4021007) && cm.haveItem(4021008) && cm.getMeso() > 15000) {
				cm.gainMeso(-15000);
				cm.gainItem(4021000, -1);
				cm.gainItem(4021001, -1);
				cm.gainItem(4021002, -1);
				cm.gainItem(4021003, -1);
				cm.gainItem(4021004, -1);
				cm.gainItem(4021005, -1);
				cm.gainItem(4021006, -1);
				cm.gainItem(4021007, -1);
				cm.gainItem(4021008, -1);
				cm.gainItem(4021009, 1);
				cm.sendNext("好的！这是你要的" + item + "。它是制作精良，可能是因为我使用的是好的材料。如果你还需要我的帮助，请随时来找我");
			} else {
				cm.sendNext("你是不是钱不够？还是你没有治炼的各1个#b石榴石#k, #b紫水晶#k, #b海蓝宝石#k, #b祖母缘#k, #b蛋白石#k, #b黄晶#k, #b钻石#k，#b黑水晶#k？");
				}
			} else if (selected == 2) {
			if (cm.haveItem(4001006) && cm.haveItem(4011007) && cm.haveItem(4021008) && cm.getMeso() > 30000) {
				cm.gainMeso(-30000);
				cm.gainItem(4001006, -1);
				cm.gainItem(4011007, -1);
				cm.gainItem(4021008, -1);
				cm.gainItem(4031042, 1);
				cm.sendNext("好的！这是你要的" + item + "。它是制作精良，可能是因为我使用的是好的材料。如果你还需要我的帮助，请随时来找我");
			} else {
				cm.sendNext("你是不是钱不够？还是你没有1各#b火焰羽毛和一个黑水晶#k吗？");
				}
			}
			cm.dispose();
		}
	}
}