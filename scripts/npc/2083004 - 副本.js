function start() {
    /*if (cm.getPlayer().getClient().getChannel() == 3) {
        cm.dispose();
        cm.openNpc(2083004, 2);
    } else *///if (cm.getPlayer().getClient().getChannel() == 2 ||cm.getPlayer().getClient().getChannel() == 4 ) {
        cm.dispose();
        cm.openNpc(2083004, 1);
   /* } else {
        cm.sendOk("只有在2-4频道才可以参加黑龙远征队\r\n3频道为进阶黑龙王，2和4频道为普通黑龙王.");
        cm.dispose();
    }*/
}