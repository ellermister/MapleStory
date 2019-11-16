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

import java.util.concurrent.ScheduledFuture;

import net.sf.odinms.client.IItem;
import net.sf.odinms.client.ISkill;
import net.sf.odinms.client.MapleBuffStat;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleCharacter.CancelCooldownAction;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleInventory;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.MapleJob;
import net.sf.odinms.client.MapleStat;
import net.sf.odinms.client.MapleWeaponType;
import net.sf.odinms.client.SkillFactory;
import net.sf.odinms.client.anticheat.CheatingOffense;
import net.sf.odinms.net.MaplePacket;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.server.MapleStatEffect;
import net.sf.odinms.server.TimerManager;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class RangedAttackHandler extends AbstractDealDamageHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(RangedAttackHandler.class);

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        AttackInfo attack = parseDamage(c.getPlayer(), slea, true);
        MapleCharacter player = c.getPlayer();
        int beforeMp = player.getMp();
        slea.skip(4);
        Short x = slea.readShort();
        Short y = slea.readShort();
        if ((attack.skill == 5121002) || (attack.skill == 21100004) || (attack.skill == 21110006) || (attack.skill == 21110003) || (attack.skill == 21110004) || (attack.skill == 21110004) || (attack.skill == 21120002) || (attack.skill == 21120006)) {
      //if (attack.skill == 5121002){
        player.getMap().broadcastMessage(player, MaplePacketCreator.rangedAttack(player.getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, 0, attack.allDamage, attack.speed, x, y, attack.pos), false);
      //player.getMap().broadcastMessage(player, MaplePacketCreator.rangedAttack(player.getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, 0, attack.allDamage, attack.speed));
            applyAttack(attack, player, 9999999, 1);
        } else {
            MapleInventory equip = player.getInventory(MapleInventoryType.EQUIPPED);
            IItem weapon = equip.getItem((byte) -11);
            MapleItemInformationProvider mii = MapleItemInformationProvider.getInstance();
            MapleWeaponType type = mii.getWeaponType(weapon.getItemId());
            if (type == MapleWeaponType.NOT_A_WEAPON) {
                throw new RuntimeException("[h4x] Player " + player.getName() + " is attacking with something that's not a weapon");
            }
            MapleInventory use = player.getInventory(MapleInventoryType.USE);
            int projectile = 0;
            int bulletCount = 1;
            MapleStatEffect effect = null;
            if (attack.skill != 0) {
                effect = attack.getAttackEffect(c.getPlayer());
                bulletCount = effect.getBulletCount();
                if (effect.getCooldown() > 0) {
                    c.getSession().write(MaplePacketCreator.skillCooldown(attack.skill, effect.getCooldown()));
                }
            }
            boolean hasShadowPartner = player.getBuffedValue(MapleBuffStat.SHADOWPARTNER) != null;
            int damageBulletCount = bulletCount;
            if (hasShadowPartner) {
                bulletCount *= 2;
            }
            for (int i = 0; i < 255; i++) { // impose order...
                IItem item = use.getItem((byte) i);
                if (item != null) {
                    boolean clawCondition = type == MapleWeaponType.CLAW && mii.isThrowingStar(item.getItemId()) && weapon.getItemId() != 1472063;
                    boolean bowCondition = type == MapleWeaponType.BOW && mii.isArrowForBow(item.getItemId());
                    boolean crossbowCondition = type == MapleWeaponType.CROSSBOW && mii.isArrowForCrossBow(item.getItemId());
                    boolean gunCondition = type == MapleWeaponType.GUN && mii.isBullet(item.getItemId());
                    boolean mittenCondition = weapon.getItemId() == 1472063 && (mii.isArrowForBow(item.getItemId()) || mii.isArrowForCrossBow(item.getItemId()));
                    if ((clawCondition || bowCondition || crossbowCondition || mittenCondition || gunCondition) && item.getQuantity() >= bulletCount) {
                        projectile = item.getItemId();
                        break;
                    }
                }
            }
            boolean soulArrow = player.getBuffedValue(MapleBuffStat.SOULARROW) != null; //weird pirate skillz
            boolean shadowClaw = player.getBuffedValue(MapleBuffStat.SHADOW_CLAW) != null;
            if (!soulArrow && !shadowClaw && projectile != 0) {
                int bulletConsume = bulletCount;
                if (effect != null && effect.getBulletConsume() != 0) {
                    bulletConsume = effect.getBulletConsume() * (hasShadowPartner ? 2 : 1);
                }
                if (player.getJob().isA(MapleJob.Ares_1) || player.getJob().isA(MapleJob.Ares_2) || player.getJob().isA(MapleJob.Ares_3) || player.getJob().isA(MapleJob.Ares_4)) {
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, projectile, bulletConsume, false, true);
                }
            }

            if (projectile != 0 || soulArrow || attack.skill == 4121003 || attack.skill == 4221003 || attack.skill == 11101004 || attack.skill == 15111007 || attack.skill == 14101006) {
                int visProjectile = projectile; //visible projectile sent to players
                if (mii.isThrowingStar(projectile)) {
                    //see if player has cash stars
                    MapleInventory cash = player.getInventory(MapleInventoryType.CASH);
                    for (int i = 0; i < 255; i++) { // impose order...
                        IItem item = cash.getItem((byte) i);
                        if (item != null) {
                            //cash stars have prefix 5021xxx
                            if (item.getItemId() / 1000 == 5021) {
                                visProjectile = item.getItemId();
                                break;
                            }
                        }
                    }
                } else { //bow, crossbow
                    if (soulArrow || attack.skill == 3111004 || attack.skill == 3211004 || attack.skill == 11101004 || attack.skill == 15111007 || attack.skill == 14101006) {
                        visProjectile = 0; //arrow rain/eruption show no arrows
                    }
                }

                MaplePacket packet;
                try {
                    switch (attack.skill) {
                        case 3121004: // Hurricane
                        case 3221001: // Pierce
                        case 5221004: // Rapid Fire
                        case 13111002:
                              packet = MaplePacketCreator.rangedAttack(player.getId(), attack.skill, attack.direction, attack.numAttackedAndDamage, visProjectile, attack.allDamage, attack.speed, x, y, attack.pos);
                            //packet = MaplePacketCreator.rangedAttack(player.getId(), attack.skill, attack.direction, attack.numAttackedAndDamage, visProjectile, attack.allDamage, attack.speed);
                            break;
                        default:
                              packet = MaplePacketCreator.rangedAttack(player.getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, visProjectile, attack.allDamage, attack.speed, x, y, attack.pos);
                            //packet = MaplePacketCreator.rangedAttack(player.getId(), attack.skill, attack.stance, attack.numAttackedAndDamage, visProjectile, attack.allDamage, attack.speed);
                            break;
                    }
                    player.getMap().broadcastMessage(player, packet, false, true);
                } catch (Exception e) {
                    log.warn("Failed to handle ranged attack..", e);
                }

                int basedamage;
                int projectileWatk = 0;
                if (projectile != 0) {
                    projectileWatk = mii.getWatkForProjectile(projectile);
                }
                if (attack.skill != 4001344 && attack.skill != 14001004) { // not lucky 7
                    if (projectileWatk != 0) {
                        basedamage = c.getPlayer().calculateMaxBaseDamage(c.getPlayer().getTotalWatk() + projectileWatk);
                    } else {
                        basedamage = c.getPlayer().getCurrentMaxBaseDamage();
                    }
                } else { // l7 has a different formula :>
                    basedamage = (int) (((c.getPlayer().getTotalLuk() * 5.0) / 100.0) * (c.getPlayer().getTotalWatk() + projectileWatk));
                }
                if (attack.skill == 3101005) { // arrowbomb is hardcore like that O.o
                    basedamage *= effect.getX() / 100.0;
                }
                int maxdamage = basedamage;
                double critdamagerate = 0.0;
                if (player.getJob().isA(MapleJob.ASSASSIN)) {
                    ISkill criticalthrow = SkillFactory.getSkill(4100001);
                    int critlevel = player.getSkillLevel(criticalthrow);
                    if (critlevel > 0) {
                        critdamagerate = (criticalthrow.getEffect(player.getSkillLevel(criticalthrow)).getDamage() / 100.0);
                    }
                } else if (player.getJob().isA(MapleJob.BOWMAN)) {
                    ISkill criticalshot = SkillFactory.getSkill(3000001);
                    int critlevel = player.getSkillLevel(criticalshot);
                    if (critlevel > 0) {
                        critdamagerate = (criticalshot.getEffect(critlevel).getDamage() / 100.0) - 1.0;
                    }
                }
                int critdamage = (int) (basedamage * critdamagerate);
                if (effect != null) {
                    maxdamage *= attack.skill == 14101006 ? effect.getDamage() : effect.getDamage() / 100.0;
                }
                maxdamage += critdamage;
                maxdamage *= damageBulletCount;
                if (hasShadowPartner) {
                    ISkill shadowPartner = SkillFactory.getSkill(4111002);
                    int shadowPartnerLevel = player.getSkillLevel(shadowPartner);
                    if (0 >= shadowPartnerLevel) {
                        shadowPartner = SkillFactory.getSkill(14111000);
                        shadowPartnerLevel = player.getSkillLevel(shadowPartner);
                    }
                    MapleStatEffect shadowPartnerEffect = shadowPartner.getEffect(shadowPartnerLevel);
                    if (attack.skill != 0) {
                        maxdamage *= (1.0 + shadowPartnerEffect.getY() / 100.0);
                    } else {
                        maxdamage *= (1.0 + shadowPartnerEffect.getX() / 100.0);
                    }
                }
                if (attack.skill == 4111004) {
                    maxdamage = 35000;
                }
                if (effect != null) {
                    int money = effect.getMoneyCon();
                    if (money != 0) {
                        double moneyMod = money * 0.5;
                        money = (int) (money + Math.random() * moneyMod);
                        if (money > player.getMeso()) {
                            money = player.getMeso();
                        }
                        player.gainMeso(-money, false);
                    }
                }
                if (attack.skill != 0) {
                    ISkill skill = SkillFactory.getSkill(attack.skill);
                    int skillLevel = c.getPlayer().getSkillLevel(skill);
                    MapleStatEffect effect_ = skill.getEffect(skillLevel);
                    if (effect_.getCooldown() > 0) {
                        if (player.skillisCooling(attack.skill)) {
                            player.getCheatTracker().registerOffense(CheatingOffense.COOLDOWN_HACK);
                            return;
                        } else {
                            c.getSession().write(MaplePacketCreator.skillCooldown(attack.skill, effect_.getCooldown()));
                            ScheduledFuture<?> timer = TimerManager.getInstance().schedule(new CancelCooldownAction(c.getPlayer(), attack.skill), effect_.getCooldown() * 1000);
                            player.addCooldown(attack.skill, System.currentTimeMillis(), effect_.getCooldown() * 1000, timer);
                        }
                    }
                }
                if (player.getSkillLevel(SkillFactory.getSkill(14100005)) > 0 && player.getBuffedValue(MapleBuffStat.DARKSIGHT) != null && attack.numAttacked > 0) {
                    player.cancelEffectFromBuffStat(MapleBuffStat.DARKSIGHT);
                    player.cancelBuffStats(MapleBuffStat.DARKSIGHT);
                }
                applyAttack(attack, player, maxdamage, bulletCount);
                if (effect != null && effect.getMpCon() != 0) {
                    if (player.getMp() - beforeMp < effect.getMpCon()) {
                        int remainingMp = beforeMp - effect.getMpCon();
                        c.getPlayer().setMp(remainingMp);
                        c.getPlayer().updateSingleStat(MapleStat.MP, remainingMp);
                    }
                }
            }
        }
    }
}