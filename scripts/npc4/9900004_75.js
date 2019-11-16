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
            text += "#L1##r#v4170009#领取认证男神福利！\r\n有以下物品:\r\n#v4001215# x3、#v5150040# x5、#v1142796# x1、点卷=5000点\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			//1
			//2
			//3
			//4
			//5
			/*if(!cm.beibao(1,3)){
            cm.sendOk("装备栏空余不足3个空格！");
            cm.dispose();
			}else if(!cm.beibao(2,1)){
            cm.sendOk("消耗栏空余不足1个空格！");
            cm.dispose();
			}else if(!cm.beibao(3,1)){
            cm.sendOk("设置栏空余不足1个空格！");
            cm.dispose();
			}else if(!cm.beibao(4,1)){
            cm.sendOk("其他栏空余不足1个空格！");
            cm.dispose();
			}else if(!cm.beibao(5,1)){
            cm.sendOk("现金栏空余不足1个空格！");
            cm.dispose();
			}else */if(cm.haveItem(4170009,1)){
				cm.gainItem(4170009, -1);
				cm.gainItem(4001215, 3);
				cm.gainItem(5150040, 5);
				cm.gainNX(+5000);
				cm.gainItem(1142796,20,20,20,20,4000,4000,20,20,100,100,100,100,20,20);////男神
            cm.sendOk("成功领取认证男神福利！\r\n有以下物品:\r\n#v4001215# x3、#v5150040# x5、#v1142796# x1、点卷=5000点");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功领取认证男神福利，小伙伴们快去找男神合影吧！！");
            cm.dispose();
			}else{
            cm.sendOk("道具不足无法换购！");
            cm.dispose();
			}
		}
    }
}


