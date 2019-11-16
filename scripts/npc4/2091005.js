/*
	Map : 武林道场
	Npc : 萧公
        Desc : Training Center Start
 */

var status = -1;
var sel;
var mapid;
var belts = Array(1132000, 1132112, 1132113, 1132114, 1132115, 1082394);
var belt_level = Array(25, 70, 90, 120, 120, 120);
var belt_points = Array(200, 1800, 3000, 6000, 10000, 10000);

function start() {
    mapid = cm.getMapId();
    if (mapid == 925020001) {
        cm.sendSimple("师父是这里的第一强者。像你这种家伙也敢挑战？你会后悔的！ \r #b#L0# 个人挑战#l \n\r #L1# 团队挑战#l \n\r #L2# 换取修炼点数奖励#l \n\r #L3# 想初始化修练点数#l \n\r #L5# 武陵道场是什么？#l");
    } else if (isRestingSpot(mapid)) {
        cm.sendSimple("我很惊讶地知道，你已经安全地达到这个水平。我可以保证，但是，它不会得到任何更容易。你觉得怎么样？你想继续走吗？#b \n\r #L0# 是的，我将继续走下去。#l \n\r #L1# 我想出来#l \n\r #L2# 我想把我的进步记录在案。#l");
    } else {
        cm.sendYesNo("What? You're ready to quit already? You just need to move on to the next level. Are you sure you want to quit?");
    }
}

function action(mode, type, selection) {
    if (mapid == 925020001) {
        if (mode == 1) {
            status++;
        } else {
            cm.dispose();
            return;
        }
        if (status == 0) {
            sel = selection;
            if (sel == 5) {
                cm.sendNext("我的师父在武陵是最强的一位。因此武陵印章只有在此这个地方才能制作出来。武陵具有约38楼之高的建筑。若慢慢的往上同时也会提升训练指数。当然以你的实力去爬完是有些困难。");
                cm.dispose();
            } else if (sel == 3) {
                cm.sendYesNo("训练分数若初始化则会变为0分喔 。相信你已应该明白？但是未必不好。 训练分数若初始化时 之前的记录会删除。但还会拥有腰带。请问把训练分数要初始化吗？");
            } else if (sel == 2) {
                var selStr = "你的修练点数为 #b" + cm.getDojoPoints() + "#k 。师父喜欢有才能的人。当获得一定的修炼点数。就可以根据修练点数来获得腰带。\n\r"
                for (var i = 0; i < belts.length; i++) {
                    selStr += "\r\n#L" + i + "##i" + belts[i] + ":# #t" + belts[i] + "#(" + belt_points[i] + ")#l";
                }
                cm.sendSimple(selStr);
            } else if (sel == 1) {
                if (cm.getParty() != null) {
                    if (cm.isLeader()) {
                        cm.sendOk("Would you like to Enter now?");
                    } else {
                        cm.sendOk("Hey, you're not even a leader of your party. What are you doing trying to sneak in? Tell your party leader to talk to me if you want to enter the premise...");
                    }
                }
            } else if (sel == 0) {
                if (cm.getParty() != null) {
                    cm.sendOk("Please leave your party.");
                    cm.dispose();
                }
                var record = cm.getQuestRecord(150000);
                var data = record.getCustomData();

                if (data != null) {
                    var idd = get_restinFieldID(parseInt(data));
                    if (idd != 925020002) {
                        //cm.dojoAgent_NextMap(true, true, idd);
                        cm.dojoAgent_NextMap(true, true);
                        record.setCustomData(null);
                    } else {
                        cm.sendOk("Please try again later.");
                    }
                } else {
                    cm.start_DojoAgent(true, false);
                }
                cm.dispose();
                // cm.sendYesNo("The last time you took the challenge yourself, you were able to reach Floor #18. I can take you straight to that floor, if you want. Are you interested?");
            }
        } else if (status == 1) {
            if (sel == 3) {
                cm.setDojoRecord(true);
                cm.sendOk("I have resetted your training points to 0.");
                cm.dispose();
            } else if (sel == 2) {
                var belt = belts[selection];
                var level = belt_level[selection];
                var points = belt_points[selection];
                if (cm.getDojoPoints() >= points) {
                    if (cm.getPlayerStat("LVL") >= level) {
                        if (cm.canHold(belt)) {
							cm.getPlayer().setDojo(cm.getDojoPoints()-points);
                            cm.gainItem(belt, 1);
                            cm.setDojoRecord(false);
                        } else {
                            cm.sendOk("背包空间不足.");
                        }
                    } else {
                        cm.sendOk("#b#i" + belt + "# #t" + belt + "##k时 #b" + level + "#k and you need to have earned at least #b" + points + " training points#k.\r\n\r\nIf you want to obtain this belt, you need #r" + (cm.getDojoPoints() - points) + "#k more training points.");
                    }
                } else {
                    cm.sendOk("#b#i" + belt + "# #t" + belt + "##k时#b" + level + "等级一定要#k以上.需要#K累计修炼 #b" + points + " 点数。\r\n\r\n你想要获得这腰带的话还需要更多 #r" + (cm.getDojoPoints() - points) + "#k 修练点数。");
                }
                cm.dispose();
            } else if (sel == 1) {
                cm.start_DojoAgent(true, true);
                cm.dispose();
            }
        }
    } else if (isRestingSpot(mapid)) {
        if (mode == 1) {
            status++;
        } else {
            cm.dispose();
            return;
        }
        if (status == 0) {
            sel = selection;
            if (sel == 0) {
                if (cm.getParty() == null || cm.isLeader()) {
                    cm.dojoAgent_NextMap(true, true);
                } else {
                    cm.sendOk("Only the leader may go on.");
                }
                //cm.getQuestRecord(150000).setCustomData(null);
                cm.dispose();
            } else if (sel == 1) {
                cm.askAcceptDecline("Do you want to quit? You really want to leave here?");
            } else if (sel == 2) {
                if (cm.getParty() == null) {
                    var stage = get_stageId(cm.getMapId());

                    cm.getQuestRecord(150000).setCustomData(stage);
                    cm.sendOk("I have just recorded your progress. The next time you get here, I'll sent you directly to this level.");
                    cm.dispose();
                } else {
                    cm.sendOk("Hey.. you can't record your progress with a team...");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (sel == 1) {
                if (cm.isLeader()) {
                    cm.warpParty(925020002);
                } else {
                    cm.warp(925020002);
                }
            }
            cm.dispose();
        }
    } else {
        if (mode == 1) {
            if (cm.isLeader()) {
                cm.warpParty(925020002);
            } else {
                cm.warp(925020002);
            }
        }
        cm.dispose();
    }
}

function get_restinFieldID(id) {
    var idd = 925020002;
    switch (id) {
    case 1:
        idd = 925020600;
        break;
    case 2:
        idd = 925021200;
        break;
    case 3:
        idd = 925021800;
        break;
    case 4:
        idd = 925022400;
        break;
    case 5:
        idd = 925023000;
        break;
    case 6:
        idd = 925023600;
        break;
    }
    for (var i = 0; i < 10; i++) {
        var canenterr = true;
        for (var x = 1; x < 39; x++) {
            var map = cm.getMap(925020000 + 100 * x + i);
            if (map.getCharactersSize() > 0) {
                canenterr = false;
                break;
            }
        }
        if (canenterr) {
            idd += i;
            break;
        }
    }
    return idd;
}

function get_stageId(mapid) {
    if (mapid >= 925020600 && mapid <= 925020614) {
        return 1;
    } else if (mapid >= 925021200 && mapid <= 925021214) {
        return 2;
    } else if (mapid >= 925021800 && mapid <= 925021814) {
        return 3;
    } else if (mapid >= 925022400 && mapid <= 925022414) {
        return 4;
    } else if (mapid >= 925023000 && mapid <= 925023014) {
        return 5;
    } else if (mapid >= 925023600 && mapid <= 925023614) {
        return 6;
    }
    return 0;
}

function isRestingSpot(id) {
    return (get_stageId(id) > 0);
}