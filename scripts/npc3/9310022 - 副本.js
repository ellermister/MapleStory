
/*
星缘NPC
枫叶换取点卷
*/

importPackage(net.sf.odinms.client);

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
                
			cm.sendOk("我是个万能的！哈哈。");
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
			cm.sendSimple("尊敬的玩家你好！还在羡慕别人身上一身的点装吗？是否还
在羡慕其他玩家的双倍双暴的福利吗？\r\n在我这里。你可以使用#r枫叶#k兑换#r点卷#k！\r\n#L1##b使
用#r1000个枫叶兑换1000点卷#k\r\n#L2##b激活四转技能！#r（四转后必须激活。不然技能无效！）");
			} else if (status == 1) { //使用10000枫叶换取10000点卷
			if (selection == 1) {
			if (cm.haveItem(4001126, 1000)) { 
		   	cm.gainItem(4001126, -1000);
            		cm.gainNX(1000);
			cm.sendOk("尊敬的玩家，你的账户已经成功增加了1000点卷了！");
                  	cm.dispose();
                   	} else {
	           	cm.sendOk("尊敬的玩家，你的枫叶不足1000个啊~！");
			cm.dispose(); }
//-------------------------------激活四转技能-----------------------------
			} else if  (selection == 2) { 
			if ((cm.getMeso() >= 50000000000)&&(cm.haveItem(3011000, 1))||
(cm.getMeso() <= 500000)) { 
                   	cm.sendOk("四转技能可以去找#b冒险岛运营员#k来提升..");
                   	cm.dispose();
                   	} else {
		   	cm.sendOk("你已经成功买到了钓鱼椅子！花费了你50万冒险币！"); 
			cm.gainItem(3011000,1); //钓鱼椅子
			cm.gainMeso(-500000);
		   	cm.dispose(); }
//------------------------------高级鱼饵兑换----------------------------------
            } else if (selection == 3) {
           	   if (cm.haveItem(5350000, 1)) { 
                   cm.gainItem(5350000,-1);
                   cm.gainItem(2300001,100);
                   cm.sendOk("兑换成功！");
                   cm.dispose();
                   } else {
		   cm.sendOk("你没有高级鱼饵~"); 
		   cm.dispose(); }
//--------------------------------鱼饵兑换------------------------------------
            } else if (selection == 4) {
           	 if ((cm.getMeso() >= 3000)) { 
                   cm.gainItem(2300000,50);
		   cm.gainMeso(-3000);
                   cm.sendOk("兑换成功！");
                   cm.dispose();
                   } else {
		   cm.sendOk("冒险币不够~需要3000冒险币"); 
		   cm.dispose(); }
//-------------------------------关于钓鱼场------------------------------------
	                 } else if (selection == 5) {
                   cm.sendNextPrev("进入钓鱼场需要#b高级鱼竿#k或者#b鱼竿#k,也需要#b钓鱼场专
用椅子#k,和#b鱼饵#k,这些你都可以通过我来购买.#b鱼竿#k请去点卷购物商场购买!");
                   cm.dispose();
		}}
	}
}