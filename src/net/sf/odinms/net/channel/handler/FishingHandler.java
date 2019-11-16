/*
	钓鱼处理程序
*/

package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.tools.Randomizer;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

/**
 * @author Jay Estrella
 */
public final class FishingHandler extends AbstractMaplePacketHandler {

    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt(); // will load from xml I don't care.

        if (c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot).getItemId() != itemId || c.getPlayer().getInventory(MapleInventoryType.USE).countById(itemId) <= 0) {
            return;
        }
        for (MapleFish fish : MapleItemInformationProvider.getInstance().getFishReward(itemId)) {
            if (fish.getProb() >= Randomizer.getInstance().nextInt(9) + 1) // out of 10 for now.
            {
                MapleInventoryManipulator.addById(c, fish.getItemId(), (short) fish.getCount(), null);
            }
        }
        MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemId, 1, false, true);

    }

    public static final class MapleFish {

        private int itemId,  prob,  count;
        private String effect;

        public MapleFish(int itemId, int prob, int count, String effect) {
            this.itemId = itemId;
            this.prob = prob;
            this.count = count;
            this.effect = effect;
        }

        public int getItemId() {
            return itemId;
        }

        public int getProb() {
            return prob;
        }

        public int getCount() {
            return count;
        }

        public String getEffect() {
            return effect;
        }
    }
}