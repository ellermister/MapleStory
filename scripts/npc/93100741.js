importPackage(java.util);
importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server);

var psrw = new Array(3991052, 3991053, 3991054, 3991055);
var rand = Math.floor(Math.random() * psrw.length);
var psrw1 = new Array(1, 2, 1, 2, 3, 1, 2, 3, 2, 2, 2, 6, 1, 7, 2, 4, 2);
var rand1 = Math.floor(Math.random() * psrw1.length);
var psrw2 = new Array(2040506, 2040806, 2040807, 2043303, 2043203, 2043103, 2043703, 2043803, 2044003, 2044103, 2044203, 2044303, 2044403, 2044603, 2044703, 2040807, 2044908);
var rand2 = Math.floor(Math.random() * psrw2.length);
var status = 0;
var fstype = 0;

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
        if (mode == 1) status++;
        if (status == 0) {
            var text = "";
            text = "伟大的#b#h ##k,欢迎来我这里签到,每天可以签到一次,你特殊签到已签到#r" + cm.getBossLog("特殊签到", 1) + "#k天\r\n";
            text += "#L0##d开始普通签到#k#l\r\n";
            text += "#L1##r开始特殊签到#k#l\r\n";
            text += "#L4##d情侣恩爱签到#b[男]#k#l\r\n";
            text += "#L5##d情侣恩爱签到#r[女]#k#l\r\n";
            text += "#L2##b10个#z4310008#换1000消费币#k#l\r\n";
            text += "#L3##b使用1组盛大字母抽取必成卷轴#k#l\r\n";
            cm.sendSimple(text);
        } else if (status == 1) {
            if (selection == 0) {
		var count = cm.getBossLog("mrqd", 1);
                if (cm.getBossLog("普通签到") == 0) {
                    //cm.setBossLog("mrqd",1,count+1);
                    cm.setBossLog("普通签到");
                    cm.gainItem(psrw[rand], 1); //SDNA随即给
                    cm.gainItem(4310008, psrw1[rand1]); //月光铜钱随即数量
                    cm.sendOk("签到成功.你获得了" + psrw1[rand1] + "月光铜钱和一个#v" + psrw[rand] + "#");
                    cm.dispose();
                } else {
                    cm.sendOk("你已经签到过了,明天再来吧");
                    cm.dispose();
                }
            } else if (selection == 1) {
		var count = cm.getBossLog("特殊签到", 1);
                if (cm.getBossLog("特殊签到") == 0) {
                    cm.setBossLog("特殊签到",1,count+1);
                    cm.sendOk("签到成功.");
                    cm.dispose();
                } else {
                    cm.sendOk("你已经签到过了,明天再来吧");
                    cm.dispose();
                }
            } else if (selection == 2) {
                if (cm.haveItem(4310008,10)) {
                    cm.gainItem(4310008, -10); 
                    cm.addHyPay(-500)
                    cm.sendOk("换取成功，成功换取到500消费币");
                    cm.dispose();
                } else {
                    cm.sendOk("#v4310008##z4310008#不足，要继续努力签到哟");
                    cm.dispose();
                }
            } else if (selection == 3) {
                var ii = Packages.server.MapleItemInformationProvider.getInstance();
                if (cm.haveItem(3991052,1) == true && cm.haveItem(3991053,1) == true && cm.haveItem(3991054,1) == true && cm.haveItem(3991054,1) == true) {
                    cm.gainItem(3991052, -1); 
                    cm.gainItem(3991053, -1); 
                    cm.gainItem(3991054, -1); 
                    cm.gainItem(3991055, -1); 
                    cm.gainItem(psrw2[rand2], 1);
                    cm.sendOk("换取成功，你获得了一张#v" + psrw2[rand2] + "#");
                    cm.worldMessage("每日签到：玩家[" + cm.getPlayer().getName() + "]使用一组签到字母获得了1个" + ii.getName(psrw2[rand2]) + "~");
                    cm.dispose();
                } else {
                    cm.sendOk("字母还没集齐，要继续努力签到哟");
                    cm.dispose();
                }
            } else if (selection == 4) {
                if (cm.getBossLog("情侣签到") != 0) {
                    cm.sendOk("你已经签到过了,明天再来吧");
                    cm.dispose();
                    } else if (cm.getPlayer().getMarriageId() == 0) { //查看玩家是否已经结婚。
                    cm.sendNext("你还未结婚，请结婚后再来签到")
                    cm.dispose();
                    } else if (cm.getPlayer().getGender() != 0) { //查看玩家是否已经结婚。
                    cm.sendNext("这里只能男性情侣签到。")
                    cm.dispose();
                    } else {
                    cm.setBossLog("情侣签到");
                    cm.setVipczz(cm.getVipczz() + 10); //给恩爱值
                    cm.gainItem(4000534, 1); //给女性签到恩爱值判定物品
                    cm.sendOk("签到成功.恩爱值+10");
                    cm.dispose();
                }
            } else if (selection == 5) {
                if (cm.getBossLog("情侣签到") != 0) {
                    cm.sendOk("你已经签到过了,明天再来吧");
                    cm.dispose();
                    } else if (cm.getPlayer().getMarriageId() == 0) { //查看玩家是否已经结婚。
                    cm.sendNext("你还未结婚，请结婚后再来签到")
                    cm.dispose();
                    } else if (cm.getPlayer().getGender() != 1) { //查看玩家是否已经结婚。
                    cm.sendNext("这里只能女性情侣签到。")
                    cm.dispose();
                    } else if (cm.haveItem(4000534, 1) == false) { //查看玩家是否已经结婚。
                    cm.sendNext("你没有#v4000534##z4000534#你老公签到后会获得一个，叫他给你")
                    cm.dispose();
                    } else {
                    cm.setBossLog("情侣签到");
                    cm.setVipczz(cm.getVipczz() + 10); //给恩爱值
                    cm.gainItem(4000534, -1); //给女性签到恩爱值判定物品
                    cm.sendOk("签到成功.你们又恩爱了许多~");
                    cm.dispose();
                }
            }
        }
    }
}
