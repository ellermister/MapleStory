/* 
    This file is part of the odinms Maple Story Server 
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>  
                       Matthias Butz <matze@odinms.de> 
                       Jan Christian Meyer <vimes@odinms.de> 

    This program is free software: you can redistribute it and/or modify 
    it under the terms of the GNU Affero General Public License version 3 
    as published by the Free Software Foundation. You may not use, modify 
    or distribute this program under any other version of the 
    GNU Affero General Public License. 

    This program is distributed in the hope that it will be useful, 
    but WITHOUT ANY WARRANTY; without even the implied warranty of 
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
    GNU Affero General Public License for more details. 

    You should have received a copy of the GNU Affero General Public License 
    along with this program.  If not, see <http://www.gnu.org/licenses/>. 
*/ 

importPackage(net.sf.odinms.server.maps); 
importPackage(net.sf.odinms.net.channel); 

/* 
    Return from 
    Ariant Coliseum : Lobby 
*/ 

function enter(pi) { 
    var returnMap = pi.getPlayer().getSavedLocation(SavedLocationType.FREE_MARKET); 
    if (returnMap < 0) { 
        returnMap = 100000000; 
    } 
    var target = pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(returnMap); 
    var targetPortal; 
    if (returnMap == 100000000) { 
        targetPortal = target.getPortal(4); 
    } else { 
        targetPortal = target.getPortal(0); 
    } 
    if (targetPortal == null) { 
        targetPortal = target.getPortal(0); 
    } 
    pi.getPlayer().clearSavedLocation(SavedLocationType.ARIANT_PQ); 
    pi.getPlayer().changeMap(target, targetPortal); 
    return true; 
}  
