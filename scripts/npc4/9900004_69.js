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
            text += "#e#d请联系群主领取#v4170007#兑换礼包！拿到新手蛋的玩家，点击下方红色选项领取新手礼包。QQ群：529926174#l\r\n\r\n"//3
            text += "#L1##r领取新手入驻礼包#l\r\n\r\n"//3
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
			}else */if(cm.haveItem(4170007,1)){
				cm.gainItem(4170007, -1);
				cm.gainItem(2022109, 20);//鸡汤
				cm.gainItem(1003528, 1);//2012挖掘帽子
				cm.gainItem(5072000, 100);//喇叭01112724
				cm.gainItem(4000463, 50);//纪念币
				cm.gainItem(1142950,5,5,5,5,150,150,5,5,15,15,15,15,15,15);//勋章
				cm.gainItem(5150040, 1);//皇家
				cm.gainItem(5151001, 5);//染色
				cm.gainItem(5152001, 10);//整形
				cm.gainItem(5153000, 5);//护肤
				cm.gainMeso(999999);
            cm.sendOk("换购成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了520冒险岛 新手入驻礼包！欢迎你~！么么哒！");
            cm.dispose();
			}else{
            cm.sendOk("请联系管理员领取兑换物品！");
            cm.dispose();
			}
		}
    }
}


