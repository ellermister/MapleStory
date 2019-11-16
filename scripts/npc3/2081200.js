/* Author: Xterminator
	NPC Name: 		Gritto
	Map(s): 		Leafre: Forest of the Priest (240010501)
	Description: 		Magician 4th Job Advancement
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
			if (cm.getJob().getId() == 211 || cm.getJob().getId() == 221 || cm.getJob().getId() == 231) {
				if (cm.getPlayer().getLevel() >= 120) {
					if (cm.getQuestStatus(6914).equals(net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED)) {
						if (cm.getJob().getId() == 211) {
							cm.sendSimple("You're qualified to be a true magician. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Arch Mage.#l\r\n#b#L1# Let me think for a while.#l");
						} else if (cm.getJob().getId() == 221) {
							cm.sendSimple("You're qualified to be a true magician. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Arch Mage.#l\r\n#b#L1# Let me think for a while.#l");
						} else if (cm.getJob().getId() == 231) {
							cm.sendSimple("You're qualified to be a true magician. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Bishop.#l\r\n#b#L1# Let me think for a while.#l");
						}
					} else {
						cm.sendOk("You're not ready to make the 4th job advancement. When you're ready, talk to me.");
						cm.dispose();
					}
				} else {
					cm.sendOk("You're still weak to go to the magician extreme road. If you get stronger, come back to me.");
					cm.dispose();
				}
			} else if (cm.getJob().getId() == 212 || cm.getJob().getId() == 222 || cm.getJob().getId() == 232) {
				if (cm.getJob().getId() == 212) {
					cm.sendOk("You became the best magician, the position of #bArch Mage#k. Stronger power means more responsibility. Hope you get over all the tests you will have in future.");
				} else if (cm.getJob().getId() == 222) {
					cm.sendOk("You became the best magician, the position of #bArch Mage#k. Stronger power means more responsibility. Hope you get over all the tests you will have in future.");
				} else if (cm.getJob().getId() == 232) {
					cm.sendOk("You became the best magician, the position of #bBishop#k. Stronger power means more responsibility. Hope you get over all the tests you will have in future.");
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
						if (cm.getJob().getId() == 211) {
							cm.changeJob(net.sf.odinms.client.MapleJob.FP_ARCHMAGE);
							cm.teachSkill(2121001, 0, 10);
							cm.teachSkill(2121002, 0, 10);
							cm.teachSkill(2121006, 0, 10);
							status = 2;
							cm.sendNext("You became the best magician, #bArch Mage#k. Arch Mage can use its own power as well as Mana of nature just like \n#bInfinity#k or #bBig Bang#k");
						} else if (cm.getJob().getId() == 221) {
							cm.changeJob(net.sf.odinms.client.MapleJob.IL_ARCHMAGE);
							cm.teachSkill(2221001, 0, 10);
							cm.teachSkill(2221002, 0, 10);
							cm.teachSkill(2221006, 0, 10);
							status = 2;
							cm.sendNext("You became the best magician, #bArch Mage#k. Arch Mage can use its own power as well as Mana of nature just like \n#bInfinity#k or #bBig Bang#k");
						} else if (cm.getJob().getId() == 231) {
							cm.changeJob(net.sf.odinms.client.MapleJob.BISHOP);
							cm.teachSkill(2321001, 0, 10);
							cm.teachSkill(2321002, 0, 10);
							cm.teachSkill(2321005, 0, 10);
							status = 2;
							cm.sendNext("You became the best magician #bBishop#k. Bishop can use its own power as well as Mana of nature just like \n#bInfinity#k or #bBig Bang#k");
						}
					}
				}
			} else {
				cm.sendNext("You don't have to hesitate to be the best Magician..Whenever you decide, talk to me. If you're ready, I'll let you make the 4th job advancement.");
				cm.dispose();
			}
		} else if (status == 2) {
			if (cm.getJob().getId() == 212) {
				cm.sendNext("You became the best magician, #bArch Mage#k. Arch Mage can use its own power as well as Mana of nature just like \n#bInfinity#k or #bBig Bang#k");
			} else if (cm.getJob().getId() == 222) {
				cm.sendNext("You became the best magician, #bArch Mage#k. Arch Mage can use its own power as well as Mana of nature just like \n#bInfinity#k or #bBig Bang#k");
			} else if (cm.getJob().getId() == 232) {
				cm.sendNext("You became the best magician #bBishop#k. Bishop can use its own power as well as Mana of nature just like \n#bInfinity#k or #bBig Bang#k");
			}
		} else if (status == 3) {
			if (cm.getJob().getId() == 212) {
				cm.sendNextPrev("This is not all about Arch Mage. Arch Mage is good at fire and poison element-based. It may change not only extreme element-based but also element-based of its own or enemies if you train.");
			} else if (cm.getJob().getId() == 222) {
				cm.sendNextPrev("This is not all about Arch Mage. Arch Mage is good at ice and lightning element-based. It may change not only extreme element-based but also element-based of its own or enemies if you train.");
			} else if (cm.getJob().getId() == 232) {
				cm.sendNextPrev("This is not all about Bishop. Bishop can borrow God's power. It may make strong castle element-based magic and even make the dead alive.");
			}
		} else if (status == 4) {
			cm.sendPrev("Don't forget that it all depends on how much you train.");
		} else if (status == 5) {
			cm.dispose();
		}
	}
}