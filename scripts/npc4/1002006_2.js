/*
 * 
 * @枫之梦
 * 神器进阶系统 - 魔武双修
 */
importPackage(net.sf.odinms.client);
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var txt1 = "#d#L1#兑换经验1000\t需要#v4000019#50个\r\n";
            var txt2 = "#d#L2#兑换经验1500\t需要#v4000000#50个\r\n";
            var txt3 = "#d#L3#兑换经验2000\t需要#v4000016#50个\r\n";
            var txt4 = "#d#L4#兑换经验2500\t需要#v4000001#50个\r\n";
            var txt5 = "#d#L5#兑换经验8000\t需要#v4000012#100个\r\n";
            var txt6 = "#d#L6#兑换经验5000\t需要#v4000004#100个\r\n";
            var txt7 = "#d#L7#兑换经验10000\t需要#v4000008#100个\r\n";
            var txt8 = "#d#L8#兑换经验15000\t需要#v4000007#100个\r\n";
            var txt9 = "#d#L9#兑换经验10000\t需要#v4000015#100个\r\n";
            var txt10 = "#d#L10#兑换经验8000\t需要#v4000002#100个\r\n";
            //var txt11 = "#d#L11使用##v4031646##z4031646#兑换经验#r10000\r\n";
            //var txt12 = "#d#L12使用##v4031647##z4031647#兑换经验#r10000\r\n";


            cm.sendSimple("狩猎兑换经验.\r\n" + txt1 + "" + txt2 + "" + txt3 + "" + txt4 + "" + txt5 + "" + txt6 + "" + txt7 + "" + txt8 + "" + txt9 + "" + txt10 + "");
        } else if (status == 1) {
            if (selection == 1) {
                if (cm.haveItem(4000019, 50)) {
                    cm.gainItem(4000019, -50);
                    cm.gainExp(1000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 2) { 
                if (cm.haveItem(4000000, 50)) {
                    cm.gainItem(4000000, -50);
                    cm.gainExp(1500);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 3) {
                if (cm.haveItem(4000016, 50)) {
                    cm.gainItem(4000016, -50);
                    cm.gainExp(2000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 4) {
                if (cm.haveItem(4000001, 50)) {
                    cm.gainItem(4000001, -50);
                    cm.gainExp(2500);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 5) {
                if (cm.haveItem(4000012, 100)) {
                    cm.gainItem(4000012, -100);
                    cm.gainExp(8000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 6) {
                if (cm.haveItem(4000004, 100)) {
                    cm.gainItem(4000004, -100);
                    cm.gainExp(5000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 7) {
                if (cm.haveItem(4000008, 100)) {
                    cm.gainItem(4000008, -100);
                    cm.gainExp(10000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 8) {
                if (cm.haveItem(4000007, 100)) {
                    cm.gainItem(4000007, -100);
                    cm.gainExp(15000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 9) {
                if (cm.haveItem(4000015, 100)) {
                    cm.gainItem(4000015, -100);
                    cm.gainExp(10000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 10) {
                if (cm.haveItem(4000002, 100)) {
                    cm.gainItem(4000002, -100);
                    cm.gainExp(8000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 11) {
                if (cm.haveItem(4031646, 1)) {
                    cm.gainItem(4031646, -1);
                    cm.gainExp(+100000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 12) {
                if (cm.haveItem(4031647, 1)) {
                    cm.gainItem(4031647, -1);
                    cm.gainExp(+100000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 13) {
                if (cm.haveItem(4001013, 100)) {
                    cm.gainItem(4001013, -100);
                    cm.gainExp(5000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 14) {
                if (cm.haveItem(1482029, 1)) {
                    cm.gainItem(1482029, -1);
                    cm.gainItem(神器, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了神器", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 15) {
                if (cm.haveItem(1492030, 1)) {
                    cm.gainItem(1492030, -1);
                    cm.gainItem(神器, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了神器", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            }else if(selection == 16){
                 if (cm.haveItem(1442071, 1)) {
                    cm.gainItem(1442071, -1);
                    cm.gainItem(神器, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了神器", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            }
        }
    }
}
