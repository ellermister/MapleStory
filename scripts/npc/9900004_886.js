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
			//显示物品ID图片用的代码是  #v这里写入ID#
            text += "#e#d BOSS掉线重返！！#l\r\n\r\n"//3
            //text += "#L1##r妖僧#l\r\n\r\n"//3
            text += "#L2##r扎昆#l\r\n\r\n"//3
            text += "#L3##r黑龙#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			if(cm.getPlayer().getbosslog() == 1 && cm.getMap(702060000).getCharactersSize() > 0){
			cm.warp(702060000);
            cm.dispose();
			}else if(cm.getPlayer().getbosslog() != 1){
            cm.sendOk("你选错了！");
            cm.dispose();
			}else{
			cm.getPlayer().setbosslog(0);
            cm.sendOk("地图可能已经没有人了！");
            cm.dispose();
			}
        } else if (selection == 2) {
			if(cm.haveItem(4001017,1) && cm.getMap(280030000).getCharactersSize() > 0){//
			cm.warp(280030000);
            cm.dispose();
			//}else if(cm.getPlayer().getbosslog() != 2){
            //cm.sendOk("无法进入！BOSS重返必须满足以下3个条件\r\n1、里面有人\r\n2、等级大于100级\r\n3、#v4001017# X1个");
            //cm.dispose();
			}else{
			//cm.getPlayer().setbosslog(0);
            cm.sendOk("无法进入！BOSS重返必须满足以下3个条件\r\n1、里面有人\r\n2、等级大于100级\r\n3、#v4001017# X1个");
            cm.dispose();
			}
        } else if (selection == 3) {
			if(cm.haveItem(5220006,1) && cm.getPlayer().getLevel() > 120 && cm.getMap(240060200).getCharactersSize() > 0){
            cm.gainItem(5220006,-1);
			cm.warp(240060200);
            cm.dispose();
			}else if(cm.getPlayer().getbosslog() != 3){
            cm.sendOk("无法进入！BOSS重返必须满足以下3个条件\r\n1、里面有人\r\n2、等级大于120级\r\n3、#v5220006# X1个！");
            cm.dispose();
			}else{
			cm.getPlayer().setbosslog(0);
            cm.sendOk("地图可能已经没有人了！");//givePartybosslog(黑龙)  getPartybosslog(2) getbosslog  setbosslog
            cm.dispose();
			}
		}
    }
}


