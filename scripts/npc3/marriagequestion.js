/**
 *Question...
 *author Jvlaple
 */
var status = 0;
var otherChar;
var Char;

importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.server);
 
function start(character3) {
	status = -1;
	action(1, 0, 0);
	otherChar = character3;
}

function action(mode, type, selection) {
	if (mode == -1) {
		otherChar.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(1, "Your partner has declined your request."));
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			otherChar.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(1, "Your partner has declined your request."));
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
		if (status == 0) {
			cm.sendNext("Someone in DestinyMS wants to send you a message.");
		} else if (status == 1) {
			var t = otherChar.getName();
			cm.sendYesNo("Do you wish to be engaged to " + t + "?") ;
		} else if (status == 2) {
			otherChar.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.serverNotice(1, "Your partner has accepted your request."));
			otherChar.setMarriageQuestLevel(50);
			cm.getPlayer().setMarriageQuestLevel(50);
			cm.createEngagement(cm.getPlayer().getId(), otherChar.getId());
			if (otherChar.countItem(2240000) > 0) {
				MapleInventoryManipulator.removeById(otherChar.getClient(), MapleInventoryType.USE, 2240000, 1, false, false);
				MapleInventoryManipulator.addById(otherChar.getClient(), 4031358, 1, "shit!");
				MapleInventoryManipulator.addById(cm.getPlayer().getClient(), 4031358, 1, "shit!");
				MapleInventoryManipulator.addById(otherChar.getClient(), 4031357, 1, "shit!");
			} else if (otherChar.countItem(2240001) > 0) {
				MapleInventoryManipulator.removeById(otherChar.getClient(), MapleInventoryType.USE, 2240001, 1, false, false);
				MapleInventoryManipulator.addById(otherChar.getClient(), 4031360, 1, "shit!");
				MapleInventoryManipulator.addById(cm.getPlayer().getClient(), 4031360, 1, "shit!");
				MapleInventoryManipulator.addById(otherChar.getClient(), 4031359, 1, "shit!");			
			} else if (otherChar.countItem(2240002) > 0) {
				MapleInventoryManipulator.removeById(otherChar.getClient(), MapleInventoryType.USE, 2240002, 1, false, false);
				MapleInventoryManipulator.addById(otherChar.getClient(), 4031362, 1, "shit!");
				MapleInventoryManipulator.addById(cm.getPlayer(), 4031362, 1, "shit!");
				MapleInventoryManipulator.addById(otherChar.getClient(), 4031361, 1, "shit!");
			} else if (otherChar.countItem(2240003) > 0) {
				MapleInventoryManipulator.removeById(otherChar.getClient(), MapleInventoryType.USE, 2240003, 1, false, false);
				MapleInventoryManipulator.addById(otherChar.getClient(), 4031364, 1, "shit!");
				MapleInventoryManipulator.addById(cm.getPlayer(), 4031364, 1, "shit!");
				MapleInventoryManipulator.addById(otherChar.getClient(), 4031363, 1, "shit!");			
			}
			cm.dispose();
		}
	}
}