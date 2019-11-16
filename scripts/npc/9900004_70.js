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
            text += "#L1##r#v4170008#领取首冲礼包！#l\r\n\r\n"//3
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
			}else */if(cm.haveItem(4170008,1)){
				cm.gainItem(4170008, -1);
				cm.gainItem(1122017, 1);//精灵项链
				cm.gainItem(1142791,10,10,10,10,500,500,10,20,30,30,30,30,15,15);//训练兵团勋章
				cm.gainItem(3015374, 1);//射手村猪猪占卜椅子
				cm.gainMeso(3000000);
            cm.sendOk("购买成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了520冒险岛 50元首冲答谢礼包！");
            cm.dispose();
			}else{
            cm.sendOk("道具不足无法换购！");
            cm.dispose();
			}
		}
    }
}


