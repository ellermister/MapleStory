/*
//抽象冒险岛包
*/

package net.sf.odinms.net;

import net.sf.odinms.client.MapleClient;

public abstract class AbstractMaplePacketHandler implements MaplePacketHandler {

    @Override
    public boolean validateState(MapleClient c) {
        return c.isLoggedIn();
    }
}