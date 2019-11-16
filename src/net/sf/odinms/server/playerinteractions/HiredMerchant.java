/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

package net.sf.odinms.server.playerinteractions;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.concurrent.ScheduledFuture;
import net.sf.odinms.client.IItem;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.server.AutobanManager;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.TimerManager;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.server.maps.MapleMapObjectType;
import net.sf.odinms.tools.MaplePacketCreator;

/**
 *
 * @author XoticStory
 */
public class HiredMerchant extends PlayerInteractionManager {

    private boolean open;
    public ScheduledFuture<?> schedule = null;
    private MapleMap map;
    private int itemId;

    public HiredMerchant(MapleCharacter owner, int itemId, String desc) {
        super(owner, itemId % 10, desc, 3);
        this.itemId = itemId;
        this.map = owner.getMap();
        this.schedule = TimerManager.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                HiredMerchant.this.closeShop(true);
            }
        }, 1000 * 60 * 60 * 24);
    }

    public byte getShopType() {
 return IPlayerInteractionManager.HIRED_MERCHANT;
       // return 1;
    }

    @Override
    public void buy(MapleClient c, int item, short quantity) {
        MaplePlayerShopItem pItem = items.get(item);
        if (pItem.getBundles() > 0) {
            synchronized (items) {
                IItem newItem = pItem.getItem().copy();
                newItem.setQuantity(quantity);
                if (c.getPlayer().getMeso() >= pItem.getPrice() * quantity) {
                    if (quantity > 0 && pItem.getBundles() >= quantity && pItem.getBundles() > 0) {
                        if (MapleInventoryManipulator.addFromDrop(c, newItem)) {
                            Connection con = DatabaseConnection.getConnection();
                            try {
                                PreparedStatement ps = con.prepareStatement("UPDATE characters SET MerchantMesos = MerchantMesos + " + pItem.getPrice() * quantity + " WHERE id = ?");
                                ps.setInt(1, getOwnerId());
                                ps.executeUpdate();
                                ps.close();
                            } catch (SQLException se) {
                                se.printStackTrace();
                            }
                            c.getPlayer().gainMeso(-pItem.getPrice() * quantity, false);
                            pItem.setBundles((short) (pItem.getBundles() - quantity));
                            tempItemsUpdate();
                        } else {
                            c.getPlayer().dropMessage(1, "背包已满");
                            c.getSession().write(MaplePacketCreator.enableActions());
                        }
                    } else {
                        AutobanManager.getInstance().autoban(c.getPlayer().getClient(), "XSource| Attempted to Merchant dupe.");
                    }
                } else {
                    c.getPlayer().dropMessage(1, "金币不足");
                    c.getSession().write(MaplePacketCreator.enableActions());
                }
            }
        }
    }

    public void closeShop(boolean saveItems)
  {
    this.map.removeMapObject(this);
    this.map.broadcastMessage(MaplePacketCreator.destroyHiredMerchant(getOwnerId()));
    PreparedStatement ps = null;
    try {
      ps = DatabaseConnection.getConnection().prepareStatement("UPDATE characters SET HasMerchant = 0 WHERE id = ?");
      ps.setInt(1, getOwnerId());
      ps.executeUpdate();
      ps.close();
      tempItems(false);
      if (saveItems)
        saveItems();
    } catch (SQLException se) {
    }
    finally {
      try {
        if (ps != null)
          ps.close();
      }
      catch (SQLException ex) {
      }
    }
    this.schedule.cancel(false);
  }


    public boolean isOpen() {
        return this.open;
    }

    public void setOpen(boolean set) {
        this.open = set;
    }

    public MapleMap getMap() {
        return map;
    }

    public int getItemId() {
        return itemId;
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        throw new UnsupportedOperationException();
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.HIRED_MERCHANT;
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        client.getSession().write(MaplePacketCreator.spawnHiredMerchant(this));
    }
}