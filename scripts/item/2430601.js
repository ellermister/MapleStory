/* 
 * 2430601 - 圣兽提拉奥斯3天交换券 - 双击后可以在3天内使用骑乘技能[圣兽提拉奥斯]。
 */
var period = 3;
var mountSkillId = 1042;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}