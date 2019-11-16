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

package net.sf.odinms.server;

/**
 *
 * @author Matze
 */
public class MapleShopItem {

    private short buyable; // Use this
    private int itemId;
    private int price;
    private long refreshTime = 0;
    private short availible;

    /** Creates a new instance of MapleShopItem */
    public MapleShopItem(short buyable, int itemId, int price) {
        this.buyable = buyable;
        this.itemId = itemId;
        this.price = price;
    }

    public short getBuyable() {
        return buyable;
    }

    public short getAvailible() {
        return availible;
    }

    public void setAvailible(short set) {
        this.availible = set;
    }

    public void decAvailible() {
        availible--;
    }

    public void incAvailible() {
        availible++;
    }

    public int getItemId() {
        return itemId;
    }

    public int getPrice() {
        return price;
    }

    public long getRefresh() {
        return refreshTime;
    }
}