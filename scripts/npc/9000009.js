
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
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			
				cm.sendSimple("是否进行了赞助呢？可以找我拿到点卷哦！\r\n#r账户累计充值了:"+cm.getcz()+"人民币！\r\n#L0#领取点卷");
			
				}else{
				cm.sendOk("看来你并没有赞助过，无法领取点卷");
				cm.dispose();
				}
			}
		}
	}
}
