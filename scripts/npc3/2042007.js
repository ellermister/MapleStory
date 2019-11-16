/* 
 * Spiegelmann - Monster Carnival
 */

var status = -1;
var rank = "C";
var exp = 0;

function start() {
    if (cm.getCarnivalParty() != null && cm.getCarnivalParty().getTotalCP() > 0) {
        status = 99;
    }
    action(1, 0, 0);
}
 
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (mode == -1) {
	cm.dispose();
	return;
    }
    if (status == 0) {
        cm.sendSimple("What would you like to do? If you have never participated in the Monster Carnival, you'll need to know a thing or two about it before joining.\r\n#b#L0# Go to the Monster Carnival Field.#l");
    } else if (status == 1) {
        switch (selection) {
            case 0: {
                var level = cm.getPlayerStat("LVL");
                if ( level < 50) {
                    cm.sendOk("I'm sorry, but only the users Level 50+ may participate in Monster Carnival.");
                } else {
                    cm.warp( 980030000, "st00" );
                }
                cm.dispose();
            }
            default: {
                cm.dispose();
                break;
            }
            break;
        }
    } else if (status == 100) {
        var carnivalparty = cm.getCarnivalParty();
        if (carnivalparty.getTotalCP() >= 501) {
            rank = "A";
            exp = 48000;
        } else if (carnivalparty.getTotalCP() >= 251) {
            rank = "B";
            exp = 35000;
        } else if (carnivalparty.getTotalCP() >= 101) {
            rank = "C";
            exp = 25000;
        } else if (carnivalparty.getTotalCP() >= 0) {
            rank = "D";
            exp = 15000;
        }
	cm.getPlayer().endPartyQuest(1302);
        if (carnivalparty.isWinner()) {
            cm.sendOk("You won the battle, despite your amazing performance. Victory is yours. \r\n#bMonster Carnival Rank : " + rank);
        } else {
            cm.sendOk("Unfortunately, you have either tied or lost the battle, despite your amazing performance. Victory should be yours the next time up. \r\n#bMonster Carnival Rank : " + rank);
        }
    } else if (status == 101) {
        var carnivalparty = cm.getCarnivalParty();
	var los = parseInt(cm.getPlayer().getOneInfo(1302, "lose"));
	var vic = parseInt(cm.getPlayer().getOneInfo(1302, "vic"));
        if (carnivalparty.isWinner()) {
	    vic++;
	    cm.getPlayer().updateOneInfo(1302, "vic", "" + vic);
            carnivalparty.removeMember(cm.getChar());
            cm.gainExpR(exp);
        } else {
	    los++;
	    cm.getPlayer().updateOneInfo(1302, "lose", "" + los);
            carnivalparty.removeMember(cm.getChar());
            cm.gainExpR(exp / 2);

        }
	cm.getPlayer().updateOneInfo(1302, "VR", "" + (java.lang.Math.ceil((vic * 100) / los)));
            cm.warp(980030000);
            cm.dispose();
    }

}