importPackage(net.sf.odinms.client);

var status = 0;
var maps = Array(102000000, 101000000, 100000000, 103000000, 120000000);
var cost = Array(1200, 1200, 800, 1000, 1000);
var costBeginner = Array(120, 120, 80, 100, 100);
var selectedMap = -1;
var sCost;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 27 && mode == 0) {
			cm.sendNext("这里还可以去其他的城镇，等你决定了再来告诉我你想要去别的地方吧..");
			cm.dispose();
			return;
		} else if (((status == 1 || status == 2 || status == 26) && mode == 0) || ((status == 6 || status == 9 || status == 12 || status == 15 || status == 18 || status == 21) && mode == 1)) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("你想去别的村落吗？要是你付一点钱，我就可以送你到别的地方... 哈哈哈~!也许你会觉得有点贵…不过对新手会打#b9折#k的。");
		} else if (status == 1) {
			cm.sendSimple("你是第一次到这里来吗？你可能不热爱熟悉这里，你可以问我有关这里的信息。\r\n#L0##b在金银岛里有什么样的村落?#l\r\n#L1#请你把我送到别的地方。#k#l");
		} else if (status == 2) {
			if (selection == 0) {
				cm.sendSimple("在金银岛内有7个大村庄。\r\n#b#L0##m104000000##l\r\n#L1##m102000000##l\r\n#L2##m101000000##l\r\n#L3##m100000000##l\r\n#L4##m103000000##l\r\n#L5##m120000000##l\r\n#L6##m105040300##l");
			} else if (selection == 1) {
				status = 26;
				if (cm.getJob().equals(MapleJob.BEGINNER)) {
					var selStr = "新手的费用是 90% 的折扣.你想要去哪里呢？#b";
					for (var i = 0; i < maps.length; i++) {
						selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + costBeginner[i] + " 金币)#l";
					}
				} else {
					var selStr = "你不是新手吧？那就不能给你打折。来，想去哪个村落呢？#b";
					for (var i = 0; i < maps.length; i++) {
					selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + cost[i] + " 金币)#l";
					}
				}
				cm.sendSimple(selStr);
			}
		} else if (status == 3) {
			if (selection == 0) {
				status = 4;
				cm.sendNext("我介绍介绍#b明珠港#k吧. 从彩虹岛乘坐维多利亚号到达的就是这里...也就是说,这里就是村落明珠港.来自彩虹岛的很多新手就从这里开始他们的冒险生涯的.");
			} else if (selection == 1) {
				status = 7;
				cm.sendNext("村落周边都是宁静的草原。这里的怪物大多是比较弱小的，可以说这个地方是新手练习的好地方。如果你还没转职到战士，法师，弓箭手，飞侠等职业之一，不如先在这里提高你的等级。");
			} else if (selection == 2) {
				status = 10;
				cm.sendNext("给你介绍介绍#b魔法密林#k吧。它是位于金银岛最东边森林里的魔法师村落。村落四周都是神秘而郁郁葱葱的森林。在那个村落里有不喜欢人类的妖精，所以到了那儿，要特别小心，千万不要惹是生非啊。");
			} else if (selection == 3) {
				status = 13;
				cm.sendNext("给你介绍介绍#b射手村#k吧，它是位于金银岛南部草原的弓箭手村落，村落的周围是美丽的草原和郁郁葱葱的树林，气候也不错，非常富饶，如果你还没去过，一定要去看看阿。");
			} else if (selection == 4) {
				status = 16;
				cm.sendNext("我给你介绍介绍#b废弃都市#k吧。它是位于金银岛西北方盗贼之城，城里有些大楼给人的感觉有点奇怪，而且城市上空常常被黑云笼罩着。但听在那里有时后在高处可以看到日落黄昏，听说非常漂亮。");
			} else if (selection == 5) {
				status = 19;
				cm.sendNext("我来介绍一下#b#m120000000##k吧。它是金银岛上明珠港和射手村之间停泊的潜水艇。进去的看的话就是海盗的老窝。在明珠港可以看到的宽广的美丽的大海，在这个地方也可以看到。");
			} else if (selection == 6) {
				status = 22;
				cm.sendNext("我给你介绍介绍#b林中之城#k吧。它是位于金银岛东南方的浓密的树林之村。那里的位置大概是射手村和蚂蚁洞中间。那里有个宾馆，如果你在迷宫中冒险觉得累了就可以去那个清静之地休息休息。");
			}
		} else if (status == 4) {
			cm.sendNext("我介绍介绍#b明珠港#k吧。从彩虹岛乘坐维多利亚号到达的就是这里...也就是说，这里就是村落明珠港。来自彩虹岛的很多新手就从这里开始他们的冒险生涯的。");
		} else if (status == 5) {
			cm.sendNextPrev("我给你介绍#b勇士部落#k.它是位于金银岛最北部的高原战士村落.村落的四周都是荒凉的岩石山.而且气候也不太好,除了体力很强的战士之外没有人能在那里生存.");
		} else if (status == 6) {
			cm.sendNextPrev("村落周边都是宁静的草原.这里的怪物大多是比较弱小的,可以说这个地方是新手练习的好地方.如果你还没转职到战士,法师,弓箭手,飞侠等职业之一,不如先在这里提高你的等级.");
		} else if (status == 7) {
			cm.sendNext("村落周边都是宁静的草原.这里的怪物大多是比较弱小的,可以说这个地方是新手练习的好地方.如果你还没转职到战士,法师,弓箭手,飞侠等职业之一,不如先在这里提高你的等级.");
		} else if (status == 8) {
			cm.sendNextPrev("听说在高原的周围有木妖、野猪、猴子等怪物,而且在幽深的山沟里还有可怕的龙,很危险的,劝你还是不要匆忙行动.");
		} else if (status == 9) {
			cm.sendNextPrev("如果你想当#b战士#k,就去找勇士部落的长老#r武术教练#k吧.如果你的等级在10级以上,而且备了教高体力的话,他说不定会让你当战士.但你的能力还不够的话,只好继续努力锻炼.");
		} else if (status == 10) {
			cm.sendNext("给你介绍介绍#b魔法密林#k吧. 它是位于金银岛最东边森林里的魔法师村落.村落四周都是神秘而郁郁葱葱的森林.在那个村落里有不喜欢人类的妖精,所以到了那儿,要特别小心,千万不要惹是生非啊.");
		} else if (status == 11) {
			cm.sendNextPrev("森林的周围里绿水灵,会走的蘑菇,猴子和僵尸猴等怪物.在森林的深处,甚至还有飞天魔女.如果你还不是很强大,最好不要接近魔女.");
		} else if (status == 12) {
			cm.sendNextPrev("如果你想当#b魔法师#k,就去魔法密林找大魔法师#r汉斯#k先生,如果你的等级在8级以上,而且具备一定的智力,说不定他会让你当魔法师.但你的能力还不够的话,只好自己继续努力了.");
		} else if (status == 13) {
			cm.sendNext("给你介绍介绍#b射手村#k吧.它是位于金银岛南部草原的弓箭手村落.村落的周围是美丽的草原和郁郁葱葱的树林.气候也不错,非常富饶.如果你还没去过,一定要去看看阿.");
		} else if (status == 14) {
			cm.sendNextPrev("在草原的周边有蜗牛,蘑菇,猪等比较弱的怪物.但是听说村落周围有个叫猪之乐园的地方,在那里有时会出现非常强悍的叫蘑菇王的怪物….");
		} else if (status == 15) {
			cm.sendNextPrev("如果你想当#b弓箭手#k,就去射手村找一个像守护神一样的#r赫丽娜#k.要是你的等级在10级以上还有一定的敏捷度,她可能会让你当弓箭手.但如果你的能力还不够的话,只好自己继续努力了.");
		} else if (status == 16) {
			cm.sendNext("我给你介绍介绍#b废弃都市#k吧. 它是位于金银岛西北方盗贼之城,城里有些大楼给人的感觉有点奇怪,而且城市上空常常被黑云笼罩着.但听在那里有时后在高处可以看到日落黄昏,听说非常漂亮.");
		} else if (status == 17) {
			cm.sendNextPrev("在废弃都市里有通往多个迷宫的通道.可以去鳄鱼和蛇出没的沼泽地,听说还有幽灵和蝙蝠出没的地铁.在底下数百米的地方出现的幽灵,是和恐龙一样强悍和危险的怪物.");
		} else if (status == 18) {
			cm.sendNextPrev("如果想当#b飞侠#k,就去废弃都市找所谓的暗黑君主#r达克鲁#k,要是你的等级在10级以上还有一定的敏捷度,他说不定会让你当飞侠.但你的能力还不够的话,只好自己继续努力了.");
		} else if (status == 19) {
			cm.sendNext("我来介绍一下#b#m120000000##k吧.它是金银岛上明珠港和射手村之间停泊的潜水艇.进去的看的话就是海盗的老窝.在明珠港可以看到的宽广的美丽的大海,在这个地方也可以看到.");
		} else if (status == 20) {
			cm.sendNextPrev("因为#m120000000#是在射手村和明珠港之间的关系,只要出去一点就可以看到周边两个村庄的美景.据说那里的海盗不管在任何时候都很快活、亲切.");
		} else if (status == 21) {
			cm.sendNextPrev("如果想成为#b海盗#k的话,就去找#m120000000#的#r#p1090000##k吧. 级别10级以上的DEX达到某种程度的话有可能成为海盗.不努力的话就只能通过努力打猎来锻炼了.");
		} else if (status == 22) {
			cm.sendNext("我给你介绍介绍#b林中之城#k吧.它是位于金银岛东南方的浓密的树林之村.那里的位置大概是射手村和蚂蚁洞中间.那里有个宾馆,如果你在迷宫中冒险觉得累了就可以去那个清静之地休息休息.");
		} else if (status == 23) {
			cm.sendNextPrev("据说在宾馆的前边有一位神秘的老和尚,叫#r克里斯拉玛#k?!.他好像专门适用冒险者收集的原料给他们做些东西,具体情况我也不太清楚.如果你有机会去那里,替我好好儿打探打探吧.");
		} else if (status == 24) {
			cm.sendNextPrev("从林中之城往东走下去,是蚂蚁洞迷宫.那里连接到金银岛的最深的地下.听说那里有很多凶猛而强悍的怪物,闯入者都有去无回,所以好自为之吧,如果你一定要去那里,你得好好准备准备.");
		} else if (status == 25) {
			cm.sendNextPrev("还有,这些是我听说的...在林中之城有一个到某个地方的神秘入口。进去后，可以看见黑色石头。我想有机会进去看看，确认这是不是真的。");
		} else if (status == 26) {
			cm.dispose();
		} else if (status == 27) {
			if (cm.getJob().equals(MapleJob.BEGINNER)) {
				sCost = costBeginner[selection];
			} else {
				sCost = cost[selection];
			}
			cm.sendYesNo("在这儿，你好像该办的事都办完了嘛。确定要去 #b#m" + maps[selection] + "##k村落吗? 如果你付#b" + sCost + " 金币#k. 我就送你到那里。怎么样？");
			selectedMap = selection;
		} else if (status == 28) {
			if (cm.getMeso() < sCost) {
				cm.sendNext("你好象没有足够的金币,这样的话我不能送你去你想去的地方!");
			} else {
				cm.gainMeso(-sCost);
				cm.warp(maps[selectedMap], 0);
			}
			cm.dispose();
		}
	}
}