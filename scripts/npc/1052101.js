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

/* Andre
	Kerning Random Hair/Hair Color Change (EXP).
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30770, 30780, 30130, 30350, 30190, 30620, 30030, 30110, 30520, 30550, 30180, 30050, 30020, 30040, 30000, 30160);
var fhair = Array(31690, 31760, 31050, 31040, 31000, 31020, 31060, 31090, 31520, 31620, 31130, 31120, 31140, 31330, 31440, 31010);
var hairnew = Array();

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
			cm.sendSimple("你好，我是美发店的助手！如果你有 #b#t5150002##k 或 #b#t5151002##k， 你就放心的把发型交给我，我会让你满意的。那么你要做什么？\r\n#L1#改变发型：使用 #b#t5150002##k\r\n#L2#改变发色：使用 #b#t5151002##k");						
		} else if (status == 1) {
			if (selection == 1) {
				beauty = 1;
				hairnew = Array();
				if (cm.getChar().getGender() == 0) {
					for(var i = 0; i < mhair.length; i++) {
						hairnew.push(mhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				} 
				if (cm.getChar().getGender() == 1) {
					for(var i = 0; i < fhair.length; i++) {
						hairnew.push(fhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				}
				cm.sendYesNo("如果你有 #b#t5150002##k，那么我将帮你随机改变一种发型，你确定要改变发型吗？");
			} else if (selection == 2) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendYesNo("如果你有 #b#t5151002##k 那么我将帮你随机改变一种发色，你确定要改变发色吗？");
			}
		} else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if (cm.haveItem(5150002) == true){
					cm.gainItem(5150002, -1);
					cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
					cm.sendOk("好了，让朋友们赞叹你的新发型吧！");
				} else {
					cm.sendOk("看起来你并没有我们的会员卡，我恐怕不能给你理发，我很抱歉。请你先购买吧！");
				}
			}
			if (beauty == 2){
				if (cm.haveItem(5151002) == true){
					cm.gainItem(5151002, -1);
					cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
					cm.sendOk("好了，让朋友们赞叹你的新发色吧！");
				} else {
					cm.sendOk("看起来你并没有我们的会员卡，我恐怕不能给你理发，我很抱歉。请你先购买吧！");
				}
			}
		}
	}
}
