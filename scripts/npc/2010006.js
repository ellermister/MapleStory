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
            txt = "我是每日跑商第7环NPC哦！我叫小刘\r\n\r\n";

            if (cm.getPS() == 6){// cm.getPS()  的意思是 读取跑商值如果等于1 就得出他跑商已经完成了第一环 就运行他进行第二环跑商!

                txt += "#L1##b收集星光精灵的星块#v4000059#X200个、月光精灵的月块#v4000060#X200、日光精灵的日块#v4000061#X200个交给我！我会送给你一个金杯#v4000038#！#l";
                cm.sendSimple(txt);
            }else{
                txt += "你已经完成过了然后你去找.冰封雪域-仓库管理员-武先生!\r\n请第二天再来！";
                cm.sendOk(txt);
                cm.dispose();
            }

        } else if (selection == 1) {
            if (cm.haveItem(4000059,200) && cm.haveItem(4000060,200) && cm.haveItem(4000061,200)){
                cm.gainPS(1);//cm.gainPS(1);  的意思是 你完成跑商第一环的时候给予你 跑商值+1这样你就无法在重复做第二环了。只有凌晨12点刷新才行！
		
                cm.gainItem(4000059, -200);
                cm.gainItem(4000060, -200);
                cm.gainItem(4000061, -200);
                cm.gainItem(4000038, 1);
cm.gainExp(+500000);
cm.gainMeso(+500000);
                cm.sendOk("跑商第7环完成!恭喜获得金币=500000、经验=500000.一个金杯#v4000038#\r\n\r\n然后你去找..冰封雪域-仓库管理员-武先生.进行下一环！");
                cm.dispose();
            }else{
                cm.sendOk("收集200个星光精灵的星块#v4000059#、200个月光精灵的月块#v4000060#、200个日光精灵的日块#v4000061#、交给我!我会送给你一个金杯#v4000038#！");
                cm.dispose();
            }
        }
    }
}
