importPackage(Packages.tools);
importPackage(Packages.server.life);
importPackage(java.awt);
importPackage(Packages.client);


var status = 0;
/*
[1] -245 | -223 ||| -190 | -223
[2] -179 | -223 ||| -121 | -223
[3] -245 | -184 ||| -189 | -184
[4] -177 | -184 ||| -121 | -184
[5] -112 | -184 ||| -56  | -184
[6] -244 | -145 ||| -189 | -145
[7] -174 | -145 ||| -126 | -145
[8] -107 | -145 ||| -57  | -145
[9] -39  | -145 ||| 13   | -145
 */
var stage8rects = Array(Rectangle(-245,-223,55,5),//1
Rectangle(-179,-223,58,5),//2
Rectangle(-245,-184,56,5),//3
Rectangle(-177,-184,56,5),//4
Rectangle(-112,-184,56,5),//5
Rectangle(-244,-145,55,5),//6
Rectangle(-174,-145,48,5),//7
Rectangle(-107,-145,50,5),//8
Rectangle(-41,-145,52,5));//9

var stage8combos = 
    Array(Array(0,0,0,1,1,1),//126 total
Array(1,1,1,1,1,0,0,0,0),
Array(1,1,1,1,0,1,0,0,0),
Array(1,1,1,1,0,0,1,0,0),
Array(1,1,1,1,0,0,0,1,0),
Array(1,1,1,1,0,0,0,0,1),
Array(1,1,1,0,1,1,0,0,0),
Array(1,1,1,0,1,0,1,0,0),
Array(1,1,1,0,1,0,0,1,0),
Array(1,1,1,0,1,0,0,0,1),
Array(1,1,1,0,0,1,1,0,0),
Array(1,1,1,0,0,1,0,1,0),
Array(1,1,1,0,0,1,0,0,1),
Array(1,1,1,0,0,0,1,1,0),
Array(1,1,1,0,0,0,1,0,1),
Array(1,1,1,0,0,0,0,1,1),
Array(1,1,0,1,1,1,0,0,0),
Array(1,1,0,1,1,0,1,0,0),
Array(1,1,0,1,1,0,0,1,0),
Array(1,1,0,1,1,0,0,0,1),
Array(1,1,0,1,0,1,1,0,0),
Array(1,1,0,1,0,1,0,1,0),
Array(1,1,0,1,0,1,0,0,1),
Array(1,1,0,1,0,0,1,1,0),
Array(1,1,0,1,0,0,1,0,1),
Array(1,1,0,1,0,0,0,1,1),
Array(1,1,0,0,1,1,1,0,0),
Array(1,1,0,0,1,1,0,1,0),
Array(1,1,0,0,1,1,0,0,1),
Array(1,1,0,0,1,0,1,1,0),
Array(1,1,0,0,1,0,1,0,1),
Array(1,1,0,0,1,0,0,1,1),
Array(1,1,0,0,0,1,1,1,0),
Array(1,1,0,0,0,1,1,0,1),
Array(1,1,0,0,0,1,0,1,1),
Array(1,1,0,0,0,0,1,1,1),
Array(1,0,1,1,1,1,0,0,0),
Array(1,0,1,1,1,0,1,0,0),
Array(1,0,1,1,1,0,0,1,0),
Array(1,0,1,1,1,0,0,0,1),
Array(1,0,1,1,0,1,1,0,0),
Array(1,0,1,1,0,1,0,1,0),
Array(1,0,1,1,0,1,0,0,1),
Array(1,0,1,1,0,0,1,1,0),
Array(1,0,1,1,0,0,1,0,1),
Array(1,0,1,1,0,0,0,1,1),
Array(1,0,1,0,1,1,1,0,0),
Array(1,0,1,0,1,1,0,1,0),
Array(1,0,1,0,1,1,0,0,1),
Array(1,0,1,0,1,0,1,1,0),
Array(1,0,1,0,1,0,1,0,1),
Array(1,0,1,0,1,0,0,1,1),
Array(1,0,1,0,0,1,1,1,0),
Array(1,0,1,0,0,1,1,0,1),
Array(1,0,1,0,0,1,0,1,1),
Array(1,0,1,0,0,0,1,1,1),
Array(1,0,0,1,1,1,1,0,0),
Array(1,0,0,1,1,1,0,1,0),
Array(1,0,0,1,1,1,0,0,1),
Array(1,0,0,1,1,0,1,1,0),
Array(1,0,0,1,1,0,1,0,1),
Array(1,0,0,1,1,0,0,1,1),
Array(1,0,0,1,0,1,1,1,0),
Array(1,0,0,1,0,1,1,0,1),
Array(1,0,0,1,0,1,0,1,1),
Array(1,0,0,1,0,0,1,1,1),
Array(1,0,0,0,1,1,1,1,0),
Array(1,0,0,0,1,1,1,0,1),
Array(1,0,0,0,1,1,0,1,1),
Array(1,0,0,0,1,0,1,1,1),
Array(1,0,0,0,0,1,1,1,1),//ALL ONES DONE - 70
Array(0,1,1,1,1,1,0,0,0),
Array(0,1,1,1,1,0,0,1,0),
Array(0,1,1,1,1,0,0,0,1),
Array(0,1,1,1,0,1,1,0,0),
Array(0,1,1,1,0,1,0,1,0),
Array(0,1,1,1,0,1,0,0,1),
Array(0,1,1,1,0,0,1,1,0),
Array(0,1,1,1,0,0,1,0,1),
Array(0,1,1,1,0,0,0,1,1),
Array(0,1,1,0,1,1,1,0,0),
Array(0,1,1,0,1,1,0,1,0),
Array(0,1,1,0,1,1,0,0,1),
Array(0,1,1,0,1,0,1,1,0),
Array(0,1,1,0,1,0,1,0,1),
Array(0,1,1,0,1,0,0,1,1),
Array(0,1,1,0,0,1,1,1,0),
Array(0,1,1,0,0,1,1,0,1),
Array(0,1,1,0,0,1,0,1,1),
Array(0,1,1,0,0,0,1,1,1),
Array(0,1,0,1,1,1,1,0,0),
Array(0,1,0,1,1,1,0,1,0),
Array(0,1,0,1,1,1,0,0,1),
Array(0,1,0,1,1,0,1,1,0),
Array(0,1,0,1,1,0,1,0,1),
Array(0,1,0,1,1,0,0,1,1),
Array(0,1,0,1,0,1,1,1,0),
Array(0,1,0,1,0,1,1,0,1),
Array(0,1,0,1,0,1,0,1,1),
Array(0,1,0,1,0,0,1,1,1),
Array(0,1,0,0,1,1,1,1,0),
Array(0,1,0,0,1,1,1,0,1),
Array(0,1,0,0,1,1,0,1,1),
Array(0,1,0,0,1,0,1,1,1),
Array(0,1,0,0,0,1,1,1,1),
Array(0,0,1,1,1,1,1,0,0),//ALL TWOS DONE - 34
Array(0,0,1,1,1,1,0,1,0),
Array(0,0,1,1,1,1,0,0,1),
Array(0,0,1,1,1,0,1,1,0),
Array(0,0,1,1,1,0,1,0,1),
Array(0,0,1,1,1,0,0,1,1),
Array(0,0,1,1,0,0,1,1,1),
Array(0,0,1,1,0,1,1,1,0),
Array(0,0,1,1,0,1,1,0,1),
Array(0,0,1,1,0,1,0,1,1),
Array(0,0,1,1,0,0,1,1,1),
Array(0,0,1,0,1,1,1,1,0),
Array(0,0,1,0,1,1,1,0,1),
Array(0,0,1,0,1,1,0,1,1),
Array(0,0,1,0,1,0,1,1,1),
Array(0,0,1,0,0,1,1,1,1),
Array(0,0,0,1,1,1,1,1,0),//ALL THREES DONE - 16
Array(0,0,0,1,1,1,1,0,1),
Array(0,0,0,1,1,1,0,1,1),
Array(0,0,0,1,1,0,1,1,1),
Array(0,0,0,1,0,1,1,1,1),
Array(0,0,0,0,1,1,1,1,1)//ALL FOURS DONE - 5
);

var curMap;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

         
    if (mode == -1) {
        cm.dispose();//ExitChat
    }else if (mode == 0){
        cm.dispose();//No
    }else{		    //Regular Talk
        if (mode == 1)
            status++;
        else
            status--;

        curMap = 8;
        var debug = true;//false
        var nthtext = "关卡8";
        var nthobj = "boxes";
        var nthverb = "stand";
        var nthpos = "stand too close to the edges";
        var curcombo = stage8combos;
        var currect = stage8rects;
        var objset = [0,0,0,0,0,0,0,0,0];
		

        if (isLeader()) { // leader
            if (status == 0) {
                // check for preamble
                var eim = cm.getPlayer().getEventInstance();
                party = eim.getPlayers();
                preamble = eim.getProperty("leader" + nthtext + "preamble");
                if (preamble == null) {
                    cm.sendNext("你好，欢迎来到关卡8，这里是最难得一关哦！当你看见这些箱子的时候你就应该想到了，没错就是和废弃都市那边的差不多，让你的5个队友站在上面吧！然后与我对话，我会判断对错！");
                    eim.setProperty("leader" + nthtext + "preamble","done");
                    var sequenceNum = Math.floor(Math.random() * curcombo.length);
                    eim.setProperty("stage" + nthtext + "combo",sequenceNum.toString());
                    cm.dispose();
                }else{
                    // otherwise
                    // check for stage completed
                    var complete = eim.getProperty(curMap.toString() + "stageclear");
                    if (complete != null) {	
                        var mapClear = curMap.toString() + "stageclear";
                        eim.setProperty(mapClear,"true"); // Just to be sure
                        cm.sendNext("Please hurry on to the next stage, the portal opened!");
                        cm.dispose();
                    }else{//Check Ropes 
                        // check for people on ropes(objset)
                        var totplayers = 0;
                        for (i = 0; i < objset.length; i++) {
                            for (j = 0; j < party.size(); j++) {
                                var present = currect[i].contains(party.get(j).getPosition());
                                if (present) {
                                    objset[i] = objset[i] + 1;
                                    totplayers = totplayers + 1;
                                }
                            }
                        }
                        // compare to correct
                        // first, are there 5 players on the objset?
                        if (totplayers == 5 || debug) {
                            var combo = curcombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
                            // debug
                            // combo = curtestcombo;
                            var testcombo = true;
                            for (i = 0; i < objset.length; i++) {
                                if (combo[i] != objset[i])
                                    testcombo = false;
                            }
                            if (testcombo || debug) {
                                // do clear
                                clear(curMap,eim,cm);
                                var exp = (1000);
                                cm.givePartyExp(exp, party);
                                cm.dispose();
                            }else{ // wrong
                                // do wrong
                                failstage(eim,cm);
                                cm.dispose();
                            }
                        }else{
                        	            
                            var outstring = "Objects contain:"
                            for (i = 0; i < objset.length; i++) {
                                outstring += "\r\n" + (i+1).toString() + ". " + objset[i].toString();
                            }
                            //DEBUGING ANSWER
                            if(cm.getPlayer().isGM()){
                                var combo = curcombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
                                outstring += "\r\n#b" + combo + "#k";
                                clear(curMap,eim,cm);
                            }
                            //END ANSWER
                            cm.sendNext(outstring); //
	
                            cm.dispose();
                        }
                    }
                }
                cm.dispose(); // just in case.
            }
        }else{ // not leader
            var eim = cm.getPlayer().getEventInstance();
            var complete = eim.getProperty(curMap.toString() + "stageclear");
            if (complete != null) {
                cm.sendNext("Please hurry on to the next stage, the portal opened!");
                cm.dispose();
            }else{
                cm.sendNext("Please have the party leader talk to me.");
                cm.dispose();
            }
        }
    }
}    
function isLeader(){
    if(cm.getParty() == null){
        return false;
    }else{
        return cm.isLeader();
    }
}


function clear(stage, eim, cm) {
var nthtext = "关卡8";
    	//var packetef = MaplePacketCreator.showEffect("quest/party/clear");
	//var packetsnd = MaplePacketCreator.playSound("Party1/Clear");
	//var packetglow = MaplePacketCreator.environmentChange("gate",2);
	var map = eim.getMapInstance(cm.getChar().getMapId());
	//map.broadcastMessage(packetef);
	//map.broadcastMessage(packetsnd);
	//map.broadcastMessage(packetglow);
		cm.warpParty(922010900);
		cm.givePartyExp(13000, eim.getPlayers());
		eim.setProperty("8stageclear","true");
		eim.setProperty("leader" + nthtext + "gaveItems","done");
		cm.dispose();
}

function failstage(eim, cm) {
    cm.wrong();
}