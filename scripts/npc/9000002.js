// NPC Name: Pietro
// NPC Purpose: JQ Rewards
// Found at map 109050000
// MrDk/Sweeply

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("奖励奖励!哈哈哈哈~");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getChar().getsg2() >= 1){ 
				cm.sendNext("欢迎你 #e#h ##n! 恭喜你通关了 #b挑战副本#k 现在是你和小组组员获得奖励的时候了!");
			} else {
				cm.warp("100000000");
				cm.dispose();
			cm.sendOK("你的点数有问题。请不要恶意刷点数.不给你任何奖励！");
			cm.dispose();
			}
		} else if (status == 1) {
			cm.sendSimple("请选择你想要获取的奖励:\r\n#L0#稀奇古怪的物品（有垃圾）#l\r\n#L1#30% 的诅咒卷轴#l");
		} else if (status == 2) {
			var quantity;
			var rand;
			if (selection == 0) {
				rand = 1 + Math.floor(Math.random() * 7);
				quantity = Math.floor((Math.random() * 2) + 1);
				cm.sendNext("Thank you for participating in the event!\r\nSee you next time!");
				if (rand == 1) {
					cm.gainItem(4001038, quantity); // Stump Eraser Real
				} else if (rand == 2) {
					cm.gainItem(4001039, quantity); // Mushmom Eraser Real
				} else if (rand == 3) {
					cm.gainItem(4001040, quantity); // Lupin Eraser Real
				} else if (rand == 4) {
					cm.gainItem(4001041, quantity); // Wraith Eraser Real
				} else if (rand == 5) {
					cm.gainItem(4001042, quantity); // Slime Eraser Real
				} else if (rand == 6) {
					cm.gainItem(4001043, quantity); // Octopus Real
				} else if (rand == 7) {
					cm.gainItem(4001116, quantity); // Hectagon Necklace
 cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[颁奖]" + " : " + " [" + cm.getPlayer().getName() + "]玩家获得了道具奖励！",true).getBytes());
				}
				//cm.gainItem(5220001,-1);
				cm.setboss(1);
				cm.warp(100000000);
				cm.dispose();
			} else if (selection == 1) {
				quantity = Math.floor((Math.random() * 3) + 1);
				rand = 1 + Math.floor(Math.random() * 16);
				if (rand == 1) {
					cm.gainItem(2044705, quantity); // 30% Claw attack
				} else if (rand == 2) {
					cm.gainItem(2043005, quantity); // 30% 1h-Sword attack
				} else if (rand == 3) {
					cm.gainItem(2044005, quantity); // 30% 2h-Sword attack
				} else if (rand == 4) {
					cm.gainItem(2044405, quantity); // 30% Pole Arm attack
				} else if (rand == 5) {
					cm.gainItem(2044305, quantity); // 30% Spear attack
				} else if (rand == 6) {
					cm.gainItem(2043205, quantity); // 30% 1h-BW attack
				} else if (rand == 7) {
					cm.gainItem(2044205, quantity); // 30% 2h-BW attack
				} else if (rand == 8) {
					cm.gainItem(2044605, quantity); // 30% Crossbow attack
				} else if (rand == 9) {
					cm.gainItem(2044505, quantity); // 30% Bow attack
				} else if (rand == 10) {
					cm.gainItem(2044904, quantity); // 30% Gun attack
				} else if (rand == 11) {
					cm.gainItem(2044804, quantity); // 30% Knuckler attack
				} else if (rand == 12) {
					cm.gainItem(2049100, 1); // Chaos scroll
				} else if (rand == 13) {
					cm.gainItem(2043105, quantity); // 30% 1h-Axe
				} else if (rand == 14) {
					cm.gainItem(2044105, quantity); // 30% 2h-Axe
				} else if (rand == 15) {
					cm.gainItem(2043007, quantity); // 30% 1h Sword m.att
				} else if (rand == 16) {
					cm.gainItem(2043305, quantity); // 30% Dagger scroll
				}
				//cm.gainItem(5220001,-1);
				cm.setboss(1);
     				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"[颁奖]" + " : " + " [" + cm.getPlayer().getName() + "]玩家获得了诅咒卷奖励！",true).getBytes());
				cm.warp(100000000);
				cm.dispose();
			}
		} else if (status == 3) {
			cm.warp(100000000);
			cm.dispose();

		}
	}
}