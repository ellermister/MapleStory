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

function enter(pi) {
	if (!pi.getPortal().hasSpawned() && pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(240060000).getCharacters().size() <= 0) {
		var rightHead = net.sf.odinms.server.life.MapleLifeFactory.getMonster(8810025);
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(rightHead, new java.awt.Point(-350,220));
		pi.mapMessage("The cave shakes as Horntail's right head emerges from the darkness!");
		pi.getPortal().setSpawned(true);
		pi.schedulePortalSpawn(pi.getPlayer().getMap(), "next00", true, 10000);
		pi.createMapMonitor(pi.getPlayer().getMap().getId(), true, pi.getPlayer().getMap().getId(), "mob00", 0, -1);
		return false;
	}
	return false;
}