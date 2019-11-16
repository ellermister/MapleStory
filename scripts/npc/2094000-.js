����function checkMap() {
    var map = [925100000, 925100100, 925100200, 925100201, 925100202, 925100300, 925100301, 925100302, 925100400, 925100400, 925100500];
    for(var i = 0 ; i < map.length; i++) {
        if(cm.getPlayerCount(map[i]))
            return false;
    }
    return true;
}


function action(mode, type, selection) {
    cm.removeAll(4001117);
    cm.removeAll(4001120);
    cm.removeAll(4001121);
    cm.removeAll(4001122);
    if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
        cm.sendOk("���Ҷӳ������ҡ�");
    } else {
        var party = cm.getPlayer().getParty().getMembers();
        var mapId = cm.getPlayer().getMapId();
        var next = true;
        var size = 0;
        var it = party.iterator();
        while (it.hasNext()) {
            var cPlayer = it.next();
            var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
            if (ccPlayer == null || ccPlayer.getLevel() < 55 || ccPlayer.getLevel() > 100) {
                next = false;
                break;
            }
            size += (ccPlayer.isGM() ? 2 : 1);
        }
        if (next && size >= 3) {
            if(checkMap()) {
                var em = cm.getEventManager("Pirate");
                if (em == null) {
                    cm.sendOk("�Ҳ����ű�������ϵGM����");
                } else {
                    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap());
                }
            } else {
                cm.sendOk("Ŀǰ�����ڴ򆪡�");
            }
        }else {
            cm.sendOk("��Ҫ3�������� �ȼ�������55��100��");
        }
    }
    cm.dispose();
}