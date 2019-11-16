importPackage(net.sf.odinms.client);
var status = 0;

var ttt ="#fUI/UIWindow.img/Quest/icon9/0#";
var xxx ="#fUI/UIWindow.img/Quest/icon8/0#";
var sss ="#fUI/UIWindow.img/QuestIcon/3/0#";


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

	    var textz = "\r\n你要挑战#r 大蜈蚣王#k？希望你有那个实力\r\n";

		textz += "#r#L0#"+ttt+"挑战蜈蚣王    #d(一天两次)\r\n";

		cm.sendSimple (textz);  

			}else if (status == 1) {

	if (selection == 0){
                 if (cm.getLevel() < 40) {
	            cm.sendOk("等级不足40");
                    cm.dispose();
			} else if(cm.getBossLog("WG") >= 5 ){	
	            cm.sendOk("#b大蜈蚣王#k 每天只能挑战#r 5 #k次");
                    cm.dispose();
                        }else{
                        cm.setBossLog("WG");
                        cm.warp(701010321, 0);
                        cm.dispose();
}


}										
}
}
}
