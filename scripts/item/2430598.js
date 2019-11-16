/* 
 * 2430598 - 超能套装3天交换券 - 双击可以在3天内使用[超能套装]骑宠技能。
 */
var period = 3;
var mountSkillId = 80001019;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}