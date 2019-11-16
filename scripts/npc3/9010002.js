/*
	This file is part of the DestinyMS Maple Story Server
    Copyright (C) 2008 xQuasar

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Mia */
/** Made by xQuasar **/

var status;

function start() {
	status = -1;
	action(1,0,0);
	}
	
function action(mode,type,selection) {
	if (status == -1) {
		cm.sendOk("Hi, I'm Mia. Not warping you everywhere anymore, though... tough luck. Heheh.");
		cm.dispose();
	} else {
		cm.sendOk("Hi, I'm Mia. Not warping you everywhere anymore, though... tough luck. Heheh.");
		cm.dispose();
	}
}