/*兑换需要 #v4000425#  或者 #v4000424#  或者 #v4000423# 或者#v4000422#*/
importPackage(net.sf.cherry.client);
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
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "想召唤boss吗...\r\n"
            text += "#L1##b使用10个#v4001266#召唤BOSS\r\n";//七天
            cm.sendSimple(text);
			
        } else if (selection == 1) { //租凭枫叶耳环

           if(cm.haveItem(4001266,10)){
			   cm.gainItem(4001266,-10);
				 cm.summonMobter(5220004, 1);
			   cm.dispose();
		   }else{
			   cm.sendOk("物品数量不足！");
			   cm.dispose();
		   }
        
	}}
    }



