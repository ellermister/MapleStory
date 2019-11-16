function start() {
if(cm.haveItem(2022613,1)){
    删除此处if(!cm.beibao(1,3)){
        cm.sendOk("装备栏空余不足3个空格！");
        cm.dispose();
	}else if(!cm.beibao(5,5)){
        cm.sendOk("现金栏空余不足5个空格！");
        cm.dispose();
	}
	cm.gainItem(5150040, 5);//皇家理发卷
    cm.gainItem(5151001, 5);//射手村染色高级会员卡
    cm.gainItem(5152001, 5);//射手村整形手术高级会员卡
    cm.gainItem(5153000, 5);//射手村护肤中心会员卡
    cm.gainItem(5072000, 5);//高质地喇叭
	cm.gainItem(1112446, 1);//老公老婆戒指
	cm.gainItem(1112724, 10,10,10,10,0,0,0,0,0,0,0,0,0,0);//我是新手戒指
    cm.gainItem(1142358,100,100,100,100,200,200,10,0,0,0,0,0,15,20 );//新手勋章
    cm.gainDY(30000);
	cm.serverNotice("萌新冒险岛公告：玩家“"+ cm.getChar().getName() +"”取了新手礼包~!"); 
	cm.sendOk("恭喜您领取了新手礼包,祝你玩的开心愉快~!");
	cm.dispose();
}else{
	cm.sendOk("你是可疑玩家~!!");
	cm.dispose();
}	
}
