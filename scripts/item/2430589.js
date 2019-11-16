/* 
 * 2430589 - 魔法扫帚3天交换券 - 双击可以在3天内使用骑乘技能[魔法扫帚]。\n习得#c飞行骑乘#技能后，还可驾驭飞行。
 */
var period = 3;
var mountSkillId = 80001069;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}