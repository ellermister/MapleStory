/*
      玩家全功能NPC2
      乐 章编写
      QQ：237253995.
      冒冒岛技术小组所有 
*/
importPackage(net.sf.odinms.client); 
importPackage(net.sf.odinms.tools); 
importPackage(net.sf.odinms.server);

/*时限强化系统介绍·
*赋予装备时间值,并作出多种应用.
*1.装备可以选择<3天权,属性增加5%~30%>和<10天权,属性增加10%>. 该功能每天限用3次.免费.
*  使用后装备锁定,不能使用解锁NPC.模式下装备不能参与任何强化升级.[除加卷外.]
*  使用后装备属性提高,时间到期后下线装备消失.
*2.延长装备使用期限[针对时间值装备]:4种模式,每种模式可设置具体数值.
*3.武器增值计划:通过内设每日任务,夺旗任务,可以加强装备的属性值.
*4.装备出售设定: 对于还有使用期的装备,开设装备回收系统,  根据判断 装备的各项能力值和攻击力,可选择3种回收方案。
*/

//====================参数设置==================

var name = "公益冒险岛";//服务器名字.

var v1_laba = 1;//V1每天使用喇叭次数
var v2_laba = 2;//V2每天使用喇叭次数
var v3_laba = 3;//V3每天使用喇叭次数
var v4_laba = 5;//V4每天使用喇叭次数
var v0_laba = 0;
var Gm_laba = 99;

var qflaba1 = 1;//刷全服喇叭需要的元宝1
var qflaba2 = 1;//刷全服喇叭需要的元宝2
var qflaba3 = 1;//刷全服喇叭需要的元宝3

var splaba1 = 1;//刷全服喇叭需要的元宝1
var splaba2 = 2;//刷喇叭需要的元宝2
var splaba3 = 1;//刷全服喇叭需要的元宝3
var splaba4 = 1;//刷全服喇叭需要的元宝4


//===========限时装备选项================
var yuezhangzb = 20;//花费元宝提升装备使用天数的钱

var timezb = 30;//上面的天数>

var yuezhangcsb = 50;//花费慈善提升装备使用天数的钱

var timecsb = 10;//上面的天数>

var yuezhangNX = 100000;//花费点卷提升装备使用天数的钱

var timeNX = 10;//上面的天数>

var yuezhangmoney = 15;//花费冒险提升装备使用天数的钱 【亿】

var timemoney = 5;//上面的天数>


var viplaba = Array(Array(1,5120000),
                    Array(1,5120001),
                    Array(1,5120002),
                    Array(1,5120003),
                    Array(1,5120004), //V1  5

                    Array(1,5120005),
                    Array(1,5120006),  //V2  7
 
                    Array(1,5120007),
                    Array(1,5120008), //V3  9

                    Array(1,5120009),
                    Array(1,5120010),
                    Array(1,5120012),
                    Array(1,5120015));	//喇叭类型 13

//=====================以上============================================
//装备时间计算:1 * 24 * 60 * 60 * 1000 =86400000  毫秒 =1天

var trues = 0;
var viplabas = -1;
var choose = -1;
var choose1 = -1;
var choose2 = -1;
var choose3 = -1;
var typedd=1;
var chanceo=(Math.floor(Math.random()*8)+1);1-9
var shuxing1= 0;
						
var ttt ="#fUI/Basic/CheckBox/3#";//"+ttt+"//美化
var ttt1 ="#fUI/Basic/CheckBox/1#";//"+ttt1+"//美化
var status = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
           cm.sendOk("随时为你服务.");
		cm.dispose();
	} else {
          if (mode == 0) {
            cm.sendOk("随时为你服务.");
            cm.dispose();
            return;
        }
		if (mode == 0 && status == 0 && status == 1 && status == 2 && status == 3 && status == 4 && status == 5 ) {

			cm.dispose();
			
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
var text = " 哟,岛民们,我是#b"+name+"#k最强大的喇叭供应商。\r\n\r\n 哈哈.要不要来邪恶一下?(⊙o⊙).\r\n\r\n";
//text += "#b┈┈┈┈┈┈┈━═☆会员系统☆═━┈┈┈┈┈┈┈#n#l\r\n";

//text += "#L1##n#b"+ttt1+"#d 进入会员地图#k#r#n#l    "; 

//text += "#L2##n#b"+ttt+"#d 会员活动[会员专属]#k#r#n#l  "; 

//text += "\r\n\r\n";

//text += "#L5##n#b"+ttt+"#d 购买会员链接#k#r#n#l    "; 

text += "#L3##n#b#d【会员免费喇叭】#k#r#n#l\r\n";

//text += "\r\n\r\n";


//text += "#k┈┈┈┈┈┈┈━═☆元宝商店系统☆═━┈┈┈┈┈┈┈#n#l\r\n";

text += "#L4##n#b#b【全服无敌喊话】#r#n#l\r\n"; 

text += "#L6##n#b#b【刷屏无敌喊话】#r#n#l  ";

//text += "#L7##n#b"+ttt+"#r 袋子换永恒套#r#n#l  "; 

//text += "\r\n\r\n";

//text += "#L8##n#b"+ttt+"#r 激活技能#r#n#l  "; 

//text += "#L9##n#b"+ttt+"#r 道场积分换东西#r#n#l  ";

//text += "\r\n\r\n";

//text += "#L10##n#b"+ttt+"#r 大吉纸条换必成卷#r#n#l  ";  

//text += "#L11##n#b"+ttt+"#r 能量豆换东西#r#n#l  ";

//text += "\r\n\r\n";

//text += "#L12##n#b"+ttt+"#r 属性点换东西#r#n#l  ";



			cm.sendSimple(text);



			} else if (status == 1) {
			                             if (selection == 1) {
    cm.openNpc( 2133001);	
}
			                             if (selection == 2) {
			cm.sendOk("会员活动项,暂时无内容.");
					cm.dispose();	
}           
			                             if (selection == 3) {//会员喇叭
  var  ttz = "#b嘿,淫荡的一天又开始了,发点强悍的?#k\r\n";

       ttz += "管理员特别为会员们准备了#b超级无敌大喇叭功能#k,来试试吧.\r\n\r\n"

       ttz +=  "#rvIp②#k玩家,每天可以使用#r1#k次.\r\n#rvIp③#k玩家,每天可以使用#r2#k次.\r\n#rvIp④#k玩家,每天可以使用#r3#k次.\r\n#rvIp⑤#k玩家,每天可以使用#r5#k次.";
			cm.sendYesNo(ttz);
test=1;
} 
                                                     if (selection == 4) {//全服喊话
  var  ttz1 = "#b想一次性发出多个喇叭吗?#k\r\n";

       ttz1 += "管理员特别准备了#b全服喊话#k项目,来试试吧."

			cm.sendYesNo(ttz1);
test=10;
} 
                                                     if (selection == 5) {
			cm.openNpc( 9120106);
}
		                                     if (selection == 6) {//全服喊话
  var  ttz2 = "#b想一次性发出多个喇叭吗?#k\r\n";

       ttz2 += "管理员特别准备了#b刷屏喊话#k项目,来试试吧."

			cm.sendYesNo(ttz2);
test=100;
}                                                     
                                                     if (selection == 7) {
			cm.openNpc( 9000021);

}

                                                     if (selection == 8) {
			cm.openNpc( 1022100);
}
                                                     if (selection == 9) {
			cm.openNpc( 9310060);
}
                                                     if (selection == 10) {
			cm.openNpc( 1032114);
}

                                                     if (selection == 11) {
			cm.openNpc( 9209103);
}

                                                     if (selection == 12) {
			cm.openNpc( 9010002);
}

                                                     if (selection == 13) {
	var  ssqh = "#b时限强化就是:#k\r\n\r\n";

       ssqh += ttt+"  将原有的装备#b附加时间值#k,同时#b属性有增长#k\r\n\r\n";

       ssqh += ttt+"  通过#b指定任务#k或者#b时间#k可以将装备属性升级.#k.\r\n\r\n";

       ssqh += ttt+"  当装备时间到期时,装备将消失.#k\r\n\r\n";

       ssqh += ttt+"  限时装备将不能使用除了#b加卷#k以外的强化方式.#k";

			cm.sendYesNo(ssqh);
test=200;
}

                                                     if (selection == 14) {
	var  ssqh = "#b目前需要设置的功能为:#k\r\n\r\n";

       ssqh += ttt+"  点自由NPC设置#k\r\n\r\n"

       ssqh += "                                  #e#b  是否进入设置?#k";

			cm.sendYesNo(ssqh);
test=201;
}
                                                     if (selection == 15) {
	var  ssqh = "#b目前需要设置的功能为:#k\r\n\r\n";

       ssqh += ttt+"  会员自动拣取功能#k\r\n\r\n"

       ssqh += "                                  #e#b  是否进入设置?#k";

			cm.sendYesNo(ssqh);
test=202;
}
                                                        if (selection == 16) {
	var  ssqh = "#b目前需要设置的功能为:#k\r\n\r\n";

       ssqh += ttt+"  暂时无需要设置内容.#k\r\n\r\n"

    //   ssqh += "                                  #e#b  是否进入设置?#k";

			cm.sendOk(ssqh);
cm.dispose();

}                                                  
//-----------------------------------------------------
                   }  else if (status == 2) {
                                                     if (test == 1) {
     var ttm = "邪恶的我为你检测您的会员等级!.\r\n\r\n";

 if(cm.getChar().getVip() < 2) {
            
            //ttm += "#dGM同学#k:\r\n\r\n";
 
            ttm += "您不可以使用喇叭。";
 
            //ttm += "#r可以使用如下喇叭:\r\n";

            //ttm += "   #i5120000#   #i5120001#   #i5120002#   #i5120003#   #i5120004#\r\n";
 
           // ttm += "   #i5120005#   #i5120006#   #i5120009#   #i5120008#\r\n";

       //     ttm += "   #i5120009#   #i5120010#   #i5120012#   #i5120015#"; 


                                               }else if(cm.getChar().getGMLevel() != 0) {
            
            ttm += "#dGM同学#k:\r\n\r\n";
 
            ttm += "您可以使用无限次,已使用#r " + cm.getBossLog('viplaba') + "次. \r\n\r\n";
 
            ttm += "#r可以使用如下喇叭:\r\n";

            ttm += "   #i5120000#   #i5120001#   #i5120002#   #i5120003#   #i5120004#\r\n";
 
            ttm += "   #i5120005#   #i5120006#   #i5120009#   #i5120008#\r\n";

            ttm += "   #i5120009#   #i5120010#   #i5120012#   #i5120015#"; 


                                               }else if(cm.getChar().getVip() == 2) {
            
            ttm += "#d2星会员玩家#k:\r\n\r\n";
 
            ttm += "您可以使用的喇叭数量为: #r"+v1_laba+"#k次,已使用#r " + cm.getBossLog('viplaba') + "次. \r\n\r\n";
 
            ttm += "#r可以使用如下喇叭:\r\n";

            ttm += "   #i5120000#   #i5120001#   #i5120002#   #i5120003#   #i5120004#\r\n";
 
            ttm += "#r未获取使用如下喇叭:\r\n";

            ttm += "   #i5120005#   #i5120006#   #i5120009#   #i5120008#\r\n";

            ttm += "   #i5120009#   #i5120010#   #i5120012#   #i5120015#"; 


                                               }else if(cm.getChar().getVip() == 3) {


            ttm += "#d3星会员玩家#k:\r\n\r\n";
 
            ttm += "您可以使用的喇叭数量为: #r"+v2_laba+"#k次,已使用#r " + cm.getBossLog('viplaba') + "次. \r\n\r\n";
 
            ttm += "#r可以使用如下喇叭:\r\n";

            ttm += "   #i5120000#   #i5120001#   #i5120002#   #i5120003#\r\n";

            ttm += "   #i5120004#   #i5120005#      #i5120006#\r\n";
 
            ttm += "#r未获取使用如下喇叭:\r\n";

            ttm += "   #i5120007#   #i5120008#   #i5120009#\r\n";

            ttm += "   i5120010#   #i5120012#   #i5120015#"; 

                                               }else if(cm.getChar().getVip() == 4) {


            ttm += "#d4星会员玩家#k:\r\n\r\n";
 
            ttm += "您可以使用的喇叭数量为: #r"+v3_laba+"#k次,已使用#r " + cm.getBossLog('viplaba') + "次. \r\n\r\n";
 
            ttm += "#r可以使用如下喇叭:\r\n";

            ttm += "   #i5120000#   #i5120001#   #i5120002#   #i5120003#   #i5120004#\r\n";

            ttm += "   #i5120005#   #i5120006#   #i5120007#   #i5120008#\r\n";
 
            ttm += "#r未获取使用如下喇叭:\r\n";

            ttm += "   #i5120009#   i5120010#   #i5120012#   #i5120015#"; 


                                               }else if(cm.getChar().getVip() == 5) {


            ttm += "#d荣誉会员玩家#k:\r\n\r\n";
 
            ttm += "您可以使用的喇叭数量为: #r"+v4_laba+"#k次,已使用#r " + cm.getBossLog('viplaba') + "次. \r\n\r\n";
 
            ttm += "#r可以使用如下喇叭:\r\n";

           ttm += "   #i5120000#   #i5120001#   #i5120002#   #i5120003#   #i5120004#\r\n";

            ttm += "   #i5120005#   #i5120006#   #i5120007#   #i5120008#   #i5120009#\r\n";

            ttm += "   #i5120010#   #i5120012#   #i5120015#"; 
                                              
}
            ttm += "\r\n\r\n#b   请继续选择";

            cm.sendNext(ttm);   
            test=2;


}


                                             if (test == 10) {
              var ttm3 = "请继续选择:\r\n";

            ttm3 += "#b#L0#"+ttt+" 红色公告[显示3行]\r\n\r\n";

            ttm3 += "#b#L1#"+ttt+" 白骨公告[显示3行]\r\n\r\n";
                                              
            ttm3 += "#r#L2#"+ttt+" 红心公告[显示3行]\r\n\r\n";

       //     ttm3 += "#r#L3#"+ttt+" 刷出10排红色公告\r\n\r\n";

        //    ttm3 += "#r#L4#"+ttt+" 刷出 5排红色公告\r\n\r\n";

            cm.sendSimple(ttm3);  
    test=11;
}

                                             if (test == 100) {
        var ttm3 = "请继续选择:\r\n";

            ttm3 += "#b#L3#"+ttt+" 刷出 5排蓝色公告\r\n\r\n";

            ttm3 += "#b#L4#"+ttt+" 刷出10排蓝色公告\r\n\r\n";
                                              
            ttm3 += "#r#L5#"+ttt+" 刷出 5排红色公告\r\n\r\n";

            ttm3 += "#r#L6#"+ttt+" 刷出10排红色公告\r\n\r\n";

           // ttm3 += "#r#L3#"+ttt+" 刷出 5排红色公告\r\n\r\n";

          //  ttm3 += "#r#L4#"+ttt+" 刷出10排红色公告\r\n\r\n";

            cm.sendSimple(ttm3);  
    test=11;
}

                                             if (test == 200) {
if(cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1) ==null) {
            cm.sendOk("请将强化物品放在#b第一格#k位置,才能继续.");
            cm.dispose();
} else if(cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).getExpiration() ==null) {
var i = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
        var ttm3 = "当前装备: #v"+i.getItemId()+"#. 到期时间:#b永久#k.\r\n";

            ttm3 += "#b#L0#"+ttt+" 转换成时限装备#l\r\n\r\n";

            ttm3 += "   #r必须先转换成时限装备,才能进行进一步操作.";

            cm.sendSimple(ttm3);  
    test=110;	

} else {
var i = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
        var ttm3 = "当前装备:#v"+i.getItemId()+"#,到期时间:#b"+i.getExpiration()+"#k.\r\n\r\n";
            ttm3 += "#b#L1#"+ttt+" 延长装备时间限制\r\n\r\n";

            ttm3 += "#b#L2#"+ttt+" 极品武器增值计划#rHOT\r\n\r\n";
                                              
            ttm3 += "#d#L3#"+ttt+" 时限装备低价出售\r\n\r\n";



            cm.sendSimple(ttm3);  
    test=110;
}}
                                             if (test == 201) {
        var ttm3 = "#b请选择方案:#k.\r\n\r\n";

            ttm3 += "#b#L0#"+ttt+" 点击打开NPC#n\r\n\r\n";

            ttm3 += "#b#L1#"+ttt+" 点击直接进入自由市场.#n\r\n\r\n";


            cm.sendSimple(ttm3); test=111; }


if (test == 202) {
if (cm.getPlayer().getVip() <= 2){
cm.sendOk("改功能只对于#r三星会员,至尊会员#k开放.")
cm.dispose();}
else if (cm.getPlayer().getRw1() == 1)
{
cm.sendSimple("#b你好，亲爱的游戏玩家，本服务是为#rVIP3以上的会员#b提供打怪掉落冒险自动捡取服务即：\r\n#r（可以把打怪得到的金钱自动存入背包）\r\n#d你当前的金钱自动捡取状态为：#r开启\r\n#e#k[注意]:开启后使用全屏技能,可能卡掉.#n\r\n\r\n#L0#点击我关闭自动捡取金钱服务#l");
test=112;
}
else if (cm.getPlayer().getRw1() == 0)
{
cm.sendSimple("#b你好，亲爱的游戏玩家，本服务是为#rVIP3以上的会员#b提供打怪掉落冒险自动捡取服务即：\r\n#r（可以把打怪得到的金钱自动存入背包）\r\n#d你当前的金钱自动捡取状态为：#r关闭\r\n#e#k[注意]:开启后使用全屏技能,可能卡掉.#n\r\n#L1#点击我开启自动捡取金钱服务#l");
test=112;
}}
//-----------------------------------------------------
                                                  }else if (status == 3) {
                                                     if (test == 2) {
     
          var ttzz = "请继续选择一个喇叭类型:\r\n\r\n";

                                                  if(cm.getChar().getGMLevel() != 0) {
              for (var i = 0; i < 13; i++) {
				ttzz += "#L" + i + "##v" + viplaba[i][1] + "#  #b[#z" + viplaba[i][1] + "#]#l\r\n";}

cm.sendSimple(ttzz);
                        // choose = selection;

            
                          tures = 1;

                                                  }else if(cm.getChar().getVip() == 1) {
              for (var i = 0; i < 5; i++) {
				ttzz += "#L" + i + "##v" + viplaba[i][1] + "#  #b[#z" + viplaba[i][1] + "#]#l\r\n";}

cm.sendSimple(ttzz);
                        // choose = selection;

            
                          tures = 1;

                                         }else if(cm.getChar().getVip() == 2) {
              for (var i = 0; i < 7; i++) {
				ttzz += "#L" + i + "##v" + viplaba[i][1] + "#  #b[#z" + viplaba[i][1] + "#]#l\r\n";}

cm.sendSimple(ttzz);
                        // choose = selection;

            
                          tures = 1;

                                         }else if(cm.getChar().getVip() == 3) {
              for (var i = 0; i < 9; i++) {
				ttzz += "#L" + i + "##v" + viplaba[i][1] + "#  #b[#z" + viplaba[i][1] + "#]#l\r\n";}

cm.sendSimple(ttzz);
                        // choose = selection;

            
                          tures = 1;

                                         }else if(cm.getChar().getVip() == 4) {
              for (var i = 0; i < 13; i++) {
				ttzz += "#L" + i + "##v" + viplaba[i][1] + "#  #b[#z" + viplaba[i][1] + "#]#l\r\n";}

                        cm.sendSimple(ttzz);
                        // choose = selection;

            
                          tures = 1;

}
}
                                 if (test == 11) {
           if(selection==0){
cm.sendGetText("#k[使用需要消耗#r "+qflaba1+"#k 元宝][保证文字在20字以内]!");  
tures = 12;
     }else if(selection==1){
cm.sendGetText("#k[使用需要消耗#r "+qflaba2+"#k 元宝][保证文字在20字以内]!");  
tures = 13;
     }else if(selection==2){
cm.sendGetText("#k[使用需要消耗#r "+qflaba3+"#k 元宝][保证文字在20字以内]!");  
tures = 14;
     }else if(selection==3){
cm.sendGetText("#k[使用需要消耗#r "+splaba1+"#k 元宝][保证文字在20字以内]!");  
tures = 15;
     }else if(selection==4){
cm.sendGetText("#k[使用需要消耗#r "+splaba2+"#k 元宝][保证文字在20字以内]!");  
tures = 16;
     }else if(selection==5){
cm.sendGetText("#k[使用需要消耗#r "+splaba3+"#k 元宝][保证文字在20字以内]!");  
tures = 17;
     }else if(selection==6){
cm.sendGetText("#k[使用需要消耗#r "+splaba4+"#k 元宝][保证文字在20字以内]!");  
tures = 18;

}
}

                             if (test == 110) {
                if(selection==0){

        var ttm3 = "#b#L0#"+ttt+" 转换时限3天权[属性全面提升#d5%~30%]\r\n\r\n";

            ttm3 += "#d#L1#"+ttt+" 转换时限10天权[属性全面提升10%.]#l\r\n\r\n";

            ttm3 += "   #k提示：属性值在10点以上,才能生效,所以一般装备不要使用该功能.";

            cm.sendSimple(ttm3);  

            tures=111;

           }else if(selection==1){

        var ttm3 = "#L2#"+ttt+" #k使用元宝#r"+yuezhangzb+"#k个.延长至#r"+timezb+"天#k使用天数.\r\n\r\n";

             ttm3 += "#L3#"+ttt+" #k使用慈善#r"+yuezhangcsb+"#k个.延长至#r"+timecsb+"天#k使用天数.\r\n\r\n";

             ttm3 += "#L4#"+ttt+" #k使用抵用卷#r"+yuezhangNX+"#k点.延长至#r"+timeNX+"天#k使用天数.\r\n\r\n";
             ttm3 += "#L5#"+ttt+" #k使用冒险#r"+yuezhangmoney+"#k亿.延长至#r"+timemoney+"天#k使用天数.\r\n\r\n";
            cm.sendSimple(ttm3);  
            tures=111;


           }else if(selection==2){

        var ttm3 = "#L6#"+ttt+" #e#b登陆好礼 #n#k每天登陆,#r直接免费#k升级武器属性!.\r\n\r\n";

             ttm3 += "#L7#"+ttt+" #e#b任务强化 #n#k隐藏任务让你武器属性升级.\r\n\r\n";

            cm.sendSimple(ttm3);  
            tures=111;

           }else if(selection==3){
  var text = "限时装备不能参与其他强化/出售,所以管理员设置了这个项目.\r\n\r\n";

  text += "装备回收计算介绍:\r\n";

  text += "   限时装备属性越高,卖出获得的回馈越多,回馈可分为#b元宝#k,#b慈善#k,#b积分#k,#b点卷#k4种回馈方式.\r\n   通过限时强化系统,可以提升装备综合属性,当装备剩余时间不多时,可以使用该功能.";

  text += "\r\n\r\n"; 

  text += "回收计算算法:\r\n\r\n";

  text += "#b回馈#b元宝#k:\r\n　 #d[综合属性/40]+[[装备攻击力-100(不足不算)]/10]+装备成功次数 #k[限制单项最高反馈:#r100#k元宝]\r\n";

  text += "#b回馈#b慈善#k:\r\n　 #d[综合属性/40]+[[装备攻击力-100(不足不算)]/10]+装备成功次数 #k[限制单项最高反馈:#r200#k慈善]\r\n";
  text += "#b回馈#b积分#k:\r\n　 #d[综合属性/40]+[[装备攻击力-100(不足不算)]/10]+装备成功次数 #k[限制单项最高反馈:#r200#k慈善]\r\n";
  text += "#b回馈#b抵用卷#k:\r\n　 #d[综合属性*100]+[[装备攻击力-100(不足不算)]*200]+装备成功次数 #k[限制单项最高反馈:#r20万#k抵用卷]\r\n";
cm.sendNext(text);
  tures=112;
}

}


                             if (test == 111) {
   if(selection==0){
                cm.setRw11(0);
                cm.getPlayer().dropMessage(1, "设置成功.");
                cm.dispose();
   }else if(selection==1){
                cm.setRw11(1);
                cm.getPlayer().dropMessage(1, "设置成功.");
                cm.dispose();
   }else if(selection==2){
                cm.setRw6(2);
                cm.getPlayer().dropMessage(1, "设置成功,换地图生效.");
                cm.dispose();
   }else{
               
                cm.getPlayer().dropMessage(1, "你怎么点这里来了?");
                cm.dispose();
 } }

                             if (test == 112) {
if (selection == 0)
{
cm.getPlayer().setRw1(0);
cm.sendOk("关闭打怪得到的钱自动存入背包成功！");
cm.dispose();
}
else if (selection == 1)
{
cm.getPlayer().setRw1(1);
cm.sendOk("开启打怪得到的钱自动存入背包成功！");
cm.dispose();
}}
//-----------------------------------------------------
                                              }else if (status == 4) {
                                                     if (tures == 1) {
      if(selection==0){
typedd=5120000;
}else if(selection==1){
typedd=5120001;
}else if(selection==2){
typedd=5120002;
}else if(selection==3){
typedd=5120003;
}else if(selection==4){
typedd=5120004;
}else if(selection==5){
typedd=5120005;
}else if(selection==6){
typedd=5120006;
}else if(selection==7){
typedd=5120007;
}else if(selection==8){
typedd=5120008;
}else if(selection==9){
typedd=5120009;
}else if(selection==10){
typedd=5120010;
}else if(selection==11){
typedd=5120012;
}else if(selection==12){
typedd=5120015;
}

cm.sendGetText("#k此喇巴非一般之喇巴,发送后全服的人都能以#b祝福#k的形式显示,来一句?\r\n\r\n[消耗使用次数一次][保证文字在20字以内]!");  
tures = 2000;
}
                                            if (tures == 12) {
if (cm.getzb() >= qflaba1) {
selected = cm.getText();
if (selected.isEmpty) {
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(3,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(3,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(3,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());


cm.setzb(-qflaba1);
cm.getPlayer().dropMessage(1, "成功刷出.扣除"+qflaba1+"元宝.");
cm.dispose();
}else{
cm.sendOk("文字显示不下,请缩短.");
cm.dispose();
}
}else{
cm.sendOk("元宝余额不足.");
cm.dispose();
}}
                                             if (tures == 13) {
if (cm.getzb() >= qflaba2) {
selected = cm.getText();
if (selected.isEmpty) {
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(11,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());


cm.setzb(-qflaba2);
cm.getPlayer().dropMessage(1, "成功刷出.扣除"+qflaba2+"元宝.");
cm.dispose();
}else{
cm.sendOk("文字显示不下,请缩短.");
cm.dispose();
}
}else{
cm.sendOk("元宝余额不足.");
cm.dispose();
}}

                                             if (tures == 14) {
if (cm.getzb() >= qflaba3) {
selected = cm.getText();
if (selected.isEmpty) {
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(12,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());


cm.setzb(-qflaba3);
cm.getPlayer().dropMessage(1, "成功刷出.扣除"+qflaba3+"元宝.");
cm.dispose();
}else{
cm.sendOk("文字显示不下,请缩短.");
cm.dispose();
}
}else{
cm.sendOk("元宝余额不足.");
cm.dispose();
}}

if (tures == 15) {
if (cm.getzb() >= splaba1) {
selected = cm.getText();
if (selected.isEmpty) {
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.setzb(-splaba1);
cm.getPlayer().dropMessage(1, "成功刷出.扣除"+splaba1+"元宝.");
cm.dispose();
}else{
cm.sendOk("文字显示不下,请缩短.");
cm.dispose();
}
}else{
cm.sendOk("元宝余额不足.");
cm.dispose();
}}

if (tures == 16) {
if (cm.getzb() >= splaba2) {
selected = cm.getText();
if (selected.isEmpty) {
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(6,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.setzb(-splaba2);
cm.getPlayer().dropMessage(1, "成功刷出.扣除"+splaba2+"元宝.");
cm.dispose();
}else{
cm.sendOk("文字显示不下,请缩短.");
cm.dispose();
}
}else{
cm.sendOk("元宝余额不足.");
cm.dispose();
}}


if (tures == 17) {
if (cm.getzb() >= splaba3) {
selected = cm.getText();
if (selected.isEmpty) {
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.setzb(-splaba3);
cm.getPlayer().dropMessage(1, "成功刷出.扣除"+splaba3+"元宝.");
cm.dispose();
}else{
cm.sendOk("文字显示不下,请缩短.");
cm.dispose();
}
}else{
cm.sendOk("元宝余额不足.");
cm.dispose();
}}

if (tures == 18) {
if (cm.getzb() >= splaba4) {
selected = cm.getText();
if (selected.isEmpty) {
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.odinms.tools.MaplePacketCreator.serverNotice(5,cm.getC().getChannel(),cm.getPlayer().getName() + "[刷]"+" : " + selected ,true).getBytes());
cm.setzb(-splaba4);
cm.getPlayer().dropMessage(1, "成功刷出.扣除"+splaba4+"元宝.");
cm.dispose();
}else{
cm.sendOk("文字显示不下,请缩短.");
cm.dispose();
}
}else{
cm.sendOk("元宝余额不足.");
cm.dispose();
}}
                                           if (tures == 111) {
  var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
  var zg =zz.getStr() + zz.getInt()+ zz.getDex()+ zz.getLuk();
  var zgmin = zg *1.05;
  var zgmax = zg *1.3;

                               if(selection==0){
           var text = "您现在进行的操作是:#b装备时限转换#k.\r\n\r\n";
 
            text += "#b┈┈┈┈┈┈┈━═☆装备时限前☆═━┈┈┈┈┈┈┈#n#l\r\n";
 
            text += ttt +" #d装备:#v"+zz.getItemId()+"#    "+ttt+" #d属性点总和:#b"+zg+"点\r\n\r\n";

            text += "#d┈┈┈┈┈┈┈━═☆装备时限后☆═━┈┈┈┈┈┈┈#n#l\r\n\r\n";

            text += ttt +" 装备限时:#b3天#d  "+ttt+" 装备属性波动范围:#b"+zgmin+"点~"+zgmax+"点.\r\n\r\n";
            text += "#e#r[提示]#n:\r\n#b"+ttt+" 装备属性有几率增加5%~30%[按整数计算].#k攻击力不增加.物品将锁定,不能使用其他强化手段.\r\n\r\n";
            text += "#b#e                                是否继续？#n#l\r\n\r\n";
          
cm.sendNext(text);
tures=30;
                               }else if(selection==1){
  var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
  var zg =zz.getStr() + zz.getInt()+ zz.getDex()+ zz.getLuk();
  var zgmin = zg *1.1;
           var text = "您现在进行的操作是:#b装备时限转换#k.\r\n\r\n";
 
            text += "#b┈┈┈┈┈┈┈━═☆装备时限前☆═━┈┈┈┈┈┈┈#n#l\r\n";
 
            text += ttt +" #d装备:#v"+zz.getItemId()+"#    "+ttt+" #d属性点总和:#b"+zg+"点\r\n\r\n";

            text += "#d┈┈┈┈┈┈┈━═☆装备时限后☆═━┈┈┈┈┈┈┈#n#l\r\n\r\n";

            text += ttt +" 装备限时:#b10天#d  "+ttt+" 装备属性改变为:#b"+zgmin+".\r\n\r\n";
            text += "#e#r[提示]#n:\r\n#b"+ttt+" 装备属性将增加10%.[按整数计算].#k攻击力不增加.物品将锁定,不能使用其他强化手段.\r\n\r\n";
            text += "#b#e                                是否继续？#n#l\r\n\r\n";
          
cm.sendNext(text);
tures=31;

                               }else if(selection==2){
var i = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
var shuxing =50;//设置增加赠送的装备属性点.
  var text = "您现在进行的操作是:#b装备时间增加#k.\r\n\r\n";
 
            text += "#b┈┈┈┈┈┈┈━═☆装备时限前☆═━┈┈┈┈┈┈┈#n#l\r\n";
 
            text += ttt +" #d装备:#v"+zz.getItemId()+"#"+ttt+" #d到期时间:#b"+i.getExpiration()+"#k.\r\n\r\n";

            text += "#d┈┈┈┈┈┈┈━═☆装备时限后☆═━┈┈┈┈┈┈┈#n#l\r\n\r\n";

            text += ttt +" 装备时间延长至:#b"+timezb+"天#d  "+ttt+" #r装备属性提升#r30%#k.\r\n\r\n";
            text += "#e#r[提示]#n:\r\n#b"+ttt+" 装备属性将随机取用一样属性点进行增加.#k攻击力不增加.\r\n\r\n";
            text += "#b#e                                是否继续？#n#l\r\n\r\n";
          
cm.sendNext(text);
tures=32;
                               }else if(selection==3){
var i = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
var shuxing =30;//设置增加赠送的装备属性点.
  var text = "您现在进行的操作是:#b装备时间增加#k.\r\n\r\n";
 
            text += "#b┈┈┈┈┈┈┈━═☆装备时限前☆═━┈┈┈┈┈┈┈#n#l\r\n";
 
            text += ttt +" #d装备:#v"+zz.getItemId()+"#"+ttt+" #d到期时间:#b"+i.getExpiration()+"#k.\r\n\r\n";

            text += "#d┈┈┈┈┈┈┈━═☆装备时限后☆═━┈┈┈┈┈┈┈#n#l\r\n\r\n";

            text += ttt +" 装备时间延长至:#b"+timecsb+"天#d  "+ttt+" 装备属性提升#r20%#k.\r\n\r\n";
            text += "#e#r[提示]#n:\r\n#b"+ttt+" 装备属性将随机取用一样属性点进行增加.#k攻击力不增加.\r\n\r\n";
            text += "#b#e                                是否继续？#n#l\r\n\r\n";
          
cm.sendNext(text);
tures=33;
                               }else if(selection==4){
var i = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
var shuxing =10;//设置增加赠送的装备属性点.
  var text = "您现在进行的操作是:#b装备时间增加#k.\r\n\r\n";
 
            text += "#b┈┈┈┈┈┈┈━═☆装备时限前☆═━┈┈┈┈┈┈┈#n#l\r\n";
 
            text += ttt +" #d装备:#v"+zz.getItemId()+"#"+ttt+" #d到期时间:#b"+i.getExpiration()+"#k.\r\n\r\n";

            text += "#d┈┈┈┈┈┈┈━═☆装备时限后☆═━┈┈┈┈┈┈┈#n#l\r\n\r\n";

            text += ttt +" 装备时间延长至:#b"+timeNX+"天#d  "+ttt+" 装备属性提升#r10%#k.\r\n\r\n";
            text += "#e#r[提示]#n:\r\n#b"+ttt+" 装备属性将随机取用一样属性点进行增加.#k攻击力不增加.\r\n\r\n";
            text += "#b#e                                是否继续？#n#l\r\n\r\n";
          
cm.sendNext(text);
tures=34;
                               }else if(selection==5){
var i = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
var shuxing =10;//设置增加赠送的装备属性点.
  var text = "您现在进行的操作是:#b装备时间增加#k.\r\n\r\n";
 
            text += "#b┈┈┈┈┈┈┈━═☆装备时限前☆═━┈┈┈┈┈┈┈#n#l\r\n";
 
            text += ttt +" #d装备:#v"+zz.getItemId()+"#"+ttt+" #d到期时间:#b"+i.getExpiration()+"#k.\r\n\r\n";

            text += "#d┈┈┈┈┈┈┈━═☆装备时限后☆═━┈┈┈┈┈┈┈#n#l\r\n\r\n";

            text += ttt +" 装备时间增加:#b"+timemoney+"天#d  "+ttt+" 装备属性提升#r10%#k.\r\n\r\n";
            text += "#e#r[提示]#n:\r\n#b"+ttt+" 装备属性将随机取用一样属性点进行增加.#k攻击力不增加.\r\n\r\n";
            text += "#b#e                                是否继续？#n#l\r\n\r\n";
          
cm.sendNext(text);
tures=35;
                               }else if(selection==6){
     if(cm.getVip() == 0) {
   var t =2-cm.getBossLog('SXqianghua');
   var zz = "您是#r普通玩家#k,今日已使用#r" + cm.getBossLog('SXqianghua') + "#k次,还能使用#r"+t+"#k次.";
     }else if(cm.getVip() == 1) {
   var t =2-cm.getBossLog('SXqianghua');
   var zz = "您是#r一星会员#k,今日已使用#r" + cm.getBossLog('SXqianghua') + "#k次,还能使用#r"+t+"#k次.";
     }else if(cm.getVip() == 2) {
   var t =3-cm.getBossLog('SXqianghua');
   var zz = "您是#r二星会员#k,今日已使用#r" + cm.getBossLog('SXqianghua') + "#k次,还能使用#r"+t+"#k次.";
     }else if(cm.getVip() == 3) {
   var t =3-cm.getBossLog('SXqianghua');
   var zz = "您是#r三星会员#k,今日已使用#r" + cm.getBossLog('SXqianghua') + "#k次,还能使用#r"+t+"#k次.";
     }else if(cm.getVip() == 4) {
   var t =3-cm.getBossLog('SXqianghua');
   var zz = "您是#r至尊会员#k,今日已使用#r" + cm.getBossLog('SXqianghua') + "#k次,还能使用#r"+t+"#k次.";
}

 var text = "每天坚持登陆,既可让装备属性升值.\r\n\r\n";

  text += "#r普通玩家#k每天可使#r2#k件装备升值#e#b 5#n#k点属性值.\r\n";

  text += "#r一星会员#k每天可使#r2#k件装备升值#e#b10#n#k点属性值.\r\n";

  text += "#r二星会员#k每天可使#r3#k件装备升值#e#b10#n#k点属性值.\r\n";

  text += "#r三星会员#k每天可使#r3#k件装备升值#e#b15#n#k点属性值.\r\n";

  text += "#r至尊会员#k每天可使#r3#k件装备升值#e#b20#n#k点属性值.\r\n\r\n";

  text += ""+zz+"\r\n\r\n";
cm.sendNext(text);
tures=36;
                               }else if(selection==7){
 cm.sendOk("该系统制作中,请期待.")
 cm.dispose();                           
}
}
                                               if (tures == 112) {
var ttm3 = "请选择要回馈的方式:\r\n\r\n";

     ttm3 += "#L1#"+ttt+" 回馈元宝#l\r\n";

     ttm3 += "#L2#"+ttt+" 回馈慈善#l\r\n";

     ttm3 += "#L3#"+ttt+" 回馈积分#l\r\n";

     ttm3 += "#L4#"+ttt+" 回馈抵用卷#l\r\n";

cm.sendSimple(ttm3);  
tures= 168;
}
//-----------------------------------------------------

                                              }else if (status == 5) {
     if (tures == 2000) {
if(cm.getChar().getGMLevel() != 0) {
var vipxianz =999999; 
}else if(cm.getChar().getVip() == 1) {
var vipxianz =v1_laba; 
}else if(cm.getChar().getVip() == 2) {
var vipxianz =v2_laba; 
}else if(cm.getChar().getVip() == 3) {
var vipxianz =v3_laba; 
}else if(cm.getChar().getVip() == 4) {
var vipxianz =v4_laba; 

}
selected = cm.getText();
                     if (cm.getBossLog('viplaba') < vipxianz) {
cm.viplaba(selected,typedd);
cm.setBossLog('viplaba');
cm.getPlayer().dropMessage(1, "喇叭发送成功.");
cm.dispose();
}else{
cm.sendOk("对应今日的使用次数已经用完.明天再来吧~");
cm.dispose();
}}
                                                   if (tures == 30) {  
var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
                         if (chanceo>=1 && chanceo <=3){
var beilv =0.10;
        }else if (chanceo>=4 && chanceo <=5){
var beilv =0.15;
        }else if (chanceo>=6 && chanceo <=7){
var beilv =0.25;
        }else if (chanceo>=8 && chanceo <=9){
var beilv =0.30;
        }else {
var beilv =0.05;
}
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 3*86400000);
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
var newstr = (item.getStr())* beilv;
var newdex = (item.getDex())* beilv;
var newint = (item.getInt())* beilv;
var newluk = (item.getLuk())* beilv;
                    item.setExpiration(temptime);
                    item.setStr(item.getStr()+newstr);
                    item.setInt(item.getInt()+newint);
                    item.setDex(item.getDex()+newdex);
                    item.setLuk(item.getLuk()+newluk);

MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1,1, true);
MapleInventoryManipulator.addFromDrop(cm.getChar().getClient(), item, "Edit by Kevin");
cm.getChar().lockitem1(1,true)
cm.sendOk("成功,恭喜该装备成功变为#b限时装备#k.能力值得到部分提升.");
cm.dispose();
        }                        

if (tures == 31) {  
var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
var beilv = 0.1;
var newstr = (item.getStr())* beilv;
var newdex = (item.getDex())* beilv;
var newint = (item.getInt())* beilv;
var newluk = (item.getLuk())* beilv;
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 3*86400000);
                    item.setExpiration(temptime);
                    item.setStr(item.getStr()+newstr);
                    item.setInt(item.getInt()+newint);
                    item.setDex(item.getDex()+newdex);
                    item.setLuk(item.getLuk()+newluk);

MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1,1, true);
MapleInventoryManipulator.addFromDrop(cm.getChar().getClient(), item, "Edit by Kevin");
cm.getChar().lockitem1(1,true)
cm.sendOk("成功,恭喜该装备成功变为#b限时装备#k.能力值得到部分提升.");
cm.dispose();
        }                        

if (tures == 32) { 
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
   var text ="继续使装备:#v"+zz.getItemId()+"#得使用期限改变至#r"+timezb+"#k天.装备属性提升#r30%#k.消耗#r"+yuezhangzb+"#k点元宝.请确认是否继续."; 
                  cm.sendYesNo(text);
tures=210;
 } 

if (tures == 33) { 
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
   var text ="继续使装备:#v"+zz.getItemId()+"#得使用期限改变至#r"+timecsb+"#k天.装备属性提升#r20%#k.消耗#r"+yuezhangcsb+"#k点慈善.请确认是否继续."; 
                  cm.sendYesNo(text);
tures=211;
 } 

if (tures == 34) { 
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
   var text ="继续使装备:#v"+zz.getItemId()+"#得使用期限改变至#r"+timeNX+"#k天.装备属性提升#r10%#k.消耗#r"+yuezhangNX+"#k点点卷.请确认是否继续."; 
                  cm.sendYesNo(text);
tures=212;
 } 
if (tures == 35) { 
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
   var text ="继续使装备:#v"+zz.getItemId()+"#得使用期限改变至#r"+timemoney+"#k天.装备属性提升#r10%#k.消耗#r"+yuezhangmoney+"#k亿冒险.请确认是否继续."; 
                  cm.sendYesNo(text);
tures=213;
 } 
if (tures == 36) { 
   var text ="请选择要强化的属性值:\r\n\r\n"; 

   text +="#L1#"+ttt+" #d增加力量#l#L2#"+ttt+" #d增加敏捷#l\r\n\r\n#L3#"+ttt+" #d增加智力#l#L4#"+ttt+" #d增加运气#l";
                  cm.sendSimple(text);
tures=214;
 } 
                                                   if (tures == 168) {  
if(selection==1){

var ttm3 = "你选择的是#b元宝#k回馈.请选择可以应用的方案:\r\n\r\n";

}else if(selection==2){

var ttm3 = "你选择的是#b慈善#k回馈.请选择可以应用的方案:\r\n\r\n";

}else if(selection==3){

var ttm3 = "你选择的是#b积分#k回馈.请选择可以应用的方案:\r\n\r\n";

}else if(selection==4){

var ttm3 = "你选择的是#b抵用卷#k回馈.请选择可以应用的方案:\r\n\r\n";

}



     ttm3 += "#L1#"+ttt+" 装备属性总和范围在#r100#k点-#r200#k点[回馈#r50%#k]#l\r\n";

     ttm3 += "#L2#"+ttt+" 装备属性总和范围在#r200#k点-#r300#k点[回馈#r100%#k]#l\r\n";

     ttm3 += "#L3#"+ttt+" 装备属性总和范围在#r300#k点-#r400#k点[回馈#r120%#k]#l\r\n";

     ttm3 += "#L4#"+ttt+" 装备属性总和范围在#r400#k点-#r500#k点[回馈#r150%#k]#l\r\n";

     ttm3 += "#L5#"+ttt+" 装备属性总和范围在#r500#k点-#r600#k点[回馈#r180%#k]#l\r\n";

     ttm3 += "#L6#"+ttt+" 装备属性总和范围在#r600#k点-#r700#k点[回馈#r#e200%#n#k]#l\r\n\r\n";

     ttm3 += "  #e#b[注]:其他范围装备将不能兑换.";

cm.sendSimple(ttm3);  
choose =selection;
tures=215;
    }                
//===========================
                                          }else if (status == 6) {
                                         if (tures == 210) { 
if(cm.getzb() >= yuezhangzb) { 
var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
var newstr = (item.getStr())* 0.3;
var newInt = (item.getInt())* 0.3;
var newDex = (item.getDex())* 0.3;
var newLuk = (item.getLuk())* 0.3;
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + timezb *86400000);
                     item.setExpiration(temptime);
                    item.setStr(item.getStr()+newstr);
                    item.setInt(item.getInt()+newInt);
                    item.setDex(item.getDex()+newDex);
                    item.setLuk(item.getLuk()+newLuk);
MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1,1, true);
MapleInventoryManipulator.addFromDrop(cm.getChar().getClient(), item, "Edit by Kevin");
cm.setzb(-yuezhangzb);
cm.sendOk("成功,恭喜#v"+zz.getItemId()+"#使用天数成功变为#r"+timezb+"#k天.");
cm.dispose();
}else{ 
cm.sendOk("元宝数量不足,不能进行.");
cm.dispose();
        } }
                                         if (tures == 211) { 
if(cm.getcsb() >= yuezhangcsb) {
var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
var newstr = (item.getStr())* 0.2;
var newInt = (item.getInt())* 0.2;
var newDex = (item.getDex())* 0.2;
var newLuk = (item.getLuk())* 0.2;
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + timecsb *86400000);
                     item.setExpiration(temptime);
                    item.setStr(item.getStr()+newstr);
                    item.setInt(item.getInt()+newInt);
                    item.setDex(item.getDex()+newDex);
                    item.setLuk(item.getLuk()+newLuk);
MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1,1, true);
MapleInventoryManipulator.addFromDrop(cm.getChar().getClient(), item, "Edit by Kevin");
cm.setcsb(-yuezhangcsb);
cm.sendOk("成功,恭喜#v"+zz.getItemId()+"#使用天数成功变为#r"+timecsb+"#k天.");
cm.dispose();
}else{ 
cm.sendOk("慈善数量不足,不能进行.");
cm.dispose();
        } }
                                         if (tures == 212) {
if(cm.getPlayer().getCSPoints(1) >= yuezhangNX) { 
var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
var newstr = (item.getStr())* 0.1;
var newInt = (item.getInt())* 0.1;
var newDex = (item.getDex())* 0.1;
var newLuk = (item.getLuk())* 0.1;
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + timecsb *86400000);
                     item.setExpiration(temptime);
                    item.setStr(item.getStr()+newstr);
                    item.setInt(item.getInt()+newInt);
                    item.setDex(item.getDex()+newDex);
                    item.setLuk(item.getLuk()+newLuk);
MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1,1, true);
MapleInventoryManipulator.addFromDrop(cm.getChar().getClient(), item, "Edit by Kevin");
cm.getPlayer().modifyCSPoints(1,-yuezhangNX);
cm.sendOk("成功,恭喜#v"+zz.getItemId()+"#使用天数成功变为#r"+timeNX+"#k天.");
cm.dispose();
}else{ 
cm.sendOk("点卷不足,不能进行.");
cm.dispose();
        } }
                                         if (tures == 213) { 
if(cm.getMeso() >= yuezhangmoney*100000000) {
var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
var newstr = (item.getStr())* 0.1;
var newInt = (item.getInt())* 0.1;
var newDex = (item.getDex())* 0.1;
var newLuk = (item.getLuk())* 0.1;
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + timecsb *86400000);
                     item.setExpiration(temptime);
                    item.setStr(item.getStr()+newstr);
                    item.setInt(item.getInt()+newInt);
                    item.setDex(item.getDex()+newDex);
                    item.setLuk(item.getLuk()+newLuk);
MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1,1, true);
MapleInventoryManipulator.addFromDrop(cm.getChar().getClient(), item, "Edit by Kevin");
cm.gainMeso(-yuezhangmoney*100000000);
cm.sendOk("成功,恭喜#v"+zz.getItemId()+"#使用天数成功变为#r"+timemoney+"#k天.");
cm.dispose();
}else{ 
cm.sendOk("金钱不足,不能进行.");
cm.dispose();
        } }

                                         if (tures == 214) { 
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
if(selection==1){
var shuxing =Array("力量值",5,10,10,15,20,1372);

var nc =zz.getStr();
}else if(selection==2){
var shuxing =Array("敏捷值",5,10,10,15,20,2372);

var nc =zz.getDex();
}else if(selection==3){
var shuxing =Array("智力值",5,10,10,15,20,3372);

var nc =zz.getInt();
}else if(selection==4){
var shuxing =Array("运气值",5,10,10,15,20,4372);
var nc =zz.getLuk();
}
if(cm.getVip()== 0){
var zt =shuxing[1];
 var t =2-cm.getBossLog('SXqianghua');
 var t1 =2;
}else if(cm.getVip()== 1){
var zt =shuxing[2];
 var t =2-cm.getBossLog('SXqianghua');
 var t1 =2;
}else if(cm.getVip()== 2){
 var t1 =2;
var zt =shuxing[3];
 var t =3-cm.getBossLog('SXqianghua');
}else if(cm.getVip()== 3){
 var t1 =3;
var zt =shuxing[4];
 var t =3-cm.getBossLog('SXqianghua');
 var t1 =3;
}else if(cm.getVip()== 4){
var zt =shuxing[5];
 var t =3-cm.getBossLog('SXqianghua');
 var t1 =3;
}
if(cm.getBossLog('SXqianghua') < t1){
var ncd =nc+zt;
   var text ="继续使装备:#v"+zz.getItemId()+"# #b"+shuxing[0]+"#k增加#b:"+zt+"#k点.\r\n\r\n"; 

    text +="装备"+shuxing[0]+"将变为:#r"+ncd+"#k点.";

    text +="   当前剩余:#r"+t+"#k次使用次数.";
                  cm.sendYesNo(text);
shuxing1=selection;
tures=152;
}else {
cm.sendOk("抱歉.你今天已经使用过:#r"+cm.getBossLog('SXqianghua')+"#k次,限制使用:#r"+t1+"#k次.请明天再来.");
cm.dispose();
 } }

                                         if (tures == 215) { 
  var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
  var zg =zz.getStr() + zz.getInt()+ zz.getDex()+ zz.getLuk();
  var accde =zz.getWatk() + zz.getMatk();
if(selection==1){
var acc = Array(100,200,0.5);//下限,上限,回馈
}else if(selection==2){
var acc = Array(200,300,1.0);
}else if(selection==3){
var acc = Array(300,400,1.2);
}else if(selection==4){
var acc = Array(400,500,1.5);
}else if(selection==5){
var acc = Array(500,600,1.8);
}else if(selection==6){
var acc = Array(600,700,2);
}
if(choose==1){
var gb = Array("元宝",100,40,10);//名字。上限。属性*/.攻击*/.
var gbz =gb[2];
var gbm =gb[3];
var s1=zg/gbz;//属性
var s2m =accde-100;
var s2=s2m/gbm;//攻击
choose1 =1;
}else if(choose==2){
var gb = Array("慈善",200,40,10);
var gbz =gb[2];
var gbm =gb[3];
var s1=zg/gbz;
var s2m =accde-100;
var s2=s2m/gbm;//攻击
choose1 =2;
}else if(choose==3){
var gb = Array("积分",200,40,10);
var gbz =gb[2];
var gbm =gb[3];
var s1=zg/gbz;//属性
var s2m =accde-100;
var s2=s2m/gbm;//攻击
choose1 =3;
}else if(choose==4){
var gb = Array("抵用卷",200000,100,200);
var gbz =gb[2];
var gbm =gb[3];
var s1=zg*gbz;//属性
var s2m =accde-100;
var s2=s2m/gbm;//攻击
choose1 =4;
}
if(accde <100){//判断攻击
var s2z = 0;
}else{
var s2z = s2;
}

//计算
var s3 =zz.getUpgradeSlots();//升级次数s3
sb =s1+s3+s2z;//总和
var bb =acc[2]*100;
var cc =acc[2]*sb;
if(zg>=acc[0] && zg<acc[1]){//判断属性区间

         if(sb <=gb[1]*acc[2]){//判断是否大于最多兑换值-经过计算后的.
                    if(zz.getItemId() ==1142178 &&zz.getItemId() ==1142074 &&zz.getItemId() ==1142174 &&zz.getItemId() ==1142151){//判断是否大于最多兑换值-经过计算后的.
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
   var text ="算法计算:#v"+zz.getItemId()+"#属性值总和为:#r"+zg+"#k点,攻击力总和:#r"+accde+"#k点,适用于该方案.\r\n\r\n 计算算得:可以兑换#r"+sb+"#k点"+gb[0]+"。\r\n 由于范围限制,您将获得#r"+bb+"%#k,#r"+cc+"#k点"+gb[0]+".是否兑换?"; 
                  cm.sendYesNo(text);
choose =cc;
tures=210;

}else{
   var text ="VIP勋章不可兑换."; 
   cm.sendOk(text);
cm.dispose();
}

}else{
   var text ="#b算法算得#k:\r\n   当前武器可兑换"+gb[0]+"#r"+sb+"#k点."+gb[0]+"最高可以兑换#r"+gb[1]+"#k点.请默哀."; 
   cm.sendOk(text);
cm.dispose();
}
}else{
   var text ="#b算法算得#k:\r\n   当前武器总属性:#r"+zg+"#k点,与区域:#r"+acc[0]+"#k点-#r"+acc[1]+"#k点,不符合,请重新选择.[下取上舍]"; 
   cm.sendOk(text);
cm.dispose();
}
}


//-------------------------------------------
                                               }else if (status == 7) {
                              if (tures == 210) {
if (choose1 == 1) {
cm.setzb(+choose);
MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1,1, true);
cm.sendOk("成功,增加元宝#b"+choose+"#k点.[实际按整数计算.4舍5入制]");
cm.dispose();
}else if (choose1 == 2) {
cm.setcsb(+choose);
MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1,1, true);
cm.sendOk("成功,增加慈善#b"+choose+"#k点.[实际按整数计算.4舍5入制]");
cm.dispose();
}else if (choose1 == 3) {
cm.setjfb(+choose);
MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1,1, true);
cm.sendOk("成功,增加积分#b"+choose+"#k点.[实际按整数计算.4舍5入制]");
cm.dispose();
}else if (choose1 == 4) {
cm.getPlayer().modifyCSPoints(1,+choose);
MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1,1, true);
cm.getChar().UpdateCash();//更新显示
cm.sendOk("成功,增加抵用卷#b"+choose+"#k点.[实际按整数计算.4舍5入制]");
cm.dispose();

        }}
                              if (tures == 152) {

var item = cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1).copy();
var zz =cm.getChar().getInventory(MapleInventoryType.EQUIP).getItem(1);
if(cm.getVip()== 0){
var lz =5;
}else if(cm.getVip()== 1){
var lz =10;
var max = 2;
}else if(cm.getVip()== 2){
var lz =10;
var max = 2;
}else if(cm.getVip()== 3){
var lz =15;
var max = 3;
}else if(cm.getVip()== 4){
var lz =20;
var max = 3;
}
if (shuxing1 == 1) {
var newstr = lz;
var newInt = 0;
var newDex = 0;
var newLuk = 0;
 }else if (shuxing1 == 2) {
var newstr = 0;
var newInt = 0;
var newDex = lz;
var newLuk = 0;
 }else if (shuxing1 == 3) {
var newstr = 0;
var newInt = lz;
var newDex = 0;
var newLuk = 0;
 }else if (shuxing1 == 4) {
var newstr = 0;
var newInt = 0;
var newDex = 0;
var newLuk = lz;
 }
                    item.setStr(item.getStr()+newstr);
                    item.setInt(item.getInt()+newInt);
                    item.setDex(item.getDex()+newDex);
                    item.setLuk(item.getLuk()+newLuk);
MapleInventoryManipulator.removeFromSlot(cm.getC(), MapleInventoryType.EQUIP, 1,1, true);
MapleInventoryManipulator.addFromDrop(cm.getChar().getClient(), item, "Edit by Kevin");
cm.setBossLog('SXqianghua');
cm.sendOk("成功,恭喜#v"+zz.getItemId()+"#属性成功升级.");
cm.dispose();
        }  
                              

//                   



}
}

}                                                                                                                                                                                                                                                                    
