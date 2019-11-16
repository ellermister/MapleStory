
importPackage(net.sf.odinms.server.maps); 

var a = 0;
var Text = "#b#e想把老公老婆戒指升到什么境界?#r\r\n重点提示:#L51#升级说明#d\r\n#L2##v1112446#老公老婆戒指LV2\r\n#L3##v1112446#老公老婆戒指LV3\r\n#L4##v1112446#老公老婆戒指LV4\r\n#L5##v1112446#老公老婆戒指LV5\r\n#L6##v1112446#老公老婆戒指LV6\r\n#L7##v1112446#老公老婆戒指LV7\r\n#L8##v1112446#老公老婆戒指LV8\r\n#L9##v1112446#老公老婆戒指LV9\r\n#L10##v1112446#老公老婆戒指LV10\r\n#L11##v1112446#老公老婆戒指LV11\r\n#L12##v1112446#老公老婆戒指LV12\r\n#L13##v1112446#老公老婆戒指LV13\r\n#L14##v1112446#老公老婆戒指LV14\r\n#L15##v1112446#老公老婆戒指LV15\r\n#L16##v1112446#老公老婆戒指LV16\r\n#L17##v1112446#老公老婆戒指LV17\r\n#L18##v1112446#老公老婆戒指LV18\r\n#L19##v1112446#老公老婆戒指LV19\r\n#L20##v1112446#老公老婆戒指LV20\r\n#L21##v1112446#老公老婆戒指LV21\r\n#L22##v1112446#老公老婆戒指LV22\r\n#L23##v1112446#老公老婆戒指LV23\r\n#L24##v1112446#老公老婆戒指LV24\r\n#L25##v1112446#老公老婆戒指LV25\r\n#L26##v1112446#老公老婆戒指LV26\r\n#L27##v1112446#老公老婆戒指LV27\r\n#L28##v1112446#老公老婆戒指LV28\r\n#L29##v1112446#老公老婆戒指LV29\r\n#L30##v1112446#老公老婆戒指LV30\r\n#L31##v1112446#老公老婆戒指LV31\r\n#L32##v1112446#老公老婆戒指LV32\r\n#L33##v1112446#老公老婆戒指LV33\r\n#L34##v1112446#老公老婆戒指LV34\r\n#L35##v1112446#老公老婆戒指LV35\r\n#L36##v1112446#老公老婆戒指LV36\r\n#L37##v1112446#老公老婆戒指LV37\r\n#L38##v1112446#老公老婆戒指LV38\r\n#L39##v1112446#老公老婆戒指LV39\r\n#L40##v1112446#老公老婆戒指LV40\r\n#L41##v1112446#老公老婆戒指LV41\r\n#L42##v1112446#老公老婆戒指LV42\r\n#L43##v1112446#老公老婆戒指LV43\r\n#L44##v1112446#老公老婆戒指LV44\r\n#L45##v1112446#老公老婆戒指LV45\r\n#L46##v1112446#老公老婆戒指LV46\r\n#L47##v1112446#老公老婆戒指LV47\r\n#L48##v1112446#老公老婆戒指LV48\r\n#L49##v1112446#老公老婆戒指LV49\r\n#L50##v1112446#老公老婆戒指LV50";
var db;
var time;

function start() {
	a = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			a++;
		else
			a--;
			if (a == -1){
				cm.dispose();
			        }else if (a == 0) {
							 a = 0;
cm.sendSimple(Text);		
			}else if (a == 1){
			if (selection == 1) {
                cm.sendOk("#b升级错误:#k\r\n#i1112446##t1112446#通过点卷商城或任务等其它渠道获得");
                    cm.dispose();
		}else if (selection == 51){
                cm.sendOk("#b升级说明:#k\r\n1.#z4001322#通关副本可以获得！\r\n2.\r\n1-10级老公老婆需要#v4001322##z4001322#x10\r\n11-20级老公老婆需要#v4001322##z4001322#x20\r\n21-30级老公老婆需要#v4001322##z4001322#x30\r\n30-50级老公老婆需要#v4001322##z4001322#x50\r\n\r\n3.每一个等级的老公老婆戒指只允许带一个！");
                    cm.dispose();
		}else if (selection == 2){
if (!cm.canHold(1112447, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112446) >=1 && cm.itemQuantity(4001322) >=10){
cm.gainItem(1112446,-1);
cm.gainItem(4001322,-10);
cm.gainItem(1112447,1);
cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV2了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足10个或者无老公老婆戒指LV1")
cm.dispose();
}
		}else if (selection == 3){
if (!cm.canHold(1112448, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112447) >=1 && cm.itemQuantity(4001322) >=10){
cm.gainItem(1112447,-1);
cm.gainItem(4001322,-10);
cm.gainItem(1112448,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV3了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足10个或者无老公老婆戒指LV2")
cm.dispose();
}
		}else if (selection == 4){
if (!cm.canHold(1112449, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112448) >=1 && cm.itemQuantity(4001322) >=10){
cm.gainItem(1112448,-1);
cm.gainItem(4001322,-10);
cm.gainItem(1112449,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV4了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足10个或者无老公老婆戒指LV3")
cm.dispose();
}
		}else if (selection == 5){
if (!cm.canHold(1112450, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112449) >=1 && cm.itemQuantity(4001322) >=10){
cm.gainItem(1112449,-1);
cm.gainItem(4001322,-10);
cm.gainItem(1112450,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV5了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足10个或者无老公老婆戒指LV4")
cm.dispose();
}
		}else if (selection == 6){
if (!cm.canHold(1112451, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112450) >=1 && cm.itemQuantity(4001322) >=10){
cm.gainItem(1112450,-1);
cm.gainItem(4001322,-10);
cm.gainItem(1112451,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV6了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足10个或者无老公老婆戒指LV5")
cm.dispose();
}
		}else if (selection == 7){
if (!cm.canHold(1112452, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112451) >=1 && cm.itemQuantity(4001322) >=10){
cm.gainItem(1112451,-1);
cm.gainItem(4001322,-10);
cm.gainItem(1112452,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV7了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足10个或者无老公老婆戒指LV6")
cm.dispose();
}
		}else if (selection == 8){
if (!cm.canHold(1112453, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112452) >=1 && cm.itemQuantity(4001322) >=10){
cm.gainItem(1112452,-1);
cm.gainItem(4001322,-10);
cm.gainItem(1112453,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV8了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足10个或者无老公老婆戒指LV7")
cm.dispose();
}
		}else if (selection == 9){
if (!cm.canHold(1112454, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112453) >=1 && cm.itemQuantity(4001322) >=10){
cm.gainItem(1112453,-1);
cm.gainItem(4001322,-10);
cm.gainItem(1112454,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV9了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足10个或者无老公老婆戒指LV8")
cm.dispose();
}
		}else if (selection == 10){
if (!cm.canHold(1112455, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112454) >=1 && cm.itemQuantity(4001322) >=10){
cm.gainItem(1112454,-1);
cm.gainItem(4001322,-10);
cm.gainItem(1112455,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV10了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足10个或者无老公老婆戒指LV9")
cm.dispose();
}
		}else if (selection == 11){
if (!cm.canHold(1112456, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112455) >=1 && cm.itemQuantity(4001322) >=20){
cm.gainItem(1112455,-1);
cm.gainItem(4001322,-20);
cm.gainItem(1112456,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV11了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足20个或者无老公老婆戒指LV10")
cm.dispose();
}
		}else if (selection == 12){
if (!cm.canHold(1112457, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112456) >=1 && cm.itemQuantity(4001322) >=20){
cm.gainItem(1112456,-1);
cm.gainItem(4001322,-20);
cm.gainItem(1112457,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV12了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足20个或者无老公老婆戒指LV11")
cm.dispose();
}
		}else if (selection == 13){
if (!cm.canHold(1112458, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112457) >=1 && cm.itemQuantity(4001322) >=20){
cm.gainItem(1112457,-1);
cm.gainItem(4001322,-20);
cm.gainItem(1112458,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV13了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足20个或者无老公老婆戒指LV12")
cm.dispose();
}
		}else if (selection == 14){
if (!cm.canHold(1112459, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112458) >=1 && cm.itemQuantity(4001322) >=20){
cm.gainItem(1112458,-1);
cm.gainItem(4001322,-20);
cm.gainItem(1112459,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV14了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足20个或者无老公老婆戒指LV13")
cm.dispose();
}
		}else if (selection == 15){
if (!cm.canHold(1112460, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112459) >=1 && cm.itemQuantity(4001322) >=20){
cm.gainItem(1112459,-1);
cm.gainItem(4001322,-20);
cm.gainItem(1112460,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV15了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足20个或者无老公老婆戒指LV14")
cm.dispose();
}
		}else if (selection == 16){
if (!cm.canHold(1112461, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112460) >=1 && cm.itemQuantity(4001322) >=20){
cm.gainItem(1112460,-1);
cm.gainItem(4001322,-20);
cm.gainItem(1112461,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV16了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足20个或者无老公老婆戒指LV15")
cm.dispose();
}
		}else if (selection == 17){
if (!cm.canHold(1112462, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112461) >=1 && cm.itemQuantity(4001322) >=20){
cm.gainItem(1112461,-1);
cm.gainItem(4001322,-20);
cm.gainItem(1112462,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV17了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足20个或者无老公老婆戒指LV16")
cm.dispose();
}
		}else if (selection == 18){
if (!cm.canHold(1112463, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112462) >=1 && cm.itemQuantity(4001322) >=20){
cm.gainItem(1112462,-1);
cm.gainItem(4001322,-20);
cm.gainItem(1112463,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV18了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足20个或者无老公老婆戒指LV17")
cm.dispose();
}
		}else if (selection == 19){
if (!cm.canHold(1112464, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112463) >=1 && cm.itemQuantity(4001322) >=20){
cm.gainItem(1112463,-1);
cm.gainItem(4001322,-20);
cm.gainItem(1112464,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV19了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足20个或者无老公老婆戒指LV18")
cm.dispose();
}
		}else if (selection == 20){
if (!cm.canHold(1112465, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112464) >=1 && cm.itemQuantity(4001322) >=20){
cm.gainItem(1112464,-1);
cm.gainItem(4001322,-20);
cm.gainItem(1112465,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV20了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足20个或者无老公老婆戒指LV19")
cm.dispose();
}
		}else if (selection == 21){
if (!cm.canHold(1112466, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112465) >=1 && cm.itemQuantity(4001322) >=30){
cm.gainItem(1112465,-1);
cm.gainItem(4001322,-30);
cm.gainItem(1112466,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV21了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足30个或者无老公老婆戒指LV20")
cm.dispose();
}
		}else if (selection == 22){
if (!cm.canHold(1112467, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112466) >=1 && cm.itemQuantity(4001322) >=30){
cm.gainItem(1112466,-1);
cm.gainItem(4001322,-30);
cm.gainItem(1112467,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV22了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足30个或者无老公老婆戒指LV21")
cm.dispose();
}
		}else if (selection == 23){
if (!cm.canHold(1112468, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112467) >=1 && cm.itemQuantity(4001322) >=30){
cm.gainItem(1112467,-1);
cm.gainItem(4001322,-30);
cm.gainItem(1112468,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV23了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足30个或者无老公老婆戒指LV22")
cm.dispose();
}
		}else if (selection == 24){
if (!cm.canHold(1112469, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112468) >=1 && cm.itemQuantity(4001322) >=30){
cm.gainItem(1112468,-1);
cm.gainItem(4001322,-30);
cm.gainItem(1112469,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV24了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足30个或者无老公老婆戒指LV23")
cm.dispose();
}
		}else if (selection == 25){
if (!cm.canHold(1112470, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112469) >=1 && cm.itemQuantity(4001322) >=30){
cm.gainItem(1112469,-1);
cm.gainItem(4001322,-30);
cm.gainItem(1112470,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV25了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足30个或者无老公老婆戒指LV24")
cm.dispose();
}
		}else if (selection == 26){
if (!cm.canHold(1112471, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112470) >=1 && cm.itemQuantity(4001322) >=30){
cm.gainItem(1112470,-1);
cm.gainItem(4001322,-30);
cm.gainItem(1112471,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV26了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足30个或者无老公老婆戒指LV25")
cm.dispose();
}
		}else if (selection == 27){
if (!cm.canHold(1112472, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112471) >=1 && cm.itemQuantity(4001322) >=30){
cm.gainItem(1112471,-1);
cm.gainItem(4001322,-30);
cm.gainItem(1112472,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV27了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足30个或者无老公老婆戒指LV26")
cm.dispose();
}
		}else if (selection == 28){
if (!cm.canHold(1112473, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112472) >=1 && cm.itemQuantity(4001322) >=30){
cm.gainItem(1112472,-1);
cm.gainItem(4001322,-30);
cm.gainItem(1112473,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV28了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足30个或者无老公老婆戒指LV27")
cm.dispose();
}
		}else if (selection == 29){
if (!cm.canHold(1112474, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112473) >=1 && cm.itemQuantity(4001322) >=30){
cm.gainItem(1112473,-1);
cm.gainItem(4001322,-30);
cm.gainItem(1112474,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV29了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足30个或者无老公老婆戒指LV28")
cm.dispose();
}
		}else if (selection == 30){
if (!cm.canHold(1112475, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112474) >=1 && cm.itemQuantity(4001322) >=30){
cm.gainItem(1112474,-1);
cm.gainItem(4001322,-30);
cm.gainItem(1112475,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV30了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足30个或者无老公老婆戒指LV29")
cm.dispose();
}
		}else if (selection == 31){
if (!cm.canHold(1112476, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112475) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112475,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112476,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV31了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV30")
cm.dispose();
}
		}else if (selection == 32){
if (!cm.canHold(1112477, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112476) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112476,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112477,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV32了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV31")
cm.dispose();
}
		}else if (selection == 33){
if (!cm.canHold(1112478, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112477) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112477,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112478,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV33了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV32")
cm.dispose();
}
		}else if (selection == 34){
if (!cm.canHold(1112479, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112478) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112478,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112479,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV34了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV33")
cm.dispose();
}
		}else if (selection == 35){
if (!cm.canHold(1112480, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112479) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112479,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112480,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV35了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV34")
cm.dispose();
}
		}else if (selection == 36){
if (!cm.canHold(1112481, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112480) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112480,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112481,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV36了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV35")
cm.dispose();
}
		}else if (selection == 37){
if (!cm.canHold(1112482, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112481) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112481,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112482,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV37了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV36")
cm.dispose();
}
		}else if (selection == 38){
if (!cm.canHold(1112483, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112482) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112482,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112483,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV38了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV37")
cm.dispose();
}
		}else if (selection == 39){
if (!cm.canHold(1112484, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112483) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112483,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112484,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV39了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV38")
cm.dispose();
}
		}else if (selection == 40){
if (!cm.canHold(1112485, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112484) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112484,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112485,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV40了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV39")
cm.dispose();
}
		}else if (selection == 41){
if (!cm.canHold(1112486, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112485) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112485,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112486,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV41了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV40")
cm.dispose();
}
		}else if (selection == 42){
if (!cm.canHold(1112487, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112486) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112486,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112487,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV42了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV41")
cm.dispose();
}
		}else if (selection == 43){
if (!cm.canHold(1112488, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112487) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112487,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112488,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV43了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV42")
cm.dispose();
}
		}else if (selection == 44){
if (!cm.canHold(1112489, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112488) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112488,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112489,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV44了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV43")
cm.dispose();
}
		}else if (selection == 45){
if (!cm.canHold(1112490, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112489) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112489,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112490,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV45了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV44")
cm.dispose();
}
		}else if (selection == 46){
if (!cm.canHold(1112491, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112490) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112490,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112491,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV46了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV45")
cm.dispose();
}
		}else if (selection == 47){
if (!cm.canHold(1112492, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112491) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112491,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112492,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV47了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV46")
cm.dispose();
}
		}else if (selection == 48){
if (!cm.canHold(1112493, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112492) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112492,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112493,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV48了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV47")
cm.dispose();
}
		}else if (selection == 49){
if (!cm.canHold(1112494, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112493) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112493,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112494,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV49了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV48")
cm.dispose();
}
		}else if (selection == 50){
if (!cm.canHold(1112495, 1)) {
cm.sendOk("您的包裹空间不足.或者你已经有一个同等级的戒指，无法继续合成！");
cm.dispose();
} else if (cm.itemQuantity(1112494) >=1 && cm.itemQuantity(4001322) >=50){
cm.gainItem(1112494,-1);
cm.gainItem(4001322,-50);
cm.gainItem(1112495,1);
	cm.sendNext("#b升级提示:#r\r\n老公老婆戒指LV50了，恭喜你！")
cm.dispose();
}else{
cm.sendOk("#b升级提示:#d\r\n1.检测#z4001322#不足50个或者无老公老婆戒指LV49")
cm.dispose();
}
            }
        } 
    } 
}