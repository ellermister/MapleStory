var status = 0;  
	
function start() {  
    status = -1;
    action(1, 0, 0);  
}  

function action(mode, type, selection) {   
    if (mode == -1) {  
        cm.dispose();  
    }  
    else {   
        if (mode == 0) {      
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
              if (cm.getPlayer().getMap().getMonsterById(8820009) != null) {
			cm.sendYesNo("你要挑战打怪物PB吗？");
		} else {
			cm.sendOk("PB已经被召唤！");
			cm.dispose();
		}
        } else if (status == 1) {
		cm.getPlayer().getMap().killMonster(cm.getPlayer().getMap().getMonsterById(8820009), cm.getPlayer(), false);
                cm.sendOk("非常好！加油吧！希望你能坚持下来。");
                cm.dispose();
        }
    }
}