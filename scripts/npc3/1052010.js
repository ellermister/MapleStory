//function start() {

if (cm.getChar().getMapId() == 103000909){
    cm.sendSimple ("恭喜你通过所有考验，你现在要领取奖励吗\r\n#L0#领取奖励#l");
    } else {
    cm.sendOk("找我什么事，想要启动我的力量吗，你需要足够的条件")
    }
}
function action(mode, type, selection) {
cm.dispose();
if (selection == 0) {
            if (cm.getBossLog('SHXTT') >= 1) {
            cm.sendOk("抱歉你只能参加1次");
	    cm.dispose();
        }else{
        cm.gainItem(4031454, 1);
        cm.gainMeso(100000000);
            cm.setBossLog('TGJL');
        cm.warp(910000000, 0);
cm.serverNotice("『三号线3号车库跳跳公告』：【"+ cm.getChar().getName() +"】通过了所有考验获得了。1个圣杯.1亿游戏币。每日只能领取一次.");  
	cm.dispose();
}
} else if (selection == 1) {
	if(cm.haveItem(4021010)) {
cm.serverNotice("『绯红骑士团公告』：【"+ cm.getChar().getName() +"】带领他的队友成功的击败绯红骑士团【巨居蟹】开始挑战第二层");  
        cm.warp(926100000, 0);
	cm.gainItem(4021010, -1000);
	cm.dispose();
        }else{ 
        cm.sendOk("请击败BOSS并且得到通关凭证我才可以让你通过"); 
	cm.dispose(); } 
} else if (selection == 2) {
	if(cm.haveItem(4001035,1)) {
        cm.sendOk("请把你的通行证分给你们的伙伴们。【一个人一张】就可以了，不管你一个人身上有多少通行证，我在把你传送过去的时候，都会把你给收完"); 
	cm.gainItem(4021010,5);
	cm.gainItem(4001035, -100);
        }else{ 
        cm.sendOk("不好意思你需要#v4001035#1个兑换通关凭证"); 
	cm.dispose(); } 
} else if (selection == 3) { 
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400536, 38000000, 35230000, 1);蝙蝠魔(咒印)
	cm.dispose(); } 
} else if (selection == 4) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400120, 48000000, 50000000, 1);男老板 
	cm.dispose(); } 
} else if (selection == 5) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400121, 75000000, 55000000, 1);女老板 
	cm.dispose(); } 
} else if (selection == 6) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400112, 400000000, 100800000, 1);保镖A 
	cm.dispose(); } 
} else if (selection == 7) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400113, 500000000, 125500000, 1);保镖B
	cm.dispose(); } 
} else if (selection == 8) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400300, 600000000, 175000000, 1);恶僧
	cm.dispose(); } 
} else if (selection == 9) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9400549, 700000000, 200300000, 1);火马
	cm.dispose(); } 
} else if (selection == 10) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(8180001, 850000000, 235000000, 1);天鹰
	cm.dispose(); } 
} else if (selection == 11) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.summonMob(8180000, 903700000, 250135000, 1);火焰龙
        cm.gainMeso(-50000000);
	cm.dispose(); } 
} else if (selection == 12) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(9300012, 900000000, 290000000, 1);阿丽莎乐
	cm.dispose(); } 
} else if (selection == 13) {
	if(cm.getMeso() <= 50000000) {
        cm.sendOk("抱歉你没有5000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-50000000);
        cm.summonMob(8220001, 1100000000, 350048000, 1);驮狼雪人
	cm.dispose(); } 
} else if (selection == 110) {
	if(cm.getMeso() <= 50) {
        cm.sendOk("抱歉你没有50。我不能为您召唤"); 
        }else{ 
        cm.warp(100000000, 0);
        cm.gainMeso(-50);
	cm.dispose(); } 
} else if (selection == 100) {
	if(cm.getMeso() <= 300000000) {
        cm.sendOk("抱歉你没有3E。我不能给你"); 
        }else{
        cm.gainMeso(-300000000); 
        cm.gainItem(4031048,1);抽奖卷
	cm.dispose(); } 


} else if (selection == 41) {
	if(cm.getMeso() <= 3000000) {
        cm.sendOk("抱歉你没有300万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-3000000);
        cm.summonMob(9500167, 90000, 6005, 30);金猪
	cm.dispose(); } 
} else if (selection == 42) {
	if(cm.getMeso() <= 4000000) {
        cm.sendOk("抱歉你没有400万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-4000000);
        cm.summonMob(6130207, 95000, 6500, 30);猿公
	cm.dispose(); } 

} else if (selection == 43) {
	if(cm.getMeso() <= 5000000) {
        cm.sendOk("抱歉你没有500万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-5000000);
        cm.summonMob(4230102, 100000, 7050, 30);大幽灵 
	cm.dispose(); } 

} else if (selection == 44) {
	if(cm.getMeso() <= 6000000) {
        cm.sendOk("抱歉你没有600万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-6000000);
        cm.summonMob(9001000, 2500000, 4500, 3);教官
        cm.summonMob(9001001, 2500000, 4500, 3);
        cm.summonMob(9001002, 2500000, 4500, 3);
        cm.summonMob(9001003, 2500000, 4500, 3);
	cm.dispose(); } 

} else if (selection == 45) {
	if(cm.getMeso() <= 7000000) {
        cm.sendOk("抱歉你没有700万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-7000000);
        cm.summonMob(100100, 105000, 7500, 30);绿蜗牛 
	cm.dispose(); } 

} else if (selection == 46) {
	if(cm.getMeso() <= 8000000) {
        cm.sendOk("抱歉你没有800万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-8000000);
        cm.summonMob(7130001, 110000, 8000, 30);猎犬

	cm.dispose(); } 

} else if (selection == 47) {
	if(cm.getMeso() <= 9000000) {
        cm.sendOk("抱歉你没有900万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-9000000);
        cm.summonMob(8140500, 110000, 8000, 30);火焰猎犬
	cm.dispose(); } 

} else if (selection == 48) {
	if(cm.getMeso() <= 10000000) {
        cm.sendOk("抱歉你没有1000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-10000000);
        cm.summonMob(7130200, 115000, 8500, 30);红狼
	cm.dispose(); } 

} else if (selection == 49) {
	if(cm.getMeso() <= 11000000) {
        cm.sendOk("抱歉你没有1100万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-11000000);
        cm.summonMob(8140000, 120000, 9000, 30);白狼
	cm.dispose(); } 

} else if (selection == 50) {
	if(cm.getMeso() <= 12000000) {
        cm.sendOk("抱歉你没有1200万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-12000000);
        cm.summonMob(8140100, 150000, 10000, 30);企鹅王与黑雪人 
	cm.dispose(); } 

} else if (selection == 51) {
	if(cm.getMeso() <= 13000000) {
        cm.sendOk("抱歉你没有1300万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-13000000);
        cm.summonMob(8140103, 155000, 10500, 30);寒冰半人马
	cm.dispose(); } 

} else if (selection == 52) {
	if(cm.getMeso() <= 14000000) {
        cm.sendOk("抱歉你没有1400万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-14000000);
        cm.summonMob(8140101, 160000, 12000, 30);暗黑半人马
	cm.dispose(); } 

} else if (selection == 53) {
	if(cm.getMeso() <= 15000000) {
        cm.sendOk("抱歉你没有1500万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-15000000);
        cm.summonMob(8810020, 180000, 13000, 10);蓝飞龙 
	cm.dispose(); } 

} else if (selection == 54) {
	if(cm.getMeso() <= 16000000) {
        cm.sendOk("抱歉你没有1600万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-16000000);
        cm.summonMob(8810021, 185000, 13500, 10);黑飞龙
	cm.dispose(); } 

} else if (selection == 55) {
	if(cm.getMeso() <= 17000000) {
        cm.sendOk("抱歉你没有1700万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-17000000);
        cm.summonMob(8810023, 220000, 15000, 10);邪恶双刀蜥蜴
	cm.dispose(); } 

} else if (selection == 56) {
	if(cm.getMeso() <= 18000000) {
        cm.sendOk("抱歉你没有1800万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-18000000);
        cm.summonMob(9300077, 350000, 20000, 30);骷髅龙
	cm.dispose(); } 

} else if (selection == 57) {
	if(cm.getMeso() <= 19000000) {
        cm.sendOk("抱歉你没有1900万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-19000000);
        cm.summonMob(8150101, 550000 , 25000, 30);尖鼻鲨鱼 
	cm.dispose(); } 

} else if (selection == 58) {
	if(cm.getMeso() <= 20000000) {
        cm.sendOk("抱歉你没有2000万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-20000000);
        cm.summonMob(8142100, 600000, 26000, 30);致命乌贼怪 
	cm.dispose(); } 

} else if (selection == 59) {
	if(cm.getMeso() <= 21000000) {
        cm.sendOk("抱歉你没有2100万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-21000000);
        cm.summonMob(8160000, 700000, 26500, 30);时间门神 
	cm.dispose(); } 

} else if (selection == 60) {
	if(cm.getMeso() <= 22000000) {
        cm.sendOk("抱歉你没有2200万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-22000000);
        cm.summonMob(8170000, 850000, 27500, 30);黑甲凶灵
	cm.dispose(); } 

} else if (selection == 61) {
	if(cm.getMeso() <= 23000000) {
        cm.sendOk("抱歉你没有2300万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-23000000);
        cm.summonMob(8141100, 900000, 28500, 30);大海贼王
	cm.dispose(); } 
} else if (selection == 62) {
	if(cm.getMeso() <= 24000000) {
        cm.sendOk("抱歉你没有2400万。我不能为您召唤"); 
        }else{ 
        cm.gainMeso(-24000000);
        cm.summonMob(8143000, 1000000, 30000, 30);时之鬼王 
	cm.dispose(); } 
} else if (selection == 63) {
        if (cm.getBossLog('EMGC') < 1) {
cm.warp(910000022, 0);
                    cm.setBossLog('EMGC');
                    cm.dispose();
                }else{
                    cm.sendOk("你每天只能进入1次超级恶魔广场!");
                    mode = 1;
                    status = -1; }
} else if (selection == 64) {
         cm.warp(209000001, 0);
         cm.dispose();  
                
}
}