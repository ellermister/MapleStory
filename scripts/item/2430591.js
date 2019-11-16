/* 
 * 2430591 - 猫头鹰3天交换券 - 双击可以在3天内使用骑乘技能[梦魇]。\n习得#c飞行骑乘#技能后，还可驾驭飞行。
 */
var period = 3;
var mountSkillId = 80001051;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}