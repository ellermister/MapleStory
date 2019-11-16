/*
 * 
 * @雪之恋冒险
 * @换购勋章 - 枫叶
 */


importPackage(net.sf.cherry.client);

var status = 0;
var zones = 0;
var ItemId =Array(
                                                                         //Array(142000,500,"诚实的冒险家勋章"), //第一个是物品ID  第二个是需要的枫叶数量。可自行修改。
                                                                 	 Array(1142001,200,"组队任务狂人勋章"),
									 Array(1142002,200,"任务狂人勋章"),
									 Array(1142003,220,"超人气王勋章"),
									 Array(1142004,300,"勤奋冒险家勋章"),
                                                                         Array(1142005,400,"传说中的冒险家勋章"),
                                                                         Array(1142006,500,"冒险岛偶像勋章"),
                                                                         Array(1142014,500,"射手村爱心勋章"),
                                                                         Array(1142015,500,"魔法密林爱心使者勋章"),
                                                                         Array(1142016,500,"勇士部落爱心使者勋章"),
                                                                         Array(1142017,500,"废弃都市爱心使者勋章"),
                                                                         Array(1142018,500,"林中之城爱心使者勋章"),
                                                                         Array(1142019,500,"诺特勒斯爱心使者勋章"),
                                                                         Array(1142020,500,"诺特勒斯爱心使者勋章"),
                                                                         Array(1142021,500,"水下世界爱心使者勋章"),
                                                                         Array(1142022,500,"水下世界爱心使者勋章"),
                                                                         Array(1142023,500,"地球防御本部爱心使者勋章"),
                                                                         Array(1142024,500,"童话村爱心使者勋章"),
                                                                         Array(1142025,800,"神木村爱心使者勋章"),
                                                                         Array(1142026,500,"武陵爱心使者勋章"),
                                                                         Array(1142027,800,"百草堂爱心使者勋章"),
                                                                         Array(1142077,800,"嘉年华天才勋章"),
                                                                         Array(1142078,500,"武陵爱心使者勋章"),
                                                                         Array(1142080,800," 嘉年华热血勋章"),
                                                                         Array(1142173,800,"冒险岛设计师勋章"),
                                                                         Array(1142175,800,"冒险岛漫画家勋章"),
                                                                         Array(1142176,500,"冒险岛文学家勋章"),
                                                                         Array(1142179,5000," 王座收藏家勋章")
									 //如需其它道具兑换，请按照此格式自行添置。
);

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
			if(cm.getBossLog('MogoQuest') < 1 ){
			 cm.sendNext("您好！#r " + cm.getPlayer().getName() + "#k 您可以帮我个忙吗?");
			 zones = 1;
			}else if(!cm.haveItem(4001126) || !cm.haveItem(4001126,50)){
					if(!cm.haveItem(4001126)){
						cm.sendOk("您什么时候去帮我打收集一些枫叶来啊！");
						cm.dispose()
					}else{
						cm.sendOk("这么一点点不够啊,你能不能帮我多找一些来!");
						cm.dispose();
					}
			}else{
				StringS = "哇!您帮我集了这么多枫叶,你想要什么报酬呢? 请选择您需要兑换的道具";
				for (var i = 0; i < ItemId.length; i++){
					StringS += "\r\n#L" + i + "##b#z" + ItemId[i][0] + "##k (需要#r " + ItemId[i][1] + " #k个  #d#z4001126##k)";
				}
				cm.sendSimple(StringS);	
				zones == 0;
			}
		} else if (status == 1) {
			if(zones == 1){
				cm.sendNext("你让我帮你做什么呢？",2);
				zones = 2;
			}else if(zones ==0){
				if (cm.getPlayer().getItemQuantity(4001126,false) >= ItemId[selection][1]){				
					cm.gainItem(ItemId[selection][0],1);
					cm.gainItem(4001126,-(ItemId[selection][1]));
					cm.sendOk("兑换成功，请检背包!");
					cm.dispose();
				}else{
					cm.sendOk("您没有足够的枫叶水晶球#v4032056#用于兑换");
					cm.dispose();
				}
			}
		}else if (status == 2){
			if(zones == 2){
				cm.sendNext("我用于提升我魔法的枫叶被一群蘑菇妖偷走了,你能帮去抢回来吗？");
				zones = 3;
			}
		}else if(status == 3){
			if(zones ==3){
					cm.sendNext("行,这个没问题？你告诉我那些偷了你枫叶的蘑菇妖现在在什么地方呢?",2);
					zones = 4;
			}
		}else if(status == 4){
			if(zones == 4){
				cm.sendNext("这个物品是#b全世界掉落#k的。你可以在世界上的#b任何一个怪物#k上获取！");
				zones = 5;
			}
		}else if(status == 5){
			if(zones == 5){
				cm.sendYesNo("如果你能帮我这个大忙的话,我会给你一些丰厚的奖励的，您是否愿意帮我？");
			}
		}else if(status == 6){
			cm.setBossLog('MogoQuest');
			cm.gainItem(5220001,1);
			cm.sendOk("非常感谢！获得后和我说话，就能换购物品了！");
			cm.dispose();
		}
	}
}	
