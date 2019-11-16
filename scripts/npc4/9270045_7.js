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
            //text += "#e#d兑换#v1112907#需要#v4170013#x88个.搜集好道具就可以找我兑换了.#l\r\n\r\n"//3
            text += "#L1##r#e升级 独眼巨人之眼Lv.2 至 独眼巨人之眼Lv.3#l\r\n\r\n"//3
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
			}else */if(cm.haveItem(4000435,10) && cm.haveItem(1022225,1)){
				cm.gainItem(4000435, -10);
				cm.gainItem(1022225, -1);
				cm.gainItem(1022226,10,10,10,10,200,200,10,10,10,10,10,10,5,5);
				//cm.gainMeso(100000);
            cm.sendOk("升级成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]从千年树妖王奖励处，将独眼巨人之眼Lv.2 升级至 独眼巨人之眼Lv.3。");
            cm.dispose();
			}else{
            cm.sendOk("您的材料不足！");
            cm.dispose();
			}
		}
    }
}


