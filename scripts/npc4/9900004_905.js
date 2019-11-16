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
            text += "#e#d制作制作#v1012098##z1012098#\t需要：#v4310015#x150#k个.搜集好道具我就可以为您制作了.#l\r\n\r\n"//3
            text += "#L1##r制作#v1012098##z1012098# （四维+5、攻击+3、魔攻+3）\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
if (!cm.canHold(1012098, 1)) {
                cm.sendOk("您的背包空间不足.请您清理一下！");
            } else if(cm.haveItem(4310015,150)){
				cm.gainItem(4310015, -150);
				cm.gainItem(1012098,5,5,5,5,100,100,3,3,20,20,20,20,0,0);
            cm.sendOk("制作成功！");
cm.喇叭(2, "恭喜[" + cm.getPlayer().getName() + "]成功兑换【枫叶脸饰】，以后也要更加勤奋的带新人哦！！");
            cm.dispose();
			}else{
            cm.sendOk("您的材料不足！\r\n制作#v1012098##z1012098#\t需要：#v4310015#x150#k个");
            cm.dispose();
			}
		}
    }
}


