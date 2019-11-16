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
            text += "#e#d这里是！历年老股东玩家!回馈补偿领取处#l\r\n#d本服一直本着一次充值，永久受益的理念开服！但这一次并非礼包服，所以补偿有些简朴，为了新服的游戏平衡，目前最大化补偿只能到这种程度！希望能够理解！\r\n补偿内容：1千500万金币/12万点卷/精灵项链1个月.雪花币自己拍卖兑换项链.装备什么的毕竟是新服，无法给予请见谅！老股东请找GM领取#v4031683#，之后来这里兑换即可！（仅限以前充值1000元以上的股东）\r\n\r\n "//3
            text += "#L1##r领取回归补偿#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("请清理你的背包，至少空出2个位置！");
            cm.dispose();
        } else if(cm.haveItem(4031683,1)){
				cm.gainItem(4031683, -1);
				cm.gainItem(5010053, 1);
				cm.gainItem(4310014, 1);
                cm.gainNX(+120000);
				cm.gainMeso(15000000);
            cm.sendOk("成功兑换！!");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]领取了[老股东回归礼包]，感谢您对世纪冒险岛的长期支持~！！");
            cm.dispose();
			}else{
            cm.sendOk("你的道具不足，或者你已经领取过了，请勿重复领取！");
            cm.dispose();
			}
		}
    }
}


