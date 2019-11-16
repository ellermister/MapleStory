importPackage(net.sf.odinms.net.world.guild);

var status;
var choice;
var guildName;
var partymembers;

function start() {
	partymembers = cm.getPartyMembers();
	status = -1;
	action(1,0,0);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else {
		cm.dispose();
		return;
	}
	
	 
	if (status == 0)
	    cm.sendSimple("你好！  我是!  #b家族联盟的管理员#k\r\n#b#L0#你想知道家族联盟是什么吗?#l\r\n#L1#如何使用家族成为家族联盟吗?#l\r\n#L2#我想让家族成为家族联盟.#l\r\n#L3#我想要为家族联盟增加较多的家族.#l\r\n#L4#我想要解散家族联盟.#l");
	else if (status == 1) {
		choice = selection;
	    if (selection == 0) {
		    cm.sendNext("家族联盟是, 一个一些家族的联盟形成的一个超级小组。 我是掌管这些家族联盟的人.");
			cm.dispose();
		} else if (selection == 1) {
			cm.sendNext("要创建一个家族联盟， 需要2个家族主人需要在一个组队中。 这一个组队的队长将会被分配当做家族联盟的主人.");
			cm.dispose();
		} else if(selection == 2) {
			if (cm.getPlayer().getParty() == null) {
				cm.sendNext("你的队里面没有2个家族的族长，所以不能创建家族联盟。"); //Not real text
				cm.dispose();
			} else if (partymembers.get(0).getGuild() == null) {
				cm.sendNext("你不能直接让家族联盟创建到自己的家族。");
				cm.dispose();
			} else if (partymembers.get(1).getGuild() == null) {
				cm.sendNext("你好像不是家族的族长.");
				cm.dispose();
			} else if (partymembers.get(0).getGuild().getAllianceId() > 0) {
				cm.sendNext("你是另外的联盟的了，所以不能在加入这个联盟.");
				cm.dispose();
			} else if (partymembers.get(1).getGuild().getAllianceId() > 0) {
				cm.sendNext("你的家族成员已经这个家族联盟的了。");
				cm.dispose();
			} else if (partymembers.size() != 2) {
				cm.sendNext("请确定，只有 2个家族的族长在你的组队当中.");
				cm.dispose();
			} else if (cm.partyMembersInMap() != 2) {
				cm.sendNext("请确定你们两个家族的族长在此地图上.");
				cm.dispose();
			} else
                cm.sendYesNo("哦, 你对家族联盟感兴趣?");
		} else if (selection == 3) {
		    var rank = cm.getPlayer().getMGC().getAllianceRank();
			if (rank == 1)
				cm.sendOk("Not done yet"); //ExpandGuild Text
			else {
			    cm.sendNext("只有家族联盟主人能添加联盟的家族的数目.");
				cm.dispose();
			}
		} else if(selection == 4) {
		    var rank = cm.getPlayer().getMGC().getAllianceRank();
			if (rank == 1)
				cm.sendYesNo("你确定你想要解散你的家族联盟?");
			else {
				cm.sendNext("只有家族联盟主人可能解散家族联盟.");
				cm.dispose();
			}
		}
	} else if(status == 2) {
	    if (choice == 2) {
		    cm.sendGetText("现在请输入你的新家族联盟的名字. (max. 12 letters)");
		} else if (choice == 4) {
			if (cm.getPlayer().getGuild() == null) {
				cm.sendNext("你不能够解散不属于你的的家族联盟.");
				cm.dispose();
			} else if (cm.getPlayer().getGuild().getAllianceId() <= 0) {
				cm.sendNext("你不能够解散不属于你的的家族联盟.");
				cm.dispose();
			} else {
				MapleAlliance.disbandAlliance(cm.getC(), cm.getPlayer().getGuild().getAllianceId());
				cm.sendOk("你的家族联盟已经解散");
				cm.dispose();
			}
		}
	} else if (status == 3) {
		guildName = cm.getText();
	    cm.sendYesNo("Will "+ guildName + " be the name of your Guild Union?");
	} else if (status == 4) {
	    if (!MapleAlliance.canBeUsedAllianceName(guildName)) {
			cm.sendNext("这个名字不能使用，请你换别的！"); //Not real text
			status = 1;
			choice = 2;
		} else {
			if (MapleAlliance.createAlliance(partymembers.get(0), partymembers.get(1), guildName) == null)
				cm.sendOk("发生未知错误！");
			else
				cm.sendOk("你成功地创建了家族联盟.");
			cm.dispose();
		}
	}
}