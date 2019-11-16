
var status = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
				var temp = "#fEtc/pachinko/controller/base/1#";
				var temp2 = "#fEtc/SpeedAnimationQuiz/BeijingOlympic/AniQuiz/5/ani/1#";
				var text = temp + temp + temp + temp + temp + temp + temp + temp + temp + temp + temp + "\r\n";
				text += "#e#b" + "#fEffect/CharacterEff/1112905/0/1#您目前是本服的#r VIP" + cm.getChar().getVip() + "  \r\n#b#fEffect/CharacterEff/1112905/0/1#您的爱乐豆剩余数量为 #r" + cm.getzb() + "\r\n#b#fEffect/CharacterEff/1112905/0/1#您的能量豆剩余数量为 #r" + cm.getnld() + "\r\n#b#fEffect/CharacterEff/1112905/0/1#您已捐款 #r"+ cm.getPlayer().getcsb() +"亿#b\r\n";
				text += "#L11##fEffect/CharacterEff/1112905/0/1#进入自由市场↑#l\r\n\r\n";
				text += "#L0##fEffect/CharacterEff/1112905/0/1#激活技能#l  ";
				text += "#L1##fEffect/CharacterEff/1112905/0/1#点卷赌博#l  ";
				text += "#L2##fEffect/CharacterEff/1112905/0/1#快速洗点#l\r\n\r\n";
				text += "#L3##fEffect/CharacterEff/1112905/0/1#快速转职#l  ";
				text += "#L4##fEffect/CharacterEff/1112905/0/1#世界传送#l  ";
				text += "#L5##fEffect/CharacterEff/1112905/0/1#飞升系统#l\r\n\r\n";
				text += "#L6##fEffect/CharacterEff/1112905/0/1#家族排行#l  ";
				text += "#L7##fEffect/CharacterEff/1112905/0/1#飞升排行#l  ";
				text += "#L8##fEffect/CharacterEff/1112905/0/1#领取工资#l\r\n\r\n";
				text += "#L9##fEffect/CharacterEff/1112905/0/1#VIP4属性勋章补领#l  ";				
				text += "#L10##fEffect/CharacterEff/1112905/0/1#购买精灵吊坠#l";			
				cm.sendSimple(text);			
		} else if (status == 1) {
			 if (selection == 0) {			     
                                         cm.getPlayer().maxAllSkills();//满技能
                              //cm.maxAllSkills(20);
			      cm.sendOk("技能激活成功!");
			} else if (selection == 1) {
				cm.openNpc(9100109);
			}else if (selection == 2) {
				cm.openNpc(1301000);
			}else if (selection == 3) {
				cm.openNpc(9310057);
			}else if (selection == 11) {
           cm.warp(910000000); 
           cm.dispose();
			}else if (selection == 4) {
				cm.openNpc(2023000);	
			}else if (selection == 5) {
				cm.openNpc(9310072);	
			}else if (selection == 6) {
				cm.displayGuildRanks();
				cm.dispose();
			}else if (selection == 7) {
                                cm.showreborns(); 
				cm.dispose();
			}else if (selection == 8) {
				cm.openNpc(2110005);				
			}else if (selection == 9) {
				if(cm.haveItem(1142178,1,true,false)){
					cm.sendOk("你已经有一个至尊会员勋章,无法再领取！");
					cm.dispose();
				}else{
					if(cm.getChar().getVip() >= 4){
						var toDrop = new net.sf.odinms.client.Equip(1142178,0);
						toDrop.setStr(500);
						toDrop.setDex(500);
						toDrop.setInt(500);
						toDrop.setLuk(500);
						toDrop.setSpeed(20);
						toDrop.setJump(20);
                                                toDrop.setLocked(1);
						net.sf.odinms.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop, -1);
						cm.getChar().saveToDB(true);
						cm.sendOk("领取成功！");
						cm.dispose();					
					}else{
						cm.sendOk("此勋章只有VIP4玩家才能拥有！");
						cm.dispose();
					}
				}
			}else if (selection == 10) {
				if(cm.getzb() >= 100000){
					if(cm.haveItem(1122017,1,true,false)){
						cm.sendOk("你已经有一个精灵吊坠了！");
						cm.dispose();
					}else{
						cm.setzb(-10);
						var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
						var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy();			
						var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() +  3 * 60 * 60 * 1000);
						toDrop.setExpiration(temptime);
						toDrop.setStr(100);
						toDrop.setDex(100);
						toDrop.setInt(100);
						toDrop.setLuk(100);
						net.sf.odinms.server.MapleInventoryManipulator.addFromDrop(cm.getC(), toDrop,-1);									
						cm.getChar().saveToDB(true);
						cm.sendOk("成功花了10个爱乐豆购买到属性100的精灵吊坠！");
						cm.dispose();

					}
					
				}else{
					cm.sendOk("你没有足够的元宝！");
					cm.dispose();
                           }
			}
		}
	}
}
