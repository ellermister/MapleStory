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

package net.sf.odinms.net.mina;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.MaplePacket;
import net.sf.odinms.tools.HexTool;
import net.sf.odinms.tools.MapleCustomEncryption;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoSession;
import org.apache.mina.filter.codec.ProtocolEncoder;
import org.apache.mina.filter.codec.ProtocolEncoderOutput;

public class MaplePacketEncoder implements ProtocolEncoder {
    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MaplePacketEncoder.class);

    public synchronized void encode(IoSession session, Object message, ProtocolEncoderOutput out) throws Exception {
        MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);
        if (client != null) {
            synchronized (client.getSendCrypto()) {
                byte[] input = ((MaplePacket) message).getBytes();
                if (input.length <= 30000) {
                   // log.info(HexTool.toString(input));
                } else {
                    //log.info(HexTool.toString(new byte[]{input[0],input[1]})+" ...");
                }
                byte[] unencrypted = new byte[input.length];
                System.arraycopy(input, 0, unencrypted, 0, input.length);
                byte[] ret = new byte[unencrypted.length + 4];
                byte[] header = client.getSendCrypto().getPacketHeader(unencrypted.length);
                MapleCustomEncryption.encryptData(unencrypted);
                client.getSendCrypto().crypt(unencrypted);
                System.arraycopy(header, 0, ret, 0, 4);
                System.arraycopy(unencrypted, 0, ret, 4, unencrypted.length);
                ByteBuffer out_buffer = ByteBuffer.wrap(ret);
                out.write(out_buffer);
            }
        } else {
            out.write(ByteBuffer.wrap(((MaplePacket) message).getBytes()));
        }
    }

    public void dispose(IoSession session) throws Exception {
    }
}