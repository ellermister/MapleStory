/*
枫叶换购点卷
*/

var 永恒金盾坠 = 1032031;//（耳饰） 
var 封印的永恒玉佩= 1122011;//（项链） 
var 永恒玉佩 = 1122012;//（项链） 
var 永恒不灭披风=1102172;//（披风） 
//战士 
//防具
var 永恒冠军盔 = 1002776;
var 永恒演武铠 = 1052155;
var 永恒坚壁靴 = 1072355;
var 永恒定边手套 = 1082234;
var 永恒寒冰盾 = 1092058;
//武器 
var 永恒破甲剑=1302081;
var 永恒断蚺斧=1312037;
var 永恒惊破天=1322060;
var 永恒玄冥剑=1402046;
var 永恒碎鼋斧=1412033;
var 永恒威震天=1422037;
var 永恒显圣枪=1432047;
var 永恒神光戟=1442063;
//魔法师 
//防具 
var 永恒玄妙帽=1002777;
var 永恒奥神袍=1052156;
var 永恒缥缈鞋=1072356;
var 永恒逍遥手套=1082235;
var 永恒魔光盾=1092057;
//武器 
var 永恒蝶翼杖=1372044;//（短杖） 
var 永恒冰轮杖=1382057;//（长杖） 
//弓箭手 
//防具 
var 永恒霓翎帽=1002778;
var 永恒巡礼者=1052157;
var 永恒彩虹鞋=1072357;
var 永恒白云手套=1082236;
//武器 
var 永恒惊电弓=1452057;
var 永恒冥雷弩=1462050;
//飞侠 
//防具 
var 永恒迷踪帽=1002779;
var 永恒翻云服=1052158;
var 永恒舞空靴=1072358;
var 永恒探云手套=1082237;
var 永恒匿踪盾=1092059;
//武器 
var 永恒狂鲨锯=1332073;//（力短刀） 
var 永恒断首刃=1332074;//（运短刀） 
var 永恒大悲赋=1472068;//（拳套） 
//海盗 
//防具 
var 永恒海王星=1002780;
var 永恒霸七海=1052159;
var 永恒定海靴=1072359;
var 永恒抚浪手套=1082238;
//武器 
var 永恒孔雀翎=1482023;//（拳甲） 
var 永恒凤凰铳=1492023;//（短枪） 
//腰带
var 不灭的法老腰带=1132013;
var 黑贺腰带=1132004;
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
            cm.sendSimple("在这里枫叶可以换购点卷/物品！\r\n#r兑换永恒套装的时候请把背包格子留15个以上！#k\r\n#r兑换永恒套装的时候请把背包格子留15个以上！#k\r\n#b#L0#300张#v4002001#兑换#v1122019##l\r\n\#L1#100张#v4002002#兑换#v1012077##l\r\n\#L2#300张#v4002002#1个#v1012077#20个#v4032056#兑换#v1012079##l#l\r\n\#L3#600张#v4002002#1个#v1012079#60个#v4032056#兑换#v1012078##l\r\n\#L4#1000张#v4002002#1个#v1012078#100个#v4032056#兑换#v1012076##l#k\r\n\#L5#300张#v4002003#兑换英雄永恒套装#l\r\n\#L6#300张#v4002003#兑换圣骑士永恒套装#l\r\n\#L7#300张#v4002003#兑换黑骑士永恒套装#l\r\n\#L8#300张#v4002003#兑换魔法师(短杖)永恒套装#l\r\n\#L9#300张#v4002003#兑换魔法师(长杖)永恒套装#l\r\n\#L10#300张#v4002003#兑换弓箭手永恒套装#l\r\n\#L11#300张#v4002003#兑换弩手永恒套装#l\r\n\#L12#300张#v4002003#兑换标飞永恒套装#l\r\n\#L13#300张#v4002003#兑换刀飞永恒套装#l\r\n\#L14#300张#v4002003#兑换船长永恒套装#l\r\n\#L15#300张#v4002003#兑换拳手永恒套装#l\r\n\#L16#300张#v4002003#兑换战神永恒套装#l\r\n\#L17#100张#v4002003##v4002001#兑换黑贺腰带#l\r\n\#L18#300张#v4002003##v4002001#兑换不灭的法老腰带#l");
        } else if (status == 1) {
            if (selection == 0) {
                if(cm.haveItem(4002001,300)){  //蜗牛邮票兑换冒险之心
                    cm.gainItem(1122019,1);
                    cm.gainItem(4002001,-300);
                    cm.sendOk("恭喜你成功！");
                    cm.dispose();
                }else{
                    cm.sendOk("你的邮票不足。");
                    cm.dispose();
                }
            } else if (selection == 1) { //木妖邮票兑换哭泣的假面HP+1000
                if(cm.haveItem(4002002,100)){
                    cm.gainItem(4002002,-100);
                    cm.gainItem(1012077,1);
                    cm.sendOk("恭喜你换购了哭脸。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 2) { //木妖邮票兑换郁闷的假面HP+2000 MP+1000
                if(cm.haveItem(4002002,300) && cm.haveItem(1012077,1) && cm.haveItem(4032056,20)){
                    cm.gainItem(4002002,-300);
                    cm.gainItem(4032056,-20);
                    cm.gainItem(1012077,-1);
                    cm.gainItem(1012079,1);
                    cm.sendOk("恭喜你换购了郁闷的假面。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票和一具哭泣假面或者枫叶珠");
                    cm.dispose();
                }
            } else if (selection == 3) { //木妖邮票兑换生气的假面HP+3500 MP+1500
                if(cm.haveItem(4002002,600) && cm.haveItem(1012079,1) && cm.haveItem(4032056,60)){
                    cm.gainItem(4002002,-600);
                    cm.gainItem(4032056,-60);
                    cm.gainItem(1012079,-1);
                    cm.gainItem(1012078,1);
                    cm.sendOk("恭喜你换购了生气的假面。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票和一具郁闷的假面或者枫叶珠");
                    cm.dispose();
                }
            } else if (selection == 4) { //木妖邮票兑换开心的假面HP+6000 MP+4500
                if(cm.haveItem(4002002,1000) && cm.haveItem(1012078,1) && cm.haveItem(4032056,100)){
                    cm.gainItem(4002002,-1000);
                    cm.gainItem(4032056,-100);
                    cm.gainItem(1012078,-1);
                    cm.gainItem(1012076,1);
                    cm.sendOk("恭喜你换购了开心的假面。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票和一具生气假面或者枫叶珠");
                    cm.dispose();
                }
            } else if (selection == 5) { //英雄永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒冠军盔,1);
                    cm.gainItem(永恒演武铠,1);
                    cm.gainItem(永恒坚壁靴,1);
                    cm.gainItem(永恒定边手套,1);
                    cm.gainItem(永恒寒冰盾,1);
                    cm.gainItem(永恒玄冥剑,1);
                    cm.sendOk("恭喜你换购了英雄永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 6) {//圣骑士永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒冠军盔,1);
                    cm.gainItem(永恒演武铠,1);
                    cm.gainItem(永恒坚壁靴,1);
                    cm.gainItem(永恒定边手套,1);
                    cm.gainItem(永恒寒冰盾,1);
                    cm.gainItem(永恒惊破天,1);
                    cm.sendOk("恭喜你换购了圣骑士永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 7) {//黑骑士永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒冠军盔,1);
                    cm.gainItem(永恒演武铠,1);
                    cm.gainItem(永恒坚壁靴,1);
                    cm.gainItem(永恒定边手套,1);
                    cm.gainItem(永恒显圣枪,1);
                    cm.sendOk("恭喜你换购了黑骑士永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 8) { //魔法师(短杖)永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒玄妙帽,1);
                    cm.gainItem(永恒奥神袍,1);
                    cm.gainItem(永恒缥缈鞋,1);
                    cm.gainItem(永恒逍遥手套,1);
                    cm.gainItem(永恒魔光盾,1);
                    cm.gainItem(永恒蝶翼杖,1);
                    cm.sendOk("恭喜你换购了魔法师(短杖)永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 9) { //魔法师(长杖)永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒玄妙帽,1);
                    cm.gainItem(永恒奥神袍,1);
                    cm.gainItem(永恒缥缈鞋,1);
                    cm.gainItem(永恒逍遥手套,1);
                    cm.gainItem(永恒魔光盾,1);
                    cm.gainItem(永恒冰轮杖,1);
                    cm.sendOk("恭喜你换购了魔法师(长杖)永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 10) { //弓箭手永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒霓翎帽,1);
                    cm.gainItem(永恒巡礼者,1);
                    cm.gainItem(永恒彩虹鞋,1);
                    cm.gainItem(永恒白云手套,1);
                    cm.gainItem(永恒惊电弓,1);
                    cm.sendOk("恭喜你换购了弓箭手永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 11) { //弩手永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒霓翎帽,1);
                    cm.gainItem(永恒巡礼者,1);
                    cm.gainItem(永恒彩虹鞋,1);
                    cm.gainItem(永恒白云手套,1);
                    cm.gainItem(永恒冥雷弩,1);
                    cm.sendOk("恭喜你换购了弩手永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 12) { //标飞永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒迷踪帽,1);
                    cm.gainItem(永恒翻云服,1);
                    cm.gainItem(永恒舞空靴,1);
                    cm.gainItem(永恒探云手套,1);
                    cm.gainItem(永恒大悲赋,1);
                    cm.sendOk("恭喜你换购了标飞永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 13) { //刀飞永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒迷踪帽,1);
                    cm.gainItem(永恒翻云服,1);
                    cm.gainItem(永恒舞空靴,1);
                    cm.gainItem(永恒探云手套,1);
                    cm.gainItem(永恒断首刃,1);
                    cm.sendOk("恭喜你换购了标飞永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 14) { //船长永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒海王星,1);
                    cm.gainItem(永恒霸七海,1);
                    cm.gainItem(永恒定海靴,1);
                    cm.gainItem(永恒抚浪手套,1);
                    cm.gainItem(永恒凤凰铳,1);
                    cm.sendOk("恭喜你换购了船长永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 15) { //拳手永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒海王星,1);
                    cm.gainItem(永恒霸七海,1);
                    cm.gainItem(永恒定海靴,1);
                    cm.gainItem(永恒抚浪手套,1);
                    cm.gainItem(永恒孔雀翎,1);
                    cm.sendOk("恭喜你换购了拳手永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 16) { //战神永恒套装
                if(cm.haveItem(4002003,300)){
                    cm.gainItem(4002003,-300);
                    cm.gainItem(永恒金盾坠,1);
                    //cm.gainItem(封印的永恒玉佩,1);
                    cm.gainItem(永恒玉佩,1);
                    cm.gainItem(永恒不灭披风,1);
                    
                    cm.gainItem(永恒冠军盔,1);
                    cm.gainItem(永恒演武铠,1);
                    cm.gainItem(永恒坚壁靴,1);
                    cm.gainItem(永恒定边手套,1);
                    cm.gainItem(永恒神光戟,1);
                    cm.sendOk("恭喜你换购了战神永恒套装。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 17) { //黑贺腰带
                if(cm.haveItem(4002003,100) && cm.haveItem(4002001,100)){
                    cm.gainItem(4002003,-100);
                    cm.gainItem(4002001,-100);
                    cm.gainItem(黑贺腰带,1);
                    cm.sendOk("恭喜你换购了黑贺腰带。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } else if (selection == 18) { //不灭的法老腰带
                if(cm.haveItem(4002003,100) && cm.haveItem(4002001,100)){
                    cm.gainItem(4002003,-100);
                    cm.gainItem(4002001,-100);
                    cm.gainItem(不灭的法老腰带,1);
                    cm.sendOk("恭喜你换购了不灭的法老腰带。");
                    cm.dispose();
                }else{
                    cm.sendOk("你没有搜集到足够的邮票");
                    cm.dispose();
                }
            } 
        }
    }
}


