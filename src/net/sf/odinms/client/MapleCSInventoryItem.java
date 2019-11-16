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

package net.sf.odinms.client;

import java.sql.Timestamp;
import net.sf.odinms.server.MapleItemInformationProvider;

/**
 *
 * @author NightCoffee
 */
public class MapleCSInventoryItem {

    private int uniqueid;
    private int itemid;
    private int sn;
    private short quantity;
    private Timestamp expire = null;
    private boolean gift;
    private boolean isRing = false;
    private String sender = "";
    private String message = "";

    public MapleCSInventoryItem(int uniqueid, int itemid, int sn, short quantity, boolean gift) {
        this.uniqueid = uniqueid;
        this.itemid = itemid;
        this.sn = sn;
        this.quantity = quantity;
        this.gift = gift;
    }

    public boolean isGift() {
        return gift;
    }

    public int getItemId() {
        return itemid;
    }

    public boolean isRing() {
        return isRing;
    }

    public void setRing(boolean is) {
        this.isRing = is;
    }

    public int getSn() {
        return sn;
    }

    public short getQuantity() {
        return quantity;
    }

    public Timestamp getExpire() {
        return expire;
    }

    public void setExpire(Timestamp expire) {
        this.expire = expire;
    }

    public int getUniqueId() {
        return uniqueid;
    }

    public void setSender(String sendername) {
        sender = sendername;
    }

    public void setMessage(String msg) {
        message = msg;
    }

    public String getSender() {
        return sender;
    }

    public String getMessage() {
        return message;
    }

    public IItem toItem() {
        IItem newitem;
        MapleInventoryType type = MapleItemInformationProvider.getInstance().getInventoryType(itemid);
        if (type.equals(MapleInventoryType.EQUIP)) {
            newitem = new Equip(itemid, (byte) -1);
            newitem.setExpiration(expire);
            newitem.setUniqueId(uniqueid);
            ((Equip) newitem).setRing(isRing);
        } else {
            newitem = new Item(itemid, (byte) -1, quantity);
            newitem.setExpiration(expire);
            newitem.setUniqueId(uniqueid);
        }
        return newitem;
    }
}
