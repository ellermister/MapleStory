/* 
 * 2430603 - 冒险骑士团高速电车3天交换券 - 双击可以在3天内使用骑乘技能[冒险骑士团高速电车]。
 */
var period = 3;
var mountSkillId = 80001038;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}