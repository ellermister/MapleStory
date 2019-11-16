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
/* Denma the Owner
	Henesys VIP Eye Change.
*/
var status = 0;
var beauty = 0;
var price = 1000000;
var mface = Array(20024,20029,20030,20031,20032,20033,20035,20036,20037,20038,20040,20043,20044,20045,20046,20047,20048,20049,20050,20051,20052,20053,20054,20055,20056,20057,20058,20059,20060,20061,20062,20063,20064,20065,20066,20067,20068,20069,20070,20074,20075,20076,20077,20080,20081,20082,20083,20084,20085,20086,20087,20088,20090,20093,20094,20095,20096,20097,20098,20099,23000,23001,23002,23003,23004,23005,23006,23008,23010,23011,23012,23013,23014,23015,23016,23017,23018,23019,23020,23021,23023,23024,23025,23026,23027,23028,23029,23030,23031,23032,23033,23034,23035,23038,23039,23040,23041,23042,23043,23044,23053,23056,23057,23058,23059,23060,23064,23076,20405);
var fface = Array(21028,21029,21030,21031,21033,21034,21035,21036,21038,21041,21042,21043,21044,21045,21046,21047,21048,21049,21050,21052,21053,21054,21055,21056,21057,21058,21059,21060,21061,21062,21063,21064,21065,21069,21070,21071,21072,21073,21074,21075,21077,21078,21079,21080,21081,21082,21083,21084,21085,21086,21089,21090,21091,21092,21093,21094,21095,21096,21097,21098,21099,24001,24002,24003,24004,24007,24008,24009,24010,24011,24012,24013,24014,24015,24016,24018,24019,24020,24021,24022,24023,24024,24025,24026,24027,24028,24029,24031,24032,24035,24036,24037,24038,24039,24040,24041,24050,24053,24054,24055,24056,24057,24058,24059,24061);
var facenew = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("我是黛玛院长. 如果你有 #b#t5152001##k 任何机会，那么怎么样让我帮整形? \r\n\#L2#使用 #b#t5152001##k");
        } else if (status == 1) {
            if (selection == 1) {
                if(cm.getMeso() >= price) {
                    cm.gainMeso(-price);
                    cm.gainItem(5152001, 1);
                    cm.sendOk("Enjoy!");
                } else
                    cm.sendOk("You don't have enough mesos to buy a coupon!");
                cm.dispose();
            } else if (selection == 2) {
                facenew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mface.length; i++)
                        facenew.push(mface[i] + cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fface.length; i++)
                        facenew.push(fface[i] + cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100));
                }
                cm.sendStyle("让我看看选择一个想要的..", 5152001, facenew);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (cm.haveItem(5152001) == true){
                cm.gainItem(5152001, -1);
                cm.setFace(facenew[selection]);
                cm.sendOk("享受!!");
            } else
                cm.sendOk("您貌似没有#b#t5152001##k..");
        }
    }
}
