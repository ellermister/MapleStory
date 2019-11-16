/*
*   [Vr001 封测版服务端Ver079仿官方版]
*   [NpcID      -      90000021]
*   [Npc名字    -          佳佳] 
*   [Npc所在地图-      所有城市]
*/
var status = 0; 
  
function start() { 
status = -1; 
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
if (status == 0) { 
  
cm.sendSimple("#d嗯.....哦.....小弟..你有道灵光从天灵盖喷出来你知道吗..年纪轻轻就有一身横练的筋骨.简直百年一见的练武奇才啊!如果你完成了我的试炼任务.那你还不飞龙上天啊!正所谓我不入地狱谁入地狱,维护世界和平的任务就委托给你了!我这里有为你准备的试炼任务,完成这些任务后才能足够证明你的资格..先天只是垫脚石..真正怎么走还是要看你的实力..想不想接受我的试炼呢?\r\n#rPS：试炼只能一个接一个的完成下去哦!请确保背包保留了足够的空间哦!#d\r\n: \r\n#L4# 查看该试炼说明\r\n#L1# 接受试炼① \r\n#L2# 接受试炼② \r\n#L3# 接受试炼③ "); 
} else if (status == 1) {   //第一个任务 
if (selection == 1) { 
if ((cm.haveItem(4001126, 300) && (cm.haveItem(4031456,30)))) {   //检测物品
for(var i = 1;i<=5;i++){
if(cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(i)).isFull()){
cm.sendOk("您至少应该让所有包裹都空出2格");
cm.dispose();
return;
}
}
cm.gainItem(4001126, -300); 
cm.gainItem(4031456, -30);
cm.gainItem(4031225, 1); //任务必需品
cm.gainItem(5220040, 5); //飞天猪的蛋
cm.gainItem(2049100, 1); //混沌
cm.sendOk("#r恩...收集好了？这只是初步的鉴定实力..好吧..#v4031225#这个给你..这个是你接受下一项任务的凭据..别弄丢了."); 
cm.dispose(); 
} else { 
cm.sendOk("#b啊...你接受第一个任务..这个任务很简单..请给我收集以下物品给我!\r\n#v4001126# 300个\r\n#v4031456# 30个！(废弃都市组队副本中获得！)\r\n完成后开始开始下一项任务！\r\n奖励物品：\r\n#v5220040#5个\r\n#v2049100#1张"); cm.dispose(); 
} 
} else if (selection == 2) {  //第二个任务
if (cm.itemQuantity(4031225) >= 1) {  
if ((cm.haveItem(4000313,30)) && (cm.haveItem(4001126, 500))) { 
for(var i = 1;i<=5;i++){
if(cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(i)).isFull()){
cm.sendOk("您至少应该让所有包裹都空出2格");
cm.dispose();
return;
}
}
cm.sendOk("#r啊...第二个试炼也完成了..不错啊！看来我低估你的实力了..接下来的第三个试炼不知道你能不能完成.."); 
cm.gainItem(4000313, -30); 
cm.gainItem(4001126, -500); 
cm.gainItem(4031018, 1); //任务必需品
cm.gainItem(2049100, 5); //混沌
cm.gainItem(5390001, 10); //绚烂情景喇叭
cm.dispose(); 
} else{ 
cm.sendOk("#g你接受第二个试炼...真有勇气..这个貌似有些难度..但是你的实力必须接受这一个关卡..准备好了吗...这个试炼需要你收集以下物品：\r\n#v4000313# 30个.(玩具城组队副本中获得！)\r\n#v4001126# 500个.\r\n奖励物品：\r\n#v2049100#5张\r\n#v5390001#10个"); 
cm.dispose(); 
} 
  
} else{ cm.sendOk("#e完成试炼1先吧.."); 
cm.dispose(); 
} 
  
} else if (status == 3) { 
} else if (selection == 3 && cm.itemQuantity(4031018) >= 1) { 
if (cm.getBossLog('renwu') < 1){ 
if ((cm.haveItem(4031018, 1)) && (cm.haveItem(4001083, 1)) && (cm.haveItem(4001084, 1)) && (cm.haveItem(4001085, 1)) && (cm.haveItem(4001126, 800)) && (cm.haveItem(4000313,30)) && (cm.haveItem(4031456, 100))) { 
for(var i = 1;i<=5;i++){
if(cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(i)).isFull()){
cm.sendOk("您至少应该让所有包裹都空出2格");
cm.dispose();
return;
}
}
cm.sendOk("#r啊呀...没想到你这么厉害..这些试炼都被你完成了!!!接下来我给你这个神秘力量的物品..你拿着它可以去找一个神秘的人!!你获得了证明#v4140301#请妥善保管!!好了..去寻找神秘人吧!!"); 
cm.gainItem(4001083, -1); 
cm.gainItem(4001084, -1); 
cm.gainItem(4001085, -1); 
cm.gainItem(4031018, -1);
cm.gainItem(4001126, -800); 
cm.gainItem(4000313, -30); 
cm.gainItem(4031456, -100);
cm.gainItem(4140301, 1); 
cm.gainItem(2340000, 1); //祝福卷轴
cm.gainItem(2049100, 5); //混沌
cm.gainItem(5220040, 10);//飞天猪的蛋
cm.gainItem(5390006, 5); //咆哮老虎情景喇叭
cm.serverNotice("『来自天空的声音』：玩家"+ cm.getChar().getName() +"，完成了佳佳的试炼.得到了[星星气息]..获得了必成卷轴兑换资格！"); 
cm.dispose(); 
} else{ 
//cm.sendOk("#k啊呀...你已经完成了前面2个试炼的任务..现在第三个试炼的任务比较有难度..也是最后一个试炼..请你收集以下物品给我：\r\n#v4001083# 1个\r\n#v4001084# 1个\r\n#v4001085# 1个\r\n#v4001126# 800个\r\n#v4000313# 30个\r\n#v4031456# 30个.\r\n奖励物品：\r\n#v2049100#5张\r\n#v5220040#10个\r\n#v5390006#5个\r\n#v4140301#1个\r\n#v2340000#1个"); 
cm.dispose(); 
} 

} else { 
cm.sendOk("嗯哈...."); 
mode = 1; 
status = -1; 
} 
} else{ 
cm.sendOk("这是一个可以获得资格的试炼.玩家通过打怪来证明自己的实力..用怪物掉落的道具来证明自己可以胜任的必须条件..通过我,你可以获得凭证..然后找到一个神秘的人来使用..首先要注意的是,该试炼必须要让背包保留足够的空间..不然会导致无法获得物品..以及试炼任务必须一个接着一个做.无法跳跃任务!!"); 
mode = 1; 
status = -1; 
} 
} 
} 
} 
