/* Duey
   Edited by: Sean360 of RZ
   Latest edits and updates were made by the Maple4U Administrator
*/


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
			cm.sendYesNo("确定激活[骑兽][锻造][匠人]技能?");
		} else if (status == 1) {
			if(cm.getPlayer().getJob() == 132){
				cm.teachSkill(0001003,1,1);
				cm.teachSkill(0001004,1,1);
				cm.teachSkill(0001007,3,3);
			cm.sendOk("激活成功！");
			}else{
				cm.sendOk("你不满足激活条件必须4转或者你职业不需要激活！");
			}
			cm.dispose();
			}
		}
	}