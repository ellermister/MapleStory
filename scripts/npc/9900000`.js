/*
	This file is part of the cherry Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
                       Matthias Butz <matze@cherry.de>
                       Jan Christian Meyer <vimes@cherry.de>

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

/** Author: Xterminator
	NPC Name: 		NimaKin
	Map(s): 		Victoria Road : Ellinia (180000000)
	Description: 		Maxes out your stats and able to modify your equipment stats
*/
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.tools);

var status = 0;
var slot = Array();
var stats = Array("Strength", "Dexterity", "Intellect", "Luck", "HP", "MP", "Weapon Attack", "Magic Attack", "Weapon Defense", "Magic Defense", "Accuracy", "Avoidability", "Hands", "Speed", "Jump");
var selected;
var statsSel;

function start() {
	status = -1;
	action(0, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getLevel() > 9 ) {  
				cm.sendSimple("您需要激活最大技能吗?#b\r\n#L1#激活最大技能!#k");
			} else {
				cm.sendOk("对不起，等级底于10级不给你使用这个NPC");
				cm.dispose();
			}
		} else if (status == 1) {
			if (selection == 0) {
				var statup = new java.util.ArrayList();
				var p = cm.getPlayer();
				p.setRemainingAp(0);
				p.setRemainingSp(0);
				p.setStr(32767);
				p.setDex(32767);
				p.setInt(32767);
				p.setLuk(32767);
				p.setHp(30000);
				p.setMaxHp(30000);
				p.setMp(30000);
				p.setMaxMp(30000);
				statup.add(new Pair(MapleStat.STR, java.lang.Integer.valueOf(32767)));
				statup.add(new Pair(MapleStat.DEX, java.lang.Integer.valueOf(32767)));
				statup.add(new Pair(MapleStat.LUK, java.lang.Integer.valueOf(32767)));
				statup.add(new Pair(MapleStat.INT, java.lang.Integer.valueOf(32767)));
				statup.add(new Pair(MapleStat.HP, java.lang.Integer.valueOf(30000)));
				statup.add(new Pair(MapleStat.MAXHP, java.lang.Integer.valueOf(30000)));
				statup.add(new Pair(MapleStat.MP, java.lang.Integer.valueOf(30000)));
				statup.add(new Pair(MapleStat.MAXMP, java.lang.Integer.valueOf(30000)));
				statup.add(new Pair(MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(p.getRemainingAp())));
				statup.add(new Pair(MapleStat.AVAILABLESP, java.lang.Integer.valueOf(p.getRemainingSp())));
				cm.getC().getSession().write(MaplePacketCreator.updatePlayerStats(statup));
				cm.sendOk("I have maxed your stats. Happy Mapling!");
				cm.dispose();
			} else if (selection == 1) {
				cm.teachSkill(1000,0,1);
				cm.teachSkill(1004,0,1);
				cm.teachSkill(1005,0,1);
                                                        cm.teachSkill(0000,0,1);
                                                        cm.teachSkill(1000,0,3);
                                                        cm.teachSkill(1000,0,3);
                                                        cm.teachSkill(1002,0,3);
				cm.teachSkill(10000012,0,20);
				cm.teachSkill(20001000,0,3);
				cm.teachSkill(20001000,0,3);
				cm.teachSkill(20001002,0,3);
				cm.teachSkill(20001000,0,3);
				cm.teachSkill(20001004,0,1);
				cm.teachSkill(20001005,0,1);
				cm.teachSkill(20000024,0,1);
				cm.teachSkill(20000012,0,20);
				cm.teachSkill(21000000,0,10); //矛连击强化
				cm.teachSkill(21001000,15,15); //战斗步伐
				cm.teachSkill(21000002,0,20); //双重重击
				cm.teachSkill(21001000,0,20); //快速矛
				cm.teachSkill(21100000,0,20); //精准矛
				cm.teachSkill(21100000,0,20); //三重重击
				cm.teachSkill(21100002,0,30); //战神突进
				cm.teachSkill(21101000,0,20); //抗压
				cm.teachSkill(21100004,0,20); //斗气爆裂
				cm.teachSkill(21100005,0,20); //连环吸血
				cm.teachSkill(21110000,0,20); //爆击强化
				cm.teachSkill(21111000,0,20); //灵巧击退
				cm.teachSkill(21110002,0,20); //全力挥击
				cm.teachSkill(21110000,0,30); //终极投掷
				cm.teachSkill(21110004,0,30); //幻影狼牙
				cm.teachSkill(21111005,0,20); //冰雪矛
				cm.teachSkill(21110006,0,20); //旋风
				cm.teachSkill(21110007,0,20); //全力挥击
				cm.teachSkill(21110000,0,20); //全力挥击
				cm.teachSkill(21121000,0,30); //冒险岛勇士
				cm.teachSkill(21120000,0,30); //攻击策略
				cm.teachSkill(21120002,0,30); //战神之舞
				cm.teachSkill(21121000,0,30); //战神的意志
				cm.teachSkill(21120004,0,30); //防守策略
				cm.teachSkill(21120005,0,30); //巨熊咆哮
				cm.teachSkill(21120006,0,30); //钻石星辰
				cm.teachSkill(21120007,0,30); //战神之盾
				cm.teachSkill(21121000,5,5); //勇士的意志
				cm.teachSkill(9001000,0,1);
				cm.teachSkill(9001000,0,1);
				cm.teachSkill(9001002,0,1);
				cm.teachSkill(9001000,0,1);
				cm.teachSkill(9001004,0,1);
				cm.teachSkill(9001005,0,1);
				cm.teachSkill(9001006,0,1);
				cm.teachSkill(9001007,0,1);
				cm.teachSkill(9001000,0,1);
				cm.teachSkill(9001009,0,1);
				cm.teachSkill(1121010,0,1);
				cm.teachSkill(1221012,0,1);
				cm.teachSkill(132100,0,1);
				cm.teachSkill(2121000,0,1);
				cm.teachSkill(2221000,0,1);
				cm.teachSkill(2321009,0,1);
				cm.teachSkill(3121009,0,1);
				cm.teachSkill(3221000,0,1);
				cm.teachSkill(4121009,0,1);
				cm.teachSkill(4221000,0,1); //End of max-level "1" skills
				cm.teachSkill(1000002,0,8); //Start of max-level "8" skills
				cm.teachSkill(3000002,0,8);
				cm.teachSkill(4000000,0,8); //End of max-level "8" skills
				cm.teachSkill(1000000,0,10); //Start of max-level "10" skills
				cm.teachSkill(2000000,0,10); //End of max-level "10" skills
				cm.teachSkill(1000000,0,16); //Start of max-level "16" skills
				cm.teachSkill(2000000,0,16);
				cm.teachSkill(3000000,0,16); //End of max-level "16" skills
				cm.teachSkill(1001000,0,20); //Start of max-level "20" skills
				cm.teachSkill(3200000,0,30);
				cm.teachSkill(1001004,0,20);
				cm.teachSkill(1001005,0,20);
				cm.teachSkill(2001002,0,20);
				cm.teachSkill(2001000,0,20);
				cm.teachSkill(2001004,0,20);
				cm.teachSkill(2001005,0,20);
				cm.teachSkill(3000000,0,20);
				cm.teachSkill(3001000,0,20);
				cm.teachSkill(3001004,0,20);
				cm.teachSkill(3001005,0,20);
				cm.teachSkill(4000000,0,20);
				cm.teachSkill(4001344,0,20);
				cm.teachSkill(4001334,0,20);
				cm.teachSkill(4001002,0,20);
				cm.teachSkill(4001000,0,20);
				cm.teachSkill(1101005,0,20);
				cm.teachSkill(1100000,0,20); //Start of mastery's
				cm.teachSkill(1100000,0,20);
				cm.teachSkill(1200000,0,20);
				cm.teachSkill(1200000,0,20);
				cm.teachSkill(1300000,0,20);
				cm.teachSkill(1300000,0,20);
				cm.teachSkill(3100000,0,20);
				cm.teachSkill(3200000,0,20);
				cm.teachSkill(4100000,0,20);
				cm.teachSkill(4200000,0,20); //End of mastery's
				cm.teachSkill(4201002,0,20);
				cm.teachSkill(4101000,0,20);
				cm.teachSkill(3201002,0,20);
				cm.teachSkill(3101002,0,20);
				cm.teachSkill(1301004,0,20);
				cm.teachSkill(1301005,0,20);
				cm.teachSkill(1201004,0,20);
				cm.teachSkill(1201005,0,20);
				cm.teachSkill(1101004,0,20); //End of boosters
				cm.teachSkill(1101006,0,20);
				cm.teachSkill(1201006,0,20);
				cm.teachSkill(1301006,0,20);
				cm.teachSkill(2101000,0,20);
				cm.teachSkill(2100000,0,20);
				cm.teachSkill(2101000,0,20);
				cm.teachSkill(2101002,0,20);
				cm.teachSkill(2201000,0,20);
				cm.teachSkill(2200000,0,20);
				cm.teachSkill(2201000,0,20);
				cm.teachSkill(2201002,0,20);
				cm.teachSkill(2301004,0,20);
				cm.teachSkill(2301000,0,20);
				cm.teachSkill(2300000,0,20);
				cm.teachSkill(2301000,0,20);
				cm.teachSkill(3101000,0,20);
				cm.teachSkill(3101004,0,20);
				cm.teachSkill(3201000,0,20);
				cm.teachSkill(3201004,0,20);
				cm.teachSkill(4100002,0,20);
				cm.teachSkill(4101004,0,20);
				cm.teachSkill(4200000,0,20);
				cm.teachSkill(4201000,0,20); //End of second-job skills and first-job
				cm.teachSkill(4211005,0,20);
				cm.teachSkill(4211000,0,20);
				cm.teachSkill(4210000,0,20);
				cm.teachSkill(4110000,0,20);
				cm.teachSkill(4111000,0,20);
				cm.teachSkill(4111000,0,20);
				cm.teachSkill(3210000,0,20);
				cm.teachSkill(3110000,0,20);
				cm.teachSkill(3210000,0,20);
				cm.teachSkill(3110000,0,20);
				cm.teachSkill(3211002,0,20);
				cm.teachSkill(3111002,0,20);
				cm.teachSkill(2210000,0,20);
				cm.teachSkill(2211004,0,20);
				cm.teachSkill(2211005,0,20);
				cm.teachSkill(2111005,0,20);
				cm.teachSkill(2111004,0,20);
				cm.teachSkill(2110000,0,20);
				cm.teachSkill(2311000,0,20);
				cm.teachSkill(2311005,0,30);
				cm.teachSkill(2310000,0,20);
				cm.teachSkill(1311007,0,20);
				cm.teachSkill(1310000,0,20);
				cm.teachSkill(1311000,0,20);
				cm.teachSkill(1210000,0,20);
				cm.teachSkill(1211009,0,20);
				cm.teachSkill(1210000,0,20);
				cm.teachSkill(1110000,0,20);
				cm.teachSkill(1111007,0,20);
				cm.teachSkill(1110000,0,20); //End of 3rd job skills
				cm.teachSkill(1121000,0,20);
				cm.teachSkill(1221000,0,20);
				cm.teachSkill(1321000,0,20);
				cm.teachSkill(2121000,0,20);
				cm.teachSkill(2221000,0,20);
				cm.teachSkill(2321000,0,20);
				cm.teachSkill(3121000,0,20);
				cm.teachSkill(3221000,0,20);
				cm.teachSkill(4121000,0,20);
				cm.teachSkill(4221000,0,20); //End of Maple Warrior // Also end of max-level "20" skills
				cm.teachSkill(1321007,0,10);
				cm.teachSkill(1320009,0,25);
				cm.teachSkill(1320000,0,25);
				cm.teachSkill(2321006,0,10);
				cm.teachSkill(122000,0,10);
				cm.teachSkill(1221004,0,25);
				cm.teachSkill(1221000,0,25);
				cm.teachSkill(1100000,0,30);
				cm.teachSkill(1100002,0,30);
				cm.teachSkill(1101007,0,30);
				cm.teachSkill(1200000,0,30);
				cm.teachSkill(1200002,0,30);
				cm.teachSkill(1201007,0,30);
				cm.teachSkill(1300000,0,30);
				cm.teachSkill(1300002,0,30);
				cm.teachSkill(1301007,0,30);
				cm.teachSkill(2101004,0,30);
				cm.teachSkill(2101005,0,30);
				cm.teachSkill(2201004,0,30);
				cm.teachSkill(2201005,0,30);
				cm.teachSkill(2301002,0,30);
				cm.teachSkill(2301005,0,30);
				cm.teachSkill(3101005,0,30);
				cm.teachSkill(3201005,0,30);
				cm.teachSkill(4100000,0,30);
				cm.teachSkill(4101005,0,30);
				cm.teachSkill(4201005,0,30);
				cm.teachSkill(4201004,0,30);
				cm.teachSkill(1111006,0,30);
				cm.teachSkill(1111005,0,30);
				cm.teachSkill(1111002,0,30);
				cm.teachSkill(1111004,0,30);
				cm.teachSkill(1111000,0,30);
				cm.teachSkill(1111000,0,30);
				cm.teachSkill(1211006,0,30);
				cm.teachSkill(1211002,0,30);
				cm.teachSkill(1211004,0,30);
				cm.teachSkill(1211000,0,30);
				cm.teachSkill(1211005,0,30);
				cm.teachSkill(1211000,0,30);
				cm.teachSkill(1211007,0,30);
				cm.teachSkill(1311004,0,30);
				cm.teachSkill(1311000,0,30);
				cm.teachSkill(1311006,0,30);
				cm.teachSkill(1311002,0,30);
				cm.teachSkill(1311005,0,30);
				cm.teachSkill(1311000,0,30);
				cm.teachSkill(2110000,0,30);
				cm.teachSkill(2111006,0,30);
				cm.teachSkill(2111002,0,30);
				cm.teachSkill(2111000,0,30);
				cm.teachSkill(2210000,0,30);
				cm.teachSkill(2211006,0,30);
				cm.teachSkill(2211002,0,30);
				cm.teachSkill(2211000,0,30);
				cm.teachSkill(2311000,0,30);
				cm.teachSkill(2311002,0,30);
				cm.teachSkill(2311004,0,30);
				cm.teachSkill(2311006,0,30);
				cm.teachSkill(3111004,0,30);
				cm.teachSkill(3111000,0,30);
				cm.teachSkill(3111005,0,30);
				cm.teachSkill(3111006,0,30);
				cm.teachSkill(3211004,0,30);
				cm.teachSkill(3211000,0,30);
				cm.teachSkill(3211005,0,30);
				cm.teachSkill(3211006,0,30);
				cm.teachSkill(4111005,0,30);
				cm.teachSkill(4111006,0,20);
				cm.teachSkill(4111004,0,30);
				cm.teachSkill(4111002,0,30);
				cm.teachSkill(4211002,0,30);
				cm.teachSkill(4211004,0,30);
				cm.teachSkill(4211000,0,30);
				cm.teachSkill(4211006,0,30);
				cm.teachSkill(1120004,0,30);
				cm.teachSkill(1120000,0,30);
				cm.teachSkill(1120005,0,30);
				cm.teachSkill(1121000,0,30);
				cm.teachSkill(1121000,0,30);
				cm.teachSkill(112100,0,30);
                                                        cm.teachSkill(1121010,5,5);
				cm.teachSkill(1121006,0,30);
				cm.teachSkill(1121002,0,30);
				cm.teachSkill(1220005,0,30);
				cm.teachSkill(1221009,0,30);
				cm.teachSkill(1220006,0,30);
				cm.teachSkill(1221007,0,30);
				cm.teachSkill(1221010,0,30);
                                                        cm.teachSkill(1221012,5,5);
				cm.teachSkill(1221002,0,30);
				cm.teachSkill(1221000,0,30);
				cm.teachSkill(1320005,0,30);
				cm.teachSkill(1320006,0,30);
				cm.teachSkill(1321000,0,30);
				cm.teachSkill(1321002,0,30);
				cm.teachSkill(1321000,0,30);
                                                        cm.teachSkill(132100,5,5);
				cm.teachSkill(2121005,0,30);
				cm.teachSkill(2121000,0,30);
				cm.teachSkill(2121004,0,30);
				cm.teachSkill(2121002,0,30);
				cm.teachSkill(2121007,0,30);
				cm.teachSkill(2121006,0,30);
                                                        cm.teachSkill(2121000,5,5);
				cm.teachSkill(2121000,0,30);
				cm.teachSkill(2221007,0,30);
				cm.teachSkill(2221006,0,30);
				cm.teachSkill(2221000,0,30);
				cm.teachSkill(2221005,0,30);
				cm.teachSkill(2221004,0,30);
				cm.teachSkill(2221002,0,30);
                                                        cm.teachSkill(2221000,5,5);
				cm.teachSkill(2221000,0,30);
				cm.teachSkill(2321007,0,30);
				cm.teachSkill(2321000,0,30);
				cm.teachSkill(2321000,0,30);
                                                        cm.teachSkill(2321009,5,5);
				cm.teachSkill(2321005,0,30);
				cm.teachSkill(2321004,0,30);
				cm.teachSkill(2321000,0,30);
				cm.teachSkill(2321002,0,30);
				cm.teachSkill(3120005,0,30);
				cm.teachSkill(3121000,0,30);
				cm.teachSkill(3121000,0,30);
                                                        cm.teachSkill(3121009,5,5);
				cm.teachSkill(3121000,0,30);
				cm.teachSkill(3121007,0,30);
				cm.teachSkill(3121006,0,30);
                                                        cm.teachSkill(3121000,0,30);
				cm.teachSkill(3121002,0,30);
				cm.teachSkill(3121004,0,30);
				cm.teachSkill(3221006,0,30);
				cm.teachSkill(3221000,0,30);
				cm.teachSkill(3220004,0,30);
                                                        cm.teachSkill(3221000,0,30);
				cm.teachSkill(3221000,0,30);
				cm.teachSkill(3221005,0,30);
				cm.teachSkill(3221000,0,30);
				cm.teachSkill(3221002,0,30);
				cm.teachSkill(3221007,0,30);
                                                        cm.teachSkill(3221000,5,5);
				cm.teachSkill(4121004,0,30);
				cm.teachSkill(4121000,0,30);
				cm.teachSkill(4121000,0,30);
				cm.teachSkill(4121000,0,30);
				cm.teachSkill(4121006,0,30);
				cm.teachSkill(4121007,0,30);
                                                        cm.teachSkill(4121000,0,30);
                                                        cm.teachSkill(4121009,5,5);
				cm.teachSkill(4120005,0,30);
				cm.teachSkill(4221000,0,30);
				cm.teachSkill(4221007,0,30);
				cm.teachSkill(4221004,0,30);
                                                        cm.teachSkill(4221000,0,30);  
				cm.teachSkill(4221000,0,30);
				cm.teachSkill(4221000,0,30);
				cm.teachSkill(4221006,0,30);
                                                        cm.teachSkill(4221000,5,5);
				cm.teachSkill(4220005,0,30);
				cm.teachSkill(1321000,0,30);
				cm.teachSkill(4120002,0,30);
				cm.teachSkill(2221000,0,30);
				cm.teachSkill(3100000,0,30);
				cm.teachSkill(1121000,0,30);
				cm.teachSkill(1221000,0,30);
				cm.teachSkill(2121000,0,30);
				cm.teachSkill(2221000,0,30);
				cm.teachSkill(2321000,0,30);
				cm.teachSkill(4220002,0,30);
				cm.teachSkill(0,0,1);
				//Start of Pirate Job Skills
				cm.teachSkill(5000000,0,20); //Bullet Time
				cm.teachSkill(5001000,0,20); //Flash Fist
				cm.teachSkill(5001002,0,20); //Sommersault Kick
				cm.teachSkill(5001000,0,20); //Double Shot
				cm.teachSkill(5001005,0,10); //Dash
				cm.teachSkill(5100000,0,10); //Improve MaxHP
				cm.teachSkill(5100000,0,20); //Knuckler Mastery
				cm.teachSkill(5101002,0,20); //Backspin Blow
				cm.teachSkill(5101000,0,20); //Double Uppercut
				cm.teachSkill(5101004,0,20); //Corkscrew Blow
				cm.teachSkill(5101005,0,10); //MP Recovery
				cm.teachSkill(5101006,0,20); //Knuckler Booster
				cm.teachSkill(5101007,0,10); //Oak Barrel
				cm.teachSkill(5200000,0,20); //Gun Mastery
				cm.teachSkill(5201000,0,20); //Invisible Shot
				cm.teachSkill(5201002,0,20); //Grenade
				cm.teachSkill(5201000,0,20); //Gun Booster
				cm.teachSkill(5201004,0,20); //Blank Shot
				cm.teachSkill(5201005,0,10); //Wings
				cm.teachSkill(5201006,0,20); //Recoil Shot
				cm.teachSkill(5110000,0,20); //Stun Mastery
				cm.teachSkill(5110000,0,40); //Energy Charge
				cm.teachSkill(5111002,0,30); //Energy Blast
				cm.teachSkill(5111004,0,20);  //Energy Drain
				cm.teachSkill(5111005,0,20); //Transformation
				cm.teachSkill(5210000,0,20); //Burst Fire
				cm.teachSkill(5211000,0,30); //Octopus
				cm.teachSkill(5211002,0,30); //Gaviota
				cm.teachSkill(5211004,0,30); //FlameThrower
				cm.teachSkill(5211005,0,30); //Ice Splitter
				cm.teachSkill(5211006,0,30); //Homing Beacon
				cm.teachSkill(5121000,0,30); //Maple Warrior
				cm.teachSkill(5121000,0,30); //Dragon Strike
				cm.teachSkill(5121002,0,30); //Energy Orb
				cm.teachSkill(5121000,0,20); //Super Transformation
				cm.teachSkill(5121004,0,30); //Demolition
				cm.teachSkill(5121005,0,30); //Snatch
                                                        cm.teachSkill(5111006,0,30); //Caonima
				cm.teachSkill(5121007,0,30); //Barrage
				cm.teachSkill(5121000,0,30);   //Pirate's Rage
				cm.teachSkill(5121009,0,20); //Speed Infusion
				cm.teachSkill(512100,0,30); //Time Leap
				cm.teachSkill(5221000,0,30); //Maple Warrior
				cm.teachSkill(5220000,0,30); //Elemental Boost
				cm.teachSkill(5220002,0,20); //Wrath of the Octopi
				cm.teachSkill(5221000,0,30); //Aerial Strike
				cm.teachSkill(5221004,0,30); //Rapid Fire
				cm.teachSkill(5221006,0,10); //BattleShip
				cm.teachSkill(5221007,0,30); //BattleShip Cannon
				cm.teachSkill(5221000,0,30); //BattleShop Torpedo
				cm.teachSkill(5221009,0,20); //Hypnotize
				cm.teachSkill(522100,0,25); //Speed Infusion
				cm.teachSkill(5220010,0,20); //BullsEye
				//战童
				//cm.teachSkill(21000000,0,10); //矛连击强化
				//cm.teachSkill(21001000,15,15); //战斗步伐
				//cm.teachSkill(21000002,0,20); //双重重击
				//cm.teachSkill(21001000,0,20); //快速矛
				//cm.teachSkill(21100000,0,20); //精准矛
				//cm.teachSkill(21100000,0,20); //三重重击
				//cm.teachSkill(21100002,0,30); //战神突进
				//cm.teachSkill(21101000,0,20); //抗压
				//cm.teachSkill(21100004,0,20); //斗气爆裂
				//cm.teachSkill(21100005,0,20); //连环吸血
				//cm.teachSkill(21110000,0,20); //爆击强化
				//cm.teachSkill(21111000,0,20); //灵巧击退
				//cm.teachSkill(21110002,0,20); //全力挥击
				//cm.teachSkill(21110000,0,30); //终极投掷
				//cm.teachSkill(21110004,0,30); //幻影狼牙
				//cm.teachSkill(21111005,0,20); //冰雪矛
				//cm.teachSkill(21110006,0,20); //旋风
				//cm.teachSkill(21110007,0,20); //全力挥击
				//cm.teachSkill(21110000,0,20); //全力挥击
				//cm.teachSkill(21121000,0,30); //冒险岛勇士
				//cm.teachSkill(21120000,0,30); //攻击策略
				//cm.teachSkill(21120002,0,30); //战神之舞
				//cm.teachSkill(21121000,0,30); //战神的意志
				//cm.teachSkill(21120004,0,30); //防守策略
				//cm.teachSkill(21120005,0,30); //巨熊咆哮
				//cm.teachSkill(21120006,0,30); //钻石星辰
				//cm.teachSkill(21120007,0,30); //战神之盾
				//cm.teachSkill(21121000,5,5); //勇士的意志
 //魂骑士
				cm.teachSkill(11000000,0,10); //生命加强
				cm.teachSkill(11001000,0,10); //圣甲术
				cm.teachSkill(11001002,0,20); //强力攻击
				cm.teachSkill(11001000,0,20); //群体攻击
				cm.teachSkill(11001004,0,20); //魂精灵
				cm.teachSkill(11100000,0,20); //精准剑
				cm.teachSkill(11101000,0,20); //快速剑
				cm.teachSkill(11101002,0,30); //终极剑
				cm.teachSkill(11101000,0,20); //愤怒之火
				cm.teachSkill(11101004,0,30); //灵魂之刃
				cm.teachSkill(11101005,0,10); //灵魂迅移
				cm.teachSkill(11110000,0,20); //魔力恢复
				cm.teachSkill(11111000,0,20); //斗气集中
				cm.teachSkill(11111002,0,20); //恐慌
				cm.teachSkill(11111000,0,20); //昏迷
				cm.teachSkill(11111004,0,30); //轻舞飞扬
				cm.teachSkill(11110005,0,20); //进阶斗气
				cm.teachSkill(11111006,0,30); //灵魂突刺
				cm.teachSkill(11111007,0,20); //灵魂属性
 //炎术士
				cm.teachSkill(12000000,0,10); //魔力强化
				cm.teachSkill(12001000,0,10); //魔法盾
				cm.teachSkill(12001002,0,10); //魔法铠甲
				cm.teachSkill(12001000,0,20); //魔法双击
				cm.teachSkill(12001004,0,20); //炎精灵
				cm.teachSkill(12101000,0,20); //精神力
				cm.teachSkill(12101000,0,20); //缓速术
				cm.teachSkill(12101002,0,20); //火焰箭
				cm.teachSkill(12101000,0,20); //快速移动
				cm.teachSkill(12101004,0,20); //魔法狂暴
				cm.teachSkill(12101005,0,20); //自然力重置
				cm.teachSkill(12101006,0,20); //火柱
				cm.teachSkill(12110000,0,20); //魔法抗性
				cm.teachSkill(12110000,0,20); //魔力激化
				cm.teachSkill(12111002,0,20); //封印术
				cm.teachSkill(12111000,0,20); //天降落星
				cm.teachSkill(12111004,0,20); //火魔兽
				cm.teachSkill(12111005,0,30); //火牢术屏障
				cm.teachSkill(12111006,0,30); //火风暴
				cm.teachSkill(13000000,0,20); //强力箭
				cm.teachSkill(13000000,0,8); //远程箭
				cm.teachSkill(13001002,0,10); //集中术
				cm.teachSkill(13001000,0,20); //二连射
				cm.teachSkill(13001004,0,20); //风精灵
				cm.teachSkill(13100000,0,20); //精准弓
				cm.teachSkill(13101000,0,20); //快速箭
				cm.teachSkill(13101002,0,30); //终极弓
				cm.teachSkill(13101000,0,20); //无形箭
				cm.teachSkill(13100004,0,20); //疾风步
				cm.teachSkill(13101005,0,20); //暴风射击
				cm.teachSkill(13101006,0,10); //风影漫步
				cm.teachSkill(13111000,0,20); //箭雨
				cm.teachSkill(13111000,0,30); //箭扫射
				cm.teachSkill(13111002,0,20); //暴风箭雨
				cm.teachSkill(13110000,0,20); //神箭手
				cm.teachSkill(13111004,0,20); //替身术
				cm.teachSkill(13111005,0,10); //信天翁
				cm.teachSkill(13111006,0,20); //风灵穿越
				cm.teachSkill(13111007,0,20); //疾风扫射
				cm.teachSkill(14000000,0,10); //集中术
				cm.teachSkill(14000000,0,8); //远程暗器
				cm.teachSkill(14001002,0,10); //诅咒术
				cm.teachSkill(14001000,0,10); //隐身术
				cm.teachSkill(14001004,0,20); //双飞斩
				cm.teachSkill(14001005,0,20); //夜精灵
				cm.teachSkill(14100000,0,20); //精准暗器
				cm.teachSkill(14100000,0,30); //强力投掷
				cm.teachSkill(14101002,0,20); //快速暗器
				cm.teachSkill(14101000,0,20); //轻功
				cm.teachSkill(14101004,0,20); //二段跳
				cm.teachSkill(14100005,0,10); //驱逐
				cm.teachSkill(14101006,0,20); //吸血
				cm.teachSkill(14111000,0,30); //影分身
				cm.teachSkill(14111000,0,20); //影网术
				cm.teachSkill(14111002,0,30); //多重飞镖
				cm.teachSkill(14110000,0,20); //药剂精通
				cm.teachSkill(14110004,0,20); //武器用毒液
				cm.teachSkill(14111005,0,20); //三连环光击破
				cm.teachSkill(14111006,0,30); //毒炸弹
				cm.teachSkill(15000000,0,10); //快动作
				cm.teachSkill(15001000,0,20); //百裂拳
				cm.teachSkill(15001002,0,20); //半月踢
				cm.teachSkill(15001000,0,10); //疾驰
				cm.teachSkill(15001004,0,20); //雷精灵
				cm.teachSkill(15100000,0,10); //强体术
				cm.teachSkill(15100000,0,20); //精准拳
				cm.teachSkill(15101002,0,20); //急速拳
				cm.teachSkill(15101000,0,20); //贯骨击
				cm.teachSkill(15100004,0,20); //能量获得
				cm.teachSkill(15101005,0,20); //能量爆破
				cm.teachSkill(15101006,0,20); //雷鸣
				cm.teachSkill(15110000,0,20); //必杀拳
				cm.teachSkill(15111000,0,20); //能量耗转
				cm.teachSkill(15111002,0,10); //超人变形
				cm.teachSkill(15111000,0,20); //碎石乱击
				cm.teachSkill(15111004,0,20); //光速拳
				cm.teachSkill(15111005,0,20); //极速领域
				cm.teachSkill(15111006,0,20); //闪光击
				cm.teachSkill(15111007,0,30); //鲨鱼波


				cm.dispose();
			} else if (selection == 2) {
				var avail = "";
				for (var i = -1; i > -18; i--) {
					if (cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(i) != null) {
						avail += "#L" + Math.abs(i) + "##t" + cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(i).getItemId() + "##l\r\n";
					}
					slot.push(i);
				}
				cm.sendSimple("Which one of your equips would you like to modify?\r\n#b" + avail);
			}
		} else if (status == 2) {
			selected = selection - 1;
			var text = "";
			for (var i = 0; i < stats.length; i++) {
				text += "#L" + i + "#" + stats[i] + "#l\r\n";
			}
			cm.sendSimple("You have decided to modify your #b#t" + cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot[selected]).getItemId() + "##k.\r\nWhich stat would you like to modify?\r\n#b" + text);
		} else if (status == 3) {
			statsSel = selection;
			cm.sendGetNumber("What would you like to set your #b#t" + cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot[selected]).getItemId() + "##k's " + stats[statsSel] + " to?", 0, 0, 32767);
		} else if (status == 4) {
			cm.changeStat(slot[selected], statsSel, selection);
			cm.sendOk("Your #b#t" + cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot[selected]).getItemId() + "##k's " + stats[statsSel] + " has been set to " + selection + ".");
			cm.dispose();
		}
	}
}
