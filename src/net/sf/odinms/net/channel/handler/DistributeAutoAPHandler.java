/*
	自动分配AP处理程序
*/

package net.sf.odinms.net.channel.handler;

import java.util.ArrayList;
import java.util.List;
import net.sf.odinms.client.MapleStat;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.Pair;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class DistributeAutoAPHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        List<Pair<MapleStat, Integer>> statupdate = new ArrayList<Pair<MapleStat, Integer>>();
        slea.readInt();
        slea.readInt();
        if (c.getPlayer().getRemainingAp() > 0) {
            while (slea.available() > 0) {
                int update = slea.readInt();
                int add = slea.readInt();
                if (c.getPlayer().getRemainingAp() < add) {
                    return;
                }
                switch (update) {
                    case 256: // Str
                        if (c.getPlayer().getStr() >= 32767) {
                            return;
                        }
                        c.getPlayer().setStr(c.getPlayer().getStr() + add);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.STR, c.getPlayer().getStr()));
                        break;
                    case 512: // Dex
                        if (c.getPlayer().getDex() >= 32767) {
                            return;
                        }
                        c.getPlayer().setDex(c.getPlayer().getDex() + add);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.DEX, c.getPlayer().getDex()));
                        break;
                    case 1024: // Int
                        if (c.getPlayer().getInt() >= 32767) {
                            return;
                        }
                        c.getPlayer().setInt(c.getPlayer().getInt() + add);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.INT, c.getPlayer().getInt()));
                        break;
                    case 2048: // Luk
                        if (c.getPlayer().getLuk() >= 32767) {
                            return;
                        }
                        c.getPlayer().setLuk(c.getPlayer().getLuk() + add);
                        statupdate.add(new Pair<MapleStat, Integer>(MapleStat.LUK, c.getPlayer().getLuk()));
                        break;
                    default:
                        c.getSession().write(MaplePacketCreator.updatePlayerStats(MaplePacketCreator.EMPTY_STATUPDATE, true));
                        return;
                }
                c.getPlayer().setRemainingAp(c.getPlayer().getRemainingAp() - add);
            }
            statupdate.add(new Pair<MapleStat, Integer>(MapleStat.AVAILABLEAP, c.getPlayer().getRemainingAp()));
            c.getSession().write(MaplePacketCreator.updatePlayerStats(statupdate, true));
        } else {
            System.out.printf("[h4x] Player %s is distributing AP with no AP", c.getPlayer().getName());
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }
}