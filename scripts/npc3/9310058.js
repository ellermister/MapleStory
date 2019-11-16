/*
 * 
 * @冒险岛
 * 转向npc
 * ************
 * 9310058 NPC ID
 */
function start() {
    status = -1;

    action(1, 0, 0);
}
var jf = 4; //设置多少积分可以点开npc
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("嗯哼...");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            cm.sendSimple("欢迎兑换奖品。进行抽奖需要消耗 #b积分#k 或者 #r飞天猪的蛋#k 。\r\n目前剩余积分为: #r#e"+cm.getboss()+" #n#k点（抽奖一次消耗 4 点）！\r\n好东西被谁拿走呢？\r\n#L0##b进行积分抽奖 - 每次消耗 4 积分\r\n\r\n#L1#进行猪蛋抽奖 - 每次消耗 1 个");
        } else if (status == 1) {
            if (selection == 0) { //积分抽奖
                if(cm.getboss() >= jf){
                cm.openNpc(9310097); //填写积分抽奖的npcid
                }else{
                    cm.sendOk("你的积分不足 "+jf+" 点。无法使用该功能！\r\n#r积分可以在副本中获得哦！只要完成，都有积分记录的哦！");
		    cm.dispose();
                }
            } else if (selection == 1) {//飞天猪的蛋抽奖
                cm.openNpc(9310096);//填写飞天猪蛋抽奖的npcid
            }
        }
    }
}
