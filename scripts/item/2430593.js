/* 
 * 2430593 - 警车3天交换券 - 双击可以从当天起，在3天内使用骑宠技能[警车]。\n鼠标右键点击可以邀请他人搭乘。
 */
var period = 3;
var mountSkillId = 1115;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}