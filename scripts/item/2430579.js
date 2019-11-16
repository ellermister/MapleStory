/* 
 * 2430579 - GO兔冒险3天交换券 - #c双击#习得骑宠技能[GO兔冒险]可以使用3天。
 */
var period = 3;
var mountSkillId = 80001114;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}