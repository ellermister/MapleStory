importPackage(net.sf.odinms.client);
var status = 0;
var ttt ="#fUI/Basic/CheckBox/3#";//"+ttt+"//美化

//////////////////////////////////////////////////////////
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
var textz = "欢迎来到#r奶茶冒险岛#k,下面是本服装备商城,希望你喜欢.\r\n#b剩余点券:#r" + cm.getChar().getNX() + "#k#b 点\r\n";

textz += "#b#L13#·购买一张3小时双倍经验卡[#r需要500点卷#b]·#l\r\n";

textz += "#b#L14#·购买3天,全属性+10权精灵吊坠[#r需要3000点券#b]·#l";


cm.sendSimple (textz);    
				
}else if (status == 1) {

var viplevel = cm.getChar().getVip();
if(selection == 1){
cm.openShop( 603);
cm.dispose();

}else if(selection == 2){
cm.openShop( 201);
cm.dispose();

}else if(selection == 3){
cm.openShop( 10008);
cm.dispose();

}else if(selection == 4){
cm.openShop( 10009);
cm.dispose();

}else if(selection == 5){
cm.openShop( 223);
cm.dispose();

}else if(selection == 6){
cm.openShop( 5004);
cm.dispose();

}else if(selection == 7){
cm.openShop( 904);
cm.dispose();

}else if (selection == 8) {
if (cm.getMeso() >= 100000000) {
cm.gainMeso(-100000000);                
cm.gainItem(4031454, 1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose();
} else {
cm.sendOk("#b钱不够呐,童鞋."); 
cm.dispose();
}

}else if (selection == 11) {
cm.sendSimple("#b\r\n#L28#"+ttt+" 购买110级战士装备[#r10万点卷#b]#l  \r\n#L29#"+ttt+" 购买110级飞侠装备[#r10万点卷#b]#l  \r\n#L30#"+ttt+" 购买110级弓手装备[#r10万点卷#b]#l  \r\n#L31#"+ttt+" 购买110级法师装备[#r10万点卷#b]#l");

}else if (selection == 12) {
if (cm.getPlayer().getNX() >= 2000) {
cm.gainNX(-2000);         
cm.gainItem(4031454, 1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose();
} else {
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();
}


} else if (selection == 13) {
if (cm.getNX() >= 500 ) {
if(cm.haveItem(5211047,1,true,false)){
cm.sendOk("#b等你的双倍卡到期在来买吧！");
cm.dispose();
}else{
cm.gainNX(-500);     
var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(5211047); //获得装备的类形
var toDrop = ii.randomizeStats(ii.getEquipById(5211047)).copy(); // 生成一个Equip类 
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 30 * 30); //时间
toDrop.setExpiration(temptime); //给装备时间 
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包	cm.getChar().saveToDB(true);
cm.gainItem(5211047, 1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose();
}
} else {
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();
}



} else if (selection == 14) { 
if (cm.getNX() >= 3000) {
if(cm.haveItem(1122017,1,true,false)){
cm.sendOk("#b你已经有一个精灵吊坠了！");
cm.dispose();
}else{
cm.setNX(-3000);
var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(1122017); //获得装备的类形
var toDrop = ii.randomizeStats(ii.getEquipById(1122017)).copy(); // 生成一个Equip类
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 72 * 60 * 60 * 1000); //时间
toDrop.setExpiration(temptime); //给装备时间
toDrop.setStr(10);
toDrop.setDex(10);
toDrop.setInt(10);
toDrop.setLuk(10);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包		
cm.getChar().saveToDB(true);
cm.sendOk("#b成功花了3000点券购买到 3天,全属性+10精灵吊坠！");
cm.dispose();
}
} else {  
cm.sendOk("#b你的点券不足3000个 无法购买 3天,全属性+10精灵吊坠!");
cm.dispose();
}


}else if  (selection == 13) { 
cm.sendSimple("#b\r\n#L16#"+ttt+" 购买手套攻击卷轴 #l  #L17#"+ttt+" 购买拳套攻击卷轴 #l\r\n#L18#"+ttt+" 购买战枪攻击卷轴 #l  #L19#"+ttt+" 购买双手剑攻卷轴 #l\r\n#L20#"+ttt+" 购买单手剑攻卷轴 #l  #L21#"+ttt+" 购买矛器攻击卷轴 #l\r\n#L22#"+ttt+" 购买短杖魔力卷轴 #l  #L23#"+ttt+" 购买长杖魔力卷轴 #l\r\n#L24#"+ttt+" 购买耳环智力卷轴 #l  #L25#"+ttt+" 购买鞋子跳跃卷轴 #l\r\n#L26#"+ttt+" 购买短剑攻击卷轴 #l  #L27#"+ttt+" 购买弓箭攻击卷轴 #l");
}
}else if  (selection == 16) { 
if (cm.getPlayer().getNX() >= 10000 ) {
cm.gainNX(-10000);
cm.gainItem(2040807,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}

}else if  (selection == 17) { 
if (cm.getPlayer().getNX() >= 10000 ) { 
cm.gainNX(-10000); 
cm.gainItem(2044703,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}

}else if  (selection == 18) { 
if (cm.getPlayer().getNX() >= 10000 ) { 
cm.gainNX(-10000); 
cm.gainItem(2044303,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}

}else if  (selection == 19) { 
if (cm.getPlayer().getNX() >= 10000 ) { 
cm.gainNX(-10000); 
cm.gainItem(2044003,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}

}else if  (selection == 20) { 
if (cm.getPlayer().getNX() >= 10000 ) { 
cm.gainNX(-10000); 
cm.gainItem(2043003,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}


}else if  (selection == 21) { 
if (cm.getPlayer().getNX() >= 10000 ) { 
cm.gainNX(-10000); 
cm.gainItem(2044403,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}


}else if  (selection == 22) { 
if (cm.getPlayer().getNX() >= 10000 ) { 
cm.gainNX(-10000); 
cm.gainItem(2043703,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}



}else if  (selection == 23) { 
if (cm.getPlayer().getNX() >= 10000 ) { 
cm.gainNX(-10000); 
cm.gainItem(2043803,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}


}else if  (selection == 24) { 
if (cm.getPlayer().getNX() >= 10000 ) { 
cm.gainNX(-10000); 
cm.gainItem(2040303,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}


}else if  (selection == 25) { 
if (cm.getPlayer().getNX() >= 10000 ) { 
cm.gainNX(-10000); 
cm.gainItem(2040710,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}


}else if  (selection == 26) { 
if (cm.getPlayer().getNX() >= 10000 ) { 
cm.gainNX(-10000); 
cm.gainItem(2043303,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}

}else if  (selection == 27) { 
if (cm.getPlayer().getNX() >= 10000 ) { 
cm.gainNX(-10000); 
cm.gainItem(2044503,1); 
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}

}else if  (selection == 28) { 
if (cm.getPlayer().getNX() >= 100000 ) { 
cm.gainNX(-100000); 
cm.gainItem(1002551,1); 
cm.gainItem(1052075,1);
cm.gainItem(1072273,1);
cm.gainItem(1082168,1);
cm.gainItem(1402036,1);
cm.gainItem(1432038,1);
cm.gainItem(1032030,1);
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}

}else if  (selection == 29) { 
if (cm.getPlayer().getNX() >= 100000 ) { 
cm.gainNX(-100000); 
cm.gainItem(1002550,1); 
cm.gainItem(1052072,1);
cm.gainItem(1072272,1);
cm.gainItem(1082167,1);
cm.gainItem(1092049,1);
cm.gainItem(1332050,1);
cm.gainItem(1472052,1);
cm.gainItem(1032030,1);
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}

}else if  (selection == 30) { 
if (cm.getPlayer().getNX() >= 100000 ) { 
cm.gainNX(-100000); 
cm.gainItem(1002547,1); 
cm.gainItem(1052071,1);
cm.gainItem(1072269,1);
cm.gainItem(1082163,1);
cm.gainItem(1452044,1);
cm.gainItem(1462039,1);
cm.gainItem(1032030,1);
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}

}else if  (selection == 31) { 
if (cm.getPlayer().getNX() >= 100000 ) { 
cm.gainNX(-100000); 
cm.gainItem(1002773,1); 
cm.gainItem(1052076,1);
cm.gainItem(1082164,1);
cm.gainItem(1072268,1);
cm.gainItem(1382037,1);
cm.gainItem(1032030,1);
cm.sendOk("#b恭喜购买成功."); 
cm.dispose(); 
} else { 
cm.sendOk("#b你没有足够的点卷，请联系客服充值."); 
cm.dispose();   
}









					
}
}
}

