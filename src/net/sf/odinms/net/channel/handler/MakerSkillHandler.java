/*
//锻造
*/

package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.MakerItemFactory;
import net.sf.odinms.server.MakerItemFactory.MakerItemCreateEntry;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.tools.Pair;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author
 */
public final class MakerSkillHandler extends AbstractMaplePacketHandler {

    private MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();

    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readInt();
        int toCreate = slea.readInt();
        slea.readShort();
        MakerItemCreateEntry recipe = MakerItemFactory.getItemCreateEntry(toCreate);
        if (canCreate(c, recipe) && !c.getPlayer().getInventory(ii.getInventoryType(toCreate)).isFull()) {
            for (Pair<Integer, Integer> p : recipe.getReqItems()) {
                int toRemove = p.getLeft();
                MapleInventoryManipulator.removeById(c, ii.getInventoryType(toRemove), toRemove, p.getRight(), false, false);
            }
            MapleInventoryManipulator.addById(c, toCreate, (short) recipe.getRewardAmount(), null);
        }
    }

    private boolean canCreate(MapleClient c, MakerItemCreateEntry recipe) {
        return hasItems(c, recipe) && c.getPlayer().getMeso() >= recipe.getCost() && c.getPlayer().getLevel() >= recipe.getReqLevel() && c.getPlayer().getSkillLevel(c.getPlayer().getJob().getId() / 1000 * 1000 + 1007) >= recipe.getReqSkillLevel();
    }

    private boolean hasItems(MapleClient c, MakerItemCreateEntry recipe) {
        for (Pair<Integer, Integer> p : recipe.getReqItems()) {
            int itemId = p.getLeft();
            if (c.getPlayer().getInventory(ii.getInventoryType(itemId)).countById(itemId) < p.getRight()) {
                return false;
            }
        }
        return true;
    }
}