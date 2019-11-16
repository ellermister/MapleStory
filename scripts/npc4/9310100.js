/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
               Matthias Butz <matze@odinms.de>
               Jan Christian Meyer <vimes@odinms.de>

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
/* Edited by: kevintjuh93
    NPC Name:         Jean
    Map(s):         Victoria Road : Lith Harbour (104000000)
    Description:         Event Assistant
*/
var status = 0;
var banMap = Array(109080000, 109080010, 109040000, 109030001, 109060000, 109010000);


function start() {
 
   cm.sendNext("#e#d嗨!我是#b浪漫#d在线活动接引员，我可以把您送到活动地图。");

}


function action(mode, type, selection) {

	for(var i = 0; i < banMap.length; i++) {

	if (cm.getPlayer().getMapId() == banMap[i]){

		cm.sendOk("幹！想要偷跑吃屎去吧！");

		cm.dispose();

		}
	
}
    if (mode == -1) {

        cm.dispose();

    } else {
 
       if (status >= 2 && mode == 0) {

            cm.dispose();
            
return;

        }
        
if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            cm.sendNextPrev("#e#d本次活动即将开始，所以你也要快点赶来哦!");
 
       } else if (status == 2) {
 
           cm.sendSimple("#e牵绊冒险岛在线随机活动..\r\n#L0##e1.#n#d#e 什么是在线活动?#k#l\r\n#L1##e2.#n#d#e 活动内容介绍.#k#l\r\n#L2##e3.#n#r#e 进入活动地图！#k#l");

        } else if (status == 3) {
 
           if (selection == 0) {
 
               cm.sendNext("#e#d在线活动为每日进行，每2小时，开放一次，开放时有公告，玩家可根据公告提示，点击拍卖快捷传送，直接进入到活动地图参与活动，活动项目为6项，随机项目开始。请大家多多参与在线活动,获得丰厚的奖励吧。");

                cm.dispose();

            } else if (selection == 1) {
 
               cm.sendSimple("#d#e在线活动分为6种，以下是活动的项目. #b\r\n#L0# 爬绳子#l\r\n#L1# 终极忍耐#l\r\n#L2# 滚雪球#l\r\n#L3# 打椰子#l\r\n#L6# 打瓶盖#l\r\n#L4# 是非题大考验#l\r\n#L5# 向上爬#l#k");

            } else if (selection == 2) {

				if (!cm.canHold()) {

					cm.sendNext("#d#e請確認是否身上有空位。");

				} else if (cm.getChannelServer().getEvent() > -1) {

					if (cm.haveItem(4031017)) {

						cm.removeAll(4031017);
					}
					cm.saveReturnLocation("EVENT");
	
				cm.getPlayer().setChalkboard(null);

					cm.warp(cm.getChannelServer().getEvent(), cm.getChannelServer().getEvent() == 109080000 || cm.getChannelServer().getEvent() == 109080010 ? 0 : "join00");
				} else {
					cm.sendNext("#d#e现在没有可以参加的活动哦，清关注公告的提示，参加活动哦！在线活动为每2小时开放一次。");
				}
				cm.dispose();

			}

        } else if (status == 4) {
 
           if (selection == 0) {
                cm.sendNext("#b[爬繩子]#k 自己#e#r百度#k!");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendNext("#b[終極忍耐] 自己#e#r百度#k!");
                cm.dispose();
            } else if (selection == 2) {
                cm.sendNext("#b[滾雪球]#k 自己#e#r百度#k!");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendNext("#b[打果子]#k 自己#e#rGoogle#k!");
                cm.dispose();
			} else if (selection == 6) {
                cm.sendNext("#b[打瓶蓋]#k 自己#e#r百度#k!");
                cm.dispose();
            } else if (selection == 4) {
                cm.sendNext("#b[是非題大考驗]#k 自己#e#r百度#k!");
                cm.dispose();
            } else if (selection == 5) {
                cm.sendNext("#b[尋寶]#k 自己#e#r百度#k!");
                cm.dispose();
            }
        }   
    }
}  
