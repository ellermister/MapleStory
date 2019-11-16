
function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("嘿咻！");
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
            cm.sendGetNumber("强化装备？写入你要强化的装备格数吧！\r\n(#rPS：最好把装备放在装备栏第一格然后格数填：1)",0,0,1000);
        }
        else if(status == 1){
            xz = selection;
            cm.sendYesNo("强化的装备为：第"+xz+"格！是否继续？");
        }else if(status == 2){
			if(cm.haveItem(4251202,1) && cm.haveItem(4251302,1)){//高等五彩，高等黑暗
			cm.gainItem(4251202, -1);
			cm.gainItem(4251302, -1);				
			cm.itemqh(xz,1);
			cm.dispose();
		    }else{
            cm.sendOk("对不起，你不是管理员无法使用此功能！");
            cm.dispose();
			}
        }    
    }
}


