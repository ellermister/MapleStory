function enter(pi) {
    var papuMap = pi.getC().getChannelServer().getMapFactory().getMap(220080001);
    if (papuMap.getCharacters().isEmpty()) {
        papuMap.resetReactors();
    } else {
        var mapobjects = papuMap.getMapObjects();
        var boss = null;
        var iter = mapobjects.iterator();
        while (iter.hasNext()) {
            o = iter.next();
            if (pi.isMonster(o))
                boss = o;
        }
        if (boss != null) {
            pi.getPlayer().dropMessage("里面已经开始了对抗" + boss.getName() + "的战斗。");
            return false;
        }
    }
    pi.warp(220080001, "st00");
    return true;
}