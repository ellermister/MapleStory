var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		cm.sendNext("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		cm.dispose(); 
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
			cm.sendYesNo("#r你是不是想激活所有技能? 但是需要支付4500点券才能激活哦！  \r\n\r\n   #k被禁止使用的技能为:\r\n 英雄    :#b进阶斗气.葵花宝典.\r\n #k黑骑士  :#b灵魂助力.\r\n #k冲锋队长:#b超级变身.");
		} else if (status == 1) {
           if(cm.getPlayer().getCSPoints(0) >= 4500){
			    cm.getChar().modifyCSPoints(0,-4500);
                        cm.getPlayer().maxAllSkills(30);
			cm.sendOk("激活成功");
			cm.dispose();
} else {
  cm.sendOk("你没有4500点券");
cm.dispose();
			}cm.dispose();
	    }	
}}
