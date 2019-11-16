/* 
 * 2430595 - 玩具坦克3天交换券 - 双击可以在3天内使用骑乘技能[玩具坦克]。
 */
var period = 3;
var mountSkillId = 80001116;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}