var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("#r你是不是想激活所有技能?但是必须花费1000点券才能帮你激活哦！\r\n（如果你没有点券请联系客服购买或者去市场那边兑换！）\r\n（如果找客服购买你还可以向他索要充值礼包哦！）\r\n   #k被禁止使用的技能为:\r\n 英雄    :#b进阶斗气.葵花宝典.\r\n #k黑骑士  :#b灵魂助力.\r\n #k冲锋队长:#b超级变身.");
		} else if (status == 1) {
            if (cm.getLevel() >= 0) {
			cm.teachSkill(1003,1,1);
				cm.teachSkill(1004,1,0);
				cm.teachSkill(1005,1,0);
				cm.teachSkill(1121011,1,0);
				cm.teachSkill(1221012,1,0);
				cm.teachSkill(1321010,1,0);
				cm.teachSkill(2121008,1,0);
				cm.teachSkill(2221008,1,0);
				cm.teachSkill(2321009,1,0);
				cm.teachSkill(3121009,1,0);
				cm.teachSkill(3221008,1,0);
				cm.teachSkill(4121009,1,0);
				cm.teachSkill(4221008,1,0); //End of max-level "1" skills
				cm.teachSkill(1000002,1,0); //Start of max-level "8" skills
				cm.teachSkill(3000002,1,0);
				cm.teachSkill(4000001,1,0); //End of max-level "8" skills
				cm.teachSkill(1000001,1,0); //Start of max-level "10" skills
				cm.teachSkill(2000001,1,0); //End of max-level "10" skills
				cm.teachSkill(1000000,1,0); //Start of max-level "16" skills
				cm.teachSkill(2000000,1,0);
				cm.teachSkill(3000000,1,0); //End of max-level "16" skills
				cm.teachSkill(1001003,1,0); //Start of max-level "20" skills
				cm.teachSkill(3200001,1,0);
				cm.teachSkill(1001004,1,0);
				cm.teachSkill(1001005,1,0);
				cm.teachSkill(2001002,1,0);
				cm.teachSkill(2001003,1,0);
				cm.teachSkill(2001004,1,0);
				cm.teachSkill(2001005,1,0);
				cm.teachSkill(3000001,1,0);
				cm.teachSkill(3001003,1,0);
				cm.teachSkill(3001004,1,0);
				cm.teachSkill(3001005,1,0);
				cm.teachSkill(4000000,1,0);
				cm.teachSkill(4001344,1,0);
				cm.teachSkill(4001334,1,0);
				cm.teachSkill(4001002,1,0);
				cm.teachSkill(4001003,1,0);
				cm.teachSkill(1101005,1,0);
				cm.teachSkill(1100001,1,0); //Start of mastery's
				cm.teachSkill(1100000,1,0);
				cm.teachSkill(1200001,1,0);
				cm.teachSkill(1200000,1,0);
				cm.teachSkill(1300000,1,0);
				cm.teachSkill(1300001,1,0);
				cm.teachSkill(3100000,1,0);
				cm.teachSkill(3200000,1,0);
				cm.teachSkill(4100000,1,0);
				cm.teachSkill(4200000,1,0); //End of mastery's
				cm.teachSkill(4201002,1,0);
				cm.teachSkill(4101003,1,0);
				cm.teachSkill(3201002,1,0);
				cm.teachSkill(3101002,1,0);
				cm.teachSkill(1301004,1,0);
				cm.teachSkill(1301005,1,0);
				cm.teachSkill(1201004,1,0);
				cm.teachSkill(1201005,1,0);
				cm.teachSkill(1101004,1,0); //End of boosters
				cm.teachSkill(1101006,1,0);
				cm.teachSkill(1201006,1,0);
				cm.teachSkill(1301006,1,0);
				cm.teachSkill(2101001,1,0);
				cm.teachSkill(2100000,1,0);
				cm.teachSkill(2101003,1,0);
				cm.teachSkill(2101002,1,0);
				cm.teachSkill(2201001,1,0);
				cm.teachSkill(2200000,1,0);
				cm.teachSkill(2201003,1,0);
				cm.teachSkill(2201002,1,0);
				cm.teachSkill(2301004,1,0);
				cm.teachSkill(2301003,1,0);
				cm.teachSkill(2300000,1,0);
				cm.teachSkill(2301001,1,0);
				cm.teachSkill(3101003,1,0);
				cm.teachSkill(3101004,1,0);
				cm.teachSkill(3201003,1,0);
				cm.teachSkill(3201004,1,0);
				cm.teachSkill(4100002,1,0);
				cm.teachSkill(4101004,1,0);
				cm.teachSkill(4200001,1,0);
				cm.teachSkill(4201003,1,0); //End of second-job skills and first-job
				cm.teachSkill(4211005,1,0);
				cm.teachSkill(4211003,1,0);
				cm.teachSkill(4210000,1,0);
				cm.teachSkill(4110000,1,0);
				cm.teachSkill(4111001,1,0);
				cm.teachSkill(4111003,1,0);
				cm.teachSkill(3210000,1,0);
				cm.teachSkill(3110000,1,0);
				cm.teachSkill(3210001,1,0);
				cm.teachSkill(3110001,1,0);
				cm.teachSkill(3211002,1,0);
				cm.teachSkill(3111002,1,0);
				cm.teachSkill(2210000,1,0);
				cm.teachSkill(2211004,1,0);
				cm.teachSkill(2211005,1,0);
				cm.teachSkill(2111005,1,0);
				cm.teachSkill(2111004,1,0);
				cm.teachSkill(2110000,1,0);
				cm.teachSkill(2311001,1,0);
				cm.teachSkill(2311005,1,0);
				cm.teachSkill(2310000,1,0);
				cm.teachSkill(1311007,1,0);
				cm.teachSkill(1310000,1,0);
				cm.teachSkill(1311008,1,0);
				cm.teachSkill(1210001,1,0);
				cm.teachSkill(1211009,1,0);
				cm.teachSkill(1210000,1,0);
				cm.teachSkill(1110001,1,0);
				cm.teachSkill(1111007,1,0);
				cm.teachSkill(1110000,1,0); //End of 3rd job skills
				cm.teachSkill(1121000,1,0);
				cm.teachSkill(1221000,1,0);
				cm.teachSkill(1321000,1,0);
				cm.teachSkill(2121000,1,0);
				cm.teachSkill(2221000,1,0);
				cm.teachSkill(2321000,1,0);
				cm.teachSkill(3121000,1,0);
				cm.teachSkill(3221000,1,0);
				cm.teachSkill(4121000,1,0);
				cm.teachSkill(4221000,1,0); //End of Maple Warrior // Also end of max-level "20" skills
				cm.teachSkill(1321007,0,0);//
				cm.teachSkill(1320009,1,0);
				cm.teachSkill(1320008,1,0);
				cm.teachSkill(2321006,1,0);
				cm.teachSkill(1220010,1,0);
				cm.teachSkill(1221004,1,0);
				cm.teachSkill(1221003,1,0);
				cm.teachSkill(1100003,1,0);
				cm.teachSkill(1100002,1,0);
				cm.teachSkill(1101007,1,0);
				cm.teachSkill(1200003,1,0);
				cm.teachSkill(1200002,1,0);
				cm.teachSkill(1201007,1,0);
				cm.teachSkill(1300003,1,0);
				cm.teachSkill(1300002,1,0);
				cm.teachSkill(1301007,1,0);
				cm.teachSkill(2101004,1,0);
				cm.teachSkill(2101005,1,0);
				cm.teachSkill(2201004,1,0);
				cm.teachSkill(2201005,1,0);
				cm.teachSkill(2301002,1,0);
				cm.teachSkill(2301005,1,0);
				cm.teachSkill(3101005,1,0);
				cm.teachSkill(3201005,1,0);
				cm.teachSkill(4100001,1,0);
				cm.teachSkill(4101005,1,0);
				cm.teachSkill(4201005,1,0);
				cm.teachSkill(4201004,1,0);
				cm.teachSkill(1111006,1,0);
				cm.teachSkill(1111005,1,0);
				cm.teachSkill(1111002,1,0);
				cm.teachSkill(1111004,1,0);
				cm.teachSkill(1111003,1,0);
				cm.teachSkill(1111008,1,0);
				cm.teachSkill(1211006,1,0);
				cm.teachSkill(1211002,1,0);
				cm.teachSkill(1211004,1,0);
				cm.teachSkill(1211003,1,0);
				cm.teachSkill(1211005,1,0);
				cm.teachSkill(1211008,1,0);
				cm.teachSkill(1211007,1,0);
				cm.teachSkill(1311004,1,0);
				cm.teachSkill(1311003,1,0);
				cm.teachSkill(1311006,1,0);
				cm.teachSkill(1311002,1,0);
				cm.teachSkill(1311005,1,0);
				cm.teachSkill(1311001,1,0);
				cm.teachSkill(2110001,1,0);
				cm.teachSkill(2111006,1,0);
				cm.teachSkill(2111002,1,0);
				cm.teachSkill(2111003,1,0);
				cm.teachSkill(2210001,1,0);
				cm.teachSkill(2211006,1,0);
				cm.teachSkill(2211002,1,0);
				cm.teachSkill(2211003,1,0);
				cm.teachSkill(2311003,1,0);
				cm.teachSkill(2311002,1,0);
				cm.teachSkill(2311004,1,0);
				cm.teachSkill(2311006,1,0);
				cm.teachSkill(3111004,1,0);
				cm.teachSkill(3111003,1,0);
				cm.teachSkill(3111005,1,0);
				cm.teachSkill(3111006,1,0);
				cm.teachSkill(3211004,1,0);
				cm.teachSkill(3211003,1,0);
				cm.teachSkill(3211005,1,0);
				cm.teachSkill(3211006,1,0);
				cm.teachSkill(4111005,1,0);
				cm.teachSkill(4111006,1,0);
				cm.teachSkill(4111004,1,0);
				cm.teachSkill(4111002,1,0);
				cm.teachSkill(4211002,1,0);
				cm.teachSkill(4211004,1,0);
				cm.teachSkill(4211001,1,0);
				cm.teachSkill(4211006,1,0);
				cm.teachSkill(1120004,1,0);
				//cm.teachSkill(1120003,00);//禁止
				cm.teachSkill(1120005,1,0);
				cm.teachSkill(1121008,1,0);
				//cm.teachSkill(1121010,0,0);//禁止
				cm.teachSkill(1121006,1,0);
				cm.teachSkill(1121002,1,0);
				cm.teachSkill(1220005,1,0);
				cm.teachSkill(1221009,1,0);
				cm.teachSkill(1220006,1,0);
				cm.teachSkill(1221007,1,0);
				cm.teachSkill(1221011,1,0);
				cm.teachSkill(1221002,1,0);
				cm.teachSkill(1320005,1,0);
				cm.teachSkill(1320006,1,0);
				cm.teachSkill(1321003,1,0);
				cm.teachSkill(1321002,1,0);
				cm.teachSkill(2121005,1,0);
				cm.teachSkill(2121003,1,0);
				cm.teachSkill(2121004,1,0);
				cm.teachSkill(2121002,1,0);
				cm.teachSkill(2121007,1,0);
				cm.teachSkill(2121006,1,0);
				cm.teachSkill(2221007,1,0);
				cm.teachSkill(2221006,1,0);
				cm.teachSkill(2221003,1,0);
				cm.teachSkill(2221005,1,0);
				cm.teachSkill(2221004,1,0);
				cm.teachSkill(2221002,1,0);
				cm.teachSkill(2321007,1,0);
				cm.teachSkill(2321003,1,0);
				cm.teachSkill(2321008,1,0);
				cm.teachSkill(2321005,1,0);
				cm.teachSkill(2321004,1,0);
				cm.teachSkill(2321002,1,0);
				cm.teachSkill(3120005,1,0);
				cm.teachSkill(3121008,1,0);
				cm.teachSkill(3121003,1,0);
				cm.teachSkill(3121007,1,0);
				cm.teachSkill(3121006,1,0);
				cm.teachSkill(3121002,1,0);
				cm.teachSkill(3121004,1,0);
				cm.teachSkill(3221006,1,0);
				cm.teachSkill(3220004,1,0);
				cm.teachSkill(3221003,1,0);
				cm.teachSkill(3221005,1,0);
				cm.teachSkill(3221001,1,0);
				cm.teachSkill(3221002,1,0);
				cm.teachSkill(3221007,1,0);
				cm.teachSkill(4121004,1,0);
				cm.teachSkill(4121008,1,0);
				cm.teachSkill(4121003,1,0);
				cm.teachSkill(4121006,1,0);
				cm.teachSkill(4121007,1,0);
				cm.teachSkill(4120005,1,0);
				cm.teachSkill(4221001,1,0);
				cm.teachSkill(4221007,1,0);
				cm.teachSkill(4221004,1,0);
				cm.teachSkill(4221003,1,0);
				cm.teachSkill(4221006,1,0);
				cm.teachSkill(4220005,1,0);
				cm.teachSkill(1321001,1,0);
				cm.teachSkill(4120002,1,0);
				cm.teachSkill(2221001,1,0);
				cm.teachSkill(3100001,1,0);
				cm.teachSkill(1121001,1,0);
				cm.teachSkill(1221001,1,0);
				cm.teachSkill(2121001,1,0);
				cm.teachSkill(2221001,1,0);
				cm.teachSkill(2321001,1,0);
				cm.teachSkill(4220002,1,0);
				cm.teachSkill(8,1,0);
				//Start of Pirate Job Skills
				cm.teachSkill(5000000,1,0); //Bullet Time
				cm.teachSkill(5001001,1,0); //Flash Fist
				cm.teachSkill(5001002,1,0); //Sommersault Kick
				cm.teachSkill(5001003,1,0); //Double Shot
				cm.teachSkill(5001005,1,0); //Dash
				cm.teachSkill(5100000,1,0); //Improve MaxHP
				cm.teachSkill(5100001,1,0); //Knuckler Mastery
				cm.teachSkill(5101002,1,0); //Backspin Blow
				cm.teachSkill(5101003,1,0); //Double Uppercut
				cm.teachSkill(5101004,1,0); //Corkscrew Blow
				cm.teachSkill(5101005,1,0); //MP Recovery
				cm.teachSkill(5101006,1,0); //Knuckler Booster
				cm.teachSkill(5101007,1,0); //Oak Barrel
				cm.teachSkill(5200000,1,0); //Gun Mastery
				cm.teachSkill(5201001,1,0); //Invisible Shot
				cm.teachSkill(5201002,1,0); //Grenade
				cm.teachSkill(5201003,1,0); //Gun Booster
				cm.teachSkill(5201004,1,0); //Blank Shot
				cm.teachSkill(5201005,1,0); //Wings
				cm.teachSkill(5201006,1,0); //Recoil Shot
				cm.teachSkill(5110000,1,0); //Stun Mastery
				cm.teachSkill(5110001,1,0); //Energy Charge
				cm.teachSkill(5111002,1,0); //Energy Blast
				cm.teachSkill(5111004,1,0);  //Energy Drain
				cm.teachSkill(5111005,1,0); //Transformation
				cm.teachSkill(5210000,1,0); //Burst Fire
				cm.teachSkill(5211001,1,0); //Octopus
				cm.teachSkill(5211002,1,0); //Gaviota
				cm.teachSkill(5211004,1,0); //FlameThrower
				cm.teachSkill(5211005,1,0); //Ice Splitter
				cm.teachSkill(5211006,1,0); //Homing Beacon
				cm.teachSkill(5121000,1,0); //Maple Warrior
				cm.teachSkill(5121001,1,0); //Dragon Strike
				cm.teachSkill(5121002,1,0); //Energy Orb
				//cm.teachSkill(5121003,0,0); //禁止//Super Transformation
				cm.teachSkill(5121004,1,0); //Demolition
				cm.teachSkill(5121005,1,0); //Snatch
				cm.teachSkill(5121007,1,0); //Barrage
				cm.teachSkill(5121008,1,0);   //Pirate's Rage
				cm.teachSkill(5121009,1,0); //Speed Infusion
				cm.teachSkill(5121010,1,0); //Time Leap
				cm.teachSkill(5221000,1,0); //Maple Warrior
				cm.teachSkill(5220001,1,0); //Elemental Boost
				cm.teachSkill(5220002,1,0); //Wrath of the Octopi
				cm.teachSkill(5221003,1,0); //Aerial Strike
				cm.teachSkill(5221004,1,0); //Rapid Fire
				cm.teachSkill(5221006,1,0); //BattleShip
				cm.teachSkill(5221007,1,0); //BattleShip Cannon
				cm.teachSkill(5221008,1,0); //BattleShop Torpedo
				cm.teachSkill(5221009,1,0); //Hypnotize
				cm.teachSkill(5221010,1,0); //Speed Infusion
				cm.teachSkill(5220011,1,0); //BullsEye
                                			cm.teachSkill(1004,1,0);
			cm.teachSkill(1003,1,0);
			cm.teachSkill(1009,1,0);
			cm.teachSkill(1005,1,0);
			cm.teachSkill(1006,1,0);
			cm.teachSkill(1007,1,0);
			cm.teachSkill(1010,1,0);
			cm.teachSkill(1011,1,0);
			cm.teachSkill(1013,1,0);
			cm.teachSkill(1015,1,0);
			cm.teachSkill(1016,1,0);
			cm.teachSkill(1017,1,0);
			cm.teachSkill(1020,1,0);
			cm.teachSkill(10000018,1,0);
			cm.teachSkill(10001003,1,0);
			cm.teachSkill(10001004,1,0);
			cm.teachSkill(10001005,1,0);
			cm.teachSkill(10001006,1,0);
			cm.teachSkill(10001007,1,0);
			cm.teachSkill(10001017,1,0);
			cm.teachSkill(20000014,1,0);
			cm.teachSkill(20000015,1,0);
			cm.teachSkill(20000016,1,0);
			cm.teachSkill(20000017,1,0);
			cm.teachSkill(20000018,1,0);
			cm.teachSkill(20000024,1,0);
			cm.teachSkill(20001003,1,0);
			cm.teachSkill(20001004,1,0);
			cm.teachSkill(20001005,1,0);
			cm.teachSkill(20001006,1,0);
			cm.teachSkill(20001007,1,0);
			cm.gainNX(-1000)
                        cm.maxAllSkills(20);
			cm.sendOk("激活成功");
			cm.dispose();
	}else if{
  cm.sendOk("抱歉！你并没有1000点券！");
cm.dispose();
			}cm.dispose();
	    }	
}}
