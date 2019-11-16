/* 装备修理卷 */

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendNext("装备最好经常修理。");
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        im.sendYesNo("噔噔～这是修理券，看我拿出这个东西，是不是很吃惊？我不是只会出售钥匙的人，我还有很多隐藏的才能。我可以帮你快速修好坏了的东西。你想试试吗？");
    } else if (status == 1) {
        im.gainItem(2431265, -1);
        im.sendRepairWindow();
        im.dispose();
    }
}