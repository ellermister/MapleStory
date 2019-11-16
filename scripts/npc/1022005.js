importPackage(Packages.client);
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (status == 0) {
            var txt = "";
            txt = "我是每日跑商第4环NPC哦！\r\n\r\n";

            if (cm.getPS() == 3){// cm.getPS()  的意思是 读取跑商值如果等于1 就得出他跑商已经完成了第一环 就运行他进行第二环跑商!

                txt += "#L1##b收集100个野猪尖牙#v4000020#.50个#v4000030#交给我！我送给你10个#v4000463#！#l";
                cm.sendSimple(txt);
            }else{
                txt += "你已经完成过了然后你去找.废弃都市-网吧管理员-马龙!\r\n请第二天再来！";
                cm.sendOk(txt);
                cm.dispose();
            }

        } else if (selection == 1) {
            if (cm.haveItem(4000020,100) && cm.haveItem(4000030,50)){
                cm.gainPS(1);//cm.gainPS(1);  的意思是 你完成跑商第一环的时候给予你 跑商值+1这样你就无法在重复做第二环了。只有凌晨12点刷新才行！
		
                cm.gainItem(4000020, -100);
                cm.gainItem(4000030, -50);
                cm.gainItem(4000463, 10);
cm.gainExp(+150000);
cm.gainMeso(+300000);
                cm.sendOk("跑商第4环完成!恭喜获得金币=300000.经验=150000.10个#v4000463#\r\n\r\n然后你去找..废弃都市-网吧管理员-马龙.进行下一环！");
                cm.dispose();
            }else{
                cm.sendOk("收集100个野猪尖牙#v4000020#交给我!");
                cm.dispose();
            }
        }
    }
}
