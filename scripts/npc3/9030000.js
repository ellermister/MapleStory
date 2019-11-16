importPackage(net.sf.odinms.server);

var status;
var choice;

function start() {
	status = -1;
	action(1, 0, 0);
} 

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
		cm.dispose();
		return;
	}
	if (status == 0)
		cm.sendNext("想要查看你有没要领取的道具或金币吗\r\n你在这里可以取回未在雇佣商人那边领取的道具或金币，可是来见我时，记的要以开设商店的角色来找我哦！");
	else if (status == 1)
		if (cm.hasTemp()) {
			if (cm.getHiredMerchantItems(true)) {
				cm.sendOk("在这里可以领取服务器关闭前，你所未能及时领取的物品！");
				cm.dispose();
			} else {
				cm.sendOk("请确保你的背包有足够的空位来领取物品。");
				cm.dispose();
			}
		} else {
			cm.sendSimple("请在下面选择需要查询的项目\r\n#b#L0#金币#l\r\n#L1#物品#l");
		}
	else if (status == 2) {
		cm.sendNext("正在查询当前角色数据库，请稍等...");
		choice = selection;
	} else {
		if (choice == 0) {
			if (status == 3) {
				var mesoEarnt = cm.getHiredMerchantMesos();//总共有的钱
				var selfmoney = cm.getMeso(); //身上现有的钱
				var Nmoney = 2147483647 - selfmoney;  // 能领取的钱
				var s = 0;
				if(Nmoney >= mesoEarnt){
					 Nmoney=mesoEarnt;
					 s = 1;
				}
				if (mesoEarnt > 0){
					if(s == 0){
						cm.sendYesNo("你有#r "+ mesoEarnt +" #k金币未领取,由于您身上有#r " + selfmoney + " #k金币，暂时只能领取#r " + Nmoney + " #k金币,剩下的可在下次领取。是否现在要领取？");					
					}else{
						cm.sendYesNo("你有#r "+ mesoEarnt +" #k金币未领取,您可以全部领完。是否现在要领取？");					
					}
				}else {
					cm.sendOk("数据查询完毕，看来你没有需要领取的金币！");
					cm.dispose();
				}
			} else if (status == 4) {
				var Smoney = cm.getMeso();  //身上现有的钱
				var Lmoney = 2147483647 -Smoney;  // 能领取的钱
				if(Lmoney >= cm.getHiredMerchantMesos()){
					Lmoney = cm.getHiredMerchantMesos();
				}
				var SYmoney = cm.getHiredMerchantMesos()- Lmoney;  //领取后还有未领取的钱
				
				cm.gainMeso(Lmoney);
				cm.setHiredMerchantMesos(SYmoney);
				if(SYmoney <= 0){
					cm.sendNext("操作成功，您已领取#r " + Lmoney + " #k金币,目前你已全部领取完！!" );
					cm.dispose();
				}else{
				cm.sendNext("操作成功，您已领取#r " + Lmoney + " #k金币,您还有#r " + SYmoney + " #k金币未领取!" );
				cm.dispose();
			}
			}
		} else {
			if (cm.getHiredMerchantItems(false)) {
				cm.sendOk("操作成功，领取完成。感谢你使用雇佣商人！");
				cm.dispose();
			} else {
				cm.sendOk("请确保你的背包有足够的空位来领取物品。");
				cm.dispose();
			}
		}
	}
}
