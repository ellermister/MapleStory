/* 
 * 2430592 - 莱格斯的豺犬3天交换券 - 双击可以在3天内使用骑乘技能[莱格斯的豺犬]。
 */
var period = 3;
var mountSkillId = 1136;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}