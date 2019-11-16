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
            cm.sendOk("放弃就算了");
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
            cm.sendSimple("#d我可以快捷的为您变更你的发型、脸型、肤色、换眼睛颜色，直接去射手村整容处，找无照大夫直接免费更换！\r\n#b请选择你要的操作！\r\n\r\n#L1#购买各种皇家理发卷#l\r\n\r\n#d#L2##r更换发型（普通理发卷）#l\r\n\r\n#L3#随机更换发型（皇家理发卷）#l\r\n\r\n#L6#固定更换发型（明星理发卷）#l\r\n\r\n#L4#更换脸型 (高级射手村整容卡)#l\r\n\r\n#L5#更换肤色 (商城的护肤卡)#l\r\n\r\n");
        } else if (status == 1) {
            if (selection == 1) {//副本传送
             cm.openNpc(9900004,78);
            } else if (selection == 2) {
             cm.openNpc(1012103,0);
            } else if (selection == 3) {
             //cm.openNpc(9105006,0); 
             cm.openNpc(1012117,0);			 
            } else if (selection == 4) {
             cm.openNpc(1052004,0);
            } else if (selection == 5) {
             cm.openNpc(1012105,0);
            } else if (selection == 6) {
             cm.openNpc(9105006,0);
                                            
        }	
        }
    }
}


