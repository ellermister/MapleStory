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
            text += "#d在宝箱中，如果你找到了#v4031216#,我就能帮你召唤怪物去骚扰其他玩家哦~ (^O^).8个珠子召唤一次.#l\r\n#L1##r召唤怪物.\r\n"//3
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
			}else */if(cm.haveItem(4031216,8)){
				cm.gainItem(4031216, -8);
				cm.spawnMonster(6400006, 1);
				cm.spawnMonster(4230107, 3);
				cm.gainMeso(200000);
            cm.sendOk("召唤成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]在活动地图[南郊平原]召唤了凶猛的怪物.大家小心啊！！！");
            cm.dispose();
			}else{
            cm.sendOk("你要有#v4031216#x3.我才能帮你召唤怪物哦~！");
            cm.dispose();
			}
		}
    }
}


