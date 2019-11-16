var messages = Array("想挑战武陵道场…还真有勇气！", "我等你！还有勇气的话，欢迎再来挑战！", "挑战武陵道场的家伙，我一定会让他(她)后悔！！", "想被称呼为失败者吗？欢迎来挑战！");

function start(ms) {
    if (ms.getPlayer().getMap().getId() == 925020000) {
        ms.getPlayer().startMapEffect(messages[Math.floor(Math.random() * messages.length)], 5120024);
    } else {
        ms.getPlayer().resetEnteredScript();
        ms.getPlayer().startMapEffect("哈哈！让我看看你，我不会让你离开的。除非你先打败我！", 5120024);
    }
}
