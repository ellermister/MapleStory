/* 
 * 2430713 - 好朋友坐骑永久使用券 - 好朋友坐骑永久使用券.\r\n#c双击后可以用永久使用好朋友坐骑技能.#
 */
var period = -1;
var mountSkillId = 80001142;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}