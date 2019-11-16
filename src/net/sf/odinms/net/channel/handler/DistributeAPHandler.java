/*
	分配AP处理程序
*/

package net.sf.odinms.net.channel.handler;

import java.util.ArrayList;
import java.util.List;

import net.sf.odinms.client.ISkill;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleJob;
import net.sf.odinms.client.MapleStat;
import net.sf.odinms.client.SkillFactory;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.Pair;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class DistributeAPHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        List<Pair<MapleStat, Integer>> statupdate = new ArrayList<Pair<MapleStat, Integer>>(2);
        c.getSession().write(MaplePacketCreator.updatePlayerStats(statupdate, true));
        int actionId = slea.readInt(); //动作ID
        if (actionId <= c.getLastActionId()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.setLastActionId(actionId);     //更新属性
        int update = slea.readInt();
        if (c.getPlayer().getRemainingAp() > 0) {
            switch (update) {
                case 256: // Str  // 力量
                    if (c.getPlayer().getStr() >= 999) {
                        return;
                    }
                    c.getPlayer().setStr(c.getPlayer().getStr() + 1);
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.STR, c.getPlayer().getStr()));
                    break;
                case 512: // Dex
                    if (c.getPlayer().getDex() >= 999) {
                        return;
                    }
                    c.getPlayer().setDex(c.getPlayer().getDex() + 1);
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.DEX, c.getPlayer().getDex()));
                    break;
                case 1024: // Int
                    if (c.getPlayer().getInt() >= 999) {
                        return;
                    }
                    c.getPlayer().setInt(c.getPlayer().getInt() + 1);
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.INT, c.getPlayer().getInt()));
                    break;
                case 2048: // Luk
                    if (c.getPlayer().getLuk() >= 999) {
                        return;
                    }
                    c.getPlayer().setLuk(c.getPlayer().getLuk() + 1);
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.LUK, c.getPlayer().getLuk()));
                    break;
                case 8192: // HP
                    int MaxHP = c.getPlayer().getMaxHp();
                    if (c.getPlayer().getHpApUsed() == 10000 || MaxHP == 30000) {
                        return;
                    }
                    ISkill improvingMaxHP = null;
                    int improvingMaxHPLevel = 0;
                    if (c.getPlayer().getJob().isA(MapleJob.BEGINNER)) {
                        MaxHP += rand(8, 12);
                    } else if (c.getPlayer().getJob().isA(MapleJob.WARRIOR)) {
                        improvingMaxHP = SkillFactory.getSkill(1000001);
                        improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                        if (improvingMaxHPLevel >= 1) {
                            MaxHP += rand(20, 24) + improvingMaxHP.getEffect(improvingMaxHPLevel).getY();
                        } else {
                            MaxHP += rand(20, 24);
                        }
                    } else if (c.getPlayer().getJob().isA(MapleJob.MAGICIAN)) {
                        MaxHP += rand(6, 10);
                    } else if (c.getPlayer().getJob().isA(MapleJob.BOWMAN)) {
                        MaxHP += rand(16, 20);
                    } else if (c.getPlayer().getJob().isA(MapleJob.THIEF)) {
                        MaxHP += rand(20, 24);
                    } else if (c.getPlayer().getJob().isA(MapleJob.PIRATE)) {
                        improvingMaxHP = SkillFactory.getSkill(5100000);
                        improvingMaxHPLevel = c.getPlayer().getSkillLevel(improvingMaxHP);
                        if (improvingMaxHPLevel >= 1) {
                            MaxHP += rand(16, 20) + improvingMaxHP.getEffect(improvingMaxHPLevel).getY();
                        } else {
                            MaxHP += rand(16, 20);
                        }
                    }
                    MaxHP = Math.min(30000, MaxHP);
                    int HPSkillAdd = 0;
                    c.getPlayer().setMaxHp(c.getPlayer().getMaxHp() + 1 + HPSkillAdd);
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXHP, c.getPlayer().getMaxHp()));
                    break;
                case 32768: // MP
                    int MaxMP = c.getPlayer().getMaxMp();
                    if (c.getPlayer().getMpApUsed() == 10000 || c.getPlayer().getMaxMp() == 30000) {
                        return;
                    }
                    if (c.getPlayer().getJob().isA(MapleJob.BEGINNER)) {
                        MaxMP += rand(6, 8);
                    } else if (c.getPlayer().getJob().isA(MapleJob.WARRIOR)) {
                        MaxMP += rand(2, 4);
                    } else if (c.getPlayer().getJob().isA(MapleJob.MAGICIAN)) {
                        ISkill improvingMaxMP = SkillFactory.getSkill(2000001);
                        int improvingMaxMPLevel = c.getPlayer().getSkillLevel(improvingMaxMP);
                        if (improvingMaxMPLevel >= 1) {
                            MaxMP += rand(18, 20) + improvingMaxMP.getEffect(improvingMaxMPLevel).getY();
                        } else {
                            MaxMP += rand(18, 20);
                        }
                    } else if (c.getPlayer().getJob().isA(MapleJob.BOWMAN)) {
                        MaxMP += rand(10, 12);
                    } else if (c.getPlayer().getJob().isA(MapleJob.THIEF)) {
                        MaxMP += rand(10, 12);
                    } else if (c.getPlayer().getJob().isA(MapleJob.PIRATE)) {
                        MaxMP += rand(10, 12);
                    }
                    MaxMP = Math.min(30000, MaxMP);
                    int MPSkillAdd = 0;
                    c.getPlayer().setMaxMp(c.getPlayer().getMaxMp() + 1 + MPSkillAdd);
                    statupdate.add(new Pair<MapleStat, Integer>(MapleStat.MAXMP, c.getPlayer().getMaxMp()));
                    break;
                default:
                    c.getSession().write(MaplePacketCreator.updatePlayerStats(MaplePacketCreator.EMPTY_STATUPDATE, true));
                    return;
            }
            c.getPlayer().setRemainingAp(c.getPlayer().getRemainingAp() - 1);
            statupdate.add(new Pair<MapleStat, Integer>(MapleStat.AVAILABLEAP, c.getPlayer().getRemainingAp()));
            c.getSession().write(MaplePacketCreator.updatePlayerStats(statupdate, true));
        }
    }

    private static int rand(int lbound, int ubound) {
        return (int) ((Math.random() * (ubound - lbound + 1)) + lbound);
    }
}