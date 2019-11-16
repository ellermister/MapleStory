var status = -1;
var msg;
var sel;
var item = [1932212,1932005,1932017,1932020,1932021,1932052,1932054,1932056,1932091,1932092,1932108,1932116,1932117,1932140,1932157,1932158,1932173,1932198,1932212,1932223,1932234,1932236,1932246,1932258,1932261,1932272,1932286,1932288,1932317,1932329,1932355,1932315];
var random = true;
var need = 5000;

function start(){
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == 1){
		status++;
	} else if(mode == 0){
		status--;
	} else {
		cm.dispose();
		return;
	}
	if(status == 0) {
		msg = "你好,我是皇家骑宠代理人,你将愿意花费点卷在我这里随机获取皇家骑宠技能吗 ?";
		if(cm.getPlayer().getMountId() != 0 && Packages.server.MapleItemInformationProvider.getInstance().itemExists(cm.getPlayer().getMountId())){
			msg += "\r\n#r 目前你的骑宠是 : #i" + cm.getPlayer().getMountId() + "##t" + cm.getPlayer().getMountId() + "#";
		}
		cm.sendYesNo(msg);
	} else if(status == 1) {
		cm.sendSimple("#b#L0# 抽取骑宠#l\r\n#r #L1#查看骑宠种类");
	} else if(status == 2) {
		msg = "\r\n";
		if(selection == 1){
			for(var i = 0; i < item.length; i++){
				if(Packages.server.MapleItemInformationProvider.getInstance().itemExists(item[i])){
					msg += "#i"+item[i]+":##t"+item[i]+"#\r\n ";
				}
			}
			cm.sendNext(msg);
			status = 0;
		}
		
		if(selection == 0 && random){
			if(cm.getPlayer().getNX() < need){
				cm.sendNext("点卷不足" + need);
				cm.dispose();
				return;
			} else if(!cm.canHold(1932081)){
				//cm.sendNext("装备栏空间不足");
				//cm.dispose();
				//return;
			}
			
			var exist = true;
			do{
				sel = Math.floor(Math.random() * item.length);
				exist = Packages.server.MapleItemInformationProvider.getInstance().itemExists(item[sel]);
			}while(!exist);
			cm.getPlayer().setMountId(item[sel]);
			cm.getPlayer().modifyCSPoints(1, -need, true);
			cm.sendNext("你获得了 #i"+item[sel]+":##t"+item[sel]+"#");
			cm.dispose();
		} else {
			if(selection == 0){
				for(var i = 0; i < item.length; i++){
					msg += "#L"+i+"##i"+item[i]+":##t"+item[i]+"\r\n";
				}
				cm.sendSimple(msg);
			}
		}
	} else if(status == 3){
		if(!random){
			sel = selection;
			cm.sendYesNo("你确定是否选择 #i"+item[sel]+":##t"+item[sel]+"#");
		}
	} else if(status == 4){
		if(!random){
			cm.getPlayer().setMountId(item[sel]);
			cm.sendNext("你获得了 #i"+item[sel]+":##t"+item[sel]+"#");
			cm.dispose();
		}
	} else {
		cm.dispose();
	}
}