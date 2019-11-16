/*
	分配SP处理程序
*/

package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.ISkill;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleQuestStatus;
import net.sf.odinms.client.MapleStat;
import net.sf.odinms.client.SkillFactory;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.quest.MapleQuest;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class DistributeSPHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int actionId = slea.readInt();
        if (actionId <= c.getLastActionId()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.setLastActionId(actionId);
        int skillid = slea.readInt();
        boolean isBegginnerSkill = false;

        MapleCharacter player = c.getPlayer();
        int remainingSp = player.getRemainingSp();
        if (skillid == 1000 || skillid == 1001 || skillid == 1002) { // Beginner Skills
            int snailsLevel = player.getSkillLevel(SkillFactory.getSkill(1000));
            int recoveryLevel = player.getSkillLevel(SkillFactory.getSkill(1001));
            int nimbleFeetLevel = player.getSkillLevel(SkillFactory.getSkill(1002));
            remainingSp = Math.min((player.getLevel() - 1), 6) - snailsLevel - recoveryLevel - nimbleFeetLevel;
            isBegginnerSkill = true;
        }
        if (skillid == 1005 || skillid == 1006 || skillid == 1003 || skillid == 1004 || skillid == 10001004 || skillid ==20001004) {
            return;
        }
        if ((skillid == 1121011 || skillid == 1221012 || skillid == 1321010 || skillid == 2121008 || skillid == 2221008 || skillid == 2321009 || skillid == 3121009 || skillid == 3221008 || skillid == 4121009 || skillid == 4221008) && !player.getQuest(MapleQuest.getInstance(6304)).getStatus().equals(MapleQuestStatus.Status.COMPLETED)) {
            return;
        }
        ISkill skill = SkillFactory.getSkill(skillid);
        int maxlevel = skill.isFourthJob() ? player.getMasterLevel(skill) : skill.getMaxLevel();
        int curLevel = player.getSkillLevel(skill);
        if ((remainingSp > 0 && curLevel + 1 <= maxlevel) && skill.canBeLearnedBy(player.getJob())) {
            if (!isBegginnerSkill) {
                player.setRemainingSp(player.getRemainingSp() - 1);
            }
            player.updateSingleStat(MapleStat.AVAILABLESP, player.getRemainingSp());
            player.changeSkillLevel(skill, curLevel + 1, player.getMasterLevel(skill));
        } else if (!skill.canBeLearnedBy(player.getJob())) {
            return;
        } else if (!(remainingSp > 0 && curLevel + 1 <= maxlevel) && !player.isGM()) {
            return;
        }
    }
}