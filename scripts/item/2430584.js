/* 
 * 2430584 - 热气球3天交换券 - 双击可以在3天内使用骑乘技能[热气球]。\n习得#c飞行骑乘#技能后，还可驾驭飞行。
 */
var period = 3;
var mountSkillId = 1145;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}