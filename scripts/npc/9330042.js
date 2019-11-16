/*
                《该文件是Vr001 封测版服务端的核心文件之一》
  目前版权 (C) 2010年   Vr001 封测版             <159502199@qq.com>
 * -----------------------------------------------------------*
  之前人员 (C) 2008年   Huy              <patrick.huy@frz.cc>
                       Matthias Butz       <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>
 * ------------------------------------------------------------*
 @该服务端目前维护人员:Vr001 封测版
 @这个文件是自由形式.你可以任意内容
 @这个程序发布的目的是期望它能有用@
 @如果你需要技术支持,可以联系更新/维护人员<QQ100807851>
 @你应该已经收到一份Affero GNU通用公共授权
 -如果不是,请仔细查看http://www.gnu.org/licenses/*
*/

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
                
            cm.sendOk("感谢你的光临！");
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
              
            var tex2 = "";	
            var text = "";
            for(i = 0; i < 10; i++){
                text += "";
            }			
            if (cm.haveItem(1122019)||cm.haveItem(1122024)||cm.haveItem(1122025)||cm.haveItem(1122026)||cm.haveItem(1122027)||cm.haveItem(1122028)||cm.haveItem(1122029)||cm.haveItem(1122030)||cm.haveItem(1122031)||cm.haveItem(1122032)||cm.haveItem(1122033)||cm.haveItem(1122034)||cm.haveItem(1122035)||cm.haveItem(1122036)||cm.haveItem(1122037)||cm.haveItem(1122038)) {
                //text += "#b嗨！尊敬的玩家#r"+ cm.getChar().getName() +"#b！以下是您的累计：\r\n◤目前已经杀死怪物：#r"+ cm.getChar().getsg() +"#b 头◥\r\n◣目前已经完成副本：#r"+cm.getboss()+"#b 次◢\r\n\r\n#fUI/UIWindow.img/QuestIcon/3/0#\r\n#k"
                text += "陌生人#r" + cm.getChar().getName() +"#k..\r\n你知道吗,最近冒险岛内的#r冒险之心#k的气息越来越浑浊了..\r\n这条#r神秘项链#k.只要你有足够的材料.\r\n我就可以让#b这条项链解除封印#k..达到觉醒的状态.\r\n步骤说明图：#v1122019#―→#v1122024#―→#v1122029#―→#v1122034#\r\n"; 
                text += "                                         ↓\r\n";
                text += "                             #b神秘的道具#k#v2022670#？？？";
                text += "\r\n#r■■■■■■■■■■■开始进化■■■■■■■■■■■■";
                text += "\r\n#d初次进化LV11（.）:\r\n#e需要消耗200个#v4001126##n\r\n#e需要消耗冒险币#v2140002# 100万#n\r\n";
                text += "#d#L1##r#e①#n『冒险之心LV10』#d→#r『封印的冒险之心LV11』(战士)#l\r\n";
                text += "#d#L11##r#e①#n『冒险之心LV10』#d→#r『封印的冒险之心LV11』(魔法师)#l\r\n";
                text += "#d#L12##r#e①#n『冒险之心LV10』#d→#r『封印的冒险之心LV11』(弓箭手)#l\r\n";
                text += "#d#L13##r#e①#n『冒险之心LV10』#d→#r『封印的冒险之心LV11』(飞侠)#l\r\n";
                text += "#d#L14##r#e①#n『冒险之心LV10』#d→#r『封印的冒险之心LV11』(海盗)#l\r\n";
                text += "\r\n■■■■■■■■■■■■■■■■■■■■■■■■■■■";
                text += "\r\n#d再进化LV31（...）:\r\n#e需要消耗300个#v4001126##n\r\n#e需要消耗冒险币#v2140002# 300万#n\r\n";
                text += "#L3##r#e②#n『封印的冒险之心LV11』#d→#r『苏醒的冒险之心LV31』#l\r\n";
                text += "\r\n■■■■■■■■■■■■■■■■■■■■■■■■■■■";
                text += "\r\n#b#e最终进化LV61（..）:\r\n#e需要消耗500个#v4001126#\r\n需要消耗1个#v4000313##n\r\n#e需要消耗冒险币#v2140002# 500万#n\r\n";
                text += "#L4##r#e#e③『苏醒冒险之心LV31』#d→#r『觉醒的冒险之心LV61』#l\r\n";
                text += "\r\n■■■■■■■■■■■■■■■■■■■■■■■■■  ";
                cm.sendSimple(text);
            }else{
                cm.sendOk("勇士..你能感觉到#r冒险之心#k#n的神秘波动吗..如果你能拿给我看看,或许我能帮助你.");
                cm.dispose();
            }
        } else if (status == 1) {
            if (selection == 0) {      
                cm.warp(910000000); 
                cm.dispose(); 
            }else if  (selection == 1) { //第一个升级
                if (cm.haveItem(1122019, 1)&&cm.haveItem(4001126, 200)&&(cm.getMeso() >= 1000000)) { 
                    cm.gainItem(1122019,-1);
                    cm.gainMeso(-2000000);
                    cm.gainItem(4001126,-200); //200个枫叶
                    cm.gainItem(1122024,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链出现了一丝丝光泽");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『冒险之心』项链！得到了『封印的冒险之心』！")
                    cm.dispose();
                } else {
                    cm.sendOk("我需要冒险之心和200个枫叶.\r\n如果缺少,我没有办法使用力量."); 
                    cm.dispose();
                }
            }else if  (selection == 11) { //第一个升级
                if (cm.haveItem(1122019, 1)&&cm.haveItem(4001126, 200)&&(cm.getMeso() >= 1000000)) { 
                    cm.gainItem(1122019,-1);
                    cm.gainMeso(-2000000);
                    cm.gainItem(4001126,-200); //200个枫叶
                    cm.gainItem(1122025,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链出现了一丝丝光泽");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『冒险之心』项链！得到了『封印的冒险之心』！")
                    cm.dispose();
                } else {
                    cm.sendOk("我需要冒险之心和200个枫叶.\r\n如果缺少,我没有办法使用力量."); 
                    cm.dispose();
                }
            }else if  (selection == 12) { //第一个升级
                if (cm.haveItem(1122019, 1)&&cm.haveItem(4001126, 200)&&(cm.getMeso() >= 1000000)) { 
                    cm.gainItem(1122019,-1);
                    cm.gainMeso(-2000000);
                    cm.gainItem(4001126,-200); //200个枫叶
                    cm.gainItem(1122026,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链出现了一丝丝光泽");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『冒险之心』项链！得到了『封印的冒险之心』！")
                    cm.dispose();
                } else {
                    cm.sendOk("我需要冒险之心和200个枫叶.\r\n如果缺少,我没有办法使用力量."); 
                    cm.dispose();
                }
            }else if  (selection == 13) { //第一个升级
                if (cm.haveItem(1122019, 1)&&cm.haveItem(4001126, 200)&&(cm.getMeso() >= 1000000)) { 
                    cm.gainItem(1122019,-1);
                    cm.gainMeso(-2000000);
                    cm.gainItem(4001126,-200); //200个枫叶
                    cm.gainItem(1122027,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链出现了一丝丝光泽");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『冒险之心』项链！得到了『封印的冒险之心』！")
                    cm.dispose();
                } else {
                    cm.sendOk("我需要冒险之心和200个枫叶.\r\n如果缺少,我没有办法使用力量."); 
                    cm.dispose();
                }
            }else if  (selection == 14) { //第一个升级
                if (cm.haveItem(1122019, 1)&&cm.haveItem(4001126, 200)&&(cm.getMeso() >= 1000000)) { 
                    cm.gainItem(1122019,-1);
                    cm.gainMeso(-2000000);
                    cm.gainItem(4001126,-200); //200个枫叶
                    cm.gainItem(1122028,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链出现了一丝丝光泽");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『冒险之心』项链！得到了『封印的冒险之心』！")
                    cm.dispose();
                } else {
                    cm.sendOk("我需要冒险之心和200个枫叶.\r\n如果缺少,我没有办法使用力量."); 
                    cm.dispose();
                }
            }else if  (selection == 3) {      
                if (cm.haveItem(1122024, 1)&&cm.haveItem(4001126, 300)&&(cm.getMeso() >= 3000000)) { 
                    cm.gainItem(1122024,-1);
                    cm.gainMeso(-3000000);
                    cm.gainItem(4001126,-300); //300个枫叶
                    cm.gainItem(1122029,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链从一丝丝光泽变成了小小的泛光.");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『封印的冒险之心』项链！得到了『苏醒的冒险之心』！")
                    cm.dispose();
                }else if (cm.haveItem(1122025, 1)&&cm.haveItem(4001126, 300)&&(cm.getMeso() >= 3000000)){
                    cm.gainItem(1122025,-1);
                    cm.gainMeso(-3000000);
                    cm.gainItem(4001126,-300); //300个枫叶
                    cm.gainItem(1122030,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链从一丝丝光泽变成了小小的泛光.");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『封印的冒险之心』项链！得到了『苏醒的冒险之心』！")
                    cm.dispose();
                }else if (cm.haveItem(1122026, 1)&&cm.haveItem(4001126, 300)&&(cm.getMeso() >= 3000000)){
                    cm.gainItem(1122026,-1);
                    cm.gainMeso(-3000000);
                    cm.gainItem(4001126,-300); //300个枫叶
                    cm.gainItem(1122031,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链从一丝丝光泽变成了小小的泛光.");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『封印的冒险之心』项链！得到了『苏醒的冒险之心』！")
                    cm.dispose();
                }else if (cm.haveItem(1122027, 1)&&cm.haveItem(4001126, 300)&&(cm.getMeso() >= 3000000)){
                    cm.gainItem(1122027,-1);
                    cm.gainMeso(-3000000);
                    cm.gainItem(4001126,-300); //300个枫叶
                    cm.gainItem(1122032,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链从一丝丝光泽变成了小小的泛光.");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『封印的冒险之心』项链！得到了『苏醒的冒险之心』！")
                    cm.dispose();
                }else if (cm.haveItem(1122028, 1)&&cm.haveItem(4001126, 300)&&(cm.getMeso() >= 3000000)){
                    cm.gainItem(1122028,-1);
                    cm.gainMeso(-3000000);
                    cm.gainItem(4001126,-300); //300个枫叶
                    cm.gainItem(1122033,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链从一丝丝光泽变成了小小的泛光.");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『封印的冒险之心』项链！得到了『苏醒的冒险之心』！")
                    cm.dispose();
                } else {
                    cm.sendOk("我需要封印的冒险之心和300个枫叶.\r\n如果缺少,我没有办法使用力量."); 
                    cm.dispose();
                }
            }else if  (selection == 4) { //4000313黄金枫叶
                if (cm.haveItem(1122029, 1)&&cm.haveItem(4001126, 500)&&cm.haveItem(4000313, 1)&&(cm.getMeso() >= 5000000)) { 
                    cm.gainItem(1122029,-1);
                    cm.gainItem(4000313,-1);
                    cm.gainMeso(-5000000);
                    cm.gainItem(4001126,-500); //300个枫叶
                    cm.gainItem(1122034,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链发出了充满力量的光芒.");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『苏醒的冒险之心』项链！得到了『觉醒的冒险之心』！！太不可思议了！")
                    cm.dispose();
                }else if (cm.haveItem(1122030, 1)&&cm.haveItem(4001126, 500)&&cm.haveItem(4000313, 1)&&(cm.getMeso() >= 5000000)){
                     cm.gainItem(1122030,-1);
                    cm.gainItem(4000313,-1);
                    cm.gainMeso(-5000000);
                    cm.gainItem(4001126,-500); //300个枫叶
                    cm.gainItem(1122035,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链发出了充满力量的光芒.");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『苏醒的冒险之心』项链！得到了『觉醒的冒险之心』！！太不可思议了！")
                    cm.dispose();
                }else if (cm.haveItem(1122031, 1)&&cm.haveItem(4001126, 500)&&cm.haveItem(4000313, 1)&&(cm.getMeso() >= 5000000)){
                     cm.gainItem(1122031,-1);
                    cm.gainItem(4000313,-1);
                    cm.gainMeso(-5000000);
                    cm.gainItem(4001126,-500); //300个枫叶
                    cm.gainItem(1122036,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链发出了充满力量的光芒.");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『苏醒的冒险之心』项链！得到了『觉醒的冒险之心』！！太不可思议了！")
                    cm.dispose();
                }else if (cm.haveItem(1122032, 1)&&cm.haveItem(4001126, 500)&&cm.haveItem(4000313, 1)&&(cm.getMeso() >= 5000000)){
                     cm.gainItem(1122032,-1);
                    cm.gainItem(4000313,-1);
                    cm.gainMeso(-5000000);
                    cm.gainItem(4001126,-500); //300个枫叶
                    cm.gainItem(1122037,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链发出了充满力量的光芒.");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『苏醒的冒险之心』项链！得到了『觉醒的冒险之心』！！太不可思议了！")
                    cm.dispose();
                }else if (cm.haveItem(1122033, 1)&&cm.haveItem(4001126, 500)&&cm.haveItem(4000313, 1)&&(cm.getMeso() >= 5000000)){
                     cm.gainItem(1122033,-1);
                    cm.gainItem(4000313,-1);
                    cm.gainMeso(-5000000);
                    cm.gainItem(4001126,-500); //300个枫叶
                    cm.gainItem(1122038,1);
                    cm.sendOk("一道神秘的光芒照耀在项链上...你的项链发出了充满力量的光芒.");
                    cm.serverNotice("【薇薇安】玩家:" + cm.c.getPlayer().getName() + "进化了『苏醒的冒险之心』项链！得到了『觉醒的冒险之心』！！太不可思议了！")
                    cm.dispose();
                } else {
                    cm.sendOk("你的材料不够...最后一个阶段的力量很强大..我能理解你是个屌丝..但是我只认钱.."); 
                    cm.dispose();
                }
            }else if  (selection == 5) {
                cm.openNpc(9030100); 
            }else if  (selection == 6) {
                cm.sendOk("#b游戏模式为仿官方。传送都是按照官方的标准采取。想去天空之城/神木村/玩具城的玩家请去坐船。");
                cm.dispose();
            }else if  (selection == 7) {     
                cm.openNpc(1012103);  	     
            }else if  (selection == 8) {
                cm.openNpc(1052004);                  
            }else if  (selection == 9) {  
                var statup = new java.util.ArrayList();
                var p = cm.c.getPlayer();
                if(p.getExp() < 0){
                    p.setExp(0) 
                    statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.EXP, java.lang.Integer.valueOf(0))); 
                    p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
                    cm.sendOk("经验值已修复完成");
                    cm.dispose();
                }else{
                    cm.sendOk("您的经验值正常,无需修复!");
                    cm.dispose();
                }
            }        
        }
    }
}


