/* 
 * 2430586 - 骑士团战车3天交换券 - 双击可以在3天内使用骑乘技能[骑士团战车]。\n习得#c飞行骑乘#技能后，还可驾驭飞行。
 */
var period = 3;
var mountSkillId = 80001071;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}