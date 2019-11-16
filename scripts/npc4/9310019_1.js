/*
 * 
 * @wnms
 * @大擂台传送副本npc
 */
function start() {
    status = -1;
    action(1, 0, 0);
}
var 冒险币 = 5000;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("感谢你的光临！");
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
            cm.sendSimple("#r请选择你要去的副本：\r\n<好玩副本不断添加中……>\r\n\r\n#d#L0#废弃都市组队任务#l\r\n\r\n#L1##g玩具101组队任务#n#l\r\n\r\n#b#L2##r天空女神组队任务\r\n\r\n#L3#罗密欧副本任务\r\n\r\n#r#L4#毒物副本\r\n\r\n#d#L6##b黑龙副本\r\n\r\n#L7##r绯红副本\r\n\r\n#L8#140级御姐副本");
        } else if (status == 1) {
            if (selection == 0) {//副本传送
             cm.openNpc(9020000,0);
            } else if (selection == 1) {//副本兑换奖励803000505
              cm.openNpc(2040034,0);
            }else if(selection == 2){
                cm.openNpc(2013000,0);
            } else if (selection == 3) {
		cm.openNpc(2112004,0);
            } else if (selection == 4) {
                cm.openNpc(2133000,0); 
                cm.gainItem(4001226,1)            
            }else if(selection == 7){
            if (cm.getLevel() < 120 ) {  
            cm.sendOk("本地图限制等级120级。您的能力没有资格挑战绯红副本");
                cm.dispose();
              }else{
			cm.warp(803001200);  
				cm.dispose();
                return;
	      } 
            }else if(selection == 8){
            if (cm.getLevel() < 140 ) {  
            cm.sendOk("本地图限制等级140级。您的能力没有资格挑战御姐副本");
                cm.dispose();
              }else{
			cm.warp(803000505);  
                cm.dispose();
                return;
	      } 
            } else if (selection == 6) {
            if (cm.getLevel() < 120 ) {  
            cm.sendOk("本地图限制等级120级。您的能力没有资格挑战黑龙副本");
                cm.dispose();
              }else{
			cm.warp(240020501);  
                cm.dispose();
                return;
	      } 
            } else if (selection == 5) {
                cm.openNpc(2094000,0); 
            }
        }
    }
}


