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
			cm.sendSimple(" #你好，请选择你要开通的VIP等级！1RMB=1W初晴币。白金会员VIP要80W初晴币,砖石会员VIP要180W初晴币,皇家会员VIP要300W初晴币.请到网站选择充值平台充值。\r\n 您的冒险币：#r"+ cm.getChar().getMeso() +"元#k\r\n 您的点卷：#r"+ cm.getChar().getNX() +"点#k\r\n 您的初晴币:#r"+ cm.getzb() +"点#k\r\n #r#L1#家族排行榜#l\r\n #k#L2#转生排行榜#l\r\n #g#L3#杀人排行榜#l\r\n #g#L4#被杀排行榜#l \r\n #k#L5#人气排行榜#l \r\n #k#L7#家族贡献排行榜#l#n");
		} else if (status == 1) {
			if (selection == 1) {
			
                   cm.displayGuildRanks();
	               cm.dispose();  
			} else if  (selection == 2) {
			  var a = "当前排名：#b \r\n"; 
            a+=cm.ZSpaiMing();        
            cm.sendOk(a);
            cm.dispose();
            } else if (selection == 3) {
			  var a = "当前排名：#b \r\n"; 
            a+=cm.SRpaiMing();        
            cm.sendOk(a);
            cm.dispose();
            } else if (selection == 4) {
			  var a = "当前排名：#b \r\n"; 
            a+=cm.BSpaiMing();        
            cm.sendOk(a);
            cm.dispose();   
            } else if (selection == 5) {
			  var a = "当前排名：#b \r\n"; 
            a+=cm.RQpaiMing();        
            cm.sendOk(a);
            cm.dispose(); 
            } else if (selection == 6) {
			  var a = "当前排名：#b \r\n"; 
            a+=cm.XFBpaiMing();        
            cm.sendOk(a);
            cm.dispose();
            } else if (selection == 7) {
			  var a = "当前排名：#b \r\n"; 
            a+=cm.GPpaiMing();        
            cm.sendOk(a);
            cm.dispose();
            } else if (selection == 11) {
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
					cm.sendOk("您没有初晴币120W,无法为您开通."); 
					cm.dispose(); 
					}  
					} else if (selection == 11) {
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
					cm.sendOk("您没有初晴币150W,无法为您开通."); 
					cm.dispose(); 
					}  
            } else if (selection == 8) {
                        if(cm.getChar().getVip() == 0) {
            cm.sendOk("对不起！你不是VIP会员无法领取工资!!!！");
		cm.dispose();
            } else if (cm.getBossLog('VIPGZ') >= 1) {
            cm.sendOk("抱歉，尊敬VIP玩家你今天己经领取工资，请明天再来找我吧！");

		cm.dispose();
            } else if(cm.getChar().getVip() == 1) {
            cm.gainMeso(100000000);
			cm.gainItem(5072000,1);//高质地喇叭
			cm.gainItem(5390000,1);
			cm.gainItem(5390001,1);
			cm.gainItem(5390002,1);
			cm.gainItem(4031454,1);//转身圣杯
			cm.gainItem(2000019,50);
            cm.setBossLog('VIPGZ');
	    cm.serverNotice("『黄金会员VIP公告』：【"+ cm.getChar().getName() +"】在VIP那里领取了1亿游戏币、高质地喇叭、炽热情景喇叭、绚烂情景喇叭、爱心情景喇叭（1个）转生币1个、超级药水50个");
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