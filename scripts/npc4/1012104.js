/* Brittany
	Henesys Random Hair/Hair Color Change.
*/
var status = -1;
var beauty = 0;
var hair_Colo_new;

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendSimple("您好！我是美容店的助手伯丽特。如果你有#b万能会员卡#k，就把头发交给我处理吧。怎么样？\r\n#b#L0#换发型（用一般会员卡）#l\r\n#L1#染头发（用一般会员卡）#l");
    } else if (status == 1) {
        if (selection == 0) {
            var hair = cm.getPlayerStat("HAIR");
            hair_Colo_new = [];
            beauty = 1;
            if (cm.getPlayerStat("GENDER") == 0) {
                hair_Colo_new = [30310, 30330, 30060, 30150, 30410, 30210, 30140, 30120, 30200, 30560, 30510, 30610, 30470];
            } else {
                hair_Colo_new = [31150, 31310, 31300, 31160, 31100, 31410, 31030, 31080, 31070, 31610, 31350, 31510, 31740];
            }
            for (var i = 0; i < hair_Colo_new.length; i++) {
                hair_Colo_new[i] = hair_Colo_new[i] + (hair % 10);
            }
            cm.sendYesNo("如果使用一般会员卡，你就不能指定发型，怎么样？你真的想用#b万能会员卡#k换发型吗？");
        } else if (selection == 1) {
            var currenthaircolo = Math.floor((cm.getPlayerStat("HAIR") / 10)) * 10;
            hair_Colo_new = [];
            beauty = 2;
            for (var i = 0; i < 8; i++) {
                hair_Colo_new[i] = currenthaircolo + i;
            }
            cm.sendYesNo("如果使用一般会员卡，你就不能指定你喜欢的颜色，怎么样？你真的想用#b万能会员卡#k换发型吗？");
        }
    } else if (status == 2) {
        if (beauty == 1) {
            if (cm.setRandomAvatar(5150000, hair_Colo_new) == 1) {
                cm.sendOk("好了,让朋友们赞叹你的新发型吧!");
            } else {
                cm.sendOk("嗯……你是不是没有我们美发店的专用会员卡啊？不好意思，没有会员卡的话，我就不能帮你打理头发。");
            }
        } else {
            if (cm.setRandomAvatar(5151000, hair_Colo_new) == 1) {
                cm.sendOk("好了,让朋友们赞叹你的新发色吧!");
            } else {
                cm.sendOk("嗯… 你不会是没有我们美发店的会员卡吧！不好意思，如果没有会员卡，我们不可以给你修剪头发。");
            }
        }
        cm.safeDispose();
    }
}