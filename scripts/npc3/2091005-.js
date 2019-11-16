importPackage(net.sf.odinms.server.maps);

var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);
var belt_points = Array(200, 1800, 4000, 9200, 17000);

var status = -1;
var selectedMenu = -1;

function start() {
	if (isRestingSpot(cm.getPlayer().getMap().getId())) {
		cm.sendSimple("I'm surprised you made it this far! But it won't be easy from here on out. You still want the challenge?\r\n\r\n#b#L0#I want to continue#l\r\n#L1#I want to leave#l\r\n#L2#I want to record my score up to this points#l");
	} else if (cm.getPlayer().getLevel() >= 25) {
		if (cm.getPlayer().getMap().getId() == 925020001) {
			cm.sendSimple("师傅是这里的第一强者。像你这种家伙也敢挑战？你会后悔的！\r\n#b#L0#个人挑战#l\r\n#L1#团队挑战#l\r\n#L2#换取腰带#l\r\n#L3#想初始化修炼点数#l\r\n#L5#武陵道场是什么？#l");
		} else {
			cm.sendYesNo("什么？你要放弃？真可惜，退出的话就要重新开始了。是否真的放弃并退出？");
		}
	} else {
		cm.sendOk("什么？你以为你是谁？你嘲笑我的主人？这简直是一个笑话！你至少需要 #b25#k 级才可以挑战。");
		cm.dispose();
	}
}

function action(mode, type, selection) {
	if (cm.getPlayer().getMap().getId() == 925020001) {
		if (mode >= 0) {
			if (status == -1)
				selectedMenu = selection;
			status++;
			
			if (selectedMenu == 0) {
				if (cm.getPlayer().getMojoTime() == 0) {
					if (status == 0) {
						cm.sendYesNo("就是你！就是你！！你应该是外地人吧…我们师傅可不是闲闲没事的人！默默无名的人是不能见面的。以现在你的程序由我来对付已绰绰有余了。只要打败我就给你挑战师傅的机会！如何？如果可以预测的结果是…");
					} else if (status == 1) {
						if (mode == 0) {
							cm.sendNext("像你这种一拳就被击倒的家伙也敢挑战我们？回去过你的生活吧！");
						} else {
							cm.warp(925020010, 0);
						}
						cm.dispose();
					}
				} else {
					cm.getC().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
					cm.getC().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters(false);
					cm.warp(925020100, 0);
					cm.dispose();
				}
			} else if (selectedMenu == 1) {
				var party = cm.getPlayer().getParty();
				if (party == null || party.getLeader().getId() != cm.getPlayer().getId()) {
					cm.sendNext("你不是队长。请你们队长来说话吧！");
					cm.dispose();
				} else if (party.getMembers().size() == 1) {
					cm.sendNext("自己要以组队的模式挑战吗？");
				} else {
					warpParty(925020100);
				}
				cm.dispose();
			} else if (selectedMenu == 2) {
				if (status == 0) {
					var selStr = "你的修炼点数为 #b" + cm.getPlayer().getMojoPoints() + "。#k师傅喜欢有才能的人。当获得一定的修炼点数。就可以根据修炼点数来获取腰带。\r\n";
					for (var i = 0; i < belts.length; i++)
						selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#";
					cm.sendSimple(selStr);
				} else if (status == 1) {
					var belt = belts[selection];
					var level = belt_level[selection];
					var points = belt_points[selection];
					if(cm.getPlayer().getMojoPoints() >= points){
						cm.getPlayer().addMojoPoints(-points);
						cm.gainItem(belt , 1);
						cm.sendOk("换取腰带成功！已经从你的修炼点数中扣除 " + points +" 点。");
					} else {
						cm.sendOk("目前你没有足够的修炼点数获取这一腰带！");
					}
					cm.dispose();
				}
			} else if (selectedMenu == 3) {
				if (status == 0) {
					cm.sendYesNo("训练分数若初始化则会变为0分喔。相信你已应该明白？点数未必不好。训练分数若初始化时之前的记录会删除。点还会拥有腰带。请问把训练分数要初始化吗？");
				} else if (status == 1) {
					if (mode == 0) {
						cm.sendNext("你忘记你来这里的目的了吗？");
					} else {
						var total = cm.getPlayer().getMojoPoints();
						cm.getPlayer().addMojoPoints(-total);
						cm.sendNext("操作成功，训练分数已经成功初始化。那么开始新的训练吧！");
					}
					cm.dispose();
				}
			} else if (selectedMenu == 4) {
				if (status == 0) {
					cm.sendYesNo("You haven't attempted the medal yet? If you finish this pq 100 times then you can receive this medal called #b Vanquisher#k. It looks like you haven't even earned the #b#t1142033##k... Do you want to try out for the #b#t1142033##k?");
				} else if (status == 1) {
					if (mode == 0) {
						cm.sendNext("If you don't want to, that's fine.");
						cm.dispose();
					} else {
						if(cm.getPlayer().getMojoCompleted() >= 100){
							cm.gainItem(1142033,1);
							cm.getPlayer().addMojoCompleted(-100);
							cm.sendOk("Thanks for completing this pq over 100 times. Now you have received a special medal as a gift from us!");
							cm.dispose();
						}else{
							cm.sendOk("Sorry but you havent completed this pq enough times to receive the medal!");
							cm.dispose();
						}
					}
					cm.dispose();
				}
			} else if (selectedMenu == 5) { //What is a Mu Lung Dojo?
				cm.sendNext("我的师傅在武陵是最强的一位。因此武陵印章只有在此这个地方才能制造出来。武陵具有约38楼之高的建筑。若慢慢的往上同时也会提升训练指数。当然以你的实力去爬完是有些困难。");
				cm.dispose();
			}
		} else
			cm.dispose();
	} else if (isRestingSpot(cm.getPlayer().getMap().getId())) {
		if (selectedMenu == -1)
			selectedMenu = selection;
		status++;
		
		if (selectedMenu == 0) {
			cm.warp(cm.getPlayer().getMap().getId() + 100, 0);
			cm.dispose();
		} else if (selectedMenu == 1) { //I want to leave
			if (status == 0) {
				cm.sendAcceptDecline("So, you're giving up? You're really going to leave?");
			} else {
				if (mode == 0) {
					//warp them out?
				} else {
					//what.
				}
				cm.dispose();
			}
		} else if (selectedMenu == 2) { //I want to record my score up to this point
			if (status == 0) {
				cm.sendYesNo("If you record your score, you can start where you left off the next time. Isn't that convenient? Do you want to record your current score?");
			} else {
				if (mode == 0) {
					cm.sendNext("You think you can go even higher? Good luck!");
				} else {
					cm.sendNext("I recorded your score. If you tell me the next time you go up, you'll be able to start where you left off.");
					//cm.getPlayer().recordDojoScore(stage);
				}
				cm.dispose();
			}
		}
	} else {
		if (mode <= 0) {
			cm.sendNext("Stop changing your mind! Soon, you'll be crying, begging me to go back.");
		} else {
			cm.warp(925020001, 0);
		}
		cm.dispose();
	}
}

function isRestingSpot(id) {
    var shortid = id / 100;

    switch (shortid) {
	case 9250206:
	case 9250212:
	case 9250218:
	case 9250224:
	case 9250230:
	case 9250236:
	    return true;
    }
    return false;
}