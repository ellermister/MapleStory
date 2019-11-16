function enter(pi) {
    var gender = pi.getPlayer().getGender();
    if (gender == 1) {
        pi.warp(670010200, 4);
        return true;
    } else {
        pi.getPlayer().dropMessage(5, "你不能从这里过去");
        return false;
    }
}