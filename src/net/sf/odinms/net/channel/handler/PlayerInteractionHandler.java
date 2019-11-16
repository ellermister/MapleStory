package net.sf.odinms.net.channel.handler;

import java.util.Arrays;
import java.util.Iterator;
import net.sf.odinms.client.IItem;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.messages.CommandProcessor;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.AutobanManager;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.server.MapleTrade;
import net.sf.odinms.server.maps.MapleMapObject;
import net.sf.odinms.server.maps.MapleMapObjectType;
import net.sf.odinms.server.playerinteractions.HiredMerchant;
import net.sf.odinms.server.playerinteractions.IPlayerInteractionManager;
import net.sf.odinms.server.playerinteractions.MaplePlayerShop;
import net.sf.odinms.server.playerinteractions.MaplePlayerShopItem;
import net.sf.odinms.server.playerinteractions.PlayerInteractionManager;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class PlayerInteractionHandler extends AbstractMaplePacketHandler {

private static enum Action {
        CREATE(0x00),
        INVITE(0x02),
        DECLINE(0x03),
        VISIT(0x04),
        CHAT(0x06),
        EXIT(0x0A),//0A
        OPEN(0x0B),//0B
	CASH_ITEM_INTER(0x0D),
        SET_ITEMS(0x0E),//77
        SET_MESO(0x0F),//77
        CONFIRM(0x10),//77
        ADD_ITEM(0x14),//13
        BUY(0x15),//14
        REMOVE_ITEM(0x19), //18
        BAN_PLAYER(0x1A),//19
        PUT_ITEM(0x1F),//1E
        MERCHANT_BUY(0x20),//1F
        TAKE_ITEM_BACK(0x24),//23
        MAINTENANCE_OFF(0x25),//24
        MERCHANT_ORGANIZE(0x26),//25
        CLOSE_MERCHANT(0x27);//26
        final byte code;

        private Action(int code) {
            this.code = (byte) code;
        }

        public byte getCode() {
            return code;
        }
    }
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
    byte mode = slea.readByte();
    if (mode == Action.CREATE.getCode()) {
      byte createType = slea.readByte();
      if (createType == 3) {
        MapleTrade.startTrade(c.getPlayer());
      } else {
        String desc;
        if (c.getPlayer().getChalkboard() != null)
          return;

        if ((createType == 1) || (createType == 2)) {
          if ((c.getPlayer().hasMerchant()) || (c.getPlayer().tempHasItems())) {
            c.getPlayer().dropMessage(1, "您已经开过店了，或者还有物品在弗兰德里那没取回。");
            return;
          }
          desc = slea.readMapleAsciiString();
          String pass = null;
          if (slea.readByte() == 1)
            pass = slea.readMapleAsciiString();

          int type = slea.readByte();
          c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.sendInteractionBox(c.getPlayer()));
        }
        else if ((createType == 4) || (createType == 5))
        {
          if (createType == 4) {
            c.getPlayer().dropMessage(1, "开店请使用雇佣商人");
            return;
          }
          if ((!(c.getPlayer().hasMerchant())) && (c.getPlayer().tempHasItems())) {
            c.getPlayer().dropMessage(1, "请通过弗兰德里拿回物品");
            return;
          }
          if ((c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), 19500.0D, Arrays.asList(new MapleMapObjectType[] { MapleMapObjectType.SHOP, MapleMapObjectType.HIRED_MERCHANT })).size() != 0) || (c.getPlayer().getMapId() < 910000001) || (c.getPlayer().getMapId() > 910000022)) {
            c.getPlayer().dropMessage(1, "不能在这里开设店铺");
            return;
          }
          desc = slea.readMapleAsciiString();
          slea.skip(3);
          int itemId = slea.readInt();

          if (c.getPlayer().haveItem(itemId, 1, false, true)) {
            IPlayerInteractionManager shop;
            if (createType == 4)
              shop = new MaplePlayerShop(c.getPlayer(), itemId, desc);
            else
              shop = new HiredMerchant(c.getPlayer(), itemId, desc);

            c.getPlayer().setInteraction(shop);
            c.getSession().write(MaplePacketCreator.getInteraction(c.getPlayer(), true));
          } else {
            AutobanManager.getInstance().autoban(c, "XSource| Merchant Shop: Attempt to open a shop without the item.");
            return;
          }
        } else {
          System.out.println("Unhandled PLAYER_INTERACTION packet: " + slea.toString());
        }
      }
    } else if (mode == Action.INVITE.getCode()) {
      int otherPlayer = slea.readInt();
      MapleCharacter otherChar = c.getPlayer().getMap().getCharacterById(otherPlayer);
      MapleTrade.inviteTrade(c.getPlayer(), otherChar); } else {
      int oid;
      MapleMapObject ob;
      IPlayerInteractionManager ips = null;
      HiredMerchant merchant;
      if (mode == Action.CASH_ITEM_INTER.getCode()) {
        slea.skip(6);
        oid = slea.readInt();
        ob = c.getPlayer().getMap().getMapObject(oid);
        if ((ob instanceof IPlayerInteractionManager) && (c.getPlayer().getInteraction() == null)) {
          ips = (IPlayerInteractionManager)ob;
          if (ips.getShopType() == 1) {
            merchant = (HiredMerchant)ips;
            if (merchant.isOwner(c.getPlayer())) {
              System.out.println("=======玩家整理雇佣商店========");
              merchant.setOpen(false);
              merchant.broadcast(MaplePacketCreator.shopErrorMessage(13, 1), false);
              merchant.removeAllVisitors(16, 0);
              c.getPlayer().setInteraction(ips);
              c.getSession().write(MaplePacketCreator.getInteraction(c.getPlayer(), false));
              return; }
            if (!(merchant.isOpen())) {
              c.getPlayer().dropMessage(1, "主人正在整理商店物品\r\n请稍后再度光临！");
              return;
            }
          } else if ((ips.getShopType() == 2) &&
            (((MaplePlayerShop)ips).isBanned(c.getPlayer().getName()))) {
            c.getPlayer().dropMessage(1, "你已经被禁止进入此店铺");
            return;
          }

          if (ips.getFreeSlot() == -1) {
            c.getSession().write(MaplePacketCreator.getMiniBoxFull());
            return;
          }
          System.out.println("=======玩家进入雇佣商店========");
          c.getPlayer().setInteraction(ips);
          ips.addVisitor(c.getPlayer());
          c.getSession().write(MaplePacketCreator.getInteraction(c.getPlayer(), false));
        }
      } else if (mode == Action.DECLINE.getCode()) {
        MapleTrade.declineTrade(c.getPlayer());
      } else if (mode == Action.VISIT.getCode())
      {
        if ((c.getPlayer().getTrade() != null) && (c.getPlayer().getTrade().getPartner() != null)) {
          MapleTrade.visitTrade(c.getPlayer(), c.getPlayer().getTrade().getPartner().getChr());
        } else {
         oid = slea.readInt();

          ob = c.getPlayer().getMap().getMapObject(oid);
          if ((ob instanceof IPlayerInteractionManager) && (c.getPlayer().getInteraction() == null)) {
            ips = (IPlayerInteractionManager)ob;
            if (ips.getShopType() == 1) {
              merchant = (HiredMerchant)ips;
              if (merchant.isOwner(c.getPlayer())) {
                System.out.println("=======玩家整理雇佣商店========");
                merchant.setOpen(false);
                merchant.broadcast(MaplePacketCreator.shopErrorMessage(13, 1), false);
                merchant.removeAllVisitors(16, 0);
                c.getPlayer().setInteraction(ips);
                c.getSession().write(MaplePacketCreator.getInteraction(c.getPlayer(), false));
                return; }
              if (!(merchant.isOpen())) {
                c.getPlayer().dropMessage(1, "主人正在整理商店物品\r\n请稍后再度光临！");
                return;
              }
            } else if ((ips.getShopType() == 2) &&
              (((MaplePlayerShop)ips).isBanned(c.getPlayer().getName()))) {
              c.getPlayer().dropMessage(1, "你已经被禁止进入此店铺");
              return;
            }

            if (ips.getFreeSlot() == -1) {
              c.getSession().write(MaplePacketCreator.getMiniBoxFull());
              return;
            }
            System.out.println("=======玩家进入雇佣商店=======");
            c.getPlayer().setInteraction(ips);
            ips.addVisitor(c.getPlayer());
            c.getSession().write(MaplePacketCreator.getInteraction(c.getPlayer(), false)); }
        }
      } else {
        //IPlayerInteractionManager ips;
        if (mode == Action.CHAT.getCode()) {
          if (c.getPlayer().getTrade() != null) {
            c.getPlayer().getTrade().chat(slea.readMapleAsciiString());
          } else if (c.getPlayer().getInteraction() != null) {
            ips = c.getPlayer().getInteraction();
            String message = slea.readMapleAsciiString();
            CommandProcessor.getInstance().processCommand(c, message);
            ips.broadcast(MaplePacketCreator.shopChat(c.getPlayer().getName() + " : " + message, (ips.isOwner(c.getPlayer())) ? 0 : ips.getVisitorSlot(c.getPlayer()) + 1), true); }
        } else {
          boolean save;
          Iterator i$;
          MaplePlayerShopItem items;
          IItem item;
          if (mode == Action.EXIT.getCode()) {
            if (c.getPlayer().getTrade() != null) {
              MapleTrade.cancelTrade(c.getPlayer());
            } else {
              ips = c.getPlayer().getInteraction();
              c.getPlayer().setInteraction(null);
              if (ips != null)
                if (ips.isOwner(c.getPlayer()))
                  if (ips.getShopType() == 2) {
                    save = false;
                    for (i$ = ips.getItems().iterator(); i$.hasNext(); ) { items = (MaplePlayerShopItem)i$.next();
                      if (items.getBundles() > 0) {
                        item = items.getItem();
                        item.setQuantity(items.getBundles());
                        if (MapleInventoryManipulator.addFromDrop(c, item)) {
                          items.setBundles((short)0);
                        } else {
                          save = true;
                          break;
                        }
                      }
                    }
                    ips.removeAllVisitors(3, 1);
                    ips.closeShop(save);
                  } else if (ips.getShopType() == 1) {
                    c.getSession().write(MaplePacketCreator.shopVisitorLeave(0));
                  } else if ((ips.getShopType() == 3) || (ips.getShopType() == 4)) {
                    ips.removeAllVisitors(3, 1);
                  }
                else
                  ips.removeVisitor(c.getPlayer());
            }

           ips.removeVisitor(c.getPlayer());}
          else if (mode == Action.OPEN.getCode()) {
            if ((c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), 19500.0D, Arrays.asList(new MapleMapObjectType[] { MapleMapObjectType.SHOP, MapleMapObjectType.HIRED_MERCHANT })).size() != 0) || (c.getPlayer().getMapId() < 910000001) || (c.getPlayer().getMapId() > 910000022)) {
              c.getPlayer().dropMessage(1, "不能在这里开设店铺");
              return;
            }
            IPlayerInteractionManager shop = c.getPlayer().getInteraction();
            if ((shop != null) && (shop.isOwner(c.getPlayer()))) {
              c.getPlayer().getMap().addMapObject((PlayerInteractionManager)shop);
              if (shop.getShopType() == 1) {
                //HiredMerchant merchant = (HiredMerchant)shop;
                  merchant = (HiredMerchant)shop;
                c.getPlayer().setHasMerchant(true);
                merchant.setOpen(true);
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.spawnHiredMerchant(merchant));
                c.getPlayer().setInteraction(null);
              } else if (shop.getShopType() == 2) {
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.sendInteractionBox(c.getPlayer()));
              }
              slea.readByte();
            }
          } else if (mode == Action.SET_MESO.getCode()) {
            c.getPlayer().getTrade().setMeso(slea.readInt());
          } else if (mode == Action.SET_ITEMS.getCode()) {
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            MapleInventoryType ivType = MapleInventoryType.getByType(slea.readByte());
            //IItem item = c.getPlayer().getInventory(ivType).getItem((byte)slea.readShort());
            item = c.getPlayer().getInventory(ivType).getItem((byte)slea.readShort());
            long checkq = slea.readShort();
            short quantity = (short)(int)checkq;
            byte targetSlot = slea.readByte();
            if ((c.getPlayer().getTrade() != null) && (item != null)) {
              if (checkq > 4000L)
                AutobanManager.getInstance().autoban(c, "XSource| PE while in trade.");

              if (((quantity <= item.getQuantity()) && (quantity >= 0)) || (ii.isThrowingStar(item.getItemId())) || (ii.isBullet(item.getItemId()))) {
                if ((!(c.getChannelServer().allowUndroppablesDrop())) && (ii.isDropRestricted(item.getItemId()))) {
                  c.getSession().write(MaplePacketCreator.enableActions());
                  return;
                }
                IItem tradeItem = item.copy();
                if ((ii.isThrowingStar(item.getItemId())) || (ii.isBullet(item.getItemId()))) {
                  tradeItem.setQuantity(item.getQuantity());
                  MapleInventoryManipulator.removeFromSlot(c, ivType, item.getPosition(), item.getQuantity(), true);
                } else {
                  tradeItem.setQuantity(quantity);
                  MapleInventoryManipulator.removeFromSlot(c, ivType, item.getPosition(), quantity, true);
                }
                tradeItem.setPosition(targetSlot);
                c.getPlayer().getTrade().addItem(tradeItem);
                return;
              }
            }
          } else if (mode == Action.CONFIRM.getCode()) {
            MapleTrade.completeTrade(c.getPlayer());
          } else if ((mode == Action.ADD_ITEM.getCode()) || (mode == Action.PUT_ITEM.getCode())) {
            MapleInventoryType type = MapleInventoryType.getByType(slea.readByte());
            byte slot = (byte)slea.readShort();
            short bundles = slea.readShort();
            short perBundle = slea.readShort();
            int price = slea.readInt();
            IItem ivItem = c.getPlayer().getInventory(type).getItem(slot);
            IItem sellItem = ivItem.copy();
            sellItem.setQuantity(perBundle);
            MaplePlayerShopItem item0 = new MaplePlayerShopItem(sellItem, bundles, price);
            //IItem item0 = new MaplePlayerShopItem(sellItem, bundles, price);
            IPlayerInteractionManager shop = c.getPlayer().getInteraction();
            long checkquantity = bundles * perBundle;
            int checkiquantity = bundles * perBundle;
            short checksmquantity = (short)(bundles * perBundle);
            if ((shop != null) && (shop.isOwner(c.getPlayer())) &&
              (ivItem != null) && (ivItem.getQuantity() >= bundles * perBundle)) {
              if (price < 0) {
                AutobanManager.getInstance().autoban(c, "销售物品出现负数价格.异常数据包编辑.");
                return;
              }
              if ((bundles <= 0) || (perBundle <= 0) || (checkquantity > 20000L) || (checksmquantity < 0) || (checkiquantity < 0) || (checkiquantity > 20000)) {
                AutobanManager.getInstance().autoban(c, "异常物品销售: " + sellItem.getItemId());
                return;
              }
              if ((bundles > 100) || (perBundle > 4000))
                return;

              MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
              if ((ii.isThrowingStar(ivItem.getItemId())) || (ii.isBullet(ivItem.getItemId())))
                MapleInventoryManipulator.removeFromSlot(c, type, slot, ivItem.getQuantity(), true);
              else
                MapleInventoryManipulator.removeFromSlot(c, type, slot, (short)(bundles * perBundle), true);

              if (shop.getItemType() == 4)
                shop.addItem(item0);
              else
                shop.addItem(item0);

              c.getSession().write(MaplePacketCreator.shopItemUpdate(shop));
            }
          }
          else if ((mode == Action.BUY.getCode()) || (mode == Action.MERCHANT_BUY.getCode())) {
            int item1 = slea.readByte();
            short quantity = slea.readShort();
            IPlayerInteractionManager shop = c.getPlayer().getInteraction();
            shop.buy(c, item1, quantity);
            shop.broadcast(MaplePacketCreator.shopItemUpdate(shop), true);
          } else if ((mode == Action.TAKE_ITEM_BACK.getCode()) || (mode == Action.REMOVE_ITEM.getCode())) {
            int slot = slea.readShort();
            IPlayerInteractionManager shop = c.getPlayer().getInteraction();
            if ((shop != null) && (shop.isOwner(c.getPlayer()))) {
              MaplePlayerShopItem item2 = (MaplePlayerShopItem)shop.getItems().get(slot);
              if (item2.getBundles() > 0) {
                IItem iitem = item2.getItem();
                iitem.setQuantity(item2.getBundles());
                MapleInventoryManipulator.addFromDrop(c, iitem);
              }
              shop.removeFromSlot(slot);
              c.getSession().write(MaplePacketCreator.shopItemUpdate(shop));
            }
          } else if (mode == Action.CLOSE_MERCHANT.getCode()) {
            IPlayerInteractionManager merchant1 = c.getPlayer().getInteraction();

            if ((merchant1 != null) && (merchant1.getShopType() == 1) && (merchant1.isOwner(c.getPlayer()))) {
              save = false;

             for (i$ = merchant1.getItems().iterator(); i$.hasNext(); ) { items = (MaplePlayerShopItem)i$.next();

              if (items.getBundles() > 0) {
                  item = items.getItem();
                  item.setQuantity(items.getBundles());
                  if (MapleInventoryManipulator.addFromDrop(c, item)) {
                    items.setBundles((short)0);
                  } else {
                    save = true;
                    break;
                  }
                }
              }

              merchant1.removeAllVisitors(3, 1);
              merchant1.closeShop(save);
              c.getPlayer().setInteraction(null);
              c.getPlayer().setHasMerchant(false);
              c.getPlayer().dropMessage(1, "请通过弗兰德里拿回剩余物品。");
            }
          } else if (mode == Action.MAINTENANCE_OFF.getCode()) {
            HiredMerchant merchant2 = (HiredMerchant)c.getPlayer().getInteraction();
            if ((merchant2 != null) && (merchant2.isOwner(c.getPlayer()))) {
              merchant2.setOpen(true);
              merchant2.tempItemsUpdate(); }
          } else {
            IPlayerInteractionManager imps;
            if (mode == Action.BAN_PLAYER.getCode()) {
              imps = c.getPlayer().getInteraction();
              if ((imps != null) && (imps.isOwner(c.getPlayer())))
                ((MaplePlayerShop)imps).banPlayer(slea.readMapleAsciiString());
            }
            else if (mode == Action.MERCHANT_ORGANIZE.getCode()) {
              imps = c.getPlayer().getInteraction();
              for (int i = 0; i < imps.getItems().size(); ++i)
                if (((MaplePlayerShopItem)imps.getItems().get(i)).getBundles() == 0)
                  imps.removeFromSlot(i);


              c.getSession().write(MaplePacketCreator.shopItemUpdate(imps));
            }
          }
        }
      }
    }
  }
}