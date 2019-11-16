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

/* Adobis
 * 
 * El Nath: The Door to Zakum (211042300)
 * 
 * Zakum Quest NPC 
 
 * Custom Quest 100200 = whether you can do Zakum
 * Custom Quest 100201 = Collecting Gold Teeth <- indicates it's been started
 * Custom Quest 100203 = Collecting Gold Teeth <- indicates it's finished
 * 4031061 = Piece of Fire Ore - stage 1 reward
 * 4031062 = Breath of Fire    - stage 2 reward
 * 4001017 = Eye of Fire       - stage 3 reward
 * 4000082 = Zombie's Gold Tooth (stage 3 req)
*/

var status;
var mapId = 211042300;
var stage;
var teethmode;
var minLevel = 50;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getPlayer().getLevel() >= minLevel) {
				if (cm.getQuestStatus(100200) != net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED && cm.getQuestStatus(100200) != net.sf.odinms.client.MapleQuestStatus.Status.STARTED) {
					cm.startQuest(100200);
					cm.sendOk("你想挑战大怪物 #b扎昆#k ？ 这一切都不是容易的。首先让我来测试下你的能力吧！");
					cm.dispose();
					return;
				} else if (cm.getQuestStatus(100201) == net.sf.odinms.client.MapleQuestStatus.Status.STARTED) {
					teethmode = 1;
					cm.sendNext("Have you got the items I asked for? This ain't no charity.");
				} else {
					cm.sendSimple("好。。。我看你们有充分的资格，你想挑战那一阶段？ #b\r\n#L0#废矿调查(第一阶段)#l\r\n#L1#扎昆迷宫调查(第二阶段)#l\r\n#L2#治炼邀请(第三阶段)#l");						
				}
				if (cm.getQuestStatus(100201) == net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
					teethmode = 2;
				}
			} else {
				cm.sendOk("按照你目前的情况，你还不能满足进行这项任务的能力，当你变的强大的时候，再来找我吧！");
				cm.dispose();
			}
		} else if (status == 1) {
			if (teethmode == 1) {
				if (cm.haveItem(4031061,1) && cm.haveItem(4031062,1) && cm.haveItem(4000082,30)) {
					cm.gainItem(4031061,-1);
					cm.gainItem(4031062,-1);
					cm.gainItem(4000082,-30);
					cm.gainItem(4001017,5);
					cm.sendNext("Thank you for the teeth!  Next time you see me, I'll be blinging harder than #rJaws#k!  Goodbye and good luck!");
					cm.completeQuest(100201);
					cm.completeQuest(100200);
					cm.dispose();
				} else {
					cm.sendNext("You shtill didn't get me my teef! Howsh a man shupposhed to conshentrate wifout teef?");
					cm.dispose();
				}
				return;
			}
			if (selection == 0) {
				if (cm.getParty() == null) {
					cm.sendNext("进入调查前，你应该有一个队伍。请先组队。");
					cm.dispose();
				} else if (!cm.isLeader()) {
					cm.sendNext("请让组队长和我讲话，决定进入时间。");
					cm.dispose();
				} else {
					var party = cm.getParty().getMembers();
					mapId = cm.getChar().getMapId();
					var next = true;
					for (var i = 0; i < party.size(); i++) {
						if ((party.get(i).getLevel() < 50) || (party.get(i).getMapid() != mapId)) {
							next = false;
						}
					}
					if (next) {
						var em = cm.getEventManager("ZakumPQ");
						if (em == null) {
							cm.sendOk("脚本发生错误，请联系管理员！");
						} else {
							em.startInstance(cm.getParty(), cm.getChar().getMap());
							party = cm.getChar().getEventInstance().getPlayers();
							cm.removeFromParty(4001015, party);
							cm.removeFromParty(4001018, party);
							cm.removeFromParty(4001016, party);
						}
						cm.dispose();
					} else {
						cm.sendNext("当前组队中玩家状态错误！");
						cm.dispose();
					}
				}
			} else if (selection == 1) { //Zakum Jump Quest
				stage = 1;
				if (cm.haveItem(4031061) && !cm.haveItem(4031062)) {
					cm.sendYesNo("Would you like to attempt the #bBreath of Lava#k?  If you fail, there is a very real chance you will die.");
				} else {
					if (cm.haveItem(4031062))
						cm.sendNext("You've already got the #bBreath of Lava#k, you don't need to do this stage.");
					else
						cm.sendNext("请先完成前面的调查任务。");
					cm.dispose();
				}
			} else if (selection == 2) { //Golden Tooth Collection
				stage = 2;
				if (teethmode == 2 && cm.haveItem(4031061) && cm.haveItem(4031062)) {
					// Already done it once, they want more
					cm.sendYesNo("If you want more #bEyes of Fire#k, you need to bring me the same #b30 Zombie's Lost Gold Tooth#k.  Turns out gold dentures don't last long, and I need a new one.\r\nDo you have those teeth for me?");
				} else if (cm.haveItem(4031061) && cm.haveItem(4031062)) {
					// check if quest is complete, if so reset it (NOT COMPLETE)
					cm.sendYesNo("Okay, you've completed the earlier trials.  Now, with a little hard work I can get you the #bseeds of Zakum#k necessary to enter combat.  But first, my teeths are not as good as they used to be.  You ever seen a dentist in Maple Story?  Well, I heard the Miner Zombies have gold teeth.  I'd like you to collect #b30 Zombie's Lost Gold Tooth#k so I can build myself some dentures.  Then I'll be able to get you the items you desire.\r\nRequired:\r\n#i4000082##b x 30");
				
				} else {
					cm.sendNext("请先完成前面的调查任务。");
					cm.dispose();
				}
			}
		} else if (status == 2) {
			if (stage == 1) {
				cm.warp(280020000); // Breath of Lava I
				cm.dispose();
			}
			if (stage == 2) {
				if (teethmode == 2) {
					if (cm.haveItem(4031061,1) && cm.haveItem(4031062,1) && cm.haveItem(4000082,30)) { // take away items, give eyes of fire, complete quest
						cm.gainItem(4031061,-1);
						cm.gainItem(4031062,-1);
						cm.gainItem(4000082,-30);
						cm.gainItem(4001017,5);
						cm.sendNext("Thank you for the teeth!  Next time you see me, I'll be blinging harder than #rJaws#k!  Goodbye and good luck!");
						cm.completeQuest(100201);
						cm.completeQuest(100200);
						cm.dispose();
					} else {
						cm.sendNext("You don't have any teeth yet!  Don't try to pull a fast one on me.");
						cm.dispose();
					}
				} else {
					cm.startQuest(100201);
					cm.dispose();
				}
			}
		}
	}
}