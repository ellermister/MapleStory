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
        
        @author TheRamon
*/

importPackage(net.sf.odinms.client);

var setupTask;

function init() {
	hpInterval();
}

function hpInterval() {
	var cal = java.util.Calendar.getInstance();
	cal.set(java.util.Calendar.SECOND, 5);
	var nextTime = cal.getTimeInMillis();
	while (nextTime <= java.lang.System.currentTimeMillis()) {
		nextTime += 5000;
	}
	setupTask = em.scheduleAtTimestamp("decrease", nextTime);
}

function cancelSchedule() {
	setupTask.cancel(true);
}

function decrease() {
	hpInterval();
	var iter = em.getChannelServer().getPlayerStorage().getAllCharacters().iterator();
	while (iter.hasNext()) {
		var pl = iter.next();
		if (pl.getHp() > 0 && !pl.inCS() && pl.getMap().getHPdecrease() > 0) {
			pl.setHp(pl.getHp()-pl.getMap().getHPdecrease());
			pl.updateSingleStat(MapleStat.HP, pl.getHp());
		}
	}
}