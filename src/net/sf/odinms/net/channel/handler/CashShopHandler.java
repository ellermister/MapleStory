package net.sf.odinms.net.channel.handler;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.sql.Timestamp;
import net.sf.odinms.client.IItem;
import net.sf.odinms.client.MapleCSInventoryItem;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleInventory;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.MaplePet;
import net.sf.odinms.client.MapleRing;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.AutobanManager;
import net.sf.odinms.server.CashItemFactory;
import net.sf.odinms.server.CashItemInfo;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Acrylic (Terry Han)
 */
public class CashShopHandler extends AbstractMaplePacketHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(CashShopHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int action = slea.readByte();
        int accountId = c.getAccID();
        if (action == 3) { //购买物品
            int useNX = slea.readByte();
           // int Meso = slea.readByte();
            int snCS = slea.readInt();
            CashItemInfo item = CashItemFactory.getItem(snCS);
            if (c.getPlayer().getCSPoints(useNX) >= item.getPrice()) {
                c.getPlayer().modifyCSPoints(useNX, -item.getPrice());
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
                AutobanManager.getInstance().autoban(c, "试图购买现金物品，但是没有足够的点券。");
                return;
            }
              if (item.getItemId() >= 5000000 && item.getItemId() <= 5000100) {
                int petId = MaplePet.createPet(item.getItemId(), c.getPlayer());
                if (petId == -1) {
                    return;
                }
                MapleCSInventoryItem citem = new MapleCSInventoryItem(petId, item.getItemId(), snCS, (short) item.getCount(), false);
                long period = 90;
                Timestamp ExpirationDate = new Timestamp(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
                citem.setExpire(ExpirationDate);
                c.getPlayer().getCSInventory().addItem(citem);
                c.getSession().write(MaplePacketCreator.enableCSorMTS());
                c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem));
            } else {
                MapleCSInventoryItem citem = new MapleCSInventoryItem(MapleCharacter.getNextUniqueId(), item.getItemId(), snCS, (short) item.getCount(), false);
                long period = item.getPeriod();
                Timestamp ExpirationDate = new Timestamp(System.currentTimeMillis());
                ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (period * 24 * 60 * 60)) * 1000);
                if (period == 0) {
                    ExpirationDate = null;
                }
                if (item.getItemId() == 5211047 || item.getItemId() == 5360014) {//双倍经验值卡三小时权
                    ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (3 * 60 * 60)) * 1000);
                }
               /*if (item.getItemId() == 1112906 && item.getItemId() == 1112905) {//心心祝福戒指
                        ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (period * 24 * 60 * 60)) * 1000);
                } */
               if (item.getItemId() == 5210002 && item.getItemId() == 5210004) { //双倍经验卡一天(晚)(早)
                ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (6 * 60 * 60)) * 1000);
                } 
                citem.setExpire(ExpirationDate);
                c.getPlayer().getCSInventory().addItem(citem);
                c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem));
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions()); 
        } else if (action == 4) { //赠送礼物
            int snCS = slea.readInt();
            int type = slea.readByte();
            String recipient = slea.readMapleAsciiString();
            String message = slea.readMapleAsciiString();
            CashItemInfo item = CashItemFactory.getItem(snCS);
            if (c.getPlayer().getCSPoints(type) >= item.getPrice()) {
                if (MapleCharacter.getAccountIdByName(recipient) != -1) {
                    if (MapleCharacter.getAccountIdByName(recipient) == c.getPlayer().getAccountID()) {
                        c.getSession().write(MaplePacketCreator.showCannotToMe());
                    } else {
                        c.getPlayer().modifyCSPoints(type, -item.getPrice());
                        MapleCSInventoryItem gift = new MapleCSInventoryItem(0, item.getItemId(), snCS, (short) item.getCount(), true);
                        gift.setSender(c.getPlayer().getName());
                        gift.setMessage(message);
                        gift.setExpire(new Timestamp(((System.currentTimeMillis() / 1000) + (item.getPeriod() * 24 * 60 * 60)) * 1000));
                        try {
                            Connection con = DatabaseConnection.getConnection();
                            PreparedStatement ps = con.prepareStatement("INSERT INTO csgifts (accountid, itemid, sn, quantity, sender, message, expiredate) VALUES (?, ?, ?, ?, ?, ?, ?)");
                            ps.setInt(1, MapleCharacter.getAccountIdByName(recipient));
                            ps.setInt(2, item.getItemId());
                            ps.setInt(3, snCS);
                            ps.setInt(4, item.getCount());
                            ps.setString(5, c.getPlayer().getName());
                            ps.setString(6, message);
                            Timestamp ExpirationDate = new Timestamp(System.currentTimeMillis());
                            if ((item.getItemId() >= 5000000 && item.getItemId() <= 5000100) || item.getItemId() == 1112906 || item.getItemId() == 1112905) {
                                ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (90 * 24 * 60 * 60)) * 1000); 
                            } else if (item.getItemId() == 5211047 || item.getItemId() == 5360014) {
                                ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (3 * 60 * 60)) * 1000);
                            } else if (item.getPeriod() != 0) {
                                ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (item.getPeriod() * 24 * 60 * 60)) * 1000);
                            } else if (item.getItemId() == 5210002 || item.getItemId() == 5210004) { //双倍经验卡一天(晚)(早) 
                                ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (6 * 60 * 60)) * 1000);  
                            } else {
                                ExpirationDate = null;
                            }
                            ps.setTimestamp(7, ExpirationDate);
                            ps.executeUpdate();
                            ps.close();
                        } catch (SQLException se) {
                            log.error("Error saving gift to database", se);
                        }
                        c.getSession().write(MaplePacketCreator.getGiftFinish(c.getPlayer().getName(), item.getItemId(), (short) item.getCount()));
                    }
                } else {
                    c.getSession().write(MaplePacketCreator.showCheckName());
                }
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
                AutobanManager.getInstance().autoban(c, "试图购买现金物品，但是没有足够的点券。");
                return;
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (action == 5) {
            try {
                Connection con = DatabaseConnection.getConnection();
                PreparedStatement ps = con.prepareStatement("DELETE FROM wishlist WHERE charid = ?");
                ps.setInt(1, c.getPlayer().getId());
                ps.executeUpdate();
                ps.close();

                int i = 10;
                while (i > 0) {
                    int sn = slea.readInt();
                    if (sn != 0) {
                        ps = con.prepareStatement("INSERT INTO wishlist(charid, sn) VALUES(?, ?) ");
                        ps.setInt(1, c.getPlayer().getId());
                        ps.setInt(2, sn);
                        ps.executeUpdate();
                        ps.close();
                    }
                    i--;
                }
            } catch (SQLException se) {
                log.error("Wishlist SQL Error", se);
            }
            c.getSession().write(MaplePacketCreator.updateWishList(c.getPlayer().getId()));
        } else if (action == 6) { //扩充仓库
            int useNX = slea.readByte();
            byte add = slea.readByte();
            if (add == 0) {
                byte type = slea.readByte();
                MapleInventoryType invtype = MapleInventoryType.getByType(type);
                byte slots = c.getPlayer().getInventory(invtype).getSlots();
                if (c.getPlayer().getCSPoints(useNX) < 600) {
                    c.getSession().write(MaplePacketCreator.enableCSorMTS());
                    c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                if (slots <= 92) {
                    c.getPlayer().modifyCSPoints(useNX, -600);
                    c.getPlayer().getInventory(invtype).setSlotLimit((byte) (slots + 4));
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "扩充成功."));
                } else {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "您无法继续进行扩充."));
                }
            } else if (add == 1) {
                int sn = slea.readInt();
                byte type = 1;
                switch (sn) {
                    case 50200018:
                        type = 1;
                        break;
                    case 50200019:
                        type = 2;
                        break;
                    case 50200020:
                        type = 3;
                        break;
                    case 50200021:
                        type = 4;
                        break;
                    case 50200043:
                        type = 5;
                        break;
                }
                MapleInventoryType invtype = MapleInventoryType.getByType(type);
                byte slots = c.getPlayer().getInventory(invtype).getSlots();
                if (c.getPlayer().getCSPoints(useNX) < 1100) {
                    c.getSession().write(MaplePacketCreator.enableCSorMTS());
                    c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                if (slots <= 86) {
                    c.getPlayer().modifyCSPoints(useNX, -1100);
                    c.getPlayer().getInventory(invtype).setSlotLimit((byte) (slots + 8));
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "扩充成功."));
                } else {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "您无法继续进行扩充."));
                }
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (action == 0x0D) { //商城=>包裹
            int uniqueid = slea.readInt(); //csid.. not like we need it anyways
            slea.readInt();//0
            slea.readByte();//0
            byte type = slea.readByte();
            byte unknown = slea.readByte();
            IItem item = c.getPlayer().getCSInventory().getItem(uniqueid).toItem();
            if (item != null) {
                byte slot = c.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(item.getItemId())).getNextFreeSlot();
                if (slot == -1) {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "您的包裹已满."));
                } else {
                    c.getPlayer().getInventory(MapleItemInformationProvider.getInstance().getInventoryType(item.getItemId())).addItem(item);
                    c.getPlayer().getCSInventory().removeItem(uniqueid);
                    c.getSession().write(MaplePacketCreator.transferFromCSToInv(item, slot));
                }
            } else {
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (action == 0x0E) { //包裹=>商城
            int uniqueid = slea.readInt();
            slea.readInt();//0
            slea.readByte(); //1?

            IItem item = null;
            for (MapleInventory inventory : c.getPlayer().getAllInventories()) {
                item = inventory.findByUniqueId(uniqueid);
                if (item != null) {

                    MapleCSInventoryItem citem = new MapleCSInventoryItem(item.getUniqueId(), item.getItemId(), CashItemFactory.getSnFromId(item.getItemId()), item.getQuantity(), false);
                    citem.setExpire(item.getExpiration());
                    c.getPlayer().getCSInventory().addItem(citem);

                    inventory.removeItem(item.getPosition(), item.getQuantity(), false);
                    c.getSession().write(MaplePacketCreator.transferFromInvToCS(c.getPlayer(), citem));
                    break;
                }
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (action == 0x21) { //购买任务物品
            int snCS = slea.readInt();
            CashItemInfo item = CashItemFactory.getItem(snCS);
            if (c.getPlayer().getMeso() >= item.getPrice()) {
                c.getPlayer().gainMeso(-item.getPrice(), false);
                MapleInventoryManipulator.addById(c, item.getItemId(), (short) item.getCount(), "购买了任务物品");
                MapleInventory etcInventory = c.getPlayer().getInventory(MapleInventoryType.ETC);
                byte slot = etcInventory.findById(item.getItemId()).getPosition();
                c.getSession().write(MaplePacketCreator.showBoughtCSQuestItem(slot, item.getItemId()));
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        } else if (action == 0x1F) { //购买礼包
            int type = slea.readByte();
            int snCS = slea.readInt();
            CashItemInfo cashPackage = CashItemFactory.getItem(snCS);
            if (c.getPlayer().getCSPoints(type) >= cashPackage.getPrice()) {
                c.getPlayer().modifyCSPoints(type, -cashPackage.getPrice());
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            for (CashItemInfo item : CashItemFactory.getPackageItems(cashPackage.getItemId())) {
                if (item.getItemId() >= 5000000 && item.getItemId() <= 5000100) {
                    int petId = MaplePet.createPet(item.getItemId(), c.getPlayer());
                    if (petId == -1) {
                        return;
                    }
                    MapleCSInventoryItem citem = new MapleCSInventoryItem(petId, item.getItemId(), snCS, (short) item.getCount(), false);
                    long period = 90;
                    Timestamp ExpirationDate = new Timestamp(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
                    citem.setExpire(ExpirationDate);
                    c.getPlayer().getCSInventory().addItem(citem);
                    c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem));
                } else {
                    MapleCSInventoryItem citem = new MapleCSInventoryItem(MapleCharacter.getNextUniqueId(), item.getItemId(), snCS, (short) item.getCount(), false);
                    long period = item.getPeriod();
                    Timestamp ExpirationDate = new Timestamp(System.currentTimeMillis());
                    ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (period * 24 * 60 * 60)) * 1000);
                    if (period == 0) {
                        ExpirationDate = null;
                    }
                    if (item.getItemId() == 5211047 || item.getItemId() == 5360014) {      //双倍经验值卡三小时权
                        ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (3 * 60 * 60)) * 1000);
                    }
                    if (item.getItemId() == 1112906 && item.getItemId() == 1112905) {        //心心祝福戒指
                        ExpirationDate = new Timestamp(((System.currentTimeMillis() / 1000) + (period * 24 * 60 * 60)) * 1000);
                    }
                    citem.setExpire(ExpirationDate);
                    c.getPlayer().getCSInventory().addItem(citem);
                    c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem));
                }
                c.getPlayer().getCSInventory().saveToDB();
            }
            c.getPlayer().saveToDB(true);
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
            

            
           } else if (action == 0x1C) { //换购...........089ok
            long uniqueid = slea.readLong(); //这里得到的是在csinventory表的uniqueid
            int itemid = getItemidformUniqueid(uniqueid); //通过uniqueid获得itemid
            if (itemid == 0) {
                //log.warn("换购获得的itemid为0");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            //log.warn("换购获得的itemid为"+itemid+"");
            int snCS = CashItemFactory.getSnFromId(itemid); //通过通过itemid获得SN
            CashItemInfo item = CashItemFactory.getItem(snCS);
            int Money =  item.getPrice() / 10 * 3 ; //获得的抵用券价格是原价*0.3

            c.getPlayer().getCSInventory().removeItem((int)uniqueid);
            c.getPlayer().getCSInventory().saveToDB();
            c.getPlayer().modifyCSPoints(1, Money);
            c.getSession().write(MaplePacketCreator.getCSInventory(c.getPlayer()));
            //c.getSession().write(MaplePacketCreator.serverNotice(1, "现金道具换购成功。\r\n(增加"+Money+"抵用券)"));
            c.getSession().write(MaplePacketCreator.serverNotice(1, "因一些不法份子.利用这个系统进行刷点卷..所以就永远封了.这个系统...."));
            c.getSession().write(MaplePacketCreator.enableActions());
   
    
     } else if (action == 0x1D) { //购买结婚戒指相关
            int snCS = slea.readInt();
            String recipient = slea.readMapleAsciiString();
            String message = slea.readMapleAsciiString();    
            CashItemInfo item = CashItemFactory.getItem(snCS);
            int tempid = MapleCharacter.getIdByName(recipient);
    try {
        int cid = c.getPlayer().getId();
        int temp = 0;
        Connection con1 = DatabaseConnection.getConnection();
        PreparedStatement limitCheck = con1.prepareStatement("SELECT * FROM rings WHERE partnerChrId = " + cid + "|| partnerChrId =" + tempid);
        ResultSet rs = limitCheck.executeQuery();
        if (rs.next())
        {
          temp = rs.getInt("id");
        }
      /*  if (temp > 0) {
          rs.close();
          limitCheck.close();
            c.getPlayer().getCSInventory().saveToDB();
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
            c.getSession().write(MaplePacketCreator.serverNotice(1, "您或您的同伴已经有一个戒指了")); 
            c.getSession().write(MaplePacketCreator.enableActions());
          return; 
        }*/
        rs.close();
        limitCheck.close();
      } catch (SQLException se) {
        log.error("Error saving gift to database", se);
      }

      if (c.getPlayer().getCSPoints(0) >= item.getPrice()) {
        if (MapleCharacter.getAccountIdByName(recipient) != -1) {
          c.getPlayer().modifyCSPoints(0, -item.getPrice());
          MapleCSInventoryItem gift = new MapleCSInventoryItem(0, item.getItemId(), snCS, (short)item.getCount(), true);
          MapleCSInventoryItem citem = new MapleCSInventoryItem(MapleCharacter.getNextUniqueId(), item.getItemId(), snCS, (short)item.getCount(), false);
          gift.setSender(c.getPlayer().getName());
          gift.setMessage(message);
                    gift.setExpire(new Timestamp(((System.currentTimeMillis() / 1000) + (item.getPeriod() * 24 * 60 * 60)) * 1000));
                    try {
                        Connection con = DatabaseConnection.getConnection();
                        PreparedStatement ps = con.prepareStatement("INSERT INTO csgifts (accountid, itemid, sn, quantity, sender, message, expiredate) VALUES (?, ?, ?, ?, ?, ?, ?)");
                        ps.setInt(1, MapleCharacter.getAccountIdByName(recipient));
                        ps.setInt(2, item.getItemId());
                        ps.setInt(3, snCS);
                        ps.setInt(4, item.getCount());
                        ps.setString(5, c.getPlayer().getName());
                        ps.setString(6, message);
                        ps.setTimestamp(7, null);
                        ps.executeUpdate();
                        ps.close();
                    } catch (SQLException se) {
                        log.error("Error saving gift to database", se);
                    }
                    c.getPlayer().getCSInventory().addItem(citem);
                    c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem));
                    MapleRing.createRing(MapleCharacter.getNextUniqueId(), MapleCharacter.getNextUniqueId() + 1, c.getPlayer().getId(), MapleCharacter.getIdByName(recipient), c.getPlayer().getName(), recipient);
          } else {
            c.getSession().write(MaplePacketCreator.serverNotice(1, "未登陆的角色"));
          }
          } else {
            c.getSession().write(MaplePacketCreator.serverNotice(1, "您没有足够的点券用来购买."));
            c.getSession().write(MaplePacketCreator.enableActions());
         return;
      }
            c.getPlayer().getCSInventory().saveToDB();
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions()); 
              } else if (action == 0x24) { //购买挚友戒指相关
        int snCS = slea.readInt();
      String recipient = slea.readMapleAsciiString();
      String message = slea.readMapleAsciiString();
      CashItemInfo item = CashItemFactory.getItem(snCS);
      int tempid = MapleCharacter.getIdByName(recipient);
      try {
        int cid = c.getPlayer().getId();
        int temp = 0;
        Connection con1 = DatabaseConnection.getConnection();
        PreparedStatement limitCheck = con1.prepareStatement("SELECT * FROM rings WHERE partnerChrId = " + cid + "|| partnerChrId =" + tempid);
        ResultSet rs = limitCheck.executeQuery();
        if (rs.next())
        {
          temp = rs.getInt("id");
        }
        if (temp > 0) {
          rs.close();
          limitCheck.close();
            c.getPlayer().getCSInventory().saveToDB();
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
            c.getSession().write(MaplePacketCreator.serverNotice(1, "您或您的同伴已经有一个戒指了"));
          //c.getSession().write(MaplePacketCreator.enableActions());
          return;
        } 
        rs.close();
        limitCheck.close();
      } catch (SQLException se) {
        log.error("Error saving gift to database", se);
      }

        if (c.getPlayer().getCSPoints(0) >= item.getPrice()) {
        if (MapleCharacter.getAccountIdByName(recipient) != -1) {
          c.getPlayer().modifyCSPoints(0, -item.getPrice());
          MapleCSInventoryItem gift = new MapleCSInventoryItem(0, item.getItemId(), snCS, (short)item.getCount(), true);
          MapleCSInventoryItem citem = new MapleCSInventoryItem(MapleCharacter.getNextUniqueId(), item.getItemId(), snCS, (short)item.getCount(), false);
          gift.setSender(c.getPlayer().getName());
          gift.setMessage(message);
          gift.setExpire(new Timestamp((System.currentTimeMillis() / 1000L + item.getPeriod() * 24 * 60 * 60) * 1000L));
          try {
                        Connection con = DatabaseConnection.getConnection();
                        PreparedStatement ps = con.prepareStatement("INSERT INTO csgifts (accountid, itemid, sn, quantity, sender, message, expiredate) VALUES (?, ?, ?, ?, ?, ?, ?)");
                        ps.setInt(1, MapleCharacter.getAccountIdByName(recipient));
                        ps.setInt(2, item.getItemId());
                        ps.setInt(3, snCS);
                        ps.setInt(4, item.getCount());
                        ps.setString(5, c.getPlayer().getName());
                        ps.setString(6, message);
                        ps.setTimestamp(7, null);
                        ps.executeUpdate();
                        ps.close();
                    } catch (SQLException se) {
                        log.error("Error saving gift to database", se);
                    }
                    c.getPlayer().getCSInventory().addItem(citem);
                    c.getSession().write(MaplePacketCreator.showBoughtCSItem(c, citem));
                    MapleRing.createRing(MapleCharacter.getNextUniqueId(), MapleCharacter.getNextUniqueId() + 1, c.getPlayer().getId(), MapleCharacter.getIdByName(recipient), c.getPlayer().getName(), recipient);
           } else {
                    c.getSession().write(MaplePacketCreator.serverNotice(1, "未登陆的角色"));
                }
           } else {
            c.getSession().write(MaplePacketCreator.serverNotice(1, "您没有足够的点券用来购买."));
            c.getSession().write(MaplePacketCreator.enableActions());
        return;
      }
            c.getPlayer().getCSInventory().saveToDB();
            c.getSession().write(MaplePacketCreator.enableCSorMTS());
            c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
            c.getSession().write(MaplePacketCreator.enableActions());
        }
        c.getPlayer().getCSInventory().saveToDB();
        c.getSession().write(MaplePacketCreator.enableCSorMTS());
        c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public int getItemidformUniqueid(long Uniqueid) { //csinventory表的uniqueid
        int itemid = 0;
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement limitCheck = con.prepareStatement("SELECT * FROM csinventory WHERE uniqueid =" + Uniqueid + "");
            ResultSet rs = limitCheck.executeQuery();
            if (rs.next()) {
                itemid = rs.getInt("itemid");
            }
            limitCheck.close();
            rs.close();
        } catch (SQLException ex) {
        }
        return itemid;
    }
}