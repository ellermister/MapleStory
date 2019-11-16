/************************************************************************
/
/	Author: 		xQuasar
/	NPC Name: 		Sera
/	Map(s): 		Maple Road : Entrance - Mushroom Town Training Camp (0),
/				Maple Road: Upper level of the Training Camp (1), 
/				Maple Road : Entrance - Mushroom Town Training Camp (3).
/	Description: 	First NPC you ever see
/	
************************************************************************/

importPackage(net.sf.odinms.client);

var status;
var map;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (cm.getChar().getMapId() == 0 || cm.getChar().getMapId() == 3) {
			if (mode == 0 && status != 3) {
				status -= 2;
			}
			if (status == -1) {
				status = 0;
				cm.sendNext("Hey #b#h ##k, welcome to #rDestinyMS#k! I see you're new here. I guess I'll have to explain a few basics of this server, then.");
			} else if (status == 0) {
				status = 1;
				var GMList = cm.getGMList();
				cm.sendNext("If you need any help, whisper a GameMaster of #rDestinyMS#k and they'll do their best to help you out. If you want a list of GameMasters, use the player command '@gmlist'. For now, here's a quick list:\r\n\r\n#r" + GMList + ".#k");
			} else if (status == 1) {
				status = 2;
				cm.sendNextPrev("Use @help to see all of #rDestinyMS#k's player commands.");
			} else if (status == 2) {
				status = 3;
				cm.sendNextPrev("There's also an achievement system, in which you can... do stuff which will give a message broadcasted to the entire server, and some NX Cash. What are the achievements? Find out for yourself.");
			} else if (status == 3) {
				status = 4;
				cm.sendSimple("Alright, I think that's about it for now. Where would you like to go?\r\n#b#L0#Training Camp#l\r\n#L1#Snail Hunting Ground I#l\r\n#L2#Lith Harbour#l#k");
			} else if (status == 4) {
				if (selection == 0) {
					map = 1;
					status = 5;
					cm.sendOk("Alright, in you go. Here's a free stat reset, and some cash to start you off. Have fun playing DestinyMS!\r\n\r\n#bStat Reset#k #fUI/UIWindow.img/QuestIcon/5/0#\r\n\r\n#b25,000#k #fUI/UIWindow.img/QuestIcon/7/0#");
				} else if (selection == 1) {
					map = 40000;
					status = 5;
					cm.sendOk("Alright. Here's a free stat reset, and some cash to start you off. Have fun playing DestinyMS!\r\n\r\n#bStat Reset#k #fUI/UIWindow.img/QuestIcon/5/0#\r\n\r\n#b25,000#k #fUI/UIWindow.img/QuestIcon/7/0#");
				} else if (selection == 2) {
					map = 104000000;
					status = 5;
					cm.sendOk("Alright. Here's a free stat reset, and some cash to start you off. Have fun playing DestinyMS!\r\n\r\n#bStat Reset#k #fUI/UIWindow.img/QuestIcon/5/0#\r\n\r\n#b25,000#k #fUI/UIWindow.img/QuestIcon/7/0#");
				} else {
					cm.dispose();
				}
			} else if (status == 5) {
				var statup = new java.util.ArrayList();
				var p = cm.getPlayer();
				var totAp = p.getRemainingAp() + p.getStr() + p.getDex() + p.getInt() + p.getLuk();		
				p.setStr(4);
				p.setDex(4);
				p.setInt(4);
				p.setLuk(4);
				p.setRemainingAp (totAp - 16);
				statup.add(new net.sf.odinms.tools.Pair(MapleStat.STR, java.lang.Integer.valueOf(4)));
				statup.add(new net.sf.odinms.tools.Pair(MapleStat.DEX, java.lang.Integer.valueOf(4)));
				statup.add(new net.sf.odinms.tools.Pair(MapleStat.LUK, java.lang.Integer.valueOf(4)));
				statup.add(new net.sf.odinms.tools.Pair(MapleStat.INT, java.lang.Integer.valueOf(4)));
				statup.add(new net.sf.odinms.tools.Pair(MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(p.getRemainingAp())));
				cm.getC().getSession().write (net.sf.odinms.tools.MaplePacketCreator.updatePlayerStats(statup));
				cm.warp(map, 0);
				cm.gainMeso(25000);
				cm.dispose();				
			}
		} else {
			if (mode == 1)
				status++;
			else
				status--;
			if (status == 0) {
				cm.sendNext("This is the image room where your first training program begins. In this room, you will have an advance look into the job of your choice.");
			} else if (status == 1) {
				cm.sendPrev("Once you train hard enough, you will be entitled to occupy a job. You can become a Bowman in Henesys, a Magician in Ellinia, a Warrior in Perion, or a Thief in Kerning City...");
			} else if (status == 2) {
				cm.dispose();
			}
		}
	}
}