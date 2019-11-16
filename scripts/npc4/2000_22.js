/*
 * 
 * @wnms
 * @大擂台传送副本npc
 */
function start() {
    status = -1;
    action(1, 0, 0);
}
var 冒险币 = 5000;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("放弃就算了");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            cm.sendSimple("欢迎来到世纪冒险岛\r\n如果你在大擂台挂机获得了豆豆，可以在我这里兑换奖励哦！！！\r\n\r\n#L1##b我要兑换物品#l\r\n\r\n\r\n");
        } else if (status == 1) {
            if (selection == 1) {//副本传送
             cm.openNpc(2000,2);  
            } else if (selection == 2) {
             cm.openNpc(2000,23);   
//        cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(2,cm.getC().getChannel(),"[废弃都市]" + " : " + " [" + cm.getPlayer().getName() + "]与小组开始了地铁挑战。在" + cm.getC().getChannel() + "频道",true).getBytes()); 
                                            
        }	
        }
    }
}


