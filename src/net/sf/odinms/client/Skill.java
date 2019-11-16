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

package net.sf.odinms.client;

import java.util.ArrayList;
import java.util.List;

import net.sf.odinms.provider.MapleData;
import net.sf.odinms.provider.MapleDataTool;
import net.sf.odinms.server.MapleStatEffect;
import net.sf.odinms.server.life.Element;

public class Skill implements ISkill {

    private int id;
    private List<MapleStatEffect> effects = new ArrayList<MapleStatEffect>();
    private Element element;
    private int animationTime;
    private boolean charge;

    private Skill(int id) {
        super();
        this.id = id;
    }

    @Override
    public int getId() {
        return id;
    }

    public static Skill loadFromData(int id, MapleData data) {
        Skill ret = new Skill(id);
        boolean isBuff = false;
        int skillType = MapleDataTool.getInt("skillType", data, -1);
        String elem = MapleDataTool.getString("elemAttr", data, null);
        if (elem != null) {
            ret.element = Element.getFromChar(elem.charAt(0));
        } else {
            ret.element = Element.NEUTRAL;
        }
        // unfortunatly this is only set for a few skills so we have to do some more to figure out if it's a buff &#65533;.o
        MapleData effect = data.getChildByPath("effect");
        if (skillType != -1) {
            if (skillType == 2) {
                isBuff = true;
            }
        } else {
            MapleData action = data.getChildByPath("action");
            MapleData hit = data.getChildByPath("hit");
            MapleData ball = data.getChildByPath("ball");
            isBuff = effect != null && hit == null && ball == null;
            isBuff |= action != null && MapleDataTool.getString("0", action, "").equals("alert2");
            switch (id) {
                case 1121006: // rush
                case 1221007: // rush
                case 1311005: // sacrifice
                case 1321003: // rush
                case 2111002: // explosion
                case 2111003: // poison mist
                case 2301002: // heal
                case 3110001: // mortal blow
                case 3210001: // mortal blow
                case 4101005: // drain
                case 4111003: // shadow web
                case 4201004: // steal
                case 4221006: // smokescreen
                case 9101000: // heal + dispel
                case 1121001: // monster magnet
                case 1221001: // monster magnet
                case 1321001: // monster magnet
                case 5201006: // Recoil Shot
                case 5111004: // energy drain
                case 14111001: // Shadow Web
                case 20001006:
                case 20001007:
                case 21000000:
                case 21001001:
                case 21000002:
                case 14101006:
                case 21100000:
                case 21100001:
                case 21100002:
                case 21100004:
                case 21110000:
                                case 5221010:
                //case 21110002:
                case 21110003:
                case 21110006:
                case 21120001:
                case 21120002:
                case 21120004:
                case 21120005:

                case 21121008:
                    isBuff = false;
                    break;
                //骑士团的技能
                case 12001004: //flame
                                    case 11101002://终极剑
                                                        case 21100005: //连环吸血
                case 11001004: //soul
                case 14001005: //dark soul?
                case 13001004: //storm sprite
                case 15001003:
                case 5001005:
                case 14001003: // Dark Sight
                 
                case 15000000: // Bullet Time
                case 15001004: // Lightning
                case 11101001:// Sword Booster
                case 11101003: // Rage
                case 11101004: // Soul Blade
                case 11101005: // Soul Rush
                case 12101000: // Meditation
                case 12101001: // Slow
                case 12101004: // Spell Booster
                case 12101005: // Elemental Reset
                case 13101001: // Bow Booster
                case 13101003: // Soul Arrow : Bow
                case 13101005: // Storm Brakes
                case 13101006:// Wind Walk
                case 14100005:// Vanish
                case 14101002:// Claw Booster
                case 14101003:// Haste
                case 15100004:// Energy Charge
                case 15101002:// Knuckle Booster
                case 15101006:// Lightning Charge
                case 11111001:// Combo Attack
                case 11111007: // Soul Charge
                case 12111002: // Seal is one
                case 13111004: // Puppet
                case 13111005:// Albatross
                case 14111000:// Shadow Partner
                case 15111001: // Energy Drain
                case 15111002: // Transformation
                case 15111005: // Speed Infusion
                case 15111006: // Spark
                case 15111007: // Shark Wave
                case 13001002: //focus
                case 12001001: // Magic Guard
                case 12001002: // Magic Armor
                case 11001001: // Iron Body
                case 12111004: //ifrit KoC
                case 10000012: // Blessing of the Spirit
                case 10001000: // Three Snails
                case 10001001: // Recovery
                case 10001002: // Nimble Feet
                case 10001003: // Legendary Spiri
                case 5221003:
                case 10001004:// Monster Rider
                case 10001005: // Echo of Hero
                case 1001: // recovery
                case 1002: // nimble feet
                case 1004: // monster riding
                case 1005: // echo of hero
                case 1001003: // iron body
                case 1101004: // sword booster
                case 1201004: // sword booster
                case 1101005: // axe booster
                case 1201005: // bw booster
                case 1301004: // spear booster
                case 1301005: // polearm booster
                case 3101002: // bow booster
                case 3201002: // crossbow booster
                case 4101003: // claw booster
                case 4201002: // dagger booster
                case 1101007: // power guard
                case 1201007: // power guard
                case 1101006: // rage
                case 1301006: // iron will
                case 1301007: // hyperbody
                case 1111002: // combo attack
                case 1211006: // blizzard charge bw
                case 1211004: // fire charge bw
                case 1211008: // lightning charge bw
                case 1221004: // divine charge bw
                case 1211003: // fire charge sword
                case 1211005: // ice charge sword
                case 1211007: // thunder charge sword
                case 1221003: // holy charge sword
                case 1311008: // dragon blood
                case 1121000: // maple warrior
                case 1221000: // maple warrior
                case 1321000: // maple warrior
                case 2121000: // maple warrior
                case 2221000: // maple warrior
                case 2321000: // maple warrior
                case 3121000: // maple warrior
                case 3221000: // maple warrior
                case 4121000: // maple warrior
                case 4221000: // maple warrior
                case 1121002: // power stance
                case 1221002: // power stance
                case 1321002: // power stance
                case 1121010: // enrage
                case 1321007: // beholder
                case 1320008: // beholder healing
                case 1320009: // beholder buff
                case 2001002: // magic guard
                case 2001003: // magic armor
                case 2101001: // meditation
                case 2201001: // meditation
                case 2301003: // invincible
                case 2301004: // bless
                case 2111005: // spell booster
                case 2211005: // spell booster
                case 2311003: // holy symbol
                case 2311006: // summon dragon
                case 2121004: // infinity
                case 2221004: // infinity
                case 2321004: // infinity
                case 2321005: // holy shield
                case 2121005: // elquines
                case 2221005: // ifrit
                case 2321003: // bahamut
                case 3121006: // phoenix
                case 3221005: // frostprey
                case 3111002: // puppet
                case 3211002: // puppet
                case 3111005: // silver hawk
                case 3211005: // golden eagle
                case 3001003: // focus
                case 3101004: // soul arrow bow
                case 3201004: // soul arrow crossbow
                case 3121002: // sharp eyes
                case 3221002: // sharp eyes
                case 3121008: // concentrate
                case 3221006: // blind
                case 4001003: // dark sight
                case 4101004: // haste
                case 4201003: // haste
                case 4111001: // meso up
                case 4111002: // shadow partner
                case 4121006: // shadow stars
                case 4211003: // pick pocket
                case 4211005: // meso guard
                case 5111005: // Transformation (Buccaneer)
                case 5121003: // Super Transformation (Viper)
                case 5220002: // wrath of the octopi
                case 5211001: // Pirate octopus summon
                case 5211002: // Pirate bird summon
                case 5221006: // BattleShip
                case 9001000: // haste
                case 9101001: // super haste
                case 9101002: // holy symbol
                case 9101003: // bless
                case 9101004: // hide
                case 9101008: // hyper body
                case 1121011: // hero's will
                case 1221012: // hero's will
                case 1321010: // hero's will
                case 2321009: // hero's will
                case 2221008: // hero's will
                case 2121008: // hero's will
                case 3121009: // hero's will
                case 3221008: // hero's will
                case 4121009: // hero's will
                case 4221008: // hero's will
                case 2101003: // slow
                case 2201003: // slow
                case 2111004: // seal
                case 2211004: // seal
                case 1111007: // armor crash
                case 1211009: // magic crash
                case 1311007: // power crash
                case 2311005: // doom
                case 2121002: // mana reflection
                case 2221002: // mana reflection
                case 2321002: // mana reflection
                case 2311001: // dispel
                case 1201006: // threaten
                case 4121004: // ninja ambush
                case 4221004: // ninja ambush
                case 21001003:
                case 20001001:
                case 20001002:
                case 20001004:
                case 20001005:

                case 20001010:
                case 20001011:
                case 21101003:
                case 21111001:

              //  case 1100002:
                case 21121000:
                case 21121003:
                case 21120007:
                //case 21110004:
                case 21111005://冰雪矛
               case 21120006: //钻石星辰
                case 9001004:
                    isBuff = true;
                    break;
            }
        }
        MapleData keydown = data.getChildByPath("keydown");
        if (keydown != null) {
            ret.charge = true;
        }
        for (MapleData level : data.getChildByPath("level")) {
            MapleStatEffect statEffect = MapleStatEffect.loadSkillEffectFromData(level, id, isBuff, level.getName());
            ret.effects.add(statEffect);
        }
        ret.animationTime = 0;
        if (effect != null) {
            for (MapleData effectEntry : effect) {
                ret.animationTime += MapleDataTool.getIntConvert("delay", effectEntry, 0);
            }
        }
        return ret;
    }

    @Override
    public MapleStatEffect getEffect(int level) {
        return effects.get(level - 1);
    }

    @Override
    public int getMaxLevel() {
        return effects.size();
    }

    @Override
    public boolean canBeLearnedBy(MapleJob job) {
        int jid = job.getId();
        int skillForJob = id / 10000;
        if (jid / 100 != skillForJob / 100 && skillForJob / 100 != 0) { // wrong job
            return false;
        }
        if ((skillForJob / 10) % 10 > (jid / 10) % 10) { // wrong 2nd job
            return false;
        }
        if (skillForJob % 10 > jid % 10) { // wrong 3rd/4th job
            return false;
        }
        return true;
    }

    @Override
    public boolean isFourthJob() {
        return ((id / 10000) % 10) == 2;
    }

    @Override
    public Element getElement() {
        return element;
    }

    @Override
    public int getAnimationTime() {
        return animationTime;
    }

    @Override
    public boolean isBeginnerSkill() {
        boolean output = false;
        String idString = String.valueOf(id);
        if (idString.length() == 4 || idString.length() == 1) {
            output = true;
        }
        return output;
    }

    @Override
    public boolean hasCharge() {
        return charge;
    }
}