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

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import net.sf.odinms.client.IItem;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.server.constants.InventoryConstants;
import net.sf.odinms.tools.MaplePacketCreator;

/**
 *
 * @author Matze
 */
public class MapleTrade {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MapleTrade.class);
    private MapleTrade partner = null;
    private List<IItem> items = new LinkedList<IItem>();
    private List<IItem> exchangeItems;
    private int meso = 0;
    private int exchangeMeso;
    boolean locked = false;
    private MapleCharacter chr;
    private byte number;

    public MapleTrade(byte number, MapleCharacter c) {
        chr = c;
        this.number = number;
    }

    private int getFee(int meso) {
        int fee = 0;
        if (meso >= 10000000) {
            fee = (int) Math.round(0.04 * meso);
        } else if (meso >= 5000000) {
            fee = (int) Math.round(0.03 * meso);
        } else if (meso >= 1000000) {
            fee = (int) Math.round(0.02 * meso);
        } else if (meso >= 100000) {
            fee = (int) Math.round(0.01 * meso);
        } else if (meso >= 50000) {
            fee = (int) Math.round(0.005 * meso);
        }
        return fee;
    }

    public void lock() {
        locked = true;
        partner.getChr().getClient().getSession().write(MaplePacketCreator.getTradeConfirmation());
    }

    public void complete1() {
        exchangeItems = partner.getItems();
        exchangeMeso = partner.getMeso();
    }

    public void complete2() {
        items.clear();
        meso = 0;
        for (IItem item : exchangeItems) {
            if ((item.getFlag() & InventoryConstants.Items.Flags.KARMA) == InventoryConstants.Items.Flags.KARMA)
                item.setFlag((byte) (item.getFlag() ^ InventoryConstants.Items.Flags.KARMA));
            MapleInventoryManipulator.addFromDrop(chr.getClient(), item, false);
        }
        if (exchangeMeso > 0) {
            chr.gainMeso(exchangeMeso - getFee(exchangeMeso), false, true, false);
        }
        exchangeMeso = 0;
        if (exchangeItems != null) {
            exchangeItems.clear();
        }
        chr.getClient().getSession().write(MaplePacketCreator.getTradeCompletion(number));
    }

    public void cancel() {
        // return the things
        StringBuilder logInfo = new StringBuilder("Canceled trade ");
        if (partner != null) {
            logInfo.append("with ");
            logInfo.append(partner.getChr().getName());
        }
        logInfo.append(". ");
        logInfo.append(chr.getName());
        logInfo.append(" received the item.");
        for (IItem item : items) {
            MapleInventoryManipulator.addFromDrop(chr.getClient(), item, logInfo.toString(), false);
        }
        if (meso > 0) {
            chr.gainMeso(meso, false, true, false);
        // just to be on the safe side...
        }
        meso = 0;
        if (items != null) {
            items.clear();
        }
        exchangeMeso = 0;
        if (exchangeItems != null) {
            exchangeItems.clear();
        }
        chr.getClient().getSession().write(MaplePacketCreator.getTradeCancel(number));
    }

    public boolean isLocked() {
        return locked;
    }

    public int getMeso() {
        return meso;
    }

    public void setMeso(int meso) {
        if (locked) {
            throw new RuntimeException("Trade is locked.");
        }
        if (meso < 0) {
            log.info("[h4x] {} Trying to trade < 0 meso", chr.getName());
            return;
        }
        if (chr.getMeso() >= meso) {
            if ((this.meso + meso) < 0) {
                if (chr.getMeso() >= (2147483647 - meso)) {
                    meso = (2147483647 - meso);
                    chr.getClient().getSession().write(MaplePacketCreator.serverNotice(1, "Only " + meso + " mesos were added to the trade because adding more would cause a technical glitch."));
                    if (partner != null) {
                        partner.getChr().getClient().getSession().write(MaplePacketCreator.serverNotice(1, "Only " + meso + " mesos were added to the trade because adding more would cause a technical glitch."));
                    }

                }
            }
            chr.gainMeso(-meso, false, true, false);
            this.meso += meso;
            chr.getClient().getSession().write(MaplePacketCreator.getTradeMesoSet((byte) 0, this.meso));
            if (partner != null) {
                partner.getChr().getClient().getSession().write(MaplePacketCreator.getTradeMesoSet((byte) 1, this.meso));
            }
        } else {
            AutobanManager.getInstance().addPoints(chr.getClient(), 1000, 0, "Trying to trade more mesos than in possession");
            log.warn("Some idiot named " + chr.getName() + " is trying to trade more meso's than possessed..");
        }
    }

    public void addItem(IItem item) {
        items.add(item);
        chr.getClient().getSession().write(MaplePacketCreator.getTradeItemAdd((byte) 0, item));
        if (partner != null) {
            partner.getChr().getClient().getSession().write(MaplePacketCreator.getTradeItemAdd((byte) 1, item));
        }
    }

    public void chat(String message) {
        chr.getClient().getSession().write(MaplePacketCreator.getPlayerShopChat(chr, message, true));
        if (partner != null) {
            partner.getChr().getClient().getSession().write(MaplePacketCreator.getPlayerShopChat(chr, message, false));
        }
    }

    public MapleTrade getPartner() {
        return partner;
    }

    public void setPartner(MapleTrade partner) {
        if (locked) {
            throw new RuntimeException("Trade is locked.");
        }
        this.partner = partner;
    }
//	private void broadcast(MaplePacket packet) {
//		chr.getClient().getSession().write(packet);
//		if (partner != null)
//			partner.getChr().getClient().getSession().write(packet);
//	}
    public MapleCharacter getChr() {
        return chr;
    }

    public List<IItem> getItems() {
        return new LinkedList<IItem>(items);
    }

    public boolean fitsInInventory() {
        MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
        Map<MapleInventoryType, Integer> neededSlots = new LinkedHashMap<MapleInventoryType, Integer>();
        for (IItem item : exchangeItems) {
            MapleInventoryType type = mii.getInventoryType(item.getItemId());
            if (neededSlots.get(type) == null) {
                neededSlots.put(type, 1);
            } else {
                neededSlots.put(type, neededSlots.get(type) + 1);
            }
        }
        for (Map.Entry<MapleInventoryType, Integer> entry : neededSlots.entrySet()) {
            if (chr.getInventory(entry.getKey()).isFull(entry.getValue() - 1)) {
                return false;
            }
        }
        return true;
    }

    public static void completeTrade(MapleCharacter c) {
        c.getTrade().lock();
        MapleTrade local = c.getTrade();
        MapleTrade partner = local.getPartner();
        if (partner.isLocked()) {
            local.complete1();
            partner.complete1();
            // check for full inventories
            if (!local.fitsInInventory() || !partner.fitsInInventory()) {
                cancelTrade(c);
                c.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "There is not enough inventory space to complete the trade."));
                partner.getChr().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "There is not enough inventory space to complete the trade."));
                return;
            }
            local.complete2();
            partner.complete2();
            partner.getChr().setTrade(null);
            c.setTrade(null);
        }
    }

    public static void cancelTrade(MapleCharacter c) {
        c.getTrade().cancel();
        if (c.getTrade().getPartner() != null) {
            c.getTrade().getPartner().cancel();
            c.getTrade().getPartner().getChr().setTrade(null);
        }
        c.setTrade(null);
    }

    public static void startTrade(MapleCharacter c) {
        if (c.getTrade() == null) {
            c.setTrade(new MapleTrade((byte) 0, c));
            c.getClient().getSession().write(MaplePacketCreator.getTradeStart(c.getClient(), c.getTrade(), (byte) 0));
        } else {
            c.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "现在正忙,请稍后再试"));
        }
    }

    public static void inviteTrade(MapleCharacter c1, MapleCharacter c2) {
        if (c2 != null && c2.getTrade() == null) {
            c2.setTrade(new MapleTrade((byte) 1, c2));
            c2.getTrade().setPartner(c1.getTrade());
            c1.getTrade().setPartner(c2.getTrade());
            c2.getClient().getSession().write(MaplePacketCreator.getTradeInvite(c1));
        } else {
            c1.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "正在做别的事情"));
            cancelTrade(c1);
        }
    }

    public static void visitTrade(MapleCharacter c1, MapleCharacter c2) {
        if (c1.getTrade() != null && c1.getTrade().getPartner() == c2.getTrade() &&
                c2.getTrade() != null && c2.getTrade().getPartner() == c1.getTrade()) {
            if (c1.getMap() != c2.getMap()) {
                c1.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "You are not in the same map as the trader."));
                c1.getClient().getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            c2.getClient().getSession().write(
                    MaplePacketCreator.getTradePartnerAdd(c1));
            c1.getClient().getSession().write(MaplePacketCreator.getTradeStart(c1.getClient(), c1.getTrade(), (byte) 1));
        } else {
            c1.getClient().getSession().write(MaplePacketCreator.serverNotice(5, "The other player has already closed the trade"));
        }
    }

    public static void declineTrade(MapleCharacter c) {
        MapleTrade trade = c.getTrade();
        if (trade != null) {
            if (trade.getPartner() != null) {
                MapleCharacter other = trade.getPartner().getChr();
                other.getTrade().cancel();
                other.setTrade(null);
                other.getClient().getSession().write(
                        MaplePacketCreator.serverNotice(5, c.getName() + " 拒绝了你的交易邀请"));
            }
            trade.cancel();
            c.setTrade(null);
        }
    }
}