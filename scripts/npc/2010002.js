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

/* Franz the Owner
	Orbis VIP Eye Change.
*/
var status = 0;
var beauty = 0;
var mface = Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20012, 20014);
var fface = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21012, 21014);
var facenew = Array();

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
			cm.sendSimple("嘿~！我是天空之城整容中心院长#p2010002#。如果你有 #b#t5152005##k，我可以为你进行整形手术。\r\n\#L2##b进行整形手术#k(使用#b#t5152005##k)#l");
			} else if (status == 1) {
			if (selection == 1) {
				cm.dispose();
			} else if (selection == 2) {
				facenew = Array();
				if (cm.getChar().getGender() == 0) {
					for(var i = 0; i < mface.length; i++) {
						facenew.push(mface[i] + cm.getChar().getFace() % 1000 - (cm.getChar().getFace() % 100));
					}
				}
				if (cm.getChar().getGender() == 1) {
					for(var i = 0; i < fface.length; i++) {
						facenew.push(fface[i] + cm.getChar().getFace() % 1000 - (cm.getChar().getFace() % 100));
					}
				}
				cm.sendStyle("我可以改变你的脸型，让它比现在看起来漂亮。你为什么不试着改变它下？如果你有#b#t5152005##k我将会帮你改变你的脸型，那么选择一个你想要的新脸型吧！", facenew, 5152005);
			}
		} else if (status == 2){
			cm.dispose();
			if (cm.isCash()) {
                            if (cm.getPlayer().getCSPoints(1)>=980) {
                                  cm.getPlayer().modifyCSPoints(1,-980);
				  cm.setFace(facenew[selection]);
				  cm.sendOk("好了，你的朋友们一定认不出来是你了！");
			    } else {
				  cm.sendOk("看起来你并没有我们的高级会员卡，我恐怕不能给你进行整形手术，我很抱歉。请你先购买吧！");
			    }
                        } else if (cm.haveItem(5152005) == true) {
				cm.gainItem(5152005, -1);
				cm.setFace(facenew[selection]);
				cm.sendOk("好了，你的朋友们一定认不出来是你了！");
			} else {
				cm.sendOk("看起来你并没有我们的高级会员卡，我恐怕不能给你进行整形手术，我很抱歉。请你先购买吧！");
			}
		}
	}
}