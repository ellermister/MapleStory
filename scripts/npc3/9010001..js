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
            cm.sendOk("请需要领取工资再来找我吧！");
            status = 4;
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("亲爱的#b【 #h #】#k你好，见到你真是太荣幸了，我负责给VIP玩家每天派送工资的，如果确认你是#r VIP玩家 #k请到我这里来领取工资，否则不要来打扰我！");
        } else if (status == 1) {            
            cm.sendYesNo("#e#b初级VIP每天可以领取1E猪猪币!#k\r\n#g中级VIP每天可以领取2.5E猪猪币!#k\r\n#r高级VIP每天可以领取5E猪猪币!#k\r\n你确定领取今天的工资吗??#k");
        } else if (status == 2) {
            if(cm.getChar().) {
            cm.sendOk("对不起！#b 你不是VIP会员 #k无法领取工资。\r\n如需要请联系管理员#r QQ：2848268 #k购买VIP会员！");
            } else if (cm.getBossLog('VIPGZ') >=999) {
            cm.sendOk("抱歉，尊敬VIP玩家你今天己经领取工资，请明天再来找我吧！");
            } else if(cm.getChar().getNX() < 200) {
            cm.gainMeso(100000000);
            cm.setBossLog('VIPGZ');
            cm.sendOk("恭喜你领取今天的工资1E猪猪币，您真是幸运的玩家");
            } else if(cm.getChar().getNX() < 300) {
            cm.gainMeso(250000000);
            cm.setBossLog('VIPGZ');
            cm.sendOk("恭喜你领取今天的工资2.5E猪猪币，您真是幸运的玩家");
            } else if(cm.getChar().getNX() < 400) {
            cm.gainMeso(5000000000);
            cm.setBossLog('VIPGZ');
            cm.sendOk("恭喜你领取今天的工资5E猪猪币，您真是幸运的玩家");
            }
            cm.dispose();
        }
    }    } 