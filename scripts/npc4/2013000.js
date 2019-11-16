var status = -1;
var minLevel = 51; // 35
var maxLevel = 200; // 65

var minPartySize = 3;
var maxPartySize = 6;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (cm.getMapId() == 920010000) { //inside orbis pq
        cm.sendOk("请你把所有的云朵打了，凑齐到20个云朵碎片放入地图亭子的光球下。");
        cm.dispose();
        return;
    }
    if (status == 0) {
        for (var i = 4001044; i < 4001064; i++) {
            cm.removeAll(i); //holy
        }
        if (cm.getParty() == null) { // No Party
            cm.sendSimple("How about you and your party members collectively beating a quest? Here you'll find obstacles and problems where you won't be able to beat it unless with great teamwork. If you want to try it, please tell the #bleader of your party#k to talk to me.\r\n\r\n#r要求最小人数: " + minPartySize + " Party Members, 和最低等级 " + minLevel + " 和最高等级 " + maxLevel + ".#b\r\n");
        } else if (!cm.isLeader()) { // Not Party Leader
            cm.sendSimple("If you want to try the quest, please tell the #bleader of your party#k to talk to me.#b\r\n#L0#我想要用女神的羽毛兑换#v1082322##z1082322##l\r\n#L1#我想要用女神的羽毛兑换#v1072534##z1072534##l");
        } else {
            // Check if all party members are within PQ levels
            var party = cm.getParty().getMembers();
            var mapId = cm.getMapId();
            var next = true;
            var levelValid = 0;
            var inMap = 0;
            var it = party.iterator();

            while (it.hasNext()) {
                var cPlayer = it.next();
                if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
                    levelValid += 1;
                } else {
                    next = false;
                }
                if (cPlayer.getMapid() == mapId) {
                    inMap += (1);
                }
            }
            if (party.size() > maxPartySize || inMap < minPartySize) {
                next = false;
            }
            if (next) {
                var em = cm.getEventManager("OrbisPQ");
                if (em == null) {
                    cm.sendSimple("The PQ has encountered an error. Please report this on the forums, with a screenshot.#b\r\n#L0#我想要用女神的羽毛兑换#v1082322##z1082322##l\r\n#L1#我想要用女神的羽毛兑换#v1072534##z1072534##l");
                } else {
                    var prop = em.getProperty("state");
                    if (prop.equals("0") || prop == null) {
                        em.startInstance(cm.getParty(), cm.getMap());
                        cm.dispose();
                        return;
                    } else {
                        cm.sendSimple("Another party has already entered the #rParty Quest#k in this channel. Please try another channel, or wait for the current party to finish.#b\r\n#L0#I want the Minerva Wristband.#l\r\n#L1#I want the Minerva Shoes.#l");
                    }
                }
            } else {
                cm.sendSimple("你的队伍不符合要求\r\n\r\n#r成员要求: 3--6名队员, 所有人等级 " + minLevel + " 和 " + maxLevel + "之间#b\r\n#L0#我想要用#v4001158##z4001158#10个兑换#v1082322##z1082322##l\r\n#L1#我想要用#v4001158##z4001158#10个兑换#v1072534##z1072534##l");
            }
        }
    } else { //broken glass
        if (selection == 0) {
           // if (!cm.isGMS()) { //TODO Jump
           //     cm.sendOk("Not available.");
            //} else 
			if (cm.haveItem(1082232, 1)) {
                if (!cm.canHold(1082322, 1)) {
                    cm.sendOk("请清除你的背包，已经满了！");
                } else if (cm.haveItem(4001158, 10)) {
                    cm.gainItem(1082322, 1);
                    cm.gainItem(4001158, -10);
                } else {
                    cm.sendOk("请你收集10个 #t4001158#.");
                }
            } else if (!cm.canHold(1082232, 1)) {
                cm.sendOk("请清除你的背包，已经满了！");
            } else if (cm.haveItem(4001158, 10)) {
                cm.gainItem(1082232, 1);
                cm.gainItem(4001158, -10);
            } else {
                cm.sendOk("请你收集10个 #t4001158#.");
            }
        } else if (selection == 1) {
           // if (!cm.isGMS()) { //TODO Jump
            //    cm.sendOk("Not available.");
            //} else 
			if (cm.haveItem(1072455, 1)) {
                if (!cm.canHold(1072534, 1)) {
                    cm.sendOk("请清除你的背包，已经满了！.");
                } else if (cm.haveItem(4001158, 10)) {
                    cm.gainItem(1072534, 1);
                    cm.gainItem(4001158, -10);
                } else {
                    cm.sendOk("请你收集10个#t4001158#.");
                }
            } else if (!cm.canHold(1072455, 1)) {
                cm.sendOk("Make room for this shoe.");
            } else if (cm.haveItem(4001158, 10)) {
                cm.gainItem(1072455, 1);
                cm.gainItem(4001158, -10);
            } else {
                cm.sendOk("Come back when you have done 10 #t4001158#.");
            }
        }
        cm.dispose();
    }
}