function enter(pi) {
    if ((pi.getPlayer().getMapId() / 100) % 100 != 38) {
        if (pi.getPlayer().getMap().getCharacters().size() == 1) {
            pi.getPlayer().getMap().clearDrops(pi.getPlayer(), false);
            pi.getPlayer().getMap().killAllMonsters();
        }
        pi.warp(pi.getPlayer().getMap().getId() + 100, 0);
    } else {
        pi.warp(925020003, 0);
        pi.getPlayer().gainExp(2000 * pi.getPlayer().getDojoPoints(), true, true, true);
    }
    return true;
}