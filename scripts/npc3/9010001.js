importPackage(net.sf.odinms.client);
var status = -1;
var beauty = 0;
var tosend = 0;
var sl;
var mats;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -5) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendNext("如果需要服务再来找我吧。");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            var gsjb = "";
            gsjb = "欢迎来到#r奶茶冒险岛#k。我这里是活动公告处!有需要帮忙的吗?\r\n";
            gsjb += "#r#e#e活动会不定时更换哦！记得准时来查看一下哦！#k\r\n";
            gsjb += "#r活动一:#k\r\n#b在7天之内找到你的另一半者.双方可询问客服索要丰厚奖励哦#l\r\n";
            gsjb += "#r活动二:#k\r\n#b充值前50名可享受双倍点券充值\r\n充值前100名可享受1.5倍点券充值\r\n充值前150名可享受1.3倍点券充值\r\n充值前200名可享受50%送极品XX装备\r\n充值前250名可享受25%送极品XX装备#l\r\n";
            gsjb += "#r活动三:#k\r\n#b敬请期待...#l\r\n";
            gsjb += "#r活动四:#k\r\n#b敬请期待...#l\r\n";
            cm.sendSimple(gsjb);
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能参与兑换。");
                cm.dispose();
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}