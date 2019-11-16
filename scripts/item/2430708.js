/* 
 * 2430708 - 好朋友坐骑15天使用券 - 好朋友坐骑15天使用券.\r\n#c双击后可以在15天内使用好朋友坐骑技能.#
 */
var period = 15;
var mountSkillId = 80001142;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}