/* 
 * 2430707 - 好朋友坐骑7天使用券 - 好朋友坐骑7天使用券.\r\n#c双击后可以在7天内使用好朋友坐骑技能.#
 */
var period = 7;
var mountSkillId = 80001142;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}