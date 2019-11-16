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

import java.io.Serializable;
import net.sf.odinms.net.LongValueHolder;

public enum MapleBuffStat implements LongValueHolder, Serializable {

    MORPH(0x2),//变身 橡木伪装 
    RECOVERY(0x4), //新手治疗 
    MAPLE_WARRIOR(0x8), //冒险岛勇士 
    STANCE(0x10), //稳如泰山 
    SHARP_EYES(0x20), //火眼晶晶 
    MANA_REFLECTION(0x40), //魔法反击 
    SHADOW_CLAW(0x100), //暗器伤人
    //INFINITY(0x200),//终极无限 
    INFINITY(0x20000000000000L),//终极无限 
    HOLY_SHIELD(0x400), //圣灵之盾 
    HAMSTRING(0x800),  //缓速箭
    BLIND(0x1000),   //刺眼箭 致盲 
    CONCENTRATE(0x2000),    //集中精力
    ECHO_OF_HERO(0x8000),    //英雄的回声
    GHOST_MORPH(0x20000), // 变身药的BUFF
    BERSERK_FURY(0x8000000),//勇士的意志
    DASH(0x60000000), 
    WATK(0x100000000L),//物攻(葵花宝典、愤怒火) 092
    WDEF(0x200000000L),//防御(圣甲术、铠甲) 092 0x300000000L
    MATK(0x400000000L),//魔攻(精神力等) 092
    MDEF(0x800000000L),//魔法防御 092 0x800000000L
    ACC(0x1000000000L),//命中率 092
  AVOID(0x2000000000L),//回避率 092
  HANDS(0x4000000000L),//手技
  SPEED(0x8000000000L),//速度 疾风步 092
  JUMP(0x10000000000L),//跳跃力(轻功等) 092
 MAGIC_GUARD(0x20000000000L),//魔法盾 092
 DARKSIGHT(0x40000000000L), // 隐身术 092
 BOOSTER(0x80000000000L),//快速矛 快速武器 快速箭 魔法狂暴等快速技能 092
 POWERGUARD(0x100000000000L),//伤害反弹 091
 HYPERBODYHP(0x200000000000L),//神圣之火HP 092
 HYPERBODYMP(0x400000000000L),//神圣之火MP 092
    INVINCIBLE(0x800000000000L),//神之保护 092
    SOULARROW(0x1000000000000L),//无形箭 092
    STUN(0x2000000000000L),//击晕效果 092
  POISON(0x4000000000000L),//毒效果 092
    SEAL(0x8000000000000L),//封印效果 092
    DARKNESS(0x10000000000000L),//暗黑 092
    COMBO(0x20000000000000L),//斗气集中 092
    SUMMON(0x20000000000000L), //召唤兽 风精灵 暗精灵 火魔兽 章鱼炮台 圣龙召唤
    WK_CHARGE(0x40000000000000L),//寒冰冲击 火焰冲击 雷鸣冲击 冰雪矛 092
    DRAGONBLOOD(0x80000000000000L), // 龙之魂 持续-HP 加攻击需要另外的BUFF 092
    HOLY_SYMBOL(0x100000000000000L),//神圣祈祷 092 加经验
    MESOUP(0x200000000000000L),//聚财术
    SHADOWPARTNER(0x400000000000000L),//影分身 092
    PICKPOCKET(0x800000000000000L),//敛财术 092
    PUPPET(0x800000000000000L), // 替身术
    MESOGUARD(0x1000000000000000L),//金钱护盾 092
    WEAKEN(0x4000000000000000L), //虚弱 092
   // ENERGY_CHARGE(0x800000000L),
    MONSTER_RIDING(0x10000000000L),
    SPEED_INFUSION(0x800000000000L),  
    
//特别处理
    ENERGY_CHARGE(0x1000000L),//能量获得
    //MORPH(0x10000000L, 1),//093
   // JUMP(0x6000000L, 1),//疾驰 龙卷风 虽然要叠加2次 但是 |= 叠加2个相同的值的话数值是不变的 所以直接发总的叠加枚举
    //幸运骰子(0x40000L, 3), //多buff 单独处理 


    ;
    static final long serialVersionUID = 0L;
    private final long i;

    private MapleBuffStat(long i) {
        this.i = i;
    }

    @Override
    public long getValue() {
        return i;
    }
}
