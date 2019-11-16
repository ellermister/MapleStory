importPackage(net.sf.odinms.client);
var menu = new Array("武陵","天空之城","百草堂","武陵");
var cost = new Array(80,80,80,80);
var EnToJ;
var display = "";
var btwmsg;
var method;

function start() {
	status = -1;
	EnToJ = cm.getEventManager("EnToJ");
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		if(mode == 0 && status == 0) {
			cm.dispose();
			return;
		} else if(mode == 0) {
			cm.sendNext("OK. If you ever change your mind, please let me know.");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			for(var i=0; i < menu.length; i++) {
				if(cm.getChar().getMapId() == 140020300 && i < 1) {
					display += "\r\n#L"+i+"#移动时间大约是#b1分钟#k，费用是#b("+cost[i]+")#k金币。";
				} else if(cm.getChar().getMapId() == 250000100 && i > 0 && i < 3) {
					display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" 金币)#k";
				}
			}
			if(cm.getChar().getMapId() == 130000210 || cm.getChar().getMapId() == 251000000) {
				btwmsg = "#b天空之城到武陵#k";
			} else if(cm.getChar().getMapId() == 250000100) {
				btwmsg = "#b武陵返回天空之城或者去百草堂#k";
			}
			if(cm.getChar().getMapId() == 251000000) {
				cm.sendYesNo("怎么样？我从 "+btwmsg+" 再到现在。我的速度很快的吧，如果你想返回 #b"+menu[3]+"#k ，那么我们就立刻出发，不过还是得给我一些辛苦钱，价格是 #b"+cost[3]+" 金币#k。");
			} else {
				cm.sendSimple("你要离开里恩了吗？这船可以到金银岛的#b明珠港#k……不过#b最近80#k要花钱买票了。要去明珠港吗？大概1分钟左右就到了。\r\n" + display);
			}
		} else if(status == 1) {
			if(selection == 2) {
				cm.sendYesNo("你确定要去 #b"+menu[2]+"#k ？ 那么你要付给我 #b"+cost[2]+" 金币#k。");
			} else {
				if(cm.getMeso() < cost[selection]) {
					cm.sendNext("你确定你有足够的金币？");
					cm.dispose();
				} else {
					if(cm.getChar().getMapId() == 251000000) {
						cm.gainMeso(-cost[3]);
						cm.warp(250000100);
						cm.dispose();
					} else {
						if(EnToJ.getProperty("isRiding").equals("false")) {
							cm.gainMeso(-cost[selection]);
							EnToJ.newInstance("EnToJ");
							EnToJ.setProperty("myRide",selection);
							EnToJ.getInstance("EnToJ").registerPlayer(cm.getChar());
							cm.dispose();
						} else {
							cm.sendOk("系统运算错误，请更换频道后再上船！");
							cm.dispose();
						}
					}
				}
			}
		} else if(status == 2) {
			if(cm.getMeso() < cost[2]) {
				cm.sendNext("你确定你有足够的金币？");
				cm.dispose();
			} else {
				cm.sendOk("系统运算错误，请更换频道后再上船！");
				cm.dispose();
			}
		}
	}
}