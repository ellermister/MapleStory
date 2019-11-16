package net.sf.odinms.server.cherryms;

import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.server.maps.MapleMapFactory;

public class CherryMScustomEventFactory
{
  private static CherryMScustomEventFactory instance = null;
  private static boolean CANLOG;

  public boolean isCANLOG()
  {
    return CANLOG;
  }

  public void setCANLOG(boolean CANLOG) {
    CANLOG = CANLOG;
  }

  public static CherryMScustomEventFactory getInstance()
  {
    if (instance == null)
      instance = new CherryMScustomEventFactory();

    return instance;
  }
}

 /* public CherryMSLottery getCherryMSLottery()      //赌博关联2
  {
    return CherryMSLotteryImpl.getInstance(); }

  public CherryMSLottery getCherryMSLottery(ChannelServer cserv, MapleMapFactory mapFactory) {
    return CherryMSLotteryImpl.getInstance(cserv, mapFactory);
  }
}  */