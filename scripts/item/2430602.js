/* 
 * 2430602 - 暴风摩托3天交换券 - 双击可以在3天内使用骑乘技能[暴风摩托]。
 */
var period = 3;
var mountSkillId = 1063;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}