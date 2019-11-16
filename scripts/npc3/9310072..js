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
            if (cm.getNX() > 1000) {
			cm.teachSkill(1003,0,0);
				cm.teachSkill(1004,0,0);
				cm.teachSkill(1005,0,0);
				cm.teachSkill(1121011,0,0);
				cm.teachSkill(1221012,0,0);
				cm.teachSkill(1321010,0,0);
				cm.teachSkill(2121008,0,0);
				cm.teachSkill(2221008,0,0);
				cm.teachSkill(2321009,0,0);
				cm.teachSkill(3121009,0,0);
				cm.teachSkill(3221008,0,0);
				cm.teachSkill(4121009,0,0);
				cm.teachSkill(4221008,0,0); //End of max-level "1" skills
				cm.teachSkill(1000002,0,0); //Start of max-level "8" skills
				cm.teachSkill(3000002,0,0);
				cm.teachSkill(4000001,0,0); //End of max-level "8" skills
				cm.teachSkill(1000001,0,0); //Start of max-level "10" skills
				cm.teachSkill(2000001,0,0); //End of max-level "10" skills
				cm.teachSkill(1000000,0,0); //Start of max-level "16" skills
				cm.teachSkill(2000000,0,0);
				cm.teachSkill(3000000,0,0); //End of max-level "16" skills
				cm.teachSkill(1001003,0,0); //Start of max-level "20" skills
				cm.teachSkill(3200001,0,0);
				cm.teachSkill(1001004,0,0);
				cm.teachSkill(1001005,0,0);
				cm.teachSkill(2001002,0,0);
				cm.teachSkill(2001003,0,0);
				cm.teachSkill(2001004,0,0);
				cm.teachSkill(2001005,0,0);
				cm.teachSkill(3000001,0,0);
				cm.teachSkill(3001003,0,0);
				cm.teachSkill(3001004,0,0);
				cm.teachSkill(3001005,0,0);
				cm.teachSkill(4000000,0,0);
				cm.teachSkill(4001344,0,0);
				cm.teachSkill(4001334,0,0);
				cm.teachSkill(4001002,0,0);
				cm.teachSkill(4001003,0,0);
				cm.teachSkill(1101005,0,0);
				cm.teachSkill(1100001,0,0); //Start of mastery's
				cm.teachSkill(1100000,0,0);
				cm.teachSkill(1200001,0,0);
				cm.teachSkill(1200000,0,0);
				cm.teachSkill(1300000,0,0);
				cm.teachSkill(1300001,0,0);
				cm.teachSkill(3100000,0,0);
				cm.teachSkill(3200000,0,0);
				cm.teachSkill(4100000,0,0);
				cm.teachSkill(4200000,0,0); //End of mastery's
				cm.teachSkill(4201002,0,0);
				cm.teachSkill(4101003,0,0);
				cm.teachSkill(3201002,0,0);
				cm.teachSkill(3101002,0,0);
				cm.teachSkill(1301004,0,0);
				cm.teachSkill(1301005,0,0);
				cm.teachSkill(1201004,0,0);
				cm.teachSkill(1201005,0,0);
				cm.teachSkill(1101004,0,0); //End of boosters
				cm.teachSkill(1101006,0,0);
				cm.teachSkill(1201006,0,0);
				cm.teachSkill(1301006,0,0);
				cm.teachSkill(2101001,0,0);
				cm.teachSkill(2100000,0,0);
				cm.teachSkill(2101003,0,0);
				cm.teachSkill(2101002,0,0);
				cm.teachSkill(2201001,0,0);
				cm.teachSkill(2200000,0,0);
				cm.teachSkill(2201003,0,0);
				cm.teachSkill(2201002,0,0);
				cm.teachSkill(2301004,0,0);
				cm.teachSkill(2301003,0,0);
				cm.teachSkill(2300000,0,0);
				cm.teachSkill(2301001,0,0);
				cm.teachSkill(3101003,0,0);
				cm.teachSkill(3101004,0,0);
				cm.teachSkill(3201003,0,0);
				cm.teachSkill(3201004,0,0);
				cm.teachSkill(4100002,0,0);
				cm.teachSkill(4101004,0,0);
				cm.teachSkill(4200001,0,0);
				cm.teachSkill(4201003,0,0); //End of second-job skills and first-job
				cm.teachSkill(4211005,0,0);
				cm.teachSkill(4211003,0,0);
				cm.teachSkill(4210000,0,0);
				cm.teachSkill(4110000,0,0);
				cm.teachSkill(4111001,0,0);
				cm.teachSkill(4111003,0,0);
				cm.teachSkill(3210000,0,0);
				cm.teachSkill(3110000,0,0);
				cm.teachSkill(3210001,0,0);
				cm.teachSkill(3110001,0,0);
				cm.teachSkill(3211002,0,0);
				cm.teachSkill(3111002,0,0);
				cm.teachSkill(2210000,0,0);
				cm.teachSkill(2211004,0,0);
				cm.teachSkill(2211005,0,0);
				cm.teachSkill(2111005,0,0);
				cm.teachSkill(2111004,0,0);
				cm.teachSkill(2110000,0,0);
				cm.teachSkill(2311001,0,0);
				cm.teachSkill(2311005,0,0);
				cm.teachSkill(2310000,0,0);
				cm.teachSkill(1311007,0,0);
				cm.teachSkill(1310000,0,0);
				cm.teachSkill(1311008,0,0);
				cm.teachSkill(1210001,0,0);
				cm.teachSkill(1211009,0,0);
				cm.teachSkill(1210000,0,0);
				cm.teachSkill(1110001,0,0);
				cm.teachSkill(1111007,0,0);
				cm.teachSkill(1110000,0,0); //End of 3rd job skills
				cm.teachSkill(1121000,0,0);
				cm.teachSkill(1221000,0,0);
				cm.teachSkill(1321000,0,0);
				cm.teachSkill(2121000,0,0);
				cm.teachSkill(2221000,0,0);
				cm.teachSkill(2321000,0,0);
				cm.teachSkill(3121000,0,0);
				cm.teachSkill(3221000,0,0);
				cm.teachSkill(4121000,0,0);
				cm.teachSkill(4221000,0,0); //End of Maple Warrior // Also end of max-level "20" skills
				cm.teachSkill(1321007,0,0);//
				cm.teachSkill(1320009,0,0);
				cm.teachSkill(1320008,0,0);
				cm.teachSkill(2321006,0,0);
				cm.teachSkill(1220010,0,0);
				cm.teachSkill(1221004,0,0);
				cm.teachSkill(1221003,0,0);
				cm.teachSkill(1100003,0,0);
				cm.teachSkill(1100002,0,0);
				cm.teachSkill(1101007,0,0);
				cm.teachSkill(1200003,0,0);
				cm.teachSkill(1200002,0,0);
				cm.teachSkill(1201007,0,0);
				cm.teachSkill(1300003,0,0);
				cm.teachSkill(1300002,0,0);
				cm.teachSkill(1301007,0,0);
				cm.teachSkill(2101004,0,0);
				cm.teachSkill(2101005,0,0);
				cm.teachSkill(2201004,0,0);
				cm.teachSkill(2201005,0,0);
				cm.teachSkill(2301002,0,0);
				cm.teachSkill(2301005,0,0);
				cm.teachSkill(3101005,0,0);
				cm.teachSkill(3201005,0,0);
				cm.teachSkill(4100001,0,0);
				cm.teachSkill(4101005,0,0);
				cm.teachSkill(4201005,0,0);
				cm.teachSkill(4201004,0,0);
				cm.teachSkill(1111006,0,0);
				cm.teachSkill(1111005,0,0);
				cm.teachSkill(1111002,0,0);
				cm.teachSkill(1111004,0,0);
				cm.teachSkill(1111003,0,0);
				cm.teachSkill(1111008,0,0);
				cm.teachSkill(1211006,0,0);
				cm.teachSkill(1211002,0,0);
				cm.teachSkill(1211004,0,0);
				cm.teachSkill(1211003,0,0);
				cm.teachSkill(1211005,0,0);
				cm.teachSkill(1211008,0,0);
				cm.teachSkill(1211007,0,0);
				cm.teachSkill(1311004,0,0);
				cm.teachSkill(1311003,0,0);
				cm.teachSkill(1311006,0,0);
				cm.teachSkill(1311002,0,0);
				cm.teachSkill(1311005,0,0);
				cm.teachSkill(1311001,0,0);
				cm.teachSkill(2110001,0,0);
				cm.teachSkill(2111006,0,0);
				cm.teachSkill(2111002,0,0);
				cm.teachSkill(2111003,0,0);
				cm.teachSkill(2210001,0,0);
				cm.teachSkill(2211006,0,0);
				cm.teachSkill(2211002,0,0);
				cm.teachSkill(2211003,0,0);
				cm.teachSkill(2311003,0,0);
				cm.teachSkill(2311002,0,0);
				cm.teachSkill(2311004,0,0);
				cm.teachSkill(2311006,0,0);
				cm.teachSkill(3111004,0,0);
				cm.teachSkill(3111003,0,0);
				cm.teachSkill(3111005,0,0);
				cm.teachSkill(3111006,0,0);
				cm.teachSkill(3211004,0,0);
				cm.teachSkill(3211003,0,0);
				cm.teachSkill(3211005,0,0);
				cm.teachSkill(3211006,0,0);
				cm.teachSkill(4111005,0,0);
				cm.teachSkill(4111006,0,0);
				cm.teachSkill(4111004,0,0);
				cm.teachSkill(4111002,0,0);
				cm.teachSkill(4211002,0,0);
				cm.teachSkill(4211004,0,0);
				cm.teachSkill(4211001,0,0);
				cm.teachSkill(4211006,0,0);
				cm.teachSkill(1120004,0,0);
				//cm.teachSkill(1120003,00);//禁止
				cm.teachSkill(1120005,0,0);
				cm.teachSkill(1121008,0,0);
				//cm.teachSkill(1121010,0,0);//禁止
				cm.teachSkill(1121006,0,0);
				cm.teachSkill(1121002,0,0);
				cm.teachSkill(1220005,0,0);
				cm.teachSkill(1221009,0,0);
				cm.teachSkill(1220006,0,0);
				cm.teachSkill(1221007,0,0);
				cm.teachSkill(1221011,0,0);
				cm.teachSkill(1221002,0,0);
				cm.teachSkill(1320005,0,0);
				cm.teachSkill(1320006,0,0);
				cm.teachSkill(1321003,0,0);
				cm.teachSkill(1321002,0,0);
				cm.teachSkill(2121005,0,0);
				cm.teachSkill(2121003,0,0);
				cm.teachSkill(2121004,0,0);
				cm.teachSkill(2121002,0,0);
				cm.teachSkill(2121007,0,0);
				cm.teachSkill(2121006,0,0);
				cm.teachSkill(2221007,0,0);
				cm.teachSkill(2221006,0,0);
				cm.teachSkill(2221003,0,0);
				cm.teachSkill(2221005,0,0);
				cm.teachSkill(2221004,0,0);
				cm.teachSkill(2221002,0,0);
				cm.teachSkill(2321007,0,0);
				cm.teachSkill(2321003,0,0);
				cm.teachSkill(2321008,0,0);
				cm.teachSkill(2321005,0,0);
				cm.teachSkill(2321004,0,0);
				cm.teachSkill(2321002,0,0);
				cm.teachSkill(3120005,0,0);
				cm.teachSkill(3121008,0,0);
				cm.teachSkill(3121003,0,0);
				cm.teachSkill(3121007,0,0);
				cm.teachSkill(3121006,0,0);
				cm.teachSkill(3121002,0,0);
				cm.teachSkill(3121004,0,0);
				cm.teachSkill(3221006,0,0);
				cm.teachSkill(3220004,0,0);
				cm.teachSkill(3221003,0,0);
				cm.teachSkill(3221005,0,0);
				cm.teachSkill(3221001,0,0);
				cm.teachSkill(3221002,0,0);
				cm.teachSkill(3221007,0,0);
				cm.teachSkill(4121004,0,0);
				cm.teachSkill(4121008,0,0);
				cm.teachSkill(4121003,0,0);
				cm.teachSkill(4121006,0,0);
				cm.teachSkill(4121007,0,0);
				cm.teachSkill(4120005,0,0);
				cm.teachSkill(4221001,0,0);
				cm.teachSkill(4221007,0,0);
				cm.teachSkill(4221004,0,0);
				cm.teachSkill(4221003,0,0);
				cm.teachSkill(4221006,0,0);
				cm.teachSkill(4220005,0,0);
				cm.teachSkill(1321001,0,0);
				cm.teachSkill(4120002,0,0);
				cm.teachSkill(2221001,0,0);
				cm.teachSkill(3100001,0,0);
				cm.teachSkill(1121001,0,0);
				cm.teachSkill(1221001,0,0);
				cm.teachSkill(2121001,0,0);
				cm.teachSkill(2221001,0,0);
				cm.teachSkill(2321001,0,0);
				cm.teachSkill(4220002,0,0);
				cm.teachSkill(8,1,0);
				//Start of Pirate Job Skills
				cm.teachSkill(5000000,0,0); //Bullet Time
				cm.teachSkill(5001001,0,0); //Flash Fist
				cm.teachSkill(5001002,0,0); //Sommersault Kick
				cm.teachSkill(5001003,0,0); //Double Shot
				cm.teachSkill(5001005,0,0); //Dash
				cm.teachSkill(5100000,0,0); //Improve MaxHP
				cm.teachSkill(5100001,0,0); //Knuckler Mastery
				cm.teachSkill(5101002,0,0); //Backspin Blow
				cm.teachSkill(5101003,0,0); //Double Uppercut
				cm.teachSkill(5101004,0,0); //Corkscrew Blow
				cm.teachSkill(5101005,0,0); //MP Recovery
				cm.teachSkill(5101006,0,0); //Knuckler Booster
				cm.teachSkill(5101007,0,0); //Oak Barrel
				cm.teachSkill(5200000,0,0); //Gun Mastery
				cm.teachSkill(5201001,0,0); //Invisible Shot
				cm.teachSkill(5201002,0,0); //Grenade
				cm.teachSkill(5201003,0,0); //Gun Booster
				cm.teachSkill(5201004,0,0); //Blank Shot
				cm.teachSkill(5201005,0,0); //Wings
				cm.teachSkill(5201006,0,0); //Recoil Shot
				cm.teachSkill(5110000,0,0); //Stun Mastery
				cm.teachSkill(5110001,0,0); //Energy Charge
				cm.teachSkill(5111002,0,0); //Energy Blast
				cm.teachSkill(5111004,0,0);  //Energy Drain
				cm.teachSkill(5111005,0,0); //Transformation
				cm.teachSkill(5210000,0,0); //Burst Fire
				cm.teachSkill(5211001,0,0); //Octopus
				cm.teachSkill(5211002,0,0); //Gaviota
				cm.teachSkill(5211004,0,0); //FlameThrower
				cm.teachSkill(5211005,0,0); //Ice Splitter
				cm.teachSkill(5211006,0,0); //Homing Beacon
				cm.teachSkill(5121000,0,0); //Maple Warrior
				cm.teachSkill(5121001,0,0); //Dragon Strike
				cm.teachSkill(5121002,0,0); //Energy Orb
				//cm.teachSkill(5121003,0,0); //禁止//Super Transformation
				cm.teachSkill(5121004,0,0); //Demolition
				cm.teachSkill(5121005,0,0); //Snatch
				cm.teachSkill(5121007,0,0); //Barrage
				cm.teachSkill(5121008,0,0);   //Pirate's Rage
				cm.teachSkill(5121009,0,0); //Speed Infusion
				cm.teachSkill(5121010,0,0); //Time Leap
				cm.teachSkill(5221000,0,0); //Maple Warrior
				cm.teachSkill(5220001,0,0); //Elemental Boost
				cm.teachSkill(5220002,0,0); //Wrath of the Octopi
				cm.teachSkill(5221003,0,0); //Aerial Strike
				cm.teachSkill(5221004,0,0); //Rapid Fire
				cm.teachSkill(5221006,0,0); //BattleShip
				cm.teachSkill(5221007,0,0); //BattleShip Cannon
				cm.teachSkill(5221008,0,0); //BattleShop Torpedo
				cm.teachSkill(5221009,0,0); //Hypnotize
				cm.teachSkill(5221010,0,0); //Speed Infusion
				cm.teachSkill(5220011,0,0); //BullsEye
                                			cm.teachSkill(1004,1,0);
			cm.teachSkill(1003,0,0);
			cm.teachSkill(1009,0,0);
			cm.teachSkill(1005,0,0);
			cm.teachSkill(1006,0,0);
			cm.teachSkill(1007,0,0);
			cm.teachSkill(1010,0,0);
			cm.teachSkill(1011,0,0);
			cm.teachSkill(1013,0,0);
			cm.teachSkill(1015,0,0);
			cm.teachSkill(1016,0,0);
			cm.teachSkill(1017,0,0);
			cm.teachSkill(1020,0,0);
			cm.teachSkill(10000018,0,0);
			cm.teachSkill(10001003,0,0);
			cm.teachSkill(10001004,0,0);
			cm.teachSkill(10001005,0,0);
			cm.teachSkill(10001006,0,0);
			cm.teachSkill(10001007,0,0);
			cm.teachSkill(10001017,0,0);
			cm.teachSkill(20000014,0,0);
			cm.teachSkill(20000015,0,0);
			cm.teachSkill(20000016,0,0);
			cm.teachSkill(20000017,0,0);
			cm.teachSkill(20000018,0,0);
			cm.teachSkill(20000024,0,0);
			cm.teachSkill(20001003,0,0);
			cm.teachSkill(20001004,0,0);
			cm.teachSkill(20001005,0,0);
			cm.teachSkill(20001006,0,0);
			cm.teachSkill(20001007,0,0);
                        cm.maxAllSkills(20);
			cm.sendOk("激活成功");
			cm.dispose();
} else {
  cm.sendOk("抱歉！你并没有1000点券！");
cm.dispose();
			}cm.dispose();
	    }	
}}
