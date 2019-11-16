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

package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.scripting.npc.NPCScriptManager;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;
import org.apache.mina.common.IoSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EnterMTSHandler extends AbstractMaplePacketHandler
{
  private static final Logger log = LoggerFactory.getLogger(DistributeSPHandler.class);

  public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
  {
  if(c.getPlayer().getLevel() >= 10) {
    NPCScriptManager.getInstance().start(c, 9000018);
    c.getSession().write(MaplePacketCreator.enableActions());
  } else {
            // c.getSession().write(MaplePacketCreator.sendHint(""+ c.getChannelServer().getguanggao() + "", 350, 5));
                c.getSession().write(MaplePacketCreator.getNPCTalk(1002006, (byte) 0, "玩家你好.等级不足10级无法使用快捷功能.", "00 00", (byte) 0));
        c.getSession().write(MaplePacketCreator.enableActions());
  }
}
}