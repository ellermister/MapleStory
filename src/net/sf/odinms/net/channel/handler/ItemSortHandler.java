/*
	物品种类
*/
package net.sf.odinms.net.channel.handler;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.MapleInventory;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class ItemSortHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
    MapleCharacter player = c.getPlayer();
    player.setCurrenttime(System.currentTimeMillis());
    if (player.getCurrenttime() - player.getLasttime() < player.getDeadtime()) {
    player.dropMessage("现在无法使用，请稍后再试！");
    c.getSession().write(MaplePacketCreator.enableActions());
      return;
    }
    c.getSession().write(MaplePacketCreator.enableActions());
        slea.skip(4);
        byte sort = slea.readByte();

        if (sort < 1 || sort > 5) {
            return;
        }
        List<Integer> items = new ArrayList<Integer>();
        MapleInventoryType type = MapleInventoryType.getByType(sort);
        MapleInventory inventory = c.getPlayer().getInventory(type);

        for (byte i = 0; i < 96; i++) {
            if (inventory.getItem(i) == null) {
                continue;
            } else {
                if (inventory.getItem(i).getItemId() == 5110000) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                } else {
                    if (!items.contains(inventory.getItem(i).getItemId())) {
                        items.add(inventory.getItem(i).getItemId());
                    }
                }
            }
        }

        Collections.sort(items);

        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();

        // Stacking
        for (Integer item : items) {
            List<Byte> stack = new ArrayList<Byte>();
            stack = inventory.findAllById(item);
            if (stack.size() > 1 && !ii.isRechargable(item)) {
                for (byte j = 1; j < stack.size(); j++) {
                    if (inventory.getItem(stack.get(j)) != null && inventory.getItem(stack.get(j)).getQuantity() < ii.getSlotMax(c, item)) {
                        for (byte k = 0; k < j; k++) {
                            if (inventory.getItem(stack.get(k)) != null && inventory.getItem(stack.get(k)).getQuantity() < ii.getSlotMax(c, item)) {
                                MapleInventoryManipulator.move(c, type, stack.get(j), stack.get(k));
                                break;
                            }
                        }
                    }
                }
            }
        }

        items.clear();

        // Re-create array after stacking
        for (byte i = 0; i < 96; i++) {
            if (inventory.getItem(i) == null) {
                continue;
            } else {
                if (inventory.getItem(i).getItemId() == 5110000) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                } else {
                    if (!items.contains(inventory.getItem(i).getItemId())) {
                        items.add(inventory.getItem(i).getItemId());
                    }
                }
            }
        }

        byte current_slot = 1;

        // Sorting
        Collections.sort(items);
        for (Integer item : items) {
            List<Byte> stack = new ArrayList<Byte>();
            stack = inventory.findAllById(item);
            for (byte j = 0; j < stack.size(); j++) {
                List<Byte> new_stack = new ArrayList<Byte>();
                new_stack = inventory.findAllById(item);
                if (new_stack.get(j) != current_slot) {
                    MapleInventoryManipulator.move(c, type, new_stack.get(j), current_slot);
                }
                current_slot++;
            }
        }
    //c.getSession().write(MaplePacketCreator.sortItemComplete());
    }
}