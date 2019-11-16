function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
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
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "赞助礼包领取NPC。"
            text += "您当前累计充值金额:"+ cm.getcz() +"\r\n";
            text += "#L1#累计赞助 - 100元礼包#l\r\n";
            text += "#L2#累计赞助 - 300元礼包#l\r\n";
            text += "#L3#累计赞助 - 500元礼包#l\r\n";
            text += "#L4#累计赞助 - 1000元礼包#l\r\n";
            text += "#L5#累计赞助 - 2000元礼包#l\r\n";
            cm.sendSimple(text);

        } else if (selection == 1) { //领取充值满100奖励
            if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull()) {
                cm.sendOk("您至少应该让装备栏空出6格");
                cm.dispose();
                return;
            } else if (cm.getcz() >= 100 && cm.getshouc() == 0) {
                cm.gainItem(3010003,1);//奖励物品代码， 请自行修改。
                cm.gainItem(1132000,1);//
                cm.gainItem(1112423,1);//
                cm.gainMeso(+2000000);//
                //这个物品是激光戒指。(如需奖励多个物品在下面加代码即可 代码如：cm.gainItem(物品代码, 物品数量);)
                
                cm.setshouc(+1);
                cm.sendOk("恭喜您领取成功。");
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.chrry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赞助奖励]" + " : " + " [" + cm.getPlayer().getName() + "]玩家领取了 赞助 - 100元礼包.", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("你已经领取过,或是您的累计充值金额不足。");
                cm.dispose();
            }
        
            } else if (selection == 2) { //领取充值满300奖励
            if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull()) {
                cm.sendOk("您至少应该让装备栏空出6格");
                cm.dispose();
                return;
            } else if (cm.getcz() >= 300 && cm.getshouc() == 1) { 
                cm.gainItem(3010010,1);//奖励物品代码， 请自行修改。
                cm.gainItem(1112423,1);//
                cm.gainItem(1112423,1);//
                cm.gainItem(1332032,1);//
                cm.gainItem(1132001,1);//
                cm.gainMeso(+5000000); 
                //这个物品是激光戒指。(如需奖励多个物品在下面加代码即可 代码如：cm.gainItem(物品代码, 物品数量);)
                
                cm.setshouc(+1);
                cm.sendOk("恭喜您领取成功。");
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.chrry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赞助奖励]" + " : " + " [" + cm.getPlayer().getName() + "]玩家领取了 赞助 - 300元礼包.", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("领取失败。/r/n/r/n领取了100元的奖励礼包才可以领取当前礼包。或是您的累计赞助金额不足!");
                cm.dispose();
            }

            } else if (selection == 3) { //领取充值满500奖励
            if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull()) {
                cm.sendOk("您至少应该让装备栏空出6格");
                cm.dispose();
                return;
            } else if (cm.getcz() >= 500 && cm.getshouc() == 2) { 
                cm.gainItem(3010014,1);//奖励物品代码， 请自行修改。
                cm.gainItem(1112423,1);//
                cm.gainItem(1112423,1);//
                cm.gainItem(1112423,1);//
                cm.gainItem(1302063,1);//
                cm.gainItem(1132002,1);//
                cm.gainMeso(+8000000);//  
                //这个物品是激光戒指。(需奖励多个物品在下面加代码即可 代码如：cm.gainItem(物品代码, 物品数量);)
                
                cm.setshouc(+1);
                cm.sendOk("恭喜您领取成功。");
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.chrry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赞助奖励]" + " : " + " [" + cm.getPlayer().getName() + "]玩家领取了 赞助 - 500元礼包.", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("领取失败。/r/n/r/n领取了300元的奖励礼包才可以领取当前礼包。或是您的累计赞助金额不足!");
                cm.dispose();
            }

            } else if (selection == 4) { //领取充值满1000奖励
            if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull()) {
                cm.sendOk("您至少应该让装备栏空出6格");
                cm.dispose();
                return;
            } else if (cm.getcz() >= 1000 && cm.getshouc() == 3) { 
                cm.gainItem(3010073,1);//奖励物品代码， 请自行修改。
                cm.gainItem(1132004,1);//	  
                cm.gainItem(1402014,1);//
                cm.gainItem(1132013,1);//
                cm.gainItem(1012011,1);//
                cm.gainMeso(+20000000);// 

                //这个物品是激光戒指。(如需奖励多个物品在下面加代码即可 代码如：cm.gainItem(物品代码, 物品数量);)
                
                cm.setshouc(+1);
                cm.sendOk("恭喜您领取成功。");
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.chrry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赞助奖励]" + " : " + " [" + cm.getPlayer().getName() + "]玩家领取了 赞助 - 1000元礼包.", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("领取失败。/r/n/r/n领取了500元的奖励礼包才可以领取当前礼包。或是您的累计赞助金额不足!");
                cm.dispose();
            }
            
             } else if (selection == 5) { //领取充值满2000奖励
            if (cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(1)).isFull()) {
                cm.sendOk("您至少应该让装备栏空出6格");
                cm.dispose();
                return;
            } else if (cm.getcz() >= 2000 && cm.getshouc() == 4) { 
                cm.gainItem(1142189,1);//奖励物品代码， 请自行修改。
                cm.gainItem(1132010,1);//
                cm.gainItem(2040804,5);//
                cm.gainItem(2340000,5);//
                cm.gainItem(1032040,1);//
                cm.gainItem(1022088,1);//
                cm.gainItem(3010070,1);//
                cm.gainMeso(+50000000);//  
                //这个物品是激光戒指。(如需奖励多个物品在下面加代码即可 代码如：cm.gainItem(物品代码, 物品数量);)
    
                cm.setshouc(+1);
                cm.sendOk("恭喜您领取成功。");
                cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.chrry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[赞助奖励]" + " : " + " [" + cm.getPlayer().getName() + "]玩家领取了 赞助 - 2000元礼包.", true).getBytes());
                cm.dispose();
            } else {
                cm.sendOk("领取失败。/r/n/r/n领取了1000元的奖励礼包才可以领取当前礼包。或是您的累计赞助金额不足!");
                cm.dispose();
            }
        
        
        }
    }
}