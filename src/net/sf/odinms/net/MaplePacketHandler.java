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

package net.sf.odinms.net;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public interface MaplePacketHandler {

    void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c);

    /**
     * This method validates some general state constrains. For example that the
     * Client has to be logged in for this packet. When the method returns false
     * the Client should be disconnected. Further validation based on the
     * content of the packet and disconnecting the client if it's invalid in
     * handlePacket is recommended.
     * 
     * @param c the client
     * @return true if the state of the client is valid to send this packettype
     */
    boolean validateState(MapleClient c);
}