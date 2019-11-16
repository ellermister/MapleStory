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
            text += "#e#d[中级眼镜]升级至[高级眼镜]你确定吗？.#l\r\n\r\n"//3
            text += "#L1##r升级为高级眼镜#l\r\n\r\n"//3
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
			}else if(!cm.beibao(2,2)){
            cm.sendOk("消耗栏空余不足2个空格！");
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
			}else */if(cm.haveItem(1022163,1) && cm.haveItem(4001160,30)){
				cm.gainItem(1022163, -1);
				cm.gainItem(4001160, -30);
				cm.gainItem(1022149,6,6,6,6,0,0,3,3,50,50,50,50,0,0);
				//cm.gainMeso(100000);
            cm.sendOk("兑换成功！");
cm.worldMessage(6,"玩家：["+cm.getName()+"]将[中级眼镜]升级至[高级眼镜].牛逼~！牛逼！");
cm.喇叭(3, "玩家：[" + cm.getPlayer().getName() + "]将[中级眼镜]升级至[高级眼镜].牛逼~！牛逼！");
            cm.dispose();
			}else{
            cm.sendOk("您的材料不足！，需要\r\n#v4001160#x30个\r\n#v1022163#x1个");
            cm.dispose();
			}
		}
    }
}


