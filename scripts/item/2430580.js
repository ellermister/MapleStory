/* 
 * 2430580 - 熊猫3天交换券 - #c双击#习得骑宠技能[熊猫]可以使用3天。
 */
var period = 3;
var mountSkillId = 80001112;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}