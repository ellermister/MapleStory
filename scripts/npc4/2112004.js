function action(mode, type, selection) {
    var em = cm.getEventManager("Romeo");
    if (em == null) {
        cm.sendOk("Please try again later.");
        cm.dispose();
        return;
    }
    switch (cm.getPlayer().getMapId()) {
    case 261000011:
        cm.removeAll(4001130);
        cm.removeAll(4001131);
        cm.removeAll(4001132);
        cm.removeAll(4001133);
        cm.removeAll(4001134);
        cm.removeAll(4001135);
        if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
            cm.sendOk("队长必须在这里，请让他和我说话.");
        } else {
            var party = cm.getPlayer().getParty().getMembers();
            var mapId = cm.getPlayer().getMapId();
            var next = true;
            var size = 0;
            var it = party.iterator();
            while (it.hasNext()) {
                var cPlayer = it.next();
                var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                if (ccPlayer == null || ccPlayer.getLevel() < 70 || ccPlayer.getLevel() > 255) {
                    next = false;
                    break;
                }
                size += (1);
            }
            if (next && (size >= 3)) {
                var prop = em.getProperty("state");
                if (prop.equals("0") || prop == null) {
                    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap());
                } else {
                    cm.sendOk("已经有一个队伍进入该副本！请选择其他频道！");
                }
            } else {
                cm.sendOk("你的队伍必须3人以上。等级必须在71级以上才能进入！");
            }
        }
        break;
    case 926100000:
        cm.sendOk("你应该试着在这里点点看每一本书。看看图书馆的档案，直到你找到了这个实验室的入口。");
        break;
    case 926100001:
        cm.sendOk("请消灭所有的怪物！我就在你身后。");
        break;
    case 926100100:
        cm.sendOk("请把这些烧杯填满，就能过关了！。");
        break;
    case 926100200:
        if (cm.haveItem(4001130, 1)) {
            cm.sendOk("哦，我写的信！谢谢你！");
            cm.gainItem(4001130, -1);
            em.setProperty("stage", "1");
        } else if (cm.haveItem(4001134, 1)) {
            cm.gainItem(4001134, -1);
            cm.sendOk("谢谢你！现在请看zenumist文件。");
            em.setProperty("stage4", "1");
        } else if (cm.haveItem(4001135, 1)) {
            cm.gainItem(4001135, -1);
            cm.sendOk("谢谢你！现在请继续。");
            em.setProperty("stage4", "2");
            cm.getMap().getReactorByName("rnj3_out3").hitReactor(cm.getClient());
        } else {
            cm.sendOk("我们必须停止alcadno和zenumist之间的冲突！我找alcadno文件，然后zenumist！");
        }
        break;
    case 926100300:
        cm.sendOk("我们必须到达实验室的顶部，你的每个成员。");
        break;
    case 926100400:
        cm.sendOk("只要你准备好了，我们就去拯救我的爱人。");
        break;
    case 926100401:
        cm.warpParty(926100500); //urete
        break;
    }
    cm.dispose();
}