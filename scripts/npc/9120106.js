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
            text += "#k#e这里是！女生认证奖品领取处!#l\r\n#d奖品内容：100万金币/3000点卷/明星理发卷一张/女生认证勋章一枚/礼轻情意重，感谢捧场！找GM领取#v4031539#，之后来这里兑换即可！\r\n\r\n"//3
            text += "#L1##r#v4031539#认证奖品领取#l\r\n\r\n"//3
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
			}else */if(cm.haveItem(4031539,1)){
				cm.gainItem(4031539, -1);
				cm.gainItem(5150038, 1);
		cm.gainItem(1142840,5,5,5,5,500,500,0,0,50,50,2,2,2,2);
				cm.gainMeso(1000000);
                cm.gainNX(3000);
            cm.sendOk("兑换成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]兑换了【女生认证奖品】，又一个萌萌哒的妹子~！");
            cm.dispose();
			}else{
            cm.sendOk("您的材料不足！");
            cm.dispose();
			}
		}
    }
}


