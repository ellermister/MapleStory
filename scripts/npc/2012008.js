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

/* Romi
	Orbis Skin Change.
*/
var status = 0;
var skin = Array(0, 1, 2, 3, 4, 9, 10, 11);

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
			cm.sendSimple("欢迎光临！欢迎来到我们天空之城护肤中心。你是不是希望拥有像我一样健康、美丽的肌肤呢？如果你有 #b#t5153001##k，我们可以为你精心护理肌肤。请相信我们的能力，怎么样要不要试一试？\r\n\#L2##b改变肤色#k(使用#b天空之城护肤会员卡#k)#l");
		} else if (status == 1) {
			if (selection == 1) {
				cm.dispose();
			} else if (selection == 2) {
				cm.sendStyle("用我们特殊开发的机器可查看护肤后的效果噢，想换成什么样的皮肤呢？请选择～~", skin, 5153001);
			}
		} else if (status == 2){
			cm.dispose();
			if (cm.isCash()) {
                            if (cm.getPlayer().getCSPoints(1)>=480) {
                                  cm.getPlayer().modifyCSPoints(1,-480);
				  cm.setSkin(skin[selection]);
				  cm.sendOk("完成了，让朋友们赞叹你的新肤色吧！");
			    } else {
				  cm.sendOk("看起来你并没有我们的会员卡，我恐怕不能给你护肤，我很抱歉。请你先购买吧！");
			    }
                        } else if (cm.haveItem(5153001) == true) {
				cm.gainItem(5153001, -1);
				cm.setSkin(skin[selection]);
				cm.sendOk("完成了,让朋友们赞叹你的新肤色吧!");
			} else {
				cm.sendOk("看起来你并没有我们的会员卡，我恐怕不能给你护肤，我很抱歉。请你先购买吧！");
			}
		}
	}
}