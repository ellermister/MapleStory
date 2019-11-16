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

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.sf.odinms.client.Equip;
import net.sf.odinms.client.IItem;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.net.MaplePacket;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.maps.AbstractMapleMapObject;
import net.sf.odinms.tools.MaplePacketCreator;

/**
 *
 * @author XoticStory
 */
public abstract class PlayerInteractionManager extends AbstractMapleMapObject implements IPlayerInteractionManager {

    private String ownerName;
    private int ownerId;
    private byte type;
    private String description = "";
    private short capacity;
    protected MapleCharacter[] visitors = new MapleCharacter[3];
    protected List<MaplePlayerShopItem> items = new LinkedList<MaplePlayerShopItem>();

    public PlayerInteractionManager(MapleCharacter owner, int type, String desc, int capacity) {
        this.setPosition(owner.getPosition());
        this.ownerName = owner.getName();
        this.ownerId = owner.getId();
        this.type = (byte) type;
        this.capacity = (short) capacity;
        this.description = desc;
    }

    @Override
    public void broadcast(MaplePacket packet, boolean toOwner) {
        for (MapleCharacter visitor : visitors) {
            if (visitor != null) {
                visitor.getClient().getSession().write(packet);
            }
        }
        if (toOwner) {
            MapleCharacter pOwner = null;
            if (getShopType() == 2) {
                pOwner = ((MaplePlayerShop) this).getMCOwner();
            }
            if (pOwner != null) {
                pOwner.getClient().getSession().write(packet);
            }
        }
    }

    @Override
    public void removeVisitor(MapleCharacter visitor) {
        int slot = getVisitorSlot(visitor);
        boolean shouldUpdate = getFreeSlot() == -1;
        if (slot > -1) {
            visitors[slot] = null;
            broadcast(MaplePacketCreator.shopVisitorLeave(slot + 1), true);
            if (shouldUpdate) {
                if (getShopType() == 2) {
                    ((HiredMerchant) this).getMap().broadcastMessage(MaplePacketCreator.updateHiredMerchant((HiredMerchant) this));
                } else {
                    ((MaplePlayerShop) this).getMCOwner().getMap().broadcastMessage(MaplePacketCreator.sendInteractionBox(((MaplePlayerShop) this).getMCOwner()));
                }
            }
        }
    }

     public void saveItems()
    throws SQLException
  {
    PreparedStatement ps = null;
    try {
       for (MaplePlayerShopItem pItems : items) {
        if (pItems.getBundles() > 0) {
          if (pItems.getItem().getType() == 1) {
            ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO hiredmerchant (ownerid, itemid, quantity, upgradeslots, level, str, dex, `int`, luk, hp, mp, watk, matk, wdef, mdef, acc, avoid, hands, speed, jump, owner, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            Equip eq = (Equip)pItems.getItem();
            ps.setInt(2, eq.getItemId());
            ps.setInt(3, 1);
            ps.setInt(4, eq.getUpgradeSlots());
            ps.setInt(5, eq.getLevel());
            ps.setInt(6, eq.getStr());
            ps.setInt(7, eq.getDex());
            ps.setInt(8, eq.getInt());
            ps.setInt(9, eq.getLuk());
            ps.setInt(10, eq.getHp());
            ps.setInt(11, eq.getMp());
            ps.setInt(12, eq.getWatk());
            ps.setInt(13, eq.getMatk());
            ps.setInt(14, eq.getWdef());
            ps.setInt(15, eq.getMdef());
            ps.setInt(16, eq.getAcc());
            ps.setInt(17, eq.getAvoid());
            ps.setInt(18, eq.getHands());
            ps.setInt(19, eq.getSpeed());
            ps.setInt(20, eq.getJump());
            ps.setString(21, eq.getOwner());
            ps.setInt(22, 1);
          } else {
            ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO hiredmerchant (ownerid, itemid, quantity, owner, type) VALUES (?, ?, ?, ?, 0)");
            ps.setInt(2, pItems.getItem().getItemId());
            ps.setInt(3, pItems.getBundles());
            ps.setString(4, pItems.getItem().getOwner());
          }
          ps.setInt(1, getOwnerId());
          ps.executeUpdate();
          ps.close();
        }
      }
    } catch (SQLException ex) {
    } finally {
      try {
        if (ps != null)
          ps.close();
      }
      catch (SQLException ex) {
      }
    }
  }



    public void tempItemsUpdate() {
        try {
            tempItems(true);
        } catch (SQLException ex) {
            Logger.getLogger(HiredMerchant.class.getName()).log(Level.SEVERE, "Error Saving " + this.getOwnerName() + " temporary items.", ex);
        }
    }

    public void tempItems(boolean overwrite) throws SQLException {
        PreparedStatement ps;
        ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM hiredmerchanttemp WHERE ownerid = ?");
        ps.setInt(1, getOwnerId());
        ps.executeUpdate();
        ps.close();
        if (overwrite) {
            for (MaplePlayerShopItem pItems : items) {
                if (pItems.getBundles() > 0) {
                    if (pItems.getItem().getType() == 1) {
                        ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO hiredmerchanttemp (ownerid, itemid, quantity, upgradeslots, level, str, dex, `int`, luk, hp, mp, watk, matk, wdef, mdef, acc, avoid, hands, speed, jump, owner, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                        Equip eq = (Equip) pItems.getItem();
                        ps.setInt(2, eq.getItemId());
                        ps.setInt(3, 1);
                        ps.setInt(4, eq.getUpgradeSlots());
                        ps.setInt(5, eq.getLevel());
                        ps.setInt(6, eq.getStr());
                        ps.setInt(7, eq.getDex());
                        ps.setInt(8, eq.getInt());
                        ps.setInt(9, eq.getLuk());
                        ps.setInt(10, eq.getHp());
                        ps.setInt(11, eq.getMp());
                        ps.setInt(12, eq.getWatk());
                        ps.setInt(13, eq.getMatk());
                        ps.setInt(14, eq.getWdef());
                        ps.setInt(15, eq.getMdef());
                        ps.setInt(16, eq.getAcc());
                        ps.setInt(17, eq.getAvoid());
                        ps.setInt(18, eq.getHands());
                        ps.setInt(19, eq.getSpeed());
                        ps.setInt(20, eq.getJump());
                        ps.setString(21, eq.getOwner());
                        ps.setInt(22, 1);
                    } else {
                        ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO hiredmerchanttemp (ownerid, itemid, quantity, owner, type) VALUES (?, ?, ?, ?, 0)");
                        ps.setInt(2, pItems.getItem().getItemId());
                        ps.setInt(3, pItems.getBundles());
                        ps.setString(4, pItems.getItem().getOwner());
                    }
                    ps.setInt(1, getOwnerId());
                    ps.executeUpdate();
                    ps.close();
                }
            }
        }
    }

    @Override
    public void addVisitor(MapleCharacter visitor) {
        int i = this.getFreeSlot();
        if (i > -1) {
            broadcast(MaplePacketCreator.shopVisitorAdd(visitor, i + 1), true);
            visitors[i] = visitor;
            if (getFreeSlot() == -1) {
                if (getShopType() == 1) {
                    ((HiredMerchant) this).getMap().broadcastMessage(MaplePacketCreator.updateHiredMerchant((HiredMerchant) this));
                } else {
                    MapleCharacter pOwner = null;
                    if (getShopType() == 2) {
                        pOwner = ((MaplePlayerShop) this).getMCOwner();
                    }
                    if (pOwner != null) {
                        pOwner.getMap().broadcastMessage(MaplePacketCreator.sendInteractionBox(pOwner));
                    }
                }
            }
        }
    }

    @Override
    public int getVisitorSlot(MapleCharacter visitor) {
        for (int i = 0; i < capacity; i++) {
            if (visitors[i] == visitor) {
                return i;
            }
        }
        return -1;
    }

    @Override
    public void removeAllVisitors(int error, int type) {
        for (int i = 0; i < capacity; i++) {
            if (visitors[i] != null) {
                if (type != -1) {
                    visitors[i].getClient().getSession().write(MaplePacketCreator.shopErrorMessage(error, type));
                }
                visitors[i].setInteraction(null);
                visitors[i] = null;
            }
        }
    }

    @Override
    public String getOwnerName() {
        return ownerName;
    }

    @Override
    public int getOwnerId() {
        return ownerId;
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public MapleCharacter[] getVisitors() {
        return visitors;
    }

    @Override
    public List<MaplePlayerShopItem> getItems() {
        return items;
    }

    @Override
    public void addItem(MaplePlayerShopItem item) {
        items.add(item);
        tempItemsUpdate();
    }

    @Override
    public boolean removeItem(int item) {
        synchronized (items) {
            if (items.contains(item)) {
                items.remove(item);
                tempItemsUpdate();
                return true;
            }
            tempItemsUpdate();
            return false;
        }
    }

    @Override
    public void removeFromSlot(int slot) {
        items.remove(slot);
        tempItemsUpdate();
    }

    @Override
    public int getFreeSlot() {
        for (int i = 0; i < 3; i++) {
            if (visitors[i] == null) {
                return i;
            }
        }
        return -1;
    }

    @Override
    public byte getItemType() {
        return type;
    }

    @Override
    public boolean isOwner(MapleCharacter chr) {
        return chr.getId() == ownerId && chr.getName().equals(ownerName);
    }

    public boolean returnItems(MapleClient c) {
        for (MaplePlayerShopItem item : items) {
            if (item.getBundles() > 0) {
                IItem nItem = item.getItem();
                nItem.setQuantity(item.getBundles());
                if (MapleInventoryManipulator.addFromDrop(c, nItem)) {
                    item.setBundles((short) 0);
                } else {
                    return true;
                }
            }
        }
        return false;
    }
}
