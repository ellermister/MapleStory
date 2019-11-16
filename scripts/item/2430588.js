/* 
 * 2430588 - 拿破仑的白马3天交换券 - 双击可以在3天内使用骑乘技能[拿破仑的白马]。
 */
var period = 3;
var mountSkillId = 80001062;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}