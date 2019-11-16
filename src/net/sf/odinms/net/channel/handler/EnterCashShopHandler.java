/*
 * 进入商场处理程序
*/
package net.sf.odinms.net.channel.handler;

import java.rmi.RemoteException;
import net.sf.odinms.client.MapleBuffStat;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.net.world.remote.WorldChannelInterface;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class EnterCashShopHandler extends AbstractMaplePacketHandler
{
  public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
  {
    if (c.getChannelServer().allowCashshop()) {
      if (c.getPlayer().getBuffedValue(MapleBuffStat.SUMMON) != null)
        c.getPlayer().cancelEffectFromBuffStat(MapleBuffStat.SUMMON);

      if (c.getPlayer().getInteraction() != null)
        c.getPlayer().getInteraction().removeVisitor(c.getPlayer());
      try
      {
        WorldChannelInterface wci = ChannelServer.getInstance(c.getChannel()).getWorldInterface();
        wci.addBuffsToStorage(c.getPlayer().getId(), c.getPlayer().getAllBuffs());
      } catch (RemoteException e) {
        c.getChannelServer().reconnectWorld();
      }
      c.getPlayer().getMap().removePlayer(c.getPlayer());
      c.getSession().write(MaplePacketCreator.warpCS(c));
      c.getPlayer().setInCS(true);
      c.getSession().write(MaplePacketCreator.sendWishList(c.getPlayer().getId()));
      c.getSession().write(MaplePacketCreator.showNXMapleTokens(c.getPlayer()));
      c.getSession().write(MaplePacketCreator.getCSInventory(c.getPlayer()));
      c.getSession().write(MaplePacketCreator.getCSGifts(c.getPlayer()));
      c.getPlayer().saveToDB(true);
    } else {
      c.getSession().write(MaplePacketCreator.sendBlockedMessage(3));
      c.getSession().write(MaplePacketCreator.enableActions());
    }
  }
}