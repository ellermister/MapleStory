// Fitness JQ warper
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
            cm.sendNext("Welcome to the event!");
        }
        else if (status == 1) {
            cm.sendNext("There are a few rules before we start:\r\nYou #rmust#r be level 30\r\nIf you die, you won't be revived\r\nOnce warped, you will wait until further notice");
        } 
        else if (status == 2) { 
            if (cm.getLevel() >= 30) {
                cm.sendSimple("Alright, now that you've read the rules you may choose wether you want to participate or not! \r\n#L0#Bring me to the waiting room!#l\r\n#L1#I've changed my mind...");  
            }
        }
        else if (status == 3) { 
            if (selection == 0) {  
                cm.sendOk("Oh! Before I forget, here's your #bEvent Ticket#b! You can use this ticket at Pietro to receive a special reward!");  
                cm.gainItem(5220001, -cm.itemQuantity(5220001));
                cm.gainItem(5220001, 1);  
                cm.warp(10904000, 0); 
                cm.dispose();  
            }  
            else if (selection == 1) {  
                cm.sendOk("That's alright! See you next time!");  
                cm.dispose();  
            } 
        }  
    } 
}  