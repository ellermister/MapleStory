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
	text += "#d合成-- #r★1000HP血衣★需要以下物品：\r\n#v1050018##z1050018# * 1个\r\n#v4021004##z4021004# * 5个\r\n#v4021000##d#z4021000# * 5个\r\n#v4021006##d#z4021006# * 5个\r\n#v4021002##d#z4021002# * 5个\r\n~\r\n"
	text += "\r\n#L1##d我收集了以上物品。确定制作1000HP血衣";//七天
	text += "     \r\n"
        cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1012412,1)){
			cm.sendOk("请清理你的背包，至少空出2个位置！");
            cm.dispose();
        } else if(cm.haveItem(1050018,1) &&cm.haveItem(4021004,5) && cm.haveItem(4021000,5) && cm.haveItem(4021006,5) && cm.haveItem(4021002,5)){
				cm.gainItem(1050018, -1);
				cm.gainItem(4021004, -5);
				cm.gainItem(4021000, -5);
				cm.gainItem(4021006, -5);
				cm.gainItem(4021002, -5);
cm.gainItem(1012412,10,10,10,10,1000,1000,0,0,0,0,0,0,0,0);
            cm.sendOk("换购成功！");
            cm.dispose();
cm.喇叭(3, "玩家：[" + cm.getPlayer().getName() + "]成功制作1000HP血衣，恭喜！！");
			}else{
            cm.sendOk("无法制作，或许你#v1050018#不足1个\r\n#v4021004#不足5个\r\n#v4021000#不足5个\r\n#v4021006#不足5个\r\n#v4021002#不足5个\r\n");
            cm.dispose();
			}
		}
    }
}




