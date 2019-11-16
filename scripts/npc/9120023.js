// NPC: YokoYoko
// Used for: Warps people to 109050000
// Found at the top of the Chimney map
// MrDk/Useless

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
        if (status >= 2 && mode == 0) {   
            cm.sendOk("Alright, see you next time!");   
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
                cm.sendOk("Hmm, I don't think I can help you...");  
	cm.dispose(); 
         }
    }
}