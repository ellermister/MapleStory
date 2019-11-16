/*
                《该文件是XioxMS服务端的核心文件之一》
  目前版权 (C) 2010年   XioxMS             <100807851@qq.com>
 * -----------------------------------------------------------*
  之前人员 (C) 2008年   Huy              <patrick.huy@frz.cc>
                       Matthias Butz       <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>
 * ------------------------------------------------------------*
 @该服务端目前维护人员:xioxms
 @这个文件是自由形式.你可以任意内容
 @这个程序发布的目的是期望它能有用@
 @如果你需要技术支持,可以联系更新/维护人员<QQ100807851>
 @你应该已经收到一份Affero GNU通用公共授权
 -如果不是,请仔细查看http://www.gnu.org/licenses/*
*/
package net.sf.odinms.net.channel.handler;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import net.sf.odinms.client.IItem;
import net.sf.odinms.client.ISkill;
import net.sf.odinms.client.MapleBuffStat;
import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.client.MapleJob;
import net.sf.odinms.client.MapleWeaponType;
import net.sf.odinms.client.SkillFactory;
import net.sf.odinms.client.anticheat.CheatingOffense;
import net.sf.odinms.client.status.MonsterStatus;
import net.sf.odinms.client.status.MonsterStatusEffect;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.AutobanManager;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.server.MapleStatEffect;
import net.sf.odinms.server.TimerManager;
import net.sf.odinms.server.life.Element;
import net.sf.odinms.server.life.ElementalEffectiveness;
import net.sf.odinms.server.life.MapleMonster;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.server.maps.MapleMapItem;
import net.sf.odinms.server.maps.MapleMapObject;
import net.sf.odinms.server.maps.MapleMapObjectType;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.Pair;
import net.sf.odinms.tools.data.input.LittleEndianAccessor;

public abstract class AbstractDealDamageHandler extends AbstractMaplePacketHandler {

    private static org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AbstractDealDamageHandler.class);

    protected class AttackInfo {

        public int numAttacked,  numDamage,  numAttackedAndDamage;
        public int skill,  stance,  direction,  charge,  pos, aresCombo;
        public List<Pair<Integer, List<Integer>>> allDamage;
        public boolean isHH = false;
        public int speed = 4;

        private MapleStatEffect getAttackEffect(MapleCharacter chr, ISkill theSkill) {
            ISkill mySkill = theSkill;
            if (mySkill == null) {
                mySkill = SkillFactory.getSkill(skill);
            }
            int skillLevel = chr.getSkillLevel(mySkill);
            if (mySkill.getId() == 1009 || mySkill.getId() == 10001009) {
                skillLevel = 1;
            }
            if (skillLevel == 0) {
                return null;
            }
            return mySkill.getEffect(skillLevel);
        }

        public MapleStatEffect getAttackEffect(MapleCharacter chr) {
            return getAttackEffect(chr, null);
        }
    }

    protected void applyAttack(AttackInfo attack, MapleCharacter player, int maxDamagePerMonster, int attackCount) { //应用攻击
        player.getCheatTracker().resetHPRegen();
        player.resetAfkTimer();
        player.getCheatTracker().checkAttack(attack.skill);

        ISkill theSkill = null;
        MapleStatEffect attackEffect = null;
        if (attack.skill != 0) {
            theSkill = SkillFactory.getSkill(attack.skill);
            attackEffect = attack.getAttackEffect(player, theSkill);
            if (attackEffect == null) {
                AutobanManager.getInstance().autoban(player.getClient(),"使用了没有的技能- 技能ID: (" + attack.skill + ")");
            }
            if (attack.skill != 2301002) {
                if (player.isAlive()) {
                    attackEffect.applyTo(player);
                } else {
                    player.getClient().getSession().write(MaplePacketCreator.enableActions());
                }
            }
        }
        if (!player.isAlive()) {
            player.getCheatTracker().registerOffense(CheatingOffense.ATTACKING_WHILE_DEAD);
            return;
        }
        // meso explosion has a variable bullet count
        if (attackCount != attack.numDamage && attack.skill != 4211006 && attack.numDamage != attackCount*2) {
            player.getCheatTracker().registerOffense(CheatingOffense.MISMATCHING_BULLETCOUNT, attack.numDamage + "/" + attackCount);
            return;
        }
        int totDamage = 0;
        final MapleMap map = player.getMap();

        if (attack.skill == 4211006) { // meso explosion
            int delay = 0;
            for (Pair<Integer, List<Integer>> oned : attack.allDamage) {
                MapleMapObject mapobject = map.getMapObject(oned.getLeft().intValue());
                if (mapobject != null && mapobject.getType() == MapleMapObjectType.ITEM) {
                    final MapleMapItem mapitem = (MapleMapItem) mapobject;
                    if (mapitem.getMeso() > 0) {
                        synchronized (mapitem) {
                            if (mapitem.isPickedUp()) {
                                return;
                            }
                            TimerManager.getInstance().schedule(new Runnable() {

                                public void run() {
                                    map.removeMapObject(mapitem);
                                    map.broadcastMessage(MaplePacketCreator.removeItemFromMap(mapitem.getObjectId(), 4, 0), mapitem.getPosition());
                                    mapitem.setPickedUp(true);
                                }
                            }, delay);
                            delay += 100;
                        }
                    } else if (mapitem.getMeso() == 0) {
                        player.getCheatTracker().registerOffense(CheatingOffense.ETC_EXPLOSION);
                        return;
                    }
                } else if (mapobject != null && mapobject.getType() != MapleMapObjectType.MONSTER) {
                    player.getCheatTracker().registerOffense(CheatingOffense.EXPLODING_NONEXISTANT);
                    return; // etc explosion, exploding nonexistant things, etc.
                }
            }
        }

        for (Pair<Integer, List<Integer>> oned : attack.allDamage) {
            MapleMonster monster = map.getMonsterByOid(oned.getLeft().intValue());

            if (monster != null) {
                int totDamageToOneMonster = 0;
                for (Integer eachd : oned.getRight()) {
                    totDamageToOneMonster += eachd.intValue();
                }
                totDamage += totDamageToOneMonster;

                
                player.checkMonsterAggro(monster);
                if (totDamageToOneMonster > attack.numDamage + 1) {
                    int dmgCheck = player.getCheatTracker().checkDamage(totDamageToOneMonster);
                    if (dmgCheck > 5 && totDamageToOneMonster < 99999 && monster.getId() < 9500317 && monster.getId() > 9500319) {
                        player.getCheatTracker().registerOffense(CheatingOffense.SAME_DAMAGE, dmgCheck + " times: " + totDamageToOneMonster);
                    }
                }
                // 检测单次攻击值，这里不会写!
                if (player.isGM() || player.getJob().isA(MapleJob.Ares) && player.getLevel() >= 10|| player.getJob().isA(MapleJob.NIGHTLORD) && player.getLevel() >= 70) {
                    //log.info("这里不进行操作");NIGHTLORD
                } else {
                    if (player.getLevel() < 10) {
                        if (totDamageToOneMonster > 100) {
                            AutobanManager.getInstance().broadcastMessage(player.getClient(), player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 " + player.getLevel() + ")");
                            player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 " + player.getLevel() + " (IP: " + player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
                            return;
                        }
                    }
                    if (player.getLevel() < 20) {
                        if (totDamageToOneMonster > 1800) {
                            AutobanManager.getInstance().broadcastMessage(player.getClient(), player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 " + player.getLevel() + ")");
                            player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 " + player.getLevel() + " (IP: " + player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
                            return;
                        }
                    }
                    
                    if (player.getLevel() >= 80) {
                        if (totDamageToOneMonster > 199999) {
                            AutobanManager.getInstance().broadcastMessage(player.getClient(), player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 " + player.getLevel() + ")");
                            player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 " + player.getLevel() + " (IP: " + player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
                            return;
                        }
                    }
                 
                    if (player.getLevel() >= 100) {
                        if (totDamageToOneMonster > 199999) {
                            AutobanManager.getInstance().broadcastMessage(player.getClient(), player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 " + player.getLevel() + ")");
                            player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + totDamageToOneMonster + " 当前等级 " + player.getLevel() + " (IP: " + player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
                            return;
                        }
                    }
                    
                }
                checkHighDamage(player, monster, attack, theSkill, attackEffect, totDamageToOneMonster, maxDamagePerMonster);
                double distance = player.getPosition().distanceSq(monster.getPosition());
                if (distance > 400000.0) { // 600^2, 550 is approximatly the range of ultis
                    player.getCheatTracker().registerOffense(CheatingOffense.ATTACK_FARAWAY_MONSTER, Double.toString(Math.sqrt(distance)));
                }//遥远的怪物袭击

                if (attack.skill == 5111004) { // 能量转换
                    ISkill edrain = SkillFactory.getSkill(5111004);
                    int gainhp;
                    gainhp = (int) ((double) totDamage * (double) edrain.getEffect(player.getSkillLevel(edrain)).getX() / 100.0);
                    gainhp = Math.min(monster.getMaxHp(), Math.min(gainhp, player.getMaxHp() / 2));
                    player.addHP(gainhp);
                } else if (attack.skill == 15100004) { //光速拳
                    ISkill edrain = SkillFactory.getSkill(15100004);
                    int gainhp;
                    gainhp = (int) ((double) totDamage * (double) edrain.getEffect(player.getSkillLevel(edrain)).getX() / 100.0);
                    gainhp = Math.min(monster.getMaxHp(), Math.min(gainhp, player.getMaxHp() / 2));
                    player.addHP(gainhp);
                }

                if (!monster.isControllerHasAggro()) {
                    if (monster.getController() == player) {
                        monster.setControllerHasAggro(true);
                    } else {
                        monster.switchController(player, true);
                    }
                }
                if (attack.skill == 2301002 && !monster.getUndead()) {
                    player.getCheatTracker().registerOffense(CheatingOffense.HEAL_ATTACKING_UNDEAD);//医治攻击亡灵
                    return;
                }
                // Pickpocket
                if ((attack.skill == 4001334 || attack.skill == 4201005 || attack.skill == 0 || attack.skill == 4211002 || attack.skill == 4211004) && player.getBuffedValue(MapleBuffStat.PICKPOCKET) != null) {
                    handlePickPocket(player, monster, oned);
                }
                if (attack.skill == 21100005) { // 生命吸收21100005
                    ISkill drain = SkillFactory.getSkill(21100005);
                    int gainhp = (int) ((double) totDamageToOneMonster * (double) drain.getEffect(player.getSkillLevel(drain)).getX() / 100.0);
                    gainhp = Math.min(monster.getMaxHp(), Math.min(gainhp, player.getMaxHp() / 2));
                    player.addHP(gainhp);
                }
                if (attack.skill == 4101005) { // 生命吸收21100005
                    ISkill drain = SkillFactory.getSkill(4101005);
                    int gainhp = (int) ((double) totDamageToOneMonster * (double) drain.getEffect(player.getSkillLevel(drain)).getX() / 100.0);
                    gainhp = Math.min(monster.getMaxHp(), Math.min(gainhp, player.getMaxHp() / 2));
                    player.addHP(gainhp);
                }
                if (attack.skill == 14101006) { // 吸血
                    ISkill drain = SkillFactory.getSkill(14101006);
                    int gainhp = (int) ((double) totDamageToOneMonster * (double) drain.getEffect(player.getSkillLevel(drain)).getX() / 100.0);
                    gainhp = Math.min(monster.getMaxHp(), Math.min(gainhp, player.getMaxHp() / 2));
                    player.addHP(gainhp);
                }
                if (player.getBuffedValue(MapleBuffStat.HAMSTRING) != null) {
                    ISkill hamstring = SkillFactory.getSkill(3121007); //降低速度的击退简
                    if (hamstring.getEffect(player.getSkillLevel(hamstring)).makeChanceResult()) {
                        MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, hamstring.getEffect(player.getSkillLevel(hamstring)).getX()), hamstring, false);
                        monster.applyStatus(player, monsterStatusEffect, false, hamstring.getEffect(player.getSkillLevel(hamstring)).getY() * 1000);
                    }
                }

                if (player.getBuffedValue(MapleBuffStat.BLIND) != null) { //刺眼箭
                    ISkill blind = SkillFactory.getSkill(3221006);
                    if (blind.getEffect(player.getSkillLevel(blind)).makeChanceResult()) {
                        MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.ACC, blind.getEffect(player.getSkillLevel(blind)).getX()), blind, false);
                        monster.applyStatus(player, monsterStatusEffect, false, blind.getEffect(player.getSkillLevel(blind)).getY() * 1000);
                    }
                }

                if (player.getJob().isA(MapleJob.WHITEKNIGHT)) {
                    int[] charges = new int[]{1211005, 1211006};//寒冰钝器
                    for (int charge : charges) {
                        ISkill chargeSkill = SkillFactory.getSkill(charge);

                        if (player.isBuffFrom(MapleBuffStat.WK_CHARGE, chargeSkill)) {
                            final ElementalEffectiveness iceEffectiveness = monster.getEffectiveness(Element.ICE);
                            if (totDamageToOneMonster > 0 && iceEffectiveness == ElementalEffectiveness.NORMAL || iceEffectiveness == ElementalEffectiveness.WEAK) {
                                MapleStatEffect chargeEffect = chargeSkill.getEffect(player.getSkillLevel(chargeSkill));
                                MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), chargeSkill, false);
                                monster.applyStatus(player, monsterStatusEffect, false, chargeEffect.getY() * 2000);
                            }
                            break;
                        }
                    }
                }
                                if (player.getJob().isA(MapleJob.Ares_4)) {
                    int[] charges = new int[]{21120006};//寒冰钝器
                    for (int charge : charges) {
                        ISkill chargeSkill = SkillFactory.getSkill(charge);

                        if (player.isBuffFrom(MapleBuffStat.WK_CHARGE, chargeSkill)) {
                            final ElementalEffectiveness iceEffectiveness = monster.getEffectiveness(Element.ICE);
                            if (totDamageToOneMonster > 0 && iceEffectiveness == ElementalEffectiveness.NORMAL || iceEffectiveness == ElementalEffectiveness.WEAK) {
                                MapleStatEffect chargeEffect = chargeSkill.getEffect(player.getSkillLevel(chargeSkill));
                                MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), chargeSkill, false);
                                monster.applyStatus(player, monsterStatusEffect, false, chargeEffect.getY() * 2000);
                            }
                            break;
                        }
                    }
                }
                 if (player.getJob().isA(MapleJob.Ares_3)) {
                    int[] charges = new int[]{21111005};//寒冰钝器
                    for (int charge : charges) {
                        ISkill chargeSkill = SkillFactory.getSkill(charge);

                        if (player.isBuffFrom(MapleBuffStat.WK_CHARGE, chargeSkill)) {
                            final ElementalEffectiveness iceEffectiveness = monster.getEffectiveness(Element.ICE);
                            if (totDamageToOneMonster > 0 && iceEffectiveness == ElementalEffectiveness.NORMAL || iceEffectiveness == ElementalEffectiveness.WEAK) {
                                MapleStatEffect chargeEffect = chargeSkill.getEffect(player.getSkillLevel(chargeSkill));
                                MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), chargeSkill, false);
                                monster.applyStatus(player, monsterStatusEffect, false, chargeEffect.getY() * 500);
                            }
                            break;
                        }
                    }
                }
                ISkill venomNL = SkillFactory.getSkill(4120005); //武器用毒液
                if (player.getSkillLevel(venomNL) <= 0) {
                    venomNL = SkillFactory.getSkill(14110004); //武器用毒液
                }
                ISkill venomShadower = SkillFactory.getSkill(4220005);
                if (player.getSkillLevel(venomNL) > 0) {
                    MapleStatEffect venomEffect = venomNL.getEffect(player.getSkillLevel(venomNL));
                    for (int i = 0; i < attackCount; i++) {
                        if (venomEffect.makeChanceResult() == true) {
                            if (monster.getVenomMulti() < 3) {
                                monster.setVenomMulti((monster.getVenomMulti() + 1));
                                MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, 1), venomNL, false);
                                monster.applyStatus(player, monsterStatusEffect, false, venomEffect.getDuration(), true);
                            }
                        }
                    }
                } else if (player.getSkillLevel(venomShadower) > 0) {
                    MapleStatEffect venomEffect = venomShadower.getEffect(player.getSkillLevel(venomShadower));
                    for (int i = 0; i < attackCount; i++) {
                        if (venomEffect.makeChanceResult() == true) {
                            if (monster.getVenomMulti() < 3) {
                                monster.setVenomMulti((monster.getVenomMulti() + 1));
                                MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, 1), venomShadower, false);
                                monster.applyStatus(player, monsterStatusEffect, false, venomEffect.getDuration(), true);
                            }
                        }
                    }
                }
                if (totDamageToOneMonster > 0 && attackEffect != null && attackEffect.getMonsterStati().size() > 0) {
                    if (attackEffect.makeChanceResult()) {
                        MonsterStatusEffect monsterStatusEffect = new MonsterStatusEffect(attackEffect.getMonsterStati(), theSkill, false);
                        monster.applyStatus(player, monsterStatusEffect, attackEffect.isPoison(), attackEffect.getDuration());
                    }
                }
                if (attack.isHH && !monster.isBoss()) {
                    map.damageMonster(player, monster, monster.getHp() - 1);
                } else if (attack.isHH && monster.isBoss()) {
                    IItem weapon_item = player.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -11);//装备
                    @SuppressWarnings("unused")
                    MapleWeaponType weapon = MapleItemInformationProvider.getInstance().getWeaponType(weapon_item.getItemId());
                } else {
                    map.damageMonster(player, monster, totDamageToOneMonster);
                }
            }
        }
        if (totDamage > 1) {
            player.getCheatTracker().setAttacksWithoutHit(player.getCheatTracker().getAttacksWithoutHit() + 1);
            final int offenseLimit;
            if (attack.skill != 3121004) { //暴风箭雨
                offenseLimit = 100;
            } else {
                offenseLimit = 300;
            }
            if (player.getCheatTracker().getAttacksWithoutHit() > offenseLimit) {
                player.getCheatTracker().registerOffense(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT, Integer.toString(player.getCheatTracker().getAttacksWithoutHit()));
            } //没有受到撞击攻击
            if (player.hasEnergyCharge()) {
                player.increaseEnergyCharge(attack.numAttacked);
            }
        }
    }

    private void handlePickPocket(MapleCharacter player, MapleMonster monster, Pair<Integer, List<Integer>> oned) { //金钱炸弹
        ISkill pickpocket = SkillFactory.getSkill(4211003);
        int delay = 0;
        int maxmeso = player.getBuffedValue(MapleBuffStat.PICKPOCKET).intValue();
        int reqdamage = 20000;
        Point monsterPosition = monster.getPosition();

        for (Integer eachd : oned.getRight()) {
            if (pickpocket.getEffect(player.getSkillLevel(pickpocket)).makeChanceResult()) {
                double perc = (double) eachd / (double) reqdamage;
                final int todrop = Math.min((int) Math.max(perc * (double) maxmeso, (double) 1), maxmeso);
                final MapleMap tdmap = player.getMap();
                final Point tdpos = new Point((int) (monsterPosition.getX() + (Math.random() * 100) - 50), (int) (monsterPosition.getY()));
                final MapleMonster tdmob = monster;
                final MapleCharacter tdchar = player;
                TimerManager.getInstance().schedule(new Runnable() {

                    public void run() {
                        tdmap.spawnMesoDrop(todrop, tdpos, tdmob, tdchar, false);
                    }
                }, delay);
                delay += 200;
            }
        }
    }

    private void checkHighDamage(MapleCharacter player, MapleMonster monster, AttackInfo attack, ISkill theSkill, MapleStatEffect attackEffect, int damageToMonster, int maximumDamageToMonster) { //检查高攻击伤害
        int elementalMaxDamagePerMonster;
        Element element = Element.NEUTRAL;
        if (theSkill != null) {
            element = theSkill.getElement();
            int skillId = theSkill.getId();
            if (skillId == 3221007) {
                maximumDamageToMonster = 99999;
            } else if (skillId == 4221001) {
                maximumDamageToMonster = 400000;
            }
        }
        if (player.getBuffedValue(MapleBuffStat.WK_CHARGE) != null) {
            int chargeSkillId = player.getBuffSource(MapleBuffStat.WK_CHARGE);
            switch (chargeSkillId) {
                case 1211003:
                case 1211004:
                    element = Element.FIRE;
                    break;
                case 1211005:
                case 1211006:
                    element = Element.ICE;
                    break;
                case 1211007:
                case 1211008:
                    element = Element.LIGHTING;
                    break;
                 case 1221003:
                 case 1221004:
        element = Element.HOLY;
                    break;
            }
            ISkill chargeSkill = SkillFactory.getSkill(chargeSkillId);
            maximumDamageToMonster *= chargeSkill.getEffect(player.getSkillLevel(chargeSkill)).getDamage() / 100.0;
        }
        if (element != Element.NEUTRAL) {
            double elementalEffect;
            if (attack.skill == 3211003 || attack.skill == 3111003|| attack.skill == 21111005|| attack.skill == 21120006) { //烈火箭和寒冰箭和冰雪矛和钻石星辰
                elementalEffect = attackEffect.getX() / 200.0;
            } else {
                elementalEffect = 0.5;
            }
            switch (monster.getEffectiveness(element)) {
                case IMMUNE:
                    elementalMaxDamagePerMonster = 1;
                    break;
                case NORMAL:
                    elementalMaxDamagePerMonster = maximumDamageToMonster;
                    break;
                case WEAK:
                    elementalMaxDamagePerMonster = (int) (maximumDamageToMonster * (1.0 + elementalEffect));
                    break;
                case STRONG:
                    elementalMaxDamagePerMonster = (int) (maximumDamageToMonster * (1.0 - elementalEffect));
                    break;
                default:
                    throw new RuntimeException("Unknown enum constant");
            }
        } else {
            elementalMaxDamagePerMonster = maximumDamageToMonster;
        }

        if (damageToMonster > elementalMaxDamagePerMonster) {
            player.getCheatTracker().registerOffense(CheatingOffense.HIGH_DAMAGE);//高伤害
            if (attack.skill != 1009 && attack.skill != 10001009&& attack.skill != 20001009) {
                if (damageToMonster > elementalMaxDamagePerMonster * 4) {// * 3 until implementation of lagsafe pingchecks for buff expiration
                    if (player.isGM() || player.getJob().isA(MapleJob.Ares) && player.getLevel() <= 10) {
                        log.info("这里不进行操作");
                    } else {
                        if (player.getLevel() < 70) {
                            AutobanManager.getInstance().broadcastMessage(player.getClient(), player.getName() + " 被系统封号.(异常攻击伤害值: " + damageToMonster + " 当前等级 " + player.getLevel() + ")");
                            player.ban(player.getName() + " 被系统封号.(异常攻击伤害值: " + damageToMonster + " 当前等级 " + player.getLevel() + " ElementalMaxDamage: " + elementalMaxDamagePerMonster * 4 + " (IP: " + player.getClient().getSession().getRemoteAddress().toString().split(":")[0] + ")");
                        }
                    }
                    return;
                }
            } else {
                int maxDamage = (int) Math.floor(monster.getMaxHp() * 0.3);
                if (damageToMonster > 500000) {
                    AutobanManager.getInstance().autoban(player.getClient(), damageToMonster + " 异常伤害值 (等级: " + player.getLevel() + " 攻击: " + player.getTotalWatk() + " 技能: " + attack.skill + ", 怪物: " + monster.getId() + " 造成最大伤害值: " + maxDamage + ")");
                }
            }
        }
    }

    public AttackInfo parseRanged(MapleCharacter chr, LittleEndianAccessor lea) {
        AttackInfo ret = new AttackInfo();
        lea.readByte();
        ret.numAttackedAndDamage = lea.readByte();
        ret.numAttacked = (ret.numAttackedAndDamage >>> 4) & 0xF;
        ret.numDamage = ret.numAttackedAndDamage & 0xF;
        ret.allDamage = new ArrayList<Pair<Integer, List<Integer>>>();
        ret.skill = lea.readInt();
        lea.readInt(); // Mob's .img size
        lea.readInt();
        switch (ret.skill) {
            case 3121004:
            case 3221001:
            case 5221004:
            case 13111002:
                lea.readInt();
                break;
        }
        lea.readByte(); // Projectile that is thrown
        ret.stance = lea.readByte();
        lea.readByte(); // Weapon subclass
        ret.speed = lea.readByte();
        lea.readInt();
        lea.readShort(); // Slot
        lea.readShort(); // CS Star
        lea.readByte();
        for (int i = 0; i < ret.numAttacked; i++) {
            int mobId = lea.readInt();
            lea.skip(14);
            List<Integer> allDamageNumbers = new ArrayList<Integer>();
            for (int j = 0; j < ret.numDamage; j++) {
                allDamageNumbers.add(Integer.valueOf(lea.readInt()));
            }
            ret.allDamage.add(new Pair<Integer, List<Integer>>(Integer.valueOf(mobId), allDamageNumbers));
            lea.readInt();
        }
        lea.readInt();
        ret.pos = lea.readInt();
        return ret;
    }

   public AttackInfo parseDamage(MapleCharacter c, LittleEndianAccessor lea, boolean ranged) {
    AttackInfo ret = new AttackInfo();
    lea.readByte();
    lea.skip(8);
    ret.numAttackedAndDamage = lea.readByte();
    lea.skip(8);
    ret.numAttacked = (ret.numAttackedAndDamage >>> 4 & 0xF);
    ret.numDamage = (ret.numAttackedAndDamage & 0xF);
    ret.allDamage = new ArrayList();
    ret.skill = lea.readInt();
    lea.skip(8);
    if ((ret.skill == 2121001) || (ret.skill == 2221001) || (ret.skill == 2321001) || (ret.skill ==

5201002) || (ret.skill == 14111006) || (ret.skill == 5101004) || (ret.skill == 15101003))
      ret.charge = lea.readInt();
    else {
      ret.charge = 0;
    }

    if (ret.skill == 1221011)
      ret.isHH = true;

    lea.readInt();
ret.aresCombo = lea.readByte(); //记录目前的Combo点数
        int sourceid = ret.skill;//以下技能为Combo专用技能
       if ((sourceid == 21100004) || (sourceid == 21100005) || (sourceid == 21110003) || (sourceid == 21110004) || (sourceid == 21120006) || (sourceid == 21120007)){
        c.setCombo(1);
        }
        ret.pos = lea.readByte(); //动作
        ret.stance = lea.readByte(); //姿势

        if (ret.skill == 4211006) {
            return parseMesoExplosion(lea, ret);
        }
    if (ranged) {
      lea.readByte();
      ret.speed = lea.readByte();
      lea.readByte();
      ret.direction = lea.readByte();
      lea.skip(7);
      if ((ret.skill == 3121004) || (ret.skill == 3221001) || (ret.skill == 5221004) || (ret.skill ==

13111002))
        lea.skip(4);
    }
    else {
      lea.readByte();
      ret.speed = lea.readByte();
      lea.skip(4);
    }

    for (int i = 0; i < ret.numAttacked; ++i) {
      int oid = lea.readInt();

      lea.skip(14);

      List allDamageNumbers = new ArrayList();
      for (int j = 0; j < ret.numDamage; ++j) {
        int damage = lea.readInt();

        MapleStatEffect effect = null;
        if (ret.skill != 0)
          effect = SkillFactory.getSkill(ret.skill).getEffect(c.getSkillLevel(SkillFactory.getSkill

(ret.skill)));

        if ((damage != 0) && (effect != null) && (effect.getFixedDamage() != 0))
          damage = effect.getFixedDamage();

        allDamageNumbers.add(Integer.valueOf(damage));
      }
      if (ret.skill != 5221004)
        lea.skip(4);

      ret.allDamage.add(new Pair(Integer.valueOf(oid), allDamageNumbers));
    }

    return ret;
  }

    public AttackInfo parseMesoExplosion(LittleEndianAccessor lea, AttackInfo ret) {
        if (ret.numAttackedAndDamage == 0) {
            lea.skip(10);
            int bullets = lea.readByte();
            for (int j = 0; j < bullets; j++) {
                int mesoid = lea.readInt();
                lea.skip(1);
                ret.allDamage.add(new Pair<Integer, List<Integer>>(Integer.valueOf(mesoid), null));
            }

            return ret;
        } else {
            lea.skip(6);
        }
        for (int i = 0; i < ret.numAttacked + 1; i++) {
            int oid = lea.readInt();
            if (i < ret.numAttacked) {
                lea.skip(12);
                int bullets = lea.readByte();

                List<Integer> allDamageNumbers = new ArrayList<Integer>();
                for (int j = 0; j < bullets; j++) {
                    int damage = lea.readInt();
                    allDamageNumbers.add(Integer.valueOf(damage));
                }
                ret.allDamage.add(new Pair<Integer, List<Integer>>(Integer.valueOf(oid), allDamageNumbers));
                lea.skip(4);
            } else {
                int bullets = lea.readByte();
                for (int j = 0; j < bullets; j++) {
                    int mesoid = lea.readInt();
                    lea.skip(1);
                    ret.allDamage.add(new Pair<Integer, List<Integer>>(Integer.valueOf(mesoid), null));
                }
            }
        }

        return ret;
    }
}