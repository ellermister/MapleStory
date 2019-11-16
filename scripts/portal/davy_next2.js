/*
	This file is part of the odinms Maple Story Server
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
importPackage(net.sf.odinms.server.maps);
importPackage(net.sf.odinms.net.channel);
importPackage(net.sf.odinms.tools);

/*
@Author Jvlaple
*/

function enter(pi) {
	var nextMap = 925100300;
	var eim = pi.getPlayer().getEventInstance();
	var party = pi.getPlayer().getEventInstance().getPlayers();
	var target = eim.getMapInstance(nextMap);
	var targetPortal = target.getPortal("sp");
	var mobCount = pi.countMonster();
	var reactorCount = pi.countReactor(4);
	var playerStatus = pi.isLeader();
		//Count the monsters...
		if (playerStatus == false) {
			pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, "Only the party leader may proceed."));
			return false;
		}else if (mobCount !=0 || reactorCount < 8) {
			// do nothing; send message to player
			pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, "Kill all Pirates before proceeding."));
			return false;
		}else {
			eim.setProperty("entryTimeStamp", 1000 * 60 * 6);
			for(var g=0; g<party.size(); g++) {
				party.get(g).changeMap(target, targetPortal);
				party.get(g).getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.getClock(360));
			}
			return true;
		}
}
