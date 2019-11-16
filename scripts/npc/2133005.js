/* 
 * 艾菲尼娅
 */

var status = -1;
var minLevel = 70;
var maxLevel = 250;

var minPartySize = 3;
var maxPartySize = 5;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNoS("这里就是艾菲尼娅的隐藏地。\r\n对于没有被允许的人来说是非常危险的地方。\r\n确定要进入吗？", 4, 2133006);
    } else if (status == 1) {
        if (cm.getPlayer().getParty() == null) {
            cm.sendOkS("组成2人以上的组队后可尝试进入。", 0, 2133006);
        } else if (!cm.isLeader()) {
            cm.sendOkS("如果你想进去，就让你所属组队的队长来和我说话。", 0, 2133006);
        } else {
            var party = cm.getPlayer().getParty().getMembers();
            var mapId = cm.getPlayer().getMapId();
            var next = true;
            var levelValid = 0;
            var inMap = 0;
            var it = party.iterator();
            while (it.hasNext()) {
                var cPlayer = it.next();
                var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                if (ccPlayer != null) {
                    if (ccPlayer.getLevel() >= minLevel && ccPlayer.getLevel() <= maxLevel) {
                        levelValid += 1;
                    }
                    if (ccPlayer.getMapId() == mapId) {
                        inMap += (ccPlayer.isGM() ? 3 : 1);
                    }
		    if (cPlayer.getChannel() != cm.getPlayer().getClient().getChannel() || cPlayer.getMapid() != cm.getMapId() || cm.getPlayer().getClient().getChannel()!=1){ 
			next = false;
		    }
                } else {
                    next = false;
                }
            }
            if (party.size() > maxPartySize || inMap < minPartySize) {
                next = false;
            }
            if (next) {
                var em = cm.getEventManager("FairyBoss");
                if (em == null) {
                    cm.sendOkS("脚本错误，请联系管理员。", 0, 2133006);
                    cm.dispose();
                    return;
                }
                var prop = em.getProperty("state");
                if (prop == null || prop.equals("0")) {
                    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
                } else {
                    cm.sendOkS("当前地图有玩家已经在挑战艾菲尼娅，请稍后再试。", 0, 2133006);
                }
            } else {
                cm.sendOkS("你所属的组队人数在" + minPartySize + "人以下，没办法进去。必须有" + minLevel + "级以上的角色" + minPartySize + "个以上才能进去。并且队员要在相同频道和地图,并且该怪物只能在1线挑战！\r\n请确认一下，然后再来找我。", 0, 2133006);
            }
        }
        cm.dispose();
    }
}