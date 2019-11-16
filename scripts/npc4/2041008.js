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
            txt = "我是每日跑商第9环NPC哦！我叫舍璧\r\n\r\n";

            if (cm.getPS() == 8){// cm.getPS()  的意思是 读取跑商值如果等于1 就得出他跑商已经完成了第一环 就运行他进行第二环跑商!

                txt += "#L1##b收集#v4000106##v4000107##v4000110#X200个交给我！我送你#v2049100##v2340000#各两张.！#l";
                cm.sendSimple(txt);
            }else{
                txt += "你已经完成过了然后你去找.神木村-仓库管理员-寇斯裤!\r\n请第二天再来！";
                cm.sendOk(txt);
                cm.dispose();
            }

        } else if (selection == 1) {
            if (cm.haveItem(4000106,200) && cm.haveItem(4000107,200) && cm.haveItem(4000110,200)){
                cm.gainPS(1);//cm.gainPS(1);  的意思是 你完成跑商第一环的时候给予你 跑商值+1这样你就无法在重复做第二环了。只有凌晨12点刷新才行！
		
                cm.gainItem(4000106, -200);
                cm.gainItem(4000107, -200);
                cm.gainItem(4000110, -200);
                cm.gainItem(2340000, 2);
                cm.gainItem(2049100, 2);
cm.gainExp(+500000);
cm.gainMeso(+500000);
cm.gainNX(+500);
cm.喇叭(2, "[" + cm.getPlayer().getName() + "]成功完成跑商任务第9轮！");
                cm.sendOk("跑商第9环完成!恭喜获得金币=500000、经验=500000、点卷=500点.#v2049100##v2340000#各两张.\r\n\r\n！");
                cm.dispose();
            }else{
                cm.sendOk("收集#v4000106##v4000107##v4000110#X200个交给我！");
                cm.dispose();
            }
        }
    }
}
