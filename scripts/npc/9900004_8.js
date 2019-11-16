function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
			text += "\t\t\t  #e欢迎来到#b520冒险岛项链扩充系统 #k!#n\r\n"
            text += "#r可以给角色装备增加一个临时的项链位置#l\r\n\r\n"//3
            text += "#L1##r7天项链位3000点卷！#l\r\n\r\n"//3
            text += "#L2##r15天项链位5000点卷！#l\r\n\r\n"//3
            text += "#L3##r1个月项链位8000点卷！#l\r\n\r\n"//3
            text += "#L4##r3个月项链位20000点卷！#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			if(cm.getPlayer().getCSPoints(1) >= 3000){
				cm.gainNX(-3000);
				cm.xlkc(7);
            cm.sendOk("购买成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]购买了520冒险岛3000点卷项链扩充系统！");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足无法购买！");
            cm.dispose();
			}
        } else if (selection == 2) {
			if(cm.getPlayer().getCSPoints(1) >= 5000){
				cm.gainNX(-5000);
				cm.xlkc(15);
            cm.sendOk("购买成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]购买了520冒险岛5000点卷项链扩充系统！");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足无法购买！");
            cm.dispose();
			}
        } else if (selection == 3) {
			if(cm.getPlayer().getCSPoints(1) >= 8000){
				cm.gainNX(-8000);
				cm.xlkc(30);
            cm.sendOk("购买成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]购买了520冒险岛8000点卷项链扩充系统！");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足无法购买！");
            cm.dispose();
			}
        } else if (selection == 4) {
			if(cm.getPlayer().getCSPoints(1) >= 20000){
				cm.gainNX(-20000);
				cm.xlkc(90);
            cm.sendOk("购买成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]购买了520冒险岛20000点卷项链扩充系统！");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足无法购买！");
            cm.dispose();
			}
		}
    }
}


