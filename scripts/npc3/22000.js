/* 
	NPC Name: 		桑克斯
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        cm.sendOk("哼...还有些事没有处理完吧？");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("哼...你想去金银岛吗？");
    } else if (status == 1) {
        if (cm.haveItem(4031801)) {
            cm.sendNext("Okay, now give me 150 mesos... Hey, what's that? Is that the recommendation letter from Lucas, the chief of Amherst? Hey, you should have told me you had this. I, Shanks, recognize greatness when I see one, and since you have been recommended by Lucas, I see that you have a great, great potential as an adventurer. No way would I charge you for this trip!");
        } else {
            cm.sendNext("你是不是已经厌倦了这里? 好... 先收个 #e150 金币#n...");
        }
    } else if (status == 2) {
        if (cm.haveItem(4031801)) {
            cm.sendNextPrev("Since you have the recommendation letter, I won't charge you for this. Alright, buckle up, because we're going to head to Victoria Island right now, and it might get a bit turbulent!!");
        } else {
            if (cm.getPlayerStat("LVL") >= 7) {
                if (cm.getMeso() < 150) {
                    cm.sendOk("What? You're telling me you wanted to go without any money? You're one weirdo...");
                    cm.dispose();
                } else {
                    cm.sendNext("非常好! 收到了#e150 金币#n ! 好~ 现在开始向 #b金银岛#k出发~!");
                }
            } else {
                cm.sendOk("Let's see... I don't think you are strong enough. You'll have to be at least Level 7 to go to Victoria Island.");
                cm.dispose();
            }
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801)) {
            cm.gainItem(4031801, -1);
        } else {
            cm.gainMeso( - 150);
        }
        cm.warp(104000000);
        cm.dispose();
    }
}