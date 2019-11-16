/* Author: Xterminator
	NPC Name: 		Samuel
	Map(s): 		Leafre: Forest of the Priest (240010501)
	Description: 		Pirate 4th Job Advancement
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
			if (cm.getJob().getId() == 511 || cm.getJob().getId() == 521) {
				if (cm.getPlayer().getLevel() >= 120) {
					if (cm.getQuestStatus(6944).equals(net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED)) {
						if (cm.getJob().getId() == 511) {
							cm.sendSimple("You have proved yourself a hero indeed. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Buccaneer.#l\r\n#b#L1# I need a minute to think about it.#l");
						} else if (cm.getJob().getId() == 521) {
							cm.sendSimple("You have proved yourself a hero indeed. \r\nDo you wish to make your job advancement now?\r\n#b#L0# I want to advance into a Corsair.#l\r\n#b#L1# I need a minute to think about it.#l");
						}
					} else {
						cm.sendOk("You're not ready to make the 4th job advancement. When you're ready, talk to me.");
						cm.dispose();
					}
				} else {
					cm.sendOk("You're still weak to go to the pirate extreme road. If you get stronger, come back to me.");
					cm.dispose();
				}
			} else if (cm.getJob().getId() == 512 || cm.getJob().getId() == 522) {
				if (cm.getJob().getId() == 512) {
					cm.sendOk("You have now reached the pinnacle of your pirate career by becoming a #bBuccaneer#k. But possessing great power means great responsibilities. I wish you success in defeating all the challenges that are thrown your way!");
				} else if (cm.getJob().getId() == 522) {
					cm.sendOk("You have now reached the pinnacle of your pirate career by becoming a #bCorsair#k. But possessing great power means great responsibilities. I wish you success in defeating all the challenges that are thrown your way!");
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
						if (cm.getJob().getId() == 511) {
							cm.changeJob(net.sf.odinms.client.MapleJob.BUCCANEER);
							cm.teachSkill(5121001, 0, 10);
							cm.teachSkill(5121007, 0, 10);
							cm.teachSkill(5121002, 0, 10);
							cm.teachSkill(5121009, 0, 10);
							status = 2;
							cm.sendNext("Now that you are a #bBuccaneer#k, you have reached the pinnacle of your career as a pirate. As a Buccaneer, you can use Speed Infusion to increase your party members' attack speed. It'll be so fast that the attacks won't even look like #bDemolition#k.");
						} else if (cm.getJob().getId() == 521) {
							cm.changeJob(net.sf.odinms.client.MapleJob.CORSAIR);
							cm.teachSkill(5220001, 0, 10);
							cm.teachSkill(5220011, 0, 10);
							cm.teachSkill(5220002, 0, 10);
							cm.teachSkill(5221004, 0, 10);
							status = 2;
							cm.sendNext("Now that you are a #bCorsair#k, you have reached the pinnacle of your career as a pirate. As a Corsair, you can use Speed Infusion to increase your party members' attack speed. It'll be so fast that the attacks won't even look like #bDemolition#k.");
						}
					}
				}
			} else {
				cm.sendNext("You don't have to hesitate.... Whenever you decide, talk to me. If you're ready, I'll let you make the 4th job advancement.");
				cm.dispose();
			}
		} else if (status == 2) {
			if (cm.getJob().getId() == 512) {
				cm.sendNext("Now that you are a #bBuccaneer#k, you have reached the pinnacle of your career as a pirate. As a Buccaneer, you can use Speed Infusion to increase your party members' attack speed. It'll be so fast that the attacks won't even look like #bDemolition#k.");
			} else if (cm.getJob().getId() == 522) {
				cm.sendNext("Now that you are a #bCorsair#k, you have reached the pinnacle of your career as a pirate. As a Corsair, you can use Speed Infusion to increase your party members' attack speed. It'll be so fast that the attacks won't even look like #bDemolition#k.");
			}
		} else if (status == 3) {
			if (cm.getJob().getId() == 512) {
				cm.sendNextPrev("But that isn't all there is to a Buccaneer. Buccaneers are skilled fighters who are completely in control of their bodies. Depending on the Buccaneer's training, they can kill an enemy with a single strike.");
			} else if (cm.getJob().getId() == 522) {
				cm.sendNextPrev("But that isn't all there is to a Corsair. Corsairs are skilled fighters who are completely in control of their bodies. Depending on the Corsair's training, they can kill an enemy with a single strike.");
			}
		} else if (status == 4) {
			cm.dispose();
		}
	}
}