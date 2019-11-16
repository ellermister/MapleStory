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
var maps = new Array(60000, 221000300);

function start() {
	status = 0;
	cm.sendYesNo("Yo! I'm #p" + cm.getNpc() + "#, lulz! I can warp you lululululu.");
}

function action(mode, type, selection) {
	if (status == 0) {
		status = 1;
		cm.sendNext("#bBe prepared#k ;)))");
	} else if (status == 1) {
		status = 2;
		var warpText = "CHOOOOOSE! BOHAHAHAHAHAH ;))#b";
		for (var i = 0; i < maps.length; i++)
			warpText += "\r\n#L" + i + "##m" + maps[i] + "##l";
		cm.sendSimple(warpText);
	} else if (status == 2) {
		cm.warp(maps[selection], 0);
		cm.dispose();
	}
}	