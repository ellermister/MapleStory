/*
	添加家族成员的程序
*/
package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author
 */
public final class FamilyAddHandler extends AbstractMaplePacketHandler {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(FamilyAddHandler.class);

    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        System.out.println(slea.toString());
        String toAdd = slea.readMapleAsciiString();
        MapleCharacter addChr = c.getChannelServer().getPlayerStorage().getCharacterByName(toAdd);
        if (addChr != null) {
            addChr.getClient().getSession().write(MaplePacketCreator.sendFamilyInvite(c.getPlayer().getId(), toAdd));
            c.getPlayer().dropMessage("邀请已发送。");
        } else {
            c.getPlayer().dropMessage("找不到此玩家。");
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }
}