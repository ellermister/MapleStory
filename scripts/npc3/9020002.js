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

var status = 0;

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
			var mapId = cm.getPlayer().getMapId();
			if (mapId == 103000890) {
				cm.removeAll(4001007);
				cm.removeAll(4001008);
				cm.removeAll(4001129);
				cm.warp(103000000);
				cm.dispose();
			} 
			else {
				var outText;
				if (mapId == 103000805) {
					outText = "队长切记要所有队员到达本地图后在点此NPC出去,否则无法获得积分点";
				} 
				else 
				{
					outText = "打开打退堂鼓了?想回去吗?";
				}
				cm.sendYesNo(outText);
			}
		} else if (status == 1) {
			var eim = cm.getPlayer().getEventInstance(); // Remove them from the PQ!
			if (eim == null) {
				cm.sendOk("aaaaaaaaaaaaa");
				cm.warp(103000890); // Warp player, random spawnpoint
				
			} else if (cm.isLeader()) {
				eim.disbandParty();
				var em = cm.getEventManager("KerningPQ");
				em.setProperty("entryPossible", "true");
			} else {
				eim.leftParty(cm.getPlayer());
			}
			cm.dispose();
		}
	}
}