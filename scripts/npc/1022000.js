/*
@ 勇士部落教官NPC
@ 城管大队头头????
*/

var status;

function start() {
	status = -1;
	action(1,0,0);
	}
	
function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (mode == 0) {
			cm.sendOk("...");
			cm.dispose();
	} else if (status == -1) {
		if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
			status = 0;
			cm.sendNext("你或许可以成为一个战士. 让我看看你的属性...");
		} else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.WARRIOR)) {
			status = 2;
			cm.sendNext("你或许可以做第二次转职的准备.让我看看...");
		} else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.FIGHTER) ||
					cm.getJob().equals(net.sf.odinms.client.MapleJob.PAGE) ||
					cm.getJob().equals(net.sf.odinms.client.MapleJob.SPEARMAN)) {
			status = 4;
			cm.sendNext("啊呀~~好久不见啊~");
		} else {
			cm.sendOk("看什么看?再看我吊销你营业执照~！");
			cm.dispose();
		}
	} else if (status == 0) {
		if (cm.getLevel() <= 9 || cm.getChar().getStr() <= 1) {
			cm.sendOk("成为一个战士需要达到#r10#k级..力量需要#r35#k或者更多..你哪一项没做到?");
			cm.dispose();
		} else {
			status = 1;
			cm.sendYesNo("你或许可以成为一个战士..你是否愿意献身于城管大队的行列中呢??");
		}
	} else if (status == 1) {
		cm.changeJob(net.sf.odinms.client.MapleJob.WARRIOR);
		cm.sendOk("好了,你已经成为了一名战士了.你也进入了城管大队的花名册中.等你#b30#k级的时候,可以找我第二次谈话!");
		cm.dispose();
	} else if (status == 2) {
		if (cm.getLevel() <= 29) {
			cm.sendOk("第二次转职需要LV30.你到达了吗?");
			cm.dispose();
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031012)) {
			status = 3;
			cm.sendNext("嘿,你准备好了吗?");
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031008)) {
			cm.sendOk("快去找他把!");
			cm.dispose();
		} else {
			cm.sendOk("你的进步很让人吃惊!我可以让你直接转职!避免了做任务的麻烦!\r\n#b你只需要再和我对话一次就可以进行第二次转职了!!");
			cm.gainItem(4031012,1);
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 0) {
			status = 8;
			cm.sendYesNo("你确定你想要成为剑客吗?");
		} else if (selection == 1) {
			status = 9;
			cm.sendYesNo("你确定你想要成为准骑士吗?");
		} else if (selection == 2) {
			status = 10;
			cm.sendYesNo("你确定你想要成为枪战士吗?");
		} else {
		cm.sendSimple("下列职业里,你看中哪一个?#b\r\n#L0#剑客#l\r\n#L1#准骑士#l\r\n#L2#枪战士#l#k");
		}
	} else if (status == 4) {
		if (cm.getJob().equals(net.sf.odinms.client.MapleJob.FIGHTER) && cm.getLevel() >= 70){
			status = 5;
			cm.sendYesNo("第三次转职的职业是勇士..是一个很强悍的职业,你是否愿意转职呢?");
		} else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.PAGE) && cm.getLevel() >= 70){
			status = 6;
			cm.sendYesNo("准骑士的第三次转职,你没有意见吗?");
		} else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.SPEARMAN) && cm.getLevel() >= 70){
			status = 7;
			cm.sendYesNo("龙骑士...很强的职业,你想成为#r龙骑士#k吗?");
		} else {
			cm.sendOk("等你70级的时候,再来找我说话,可以第三次转职哦!");
			cm.dispose();
		}
	} else if (status == 5) {
		cm.changeJob(net.sf.odinms.client.MapleJob.CRUSADER);
		cm.sendOk("你已经成功获取了第三次转职的力量了!!\r\n我能教你的都教完了,120级就是你四转的时候!");
		cm.dispose();
	} else if (status == 6) {
		cm.changeJob(net.sf.odinms.client.MapleJob.WHITEKNIGHT);
		cm.sendOk("你已经成功获取了第三次转职的力量了!!\r\n我能教你的都教完了,120级就是你四转的时候!");
		cm.dispose();
	} else if (status == 7) {
		cm.changeJob(net.sf.odinms.client.MapleJob.DRAGONKNIGHT);
		cm.sendOk("你已经成功获取了第三次转职的力量了!!\r\n我能教你的都教完了,120级就是你四转的时候!");
		cm.dispose();
	} else if (status == 8) {
			cm.changeJob(net.sf.odinms.client.MapleJob.FIGHTER);
			cm.gainItem(4031012,-1);
			cm.sendOk("很好!你已经成功获得了第二次转职的力量了!当你还想再次转职的时候,请你在70级的时候再来和我谈话!你现在已经是一个有名的城管执法队员了!");
			cm.dispose();
	} else if (status == 9) {
			cm.changeJob(net.sf.odinms.client.MapleJob.PAGE);
			cm.gainItem(4031012,-1);
			cm.sendOk("很好!你已经成功获得了第二次转职的力量了!当你还想再次转职的时候,请你在70级的时候再来和我谈话!你现在已经是一个有名的城管执法队员了!");
			cm.dispose();
	} else if (status == 10) {
			cm.changeJob(net.sf.odinms.client.MapleJob.SPEARMAN);
			cm.gainItem(4031012,-1);
			cm.sendOk("很好!你已经成功获得了第二次转职的力量了!当你还想再次转职的时候,请你在70级的时候再来和我谈话!你现在已经是一个有名的城管执法队员了!");
			cm.dispose();
	}
}