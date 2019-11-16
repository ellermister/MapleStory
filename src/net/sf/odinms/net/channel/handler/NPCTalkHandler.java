/*
             《该文件是RainOS服务端的核心文件之一》
  目前版权 (C) 2010年   RainOS             <619545511@qq.com>
 * -----------------------------------------------------------*
  内容:双击NPC输出较多时候提示语
 * ------------------------------------------------------------*
 ◎该服务端目前维护人员:xioxms
 ◎这个文件是自由形式.你可以任意内容
 ◎这个程序发布的目的是期望它能有用@
 ◎你应该已经收到一份Affero GNU通用公共授权
 -如果不是,请仔细查看http://www.gnu.org/licenses/*
*/
package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.scripting.npc.NPCScriptManager;
import net.sf.odinms.server.life.MapleNPC;
import net.sf.odinms.server.maps.MapleMapObjectType;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class NPCTalkHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
    MapleCharacter player = c.getPlayer();
    player.setCurrenttime(System.currentTimeMillis());
    if (player.getCurrenttime() - player.getLasttime() < player.getDeadtime()) {
          player.dropMessage("系统错误.请稍后再试");
        //player.dropMessage("现在无法使用，请稍后再试！");
      c.getSession().write(MaplePacketCreator.enableActions());
      return;
    }
    player.setLasttime(System.currentTimeMillis());
        int oid = slea.readInt();
        slea.readInt();
        if (c.getPlayer().getMap().getMapObject(oid) == null || !c.getPlayer().getMap().getMapObject(oid).getType().equals(MapleMapObjectType.NPC)) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleNPC npc = (MapleNPC) c.getPlayer().getMap().getMapObject(oid);
        if (npc.getId() == 9010009) {
            c.getSession().write(MaplePacketCreator.sendDuey((byte) 9, DueyActionHandler.loadItems(c.getPlayer())));
        }
        if (npc.hasShop()) {
            if (c.getPlayer().getShop() != null) {
                c.getPlayer().setShop(null);
                c.getSession().write(MaplePacketCreator.confirmShopTransaction((byte) 20));
            }
            npc.sendShop(c);
        } else {
            if (c.getCM() != null || c.getQM() != null) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (c.getCM() == null) {
                NPCScriptManager.getInstance().start(c, npc.getId());
            }
        }
    }
}