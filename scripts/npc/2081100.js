/* Author: Xterminator
	NPC Name: 		Harmonia
	Map(s): 		Leafre: Forest of the Priest (240010501)
	Description: 		Warrior 4th Job Advancement
*/

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getJob().getId() == 111 || cm.getJob().getId() == 121 || cm.getJob().getId() == 131) {
				if (cm.getPlayer().getLevel() >= 120) {
					if (cm.getQuestStatus(6904).equals(net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED)) {
						if (cm.getJob().getId() == 111) {
							cm.sendSimple("You're qualified to be a true warrior. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Hero.#l\r\n#b#L1# Let me think for a while.#l");
						} else if (cm.getJob().getId() == 121) {
							cm.sendSimple("You're qualified to be a true warrior. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Paladin.#l\r\n#b#L1# Let me think for a while.#l");
						} else if (cm.getJob().getId() == 131) {
							cm.sendSimple("You're qualified to be a true warrior. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Dark Knight.#l\r\n#b#L1# Let me think for a while.#l");
						}
					} else {
						cm.sendOk("You're not ready to make the 4th job advancement. When you're ready, talk to me.");
						cm.dispose();
					}
				} else {
					cm.sendOk("You're still weak to go to the warrior extreme road. If you get stronger, come back to me.");
					cm.dispose();
				}
			} else if (cm.getJob().getId() == 112 || cm.getJob().getId() == 122 || cm.getJob().getId() == 132) {
				if (cm.getJob().getId() == 112) {
					cm.sendOk("You became the best warrior, the position of #bHero#k. Stronger power means more responsibility. Hope you get over all the tests you will have in future.");
				} else if (cm.getJob().getId() == 122) {
					cm.sendOk("You became the best warrior, the position of #bPaladin#k. Stronger power means more responsibility. Hope you get over all the tests you will have in future.");
				} else if (cm.getJob().getId() == 132) {
					cm.sendOk("You became the best warrior, the position of #bDark Knight#k. Stronger power means more responsibility. Hope you get over all the tests you will have in future.");
				}
				cm.dispose();
			} else {
				cm.sendOk("Why do you want to see me? There is nothing you want to ask me.");
				cm.dispose();
			}
		} else if (status == 1) {
			if (selection == 0) {
				nPSP = (cm.getPlayer().getLevel() - 120) * 3;
				if (cm.getPlayer().getRemainingSp() > nPSP) {
					cm.sendNext("Hmm...You have too many #bSP#k. You can't make the 4th job advancement with too many SP left.");
					cm.dispose();
				} else {
					if (!cm.canHold(2280003)) {
						cm.sendNext("You can't proceed as you don't have an empty slot in your inventory. Please clear your inventory and try again.");
						cm.dispose();
					} else {
						cm.gainItem(2280003, 1);
						var statup = new java.util.ArrayList();
						cm.getPlayer().setRemainingAp(cm.getPlayer().getRemainingAp() + 5);
						statup.add(new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(cm.getPlayer().getRemainingAp())));
						cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.updatePlayerStats(statup));
						if (cm.getJob().getId() == 111) {
							cm.changeJob(net.sf.odinms.client.MapleJob.HERO);
							cm.teachSkill(1120004, 0, 10);
							cm.teachSkill(1121001, 0, 10);
							cm.teachSkill(1121008, 0, 10);
							status = 2;
							cm.sendNext("You have become the best of warriors, my #bHero#k. You will gain the #bRush#k Skill which makes you attack mutiple enemies and give you indomitable will along with #bStance#k and #bAchilles#k");
						} else if (cm.getJob().getId() == 121) {
							cm.changeJob(net.sf.odinms.client.MapleJob.PALADIN);
							cm.teachSkill(1220005, 0, 10);
							cm.teachSkill(1221001, 0, 10);
							cm.teachSkill(1221009, 0, 10);
							status = 2;
							cm.sendNext("You have become the best of warriors, my #bPaladin#k. You will gain the #bRush#k Skill which makes you attack mutiple enemies and give you indomitable will along with #bStance#k and #bAchilles#k");
						} else if (cm.getJob().getId() == 131) {
							cm.changeJob(net.sf.odinms.client.MapleJob.DARKKNIGHT);
							cm.teachSkill(1320005, 0, 10);
							cm.teachSkill(1321001, 0, 10);
							cm.teachSkill(1321007, 0, 10);
							status = 2;
							cm.sendNext("You have become the best of warriors, my #bDark Knight#k. You will gain the #bRush#k Skill which makes you attack mutiple enemies and give you indomitable with along with #bStance#k and #bAchilles#k.");
						}
					}
				}
			} else {
				cm.sendNext("You don't have to hesitate to be the best Warrior..Whenever you make your decision, talk to me. If you're ready, I'll let you make the 4th job advancement.");
				cm.dispose();
			}
		} else if (status == 2) {
			if (cm.getJob().getId() == 112) {
				cm.sendNext("You have become the best of warriors, my #bHero#k. You will gain the #bRush#k Skill which makes you attack mutiple enemies and give you indomitable will along with #bStance#k and #bAchilles#k");
			} else if (cm.getJob().getId() == 122) {
				cm.sendNext("You have become the best of warriors, my #bPaladin#k. You will gain the #bRush#k Skill which makes you attack mutiple enemies and give you indomitable will along with #bStance#k and #bAchilles#k");
			} else if (cm.getJob().getId() == 132) {
				cm.sendNext("You have become the best of warriors, my #bDark Knight#k. You will gain the #bRush#k Skill which makes you attack mutiple enemies and give you indomitable with along with #bStance#k and #bAchilles#k.");
			}
		} else if (status == 3) {
			if (cm.getJob().getId() == 112) {
				cm.sendNextPrev("This is not all about Hero. Hero is a well-balanced warrior who has excellent attack and defense power. It can learn various attack skills as well as combo attack if he trains himself.");
			} else if (cm.getJob().getId() == 122) {
				cm.sendNextPrev("This is not all about Paladin. Paladin is good at element-based attack and defense. It can use a new element-based and may break the limit of charge blow if you train yourself.");
			} else if (cm.getJob().getId() == 132) {
				cm.sendNextPrev("This is not all about Dark Knight. Dark Knight can use the power of darkness. It can attack with power of darkness which is unbelievably strong and may summon the figure of darkness.");
			}
		} else if (status == 4) {
			cm.sendPrev("Don't forget that it all depends on how much you train.");
		} else if (status == 5) {
			cm.dispose();
		}
	}
}