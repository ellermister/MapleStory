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

import java.util.Collections;

import net.sf.odinms.client.ISkill;
import net.sf.odinms.client.MapleBuffStat;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.SkillFactory;
import net.sf.odinms.client.status.MonsterStatus;
import net.sf.odinms.client.status.MonsterStatusEffect;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.anticheat.CheatingOffense;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.life.MapleMonster;
import net.sf.odinms.server.life.MobAttackInfo;
import net.sf.odinms.server.life.MobAttackInfoFactory;
import net.sf.odinms.server.life.MobSkill;
import net.sf.odinms.server.life.MobSkillFactory;
import net.sf.odinms.server.maps.MapleMapObjectType;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class TakeDamageHandler extends AbstractMaplePacketHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(TakeDamageHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        MapleCharacter player = c.getPlayer();
        slea.readInt();
        int damagefrom = slea.readByte();
        slea.readByte();
        int damage = slea.readInt();
        int oid = 0;
        int monsteridfrom = 0;
        int pgmr = 0;
        int direction = 0;
        int pos_x = 0;
        int pos_y = 0;
        int fake = 0;
        boolean is_pgmr = false;
        boolean is_pg = true;
        int mpattack = 0;
        MapleMonster attacker = null;
        if (damagefrom != -2) {
            monsteridfrom = slea.readInt();
            oid = slea.readInt();
            if (c.getPlayer().getMap().getMapObject(oid) == null || !c.getPlayer().getMap().getMapObject(oid).getType().equals(MapleMapObjectType.MONSTER)) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            attacker = (MapleMonster) player.getMap().getMapObject(oid);
            direction = slea.readByte();
        }
        try {
            if (damagefrom != -1 && damagefrom != -2 && attacker != null) {
                MobAttackInfo attackInfo = MobAttackInfoFactory.getMobAttackInfo(attacker, damagefrom);
                if (damage != -1) {
                    if (attackInfo.isDeadlyAttack()) {
                        mpattack = player.getMp() - 1;
                    } else {
                        mpattack += attackInfo.getMpBurn();
                    }
                }

                MobSkill skill = MobSkillFactory.getMobSkill(attackInfo.getDiseaseSkill(), attackInfo.getDiseaseLevel());
                if (skill != null && damage > 0 && attacker != null) {
                    skill.applyEffect(player, attacker, false);
                }
                if (attacker != null) {
                    attacker.setMp(attacker.getMp() - attackInfo.getMpCon());
                }
            }
        } catch (NullPointerException npe) {
            // Something is null here for sure, but don't know what it is...
        }

        if (damage == -1) {
            int job = player.getJob().getId() / 10 - 40;
            fake = 4020002 + (job * 100000);
            if (damagefrom == -1 && damagefrom != -2 && player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -10) != null) {
                int[] guardianSkillId = {1120005, 1220006};
                for (int guardian : guardianSkillId) {
                    ISkill guardianSkill = SkillFactory.getSkill(guardian);
                    if (player.getSkillLevel(guardianSkill) > 0 && attacker != null) {
                        MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), guardianSkill, false);
                        attacker.applyStatus(player, monsterStatusEffect, false, 2 * 1000);
                    }
                }
            }
        }

        if ((damage < -1 || damage > 60000) && !player.isGM()) {
            log.warn(player.getName() + " 接收到异常的怪物攻击数值 " + monsteridfrom + ": " + damage);
            c.disconnect();
            return;
        }

        player.getCheatTracker().checkTakeDamage();

        if (damage > 0) {
            player.getCheatTracker().setAttacksWithoutHit(0);
            player.getCheatTracker().resetHPRegen();
            player.getCheatTracker().resetMPRegen();
            player.resetAfkTimer();
        }
        if (damage == 1) {
            player.getCheatTracker().registerOffense(CheatingOffense.ALWAYS_ONE_HIT);
        }

        if (!player.isHidden() && player.isAlive() && !player.hasGodmode() && !player.getInvincible()) {
            if (player.getBuffedValue(MapleBuffStat.MORPH) != null && damage > 0) {
                player.cancelMorphs();
            }
            if (player.hasBattleShip()) {
                player.handleBattleShipHpLoss(damage);
                player.getMap().broadcastMessage(player, MaplePacketCreator.damagePlayer(damagefrom, monsteridfrom, player.getId(), damage, fake, direction, is_pgmr, pgmr, is_pg, oid, pos_x, pos_y), false);
                player.checkBerserk();
            }
            if (damagefrom == -1) {
                Integer pguard = player.getBuffedValue(MapleBuffStat.POWERGUARD);
                if (pguard != null) {
                    attacker = (MapleMonster) player.getMap().getMapObject(oid);
                    if (attacker != null) {
                        int bouncedamage = (int) (damage * (pguard.doubleValue() / 100));
                        bouncedamage = Math.min(bouncedamage, attacker.getMaxHp() / 10);
                        player.getMap().damageMonster(player, attacker, bouncedamage);
                        damage -= bouncedamage;
                        player.getMap().broadcastMessage(player, MaplePacketCreator.damageMonster(oid, bouncedamage), false, true);
                        player.checkMonsterAggro(attacker);
                    }
                }
            }
            if (damagefrom == 0 && attacker != null) {
                Integer manaReflection = player.getBuffedValue(MapleBuffStat.MANA_REFLECTION);
                if (manaReflection != null) {
                    int skillId = player.getBuffSource(MapleBuffStat.MANA_REFLECTION);
                    ISkill manaReflectSkill = SkillFactory.getSkill(skillId);
                    if (manaReflectSkill.getEffect(player.getSkillLevel(manaReflectSkill)).makeChanceResult()) {
                        int bouncedamage = (int) (damage * (manaReflection.doubleValue() / 100.0));
                        if (bouncedamage > attacker.getMaxHp() * .2) {
                            bouncedamage = (int) (attacker.getMaxHp() * .2);
                        }
                        player.getMap().damageMonster(player, attacker, bouncedamage);
                        player.getMap().broadcastMessage(player, MaplePacketCreator.damageMonster(oid, bouncedamage), false, true);
                        player.getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(skillId, 5));
                        player.getMap().broadcastMessage(player, MaplePacketCreator.showBuffeffect(player.getId(), skillId, 5, (byte) 3), false);
                    }
                }
            }
            if (damagefrom == -1) {
                try {
                    int[] achillesSkillId = {1120004, 1220005, 1320005};
                    for (int achilles : achillesSkillId) {
                        ISkill achillesSkill = SkillFactory.getSkill(achilles);
                        if (player.getSkillLevel(achillesSkill) > 0) {
                            double multiplier = achillesSkill.getEffect(player.getSkillLevel(achillesSkill)).getX() / 1000.0;
                            int newdamage = (int) (multiplier * damage);
                            damage = newdamage;
                            break;
                        }
                    }
                } catch (Exception e) {
                    log.warn("Failed to handle achilles..", e);
                }
            }
            if (player.getBuffedValue(MapleBuffStat.MAGIC_GUARD) != null && mpattack == 0) {
                int mploss = (int) (damage * (player.getBuffedValue(MapleBuffStat.MAGIC_GUARD).doubleValue() / 100.0));
                int hploss = damage - mploss;
                if (mploss > player.getMp()) {
                    hploss += mploss - player.getMp();
                    mploss = player.getMp();
                }
                player.addMPHP(-hploss, -mploss);
            } else if (player.getBuffedValue(MapleBuffStat.MESOGUARD) != null) {
                damage = (damage % 2 == 0) ? damage / 2 : (damage / 2) + 1;
                int mesoloss = (int) (damage * (player.getBuffedValue(MapleBuffStat.MESOGUARD).doubleValue() / 100.0));
                if (player.getMeso() < mesoloss) {
                    player.gainMeso(-player.getMeso(), false);
                    player.cancelBuffStats(MapleBuffStat.MESOGUARD);
                } else {
                    player.gainMeso(-mesoloss, false);
                }
                player.addMPHP(-damage, -mpattack);
            } else {
                player.addMPHP(-damage, -mpattack);
            }
            if (damagefrom == -2) {
                player.getMap().broadcastMessage(player, MaplePacketCreator.damagePlayer(-1, 9400711, player.getId(), damage, 0, 0, false, 0, false, 0, 0, 0), false);
            } else {
                player.getMap().broadcastMessage(player, MaplePacketCreator.damagePlayer(damagefrom, monsteridfrom, player.getId(), damage, fake, direction, is_pgmr, pgmr, is_pg, oid, pos_x, pos_y), false);
            }
            player.checkBerserk();
        }
        if (player.getMap().getId() >= 925020000 && player.getMap().getId() < 925030000) {
            player.setDojoEnergy(player.isGM() ? 300 : player.getDojoEnergy() < 300 ? player.getDojoEnergy() + 1 : 0);
            player.getClient().getSession().write(MaplePacketCreator.getEnergy(player.getDojoEnergy()));
        }
    }
}