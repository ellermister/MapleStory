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

/* Mino the Owner
	Orbis VIP Hair/Hair Color Change (VIP).
*/
var status = 0;
var beauty = 0;
var mhair = Array(30000, 30020, 30030, 30230, 30240, 30260, 30270, 30280, 30290, 30340, 30420, 30460, 30490, 30480, 30520, 30760, 30680);
var fhair = Array(31710, 31670, 31220, 31260, 31270, 31250, 31040, 31030, 31230, 31650, 31240, 31630, 31110, 31320, 31000, 31530);
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
			cm.sendSimple("您好！我是美发店的院长#p2010001#！如果你有 #b#t5150005##k 或 #b#t5151005##k，就放心把头发交给我处理吧。怎么样？你想做什么？请选择吧。\r\n#L1#换发型：使用 #b#t5150005##l#k\r\n#L2#染头发：使用 #b#t5151005##l#k");						
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
				cm.sendStyle("我们可以为你改变发型。你是不是已经厌倦了现在的发型？如果你有#b#t5150005##k，我们就可以给你换新的发型。慢慢挑选你喜欢的发型吧！", hairnew, 5150005);
			} else if (selection == 2) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("我们可以为你改变头发的颜色。你是不是已经厌倦了现在的颜色？如果你有#b#t5151005##k，我们就可以给你染发。慢慢挑选你喜欢的颜色吧！", haircolor, 5151005);
			}
		} else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if (cm.haveItem(5150005) == true){
					cm.gainItem(5150005, -1);
					cm.setHair(hairnew[selection]);
					cm.sendOk("享受你的新发型吧!");
				} else if(cm.isCash() && cm.getPlayer().getCSPoints(1)>=980){
					cm.getPlayer().modifyCSPoints(1,-980);
					cm.setHair(hairnew[selection]);
					cm.sendOk("享受你的新发型吧!");
				} else {
					cm.sendOk("嗯… 看来你没有我们美发店的会员卡嘛！不好意思，如果没有会员卡，我们不可以给你修剪头发。");
						
				}
			}
			if (beauty == 2){
				if (cm.haveItem(5151005) == true){
					cm.gainItem(5151005, -1);
					cm.setHair(hairnew[selection]);
					cm.sendOk("享受你的新的头发颜色吧!");
				} else if(cm.isCash() && cm.getPlayer().getCSPoints(1)>=980){
					cm.getPlayer().modifyCSPoints(1,-980);
					cm.setHair(hairnew[selection]);
					cm.sendOk("享受你的新的头发颜色吧!");
				} else {
					cm.sendOk("嗯… 看来你没有我们美发店的会员卡嘛！不好意思，如果没有会员卡，我们不可以给你染头发。");
						
				}
			}
			cm.getPlayer().UpdateCash();
			cm.dispose();
		}
	}
}