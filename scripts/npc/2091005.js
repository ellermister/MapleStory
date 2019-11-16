importPackage(net.sf.cherry.server.maps);

var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);
var belt_points = Array(200, 1800, 4000, 9200, 17000);

var status = -1;
var selectedMenu = -1;

function start() {
    if (isRestingSpot(cm.getPlayer().getMap().getId())) {
        cm.sendSimple("我很惊讶你能走到这里！但是，从这里开始,下面的会更难。你还想要挑战?\r\n\r\n#b#L0#进入下一关挑战#l\r\n#L1#我想离开#l\r\n#L2#我想在这里做个记录,下一次挑战将从这里开始#l");
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
    if (mode == -1) {
        cm.dispose();
    } else if (cm.getPlayer().getMap().getId() == 925020001) {
        if (mode >= 0) {
            if (status == -1)
                selectedMenu = selection;
            status++; //there is no prev.
            if (selectedMenu == 0) { //I want to challenge him alone.
                if (!cm.getPlayer().hasEntered("dojang_Msg") && !cm.getPlayer().getFinishedDojoTutorial()) { //kind of hackish...
                    if (status == 0) {
                        cm.sendYesNo("就是你！就是你！！你应该是外地人吧…我们师傅可不是闲闲没事的人！默默无名的人是不能见面的。以现在你的程序由我来对付已绰绰有余了。只要打败我就给你挑战师傅的机会！如何？如果可以预测的结果是…");
                    } else if (status == 1) {
                        if (mode == 0) {
                            cm.sendNext("像你这种一拳就被击倒的家伙也敢挑战我们？回去过你的生活吧！");
                        } else {
                            for (var i = 0 ; i < 39; i++) { //only 32 stages, but 38 maps
                                if(cm.getC().getChannelServer().getMapFactory().getMap(925020000 + 100 * i).getCharacters().size() > 0) {
                                    cm.sendOk("有人已经在道场挑战，请更换频道挑战！");
                                    cm.dispose();
                                    return;
                                }
                            }
                            cm.warp(925020010, 0);
                            cm.getPlayer().setFinishedDojoTutorial();
                        }
                        cm.dispose();
                    }
                } else if (cm.getPlayer().getDojoStage() > 0) {
                    if (status == 0) {
                        cm.sendYesNo("您在上一次挑战中,保存了一个记录点。我能把你带到那里。你现在就要去吗?");
                    } else {
                        cm.warp(mode == 1 ? cm.getPlayer().getDojoStage() : 925020100, 0);
                        cm.getPlayer().setDojoStage(0);
                        cm.dispose();
                    }
                } else {
                    cm.getC().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getC().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warp(925020100, 0);
                    cm.dispose();
                }
            } else if (selectedMenu == 1) { //I want to challenge him with a party.
                var party = cm.getPlayer().getParty();
                if (party == null || party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendNext("你不是队长。请你们队长来说话吧！");
                    cm.dispose();
                } else if (party.getMembers().size() == 1) {
                    cm.sendNext("自己要以组队的模式挑战吗？");
                } else {
                    cm.getC().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getC().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warpParty(925020100);
                    cm.dispose();
                }
                cm.dispose();
            } else if (selectedMenu == 2) { //I want to receive a belt.
                if (mode < 1) {
                    cm.dispose();
                    return;
                }
                if (status == 0) {
                    var selStr = "你的修炼点数为 #b" + cm.getPlayer().getDojoPoints() + "#k 师傅喜欢有才能的人。当获得一定的修炼点数。就可以根据修炼点数来获取腰带。\r\n";
                    for (var i = 0; i < belts.length; i++)
                        selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#l";
                    cm.sendSimple(selStr);
                } else if (status == 1) {
                    var belt = belts[selection];
                    var level = belt_level[selection];
                    var points = belt_points[selection];
                    if (cm.getPlayer().getDojoPoints() > points) {
                        if (cm.getPlayer().getLevel() > level)
                            if (cm.haveItem(belt) && !cm.haveItem(1132004)) {
                                cm.sendNext("你已经有这种腰带了。请重置您的积分后再挑战换取！");
                            } else {
                                cm.gainItem(belt, 1);
                                cm.sendOk("换取成功!");
                            }
                        else
                            cm.sendNext("想要获取 #i" + belt + "# #b#t" + belt + "##k, 您的等级必须达到 #b" + level + "#k 级, 并且你需要得到道场积分 #b" + points + " 点#k.\r\n\r\n如果你想换到此腰带,您还需要道场积分 #r" + points + "#k 点.");
                    } else
                        cm.sendNext("为了得到 #i" + belt + "# #b#t" + belt + "##k, 你的等级必须达到 #b" + level + "#k a级, 并且你需要得到道场积分 #b" + points + " 点 #k.\r\n\r\n如果你想换到此腰带,您还需要道场积分 #r" + points + "#k 点.");
                    cm.dispose();
                }
            } else if (selectedMenu == 3) { //I want to reset my training points.
                if (status == 0) {
                    cm.sendYesNo("训练分数若初始化则会变为0分喔。相信你已应该明白？点数未必不好。训练分数若初始化时之前的记录会删除。点还会拥有腰带。请问把训练分数要初始化吗？");
                } else if (status == 1) {
                    if (mode == 0) {
                        cm.sendNext("你忘记你来这里的目的了吗？");
                    } else {
                        cm.getPlayer().setDojoPoints(0);
                        cm.sendNext("操作成功，训练分数已经成功初始化。那么开始新的训练吧！");
                    }
                    cm.dispose();
                }
            } else if (selectedMenu == 4) { //I want to receive a medal.
                if (status == 0) {
                    cm.sendYesNo("You haven't attempted the medal yet? If you defeat one type of monster in Mu Lung Dojo #b100 times#k you can receive a title called #bxx Vanquisher#k. It looks like you haven't even earned the #b#t1142033##k... Do you want to try out for the #b#t1142033##k?");
                } else if (status == 1) {
                    if (mode == 0) {
                        cm.sendNext("If you don't want to, that's fine.");
                        cm.dispose();
                    } else {
                        if (cm.c.getPlayer().getDojoStage() > 37) {
                            cm.sendNext("You have complete all medals challenges.");
                        } else if (cm.getPlayer().getVanquisherKills() < 100)
                            cm.sendNext("You still need #b" + (100 - getVanquisherStage()) + "#k in order to obtain the #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k. Please try a little harder. As a reminder, only the mosnters that have been summoned by our Master in Mu Lung Dojo are considered. Oh, and make sure you're not hunting the monsters and exiting!#r If you don't go to the next level after defeating the monster, it doesn't count as a win#k.");
                        else {
                            cm.sendNext("You have obtained #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k.");
                            cm.gainItem(1142033 + cm.getPlayer().getVanquisherStage(), 1);
                            cm.getPlayer().setVanquisherStage(cm.c.getPlayer().getVanquisherStage() + 1);
                            cm.getPlayer().setVanquisherKills(0);
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
                cm.sendAcceptDecline("知难而退了吧!是不是真的想离开了呢?");
            } else {
                if (mode == 1) {
                    cm.warp(925020000);
                } else {//probably insult the user
					
                }
                cm.dispose();
            }
        } else if (selectedMenu == 2) { //I want to record my score up to this point
            if (status == 0) {
                cm.sendYesNo("如果你在这里做个记录，你下次来挑战可以从这里开始。这不是很方便吗？你想记录你目前位置吗?");
            } else {
                if (mode == 0) {
                    cm.sendNext("你以为你可以去到更高的地方吗？祝好运!");
                } else {
                    cm.sendNext("我已把你的位置做了记录。下一次你来挑战的时候，你就可以从这里开始.");
                    cm.getPlayer().setDojoStage(cm.getPlayer().getMap().getId());
                }
                cm.dispose();
            }
        }
    } else {
        if (mode < 1) {
            cm.sendNext("停止你的想法吧！不久之后，你后悔的，恳求让你回去.");
        } else {
            cm.warp(925020001, 0);
        }
        cm.dispose();
    }
}

function isRestingSpot(id) {
    return (id / 100 - 9250200) % 6 == 0;
}
