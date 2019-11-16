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
		var pbMap = cm.getC().getChannelServer().getMapFactory().getMap(270050100);
			if (pbMap.getCharacters().size() == 0) {
				cm.sendYesNo("Looks like no one is inside yet. Would you like to go in?");
			} else { // someone is inside
				for (var i = 0; i < 5; i++) {
					if (pbMap.getMonsterById(8820002 + 1) != null) {
						cm.getPlayer().dropMessage("The fight is already begun.");
						cm.dispose();
					}
				}
				for (var i = 0; i < 4; i++) {
					if (pbMap.getMonsterById(8820015 + 1) != null) {
						cm.getPlayer().dropMessage("The fight is already begun.");
						cm.dispose();
					}
				}
					if (pbMap.getMonsterById(8820001) != null) {
						cm.getPlayer().dropMessage("The fight is already begun.");
						cm.dispose();
					}
				else
				cm.sendYesNo("Looks like the fight has not yet started. Would you like to go in?");
}
        }
        else if (status == 1) {
			cm.warp(270050100);
            cm.sendOk("Good Luck!");
            cm.dispose();
        }
    }
}