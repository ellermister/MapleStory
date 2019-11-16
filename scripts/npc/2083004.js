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

importPackage(java.lang);
importPackage(net.sf.odinms.server);
importPackage(net.sf.odinms.tools);

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("里面的#b黑暗龙王#k非常强大！！单凭一个人的努力是战胜不了它的！");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
		
		if (status == 0) {
			if (cm.getSquadState(MapleSquadType.HORNTAIL) == 0) {
				cm.sendYesNo("如果你想进入以下的挑战。。。你需要#b创建一个远征队#k带领你的小队队伍进入后各方面的团结才能让你们#b挑战强大的怪物?\r\n系统检测到你没有小队\r\n#r是否创建一个远征队？");
			} else if (cm.getSquadState(MapleSquadType.HORNTAIL) == 1) {
				if (cm.checkSquadLeader(MapleSquadType.HORNTAIL)) {
					cm.sendSimple("勇士...你需要做什么?\r\n#b#L1#查看目前远征队信息#l\r\n#L2#Close registrations#l\r\n#L3#Start the fight#l\r\n#L4#关闭/退出我的信息#l\r\n");
					status = 19;
				} else if (cm.isSquadMember(MapleSquadType.HORNTAIL)) {
					var noOfChars = cm.numSquadMembers(MapleSquadType.HORNTAIL);
					var toSend = "The following warriors are ready to fight Horntail:\r\n";
					for (var i = 1; i <= noOfChars; i++) {
						if (i == 1) {
							toSend += "#L" + i + "##rNo. " + i + ": " + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l#k" + "\r\n";
						}
						else {
							toSend += "#L" + i + "#No. " + i + ": " + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l" + "\r\n";
						}
					}
					cm.sendSimple(toSend);
					cm.dispose();
					return;
				} else {
					cm.sendYesNo("Would you like to join the Horntail squad? Victorious warriors are looked upon greatly and will recieve immense rewards!");
					status = 9;
				}
			} else if (cm.getSquadState(MapleSquadType.HORNTAIL) == 2) {
				if (cm.checkSquadLeader(MapleSquadType.HORNTAIL)) {
					cm.sendSimple("勇士...你需要做什么??\r\n#L1#查看远征队信息#l\r\n#L2#Open registrations#l\r\n#L3#Start the fight!#l");
					status = 19;
				} else if (cm.isSquadMember(MapleSquadType.HORNTAIL)) {
					var noOfChars = cm.numSquadMembers(MapleSquadType.HORNTAIL);
					var toSend = "The following members make up the squad:\r\n";
					for (var i = 1; i <= noOfChars; i++) {
						toSend += "#L" + i + "# " + i + " - " + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l" + "\r\n";
					}
					cm.sendSimple(toSend);
					cm.dispose();
				} else {
					cm.sendOk("你的远征队队伍已经创建并且记录在内了，如果有玩家需要加入，会在我这里选择进入！");
					cm.dispose();
					return;
				}
			} else {
				cm.sendOk("The battle against Horntail has begun. You must await their completion before you can go further!");
				cm.dispose();
				return;
			}
		} else if (status == 1) {
			if (cm.createMapleSquad(MapleSquadType.HORNTAIL) != null) {
				cm.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, cm.getPlayer().getName() + " has been appointed the leader of the Horntail Squad. Please apply now if you would like to join " + cm.getPlayer().getName() + " in defeating Horntail!"));
				cm.sendOk("你的远征队已经创建了。已经记录在信息内！！");
				cm.dispose();
				return;
			} else {
				cm.sendOk("Please make sure a squad hasn't already been created!");
				cm.dispose();
				return;
			}
		} else if (status == 10) {
				if (cm.numSquadMembers(MapleSquadType.HORNTAIL) > 29) {
					cm.sendOk("Sorry, the Honrtail squad is full.");
					cm.dispose();
				} else {
					if (cm.canAddSquadMember(MapleSquadType.HORNTAIL)) {
						cm.addSquadMember(MapleSquadType.HORNTAIL);
						cm.sendOk("You have signed up, please wait for further instructions from your squad leader.");
						cm.dispose();
					} else {
						cm.sendOk("Sorry, but the leader has stopped you from joining!");
						cm.dispose();
					}
				}
		} else if (status == 20) {
			if (selection == 1) {
				var noOfChars = cm.numSquadMembers(MapleSquadType.HORNTAIL);
				var toSend = "目前的远征队信息（排序不分实力）:\r\n";
				for (var i = 1; i <= noOfChars; i++) {
					if (i == 1) {
						toSend += "#L" + i + "##r第 " + i + ": " + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l#k" + "\r\n";
					}
					else {
						toSend += "#L" + i + "#第 " + i + ": " + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l" + "\r\n";
					}
				}
				cm.sendSimple(toSend);
			} else if (selection == 2) {
				if (cm.getSquadState(MapleSquadType.HORNTAIL) == 1) {
					cm.setSquadState(MapleSquadType.HORNTAIL, 2);
					cm.sendOk("Registrations have been closed, please talk to me again to start the fight or to re-open them.");
				} else {
					cm.setSquadState(MapleSquadType.HORNTAIL, 1);
					cm.sendOk("Registrations have been opened, please talk to me again to start the fight or to close them.");
				}
				cm.dispose();
				return;
			} else if (selection == 3) {
				if (cm.numSquadMembers(MapleSquadType.HORNTAIL) < 5) {
					cm.sendOk("You need to rethink your strategy. You'll need at least 5 warriors to begin the fight against the mighty Horntail!");
					cm.dispose();
					return;
				} else {
					cm.sendOk("I wish you the best of luck on defeating Horntail.");
					status = 29;
				}
			} else if (selection == 4) {
				if (cm.checkSquadLeader(MapleSquadType.HORNTAIL)) {
					cm.removeMapleSquad(MapleSquadType.HORNTAIL);
				} else {
					cm.dispose();
					return;
				}
			}
		} else if (status == 21) {
			if (selection > 0) {
				cm.removeSquadMember(MapleSquadType.HORNTAIL, selection - 1, true);
				cm.sendOk("The selected member has been banned.");	
				cm.dispose();
				return;
			} else {
				if (cm.getSquadState(MapleSquadType.HORNTAIL) == 1) {
					cm.sendSimple("What would you like to do?\r\n#L1#View the squad members#l\r\n#L2#Close registrations#l\r\n#L3#Start the fight#l");
				} else {
					cm.sendSimple("What would you like to do?\r\n#L1#View the squad members#l\r\n#L2#Open registrations#l\r\n#L3#Start the fight#l");
				}	
				status = 19;
			}
		} else if (status == 30) {
			cm.setSquadState(MapleSquadType.HORNTAIL, 3);
			cm.warpSquadMembers(MapleSquadType.HORNTAIL, 240060000);
			cm.setSquadBossLog(MapleSquadType.HORNTAIL, 'HORNTAIL');
			cm.dispose();
			return;
		}
	}
}