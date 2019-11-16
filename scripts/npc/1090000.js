/*
Vr001 封测版 ONLINE修正!
*/
importPackage(net.sf.odinms.client);

var status = 0;
var requirements = false;
var text;
var job;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (((status == 0 || status == 1 || status == 9) && mode == 0) || ((status == 8 || status == 12 || status == 16 || status == 18 || status == 21 || status == 26 || status == 28 || status == 39 || status == 44) && mode == 1)) {
			cm.dispose();
			return;
		} else if (status == 2 && mode == 0 && requirements) {
			cm.sendNext("I see... Well, selecting a new job is a very important decision to make. If you are ready, then let me know!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("你有什么要问我?#b\r\n#L0#我想知道关于海盗……");
		} else if (status == 1) {
			if (cm.getJob().equals(MapleJob.BRAWLER) || cm.getJob().equals(MapleJob.GUNSLINGER)) {
				if (cm.getPlayer().getLevel() <= 69) {
					if (cm.getJob().equals(MapleJob.BRAWLER)) {
						cm.sendNext("Ohhh, it's you. How's like as a Brawler? You look much more advanced and polished than the last time I saw you. Hopefully great things lay for you in the future.");
					} else {
						cm.sendNext("Ohhh, it's you. How's like as a Gunslinger? You look much more advanced and polished than the last time I saw you. Hopefully great things lay for you in the future.");
					}
				} else {
					if (cm.getJob().equals(MapleJob.BRAWLER)) {
						cm.changeJob(MapleJob.MARAUDER);
					} else {
						cm.changeJob(MapleJob.OUTLAW);
					}
				}
				cm.dispose();
			} else if (cm.getJob().equals(MapleJob.PIRATE)) {
				if (cm.getQuestStatus(2191).equals(MapleQuestStatus.Status.COMPLETED)) {
					status = 35;
					cm.sendNext("欢迎第二次转职! #b拳手#k.");
				} else if (cm.getQuestStatus(2192).equals(MapleQuestStatus.Status.COMPLETED)) {
					status = 40;
					cm.sendNext("Okay, as promised, you will now become a #bGunslinger#k.");
				} else if (cm.getQuestStatus(2191).equals(MapleQuestStatus.Status.STARTED)) {
					status = 29;
					cm.sendNext("好的.我现在送你进去~\r\n#b15 #t4031856##k.在你点下一步的时候,我会直接把任务物品送给你.然后你再点结束对话就能转职了!");
				cm.gainItem(4031856,15);
				} else if (cm.getQuestStatus(2192).equals(MapleQuestStatus.Status.STARTED)) {
					status = 31;
					cm.sendNext("Okay, now I'll take you to the test room. Here are the instructions: defeat the Octopirates and gather #b15 #t4031857#s#k. The Octopirates you'll see here are highly trained and are very quick, so I suggest you really buckle down and get ready for this.");
				} else if (cm.getPlayer().getLevel() <= 29) {
					status = 9;
					cm.sendSimple("你有什么疑问呢?#b\r\n#L0#什么是海盗?#l\r\n#L1#武器海盗是作什么的能使用?#l\r\n#L2#盔甲海盗是作什么的能使用#l\r\n#L3#什么是海盗技能?");
				} else if (cm.getPlayer().getLevel() >= 30) {
					status = 22;
					cm.sendSimple("Do you want to know more about Brawlers and Gunslingers? It'd be good to know in advance, so you'll have a clear picture of what you want to become for your job advancement...\r\n#b#L0# Please explain to me what being a Brawler is all about.#k#l\r\n#b#L1# Please explain to me what being a Gunslinger is all about.#k#l");
				} 
			} else if (cm.getJob().equals(MapleJob.BEGINNER)) {
				cm.sendNext("转职成海盗需要等级达到#d10级#k...#d敏捷达到20点#k哦!");
			} else {
				cm.sendNext("海盗是一个近战的职业.比起战士来,海盗拥有很强的近战力量.海盗可以分为火枪手和拳手这两个二转职业.都很强大...你想不想体验一下海盗呢?体验海盗只需要等级达到10级.属性达到标准就行了!");
				cm.dispose();
			}
		} else if (status == 2) {
			if (cm.getPlayer().getLevel() >= 10 && cm.getPlayer().getDex() >= 1) {
				requirements = true;
				cm.sendYesNo("你达到了要求，是否想当一名威风的#b海盗#k呢?");
			} else {
				cm.sendNextPrev("你或许可以看看自身的属性..看看其他职业是否适合呢?");
			}
		} else if (status == 3) {
			if (requirements)
				cm.sendNext("成为了海盗后.你可以来我这里继续转职,购买东西等等!乐趣很多!你是否想成为呢?");
			else
				cm.dispose();
		} else if (status == 4) {
			if (cm.getJob().equals(MapleJob.BEGINNER)) {
				if (cm.getPlayer().getLevel() > 10) {
						cm.getPlayer().setRemainingSp(cm.getPlayer().getRemainingSp() + (cm.getPlayer().getLevel() - 10) * 3);
				}
				cm.changeJob(MapleJob.PIRATE);
				cm.gainItem(1482014, 1);
				cm.gainItem(1492014, 1);
				cm.gainItem(2330006, 600);
			}
			cm.sendNextPrev("你已经成为了一个海盗了!同时,我给予了你一些物品!拥有它们,你可以更畅游冒险世界.在你的努力进一步提升的时候,你可以来找我再次转职.距离你下一次转职是需要达到#b30#k级!");
		} else if (status == 5) {
			cm.sendNextPrev("同时我给你了一些#dSP#k点数.你可以尝试增加几个技能.在你每次升级的时候.可以获得3点#dSP#k!你同时也拥有了海盗的一转技能!");
		} else if (status == 6) {
			cm.sendNextPrev("注意.你现在已经转职了的.当你的HP耗尽的时候.你会丢失部分的EXP值.所以,千万不要让自己死亡.这意味着你会失去自己辛苦打怪得到的EXP");
		} else if (status == 7) {
			cm.sendNextPrev("你现在可以尝试穿海盗的装备了!");
		} else if (status == 8) {
			cm.sendNextPrev("如果你不知道自己二转职业的加点的话,你不妨使用下属性点窗口的#b自动加点#k功能!");
		} else if (status == 10) {
			if (selection == 0) {
				status = 11;
				text = "Here's what you need to know about being a Pirate. You can think of Pirate as one big road that offers multiple paths. If you want to dominate monsters with brute force, focus on improving STR. If you want to outsmart the monsters with long-range attacks, I suggest you focus on improving DEX.";
			} else if (selection == 1) {
				status = 13;
				text = "Unlike other jobs, being a Pirate will allow you to fight the monsters with bare fist. If you want to maximize your attacking abilities, however, I suggest you use Knuckler or Gun.";
			} else if (selection == 2) {
				status = 17;
				text = "Pirates are usually fleet-flooted, utilizing quickness to attack dazed opponents. Yes, this also means the armors have to be light, as well. This is the reason why most of the clothes for the Pirates are made out of fabric.";
			} else {
				status = 19;
				text = "For Pirates, there are skills that support the accuracy and avoidability needed to be effective. Some of the attacking skills involve either only bare fists or Guns, so you may want to choose one of the two attacking methods and stick to it, when leveling up your skills.";
			}
			cm.sendNext(text);
		} else if (status == 11) {
			cm.sendNext(text);
		} else if (status == 12) {
			cm.sendNextPrev("It's a job that changes based on what you do with it. You should think way ahead and determine what you want to become later on, so you can start focusing on which of the two stats you want to improve up on, STR or DEX. If you want to become a Brawler, boost STR. Gunslinger, boost DEX.");
		} else if (status == 13) {
			cm.sendNext(text);
		} else if (status == 14) {
			cm.sendNextPrev("If you want to engage in melee attacks and stun the monsters, use Knuckler. It looks similar to the Claws that the thieves use, but it is made with a much sturdier material to simulatenously protect and strengthen the fist.");
		} else if (status == 15) {
			cm.sendNextPrev("If you want to take on opponents long-range, use the Gun. Of course, the Gun itself won't do it for you. You'll need bullets. You can get those at any convenient store nearby.");
		} else if (status == 16) {
			cm.sendNextPrev("Your attacking style will vary greatly based on the weapon you choose, so think carefully before choosing one. Of course, the weapon you use may also determine what you'll become down the road.");
		} else if (status == 17) {
			cm.sendNext(text);
		} else if (status == 18) {
			cm.sendNextPrev("It may be a thin fabric, but you better not underestimate its capabilities. It's as durable and protective as the best leather!");
		} else if (status == 19) {
			cm.sendNext(text);
		} else if (status == 20) {
			cm.sendNextPrev("If you want to use Guns, then I suggest you use the skill \r\n#bDouble Shot#k. Double Shot allows you to fire 2 bullets at once, which will enable you to attack monsters from long range.");
		} else if (status == 21) {
			cm.sendNextPrev("If you are using your bare fist or Knucklers, then concentrate on #bSommersault Kick#k and/or #bFlash Fist#k. Alternate these two skills to maximize your attacking capabilities. You may also use these skills while carrying a Gun, but it's simply not as effective as using Knucklers.");
		} else if (status == 23) {
			if (selection == 0) {
				status = 24;
				text = "I'll explain to you what being a Brawler is about. Brawler are courageous pirates that battles enemies with bare fists and knucklers. Since Brawlers engage mostly in melee battles, it's best for you to use various attacking skills to stun the monsters first before proceeding with more powerful attacks. Use #q5101002##k to stun enemies behind you, and #q5101003##k to stun enemies in front of you.";
			} else {
				status = 27;
				text = "I'll explain to you what being a Gunslinger is all about. Gunslingers are pirates that can attack enemies from long range with high accuracy. Use #b#q5201001##k or #b#q5201002##k to attack multiple monsters at once.";
			}
			cm.sendNext(text);
		} else if (status == 24) {
			cm.sendNext(text);
		} else if (status == 25) {
			cm.sendNextPrev("One Brawler skill is called #b#q5101007##k. This skill is useful when you use it to leave the area without being detected by the monsters. Basically, it's you disguised as an Oak Barrel, and walking away from danger. Sometimes, a quick-thinking monster may catch you, but the higher your skill level gets, the less possibility of you getting caught red-handed and having to fight your way out.");
		} else if (status == 26) {
			cm.sendNextPrev("Next, we'll talk about #b#q5101005##k. It's a skill that allows you to regain MP at the expense of a bit of HP. Other than the Warriors, Brawlers have the highest HP of all, so losing a bit of HP doesn't affect them as much. It's especially useful when you're in the middle of combat, and you've run out of MP potions. Of course, you'll need to be aware of your HP level and the risks you'll be taking by using the skill.");
		} else if (status == 27) {
			cm.sendNext(text);
		} else if (status == 27) {
			cm.sendNextPrev("One Gunslinger skill is called #b#q5201006##k. This skill uses the recoil of the gun to let you jump backwards and attack monsters from behind. This skill is especially effective when you are trapped in the middle of monsters and need to escape. Just make sure you have a monster behind you before using this, okay?");
		} else if (status == 28) {
			cm.sendNextPrev("Next, we'll talk about #b#q5201005##k. This skill allows you to jump without being affected by Maple's law of gravity. This will allow you to stay afloat longer, and land on the ground later than regular jumps. If you use #b#q5201005##k from a high place, don't you think you'll be able to attack monsters in midair?");
		} else if (status == 29) {
			cm.sendNext("好的.我现在送你进去~\r\n#b15 #t4031856#s#k. 在你店下一步的时候,我会直接送给你15个#t#t4031856#s#k");
		cm.gainItem(4031856, 15);
		} else if (status == 30) {
			cm.sendNextPrev("你应该已经获得任务物品了吧?直接点#r结束对话#k即可!");
		} else if (status == 31) {
			cm.removeAll(4031856);
			var em = cm.getEventManager("Brawler");
			if (em != null)
				em.newInstance(cm.getPlayer().getName()).registerPlayer(cm.getPlayer());
			else
				cm.sendNext("There was a error while warping, please notify the GMs to fix this problem.");
			cm.dispose();
		} else if (status == 32) {
			cm.sendNext("点下一步获得15个#t4031857#s#.");
		cm.gainItem(4031857, 15);
		} else if (status == 33) {
			cm.sendNextPrev("出来继续交任务吧！.");
		} else if (status == 34) {
			cm.removeAll(4031857);
			var em = cm.getEventManager("Gunslinger");
			if (em != null)
				em.newInstance(cm.getPlayer().getName()).registerPlayer(cm.getPlayer());
			else
				cm.sendNext("遇见了一个错误的脚本函数!请告诉GM解决!");
			cm.dispose();
		} else if (status == 35) {
			cm.sendNext("欢迎第二次转职! #b#Brawler");
		} else if (status == 36) {
			if (cm.getJob().equals(MapleJob.PIRATE)) {
				cm.changeJob(MapleJob.BRAWLER);
			}
			cm.sendNextPrev("成功了.");
		} else if (status == 37) {
			cm.sendNextPrev("！￥@#%#￥……%&%……@");
		} else if (status == 38) {
			cm.sendNextPrev("$%^$^%!@#*^!@*&#^*!&@%^#%!@^()_)_).");
		} else if (status == 39) {
			cm.sendNextPrev("听明白了吗?");
		} else if (status == 40) {
			cm.sendNext("成为一个 #b枪手#k.?");
		} else if (status == 41) {
			if (cm.getJob().equals(MapleJob.PIRATE)) {
				cm.changeJob(MapleJob.GUNSLINGER);
			}
			cm.sendNextPrev("好, 从在这里在外面的之上, 你是一 #b枪手#k."); // 不是完全
		} else if (status == 42) {
			cm.sendNextPrev("！￥%#……￥%*…………&@#.");
		} else if (status == 43) {
			cm.sendNextPrev("2#￥@%#￥……￥%&%￥……@#￥#.");
		} else if (status == 44) {
			cm.sendNextPrev("我将在这里对你是候补."); // Not complete
		}
	}
}
