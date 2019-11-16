var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || status == 4) {
        cm.dispose();
    } else {
        if (status == 2 && mode == 0) {
            cm.sendOk("请需要签到再来找我吧！");
            status = 4;
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("#b你好，当你等级达到30级后，我可以传授你群宠、骑兽还有锻造技能！");
        } else if (status == 1) {            
            cm.sendYesNo("#d你确定你等级达到30级了吗？");
        } else if (status == 2) {
            if (cm.getLevel() < 30 ) {  
                cm.sendOk("你的等级低于30级，无法学习！");	
                cm.dispose();
			}else if(cm.hasSkill(1007) == true && cm.hasSkill(8) == true && cm.hasSkill(20001004) == true && cm.hasSkill(10001004) == true && cm.hasSkill(1004) == true && cm.hasSkill(10001019) == true && cm.hasSkill(20001019) == true){
                cm.sendOk("你已经学会了，请不要重复学，谢谢合作！");
                cm.dispose();
            } else {
		cm.teachSkill(8,1,1);//群宠
		cm.teachSkill(1007,3,3);//锻造
		cm.teachSkill(20001007,3,3);//战神锻造
		cm.teachSkill(10001007,3,3);//骑士团锻造
		cm.teachSkill(1004,1,1);//骑兽
			cm.teachSkill(20001004,1,1); //战神骑兽
			cm.teachSkill(10001004,1,1); //骑士团骑兽
			cm.teachSkill(1017,1,1); 
			cm.teachSkill(10001019,1,1);
			cm.teachSkill(20001019,1,1);
cm.喇叭(3, "[" + cm.getPlayer().getName() + "]成功学会了群宠、骑兽、锻造技能！");
                cm.dispose();  
}          
        }	
    }    } 