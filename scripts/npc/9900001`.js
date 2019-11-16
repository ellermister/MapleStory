/*
Vr001 封测版 ONLINE
修改版.GM地图的NPC.
*/

/** 版权：Vr001 封测版
	NPC 名字: 		冒险岛运营员（内部）
	Map(ID): 		地图的ID为 (180000000)
	   用途: 		满属性,装备属性增加的功能.避免下线制作的麻烦
*/
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.tools);

var status = 0;
var slot = Array();
var stats = Array("力量", "敏捷", "智力", "运气", "生命值", "魔法值", "武器攻击", "魔法攻击", "防御力", "魔法防御力", "命中率", "回避率", "手技", "移动速度", "跳跃力");
var selected;
var statsSel;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getPlayer().hasGMLevel(100)) {
				cm.sendSimple("你好!伟大的Gm!你有什么需求吗?#b\r\n#L0#提升我的最大属性!(Gm专用)\r\n#L1#提升我的最大技能!(Gm专用)\r\n#L2#帮我的装备增加各种属性!(Gm专用)#k");
			} else {
				cm.sendOk("我靠...你GM等级至少需要级别100才可以获得我的帮助!~~哪凉快呆哪去.");
				cm.dispose();
			}
		} else if (status == 1) {
			if (selection == 0) {
				var statup = new java.util.ArrayList();
				var p = cm.getPlayer();
				p.setRemainingAp(0);
				p.setRemainingSp(0);
				p.setStr(32767);
				p.setDex(32767);
				p.setInt(32767);
				p.setLuk(32767);
				p.setHp(30000);
				p.setMaxHp(30000);
				p.setMp(30000);
				p.setMaxMp(30000);
				statup.add(new Pair(MapleStat.STR, java.lang.Integer.valueOf(32767)));
				statup.add(new Pair(MapleStat.DEX, java.lang.Integer.valueOf(32767)));
				statup.add(new Pair(MapleStat.LUK, java.lang.Integer.valueOf(32767)));
				statup.add(new Pair(MapleStat.INT, java.lang.Integer.valueOf(32767)));
				statup.add(new Pair(MapleStat.HP, java.lang.Integer.valueOf(30000)));
				statup.add(new Pair(MapleStat.MAXHP, java.lang.Integer.valueOf(30000)));
				statup.add(new Pair(MapleStat.MP, java.lang.Integer.valueOf(30000)));
				statup.add(new Pair(MapleStat.MAXMP, java.lang.Integer.valueOf(30000)));
				statup.add(new Pair(MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(p.getRemainingAp())));
				statup.add(new Pair(MapleStat.AVAILABLESP, java.lang.Integer.valueOf(p.getRemainingSp())));
				cm.getC().getSession().write(MaplePacketCreator.updatePlayerStats(statup));
				cm.sendOk("我已经帮你提升了最大的属性了!\r\n#d感谢使用Vr001 封测版服务端!");
				cm.dispose();
			} else if (selection == 1) {
				cm.maxAllSkills(); 
				cm.sendOk("我已经帮你提升了最大了!\r\n#d感谢使用Vr001 封测版服务端!");
				cm.dispose();
			} else if (selection == 2) {
				var avail = "";
				for (var i = -1; i > -18; i--) {
					if (cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(i) != null) {
						avail += "#L" + Math.abs(i) + "##t" + cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(i).getItemId() + "##l\r\n";
					}
					slot.push(i);
				}
				cm.sendSimple("你想为哪一件装备增加属性?\r\n#b" + avail);
			}
		} else if (status == 2) {
			selected = selection - 1;
			var text = "";
			for (var i = 0; i < stats.length; i++) {
				text += "#L" + i + "#" + stats[i] + "#l\r\n";
			}
			cm.sendSimple("你要为 #b#t" + cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot[selected]).getItemId() + "##k添加属性.\r\n那么,你想增加哪一个属性呢?\r\n#b" + text);
		} else if (status == 3) {
			statsSel = selection;
			cm.sendGetNumber("你准备为你的 #b#t" + cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot[selected]).getItemId() + "##k 添加多少 " + stats[statsSel] + " 属性?\r\n#d注意:最大为 #r32767#k !!", 0, 0, 32767);
		} else if (status == 4) {
			cm.changeStat(slot[selected], statsSel, selection);
			cm.sendOk("成功为你的装备 #b#t" + cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot[selected]).getItemId() + "##k \r\n#r" + stats[statsSel] + "属性#k 增加了 #b" + selection + " #k点.");
			cm.dispose();
		}
	}
}
