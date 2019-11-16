importPackage(net.sf.odinms.client);
var status = 0;
var totAp = 0;
var newAp;
var newStr;
var newDex;
var newInt;
var newLuk;
var Strings = Array("","","","","");
var aplist;
var apnamelist = Array(1,2,3,4);//用来排序的数组
var statup;
var p;
var kou = 800;
var kou2 = 800;   //转身后需要扣掉的能力点
var needMeso = 100000000;
var needLevel = 200;
var Skills = Array(1111002,11111001,5121003,5111005,15111002);  //这里设置转身后不保留的技能
function start() {
	statup = new java.util.ArrayList();
	p = cm.c.getPlayer();
  	totAp = p.getRemainingAp() + p.getStr() + p.getDex() + p.getInt() + p.getLuk();  //总能力点	
  	newStr =  p.getStr();
	newDex =  p.getDex();	
	newInt =  p.getInt();
	newLuk =  p.getLuk();
	aplist= Array(p.getStr(), p.getDex(), p.getInt(), p.getLuk()); 	
	if(p.getVip() < 2){
		kou = 800;
		kou2 = 800;
	}else if(p.getVip() == 2){
		kou = 750;
		kou2 = 750;
	}else if(p.getVip() == 3){
		kou = 700;
		kou2 = 700;	
	}else if(p.getVip() == 4){
		kou = 650;
		kou2 = 650;
         }else if(p.getVip() == 5){
		kou = 600;
		kou2 = 600;
}else if(p.getVip() >= 6){
		kou = 550;
		kou2 = 550;
	}
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {//ExitChat
		cm.dispose();
  }else if (mode == 0){//No
		cm.sendOk("好的, 请告诉我你确定需要 #b投胎转世#k.");
		cm.dispose();
	}else{            //Regular Talk
		if (mode == 1)
    status++;
    else
    status--;    
    if (status == 0) {		
				if(cm.getChar().getVip() <= 0){
					var vipstr = "普通玩家";					
				}else if(cm.getChar().getVip() == 1){
					var vipstr = " VIP玩家";	
				}else if(cm.getChar().getVip() == 2){
					var vipstr = " 白金会员②";					
				}else if(cm.getChar().getVip() == 3){
					var vipstr = " 砖石会员③";
                                }else if(cm.getChar().getVip() == 4){
					var vipstr = " 皇家会员④";
                                }else if(cm.getChar().getVip() == 5){
					var vipstr = " 蝙蝠vIp⑤";						
				}else{
					var vipstr = " 蝙蝠vIp⑥";					
				}
if(cm.getChar().getReborns() <= 50){
					var id = "2340000";var ids = "2";				
				}else if(cm.getChar().getReborns() >=51&&cm.getChar().getReborns() <= 100){
					var id = "2340000";var ids = "4";				
				}else if(cm.getChar().getReborns() >=101&&cm.getChar().getReborns() <= 200){
					var id = "4031065";var ids = "1";					
				}else if(cm.getChar().getReborns() >= 201){
					var id = "4031065";var ids = "2";			
				}else{
					var id = "4031065";var ids = "0";					
				}
			cm.sendOk("Hi~.[#h #]#k.当等级达到Lv.200 的时候,你可以进行转生.\r\n\r\n转生需要:#b200,000,000#k金币(2E)和#b1个圣杯#k\r\n#v4031454##r#b(活动,副本)获得.#k\r\n\r\n转生后您将成为#b1#k级的 #b新手#k.\r\n由于您是#r"+vipstr+"#k，将扣除属性点#b"+kou2+"#k点.\r\n#b确定要进行#r转生#b吗?"); 		
		}else if (status == 1) {
			if(cm.getChar().getLevel() < needLevel){
      	cm.sendOk("很抱歉，您需要" + needLevel + "级，才可以投胎转世.");
	      cm.dispose();
      }else if (totAp < (kou + 16)){ 
	    	cm.sendOk("您对能力值出现异常现象!不符合飞升的条件!"); 
	      cm.dispose(); 
      }else if (cm.haveItem(4031454) == false){ 
	      cm.sendOk("你没有带来#b圣杯#k "); 
	      cm.dispose(); 
      }else if (cm.getMeso() < needMeso) {
	    	cm.sendOk("你没有2E金币,我不能帮你的忙哦."); 
	      cm.dispose();
      }else{	
      	var temp;
				for (var j = 0; j < 3; j++){   //有名的冒气泡排顺法。主要用于排列数组apnamelist里的数据。实现从大到小排列能力值。
	 				for (var i = 0; i < 3 - j; i++){
						if(aplist[i] < aplist[i+1]){
							temp = aplist[i];
							aplist[i] = aplist[i+1];
							aplist[i+1] = temp;				
							temp = apnamelist[i];
							apnamelist[i] = apnamelist[i+1];
							apnamelist[i+1] = temp;
						}
	  			}
			 	} 
      	if(p.getRemainingAp() >= kou){
			 		newAp = p.getRemainingAp() - kou;
					Strings[0] = " AP值将扣去 #r" + kou + " #k点";	
					kou = 0;
				}else{
					newAp =0;
					kou = kou - p.getRemainingAp();
					if (p.getRemainingAp() > 0){
					Strings[0] = " AP值将扣去 #r" + p.getRemainingAp() + " #k点";
					}  
				}
				for(x = 0; x < 4; x++){
					if(kou > 0){
						if(apnamelist[x] == 1){					
							if(p.getStr() - 4 >= kou){
								newStr = p.getStr() - kou;
								Strings[1] = " 力量将扣去 #r" + kou + "#k 点";
								kou = 0;			
							}else{
								newStr = 4;
								kou = kou - (p.getStr() - 4);
								Strings[1] = " 力量将扣去 #r" + (p.getStr() - 4) + "#k 点";			
							}
						}else if(apnamelist[x] == 2){
							if(p.getDex() - 4 >= kou){
								newDex = p.getDex() - kou;
								Strings[2] = " 敏捷将扣去 #r" + kou + "#k 点";			
								kou = 0;
							}else{
								newDex = 4;
								kou = kou - (p.getDex() - 4);
								Strings[2] = " 敏捷将扣去 #r" + (p.getDex() - 4) + "#k 点";			
							}
						}else if(apnamelist[x] == 3){
							if(p.getInt() - 4 >= kou){
								newInt = p.getInt() - kou;
								Strings[3] = " 智力将扣去 #r" + kou + "#k 点";
								kou = 0;
							}else{
								newInt = 4;
								kou = kou - (p.getInt() - 4);
								Strings[3] = " 智力将扣去 #r" + (p.getInt() - 4) + "#k 点";
							}
						}else if(apnamelist[x] == 4){
							if(p.getLuk() - 4 >= kou){
								newLuk = p.getLuk() - kou;
								Strings[4] = " 运气将扣去 #r" + kou + "#k 点";
								kou = 0;
							}else{
								newInt = 4;
								kou = kou - (p.getLuk() - 4);
								Strings[4] = " 运气将扣去 #r" + (p.getLuk() - 4) + "#k 点";
							}
						}
						if (kou < 1) break;
					}	
				}
			var St = "";
			for(s = 0; s < 5; s++){
				if(Strings[s] != "") St = St + Strings[s] + "\r\n";
			}
	    cm.sendOk("#e#b您做得非常好,由于您是VIP#r" + cm.getChar().getVip() + "\r\n#b您飞升后能力值会扣除#r" + kou2 + "#b点!扣除详细情况如下!#k\r\n\r\n" + St + "#n");
	    }
      }else if (status == 2){
					cm.sendSimple("恭喜你修炼有成. 你想飞升成为什么职业呢?#b\r\n#L0#新手#l\r\n#L1#战童#l\r\n#L2#初心者#l#k");
			}else if (status == 3){	      
				if(cm.getChar().getReborns() <= 10 && cm.getChar().getReborns() >=0){
					var xx = "筑基期修士";					
				}else if(cm.getChar().getReborns() <= 30 && cm.getChar().getReborns() >=11){
					var xx = "开光期修士";					
				}else if(cm.getChar().getReborns() <= 60 && cm.getChar().getReborns() >=31){
					var xx = "胎息期修士";					
				}else if(cm.getChar().getReborns() <= 80 && cm.getChar().getReborns() >=61){
					var xx = "辟谷期修士";					
				}else if(cm.getChar().getReborns() <= 100 && cm.getChar().getReborns() >=81){
					var xx = "金丹期修士";
				}else if(cm.getChar().getReborns() <= 150 && cm.getChar().getReborns() >=101){
					var xx = "元婴期修士";	
				}else if(cm.getChar().getReborns() <= 250 && cm.getChar().getReborns() >=151){
					var xx = "分神期修士";	
				}else if(cm.getChar().getReborns() <= 400 && cm.getChar().getReborns() >=251){
					var xx = "合体期修士";	
				}else if(cm.getChar().getReborns() <= 600 && cm.getChar().getReborns() >=401){
					var xx = "大乘期修士";	
				}else if(cm.getChar().getReborns() >= 601){
					var xx = "渡劫期大圆满隐士";					
				}
				if(selection == 0)  {						
		    	cm.changeJob(net.sf.odinms.client.MapleJob.BEGINNER);
        }
				if(selection == 1){	
	        cm.changeJob(net.sf.odinms.client.MapleJob.Ares);
        }
				if(selection == 2){			
        	cm.changeJob(net.sf.odinms.client.MapleJob.KNIGHT);        	
	      }
				cm.gainMeso(-needMeso);
	      cm.gainItem(4031454,-1);
	      for(var n = 0; n < Skills.length; n++){
	      	cm.getPlayer().changeSkillLevel(SkillFactory.getSkill(Skills[n]),0,0); //清除一些不保留的技能
	      } 
	      cm.gainReborns(1);
				//cm.unequipEverything(); //脱装备语句，需要的去掉前面的“//”
        cm.sendNext("#e#b您做得非常好#k, 您已经成功飞升了,您现在的属性点情况如下：\r\n" + "   力量: #r" + newStr + " #k点" + "\r\n   敏捷: #r" + newDex + " #k点" + "\r\n   智力: #r" + newInt + " #k点" + "\r\n   运气: #r" + newLuk + " #k点" + "\r\n   未分配的AP: #r" + newAp + " #k点");
        p.setRemainingAp(newAp);
				p.setStr(newStr);
				p.setDex(newDex);
				p.setInt(newInt);
				p.setLuk(newLuk);
				p.setLevel(1);		
				statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.STR, java.lang.Integer.valueOf(newStr)));
				statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.DEX, java.lang.Integer.valueOf(newDex)));
				statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.LUK, java.lang.Integer.valueOf(newLuk)));
				statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.INT, java.lang.Integer.valueOf(newInt)));
				statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.LEVEL, java.lang.Integer.valueOf(1)));
	      statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.EXP, java.lang.Integer.valueOf(1))); 
        statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.AVAILABLEAP, java.lang.Integer.valueOf(newAp)));
				p.getClient().getSession().write (net.sf.odinms.tools.MaplePacketCreator.updatePlayerStats(statup));

if(cm.getChar().getReborns() <= 50){
					var id = "2340000";var ids = "2";				
				}else if(cm.getChar().getReborns() >=51&&cm.getChar().getReborns() <= 100){
					var id = "2340000";var ids = "4";				
				}else if(cm.getChar().getReborns() >=101&&cm.getChar().getReborns() <= 200){
					var id = "4031065";var ids = "1";					
				}else if(cm.getChar().getReborns() >= 201){
					var id = "4031065";var ids = "2";			
				}else{
					var id = "4031065";var ids = "0";					
				}
                         
				cm.getPlayer().saveToDB(true);  //保存
				cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),"稀饭管理员" + " : " + "恭喜 [" + cm.getPlayer().getName() + "] 第 " + cm.getChar().getReborns() + " 次转生,吼吼 O(∩_∩)O.",true).getBytes());
 				cm.dispose();           
		}
  }
}
 
    
