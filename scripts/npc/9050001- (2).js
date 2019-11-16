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
            text += "#d#e这里是开服礼包领取处！为感谢新老玩家长期以来的大力支持和坚守！本次开服，GM为大家准备了免费的开服大礼包！领取新手礼包的时候，您的包裹里存有#v4000464#,这就是兑换的道具，那么点击下方的领取礼包，即可兑换成功了！礼包内容：100万金币/1000点卷/皇家彩虹套服/草莓雪糕。礼轻情意重，感谢捧场！\r\n\r\n"//3
            text += "#L1##r兑换开服礼包#l\r\n\r\n"//3
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
			}else */if(cm.haveItem(4000464,1)){
				cm.gainItem(4000464, -1);
				cm.gainItem(1003109, 1);
				cm.gainItem(1052275, 1);
				cm.gainItem(1012070, 1);
				cm.gainItem(1072448, 1);
				cm.gainMeso(1000000);
                cm.gainNX(1000);
            cm.sendOk("兑换成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]兑换了【开服礼包】，感谢新老玩家的捧场！");
            cm.dispose();
			}else{
            cm.sendOk("您的材料不足！");
            cm.dispose();
			}
		}
    }
}


