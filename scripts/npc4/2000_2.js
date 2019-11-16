/*
 * 
 * @type豆豆装备兑换
 * @npcID9310101
 * @换购为：帽子
 */
/* 
 case 1002695://幽灵帽
 case 1002609://兔耳魔法帽
 case 1002665://西红柿帽
 case 1002985://豆箱帽子
 case 1002986://蝙蝠怪面具
 case 1002761://枫叶面具
 case 1002760://地球帽
 case 1002583://蝙蝠客头套
 case 1002543://板栗帽
 case 1002448://紫色头巾
 */
importPackage(net.sf.odinms.client);
var 时间之石 = 4021010;
var status = 0;
var zones = 0;
var ItemId = Array(
        Array(4000017, 100, "猪头"),
        Array(1902034, 3000, "打豆豆机器人"),
        Array(1912027, 3000, "打豆豆机器人皮鞍子"),
        //Array(4032226, 800, "黄金猪猪"),
        Array(5150040, 500, "皇家理发卷"),
        Array(2049100, 1000, "混沌卷轴"),
        //Array(4310088, 600, "RED币")
        Array(2340000, 2000, "祝福卷轴")
        //Array(1082540, 20000, "革命手套"),
        //Array(1052647, 20000, "革命战斗服"),
        //Array(1102612, 20000, "革命披风"),
        //Array(1003946, 20000, "革命帽子"),
        //Array(1072853, 20000, "革命鞋子"),
        //Array(1322215, 20000, "革命铁瓜锤"),
        //Array(1422152, 20000, "革命巨锤"),
        //Array(1402210, 20000, "革命双手剑"),
        //Array(1432178, 20000, "革命之矛"),
        //Array(1452216, 20000, "革命之弓"),
        //Array(1462204, 20000, "革命暗黑弩"),
        //Array(1472226, 20000, "革命拳甲"),
        //Array(1332238, 20000, "革命切割者"),
        //Array(1372188, 20000, "革命短杖"),
        //Array(1382222, 20000, "革命长杖"),
        //Array(1492190, 20000, "革命枪"),
        //Array(1012172, 20000, "恐怖鬼娃的伤口")
        //如需其它道具兑换，请按照此格式自行添置。
        );

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
            if (cm.getLevel < 10) {
                cm.sendOK("你的等级不足10级。。打开干嘛？", 2);
                cm.dispose();
            } else {
                selStr = "\t\t#e#r你想要用豆豆兑换什么物品呢？？？\r\n目前拥有"+cm.getBeans()+"豆豆！#n#k\r\n";
                for (var i = 0; i < ItemId.length; i++) {
                    selStr += "\r\n#L" + i + "##b#v" + ItemId[i][0] + "##k (需要#r " + ItemId[i][1] + " #k个 豆豆！)";
                }
                cm.sendSimple(selStr);
                zones == 0;
            }
        } else if (status == 1) {
            if (zones == 1) {
                cm.sendNext("你让我帮你做什么呢？", 2);
                zones = 2;
            } else if (zones == 0) {
if (cm.getBeans() >= ItemId[selection][1]) {
cm.gainBeans(-(ItemId[selection][1]));
                        cm.gainItem(ItemId[selection][0], 1);
                        cm.喇叭(3, "我成功用豆豆兑换了奖励！！");
                        cm.sendOk("兑换成功，请检背包!");
                        cm.dispose();
                    } else {
                        cm.sendOk("豆豆不足！");
                        cm.dispose();
                    }
                }
            } else if (status == 2) {
                if (zones == 2) {
                    cm.sendNext("我用于提升我魔法的时间之石被一群蘑菇妖偷走了,你能帮去抢回来吗？");
                    zones = 3;
                }
            } else if (status == 3) {
                if (zones == 3) {
                    cm.sendNext("行,这个没问题？你告诉我那些偷了你时间之石的蘑菇妖现在在什么地方呢?", 2);
                    zones = 4;
                }
            } else if (status == 4) {
                if (zones == 4) {
                    cm.sendNext("这个物品是#b全世界掉落#k的。你可以在世界上的#b任何一个怪物#k上获取！");
                    zones = 5;
                }
            } else if (status == 5) {
                if (zones == 5) {
                    cm.sendYesNo("如果你能帮我这个大忙的话,我会给你一些丰厚的奖励的，您是否愿意帮我？");
                }
            } else if (status == 6) {
                cm.setBossLog('MogoQuest');
                cm.gainItem(5220001, 1);
                cm.sendOk("非常感谢！获得后和我说话，就能换购物品了！");
                cm.dispose();
            }
        }
}	