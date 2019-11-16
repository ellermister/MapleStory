function start() { 
    cm.sendYesNo("我们有一个美丽的圣诞树。\r\n你想去看看它吗？");
} 
function action(mode, type, selection) { 
    cm.warp(209000001);
    cm.dispose();
} 