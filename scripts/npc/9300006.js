/* 
结婚Event

CherryMS LoveMXD

原创脚本。非同意禁止转载


任务号码说明：（只是内置的判断用处，并不在NPC外显示。）

1000 = 登记（创建数据）任务
1001 = 创建密码任务
1002 = 女方输入密码完成任务
1003 = 男方给予
*/
var status = 0;
var boymain2 = "阿咧。结婚进展得不错哦。。#b\r\n#L3#我把我的密码忘记了"
var boymain1 = "嗯嗯。。不错不错。。看来你已经登记好了。。。。。#b\r\n\r\n#L2#我想设置求爱密码"
var boymain = "甜蜜的恋人都是一步一步走出来的！#b\r\n\r\n#L0#我想和心中的她订婚。";
var grilmain1 = "嗯？你有求爱密码了吗？#b\r\n\r\n#L1#我想输入求爱密码"
var main = "甜蜜的恋人。。哈哈。。这我见多了。。"

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
			cm.sendNext("嗯。。如果有什么事的话可以来找我。我在这里等你。");
		}
		if (mode == 1)
			status++;
		else
			status--;
                                          if (status == 0) {
if (cm.MissionStatus(cm.getPlayer().getId(),1022,0,0)){
cm.sendOk("赶快进入圣枫殿堂吧！")
cm.dispose();
}else if (cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)){
cm.sendOk("呵呵，开心吧？")
cm.dispose();
}else if (cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)){
cm.sendOk("呵呵，开心吧？")
cm.dispose();
}else if(cm.MissionStatus(cm.getPlayer().getId(),1018,0,0)){//检查密码任务是否完成了
 cm.sendSimple(boymain2);                                
}else if (cm.MissionStatus(cm.getPlayer().getId(),1019,0,0) && cm.getChar().getGender() == 0) {//男生登记任务
                                          cm.sendSimple(boymain1);
}else if (cm.MissionStatus(cm.getPlayer().getId(),1020,0,0)) {//女方输入密码任务完成
cm.sendOk("结婚进行得怎么样？愉快吧。。");
cm.dispose();
}else if (cm.MissionStatus(cm.getPlayer().getId(),1021,0,0)){//男方给予女方输入密码的任务
cm.sendSimple(grilmain1);
}else if (cm.MissionStatus(cm.getPlayer().getId(),1016,0,0)){//订婚任务完成
cm.sendOk("结婚进行得怎么样。。和你的妻子步上圣枫殿堂吧。")
cm.dispose();
                                          }else if(cm.getChar().getGender() == 0) {//如果是男生
                                          cm.sendSimple(boymain);
                                          }else if(cm.getChar().getGender() == 1) {//如果是女生
                                           cm.sendOk(main);
cm.dispose();
}else{
cm.sendOk(main)
cm.dispose();
}
//cm.sendOk(""+cm.getPlayer().getMarriageId()+"");
                                          } else if (status == 1) {//选项部分
			if (selection == 0) { // 移动到结婚殿堂
				cm.sendNext("嗯。。让我想想。嘿嘿。你还不知道对方的角色ID吧。。没关系。我告诉你。。在聊天栏中输入#b@online#k.找到你对方的名字中的#b对应ID#k。输入就行了。。怎么样？");
			} else if (selection == 1){
                                          status = 10;
                                          cm.sendGetText("心中的他怎么样呢?是否长得英勇无比。。哈哈。。请输入你的求爱密码吧！");
}else if (selection == 2){
status = 4;
cm.sendNext("又有一对幸福的恋人诞生了呀。。好吧。。我给你密码。让你的老婆输入我给的密码。。这样子就真正的登记成功拉！");
}else if (selection == 3){
status = 6;
cm.sendNext("呀呀。。你怎么这么不小心呢。。等等。。我翻翻我的圣书。。");
}
		} else if (status == 2) { //关于结婚详情
			cm.sendGetText("请输入对方的角色ID\r\n");
		} else if (status == 3) {
                                           //cm.sendOk("你刚才输入的是："+cm.getText()+"");
/*if(cm.getText() == cm.getPlayer()){
cm.startPopMessage("请输入正确的号码")
}else */if (cm.createMarriage(cm.getPlayer(),cm.getText())){
                                          cm.startPopMessage("登记成功。请重新打开NPC。");
//cm.setMarriageData(cm.getPlayer(),2,1);
                                          cm.startPopMessage(cm.getPlayer().getMarriageId()," 您的帐号被登记结婚。\r\n请确认是否为本人操作")
                                          cm.MissionMake(cm.getPlayer().getId(),1019,0,0,0,0);
                                          cm.MissionFinish(cm.getPlayer().getId(),1019);//完成登记任务

cm.dispose();
                                       }else{
                                            cm.startPopMessage("请确认对方是否在此地图。");
                                       }
		} else if (status == 4) { //Menu
			cm.sendOk("dd")
		} else if (status == 5){
                                        if(cm.getPlayerOnline(cm.getPlayer().getMarriageId()) == false){
cm.startPopMessage("对方没有在线或者不在一个频道。\r\n请重试后再试。");
}else if (cm.getSameMap(cm.getPlayer().getMarriageId()) == false){
cm.startPopMessage("对方没有不与您同个地图。\r\n请重试后再试。");
}else{
cm.setMarriagePassword(cm.getPlayer(),cm.RandomString(1000000,9999999));
cm.sendOk("设置完毕。您的求爱密码为：#b"+cm.getMarriagePassword(cm.getPlayer())+"#k")
cm.setMarriageData(cm.getPlayer(),1,cm.RandomString(1,1));
cm.MissionMake(cm.getPlayer().getId(),1018,0,0,0,0);
cm.MissionFinish(cm.getPlayer().getId(),1018);//完成密码任务
cm.MissionMake(cm.getPlayer().getMarriageId(),1021,0,0,0,0);//给女方的任务
cm.MissionFinish(cm.getPlayer().getMarriageId(),1021);//给女方的任务
cm.startPopMessage(cm.getPlayer().getMarriageId(),"登记成功，您现在可以输入求爱密码了")
cm.dispose();
}
                            } else if (status == 6){
                                         cm.sendOk("今天天气很好不是吗？");
cm.dispose();
                           } else if (status == 7){
                                          cm.sendNext("等等。。圣书好厚的。。");
                           }else if (status == 8){
                                         cm.sendNext("哦哦！！找到了。您的求爱密码为：#b"+cm.getMarriagePassword(cm.getPlayer())+"#k");
                           }else if (status == 9){
                                        cm.sendNext("下次注意点啦！这么重要的东西可不能乱丢哦！");
cm.dispose();
}else if (status == 10){
cm.sendOk("今天天气很好不是吗？")
}else if (status == 11){
if(cm.getMarriagePassword(cm.getPlayer()).equals(cm.getText()) == false){
cm.startPopMessage("错误的订婚密码。");
}else if(cm.getPlayerOnline(cm.getPlayer().getMarriageId()) == false){
cm.startPopMessage("对方没有在线或者不在一个频道。\r\n请重试后再试。");
}else if (cm.getSameMap(cm.getPlayer().getMarriageId()) == false){
cm.startPopMessage("对方没有不与您同个地图。\r\n请重试后再试。");
}else{
cm.startPopMessage(cm.getPlayer().getMarriageId(),"订婚完毕，现在可以进入圣枫殿堂了。")
cm.startPopMessage("订婚完毕，现在可以进入圣枫殿堂了。");
cm.setMarriageData(cm.getPlayer(),2,cm.RandomString(1,1));
cm.MissionMake(cm.getPlayer().getId(),1016,0,0,0,0);//留着做下面的判断
cm.MissionFinish(cm.getPlayer().getId(),1016);//留着做下面的判断
cm.MissionMake(cm.getPlayer().getId(),1025,0,0,0,0);//判断性别用。
cm.MissionFinish(cm.getPlayer().getId(),1025);//判断性别用。
cm.MissionMake(cm.getPlayer().getMarriageId(),1016,0,0,0,0);//留着做下面的判断
cm.MissionFinish(cm.getPlayer().getMarriageId(),1016);
cm.MissionMake(cm.getPlayer().getMarriageId(),1022,0,0,0,0);//留着做下面的判断
cm.MissionFinish(cm.getPlayer().getMarriageId(),1022);
cm.MissionMake(cm.getPlayer().getMarriageId(),1026,0,0,0,0);//留着做下面的判断
cm.MissionFinish(cm.getPlayer().getMarriageId(),1026);
}
}

	}
}
