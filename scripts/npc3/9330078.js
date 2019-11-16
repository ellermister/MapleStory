importPackage(net.sf.odinms.client);

var status = 0;
var jobName;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk(".....");
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("你好,你是否不知道转职在哪里转呢?转职找我就对了!\r\n我负责 #r1-4转#k!你可以在我这里转职.#r战神请去找邮递员转职!\r\n\r\n#b冒险家/骑士团转职条件:#k\r\n10级,30级,70级,120级.\r\n");
        } else if (status == 1) {
            if(cm.getJob().getId() >= 1000 && cm.getJob().getId() <= 1510){
                cm.sendNext("系统检测你是骑士团职业.");
                status = 160;
                return;
            }
            if(cm.getJob().getId() >= 2000){
                cm.sendOk("战神请去找#b邮递员Npc#k转职!");
                cm.dispose();
		//status = 163;
                return;
            }
            if (cm.getLevel() < 255 && cm.getJob().equals(net.sf.odinms.client.MapleJob.BEGINNER)) {
                if (cm.getLevel() < 8) {
                    cm.sendNext("对不起，你至少要达到 #b[8级]#k 我才能为你服务！");
                    status = 98;
                } else if (cm.getLevel() < 10) {
                    cm.sendYesNo("我们需要集结魔法师的精神力去封印魔王的力量,#b管理员#k 正在与魔王对抗,我们应该尽快赶过去支援他,因此你必须比其他职业提前进行修炼并领悟魔法的精髓,这是一条艰苦的道路,那么你想成为 #b魔法师#k 吗？");
                    status = 150;
                    
                } else {
                    cm.sendNext("你觉得第一个职业选择哪一个比较好呢?");
                    status = 153;
                }
            } else if (cm.getLevel() < 30) {
                cm.sendNext("10级.30级.70级.120级，都可以来我这里转职哦！！");
                status = 98;
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.THIEF)) {
                cm.sendSimple("嗨~我们又见面了，恭喜你达到#r[30级]#k 你想转职为一名？\r\n#L0##b刺客#l    #L1##b侠客#l#k");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.WARRIOR)) {
                cm.sendSimple("嗨~我们又见面了，恭喜你达到#r[30级]#k 你想转职为一名？\r\n#L2##b剑客#l    #L3##b骑士#l    #L4##b枪战士#l#k");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.MAGICIAN)) {
                cm.sendSimple("嗨~我们又见面了，恭喜你达到#r[30级]#k 你想转职为一名？\r\n#L5##b冰雷#l    #L6##b火毒#l    #L7##b牧师#l#k");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BOWMAN)) {
                cm.sendSimple("嗨~我们又见面了，恭喜你达到#r[30级]#k 你想转职为一名？\r\n#L8##b猎人#l    #L9##b弩手#l#k");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.PIRATE)) {
                cm.sendSimple("嗨~我们又见面了，恭喜你达到#r[30级]#k 你想转职为一名？\r\n#L10##b拳手#l   #L11##b枪手#l");

            } else if (cm.getLevel() < 70) {
                cm.sendNext("怎么样？冒险还算顺利吧。有努力就有回报。当然这一切都不是容易的。当你到达 #r[70级]#k 的时候就可以进行#b[第三次转职]#k到时别忘记来找我哦！");
                status = 98;
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.ASSASSIN)) {
                status = 63;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BANDIT)) {
                status = 66;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.HUNTER)) {
                status = 69;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.CROSSBOWMAN)) {
                status = 72;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.FP_WIZARD)) {
                status = 75;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.IL_WIZARD)) {
                status = 78;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.CLERIC)) {
                status = 81;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.FIGHTER)) {
                status = 84;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.PAGE)) {
                status = 87;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.SPEARMAN)) {
                status = 90;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BRAWLER)) {
                status = 93;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.GUNSLINGER)) {
                status = 96;
                cm.sendYesNo("恭喜你达到了 #r[70级]#k 你现在就要完成 #b[第三次转职]#k 吗？");
            } else if (cm.getLevel() < 120) {
                cm.sendNext("怎么样？冒险还算顺利吧。有努力就有回报。当然这一切都不是容易的。当你到达 #r[120级]#k 的时候就可以进行#b[第四次转职]#k到时别忘记来找我哦！");
                status = 98;
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.HERMIT)) {
                status = 105;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.CHIEFBANDIT)) {
                status = 108;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.RANGER)) {
                status = 111;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.SNIPER)) {
                status = 114;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.FP_MAGE)) {
                status = 117;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.IL_MAGE)) {
                status = 120;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.PRIEST)) {
                status = 123;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.CRUSADER)) {
                status = 126;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.WHITEKNIGHT)) {
                status = 129;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.DRAGONKNIGHT)) {
                status = 132;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.MARAUDER)) {
                status = 135;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.OUTLAW)) {
                status = 138;
                cm.sendYesNo("恭喜你达到了 #r[120级]#k 你现在就要完成 #b[第四次转职]#k 吗？");
            } else if (cm.getLevel() < 255) {
                cm.sendNext("了不起，你已经完成了所有的转职！\r\n但是你可以 #r[转生]#k ,但需要管理员开启转生功能！");
                status = 98;
            } else if (cm.getLevel() >= 255) {
                cm.sendOk("#d啊哈... 伟大的 #r[#h #]#k ,你已经通过一个漫长而充满挑战的道路,终于成为了风起云涌的人物.但这个世界阴暗的深处,被 #r[管理员]#k #d封印的魔王正蠢蠢欲动,它的残忍无人能及,你需要修炼的更加强大才能拯救所有的居民!"); 
                cm.dispose();
            } else {
                cm.dispose();
            }

        } else if (status == 2) {
            if (selection == 0) {
                jobName = "刺客";
                job = net.sf.odinms.client.MapleJob.ASSASSIN;
            }
            if (selection == 1) {
                jobName = "侠客";
                job = net.sf.odinms.client.MapleJob.BANDIT;
            }
            if (selection == 2) {
                jobName = "剑客";
                job = net.sf.odinms.client.MapleJob.FIGHTER;
            }
            if (selection == 3) {
                jobName = "准骑士";
                job = net.sf.odinms.client.MapleJob.PAGE;
            }
            if (selection == 4) {
                jobName = "枪战士";
                job = net.sf.odinms.client.MapleJob.SPEARMAN;
            }
            if (selection == 5) {
                jobName = "冰雷法师";
                job = net.sf.odinms.client.MapleJob.IL_WIZARD;
            }
            if (selection == 6) {
                jobName = "火毒法师";
                job = net.sf.odinms.client.MapleJob.FP_WIZARD;
            }
            if (selection == 7) {
                jobName = "牧师";
                job = net.sf.odinms.client.MapleJob.CLERIC;
            }
            if (selection == 8) {
                jobName = "猎人";
                job = net.sf.odinms.client.MapleJob.HUNTER;
            }
            if (selection == 9) {
                jobName = "弩手";
                job = net.sf.odinms.client.MapleJob.CROSSBOWMAN;
            }
            if (selection == 10) {
                jobName = "拳手";
                job = net.sf.odinms.client.MapleJob.BRAWLER;
            }
            if (selection == 11) {
                jobName = "火枪手";
                job = net.sf.odinms.client.MapleJob.GUNSLINGER;
            }
            cm.sendYesNo("不错的选择哦，确定要成为一名 #b[" + jobName + "] #k吗？"); 
                        
                        
        } else if (status == 3) {
            cm.changeJob(job);
            if (cm.getJob().equals(net.sf.odinms.client.MapleJob.ASSASSIN)) {
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BANDIT)) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.FIGHTER)) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.PAGE)) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.SPEARMAN)) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.IL_WIZARD)) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.FP_WIZARD)) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.CLERIC)) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.HUNTER)) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.CROSSBOWMAN)) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BRAWLER)) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.GUNSLINGER)) {
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            }

            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            cm.dispose();

        } else if (status == 61) {
            if (cm.getJob().equals(net.sf.odinms.client.MapleJob.ASSASSIN)) {
                status = 63;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BANDIT)) {
                status = 66;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.HUNTER)) {
                status = 69;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.CROSSBOWMAN)) {
                status = 72;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.FP_WIZARD)) {
                status = 75;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.IL_WIZARD)) {
                status = 78;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.CLERIC)) {
                status = 81;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.FIGHTER)) {
                status = 84;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.PAGE)) {
                status = 87;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.SPEARMAN)) {
                status = 90;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.BRAWLER)) {
                status = 93;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.GUNSLINGER)) {
                status = 960;
                cm.sendYesNo("#d恭喜你达到了 #r[XXX级]#k #d,你现在就要完成 #r[第XXX次转职]#k 吗？");
            } else { 
                cm.dispose();
            }

        } else if (status == 64) {
            cm.changeJob(MapleJob.HERMIT);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            cm.dispose();
        } else if (status == 67) {
            cm.changeJob(MapleJob.CHIEFBANDIT);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            cm.dispose();
        } else if (status == 70) {
            cm.changeJob(MapleJob.RANGER);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            cm.dispose();
        } else if (status == 73) {
            cm.changeJob(MapleJob.SNIPER);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            cm.dispose();
        } else if (status == 76) {
            cm.changeJob(MapleJob.FP_MAGE);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            cm.dispose();
        } else if (status == 79) {
            cm.changeJob(MapleJob.IL_MAGE);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            cm.dispose();
        } else if (status == 82) {
            cm.changeJob(MapleJob.PRIEST);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            cm.dispose();
        } else if (status == 85) {
            cm.changeJob(MapleJob.CRUSADER);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            cm.dispose();
        } else if (status == 88) {
            cm.changeJob(MapleJob.WHITEKNIGHT);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            cm.dispose();
        } else if (status == 91) {
            cm.changeJob(MapleJob.DRAGONKNIGHT);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
        } else if (status == 94) {
            cm.changeJob(MapleJob.MARAUDER);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
        } else if (status == 97) {
            cm.changeJob(MapleJob.OUTLAW);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            cm.dispose();
        } else if (status == 99) {
            cm.sendOk("天气很好哦~~加油吧！再见！");
            cm.dispose();

        } else if (status == 102) {
            if (cm.getJob().equals(net.sf.odinms.client.MapleJob.HERMIT)) {
                status = 105;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.CHIEFBANDIT)) {
                status = 108;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.RANGER)) {
                status = 111;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.SNIPER)) {
                status = 114;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.FP_MAGE)) {
                status = 117;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.IL_MAGE)) {
                status = 120;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.PRIEST)) {
                status = 123;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.CRUSADER)) {
                status = 126;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.WHITEKNIGHT)) {
                status = 129;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.DRAGONKNIGHT)) {
                status = 132;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.MARAUDER)) {
                status = 135;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else if (cm.getJob().equals(net.sf.odinms.client.MapleJob.OUTLAW)) {
                status = 137;
                cm.sendYesNo("#d恭喜你达到了 #r[XXXX级]#k #d,你现在就要完成 #r[第XXXX次转职]#k 吗？");
            } else { 
                cm.dispose();
            }


        } else if (status == 106) {
            cm.changeJob(MapleJob.NIGHTLORD);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5220001,0,30);
            //cm.teachSkill(5220011,0,30);
            //cm.teachSkill(5220002,0,30);
            //cm.teachSkill(5221000,0,30);
            //cm.teachSkill(5221003,0,30);
            //cm.teachSkill(5221004,0,30);
            //cm.teachSkill(5221009,0,30);
            //cm.teachSkill(5221006,0,30);
            //cm.teachSkill(5221007,0,30);
            //cm.teachSkill(5221008,0,30);
            //cm.teachSkill(5221010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 109) {
            cm.changeJob(MapleJob.SHADOWER);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5220001,0,30);
            //cm.teachSkill(5220011,0,30);
            //cm.teachSkill(5220002,0,30);
            //cm.teachSkill(5221000,0,30);
            //cm.teachSkill(5221003,0,30);
            //cm.teachSkill(5221004,0,30);
            //cm.teachSkill(5221009,0,30);
            //cm.teachSkill(5221006,0,30);
            //cm.teachSkill(5221007,0,30);
            //cm.teachSkill(5221008,0,30);
            //cm.teachSkill(5221010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 112) {
            cm.changeJob(MapleJob.BOWMASTER);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5220001,0,30);
            //cm.teachSkill(5220011,0,30);
            //cm.teachSkill(5220002,0,30);
            //cm.teachSkill(5221000,0,30);
            //cm.teachSkill(5221003,0,30);
            //cm.teachSkill(5221004,0,30);
            //cm.teachSkill(5221009,0,30);
            //cm.teachSkill(5221006,0,30);
            //cm.teachSkill(5221007,0,30);
            //cm.teachSkill(5221008,0,30);
            //cm.teachSkill(5221010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 115) {
            cm.changeJob(MapleJob.CROSSBOWMASTER);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5220001,0,30);
            //cm.teachSkill(5220011,0,30);
            //cm.teachSkill(5220002,0,30);
            //cm.teachSkill(5221000,0,30);
            //cm.teachSkill(5221003,0,30);
            //cm.teachSkill(5221004,0,30);
            //cm.teachSkill(5221009,0,30);
            //cm.teachSkill(5221006,0,30);
            //cm.teachSkill(5221007,0,30);
            //cm.teachSkill(5221008,0,30);
            //cm.teachSkill(5221010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 118) {
            cm.changeJob(MapleJob.FP_ARCHMAGE);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5220001,0,30);
            //cm.teachSkill(5220011,0,30);
            //cm.teachSkill(5220002,0,30);
            //cm.teachSkill(5221000,0,30);
            //cm.teachSkill(5221003,0,30);
            //cm.teachSkill(5221004,0,30);
            //cm.teachSkill(5221009,0,30);
            //cm.teachSkill(5221006,0,30);
            //cm.teachSkill(5221007,0,30);
            //cm.teachSkill(5221008,0,30);
            //cm.teachSkill(5221010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 121) {
            cm.changeJob(MapleJob.IL_ARCHMAGE);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5220001,0,30);
            //cm.teachSkill(5220011,0,30);
            //cm.teachSkill(5220002,0,30);
            //cm.teachSkill(5221000,0,30);
            //cm.teachSkill(5221003,0,30);
            //cm.teachSkill(5221004,0,30);
            //cm.teachSkill(5221009,0,30);
            //cm.teachSkill(5221006,0,30);
            //cm.teachSkill(5221007,0,30);
            //cm.teachSkill(5221008,0,30);
            //cm.teachSkill(5221010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 124) {
            cm.changeJob(MapleJob.BISHOP);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5220001,0,30);
            //cm.teachSkill(5220011,0,30);
            //cm.teachSkill(5220002,0,30);
            //cm.teachSkill(5221000,0,30);
            //cm.teachSkill(5221003,0,30);
            //cm.teachSkill(5221004,0,30);
            //cm.teachSkill(5221009,0,30);
            //cm.teachSkill(5221006,0,30);
            //cm.teachSkill(5221007,0,30);
            //cm.teachSkill(5221008,0,30);
            //cm.teachSkill(5221010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 127) {
            cm.changeJob(MapleJob.HERO);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5220001,0,30);
            //cm.teachSkill(5220011,0,30);
            //cm.teachSkill(5220002,0,30);
            //cm.teachSkill(5221000,0,30);
            //cm.teachSkill(5221003,0,30);
            //cm.teachSkill(5221004,0,30);
            //cm.teachSkill(5221009,0,30);
            //cm.teachSkill(5221006,0,30);
            //cm.teachSkill(5221007,0,30);
            //cm.teachSkill(5221008,0,30);
            //cm.teachSkill(5221010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 130) {
            cm.changeJob(MapleJob.PALADIN);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5220001,0,30);
            //cm.teachSkill(5220011,0,30);
            //cm.teachSkill(5220002,0,30);
            //cm.teachSkill(5221000,0,30);
            //cm.teachSkill(5221003,0,30);
            //cm.teachSkill(5221004,0,30);
            //cm.teachSkill(5221009,0,30);
            //cm.teachSkill(5221006,0,30);
            //cm.teachSkill(5221007,0,30);
            //cm.teachSkill(5221008,0,30);
            //cm.teachSkill(5221010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 133) {
            cm.changeJob(MapleJob.DARKKNIGHT);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5220001,0,30);
            //cm.teachSkill(5220011,0,30);
            //cm.teachSkill(5220002,0,30);
            //cm.teachSkill(5221000,0,30);
            //cm.teachSkill(5221003,0,30);
            //cm.teachSkill(5221004,0,30);
            //cm.teachSkill(5221009,0,30);
            //cm.teachSkill(5221006,0,30);
            //cm.teachSkill(5221007,0,30);
            //cm.teachSkill(5221008,0,30);
            //cm.teachSkill(5221010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 136) {
            cm.changeJob(MapleJob.BUCCANEER);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5121001,0,30);
            //cm.teachSkill(5121002,0,30);
            //cm.teachSkill(5121003,0,0);
            //cm.teachSkill(5121004,0,30);
            //cm.teachSkill(5121005,0,30);
            // //cm.teachSkill(5121006,0,30);
            //cm.teachSkill(5121007,0,30);
            //cm.teachSkill(5121008,0,30);
            //cm.teachSkill(5121009,0,30);
            //cm.teachSkill(5121010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 139) {
            cm.changeJob(MapleJob.CORSAIR);
            cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
            //cm.teachSkill(5220001,0,30);
            //cm.teachSkill(5220011,0,30);
            //cm.teachSkill(5220002,0,30);
            //cm.teachSkill(5221000,0,30);
            //cm.teachSkill(5221003,0,30);
            //cm.teachSkill(5221004,0,30);
            //cm.teachSkill(5221009,0,30);
            //cm.teachSkill(5221006,0,30);
            //cm.teachSkill(5221007,0,30);
            //cm.teachSkill(5221008,0,30);
            //cm.teachSkill(5221010,0,30);
            // cm.setLevel(121);
            cm.dispose();
        } else if (status == 151) {
            if (cm.c.getPlayer().getInt() >= 4) {
                //cm.teachSkill(2000000,0,16); //Improving MP Recovery
                //cm.teachSkill(2000001,0,10); //Improving Max MP Increase
                //cm.teachSkill(2001002,0,20); //Magic Guard
                //cm.teachSkill(2001003,0,20); //Magic Armor
                //cm.teachSkill(2001004,0,20); //Energy Bolt
                //cm.teachSkill(2001005,0,20); //Magic Claw
                cm.changeJob(net.sf.odinms.client.MapleJob.MAGICIAN);
                cm.sendOk("转职成功！希望你成为出色的 #b[魔法师]#k ！");
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
                cm.dispose();
            } else {
                cm.sendOk("你没有符合最小需求: #b[20 智力]#k ！");
                cm.dispose();
            }
            
        } else if (status == 154) {
            cm.sendSimple("你觉得哪一个职业适合你的品味呢？#b\r\n#L0#战士#l\r\n#L1#魔法师#l \r\n#L2#弓箭手#l\r\n#L3#飞侠#l\r\n#L4#海盗#l#k");


        } else if (status == 155) {
            if (selection == 0) {
                jobName = "战士";
                job = net.sf.odinms.client.MapleJob.WARRIOR;

            }
            if (selection == 1) {
                jobName = "魔法师";
                job = net.sf.odinms.client.MapleJob.MAGICIAN;

            }
            if (selection == 2) {
                jobName = "弓箭手";
                job = net.sf.odinms.client.MapleJob.BOWMAN;

            }
            if (selection == 3) {
                jobName = "飞侠";
                job = net.sf.odinms.client.MapleJob.THIEF;

            }
            if (selection == 4) {
                jobName = "海盗";
                job = net.sf.odinms.client.MapleJob.PIRATE;

            }
            cm.sendYesNo("确定要成为一名 #b[" + jobName + "] #k吗？"); 
        } else if (status == 156) {
                cm.changeJob(job);
                cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职成功！");
                cm.dispose();
            
        } else if (status == 161) {
            if(cm.getJob().getId() == 1000 && cm.getLevel()>=10){
                cm.sendSimple("看起来你还是一个初心者,快选择一个适合自己的职业吧!#b\r\n#L0#魂骑士#l #L1#炎术士#l #L2#风灵使者#l #L3#夜行者#l #L4#奇袭者#l#k");
            }else if(parseInt(cm.getJob().getId() / 100) >10 && cm.getLevel()>=30 && cm.getJob().getId()%100 == 0){
                cm.sendYesNo("您真的确定要进行第二次转职了吗？");
            }else if(parseInt(cm.getJob().getId() / 100) >10 && cm.getLevel()>=70 && cm.getJob().getId()%10 == 0){
                cm.sendYesNo("您真的确定要进行第三次转职了吗？");
            }else{
                cm.sendOk("您目前的条件不能使用我的服务哦!");
                cm.dispose();
            }
        } else if (status == 162) {
            if(cm.getJob().getId() == 1000 && cm.getLevel()>=10){
                if (selection == 0) {
                    job = net.sf.odinms.client.MapleJob.GHOST_KNIGHT;
                //cm.gainItem(1302012,1); 
                //cm.gainItem(1302008,1); 
                //cm.gainItem(1432001,1); 
                //cm.gainItem(1432002,1); 
                //cm.gainItem(1402000,1); 
                //cm.gainItem(1402002,1); 
                //cm.gainItem(1442006,1); 
                //cm.gainItem(1442001,1); 
                } else if (selection == 1) {
                    job = net.sf.odinms.client.MapleJob.FIRE_KNIGHT;
                cm.gainItem(1372043,1); 
                cm.gainItem(1372001,1); 
                } else if (selection == 2) {
                    job = net.sf.odinms.client.MapleJob.WIND_KNIGHT;
                //cm.gainItem(1462001,1); 
                //cm.gainItem(2061000,1);
                //cm.gainItem(1462004,1);
                //cm.gainItem(2060000,1);
                //cm.gainItem(1452051,1);
                //cm.gainItem(1452008,1);
                } else if (selection == 3) {
                    job = net.sf.odinms.client.MapleJob.NIGHT_KNIGHT;
                //cm.gainItem(1332063,1); 
                //cm.gainItem(2070000,1); 
                //cm.gainItem(1332012,1); 
                //cm.gainItem(1472001,1); 
                //cm.gainItem(1472008,1); 
                } else if (selection == 4) {
                    job = net.sf.odinms.client.MapleJob.THIEF_KNIGHT;
                //cm.gainItem(14920141); 
                //cm.gainItem(14920041); 
                //cm.gainItem(14820141); 
                //cm.gainItem(14820041); 
                //cm.gainItem(23300001); 
                }
                cm.changeJob(job);
                cm.gainItem(1142066,1);
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职为骑士团职业！");
                cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            } else if(parseInt(cm.getJob().getId() / 100) >10 && cm.getLevel()>=30 && cm.getJob().getId()%100 == 0){
                cm.changeJob(MapleJob.getById(cm.getJob().getId()+10));
                cm.gainItem(1142067,1);
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职为骑士团职业！");
                cm.sendOk("转职成功！加油锻炼，当你变的强大的时候记的来找我哦！");
            } else if(parseInt(cm.getJob().getId() / 100) >10 && cm.getLevel()>=70 && cm.getJob().getId()%10 == 0){
                cm.gainItem(1142068,1);
                cm.getPlayer().gainAp(5);
                cm.changeJob(MapleJob.getById(cm.getJob().getId()+1));
                //cm.serverNotice("[转职系统]: 恭喜 [" + cm.getPlayer() + "] 在NPC：菇菇博士 快速转职为骑士团职业！");
                cm.sendOk("转职成功！希望您以后的冒险之路顺利!");
            }
            cm.dispose();
        } else if (status == 164) {
            if(cm.getJob().getId() == 2000 && cm.getLevel() >=10){
                cm.sendYesNo("战神战起来！\r\n看起来你还是一个战童,您确定要进行第一次转职吗？");
            } else if(cm.getJob().getId() == 2100 && cm.getLevel() >=30) {
                cm.sendYesNo("战神战起来！您真的确定要进行第二次转职了吗？");
            } else if(cm.getJob().getId() == 2110 && cm.getLevel() >=70){
                cm.sendYesNo("战神战起来！您真的确定要进行第三次转职了吗？");
            } else if(cm.getJob().getId() == 2111 && cm.getLevel() >=120) {
                cm.sendYesNo("战神战起来！您真的确定要进行第四次转职了吗？");
            } else if(cm.getJob().getId() == 2112 && cm.getLevel() >120) {
                cm.sendOk("你已经完成了所有的转职工作。继续加油吧！！");
            } else {
                cm.sendOk("按照您目前的条件，我还不能为您服务哦！加油吧！");
                cm.dispose();

                cm.sendOk("转职成功！希望您以后的冒险之路顺利！");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }  

    }
}
