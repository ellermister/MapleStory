package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class PlayerUpdateHandler extends AbstractMaplePacketHandler{

@Override
public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c){
//MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            c.getPlayer().saveToDB(true);
    }
}