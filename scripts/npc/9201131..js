var status = -1;
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (cm.getPlayer().getLevel() < 40) {
            cm.sendYesNo("Would you like to move to Amdusias's Strolling Place?");
        } else {
            cm.sendOk("You need to be less than level 40 and need the Amdusias's Necklace to enter.");
            cm.dispose();
        }
    } else {
        cm.warp(677000002, 0);
		cm.spawnMobOnMap(9400610,1,404,-596,677000003);
        cm.dispose();
    }
}