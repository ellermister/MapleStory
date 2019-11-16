importPackage(net.sf.odinms.tools);

function enter(pi) {
    if (pi.getPlayer().getMap().getMonsterById(9300216) != null) {
        pi.getPlayer().enteredScript("dojang_Msg", pi.getPlayer().getMap().getId());
        pi.warp(925020001, 0);
    } else {
        pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "武公：哈哈！本关都没有通过，难道你就想进入下一关吗？这是绝对不允许的。"));
        return false;
    }
    return true;
}  