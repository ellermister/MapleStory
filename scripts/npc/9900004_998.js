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
        if(status == 0){
		if(cm.petgm() == false){
            //cm.sendOk("请召唤出改名宠物！");
            cm.dispose();
			}else if(cm.haveItem(5170000,1)){
				cm.sendGetText("");
			}else{
            cm.sendOk("请去商场购买#v5170000#！");
            cm.dispose();
			}
           // cm.sendGetText("你好.\r\n你想给你可爱的宠物换个什么名字呢？\r\n名字在6个中文以下或12个英文以下！\r\n#r否则无法无法保存名字而且出错还会到你你的改名卡删掉");
			//cm.sendGetText("");
			//cm.setGetText(cm.getText);
       //     var text = cm.getText();
        }else if(status == 1){
			var n = cm.calculatePlaces(cm.getText());  
			if(n > 13){
            cm.sendOk("你好.\r\n你想给你可爱的宠物换个什么名字呢？\r\n名字在6个中文以下或12个英文以下！\r\n#r否则无法无法保存名字");
			}else{
			cm.gainItem(5170000, -1);
            cm.petName(cm.getText());
            cm.sendOk("呵呵，成功咯!:"+cm.getText());
			}
           // cm.petName(cm.getText());
            //cm.sendOk("呵呵，成功咯!:"+cm.getText());
            cm.dispose();
        }
    }
}