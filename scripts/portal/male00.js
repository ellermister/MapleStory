function enter(pi) {
    var gender = pi.getPlayer().getGender();
    if (gender == 0) {
        pi.warp(670010200, 3);
        return true;
    } else {
        pi.getPlayer().dropMessage(5, "你不能从这里过去");
        return false;
    }
}