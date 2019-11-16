importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.server.life);
importPackage(java.awt);

var status;
var curMap;
var playerStatus;
var chatState;
var questions = Array("首先给你出一个问题！请仔细听好：作为一名战士，他在1转的时候需要达到的等级是多少，那么请交给我同样数量的通行证。",
			"首先给你出一个问题！ 请仔细听好：作为一名战士，他在1转的时候需要力量的能力值最小是多少点，那么请交给我同样数量的通行证。",
			"首先给你出一个问题！请仔细听好： 作为一名法师，他在1转的时候需要智力的能力值最小是多少点，那么请交给我同样数量的通行证。",
			"首先给你出一个问题！请仔细听好： 作为一名弓箭手，他在1转的时候需要敏捷的能力值最小是多少点，那么请交给我同样数量的通行证。",
			"首先给你出一个问题！请仔细听好： 作为一名飞侠，他在1转的时候需要敏捷的能力值最小是多少点，那么请交给我同样数量的通行证。",
			"首先给你出一个问题！请仔细听好： 所有职业在2转的时候需要达到的等级是多少，那么请交给我同样数量的通行证。");
var qanswers = Array(10, 35, 20, 25, 25, 30);
var party;
var preamble;
var stage2rects = Array(Rectangle(-755,-132,4,218),Rectangle(-721,-340,4,166),
			Rectangle(-586,-326,4,150),Rectangle(-483,-181,4,222));
var stage2combos = Array(Array(0,1,1,1),Array(1,0,1,1),Array(1,1,0,1),Array(1,1,1,0));
var stage3rects = Array(Rectangle(608,-180,140,50),Rectangle(791,-117,140,45),
			Rectangle(958,-180,140,50),Rectangle(876,-238,140,45),
			Rectangle(702,-238,140,45));
var stage3combos = Array(Array(0,0,1,1,1),Array(0,1,0,1,1),Array(0,1,1,0,1),
			Array(0,1,1,1,0),Array(1,0,0,1,1),Array(1,0,1,0,1),
			Array(1,0,1,1,0),Array(1,1,0,0,1),Array(1,1,0,1,0),
			Array(1,1,1,0,0));
var stage4rects = Array(Rectangle(910,-236,35,5),Rectangle(877,-184,35,5),
			Rectangle(946,-184,35,5),Rectangle(845,-132,35,5),
			Rectangle(910,-132,35,5),Rectangle(981,-132,35,5));
var stage4combos = Array(Array(0,0,0,1,1,1),Array(0,0,1,0,1,1),Array(0,0,1,1,0,1),
			Array(0,0,1,1,1,0),Array(0,1,0,0,1,1),Array(0,1,0,1,0,1),
			Array(0,1,0,1,1,0),Array(0,1,1,0,0,1),Array(0,1,1,0,1,0),
			Array(0,1,1,1,0,0),Array(1,0,0,0,1,1),Array(1,0,0,1,0,1),
			Array(1,0,0,1,1,0),Array(1,0,1,0,0,1),Array(1,0,1,0,1,0),
			Array(1,0,1,1,0,0),Array(1,1,0,0,0,1),Array(1,1,0,0,1,0),
			Array(1,1,0,1,0,0),Array(1,1,1,0,0,0));
var eye = 9300002;
var necki = 9300000;
var slime = 9300003;
var monsterIds = Array(eye, eye, eye, 
			necki, necki, necki, necki, necki, necki,
			slime);
var prizeIdScroll = Array(2040502,2040505,2040514,2040517,
			2040802, 2040805,
			2040002, 2040402, 2040602, 2040902,
			2044502, 2044702, 2044602, 2043302,
			2043102, 2043202, 2043002, 2044402,
			2044302, 2044102, 2044202, 2044002);
var prizeIdUse = Array( 2000001, 2000002, 2000003, 2000006,	
			2000004, 2000005, 2001000, 2001001,
			2002006, 2002007, 2002008, 2002010);
var prizeQtyUse = Array(100, 75, 100, 45,
			20, 10, 35, 30,
			10, 10, 10, 10);
var prizeIdEquip = Array(1032000, 1032009, 1032004, 1032005,
			1032006, 1032007, 1032010,
			1032002, 1032008,
			1002026, 1002089, 1002090);
var prizeIdEtc = Array( 4010000, 4010001, 4010002, 4010003,
			4010004, 4010005, 4010006,
			4020000, 4020001, 4020002, 4020003,
			4020004, 4020005, 4020006,
			4020007, 4020007, 4003000);
var prizeQtyEtc = Array(15, 15, 15, 15,
			15, 15, 8,
			15, 15, 15, 15,
			15, 15, 15,
			8, 5, 20);
			

function start() {
	status = -1;
	mapId = cm.getChar().getMapId();
	if (mapId == 103000800)
		curMap = 1;
	else if (mapId == 103000801)
		curMap = 2;
	else if (mapId == 103000802)
		curMap = 3;
	else if (mapId == 103000803)
		curMap = 4;
	else if (mapId == 103000804)
		curMap = 5;
	playerStatus = cm.isLeader();
	preamble = null;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (curMap == 1) {
			if (playerStatus) {
				if (status == 0) {
					var eim = cm.getChar().getEventInstance();
					party = eim.getPlayers();
					preamble = eim.getProperty("leader1stpreamble");
					if (preamble == null) {
						cm.sendNext("您好,欢迎来到#b废弃都市组队修炼#k的第1阶段.看看周围,你会看到鳄鱼走动.当你击败他们时他们会掉落#b证书#,每个组队员都需要在我这里获得相应的问题,并且收集相应答案数量的#b证书#k后找我兑换#b关卡通行证#k\r\n兑换了之后将它交给队长即可完成此次任务!");
						eim.setProperty("leader1stpreamble","done");
						cm.dispose();
					}
					else {
                        			var complete = eim.getProperty(curMap.toString() + "stageclear");
                        			if (complete != null) {
                        				cm.sendNext("请赶快进入下一阶段,传送门已经打开了!");
                        				cm.dispose();
                        			}
                        			else {
							var numpasses = party.size()-1;
							var passes = cm.haveItem(4001008,numpasses);
							var strpasses = "#b" + numpasses.toString() + "张 关卡通行证#k";
							if (!passes) {
								cm.sendNext("对不起,我无法让您通过此关卡,您未得到" + strpasses + "来完成此关卡!\r\n请让你的组队成员接受我的问题并且收集相应答案的#b证书#k再向我兑换#b关卡通行证#k");
								cm.dispose();
							}
							else {
								cm.sendNext("恭喜你和你的组队通过此次任务,那么我要打开通往下一关的大门了噢!");
								clear(1,eim,cm);
                                                                //cm.givePartyItems(4002002,0, party)
								cm.givePartyExp(4500, party);
								cm.gainItem(4001008,-numpasses);
								cm.dispose();
							}
						}
					}
				}
			}
			else {
				var eim = cm.getChar().getEventInstance();
				pstring = "member1stpreamble" + cm.getChar().getId().toString();
				preamble = eim.getProperty(pstring);
				if (status == 0 && preamble == null) {
					var qstring = "member1st" + cm.getChar().getId().toString();
					var question = eim.getProperty(qstring);
					if (question == null) {
						var questionNum = Math.floor(Math.random() * questions.length);
						eim.setProperty(qstring, questionNum.toString());
					}
					cm.sendNext("您需要收集我给你问题中相应数量的#b证书#k来给我兑换#b关卡通行证#k");
					
				}
				else if (status == 0) {
                        		var complete = eim.getProperty(curMap.toString() + "stageclear");
                        		if (complete != null) {
                        			cm.sendNext("请赶快进入下一阶段,传送门已经打开了!");
                        			cm.dispose();
                        		}
                        		else {
						var qstring = "member1st" + cm.getChar().getId().toString();
						var numcoupons = qanswers[parseInt(eim.getProperty(qstring))];
						var qcorr = cm.haveItem(4001007,(numcoupons+1));
						var enough = false;
						if (!qcorr) { 
							qcorr = cm.haveItem(4001007,numcoupons);
							if (qcorr) {
								cm.sendNext("回答正确!这是我给你的#b关卡通行证#k噢,请将它交给你们的#b组队长#k");
								cm.gainItem(4001007,-numcoupons);
								cm.gainItem(4001008,1);
								enough = true;
							}
						}
						if (!enough) {
							cm.sendNext("很抱歉，你数量错误! 请仔细对照问题，再来给我正确数量的通行证吧.");
						}
						cm.dispose();
					}
				}
				else if (status == 1) {
					if (preamble == null) {
						var qstring = "member1st" + cm.getChar().getId().toString();
						var question = parseInt(eim.getProperty(qstring));
						cm.sendNextPrev(questions[question]);
					}
					else {
						cm.dispose();
					}
						
				}
				else if (status == 2) {
					eim.setProperty(pstring,"done");
					cm.dispose();
				}
				else {
					eim.setProperty(pstring,"done");
					cm.dispose();
				}
			}
		}
		
		else if (2 <= curMap && 4 >= curMap) {
			rectanglestages(cm);
		}
		else if (curMap == 5) {
			var eim = cm.getChar().getEventInstance();
			var stage5done = eim.getProperty("5stageclear");
			if (stage5done == null) {
				if (playerStatus) {
					var map = eim.getMapInstance(cm.getChar().getMapId());
					var passes = cm.haveItem(4001008,10);
					if (passes) {
						cm.sendNext("恭喜你和你的组队圆满完成此次修炼任务,如果想要出去,那就再点我一次吧!");
						party = eim.getPlayers();
						cm.gainItem(4001008,-10);
						clear(5,eim,cm);
						
						cm.givePartyExp(6000, party);
	               				cm.dispose();
					}
					else {
						cm.sendNext("你好,欢迎来到#b废弃都市组队修炼#k的最后阶段.\r\n请打败该地图的怪物并且收集到#b10张 关卡通行证#k\r\n收集完成后再来找我就可以完成此次修炼了!");
					}
					cm.dispose();
				}
				else {
					cm.sendNext("你好,欢迎来到#b废弃都市组队修炼#k的最后阶段.\r\n请打败该地图的怪物并且收集到#b10张 关卡通行证#k交给你们的#b组队长#k\r\n收集完成后再让你们的#b组队长#k来找我就可以完成此次修炼了!");
					cm.dispose();
				}
			}
			else {
				if (status == 0) {
					cm.sendNext("你真的想要出去么?希望能再次看到你和你们的组队!");
				}
				if (status == 1) {
					getPrize(eim,cm);
					cm.dispose();
				}
			}
		}
                else {
                        cm.sendNext("副本任务出现问题...请联系管理员维护...");
                        cm.dispose();
                }
	}
}

function clear(stage, eim, cm) {
	eim.setProperty(stage.toString() + "stageclear","true");
	var packetef = MaplePacketCreator.showEffect("quest/party/clear");
	var packetsnd = MaplePacketCreator.playSound("Party1/Clear");
	var packetglow = MaplePacketCreator.environmentChange("gate",2);
	var map = eim.getMapInstance(cm.getChar().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
	map.broadcastMessage(packetglow);
	var mf = eim.getMapFactory();
	map = mf.getMap(103000800 + stage);
	var nextStage = eim.getMapInstance(103000800 + stage);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("kpq" + (stage+1).toString());
	}
	else {
	}
}

function failstage(eim, cm) {
	var packetef = MaplePacketCreator.showEffect("quest/party/wrong_kor");
	var packetsnd = MaplePacketCreator.playSound("Party1/Failed");
	var map = eim.getMapInstance(cm.getChar().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
}

function rectanglestages (cm) {
	var debug = false;
	var eim = cm.getChar().getEventInstance();
	if (curMap == 2) {
		var nthtext = "2th";
		var show = "攀爬到绳子上面,确保三条绳子上有你的成员";
		var curcombo = stage2combos;
		var currect = stage2rects;
		var objset = [0,0,0,0];
	}
	else if (curMap == 3) {
		var nthtext = "3th";
		var show = "跳到到台阶上面,确保三个台阶上有你的成员";
		var curcombo = stage3combos;
		var currect = stage3rects;
		var objset = [0,0,0,0,0];
	}
	else if (curMap == 4) {
		var nthtext = "4th";
		var show = "跳到到箱子上面,确保三个箱子上有你的成员";
		var curcombo = stage4combos;
		var currect = stage4rects;
		var objset = [0,0,0,0,0,0];
	}
        if (playerStatus) {
                if (status == 0) {
                        party = eim.getPlayers();
                        preamble = eim.getProperty("leader" + nthtext + "preamble");
                        if (preamble == null) {
                                cm.sendNext("你好,欢迎来到#b废弃都市组队修炼#k的第"+curMap+"阶段.\r\n请让你的组队成员"+show+",随即组合成答案,然后再点我提交答案!");
                                eim.setProperty("leader" + nthtext + "preamble","done");
                                var sequenceNum = Math.floor(Math.random() * curcombo.length);
                                eim.setProperty("stage" + nthtext + "combo",sequenceNum.toString());
                                cm.dispose();
                        }
                        else {
                        	var complete = eim.getProperty(curMap.toString() + "stageclear");
                        	if (complete != null) {	
                        		var mapClear = curMap.toString() + "stageclear";
                        		eim.setProperty(mapClear,"true");
                        		cm.sendNext("请赶快进入下一阶段,传送门已经打开了!");
                        	}
                        	else { 
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
                        	        if (totplayers == 3 || debug) {
                        	                var combo = curcombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
                        	                var testcombo = true;
                        	                for (i = 0; i < objset.length; i++) {
                        	                	if (combo[i] != objset[i])
                        	                		testcombo = false;
                        	                }
                        	                if (testcombo || debug) {
                        	                        clear(curMap,eim,cm);
cm.setBossLog('FQZD');
cm.givePartyItems(4031456,1, party)
cm.givePartyExp(4000, party);
                        	                        cm.dispose();
                        	                }
                        	                else {
                        	                        failstage(eim,cm);
                        	                        cm.dispose();
                        	                }
                        	        }
                        	        else {
                        	                if (debug) {
                        	               		var outstring = "对象包括:"
                        	               		for (i = 0; i < objset.length; i++) {
                        	               			outstring += "\r\n" + (i+1).toString() + ". " + objset[i].toString();
                        	               		}
                        	                	cm.sendNext(outstring); 
                        	                }
                        	                else
							cm.sendNext("您还没有使你的成员组成答案噢,请让你的组队成员"+show+",随即组合成答案,然后再点我提交答案!");
                        	                
                        	                cm.dispose();
                        	        }
                        	}
                        }
                }
                else {
                	var complete = eim.getProperty(curMap.toString() + "stageclear");
                       	if (complete != null) {	
                		var target = eim.getMapInstance(103000800 + curMap);
				var targetPortal = target.getPortal("st00");
                		cm.getChar().changeMap(target, targetPortal);
                	}
                	cm.dispose();
                }
        }
        else {
        	if (status == 0) {
        	        var complete = eim.getProperty(curMap.toString() + "stageclear");
        	        if (complete != null) {
        	        	cm.sendNext("请赶快进入下一阶段,传送门已经打开了!");
        	        }
        	        else {
        	        	cm.sendNext("请让你们的#b组队长#k来找我吧!");
        	        	cm.dispose();
        	        }
        	}
		else {
                	var complete = eim.getProperty(curMap.toString() + "stageclear");
		       	if (complete != null) {	
				var target = eim.getMapInstance(103000800 + curMap);
				var targetPortal = target.getPortal("st00");
                		cm.getChar().changeMap(target, targetPortal);
			}
                	cm.dispose();
                }
        }
}

function getPrize(eim,cm) {
	var itemSetSel = Math.random();
	var itemSet;
	var itemSetQty;
	var hasQty = false;
	if (itemSetSel < 0.3)
		itemSet = prizeIdScroll;
	else if (itemSetSel < 0.6)
		itemSet = prizeIdEquip;
	else if (itemSetSel < 0.9) {
		itemSet = prizeIdUse;
		itemSetQty = prizeQtyUse;
		hasQty = true;
	}
	else { 
		itemSet = prizeIdEtc;
		itemSetQty = prizeQtyEtc;
		hasQty = true;
	}
	var sel = Math.floor(Math.random()*itemSet.length);
	var qty = 1;
	if (hasQty)
		qty = itemSetQty[sel];
	//cm.gainItem(itemSet[sel],qty);
	var map = eim.getMapInstance(103000805);
        cm.gainItem(4002002,1);
        cm.setboss(1);  
	var portal = map.getPortal("sp");
	cm.getPlayer().changeMap(map,portal);
}