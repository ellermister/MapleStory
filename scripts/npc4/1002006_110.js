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
                
   cm.sendOk("感谢使用.");
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
	text += "#d合成-- #r★2000HP血衣★需要以下物品：\r\n#v1012412##d1000HP血衣 * 1个\r\n#v4021008##d#z4021008# * 10个\r\n#v4021001##d#z4021001# * 10个\r\n#v4021003##d#z4021003# * 10个\r\n#v4021007##d#z4021007# * 10个\r\n#v4001111##d#z4001111# * 1个\r\n~\r\n"
	text += "\r\n#L1##d我收集了以上物品。确定制作2000HP血衣";//七天
	text += "     \r\n"
        cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1012176,1)){
			cm.sendOk("请清理你的背包，至少空出2个位置！");
            cm.dispose();
        } else if(cm.haveItem(4021008,10) && cm.haveItem(4021001,10) && cm.haveItem(4021003,10) && cm.haveItem(4021007,10) && cm.haveItem(4001111,1) && cm.haveItem(1012412,1)){
				cm.gainItem(4021008, -10);
				cm.gainItem(4021001, -10);
				cm.gainItem(4021003, -10);
				cm.gainItem(4021007, -10);
				cm.gainItem(4001111, -1);
				cm.gainItem(1012412, -1);
cm.gainItem(1012176,20,20,20,20,2000,2000,0,0,0,0,0,0,0,0);
            cm.sendOk("换购成功！");
            cm.dispose();
cm.喇叭(3, "玩家：[" + cm.getPlayer().getName() + "]成功制作2000HP血衣，恭喜！！");
			}else{
            cm.sendOk("无法制作，或许你#v4021008#不足10个\r\n#v4021001#不足10个\r\n#v4021003#不足10个\r\n#v4021007#不足10个\r\n#v4001111#不足1个\r\n#v1012412#不足1个\r\n");
            cm.dispose();
			}
		}
    }
}




