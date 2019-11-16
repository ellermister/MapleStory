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
				cm.sendYesNo("Would you like to summon Pink Bean?");
			} else {
				cm.sendOk("Pink Bean has already been spawned.");
				cm.dispose();
			}
        }
        else if (status == 1) {
		cm.getPlayer().getMap().killMonster(cm.getPlayer().getMap().getMonsterById(8820009), cm.getPlayer(), false);
            cm.sendOk("Good Luck");
            cm.dispose();
        }
    }
}