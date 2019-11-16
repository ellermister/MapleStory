function enter(pi) { 
         if (pi.getPlayer().getJob().getId() >= 1000) { 
                 pi.warp(130010000, "east00"); 
         } else { 
                 pi.playerMessage("只有骑士团职业才可以入场!"); 
                 return false; 
         } 
         return true; 
} 
