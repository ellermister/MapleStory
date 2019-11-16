importPackage(net.sf.odinms.client);
function start() {
	status = -1;
	
	action(1, 0, 0);
}

function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 0 && mode == 0) {
                
			cm.sendOk("好的,如果你想好了要做什么,我会很乐意的为你服务的..");
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
			cm.sendSimple(" #你好，本服只有一个VIP等级！1RMB = 1充值币.\r\n 会员VIP要280充值币.请到网站选择充值平台充值。\r\n 您的冒险币：#r"+ cm.getChar().getMeso() +"元#k\r\n 您的点卷：#r"+ cm.getChar().getNX() +"点#k\r\n 您的充值币:#r"+ cm.getzb() +"点#k\r\n #r#L1#开通会员VIP(280充值币)(背包每栏空8个位置)#l\r\n\r\n#b    否则出了问题GM一概不负责↑.#l\r\n #r#L88#会员物品介绍#l \r\n #k#L8#工资(VIP和普通玩家都领取)#l#n");
			} else if (status == 1) {
			if (selection == 1) {
			if(cm.getChar().getVip() >= 1) {
			cm.sendOk("您已经是会员VIP了，请不要重复开通.");
			cm.dispose();
             } else if (cm.getzb() >= 280) {
			 for(var i = 1;i<=5;i++){
				if(cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(i)).isFull()){
					cm.sendOk("您至少应该让所有包裹都空出6格");
					cm.dispose();
					return;
				}
			}
			cm.getChar().setVip(1) ;
			cm.setzb(-280);
			cm.setxfb(280);//
			cm.gainItem(5390005,100);//高质地喇叭
			cm.gainItem(5390000,100);
			cm.gainItem(5390001,100);
			cm.gainItem(5390002,100);
			cm.gainItem(5220040,50);
			cm.gainItem(1402014,1);
			cm.gainItem(1002609,1);//
			cm.gainItem(3010073,1);
			cm.gainItem(3010071,1);//
			cm.gainItem(3010044,1);//
			cm.gainItem(1902032,1);//
			cm.gainItem(1912025,1);//
			cm.gainItem(1902034,1);//
			cm.gainItem(1912027,1);//
			cm.gainItem(4031942,10);//
			cm.gainNX(50000);//
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(2300000);	
		var toDrop = ii.randomizeStats(ii.getEquipById(2300000)).copy();
		var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000);
		toDrop.setExpiration(temptime);		
		//toDrop.setLuk(50);
		//toDrop.setInt(50);
		//toDrop.setDex(50);
		//toDrop.setStr(50);
		//toDrop.setHp(500);
		//toDrop.setMp(500);
		//toDrop.setAcc(500);
		//toDrop.setAvoid(500);
		//toDrop.setSpeed(500);
		//toDrop.setJump(500);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
		
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1142006);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1142006)).copy();
		//var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 1 * 60 * 60 * 1000);
		//toDrop.setExpiration(temptime);		
		toDrop.setLuk(500);
		toDrop.setInt(500);
		toDrop.setDex(500);
		toDrop.setStr(500);
		toDrop.setWatk(500);
		toDrop.setMatk(500);
		toDrop.setHp(500);
		toDrop.setMp(500);
		//toDrop.setAcc(500);
		//toDrop.setAvoid(500);
		//toDrop.setSpeed(500);
		//toDrop.setJump(500);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
		
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1112404);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy();
		//var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 1 * 60 * 60 * 1000);
		//toDrop.setExpiration(temptime);		
		toDrop.setLuk(500);
		toDrop.setInt(500);
		toDrop.setDex(500);
		toDrop.setStr(500);
		toDrop.setWatk(500);
		toDrop.setMatk(500);
		toDrop.setHp(500);
		toDrop.setMp(500);
		//toDrop.setAcc(500);
		//toDrop.setAvoid(500);
		//toDrop.setSpeed(500);
		//toDrop.setJump(500);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
		   cm.serverNotice("『系统信息』：恭喜玩家 "+ cm.getChar().getName() +" ,开通了会员VIP,大家来祝贺他吧!");
                   cm.sendOk("哇~!HO，你现在已经是#b会员VIP会员#l#k了，快去享受VIP带给您的乐趣吧.#k");
                   cm.dispose();
                   } else {
					cm.sendOk("您没有充值币,无法为您开通."); 
					cm.dispose(); }
			} else if  (selection == 2) {
                   if(cm.getChar().getVip() >= 2) {
			  cm.sendOk("您已经是白金会员VIP了，请不要重复开通.");
			  cm.dispose();
                      } else if (cm.getzb() >=800000 ) {
			cm.getChar().setVip(2) ;
			cm.setzb(-800000);
			cm.gainItem(5072000,5);//高质地喇叭
			cm.gainItem(5390000,5);
			cm.gainItem(5390001,5);
			cm.gainItem(5390002,5);
			cm.gainItem(3010018,1);//椰子树沙滩椅
			cm.gainItem(3010040,1);//蝙蝠椅
			cm.gainItem(1142004,1);//勤奋冒险家勋章
			cm.gainItem(4031454,10);//转身圣杯
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1112404);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy();
		//var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 1 * 60 * 60 * 1000);
		//toDrop.setExpiration(temptime);		
		toDrop.setLuk(800);
		toDrop.setInt(800);
		toDrop.setDex(800);
		toDrop.setStr(800);
		toDrop.setHp(800);
		toDrop.setMp(800);
		toDrop.setAcc(800);
		toDrop.setAvoid(800);
		toDrop.setSpeed(800);
		toDrop.setJump(800);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
                        cm.gainNX(10000);
		   cm.serverNotice("『系统信息』：恭喜玩家 "+ cm.getChar().getName() +" ,开通了白金会员VIP,大家来祝贺他吧!");
                   cm.sendOk("哇~!HO，你现在已经是#b白金会员VIP会员#l#k了，快去享受VIP带给您的乐趣吧.#k");
                   cm.dispose();
                   } else {
					cm.sendOk("您没有充值币80W,无法为您开通."); 
					cm.dispose(); }
            } else if (selection == 3) {
			if(cm.getChar().getVip() >= 3) {
			  cm.sendOk("您已经是砖石会员VIP了，请不要重复开通.");
			  cm.dispose();
                      } else if (cm.getzb() >=1800000 ) {
			cm.getChar().setVip(3) ;
            cm.gainNX(30000);
			cm.setzb(-1800000);
			cm.gainItem(5072000,10);//高质地喇叭
			cm.gainItem(5390000,10);
			cm.gainItem(5390001,10);
			cm.gainItem(5390002,10);
			cm.gainItem(3010012,1);//剑士 宝座
			cm.gainItem(3010025,1);//枫叶纪念凳
			cm.gainItem(3010028,1);//海盗的俘虏
			cm.gainItem(1142005,1);//传说中的冒险家勋章
			cm.gainItem(4031454,15);//转身圣杯
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1112404);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy();
		//var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 1 * 60 * 60 * 1000);
		//toDrop.setExpiration(temptime);		
		toDrop.setLuk(1300);
		toDrop.setInt(1300);
		toDrop.setDex(1300);
		toDrop.setStr(1300);
		toDrop.setHp(1300);
		toDrop.setMp(1300);
		toDrop.setAcc(1300);
		toDrop.setAvoid(1300);
		toDrop.setSpeed(1300);
		toDrop.setJump(1300);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
		   cm.serverNotice("『系统信息』：恭喜玩家 "+ cm.getChar().getName() +" ,开通了砖石会员VIP,大家来祝贺他吧!");
                   cm.sendOk("哇~!HO，你现在已经是#b砖石会员VIP会员#l#k了，快去享受VIP带给您的乐趣吧.#k");
                   cm.dispose();
                   } else {
					cm.sendOk("您没有充值币180W,无法为您开通."); 
					cm.dispose(); 
					}
					} else if (selection == 12) {
			if(cm.getChar().getVip() >= 4) {
			  cm.sendOk("您已经是砖石会员VIP了，请不要重复开通.");
			  cm.dispose();
                      } else if (cm.getzb() >=3000000 ) {
			cm.getChar().setVip(4) ;
            cm.gainNX(30000);
			cm.setzb(-3000000);
			cm.gainItem(5072000,15);//高质地喇叭
			cm.gainItem(5390000,15);
			cm.gainItem(5390001,15);
			cm.gainItem(5390002,15);
			cm.gainItem(3010041,1);//骷髅王座
			cm.gainItem(3010043,1);//魔女的飞扫把	
			cm.gainItem(3010054,1);//呼噜呼噜床
			cm.gainItem(3010058,1);//世界末日	
			cm.gainItem(1142006,1);//冒险岛偶像明星勋章
			cm.gainItem(4031454,20);//转身圣杯
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1112404);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy();
		//var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 1 * 60 * 60 * 1000);
		//toDrop.setExpiration(temptime);		
		toDrop.setLuk(2000);
		toDrop.setInt(2000);
		toDrop.setDex(2000);
		toDrop.setStr(2000);
		toDrop.setHp(2000);
		toDrop.setMp(2000);
		toDrop.setAcc(2000);
		toDrop.setAvoid(2000);
		toDrop.setSpeed(2000);
		toDrop.setJump(2000);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
		   cm.serverNotice("『系统信息』：恭喜玩家 "+ cm.getChar().getName() +" ,开通了皇家会员VIP,大家来祝贺他吧!");
                   cm.sendOk("哇~!HO，你现在已经是#b皇家会员VIP会员#l#k了，快去享受VIP带给您的乐趣吧.#k");
                   cm.dispose();
                   } else {
					cm.sendOk("您没有充值币300W,无法为您开通."); 
					cm.dispose(); 
					}
            } else if (selection == 4) {
                       cm.warp(910000003);
                       cm.dispose();     
            } else if (selection == 5) {
                       cm.warp(910000004);    
                       cm.dispose();  
            } else if (selection == 7) {
                        if(cm.getChar().getVip() >= 3) {
					  cm.sendOk("您已经是砖石会员VIP了，请不要重复升级.");
					  cm.dispose();
                      } else if (cm.getzb() >=1200000 && cm.getChar().getVip() == 2) {
					cm.getChar().setVip(3) ;
					cm.setzb(-1200000);
					cm.gainItem(5072000,5);//高质地喇叭
			cm.gainItem(5390000,5);
			cm.gainItem(5390001,5);
			cm.gainItem(5390002,5);
			cm.gainItem(3010012,1);//剑士 宝座
			cm.gainItem(3010025,1);//枫叶纪念凳
			cm.gainItem(3010028,1);//海盗的俘虏
			cm.gainItem(1142005,1);//传说中的冒险家勋章
			cm.gainItem(4031454,10);//转身圣杯
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1112404);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy();
		//var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 1 * 60 * 60 * 1000);
		//toDrop.setExpiration(temptime);		
		toDrop.setLuk(500);
		toDrop.setInt(500);
		toDrop.setDex(500);
		toDrop.setStr(500);
		toDrop.setHp(500);
		toDrop.setMp(500);
		toDrop.setAcc(500);
		toDrop.setAvoid(500);
		toDrop.setSpeed(500);
		toDrop.setJump(500);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
					cm.serverNotice("『系统信息』：恭喜玩家 "+ cm.getChar().getName() +" ,升级到砖石会员VIP,大家来祝贺他吧!");
                    cm.sendOk("哇~!HO，你现在已经是#b砖石会员VIP会员#l#k了，快去享受VIP带给您的乐趣吧.#k");
                    cm.dispose();
                   } else {
					cm.sendOk("您没有充值币120W,无法为您开通."); 
					cm.dispose(); 
					}  
					} else if (selection == 7) {
                        if(cm.getChar().getVip() >= 4) {
					  cm.sendOk("您已经是皇家会员VIP了，请不要重复升级.");
					  cm.dispose();
                      } else if (cm.getzb() >=1500000 && cm.getChar().getVip() == 3) {
					cm.getChar().setVip(4) ;
					cm.setzb(-1200000);
			cm.gainItem(5072000,5);//高质地喇叭
			cm.gainItem(5390000,5);
			cm.gainItem(5390001,5);
			cm.gainItem(5390002,5);
			cm.gainItem(3010041,1);//骷髅王座
			cm.gainItem(3010043,1);//魔女的飞扫把	
			cm.gainItem(3010054,1);//呼噜呼噜床
			cm.gainItem(3010058,1);//世界末日	
			cm.gainItem(1142006,1);//冒险岛偶像明星勋章
			cm.gainItem(4031454,10);//转身圣杯
		var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1112404);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1112404)).copy();
		//var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 1 * 60 * 60 * 1000);
		//toDrop.setExpiration(temptime);		
		toDrop.setLuk(700);
		toDrop.setInt(700);
		toDrop.setDex(700);
		toDrop.setStr(700);
		toDrop.setHp(700);
		toDrop.setMp(700);
		toDrop.setAcc(700);
		toDrop.setAvoid(700);
		toDrop.setSpeed(700);
		toDrop.setJump(700);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
					cm.serverNotice("『系统信息』：恭喜玩家 "+ cm.getChar().getName() +" ,升级到皇家会员VIP,大家来祝贺他吧!");
                    cm.sendOk("哇~!HO，你现在已经是#b皇家会员VIP会员#l#k了，快去享受VIP带给您的乐趣吧.#k");
                    cm.dispose();
                   } else {
					cm.sendOk("您没有充值币150W,无法为您开通."); 
					cm.dispose(); 
					}  
            } else if (selection == 8) {
			if (cm.getBossLog('VIPGZ') >= 1) {
            cm.sendOk("抱歉，尊敬玩家你今天己经领取工资，请明天再来找我吧！");
		cm.dispose();
            } else if(cm.getChar().getVip() == 0) {
            cm.gainMeso(1000000);
			cm.gainItem(5072000,5);//高质地喇叭
			cm.gainItem(5390000,5);
			cm.gainItem(5390001,5);
			cm.gainItem(5390002,5);
			cm.gainNX(1000);
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1122017);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy();
		var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 3 * 60 * 60 * 1000);
		toDrop.setExpiration(temptime);		
		toDrop.setLuk(50);
		toDrop.setInt(50);
		toDrop.setDex(50);
		toDrop.setStr(50);
		//toDrop.setHp(700);
		//toDrop.setMp(700);
		//toDrop.setAcc(700);
		//toDrop.setAvoid(700);
		//toDrop.setSpeed(700);
		//toDrop.setJump(700);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
            cm.setBossLog('VIPGZ');
	    cm.serverNotice("『玩家工资公告』：【"+ cm.getChar().getName() +"】在NPC那里领取了100W游戏币、高质地喇叭、炽热情景喇叭、绚烂情景喇叭、爱心情景喇叭（5个）、1000点卷、全属性20精灵吊坠3小时");
		cm.dispose();
            } else if(cm.getChar().getVip() == 1) {
            cm.gainMeso(100000000);
			cm.gainItem(5072000,20);//高质地喇叭
			cm.gainItem(5390000,20);
			cm.gainItem(5390001,20);
			cm.gainItem(5390002,20);
			cm.gainItem(4031942,1);
			cm.gainNX(5000);
			var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();
		var type = ii.getInventoryType(1122017);	
		var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy();
		var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 1 * 10 * 60 * 60 * 1000);
		toDrop.setExpiration(temptime);		
		toDrop.setLuk(200);
		toDrop.setInt(200);
		toDrop.setDex(200);
		toDrop.setStr(200);
		//toDrop.setHp(700);
		//toDrop.setMp(700);
		//toDrop.setAcc(700);
		//toDrop.setAvoid(700);
		//toDrop.setSpeed(700);
		//toDrop.setJump(700);	
		cm.getPlayer().getInventory(type).addItem(toDrop);
		cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop));
            cm.setBossLog('VIPGZ');
	    cm.serverNotice("『会员VIP工资公告』：【"+ cm.getChar().getName() +"】在VIP那里领取了1亿游戏币、升级装备次数锤子1个、老虎喇叭、炽热情景喇叭、绚烂情景喇叭、爱心情景喇叭（1个）、5000点卷、全属性100精灵吊坠10小时");
		cm.dispose();
            } else if(cm.getChar().getVip() == 2) {
            cm.gainMeso(300000000);
			cm.gainItem(5072000,3);//高质地喇叭
			cm.gainItem(5390000,3);
			cm.gainItem(5390001,3);
			cm.gainItem(5390002,3);
			cm.gainItem(4031454,2);//转身圣杯
			cm.gainItem(2000019,100);
                cm.setBossLog('VIPGZ');
		cm.serverNotice("『白金会员VIP公告』：【"+ cm.getChar().getName() +"】在VIP那里领取了3亿游戏币、高质地喇叭、炽热情景喇叭、绚烂情景喇叭、爱心情景喇叭（3个）转生币2个、超级药水100个");
			cm.dispose();
            } else if(cm.getChar().getVip() == 3) {
            cm.gainMeso(500000000);
			cm.gainItem(5072000,5);//高质地喇叭
			cm.gainItem(5390000,5);
			cm.gainItem(5390001,5);
			cm.gainItem(5390002,5);
			cm.gainItem(4031454,3);//转身圣杯
			cm.gainItem(2000019,150);
            cm.setBossLog('VIPGZ');
	    cm.serverNotice("『砖石会员VIP公告』：【"+ cm.getChar().getName() +"】在VIP那里领取了5亿游戏币、高质地喇叭、炽热情景喇叭、绚烂情景喇叭、爱心情景喇叭（5个）转生币3个、超级药水150个");
			cm.dispose();
            cm.dispose();
			}else if(cm.getChar().getVip() == 4) {
            cm.gainMeso(700000000);
			cm.gainItem(5072000,7);//高质地喇叭
			cm.gainItem(5390000,7);
			cm.gainItem(5390001,7);
			cm.gainItem(5390002,7);
			cm.gainItem(4031454,5);//转身圣杯
			cm.gainItem(2000019,200);
            cm.setBossLog('VIPGZ');
	    cm.serverNotice("『皇家会员VIP公告』：【"+ cm.getChar().getName() +"】在VIP那里领取了7亿游戏币、高质地喇叭、炽热情景喇叭、绚烂情景喇叭、爱心情景喇叭（7个）转生币5个、超级药水200个");
			cm.dispose();
            cm.dispose();
			}
            } else if (selection == 9) {
                   cm.sendOk("#l#b稀饭管理员\r\n #k这些就是本服的GM名单");
                   cm.dispose();  
            } else if (selection == 88) {
                   cm.sendOk("#l#b会员VIP办理赠送物品：\r\n#v1142006#全属性500包含攻击力(永久)\r\n#v1112404#全属性500包含攻击力(永久)\r\n#v1402014#(永久)\r\n#v1002609#(永久)\r\n#v3010073#(永久)\r\n#v3010071#(永久)\r\n#v3010044#(永久)\r\n#v1902032#(永久)\r\n#v1902034#(永久)\r\n#v5220040#50个\r\n#v5390000#100个\r\n#v5390001#100个\r\n#v5390002#100个\r\n#v5390005#100个\r\n#v4031942#10个(用于升级装备加卷次数)\r\n#v2300000#限时1周");
                   cm.dispose();  
            } else if (selection == 10) {
                   cm.displayGuildRanks();
	               cm.dispose();  
            } else if (selection == 15) {
                   cm.getPlayer().getReborns();
				cm.dispose();
			}
		}
	}
}