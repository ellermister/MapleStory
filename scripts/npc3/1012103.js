
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30470, 30450, 30410, 30400, 30100, 30110, 30140, 30200, 30020, 30000, 30310, 30330, 30050, 30060, 30150, 30210, 30140, 30120, 30560, 30510, 30610);
var fhair = Array(31740, 31700, 31150, 31310, 31160, 31300, 31050, 31610, 31040, 31350, 31100, 31200, 31210, 31260, 31510, 31330, 31410, 31030, 31020, 31080, 31000);
var hairnew = Array();

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
			cm.sendSimple("你好,我是射手村人见人爱的射手村店长!如果你有#b射手村美发店高级会员卡#k或#b射手村染发高级会员卡#k,你就放心的把发型交给我,我会让你满意的.那么你要做什么?请选择吧!.\r\n#L0#改变发型(使用#b射手村美发店高级会员卡#k)#l\r\n#L1#染色(使用#b射手村染发高级会员卡#k)#l");						
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 1;
				hairnew = Array();
				if (cm.getChar().getGender() == 0) {
					for(var i = 0; i < mhair.length; i++) {
						hairnew.push(mhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				} 
				if (cm.getChar().getGender() == 1) {
					for(var i = 0; i < fhair.length; i++) {
						hairnew.push(fhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				}
				cm.sendStyle("我可以改变你的发型,让它比现在看起来漂亮。你为什么不试着改变它下? 如果你有#b射手村美发店高级会员卡#k,我将会帮你改变你的发型,那么选择一个你想要的新发型吧!", hairnew,5150001);
			} else if (selection == 1) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("我可以改变你的发色,让它比现在看起来漂亮. 你为什么不试着改变它下? 如果你有#b射手村染发高级会员卡#k,我将会帮你改变你的发色,那么选择一个你想要的新发色吧!", haircolor,5151001);
			}
			}else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if (cm.haveItem(5150001) == true){
					cm.gainItem(5150001, -1);
					cm.setHair(hairnew[selection]);
					cm.sendOk("好了,让朋友们赞叹你的新发型吧!");
				}else if (cm.getPlayer().getCSPoints(1)>=980) {
					cm.getPlayer().modifyCSPoints(1,-980);
					cm.getPlayer().UpdateCash();
				  cm.setHair(hairnew[selection]);
				 	cm.sendOk("#e好了,你的朋友们一定认不出来是你了!");					
				}else{
					cm.sendOk("看起来你并没有我们的高级会员卡,我恐怕不能给你进行整形手术,我很抱歉.请你先购买吧.");
				}
				
			}
			if (beauty == 2){
				if (cm.haveItem(5151001) == true){
					cm.gainItem(5151001, -1);
					cm.setHair(haircolor[selection]);
					cm.sendOk("好了,让朋友们赞叹你的新发色吧!");
				}else if (cm.getPlayer().getCSPoints(1)>=980) {
					cm.getPlayer().modifyCSPoints(1,-980);
					cm.getPlayer().UpdateCash();
				  cm.setHair(haircolor[selection]);
				 	cm.sendOk("#e好了,你的朋友们一定认不出来是你了!");					
				}else {
					cm.sendOk("看起来你并没有我们的高级会员卡,我恐怕不能给你染发,我很抱歉.请你先购买吧.");
				}
			}
		}
	}
}