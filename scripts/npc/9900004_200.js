
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
            cm.sendGetNumber("即日起，在我这里可以强化装备哦！！！\r\n装备强化，需要物品：\r\n#v4250002#5个\r\n强化装备？写入你要强化的装备格数吧！\r\n(#rPS：最好把装备放在装备栏第一格然后格数填：1)",0,0,1000);
        }
        else if(status == 1){
            xz = selection;
            cm.sendYesNo("强化的装备为：第"+xz+"格！是否继续？");
        }else if(status == 2){
                   if (cm.itemQuantity(4250002) < 5 ) { 
				cm.sendOk("#b装备强化需要#v4250002#5个，您的物品不足#k");
				cm.dispose();
			}
              else{
			cm.gainItem(4250002,-5);
			//cm.gainItem(4002001,-10);
			//cm.gainItem(4030007,-10);
			//cm.gainItem(4310038,-20);
			//cm.gainItem(4310088,-1);
			cm.itemqh(xz,1);
			cm.dispose();
        }  
        }    
    }
}


