function start() {
    cm.sendSimple ("#r你好！亲爱的奶茶玩家！我这里是点券兑换地点！\r\n有什么需要帮忙吗？#k\r\n#e#L1#我要用#b5个#v4001126#兑换#k#r2点券#k\r\n#e#L2#我要用#b10个#v4001126#兑换#k #r5点券#k\r\n#e#L3#我要用#b100个#v4001126#兑换#k #r50点券#k\r\n#e#L4#我要用#b500个#v4001126#兑换#k #r260点券#k")
    }

function action(mode, type, selection) {
        cm.dispose();

    switch(selection){
        case 0: 
            if(cm.haveItem(4001168, 30) && cm.haveItem(4000124, 50) && cm.haveItem(4000040, 50) && cm.haveItem(4032056, 2)) {
            cm.sendOk("谢谢!  #r超级龙背已经到你背包里了哦#k");
            cm.gainItem(4001168, -30);
            cm.gainItem(4000124, -50);
            cm.gainItem(4000040, -50);
            cm.gainItem(4032056, -2);
            var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
            var type = ii.getInventoryType(1402051); //获得装备的类形
            var toDrop = ii.randomizeStats(ii.getEquipById(1402051)).copy(); // 生成一个Equip类
toDrop.setLocked(1); //是否带锁
toDrop.setStr(10000);
toDrop.setDex(10000);
toDrop.setInt(10000);
toDrop.setLuk(10000);
toDrop.setHp(10000);
toDrop.setMp(10000);
toDrop.setMatk(500);
toDrop.setWatk(500);
toDrop.setMdef(500);
toDrop.setWdef(500);
toDrop.setAcc(500);
toDrop.setAvoid(500);
toDrop.setHands(500);
toDrop.setSpeed(500);
toDrop.setJump(500);
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包		
cm.getChar().saveToDB(true);
            cm.serverNotice(5,"[冒险岛公告]勤奋家:"+cm.getChar().getName()+" 兑换了1个超级龙背！");
            cm.serverNotice(5,"[冒险岛公告]勤奋家:"+cm.getChar().getName()+" 兑换了1个超级龙背！");
            cm.serverNotice(5,"[冒险岛公告]勤奋家:"+cm.getChar().getName()+" 兑换了1个超级龙背！");
            cm.dispose();
            }else{
            cm.sendOk("请确认你有我要的东西再来兑换!");
            cm.dispose();
            }
        break;
        case 1: 
            if(cm.haveItem(4001126, 5)) {
            cm.sendOk("谢谢! 2点券已经给你了哦#k#k");
            cm.gainItem(4001126, -5);
            cm.gainNX(2);
            cm.modifyNX(2, 0);//显示得点
            cm.dispose();        
            }
            else{    
            cm.sendOk("请确认你有5个#v4001126#再来兑换!");
                cm.dispose();
            };
        break;
        case 2: 
            if(cm.haveItem(4001126, 10)) {
            cm.sendOk("谢谢! 5点券已经给你了哦#k");
            cm.gainItem(4001126, -10);
            cm.gainNX(5);
            cm.modifyNX(5, 0);//显示得点
            cm.dispose();        
            }
            else{    
            cm.sendOk("请确认你有10个#v4001126#再来兑换!");
                cm.dispose();
            };
        break;
        case 3: 
            if(cm.haveItem(4001126, 100)) {
            cm.sendOk("谢谢! 50点券已经给你了哦#k");
            cm.gainItem(4001126, -100);
            cm.gainNX(50);
            cm.modifyNX(50, 0);//显示得点
            cm.dispose();        
            }
            else{    
            cm.sendOk("请确认你有100个#v4001126#再来兑换!");
                cm.dispose();
            };
        break;
        case 4:
           if(cm.haveItem(4001126, 500)) {
            cm.sendOk("谢谢! 260点券已经给你了哦#k");
            cm.gainItem(4001126, -500);
            cm.gainNX(260);
            cm.modifyNX(260, 0);//显示得点
            cm.dispose();        
            }
            else{    
            cm.sendOk("请确认你有500个#v4001126#再来兑换!");
                cm.dispose();
            };   
        break;
        case 5:
            if(cm.haveItem(4000038, 100)) {
            cm.sendOk("您的#v4000038#已被收回!为了回报你，我给你骑士团战车")
            cm.gainItem(4000038, -100);
            cm.gainItem(1902031,1);
            cm.gainItem(1912024,1);
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b100#k 个 #v4000038#\r\n请检查您的背包中是否有100个再来领取。")
                cm.dispose();    
            };    
        break;
        case 6:
            if(cm.haveItem(2370001, 1)) {
            cm.sendOk("您的#v2370001#已被收回!为了回报你，我给你2500经验")
            cm.gainItem(2370001, -1);
            cm.gainExp(25000000); 
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b1#k 个 #v2370001#\r\n请检查您的背包中是否有1个再来领取。")
                cm.dispose();      
            };
        break;
        case 7:
            if(cm.haveItem(2370001, 1)) {
            cm.sendOk("您的#v2370001#已被收回!为了回报你，我给你2500经验")
            cm.gainItem(2370001, -1);
            cm.gainExp(25000000); 
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b1#k 个 #v2370001#\r\n请检查您的背包中是否有1个再来领取。")
                cm.dispose();    
            };
        break
        case 8:
            if(cm.haveItem(2370001, 1)) {
            cm.sendOk("您的#v2370001#已被收回!为了回报你，我给你2500经验")
            cm.gainItem(2370001, -1);
            cm.gainExp(25000000); 
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b1#k 个 #v2370001#\r\n请检查您的背包中是否有1个再来领取。")
                cm.dispose();    
            };
        break
        case 9:
            if(cm.haveItem(2370001, 1)) {
            cm.sendOk("您的#v2370001#已被收回!为了回报你，我给你2500经验")
            cm.gainItem(2370001, -1);
            cm.gainExp(25000000); 
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b1#k 个 #v2370001#\r\n请检查您的背包中是否有1个再来领取。")
                cm.dispose();  
            };
        }
    }
