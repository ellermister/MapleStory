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

import java.util.List;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.MaplePacket;

/**
 *
 * @author XoticStory.
 */
public interface IPlayerInteractionManager {

    public final byte HIRED_MERCHANT = 1;
    public final byte PLAYER_SHOP = 2;
    public final byte MATCH_CARD = 3;
    public final byte OMOK = 4;

    public void broadcast(MaplePacket packet, boolean toOwner);

    public void addVisitor(MapleCharacter visitor);

    public void removeVisitor(MapleCharacter visitor);

    public int getVisitorSlot(MapleCharacter visitor);

    public void removeAllVisitors(int error, int type);

    public void buy(MapleClient c, int item, short quantity);

    public void closeShop(boolean saveItems);

    public String getOwnerName();

    public int getOwnerId();

    public String getDescription();

    public MapleCharacter[] getVisitors();

    public List<MaplePlayerShopItem> getItems();

    public void addItem(MaplePlayerShopItem item);

    public boolean removeItem(int item);

    public void removeFromSlot(int slot);

    public int getFreeSlot();

    public byte getItemType();

    public boolean isOwner(MapleCharacter chr);

    public byte getShopType();
}