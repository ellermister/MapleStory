/*
 * 
 * WNMS
 * 推广码填写
 */

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
            cm.sendGetNumber("锁定装备？写入你要锁定的装备格数吧！\r\n(#rPS：最好把装备放在装备栏第一格然后格数填：1)",0,0,1000);
        }
        else if(status == 1){
            xz = selection;
            cm.sendYesNo("锁定的装备为：第"+xz+"格！是否继续？");
        }else if(status == 2){
			cm.lockitem(xz,true);
			cm.dispose();
        }else if(status == 3){
            var random = (Math.random()*5)+1;
            if(random <2){
                var random = 1;
            }else if(random >= 2 && random <3){
                var random = 2;
            }else if(random >= 3 && random <4){
                var random = 3;
            }else if(random >= 4 && random < 5){
                var random = 4;
            }else if(random >= 5 && random <6){
                var random = 5;
            }
            if(random != hm){
                var zt = "你输了！！！";
                cm.gainNX(-xz);
            }else if(hm == random){
                var zt = "猜中了，你赢了！";
                cm.gainNX(+(xz*2));
            }
            cm.sendOk("庄家点数："+random+"\r\n你的点数:"+hm+"\r\n\r\n结果："+zt+"");
            cm.dispose();
        }    
    }
}


