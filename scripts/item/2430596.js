/* 
 * 2430596 - 钢铁变形侠3天交换券 - 双击可以在3天内使用骑乘技能[钢铁变形侠]。
 */
var period = 3;
var mountSkillId = 1053;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}