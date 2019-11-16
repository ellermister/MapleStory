/* Author: Xterminator
	NPC Name: 		Legor
	Map(s): 		Leafre: Forest of the Priest (240010501)
	Description: 		Bowman 4th Job Advancement
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
			if (cm.getJob().getId() == 311 || cm.getJob().getId() == 321) {
				if (cm.getPlayer().getLevel() >= 120) {
					if (cm.getQuestStatus(6924).equals(net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED)) {
						if (cm.getJob().getId() == 311) {
							cm.sendSimple("You're qualified to be a true bowman. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Bow Master.#l\r\n#b#L1# Let me think for a while.#l");
						} else if (cm.getJob().getId() == 321) {
							cm.sendSimple("You're qualified to be a true bowman. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Marksman.#l\r\n#b#L1# Let me think for a while.#l");
						}
					} else {
						cm.sendOk("You're not ready to make the 4th job advancement. When you're ready, talk to me.");
						cm.dispose();
					}
				} else {
					cm.sendOk("You're still weak to go to the bowman extreme road. If you get stronger, come back to me.");
					cm.dispose();
				}
			} else if (cm.getJob().getId() == 312 || cm.getJob().getId() == 322) {
				if (cm.getJob().getId() == 312) {
					cm.sendOk("You became the best bowman, the position of #bBow Master#k. Stronger power means more responsibility. Hope you get over all the tests you will have in future.");
				} else if (cm.getJob().getId() == 322) {
					cm.sendOk("You became the best bowman, the position of #bMarksman#k. Stronger power means more responsibility. Hope you get over all the tests you will have in future.");
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
						if (cm.getJob().getId() == 311) {
							cm.changeJob(net.sf.odinms.client.MapleJob.BOWMASTER);
							cm.teachSkill(3121002, 0, 10);
							cm.teachSkill(3121007, 0, 10);
							cm.teachSkill(3120005, 0, 10);
							status = 2;
							cm.sendNext("You became the best bowman, #bBowmaster#k. Bow Master can use #bSharp Eyes#k which can increase the fighting power of colleagues so that it became such an important job.");
						} else if (cm.getJob().getId() == 321) {
							cm.changeJob(net.sf.odinms.client.MapleJob.CROSSBOWMASTER);
							cm.teachSkill(3221002, 0, 10);
							cm.teachSkill(3220004, 0, 10);
							cm.teachSkill(3221006, 0, 10);
							status = 2;
							cm.sendNext("You became the best bowman #bMarksman#k. Marksman can use #bSharp Eyes#k which can increase the fighting power of colleagues so that it became such an important job.");
						}
					}
				}
			} else {
				cm.sendNext("You don't have to hesitate....You passed all tests. Whenever you decide, talk to me. If you're ready, I'll let you make the 4th job advancement.");
				cm.dispose();
			}
		} else if (status == 2) {
			if (cm.getJob().getId() == 312) {
				cm.sendNext("You became the best bowman, #bBowmaster#k. Bow Master can use #bSharp Eyes#k which can increase the fighting power of colleagues so that it became such an important job.");
			} else if (cm.getJob().getId() == 322) {
				cm.sendNext("You became the best bowman #bMarksman#k. Marksman can use #bSharp Eyes#k which can increase the fighting power of colleagues so that it became such an important job.");
			}
		} else if (status == 3) {
			if (cm.getJob().getId() == 312) {
				cm.sendNextPrev("This is not all about Bow Master. Bow Master is good at a fast battle. It can attack enemies with enormously fast speed and even have great attack power.");
			} else if (cm.getJob().getId() == 322) {
				cm.sendNextPrev("This is not all about Marksman. Each shot of Marksman is very strong. It can attack many enemies with strong power and may beat off them at once.");
			}
		} else if (status == 4) {
			cm.sendPrev("Don't forget that it all depends on how much you train.");
		} else if (status == 5) {
			cm.dispose();
		}
	}
}