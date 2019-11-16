var status = 0
var victim;
var ring = 1112001;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (mode == 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }
    if (status == 1) {
        cm.sendSimple("" +
                "#L1##r#e进入红鸾宫#l\r\n" +
                "#L2##k#e我想回去了");
    } else if (status == 2) {
        if (selection == 1) {
            if (cm.getParty() == null) {
                cm.sendNext("请与你的另一半组队后找我");
                cm.dispose();
                return;
            }
            if (!cm.isLeader()) {
                cm.sendNext("请让队长与我对话");
                cm.dispose();
                return;
            }

            var gender = cm.getPlayer().getGender();
            var mapId = cm.getPlayer().getMapId();
            var next = true;
            var party = cm.getPlayer().getParty().getMembers();
            var it = party.iterator();
            while (it.hasNext()) {
                var cPlayer = it.next();
                victim = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                if (victim.getId() != cm.getPlayer().getId() && (party.size() > 2 || victim == null || victim.getMapId() != mapId || victim.getGender() == gender)) {
                    next = false;
                    break;
                }
            }

            if (!next) {
                cm.sendNext("请确认您跟您的的另外一半在这一张地图、不同性別、并且都在线以及队伍中沒有其他人");
                cm.dispose();
                return;
            }
			
            if (!victim.hasEquipped(ring) || !cm.getPlayer().hasEquipped(ring)) {
                cm.sendNext("您或您的另一半沒有装备#v" + ring + "##z" + ring + "#哦");
                cm.dispose();
                return;
            }
            cm.sendYesNo("確定是否要与" + victim.getName() + "结婚吗?");
        } else if (selection == 2) {
            var map = cm.getSavedLocation("WEDDING");
            cm.warp(map, 0);
			cm.clearSavedLocation("WEDDING");
            cm.dispose();
        }
    } else if (status == 3) {
		cm.warpParty(700000100);
        cm.dispose();
    } else {
        cm.dispose();
    }
}