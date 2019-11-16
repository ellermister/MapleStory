/* 
 * 2430587 - 妮娜的魔法阵3天交换券 - 双击可以在3天内使用骑乘技能[妮娜的魔法阵]。
 */
var period = 3;
var mountSkillId = 80001058;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}