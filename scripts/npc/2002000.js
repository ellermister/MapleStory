/* Rupi by Moogra
Happyville Warp NPC
*/

function start() {
    cm.sendSimple("我知道有一个童话般的世界，你想不想去看看呢？\r\n#L0#前往幸福村!#l\r\n\#L1#返回魔法密林#l");
}

function action(mode, type, selection) {
    if (selection == 0)
        cm.warp(209000000, 0);
    else if (selection == 1)
        cm.warp(101000000, 0);
    cm.dispose();
}