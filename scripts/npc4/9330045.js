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
			//显示物品ID图片用的代码是  #v这里写入ID#
            text += "#e#k欢迎来到天成冒险岛钓鱼场:\r\n\r\n"//3
            text += "如果您想钓鱼的话，首先要到[商城]购买钓鱼竿和[高级鱼饵罐头]，再买一个[钓鱼用椅子]，进入地图，用钓鱼椅子坐下即可开始钓鱼！#l\r\n\r\n"//3
            text += "#L2##d购买#v3011000# 50万金币. "//3
            text += "#L3##d使用#v5350000#换鱼饵.1:100#l\r\n\r\n"//3
			text += "#L6##r满载而归兑换钓鱼奖励."//3
			text += "#L1##d出发送我去钓鱼场.#l\r\n"//3
            //text += "#L4##e#d#v1032060# 锻造阿尔泰耳环.#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			if (cm.getMeso() > 0) { 
		   	cm.warp(741000200);
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("准备好了才点我");
			cm.dispose(); 
			}
        } else if (selection == 2) {
			if (cm.haveItem(3011000, 1)||cm.getMeso() <= 500000) { 
                   	cm.sendOk("你的冒险币不足50万，或者你已经买了一把椅子了！");
                   	cm.dispose();
                   	} else {
			cm.gainItem(3011000,1); //钓鱼椅子
			cm.gainMeso(-500000);
		   	cm.sendOk("你已经成功买到了钓鱼椅子！花费了你50万冒险币！"); 
		   	cm.dispose();
			}
        } else if (selection == 3) {
           	   if (cm.haveItem(5350000, 1)) { 
                   cm.gainItem(5350000,-1);
                   cm.gainItem(2300001,100);
                   cm.sendOk("兑换成功！");
                   cm.dispose();
                   } else {
		   cm.sendOk("你没有高级鱼饵~"); 
		   cm.dispose();
		   }
        } else if (selection == 4) {
           	 if ((cm.getMeso() >= 500000)) { 
                   cm.gainItem(2300000,50);
		   cm.gainMeso(-500000);
                   cm.sendOk("兑换成功！");
                   cm.dispose();
                   } else {
		   cm.sendOk("冒险币不够~需要50万冒险币"); 
		   cm.dispose(); 
		   }
        } else if (selection == 5) {
                   cm.sendNextPrev("进入钓鱼场需要#b高级鱼竿#k或者#b鱼竿#k,也需要#b钓鱼场专用椅子#k,和#b鱼饵#k,这些你都可以通过我来购买.#b鱼竿#k请去点卷购物商场购买!");
                   cm.dispose();
        } else if (selection == 6) {
		cm.openNpc(9209001,10);
	}
    }
}


