/*
	暗黑龙王脚本#L1##b我要用1元宝挑战黑龙#k
*/

var needmon = 200 ;
function start() {
    cm.sendSimple ("您想要挑战天球 副本吗？那么你需要LV 120 以上  我才可以送你进去~\r\n#L0##r挑战#k \r\n\r\n\r\n#L3##r不去了，我害怕#k ")
    }

function action(mode, type, selection) {
        cm.dispose();

    switch(selection){
        case 0: 
           if (cm.getLevel() < 120 ){
		cm.sendOk("抱歉你太嫩了.");
		cm.dispose();
           } else if (cm.getBossLog('TQ1') >= 999) {
            cm.sendOk("抱歉你今天的挑战次数已达上限");
	    cm.dispose();
           }else{
		cm.getMap(240020506).addMapTimer(600, 910000000);
        	cm.setBossLog('TQ1');
        	cm.warp(709000700, 0);
		//cm.serverNotice("圣诞袜 究竟有什么呢？");  
		cm.dispose();
	      }   
	 break;
        case 1: 
		if (cm.getzb() <= needmon) {
		cm.sendOk("抱歉你没有足够的元宝,你还是明天再来吧");
		cm.dispose();
		}else{
cm.getMap(240020502).addMapTimer(180, 910000000);
		cm.setzb(-needmon);
		cm.warp(240020502, 0);
		//cm.serverNotice("『挑战黑龙』：【"+ cm.getChar().getName() +"】富二代花了1元宝买了个苍蝇拍去挑战黑龙去了");  
		cm.dispose();
	      }   
	 break;
        case 2: 
		if (cm.getChar().getVip() <= 2){
		cm.sendOk("抱歉你不是VIP2以上的玩家.");
		cm.dispose();
		}else{
		cm.warp(240060200, 0);
		//cm.serverNotice("『挑战黑龙』：VIP玩家【"+ cm.getChar().getName() +"】非常凶悍的拿着苍蝇拍去挑战黑龙去了");  
		cm.dispose();
	      }   
	 break;
	 case 3:
 	      	cm.sendOk("呵呵!原来你只是个胆小鬼");  
		cm.dispose();
		 
        }
    }
