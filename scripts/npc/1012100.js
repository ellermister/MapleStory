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

/* Athena Pierce
	Bowman Job Advancement
	Victoria Road : Bowman Instructional School (100000201)

	Custom Quest 100000, 100002
*/

importPackage(net.sf.odinms.client);

var status = 0;
var job;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 2) {
			cm.sendOk("请您想好了以后再来找我.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
				if (cm.getLevel() >= 10 && cm.getChar().getDex() >= 25)
					cm.sendNext("你已经决定转职成为一名 #r弓箭手#k?");
				else {
					cm.sendOk("你需要加强更多的修炼,我才能告诉你怎样成为一名出色的#r弓箭手#k.")
					cm.dispose();
				}
			} else {
				if (cm.getLevel() >= 30 
					&& cm.getJob().equals(net.sf.odinms.client.MapleJob.BOWMAN)) {
					if (cm.getQuestStatus(100000).getId() >=
						net.sf.odinms.client.MapleQuestStatus.Status.STARTED.getId()) {
						cm.completeQuest(100002);
						if (cm.getQuestStatus(100002) ==
						 net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
							status = 20;
							cm.sendNext("我认为你做得相当不错. 我将允许你进入一下漫长的修炼阶段.");
						} else {
							cm.sendOk("Go and see the #rJob Instructor#k.")
							cm.dispose();
						}
					} else {
						status = 10;
						cm.sendNext("你目前所做出的进步真的很让人吃惊.");
					}
				} else if (cm.getQuestStatus(100100).equals(MapleQuestStatus.Status.STARTED)) {
					cm.completeQuest(100101);
					if (cm.getQuestStatus(100101).equals(MapleQuestStatus.Status.COMPLETED)) {
						cm.sendOk("那么,请把这个转交给#bRene#k.");
					} else {
						cm.sendOk("Hey, " + cm.getChar().getName() + "! I need a #bBlack Charm#k. Go and find the Door of Dimension.");
						//cm.startquest(100101);
					}
					cm.dispose();
				} else {
					cm.sendOk("你的选择是明智的.");
					cm.dispose();
				}
			}
		} else if (status == 1) {
			cm.sendNextPrev("这是非常重要也是你最后作出的一个选择. 一旦你选择了该职业,你将永远不能改变.");
		} else if (status == 2) {
			cm.sendYesNo("你真的想成为一名#r弓箭手#k吗?");
		} else if (status == 3) {
			if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER))
				cm.changeJob(net.sf.odinms.client.MapleJob.BOWMAN);
			cm.sendOk("转职成功!那么现在请你去为了更高的境界而奋斗吧.");
			cm.dispose();
		} else if (status == 11) {
			cm.sendNextPrev(" 作为一名#r猎人#k或者#r弩弓手#k,你应该做好挑战下一个阶段的准备.")
		} else if (status == 12) {
			cm.sendAcceptDecline("但我首先得考考你的能力. 你准备好了吗?");
		} else if (status == 13) {
			if (cm.haveItem(4031010)) {
				cm.sendOk("Please report this bug at http://odinms.de/forum/.\r\nstatus = 13");
			} else {
				//cm.startquest(100000);
				cm.sendOk("请你把这封信带给#b2转的教官#k 他就在 Henesys. 他将会给你转职的指引.");
			}
		} else if (status == 21) {
			cm.sendSimple("你想转为下面哪个职业呢?#b\r\n#L0#猎人#l\r\n#L1#弩弓手#l#k");
		} else if (status == 22) {
			var jobName;
			if (selection == 0) {
				jobName = "猎人";
				job = net.sf.odinms.client.MapleJob.HUNTER;
			} else {
				jobName = "弩弓手";
				job = net.sf.odinms.client.MapleJob.CROSSBOWMAN;
			}
			cm.sendYesNo("你真的想成为一名#r" + jobName + "#k?");
		} else if (status == 23) {
			cm.changeJob(job);
			cm.sendOk("转职成功!那么现在请你去为了更高的境界而奋斗吧.");
		}
	}
}	
