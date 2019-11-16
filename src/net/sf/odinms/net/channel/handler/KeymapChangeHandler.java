/*
//键盘布局
*/
package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleKeyBinding;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class KeymapChangeHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int mode = slea.readInt();
        if (mode == 0) {
            int numChanges = slea.readInt();
            for (int i = 0; i < numChanges; i++) {
                int key = slea.readInt();
                int type = slea.readByte();
                int action = slea.readInt();
                MapleKeyBinding newbinding = new MapleKeyBinding(type, action);
                c.getPlayer().changeKeybinding(key, newbinding);
            }
        } else if (mode == 1) {
            c.getPlayer().setAutoHpPot(slea.readInt());
        } else if (mode == 2) {
            c.getPlayer().setAutoMpPot(slea.readInt());
        }
    }
}