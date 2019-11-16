//CherryMS LoveMXD
//周末集市中介商人
var status = 0;
var xiangliao = 1000;
var jinianpin = 1500;
var kaomanyu = 2000;
var shayu = 3000;
var wuya = 1500;
var mesos1 = "+cm.itemQuantity(3994090)+";
var mainmenu = "我是中介商人#p9209000#，你可以出售你在集市里面买的货物\r\n\r\n#b#L0#出售物品\r\n#L1#你有什么烦恼吗？#k";
var menu = "选择你要出售的商品\r\n\r\n#b#L0##i3994090#■香料(实时价"+xiangliao+"元) \r\n#L1##i3994091#■泰国纪念品(实时价"+jinianpin+"元) \r\n#L2##i3994092#■烤鳗鱼(实时价"+kaomanyu+"元)\r\n#L3##i3994093#■鲨鱼标本(实时价"+shayu+"元)\r\n#L4##i3994094#■乌鸦羽毛帽("+wuya+")元"
var menu1 = "#b\r\n#L0#嗯，我想帮你"

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 0 && mode == 0) {
		cm.dispose();
		return;
	} else if (status == 2 && mode == 0) {
		cm.sendNext("嗯。。如果你有什么事情可以来找我。我会在这里等你。");
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendSimple(mainmenu);
	} else if (status == 1) {
		if (selection == 0) { // 出售物品
			status = 7;
			cm.sendNext("嗯。。让我看看你有什么东西。。。");
		} else if (selection == 1) { // 你有什么烦恼吗？
                                         if (cm.MissionStatus(9209000,999,0,4)) {//检查是否接过了任务
                                         if (cm.MissionStatus(9209000,999,0,0)) {//检查是否完成了任务
                                         cm.sendOk("嘿嘿，我送给你的东西还好吧。。")
                                         }else if(cm.haveItem(4000021,100) && cm.haveItem(4000017,10) && cm.haveItem(4000002,100)){//动物皮100个，猪头10个，蝴蝶结
                                         cm.sendOk("哇。。！！！你拿来我需要的东西了吗！！哈哈！我可以好好去交差了！！为了报答你！我决定给你一个礼物！猜猜看是什么吧！！")
                                         var rand = Math.floor(Math.random() * 5);
                                                        if (rand == 1){ 
                                                        cm.gainItem(4290000,1)
                                                        }else{
                                                        cm.gainItem(4290001,1)
                                                        }
}else{
cm.sendOk("你还没拿来100个动物皮、10个猪头、100个蝴蝶结吗？？？怎么办。。顾客追究起来怎么办！。。我居然会把这么贵重的东西给弄丢了！！")
}
}else{
status == 6;
cm.sendNext("我不说。。。")
}
		}
	} else if (status == 2) { // 你有什么烦恼吗2
		 if (cm.MissionStatus(9209000,999,0,4)) {//检查是否接过了任务
                            cm.dispose;
                            }else{
		cm.sendNextPrev("什么？你问我为什么不说？");
}
	} else if (status == 3) { //你有什么烦恼吗3
		cm.sendNextPrev("算了。。你应该会帮我吧。。如果帮我的话我还可以给你好玩的东西。。你想想帮我吗？");
	} else if (status == 4) {//你有什么烦恼吗4
		status = 4;
		cm.sendSimple(menu1);
	} else if (status == 5) { // 我帮你
		cm.sendNext("遇到一个好人了！！如果你帮我我会给我我喜爱的东西！！\r\n其实事情是这样的。。");
	} else if (status == 6) { // 我帮你2
		cm.sendNextPrev("其实，在很久以前，我来到冒险岛的途中，把客人交代给我的东西给弄丢了。。那些东西很难收集的。。一筹莫展不知道该怎么办。。丢的东西形状是这样的:\r\n\r\n#i4000021#，#i4000017#，#i4000002#\r\n\r\n\r\n这三样东西。。第一个是100个，第二个是10个，第三个也是100个。因为最近冒险岛人流比较多。。所以我不能走开。我就把这项任务交给你了！希望你能完成。");
                            cm.MissionMake(9209000,999,0,0,0);
	} else if (status == 7) {
		cm.dispose;
	} else if (status == 8) { // 出售物品
		cm.sendSimple(menu);
	} else if (status == 9) { // 出售物品
		if (selection == 0) { // 出售物品
                            if (cm.haveItem(3994090)){
                            cm.gainItem(3994090,-1)
                            cm.gainMeso(xiangliao)
                            cm.sendOk("兑换成功！请检查您的金币。")
                            cm.dispose;
}else{
cm.sendOk("对不起，你没有香料。")
                            cm.dispose;
}
                            }else if(selection == 1){
                            if (cm.haveItem(3994091)){
                            cm.gainItem(3994091,-1)
                            cm.gainMeso(jinianpin)
                            cm.sendOk("兑换成功！请检查您的金币。")
                            cm.dispose;
}else{
cm.sendOk("对不起，你没有泰国纪念品。")
                            cm.dispose;
}
}else if(selection == 2){
                            if (cm.haveItem(3994092)){
                            cm.gainItem(3994092,-1)
                            cm.gainMeso(kaomanyu)
                            cm.sendOk("兑换成功！请检查您的金币。")
                            cm.dispose;
}else{
cm.sendOk("对不起，你没有烤鳗鱼。")
                            cm.dispose;
}
}else if(selection == 3){
                            if (cm.haveItem(3994093)){
                            cm.gainItem(3994093,-1)
                            cm.gainMeso(shayu)
                            cm.sendOk("兑换成功！请检查您的金币。")
                            cm.dispose;
}else{
cm.sendOk("对不起，你没有鲨鱼标本。")
                            cm.dispose;
}
}else if(selection == 4){
                            if (cm.haveItem(3994094)){
                            cm.gainItem(3994094,-1)
                            cm.gainMeso(wuya)
                            cm.sendOk("兑换成功！请检查您的金币。")
                            cm.dispose;
}else{
cm.sendOk("对不起，你没有乌鸦羽毛帽。")
                            cm.dispose;
}
}
	} 
	}
}
