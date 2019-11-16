//Kippieeej for the base of the script, Mikethemak for editing it for this function.
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
                cm.sendSimple("Hello #h #, 欢迎来到 #r鑫鑫兔冒险岛#k\r\n黄金级存款银行，鑫哥特派换钱师傅！如果你身上的金币过多可以兑换成等价物品哦\r\n 用你身上的金币兑换成等价黄金，在您需要的时候我可以给兑换成金币，不过这可能要收取服务费用，但是已经是很便宜的啦，您要不要兑换\r\n \r\n请先选择你要兑换的黄金品种，不同品种的黄金可以换到不同数量的金币，选择服务前请注意，您包袱里的钱总共不能超过21E，否则会成负数，再兑换之前您先算算您的钱会不会大于21E，如果成为负数我可不负责哦。嘻嘻 ! ! 兑换后千万不要双击金袋否则会消失! \r\n#L1##b使用15E兑换金袋1个 #v5200002##k#l \r\n \r\n#L2##b使用1个 #v5200002#兑换14.5El#k#l \r\n \r\n#L3#10E冒险币兑换1个 #v5200001##l \r\n#L4#使用1个 #v5200001# 兑换9.5E冒险币.#l \r\n#L5#5E冒险币兑换1个 #v5200000##l \r\n#L6#使用1个 #v5200000# 兑换4.5E冒险币.#l");
        //cm.dispose();
            } else if (status == 1) {
            if (selection == 1) {
    if (cm.itemQuantity(5200002) >= 50) {
    cm.sendOk(" 你储存了足够的 #v5200002# 了, 你不能在存放更多的 #v5200002# 了");
    cm.dispose();
        }  else if (cm.getMeso() >= 1500000000) {
                    cm.gainMeso(-1500000000);                
                    cm.gainItem(5200002, 1); 
                    cm.dispose();
                } else {
                    cm.sendOk("穷鬼还来换#bMesos#k, 要不要命了?");
                    cm.dispose();
                }                                
            } else if (selection == 2) {
        if (cm.getMeso() >= 647000000) {
        cm.sendOk("请花掉你身上的钱吧，强行兑换会使你的钱变成负数哦，呵呵");
                cm.dispose();
        } else if (cm.itemQuantity(5200002) >= 1) {
                    cm.gainMeso(1450000000);                
                    cm.gainItem(5200002, -1); 
                    cm.dispose();
                } else {
                    cm.sendOk("你没有 #v5200002#. 不要想轻易在我这骗到任何东西!");
                    cm.dispose();
                }    
            } else if (selection == 3) {
    if (cm.itemQuantity(5200000) >= 50) {
    cm.sendOk(" 你有足够多的 #v5200001# 了, 试着兑换一部分 #v5200001# 再来找我兑换银袋.");
    cm.dispose();
    } else if (cm.getMeso() >= 1000000000) {
                    cm.gainMeso(-1000000000);                
                    cm.gainItem(5200001, 1); 
                    cm.dispose();
                } else {
                    cm.sendOk("没钱别来 #bMesos#k, 跟我换东西!?");
                    cm.dispose();
                  }
        } else if (selection == 4) {
        if (cm.getMeso() >= 1147000000) {
        cm.sendOk("请花掉你身上的钱吧，强行兑换会使你的钱变成负数哦，呵呵");
                cm.dispose();
                } else if (cm.itemQuantity(5200001) >= 1) {
                    cm.gainMeso(950000000);                
                    cm.gainItem(5200001, -1); 
                    cm.dispose();
                } else {
                    cm.sendOk("你根本就没有 #v5200001#. 挣够钱再来换吧我,这可不是免费服务!");
                    cm.dispose();
              }    
            } else if (selection == 5) {
    if (cm.itemQuantity(5200000) >= 50) {
    cm.sendOk(" 你有足够多的 #v5200000# 了, 先兑换一部分 #v5200000# 再来找我商量兑换铜币包的事");
    cm.dispose();
    } else if (cm.getMeso() >= 500000000) {
                    cm.gainMeso(-500000000);                
                    cm.gainItem(5200000, 1); 
                    cm.dispose();
                } else {
                    cm.sendOk("你没钱哈哈！ #bMesos#k, 再见?");
                    cm.dispose();
            }
                } else if (selection == 6) {
        if (cm.getMeso() >= 1647000000) {
        cm.sendOk("请花掉你身上的钱吧，强行兑换会使你的钱变成负数哦，呵呵");
                cm.dispose();
                } else if (cm.itemQuantity(5200000) >= 1) {
                    cm.gainMeso(450000000);                
                    cm.gainItem(5200000, -1); 
                    cm.dispose();
                } else {
                    cm.sendOk("你根本就没有 #v5200000#. 挣够钱再来找我兑换吧!.");
                    cm.dispose();
                    }    
                }
            }
        }
    }
