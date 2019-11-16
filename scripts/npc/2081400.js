/* Author: Xterminator
	NPC Name: 		Hellin
	Map(s): 		Leafre: Forest of the Priest (240010501)
	Description: 		Thief 4th Job Advancement
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
			if (cm.getJob().getId() == 411 || cm.getJob().getId() == 421) {
				if (cm.getPlayer().getLevel() >= 120) {
					if (cm.getQuestStatus(6934).equals(net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED)) {
						if (cm.getJob().getId() == 411) {
							cm.sendSimple("You're qualified to be a true thief. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Night Lord.#l\r\n#b#L1# Let me think for a while.#l");
						} else if (cm.getJob().getId() == 421) {
							cm.sendSimple("You're qualified to be a true thief. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Shadower.#l\r\n#b#L1# Let me think for a while.#l");
						}
					} else {
						cm.sendOk("You're not ready to make the 4th job advancement. When you're ready, talk to me.");
						cm.dispose();
					}
				} else {
					cm.sendOk("You're still weak to go to the thief extreme road. If you get stronger, come back to me.");
					cm.dispose();
				}
			} else if (cm.getJob().getId() == 412 || cm.getJob().getId() == 422) {
				if (cm.getJob().getId() == 412) {
					cm.sendOk("You became the best thief, the position of #bNight Lord#k. Stronger power means more responsibility. Hope you get over all the tests you will have in future.");
				} else if (cm.getJob().getId() == 422) {
					cm.sendOk("You became the best thief, the position of #bShadower#k. Stronger power means more responsibility. Hope you get over all the tests you will have in future.");
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
						if (cm.getJob().getId() == 411) {
							cm.changeJob(net.sf.odinms.client.MapleJob.NIGHTLORD);
							cm.teachSkill(4121006, 0, 10);
							cm.teachSkill(4120002, 0, 10);
							cm.teachSkill(4120005, 0, 10);
							status = 2;
							cm.sendNext("You became the best thief #bNight Lord#k. Night Lord is good at using #bShadow Sifter#k to avoid enemy's attack and #bNinja Ambush#k to call hidden colleagues. It attacks the blind side of enemy.");
						} else if (cm.getJob().getId() == 421) {
							cm.changeJob(net.sf.odinms.client.MapleJob.SHADOWER);
							cm.teachSkill(4220002, 0, 10);
							cm.teachSkill(4220005, 0, 10);
							cm.teachSkill(4221007, 0, 10);
							status = 2;
							cm.sendNext("You became the best thief #bShadower#k. Shadower is good at using #bShadow Sifter#k to avoid enemy's attack and #bNinja Ambush#k to call hidden colleagues. It attacks the blind side of enemy.");
						}
					}
				}
			} else {
				cm.sendNext("You don't have to hesitate.... Whenever you decide, talk to me. If you're ready, I'll let you make the 4th job advancement.");
				cm.dispose();
			}
		} else if (status == 2) {
			if (cm.getJob().getId() == 412) {
				cm.sendNext("You became the best thief #bNight Lord#k. Night Lord is good at using #bFake#k to avoid enemy's attack and #bNinja Ambush#k to call hidden colleagues. It attacks the blind side of enemy.");
			} else if (cm.getJob().getId() == 422) {
				cm.sendNext("You became the best thief #bShadower#k. Night Lord is good at using #bFake#k to avoid enemy's attack and #bNinja Ambush#k to call hidden colleagues. It attacks the blind side of enemy.");
			}
		} else if (status == 3) {
			if (cm.getJob().getId() == 412) {
				cm.sendNextPrev("This is not all about Night Lord. Night Lord is good at fast war. It can throw many stars at one time and may beat off plenty of enemies at once.");
			} else if (cm.getJob().getId() == 422) {
				cm.sendNextPrev("This is not all about Shadower. Shadower is good at sudden attack. It can attack enemies before they notice and even beat them locked in the darkness.");
			}
		} else if (status == 4) {
			cm.sendPrev("Don't forget that it all depends on how much you train.");
		} else if (status == 5) {
			cm.dispose();
		}
	}
}