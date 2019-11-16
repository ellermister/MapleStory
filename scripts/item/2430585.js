/* 
 * 2430585 - 企鹅3天交换券 - #c双击#习得骑宠技能[企鹅]可以使用3天。
 */
var period = 3;
var mountSkillId = 80001113;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}