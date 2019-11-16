/* 
 * 2430594 - 筋斗云3天交换券 - 双击可以在3天内使用骑乘技能[筋斗云]。\n习得#c飞行骑乘#技能后，还可驾驭飞行。
 */
var period = 3;
var mountSkillId = 1030;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}