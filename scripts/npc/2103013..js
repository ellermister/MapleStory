var status = 0;
var section = 0;
importPackage(java.lang);
//questid 29932, infoquest 7760

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 99) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 1) {
        if (cm.getMapId() >= 926020001 && cm.getMapId() <= 926020004) {
            var itemid = 4001321 + (cm.getMapId() % 10);
            if (!cm.canHold(itemid)) {
                cm.sendOk("Please make room for 1 ETC slot.");
            } else {
                cm.gainItem(itemid, 1);
                cm.warp(cm.getMapId() - 10000, 0);
            }
            cm.dispose();
        } else if (cm.getMapId() >= 926010001 && cm.getMapId() <= 926010004) {
            cm.warp(926010000, 0);
            cm.dispose();
        } else if (cm.getMapId() >= 926010100 && cm.getMapId() <= 926013504) {
            cm.sendYesNo("Would you like to exit this place?");
            status = 99;
        } else {
            cm.sendSimple("My name is Duarte.\r\n#b#e#L1#Enter the Pyramid.#l#n\r\n#L2#Head towards Yeti Pharaoh's Tomb.#l\r\n#L3#Hear a story on Yeti Pharaoh's jewelry.#l\r\n#L4#Receive a medal of <Protector of Pharaoh>.#l#k");
        }
    } else if (status == 2) {
        section = selection;
        if (selection == 1) {
            cm.sendSimple("You ignorant fool that's oblivious to the rage of the Lord, choose your destiny!\r\n#L0# #v3994115# #l#L1# #v3994116# #l#L2# #v3994117# #l#L3# #v3994118# #l");
        } else if (selection == 2) {
            cm.sendSimple("What gem have you brought?\r\n#L0##i4001322##t4001322##l\r\n#L1##i4001323##t4001323##l\r\n#L2##i4001324##t4001324##l\r\n#L3##i4001325##t4001325##l");
        } else if (selection == 3) {
            cm.sendOk("Inside Pharaoh Yeti's Tomb, you can acquire a #e#b#t2022613##k#n by proving yourself capable of defeating the #bPharaoh Jr. Yeti#k, the Pharaoh's clone. Inside that box lies a very special treasure. It is the #b#b#t1132012##k#n.\r\n#i1132012# #t1132012#\r\n\r\nAnd if you are somehow able to survive Hell Mode, you will receive the #b#b#t1132013##k#n.\r\n#i1132013# #t1132013#\r\nThough, of course, Nett won't allow that to happen.");
            cm.dispose();
        } else if (selection == 4) {
            var record = cm.getQuestRecord(7760);
            var data = record.getCustomData();
            if (data == null) {
                record.setCustomData("0");
                data = record.getCustomData();
            }
            var mons = parseInt(data);
            if (mons < 50000) {
                cm.sendOk("Please defeat at least 50,000 monsters in the Pyramid and look for me again. Kills : " + mons);
            } else if (cm.canHold(1142142) && !cm.haveItem(1142142)) {
                cm.gainItem(1142142, 1);
                cm.forceStartQuest(29932);
                cm.forceCompleteQuest(29932);
            } else {
                cm.sendOk("Please make room.");
            }
            cm.dispose();
        }
    } else if (status == 3) {
        if (section == 1) {
            var cont_ = false;
            if (selection == 0) { //easy; 40-45
                if (cm.getPlayer().getLevel() < 40) {
                    cm.sendOk("You must be at least level 40.");
                } else if (cm.getPlayer().getLevel() > 60) {
                    cm.sendOk("You must be at most level 60.");
                } else {
                    cont_ = true;
                }
            } else if (selection == 1) { //normal; 46-50
                if (cm.getPlayer().getLevel() < 45) {
                    cm.sendOk("You must be at least level 45.");
                } else if (cm.getPlayer().getLevel() > 60) {
                    cm.sendOk("You must be at most level 60.");
                } else {
                    cont_ = true;
                }
            } else if (selection == 2) { //hard; 51-60
                if (cm.getPlayer().getLevel() < 50) {
                    cm.sendOk("You must be at least level 50.");
                } else if (cm.getPlayer().getLevel() > 60) {
                    cm.sendOk("You must be at most level 60.");
                } else {
                    cont_ = true;
                }
            } else if (selection == 3) { //hell; 61+
                if (cm.getPlayer().getLevel() < 61) {
                    cm.sendOk("You must be at least level 61.");
                } else {
                    cont_ = true;
                }
            }
            if (cont_ && cm.isLeader()) { //todo
                if (!cm.start_PyramidSubway(selection)) {
                    cm.sendOk("The pyramid is currently full at the moment.");
                }
            } else if (cont_ && !cm.isLeader()) {
                cm.sendOk("You must be the party leader");
            }
        } else if (section == 2) {
            var itemid = 4001322 + selection;
            if (!cm.haveItem(itemid, 1)) {
                cm.sendOk("You do not have the item.");
            } else {
                if (cm.bonus_PyramidSubway(926010100)) {
                    cm.gainItem(itemid, -1);
                } else {
                    cm.sendOk("The pyramid is currently full at the moment");
                }
            }
        }
        cm.dispose(); //todo
    } else if (status == 100) {
        cm.warp(926010000, 0);
        cm.dispose();
    }
}