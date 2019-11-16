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

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.sf.odinms.client.IItem;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.maps.MapleMapObjectType;
import net.sf.odinms.tools.MaplePacketCreator;

/**
 *
 * @author Matze FIXED by XoticStory.
 */
public class MaplePlayerShop extends PlayerInteractionManager {

    private MapleCharacter owner;
    private int boughtnumber = 0;
    private List<String> bannedList = new ArrayList<String>();

    public MaplePlayerShop(MapleCharacter owner, int itemId, String desc) {
        super(owner, itemId % 10, desc, 3);
        this.owner = owner;
    }

    @Override
    public void buy(MapleClient c, int item, short quantity) {
        MaplePlayerShopItem pItem = items.get(item);
        if (pItem.getBundles() > 0) {
            synchronized (items) {
                IItem newItem = pItem.getItem().copy();
                newItem.setQuantity(quantity);
                if (c.getPlayer().getMeso() >= pItem.getPrice() * quantity) {
                    if (MapleInventoryManipulator.addFromDrop(c, newItem)) {
                        c.getPlayer().gainMeso(-pItem.getPrice() * quantity, false);
                        pItem.setBundles((short) (pItem.getBundles() - quantity));
                        owner.gainMeso(pItem.getPrice() * quantity, false);
                        if (pItem.getBundles() == 0) {
                            boughtnumber++;
                            if (boughtnumber == items.size()) {
                                removeAllVisitors(10, 1);
                                owner.getClient().getSession().write(MaplePacketCreator.shopErrorMessage(10, 1));
                                closeShop(false);
                            }
                        }
                    } else {
                        c.getPlayer().dropMessage(1, "你的背包已满");
                    }
                } else {
                    c.getPlayer().dropMessage(1, "金币不足.");
                }
            }
            owner.getClient().getSession().write(MaplePacketCreator.shopItemUpdate(this));
        }
    }

    @Override
    public byte getShopType() {
       return IPlayerInteractionManager.PLAYER_SHOP;
       // return 2;
    }

    @Override
    public void closeShop(boolean saveItems) {
        owner.getMap().broadcastMessage(MaplePacketCreator.removeCharBox(owner));
        owner.getMap().removeMapObject(this);
        try {
            if (saveItems) {
                saveItems();
            }
        } catch (SQLException se) {
        }
        owner.setInteraction(null);
    }

    public void banPlayer(String name) {
    if (!(this.bannedList.contains(name)))
      this.bannedList.add(name);

    for (int i = 0; i < 3; ++i)
      if (this.visitors[i].getName().equals(name)) {
        this.visitors[i].getClient().getSession().write(MaplePacketCreator.shopErrorMessage(5, 1));
        this.visitors[i].setInteraction(null);
        removeVisitor(this.visitors[i]);
      }
  }

    public boolean isBanned(String name) {
        if (bannedList.contains(name)) {
            return true;
        }
        return false;
    }

    public MapleCharacter getMCOwner() {
        return owner;
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        throw new UnsupportedOperationException();
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.SHOP;
    }
}