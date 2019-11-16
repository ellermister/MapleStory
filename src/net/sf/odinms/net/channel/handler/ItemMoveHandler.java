package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleInventory;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Matze
 */
public class ItemMoveHandler extends AbstractMaplePacketHandler {

    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int actionId = slea.readInt();
        if (actionId <= c.getLastActionId()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.setLastActionId(actionId);
        MapleInventoryType type = MapleInventoryType.getByType(slea.readByte());
        MapleInventory inventory = c.getPlayer().getInventory(type);
        byte src = (byte) slea.readShort();
        byte dst = (byte) slea.readShort();
        short quantity = slea.readShort();
        if (src < 0 && dst > 0) {
        MapleInventoryManipulator.unequip(c, src, dst);
        } else if (dst < 0) {
             //log.error("你当前使用的道具是:"+src+"模式为:"+dst+"还不知道11111"+c);
            if(inventory.getItem(src).getItemId() == 1122017){ //判断物品代码
            String prefix = "";
            prefix ="由于装备了[精灵吊坠]打猎时额外获得10%的经验值奖励."; //提示语句
            c.getPlayer().dropMessage(5, prefix);                      //引用消息
        }
                        if(inventory.getItem(src).getItemId() == 1122018){ //判断物品代码
            String prefix = "";
            prefix ="你装备了[温暖的围脖]打猎时额外获得10%的经验值奖励.";
            //prefix ="你装备了[温暖的围脖]击退怪物可以获得双倍经验!"; //提示语句
            c.getPlayer().dropMessage(5, prefix);                            //引用消息
            
        }
            MapleInventoryManipulator.equip(c, src, dst);
        } else if (inventory.getItem(src).getItemId() == 5110000) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        } else if (dst == 0) {
            if (quantity < 0) {
                c.getPlayer().dropMessage(1, "Either you're Tryst, or you're a hacker. So GT*O here.\r\n(P.S. If you're Tryst, I ask you to **** OFF. Either way, you're a hacker.)");
                try {
                    c.getChannelServer().getWorldInterface().broadcastGMMessage(c.getPlayer().getName(), MaplePacketCreator.serverNotice(0, "Duper alert: " + c.getPlayer().getName() + " is dropping negative amount of items.").getBytes());
                } catch (Throwable u) {
                }
                return;
            }
            if (c.getPlayer().getInventory(type).getItem(src) == null) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            MapleInventoryManipulator.drop(c, type, src, quantity);
        } else {
            MapleInventoryManipulator.move(c, type, src, dst);
        }
    }
}