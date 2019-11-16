
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
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
	    text += "#b#L4# PQ副本任务#l\r\n";
	    text += "#b#L5# 酷兽任务(#r25关卡#b)#l\r\n";
            text += "#b#L0# 废弃都市组队任务#l\r\n";
            text += "#b#L1# 玩具之城组队任务#l\r\n";
            text += "#b#L2# 天空之城组队任务#l\r\n";
            text += "#b#L3# 罗密欧和朱丽叶组队任务( #rNew#b )#l";
            //text += "#b#L4#朱丽叶组队任务(#rNwe#b)#l";
            cm.sendSimple(text);
        } else if (status == 1) {
            if (selection == 0) {
                cm.openNpc(9020000);
                cm.dispose();
            
            } else if (selection == 1) {
                cm.openNpc(2040034);
                cm.dispose();
            } else if (selection == 2) {
                cm.openNpc(2013000);
                cm.dispose();
            } else if (selection == 3) {
                cm.openNpc(2112004);
                cm.dispose();
            } else if (selection == 4) {
		cm.openNpc(9900007);
                cm.dispose(); 
            } else if (selection == 5) {
		cm.openNpc(2042002);
                cm.dispose(); 
            }
	
        }
                
    }
}