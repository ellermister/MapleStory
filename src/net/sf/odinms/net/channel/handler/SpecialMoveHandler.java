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

import java.awt.Point;

import java.util.concurrent.ScheduledFuture;

import net.sf.odinms.client.ISkill;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleCharacter.CancelCooldownAction;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleStat;
import net.sf.odinms.client.SkillFactory;
import net.sf.odinms.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.MapleStatEffect;
import net.sf.odinms.server.TimerManager;
import net.sf.odinms.server.life.MapleMonster;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class SpecialMoveHandler extends AbstractMaplePacketHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(SpecialMoveHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        slea.readShort();
        slea.readShort();
        int skillid = slea.readInt();                                               /*↓圣灵之剑↓*/
        if ((skillid == 4001003 || skillid == 14001003 ||skillid == 4221006 ||skillid == 1221003|| skillid == 5101007) && !c.getPlayer().isGM() && c.getPlayer().getMap().cannotInvincible()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        Point pos = null;
        int __skillLevel = slea.readByte();
        ISkill skill = SkillFactory.getSkill(skillid);
        int skillLevel = c.getPlayer().getSkillLevel(skill);
        MapleStatEffect effect = skill.getEffect(skillLevel);
        c.getPlayer().resetAfkTimer();
        int beforeMp = c.getPlayer().getMp();
        if (skillid % 10000000 == 1010 || skillid % 10000000 == 1011) {
            skillLevel = 1;
            c.getPlayer().setDojoEnergy(0);
            c.getSession().write(MaplePacketCreator.getEnergy(0));
        }
        if (effect.getCooldown() > 0) {
            if (c.getPlayer().skillisCooling(skillid)) {
                return;
            } else {
      if (skillid != 5221006) {
                    c.getSession().write(MaplePacketCreator.skillCooldown(skillid, effect.getCooldown()));
                    ScheduledFuture<?> timer = TimerManager.getInstance().schedule(new CancelCooldownAction(c.getPlayer(), skillid), effect.getCooldown() * 1000);
                    c.getPlayer().addCooldown(skillid, System.currentTimeMillis(), effect.getCooldown() * 1000, timer);
                }
            }
        }
        //monster magnet
        try {
            switch (skillid) {
                case 1121001:
                case 1221001:
                case 1321001:
                    int num = slea.readInt();
                    int mobId;
                    byte success;
                    for (int i = 0; i < num; i++) {
                        mobId = slea.readInt();
                        success = slea.readByte();
                        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showMagnet(mobId, success), false);
                        MapleMonster monster = c.getPlayer().getMap().getMonsterByOid(mobId);
                        if (monster != null) {
                            monster.switchController(c.getPlayer(), monster.isControllerHasAggro());
                        }
                    }
                    byte direction = slea.readByte();
                    c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showBuffeffect(c.getPlayer().getId(), skillid, 1, direction), false);
                    c.getSession().write(MaplePacketCreator.enableActions());
                    break;
            }
        } catch (Exception e) {
            log.warn("Failed to handle monster magnet..", e);
        }
        if (skillid % 20000000 == 1004) {
            slea.readShort();
        }
        if (slea.available() == 5) {
            pos = new Point(slea.readShort(), slea.readShort());
            log.info("新位置,X-Y");
        }
        if (skillLevel == 0 || skillLevel != __skillLevel) {
            c.disconnect();
            return;
        } else {
            if (c.getPlayer().isAlive()) {
                if (skillid == 9001004 && c.getPlayer().isGM()) {
                    c.getPlayer().setHidden(!c.getPlayer().isHidden());
                }
             if ((skill.getId() != 2311002) || (c.getPlayer().canDoor())) {
        skill.getEffect(skillLevel).applyTo(c.getPlayer(), pos);
        if ((skill.getId() != 2301002) && (effect != null) && (effect.getMpCon() != 0) &&
          (c.getPlayer().getMp() - beforeMp < skill.getEffect(skillLevel).getMpCon())) {
          int remainingMp = beforeMp - skill.getEffect(skillLevel).getMpCon();
          c.getPlayer().setMp(remainingMp);
          c.getPlayer().updateSingleStat(MapleStat.MP, remainingMp);
        }
      }
      else {
        new ServernoticeMapleClientMessageCallback(5, c).dropMessage("请等候5秒再使用时空门!");
        c.getSession().write(MaplePacketCreator.enableActions());
      }
    } else {
      c.getSession().write(MaplePacketCreator.enableActions());
    }

    c.getSession().write(MaplePacketCreator.enableActions());
  }
}
}