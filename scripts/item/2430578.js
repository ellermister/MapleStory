/* 
 * 2430578 - 直升机3天交换券 - 双击可以在3天内使用骑乘技能[直升机]。\n习得#c飞行骑乘#技能后，还可驾驭飞行。
 */
var period = 3; //技能天数
var mountSkillId = 1157; //技能ID 

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}