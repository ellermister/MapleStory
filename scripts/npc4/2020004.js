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
            txt = "我是每日跑商第8环NPC哦！我叫武先生\r\n\r\n";

            if (cm.getPS() == 7){// cm.getPS()  的意思是 读取跑商值如果等于1 就得出他跑商已经完成了第一环 就运行他进行第二环跑商!

                txt += "#L1##b收集#v4000048#.#v4000055#X200个、野狼之尾#v4000051#.#4000052#X100个交给我！我送给你80个#v4001322#！#l";
                cm.sendSimple(txt);
            }else{
                txt += "你已经完成过了然后你去找.玩具城-仓库管理员-舍璧!\r\n请第二天再来！";
                cm.sendOk(txt);
                cm.dispose();
            }

        } else if (selection == 1) {
            if (cm.haveItem(4000048,200) && cm.haveItem(4000055,200) && cm.haveItem(4000051,100) && cm.haveItem(4000052,100)){
                cm.gainPS(1);//cm.gainPS(1);  的意思是 你完成跑商第一环的时候给予你 跑商值+1这样你就无法在重复做第二环了。只有凌晨12点刷新才行！
		
                cm.gainItem(4000048, -200);
                cm.gainItem(4000055, -200);
                cm.gainItem(4000051, -100);
                cm.gainItem(4000052, -100);
                cm.gainItem(4001322, 80);
cm.gainExp(+800000);
cm.gainMeso(+800000);
                cm.sendOk("跑商第8环完成!恭喜获得金币=800000、经验=800000.80个#v4001322#\r\n\r\n然后你去找..玩具城-仓库管理员-舍璧.进行下一环！");
                cm.dispose();
            }else{
                cm.sendOk("收集#v4000048#.#v4000055#X200个、野狼之尾#v4000051#.#4000052#X100个交给我!我送给你80个#v4001322#！");
                cm.dispose();
            }
        }
    }
}
