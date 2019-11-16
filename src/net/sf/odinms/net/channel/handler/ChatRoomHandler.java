/*
	聊天服务器请求处理程序
*/

package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author
 */
public class ChatRoomHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (c.getChannelServer().allowCashshop()) {
            c.getPlayer().dropMessage(1, "聊天服务器正在建设中");
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }
}