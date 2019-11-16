/* 神奇魔方碎片 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        im.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        im.sendOk("搜集到#r5个#k#b#t2430112##k，可以获得#b#i2049401:##t2049401##k。搜集到#r10个#k可以获得#b#i2049400:##t2049400##k。");
        im.dispose();
    }
}