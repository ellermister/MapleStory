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
            txt = "我是每日跑商最后一轮第10环NPC哦！我叫寇斯裤\r\n\r\n";

            if (cm.getPS() == 9){// cm.getPS()  的意思是 读取跑商值如果等于1 就得出他跑商已经完成了第一环 就运行他进行第二环跑商!

                txt += "#L1##b半人马的火花#v4000232#X60个、半人马的净水#v4000233#X60个、半人马的骨头#v4000234#X60个交给我！！#l";
                cm.sendSimple(txt);
            }else{
                txt += "你已经完成过了然后你去找.神木村-仓库管理员-寇斯裤!\r\n请第二天再来！";
                cm.sendOk(txt);
                cm.dispose();
            }

        } else if (selection == 1) {
            if (cm.haveItem(4000232,60) && cm.haveItem(4000233,60) && cm.haveItem(4000234,60)){
                cm.gainPS(1);//cm.gainPS(1);  的意思是 你完成跑商第一环的时候给予你 跑商值+1这样你就无法在重复做第二环了。只有凌晨12点刷新才行！
		
                cm.gainItem(4000232, -100);
                cm.gainItem(4000233, -100);
                cm.gainItem(4000234, -100);
cm.gainExp(+200000);
cm.gainMeso(+500000);
cm.gainNX(+300);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功完成最后一轮跑商任务，获得点券奖励300点，真是毅力十足啊！");
                cm.sendOk("跑商最后一环第10环完成!恭喜获得金币=500000、经验=200000、点卷=300点\r\n\r\n你已经完成了所有的跑商任务，请你明天再来吧！");
                cm.dispose();
            }else{
                cm.sendOk("半人马的火花#v4000232#X60个、半人马的净水#v4000233#X60个、半人马的骨头#v4000234#X60个交给我!");
                cm.dispose();
            }
        }
    }
}
