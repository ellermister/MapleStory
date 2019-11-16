/*
 * 船长 心灵控制技能
 */

package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.status.MonsterStatus;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.life.MapleMonster;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class HypnotizeHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int mobfrom = slea.readInt();
        int playerid = slea.readInt();
        int mobto = slea.readInt();
        slea.readByte();
        int damage = slea.readInt();
        slea.readByte();
        slea.readInt();

        MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterById(playerid);
        MapleMap map = player.getMap();
        MapleMonster mobFrom = map.getMonsterByOid(mobfrom);
        MapleMonster mobTo = map.getMonsterByOid(mobto);
        if (mobFrom != null && mobTo != null && mobFrom.containsStatus(MonsterStatus.HYPNOTIZED));
        map.damageMonster(player, mobTo, damage);
    }
}