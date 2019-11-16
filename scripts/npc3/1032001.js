/* Grendel the Really Old */
/** Made by xQuasar **/

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
			cm.sendNext("魔法师是体质弱.但是他的力量很强大...让我看看你是否符合条件...");
		} else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.MAGICIAN)) {
			status = 2;
			cm.sendNext("你的选择是明智的..");
		} else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.IL_WIZARD) ||
					cm.getJob().equals(net.sf.odinms.client.MapleJob.FP_WIZARD) ||
					cm.getJob().equals(net.sf.odinms.client.MapleJob.CLERIC)) {
			status = 4;
			cm.sendNext("哈喽``好久不见");
		} else {
			cm.sendOk("你的选择是明智的..");
			cm.dispose();
		}
	} else if (status == 0) {
		if (cm.getLevel() <= 7 || cm.getChar().getInt() <= 19) {
			cm.sendOk("条件不足.需要智力大于19.等级大于8");
			cm.dispose();
		} else {
			status = 1;
			cm.sendYesNo("好的...你完全符合魔法师的条件,想成为一个魔法师吗?");
		}
	} else if (status == 1) {
		cm.changeJob(net.sf.odinms.client.MapleJob.MAGICIAN);
		cm.sendOk("30级再来吧.");
		cm.dispose();
	} else if (status == 2) {
		if (cm.getLevel() <= 29) {
			cm.sendOk("你好哦...");
			cm.dispose();
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031012)) {
			status = 3;
			cm.sendNext("决定如何呢。。。");
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031009)) {
			cm.sendOk("快去吧....");
			cm.dispose();
		} else {
			cm.sendOk("很好，准备第二次转职了吧?\r\n再来和我对次话来确认下吧!");
			cm.gainItem(4031012,1);
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 0) {
			status = 8;
			cm.sendYesNo("决定好自己的选择了吗?要成为火毒法师?");
		} else if (selection == 1) {
			status = 9;
			cm.sendYesNo("决定好自己的选择了吗?要成为冰雷法师?");
		} else if (selection == 2) {
			status = 10;
			cm.sendYesNo("想成为一个牛X的牧师?");
		} else {
		cm.sendSimple("你看上了哪一个职业?#b\r\n#L0#火毒法师#l\r\n#L1#冰雷法师#l\r\n#L2#牧师#l#k");
		}
	} else if (status == 4) {
		if (cm.getJob().equals(net.sf.odinms.client.MapleJob.FP_WIZARD) && cm.getLevel() >= 70){
			status = 5;
			cm.sendYesNo("是否进行第三次转职?");
		} else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.IL_WIZARD) && cm.getLevel() >= 70){
			status = 6;
			cm.sendYesNo("是否进行第三次转职?");
		} else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.CLERIC) && cm.getLevel() >= 70){
			status = 7;
			cm.sendYesNo("是否进行第三次转职?");
		} else {
			cm.sendOk("呵呵?");
			cm.dispose();
		}
	} else if (status == 5) {
		cm.changeJob(net.sf.odinms.client.MapleJob.FP_MAGE);
		cm.sendOk("你已经成功获取了第三次转职的力量了!!\r\n我能教你的都教完了,120级就是你四转的时候!");
		cm.dispose();
	} else if (status == 6) {
		cm.changeJob(net.sf.odinms.client.MapleJob.IL_MAGE);
		cm.sendOk("你已经成功获取了第三次转职的力量了!!\r\n我能教你的都教完了,120级就是你四转的时候!");
		cm.dispose();
	} else if (status == 7) {
		cm.changeJob(net.sf.odinms.client.MapleJob.PRIEST);
		cm.sendOk("你已经成功获取了第三次转职的力量了!!\r\n我能教你的都教完了,120级就是你四转的时候!");
		cm.dispose();
	} else if (status == 8) {
			cm.changeJob(net.sf.odinms.client.MapleJob.FP_WIZARD);
			cm.gainItem(4031012,-1);
		cm.sendOk("你已经成功获取了第二次转职的力量了!!\r\n,70级就是你3转的时候!");
			cm.dispose();
	} else if (status == 9) {
			cm.changeJob(net.sf.odinms.client.MapleJob.IL_WIZARD);
			cm.gainItem(4031012,-1);
		cm.sendOk("你已经成功获取了第二次转职的力量了!!\r\n,70级就是你3转的时候!");
			cm.dispose();
	} else if (status == 10) {
			cm.changeJob(net.sf.odinms.client.MapleJob.CLERIC);
			cm.gainItem(4031012,-1);
		cm.sendOk("你已经成功获取了第二次转职的力量了!!\r\n,70级就是你3转的时候!");
			cm.dispose();
	}
}